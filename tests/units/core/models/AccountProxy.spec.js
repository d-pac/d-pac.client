'use strict';

const expect = require( 'must' );
const sinon = require( 'sinon' );
const pxquire = require( 'proxyquire' );
const dependencies= require('dependencies');

const file = 'core/models/AccountProxy';
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
        it( 'should declare the `idAttribute` as "_id"', ()=>expect( instance.idAttribute ).to.equal( '_id' ) );
        describe( '#getAssessments(role)', function(){
            it( 'should retrieve assessments by role', function(){
                const getSpy = sinon.spy( instance, 'get' );
                instance.getAssessments( 'role' );
                expect( getSpy.calledWithExactly( 'assessments.role' ) ).to.be.true();
            } );
        } );
        describe( '#getAssessments()', function(){
            it( 'should retrieve all assessments', function(){
                sinon.stub( instance, 'get', function( key ){
                    return {
                        assessor: [ 'a', 'b' ],
                        assessee: [ 'c' ],
                        pam: [ 'd', 'e', 'f' ]
                    };
                } );
                const actual = instance.getAssessments();
                expect( actual ).to.eql( [ 'a', 'b', 'c', 'd', 'e', 'f' ] );
            } );
        } );
    } );
} );
