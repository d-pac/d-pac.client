'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const assert = expect;
const pxquire = require( 'proxyquire' );
const fixtures = require( './fixtures' );

function returnTrue(){
    return true;
}

function returnFalse(){
    return false;
}

const subject = pxquire.noCallThru().load( '../../../../src/scripts/core/models/AssessmentProxy', {
    'backbone-nested-model': {
        extend: ( declaration ) =>{
            declaration.attrs = declaration.defaults || {};
            declaration.get = function( key ){
                return this.attrs[ key ];
            };
            declaration.set = function( key,
                                        value ){
                let obj = _.isString( key )
                    ? { [key]: value }
                    : key;
                _.each( obj, ( value,
                               key )=>{
                    this.attrs[ key ] = value;
                } );
            };
            return declaration;
        }
    },
    'underscore': _,
    '../../common/mixins/teardown': {
        model: {
            mixin: _.noop
        }
    }
} );

function createModel(){
    return _.cloneDeep( subject );
}

describe( 'core/models/AssessmentProxy', function(){
    let instance;
    beforeEach( function(){
        instance = createModel();
    } )
    describe( 'spec', ()=>{
        it( 'should run', ()=> expect( true ).to.be.true() );
    } );

    describe( 'module', function(){
        it( 'should expose an object', ()=>expect( instance ).to.be.an.object() );
    } );
    describe( 'API', function(){
        it( 'should declare the `idAttribute` as "_id"', ()=>expect( instance.idAttribute ).to.equal( '_id' ) );
        it( 'should set `phases` to `[]` by default', ()=>expect( instance.get( 'phases' ) ).to.eql( [] ) );
        describe( '#parse()', function(){
            it( 'should pass the payload through', function(){
                const assessment = _.cloneDeep( fixtures.validAssessment )
                const actual = instance.parse( assessment );
                expect( actual ).to.equal( assessment );
            } );
            it( 'should transform raw `uiCopy` JSON to an object', function(){
                const assessment = _.cloneDeep( fixtures.validAssessment )
                assert( assessment.uiCopy ).to.be.a.string();
                instance.parse( assessment );
                expect( assessment.uiCopy ).to.be.an.object();
            } );
            it( 'should set `hasResults` `false` when `stats` are missing', function(){
                const assessment = {
                    uiCopy: '{}'
                };
                instance.parse( assessment );
                expect( assessment.hasResults ).to.be.false();

            } );
            it( 'should set `hasResults` `false` when `stats.lastRun` is missing', function(){
                const assessment = {
                    uiCopy: '{}',
                    stats: {}
                };
                instance.parse( assessment );
                expect( assessment.hasResults ).to.be.false();

            } );
            it( 'should set `hasResults` `false` when `results.enable` is missing', function(){
                const assessment = {
                    uiCopy: '{}',
                    stats: {}
                };
                instance.parse( assessment );
                expect( assessment.hasResults ).to.be.false();

            } );
            it( 'should set `hasResults` `false` when `results.enable` is `false`', function(){
                const assessment = {
                    uiCopy: '{}',
                    stats: { lastRun: true },
                    results: { enable: false }
                };
                instance.parse( assessment );
                expect( assessment.hasResults ).to.be.false();

            } );
        } );
        describe( '#getNextPhaseId(id)', function(){
            beforeEach( function(){
                instance.set( 'phases', [ 'a', 'b', 'c' ] );
            } )
            it( 'should retrieve the Phase id after `id`', function(){
                expect( instance.getNextPhaseId( 'b' ) ).to.equal( 'c' );
            } );
            it( 'should return the first id when `id` wasn\'t found ', function(){
                expect( instance.getNextPhaseId( 'd' ) ).to.equal( 'a' );
            } );
            it( 'should return `undefined` when `id` refers to the last `id`', function(){
                expect( instance.getNextPhaseId( 'c' ) ).to.be.undefined();
            } );
        } );
        describe( '#isRoot()', function(){
            it( 'should return `true` when no `parent` was found', function(){
                instance.set( 'parent', undefined );
                expect( instance.isRoot() ).to.be.true();
            } );
            it( 'should return `false` when `parent` was found', function(){
                instance.set( 'parent', 'foo' );
                expect( instance.isRoot() ).to.be.false();
            } );
        } );
        describe( '#incCompleted', function(){
            it( 'should increment `progress.completedNum', function(){
                instance.set( 'progress', {
                    completedNum: 0
                } );
                instance.incCompleted();
                expect( instance.get( 'progress' ).completedNum ).to.equal( 1 );
            } );
        } );
        describe( '#isCompleted', function(){
            it( 'should return `true` when `state` is "completed"', function(){
                instance.set( 'state', 'completed' );
                expect( instance.isCompleted() ).to.be.true();
            } );
            it( 'should return `true` when `progress.completedNum` equals `progress.total`', function(){
                instance.set( 'progress', {
                    completedNum: 4,
                    total: 4
                } );
                expect( instance.isCompleted() ).to.be.true();
            } );
        } );
        describe( '#isActive', function(){
            it( 'should return `false` when `isCompleted()`', function(){
                instance.isCompleted = returnTrue;
                expect( instance.isActive() ).to.be.false();
            } );
            it( 'should return `false` when `! isCompleted()` and `state != published`', function(){
                instance.isCompleted = returnFalse;
                instance.set( { state: 'draft' } );
                expect( instance.isActive() ).to.be.false();
            } );
            it( 'should return `true` when `! isCompleted()` and `state == published`', function(){
                instance.isCompleted = returnFalse;
                instance.set( { state: 'published' } );
                expect( instance.isActive() ).to.be.true();
            } );
        } );

        describe( '#assessingAllowed', function(){
            it( 'should return `false` when `! isActive()', function(){
                instance.isActive = returnFalse;
                expect( instance.assessingAllowed() ).to.be.false();
            } );
            it( 'should return `true` when `isActive()` and `isRoot`', function(){
                instance.isActive = returnTrue;
                instance.isRoot = returnTrue;
                expect( instance.assessingAllowed() ).to.be.true();
            } );
            it( 'should return `true` when `isActive()` and `! parentisActive()`', function(){
                instance.isActive = returnTrue;
                instance.isRoot = returnFalse;
                instance.parentIsActive = returnFalse;
                expect( instance.assessingAllowed() ).to.be.true();
            } );
        } );

        describe( '#getParent', function(){
            it( 'should return the Parent when set', function(){
                const parent = {};
                const collection = createModel();
                collection.set( 'foo', parent );
                instance.set( {
                    registry: collection,
                    parent: 'foo'
                } );
                expect( instance.getParent() ).to.equal( parent );
            } );
            it( 'should return `undefined` when the parent is not set', function(){
                const collection = createModel();
                instance.set( {
                    registry: collection,
                    parent: undefined
                } );
                expect( instance.getParent() ).to.be.undefined();
            } );
        } );

        describe( '#parentIsActive', function(){
            it( 'should return `true` when the parent `isActive()`', function(){
                const parent = createModel();
                parent.isActive = returnTrue;
                const collection = createModel();
                collection.set( 'foo', parent );
                instance.set( {
                    registry: collection,
                    parent: 'foo'
                } );

                expect(instance.parentIsActive()).to.be.true();

            } );
            it( 'should return `false` when the parent `! isActive()`', function(){
                const parent = createModel();
                parent.isActive = returnFalse;
                const collection = createModel();
                collection.set( 'foo', parent );
                instance.set( {
                    registry: collection,
                    parent: 'foo'
                } );
                expect(instance.parentIsActive()).to.be.false();
            } );
            it( 'should return `true` when the parent is not found', function(){
                const collection = createModel();
                instance.set( {
                    registry: collection,
                    parent: 'foo'
                } );
                expect(instance.parentIsActive()).to.be.true();
            } );

        } );
    } );
} );
