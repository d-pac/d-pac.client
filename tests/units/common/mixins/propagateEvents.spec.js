'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const assert = expect;
const sinon = require( 'sinon' );

const file = "common/mixins/propagateEvents";
const subject = require( '../../../../src/scripts/'+file );

describe( file, function(){
    describe( 'spec', ()=>{
        it( 'should run', ()=> expect( true ).to.be.true() );
    } );

    describe( 'module', function(){
        it( 'should expose an object', ()=>expect( subject ).to.be.an.object() );
    } );

    describe( 'API', function(){
        describe( '.mixin(constructor)', function(){
            it( 'should expose an object', ()=>expect( subject.mixin() ).to.be.an.object() );

            describe( '.propagate(events)', function(){
                let stub;
                let spies;
                beforeEach( function(){
                    spies = {
                        listenTo: sinon.spy(),
                        initialize: sinon.spy(),
                        dispatch: sinon.spy()
                    };
                    stub = function(){
                        //noop
                    };

                    stub.prototype.listenTo = spies.listenTo;
                    stub.prototype.initialize = spies.initialize;
                    stub.prototype.dispatch = spies.dispatch;
                } );
                it( 'should not forget the original `initialize`', function(){
                    subject.mixin( stub ).propagate( {} );
                    const instance = new stub();
                    instance.initialize();
                    expect( spies.initialize.calledOnce ).to.be.true();
                } );
                it( 'should register all `events`', function(){
                    const events = {
                        'a': 'b',
                        'c': 'd',
                        'e': 'f'
                    };
                    subject.mixin( stub ).propagate( events );
                    const instance = new stub();
                    instance.initialize();
                    assert( spies.listenTo.callCount ).to.equal( 3 );
                    const fromEvents = _.keys( events );
                    const toEvents = _.values( events );
                    _.times( 3, function( i ){
                        expect( spies.listenTo.getCall( i ).calledWithExactly(
                            instance,
                            fromEvents[ i ],
                            sinon.match( function( f ){
                                f( i );
                                return spies.dispatch.calledWithExactly( toEvents[ i ], [ i ] );
                            } )
                        ) ).to.be.true();
                    } );
                } );
            } );
        } );
    } );
} );
