'use strict';

const expect = require( 'must' );
const sinon = require( 'sinon' );
const assert = expect;
const pxquire = require( 'proxyquire' );
const dependencies = require( 'dependencies' );

const file = 'assess/models/ComparisonProxy';
const subject = pxquire
    .noCallThru()
    .load( '../../../../src/scripts/' + file, dependencies );

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
        describe( '#parse', function(){
            it( 'should use the collection\'s parser when available', function(){
                const parserSpy = sinon.spy();
                instance.collection = {
                    parser: {
                        parseModel: parserSpy
                    }
                };
                const payload = {};
                instance.parse( payload );
                expect( parserSpy.calledOnce ).to.be.true();
                expect( parserSpy.calledWithExactly( payload ) ).to.be.true();
            } );
            it( 'should unwrap the payload when no collection\'s available', function(){
                const payload = { data: {} };
                const actual = instance.parse( payload );
                expect( actual ).to.equal( payload.data );
            } );
        } );
        describe( '#update', function(){
            it( 'should relay to #save', function(){
                sinon.stub( instance, 'save' );
                const payload = {};
                instance.update( payload );
                const saveCall = instance.save.getCall( 0 );
                expect( saveCall ).to.not.be.undefined();
                expect( saveCall.args[ 0 ] ).to.equal( payload );
                expect( saveCall.args[ 1 ] ).to.eql( {
                    patch: true
                } );
            } );
        } );
        describe( '#hasMessages', function(){
            it( 'should return `false` when no messages array exists', function(){
                assert( instance.get( 'messages' ) ).is.undefined();
                const actual = instance.hasMessages();
                expect( actual ).to.be.false();
            } );
            it( 'should return `false` when messages array is empty', function(){
                instance.set( 'messages', [] );
                const actual = instance.hasMessages();
                expect( actual ).to.be.false();
            } );
            it( 'should return `true` when messages array has at least one item', function(){
                instance.set( 'messages', [ 'foo' ] );
                const actual = instance.hasMessages();
                expect( actual ).to.be.true();
            } );
        } );
    } );
} );
