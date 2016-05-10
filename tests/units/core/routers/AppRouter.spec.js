'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const sinon = require( 'sinon' );
const assert = expect;
const pxquire = require( 'proxyquire' );
const dependencies = require( 'dependencies' );
const Backbone = dependencies.backbone;

const file = 'core/routers/AppRouter';
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
        describe( '#routes', function(){
            it( 'should set up the relevant routes', function(){
                const routes = [
                    "welcome", "tutorial", "signin", "signout", "assess", "account", "results", "uploads", "",
                    "*notfound"
                ];
                expect( _.keys( instance.routes ) ).to.eql( routes );
            } );
        } );
        describe( '#secured', function(){
            it( 'secure relevant routes', function(){
                const secured = [ "assess", "account", "results", "uploads" ];
                expect( instance.secured ).to.eql( secured );
            } );
        } );
        describe( '#navigateToRoute(data)', function(){
            it( 'should navigate and trigger to `data.route`', function(){
                const navigateSpy = sinon.spy( instance, 'navigate' );

                const route = "a route";
                instance.navigateToRoute( { route: route } );
                expect( navigateSpy.calledWith( route, sinon.match( function( value ){
                    return value.trigger === true;
                } ) ) ).to.be.true();
            } );
        } );
    } );
    describe( 'functionality', function(){
        it( 'should not redirect unsecured routes', function(){
            const navigateSpy = sinon.spy( instance, 'navigate' );
            const dispatchSpy = instance.dispatch = sinon.spy();
            const route = "a route";
            instance.permissions = {
                toJSON: _.noop
            };
            instance.trigger( 'route', route );
            expect( navigateSpy.called ).to.be.false();
            expect( dispatchSpy.calledWith( "router:route:completed", sinon.match( function( value ){
                return value.route === route;
            } ) ) );
        } );
        it( 'should redirect secured routes when not allowed', function(){
            const navigateSpy = sinon.spy( instance, 'navigate' );
            const dispatchSpy = instance.dispatch = sinon.spy();
            const route = "a route";
            instance.secured = [ route ];
            instance.permissions = {
                toJSON: _.noop
            };
            instance.trigger( 'route', route );
            expect( navigateSpy.calledWith( "#signin?from=" + route ) ).to.be.true();
            expect( dispatchSpy.calledWith( "router:route:completed", sinon.match( function( value ){
                return value.route === "signin";
            } ) ) );
        } );
        it( 'should not redirect secured routes when allowed', function(){
            const navigateSpy = sinon.spy( instance, 'navigate' );
            const dispatchSpy = instance.dispatch = sinon.spy();
            const route = "a route";
            instance.secured = [ route ];
            instance.permissions = {
                toJSON: function(){
                    return { allowed: { [route]: { view: true } } };
                }
            };
            instance.trigger( 'route', route );
            expect( navigateSpy.called ).to.be.false();
            expect( dispatchSpy.calledWith( "router:route:completed", sinon.match( function( value ){
                return value.route === route;
            } ) ) );
        } );
    } );

} );
