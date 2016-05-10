'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const sinon = require( 'sinon' );
const assert = expect;
const pxquire = require( 'proxyquire' );
const dependencies = require( 'dependencies' );
const Backbone = dependencies.backbone;

const file = 'core/models/AssessmentsCollection';
const subject = pxquire
    .noCallThru()
    .load( '../../../../src/scripts/'+file, dependencies );

describe( file, function(){
    let instance;
    beforeEach( function(){
        instance = new subject();
    } );
    describe( 'spec', ()=>{
        it( 'should run', ()=> expect( true ).to.be.true() );
    } );

    describe( 'module', function(){
        it( 'should expose an object', ()=>expect( instance ).to.be.an.object() );
    } );
    describe( 'API', function(){
        describe( '#parse(raw)', function(){
            it( 'should parse the `data` attribute', function(){
                const expected = [ { _id: 0 }, { _id: 1 } ];
                const actual = instance.parse( { data: expected } );
                expect( actual ).to.eql( expected );
            } );
            it( 'should set every models `registry` to itself', function(){
                const expected = [ { _id: 0 }, { _id: 1 } ];
                const actual = instance.parse( { data: expected } );
                expect( _.pluck( actual, 'registry' ) ).to.eql( [ instance, instance ] );
            } );
        } );
        describe( '#listById(_ids)', function(){
            it( 'should return a different AssessmentsCollection instance', function(){
                const actual = instance.listById();
                expect( actual instanceof subject ).to.be.true();
                expect( actual ).to.not.equal( instance );
            } );
            it( 'should return a collection with the corresponding models', function(){
                const models = [ { _id: 0 }, { _id: 1 }, { _id: 2 }, { _id: 3 } ];
                instance.add( models );
                const actual = instance.listById( [ 1, 3 ] );
                expect( actual.get( 0 ) ).to.be.undefined();
                expect( actual.get( 1 ) ).to.not.be.undefined();
                expect( actual.get( 2 ) ).to.be.undefined();
                expect( actual.get( 3 ) ).to.not.be.undefined();
            } );
        } );
        describe( '#getAssessables()', function(){
            it( 'should return a different AssessmentsCollection instance', function(){
                const actual = instance.getAssessables();
                expect( actual instanceof subject ).to.be.true();
                expect( actual ).to.not.equal( instance );
            } );
            it( 'should return a collection with the corresponding models', function(){
                const models = [
                    {
                        _id: 0,
                        state: "published"
                    }, {
                        _id: 1,
                        state: "draft"
                    }, {
                        _id: 2,
                        state: "published"
                    }, {
                        _id: 3,
                        state: "completed"
                    }
                ];
                instance.add( models );
                const actual = instance.getAssessables();
                expect( actual.get( 0 ) ).to.not.be.undefined();
                expect( actual.get( 1 ) ).to.be.undefined();
                expect( actual.get( 2 ) ).to.not.be.undefined();
                expect( actual.get( 3 ) ).to.be.undefined();
            } );
        } );
    } );
} );
