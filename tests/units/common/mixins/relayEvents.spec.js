'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const assert = expect;
const sinon = require( 'sinon' );

const file = "common/mixins/relayEvents";
const subject = require( '../../../../src/scripts/'+file );

describe( file, function(){
    describe( 'spec', ()=>{
        it( 'should run', ()=> expect( true ).to.be.true() );
    } );

    describe( 'module', function(){
        it( 'should expose an object', ()=>expect( subject ).to.be.an.object() );
    } );

    let ctor;

    beforeEach( function(){
        ctor = function(){
            //constructor
        };
    } );

    describe( 'mixedin API', function(){
        let instance
            , from
            , to;
        beforeEach( function(){
            subject.mixin( ctor );
            instance = new ctor();
            from = {
                vent: {
                    on: sinon.spy()
                }
            };
            to = {
                dispatch: sinon.spy()
            };
        } );
        describe( '#remapEvent(from, a, to, b)', function(){
            it( 'should remap an event `from` `a` `to` `b`', function(){
                instance.remapEvent( from, 'a', to, 'b' );
                assert( from.vent.on.calledOnce ).to.be.true();
                expect( from.vent.on.calledWithExactly( 'a', sinon.match( function( f ){
                    f( 'x', 'y' );
                    return to.dispatch.calledWithExactly( 'b', 'x', 'y' );
                } ) ) );
            } );
        } );
        describe( '#relayEvents(from, event, to)', function(){
            it( 'should relay `events` `from` `to`', function(){
                const remapEventSpy = sinon.spy( instance, 'remapEvent' );
                const events = {
                    'a': 'b',
                    'c': 'd'
                };
                const fromEvents = _.keys( events );
                const toEvents = _.values( events );
                instance.relayEvents( from, events, to );
                _.times( 2, function( i ){
                    const spyCall = remapEventSpy.getCall( i );
                    expect( spyCall.calledWithExactly( from, fromEvents[ i ], to, toEvents[ i ] ) );
                } );
            } );
        } );
    } );
} );
