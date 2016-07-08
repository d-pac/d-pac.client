'use strict';

const _ = require( 'lodash' );

const expect = require( 'must' );
const sinon = require( 'sinon' );
const pxquire = require( 'proxyquire' );
const dependencies = require( 'dependencies' );

GLOBAL.FormData = require('FormDataStub');


const file = 'uploads/models/UploadModel';
const subject = pxquire
    .noCallThru()
    .load( '../../../../src/scripts/' + file, _.defaults(dependencies, {
    "../../common/models/RepresentationProxy":
    } );

describe.only( file, function(){
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
        describe( '#save', function(){
            it( 'should update its representation', function(){
                const representationStub = new dependencies.backbone.Model();
                const updateSpy = representationStub.update = sinon.spy();
                const attrs = { foo: "foo" };
                instance.set( { representation: representationStub } );

                instance.save( attrs );
                expect( updateSpy.calledOnce ).to.be.true();
                expect( updateSpy.calledWithExactly( attrs ) ).to.be.true();
            } );
            it( 'should trigger an event exactly once the representation finishes its update', function(){
                const eventSpy = sinon.spy();
                const representationStub = new dependencies.backbone.Model();
                representationStub.update = _.noop;
                instance.set( { representation: representationStub } );
                instance.on( 'change:representation', eventSpy );

                instance.save( {} );
                representationStub.trigger( 'change' );
                expect( eventSpy.calledOnce );
                representationStub.trigger( 'change' );
                expect( eventSpy.calledOnce );
            } );
            it( 'should register a new representation when none was defined', function(){
                dependencies
                instance.representationsCollection = { add: sinon.spy() };
                instance.save( {} );
                expect( instance.representationsCollection.add.calledOnce ).to.be.true();s
            } );
        } );
        describe( '#uploadingEnabled', function(){
            let assessmentStub;
            beforeEach( function(){
                assessmentStub = new dependencies.backbone.Model();
                instance.set( 'assessment', assessmentStub );
            } );
            it( 'should return `true` when the assessment has a "draft" `state`', function(){
                assessmentStub.set( 'state', 'draft' );

                const actual = instance.uploadingEnabled();
                expect( actual ).to.be.true();
            } );
            it( `should return \`true\` when the assessment has a "published" \`state\` 
            && the instance hasn't got a representation`, function(){
                assessmentStub.set( 'state', 'published' );

                const actual = instance.uploadingEnabled();
                expect( actual ).to.be.true();
            } );
            it( `should return \`false\` when the assessment has a "published" \`state\` 
            && the instance has a representation`, function(){
                assessmentStub.set( 'state', 'published' );
                instance.set( 'representation', true );

                const actual = instance.uploadingEnabled();
                expect( actual ).to.be.false();
            } );
        } );
    } );
} );
