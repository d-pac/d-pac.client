'use strict';

const _ = require( 'lodash' );
const expect = require( 'must' );
const assert = expect;
const sinon = require( 'sinon' );

const file = "common/mixins/selectable";
const subject = require( '../../../../src/scripts/' + file );

describe( file, function(){
    describe( 'spec', ()=>{
        it( 'should run', ()=> expect( true ).to.be.true() );
    } );

    describe( 'module', function(){
        it( 'should expose an object', ()=>expect( subject ).to.be.an.object() );
    } );

    let instance, Stub, resetSpy;

    beforeEach( function(){
        Stub = function(){
            this.get = _.noop;
            this.trigger = _.noop;
        };
        resetSpy = Stub.prototype.reset = sinon.spy();

        subject.collection.mixin( Stub );
        instance = new Stub();
    } );

    describe( 'mixedin API', function(){
        describe( '#selectByID(id)', function(){
            it( 'should retrieve and select by ID', function(){
                const expected = {};
                let payload;
                sinon.stub( instance, "get", function(){
                    payload = _.toArray( arguments );
                    return expected;
                } );
                instance.selectByID( 'foo' );
                expect( instance.selected ).to.equal( expected );
                expect( payload ).to.eql( [ 'foo' ] );
            } );
            it( 'should set selected to `undefined` if `id` not found', function(){
                instance.selectByID();
                expect( instance.selected ).to.be.undefined();
            } );
        } );
        describe( '#hasSelected()', function(){
            it( 'should return `true` when it has a selection', function(){
                instance.select( 'foo' );
                expect( instance.hasSelected() ).to.be.true();
            } );
            it( 'should return `false` when there\'s no selection', function(){
                expect( instance.hasSelected() ).to.be.false();
            } );
        } );
        describe( '#deselect(model)', function(){
            it( 'should deselect `model` if it was selected', function(){
                instance.select( 'foo' );
                assert( instance.selected ).to.equal( 'foo' );
                instance.deselect( 'foo' );
                expect( instance.selected ).to.be.undefined();
            } );
            it( 'should NOT deselect anything if `model` was not selected', function(){
                instance.select( 'foo' );
                assert( instance.selected ).to.equal( 'foo' );
                instance.deselect( 'baz' );
                expect( instance.selected ).to.equal( 'foo' );
            } );
            it( 'should deselect anything if `model` was not provided', function(){
                instance.select( 'foo' );
                assert( instance.selected ).to.equal( 'foo' );
                instance.deselect();
                expect( instance.selected ).to.be.undefined();
            } );
            it( 'should `trigger` a "change:selected" event if a value was selected', function(){
                instance.select( 'foo' );
                const triggerSpy = sinon.spy( instance, 'trigger' );
                instance.deselect( 'foo' );
                expect( triggerSpy.calledWithExactly( 'change:selected', undefined, 'foo' ) ).to.be.true();
            } );
            it( 'should NOT `trigger` a "change:selected" event if no value was selected', function(){
                const triggerSpy = sinon.spy( instance, 'trigger' );
                instance.deselect( 'foo' );
                expect( triggerSpy.called ).to.be.false();
            } );
        } );
        describe( '#select(model)', function(){
            it( 'should select `model`', function(){
                assert( instance.selected ).to.be.undefined();
                instance.select( 'foo' );
                expect( instance.selected ).to.equal( 'foo' );
            } );
            it( 'should `trigger` a "change:selected" event', function(){
                const triggerSpy = sinon.spy( instance, 'trigger' );
                instance.select( 'foo' );
                expect( triggerSpy.calledWithExactly( 'change:selected', 'foo', undefined ) ).to.be.true();
            } );
            it( 'should return `model`', function(){
                expect( instance.select( 'foo' ) ).to.equal( 'foo' );
            } );
            it( 'should call `onSelect`', function(){
                const onSelectSpy = instance.onSelect = sinon.spy();
                instance.select( 'foo' );
                expect( onSelectSpy.calledWithExactly( 'foo', undefined ) ).to.be.true();
            } );
            it( 'should NOT call `onDeselect` if no previous value was selected', function(){
                const onDeselectSpy = instance.onDeselect = sinon.spy();
                instance.select( 'foo' );
                expect( onDeselectSpy.called ).to.be.false();
            } );
            it( 'should call `onDeselect` if a previous value was selected', function(){
                instance.select( 'baz' );
                const onDeselectSpy = instance.onDeselect = sinon.spy();
                instance.select( 'foo' );
                expect( onDeselectSpy.calledWithExactly( 'baz' ) ).to.be.true();
            } );
        } );
        describe( '#reset', function(){
            it( 'should deselect any value', function(){
                instance.select( 'foo' );
                instance.reset();
                expect( instance.selected ).to.be.undefined();
            } );
            it( 'should not overwrite an original `reset` method', function(){
                instance.reset();
                expect( resetSpy.calledOnce ).to.be.true();
            } );
        } );
    } );

} );
