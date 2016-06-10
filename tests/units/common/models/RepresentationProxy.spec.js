'use strict';

const expect = require( 'must' );
const sinon = require( 'sinon' );
const assert = expect;
const pxquire = require( 'proxyquire' );
const dependencies = require( 'dependencies' );

const file = 'common/models/RepresentationProxy';
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
        describe( '#select()', function(){
            it( 'should set `selected` to `true`', function(){
                assert( instance.get( 'selected' ) ).to.be.false();
                instance.select();
                expect( instance.get( 'selected' ) ).to.be.true();
            } );
        } );
        describe( '#deselect()', function(){
            it( 'should set `selected` to `false`', function(){
                instance.select();
                assert( instance.get( 'selected' ) ).to.be.true();
                instance.deselect();
                expect( instance.get( 'selected' ) ).to.be.false();
            } );
        } );
        describe( '#hasDescription()', function(){
            it( 'should return `true` when it has a correct mimetype and text is provided', function(){
                assert( instance.hasDescription() ).to.be.false();
                instance.set( {
                    document: {
                        mimeType: "anything but text/html",
                        text: "Lorem ipsum"
                    }
                } );
                expect( instance.hasDescription() ).to.be.true();
            } );
            it( 'should return `false` when it has an incorrect mimetype', function(){
                assert( instance.hasDescription() ).to.be.false();
                instance.set( {
                    document: {
                        mimeType: "text/html",
                        text: "Lorem ipsum"
                    }
                } );
                expect( instance.hasDescription() ).to.be.false();
            } );
            it( 'should return `false` when it has no text', function(){
                assert( instance.hasDescription() ).to.be.false();
                instance.set( {
                    document: {
                        mimeType: "anything but text/html",
                    }
                } );
                expect( instance.hasDescription() ).to.be.false();
            } );
        } );
        describe( '#toJSON()', function(){
            it( 'should add `hasDescription` to JSON output', function(){
                instance.set( {
                    document: {
                        mimeType: "anything but text/html",
                        text: "Lorem ipsum"
                    }
                } );
                const actual = instance.toJSON();
                expect( actual.hasDescription ).to.be.true();
            } );
        } );
        describe( '#update()', function(){
            it( 'should send filedata', function(){
                const FormDataStub = function(){
                    //noop
                };
                FormDataStub.prototype.append = sinon.spy();

                GLOBAL.FormData = FormDataStub;
                sinon.stub( instance, 'save' );
                instance.set( { document: { _id: "document-01" } } );
                const file = {};
                instance.update( {
                    file: file,
                    assessment: 'assessment-01'
                } );
                const saveCall = instance.save.getCall( 0 );
                expect( saveCall ).to.not.be.null();
                const payload = saveCall.args[ 1 ];
                expect( payload.data ).to.be.an.instanceof( FormDataStub );
                expect( payload.processData ).to.be.false();
                expect( payload.contentType ).to.be.false();
                expect( payload.patch ).to.be.true();
                expect( payload.wait ).to.be.true();
                delete GLOBAL.FormData;
            } );
        } );
        describe( '#parse(raw)', function(){
            it( 'should parase `raw.data`', function(){
                const actual = instance.parse( { data: 'foo' } );
                expect( actual ).to.equal( 'foo' );
            } );
        } );
        describe( '#isOwnedBy(idOrObj)', function(){
            beforeEach( function(){
                instance.set( {
                    document: {
                        owner: [ 'baz', 'foo', 'qux' ]
                    }
                } );

            } );
            it( 'should return `false` if `idOrObj` is not found', function(){
                const actual = instance.isOwnedBy( 'notfound' );
                expect(actual).to.be.false();
            } );
            it( 'should return `true` if `idOrObj` string is found in `owner`', function(){
                const actual = instance.isOwnedBy( 'foo' );
                expect( actual ).to.be.true();
            } );
            it( 'should return `true` if `idOrObj` object `_id` is found in `owner`', function(){
                const actual = instance.isOwnedBy( { _id: 'foo' } );
                expect( actual ).to.be.true();
            } );
        } );
    } );
} );
