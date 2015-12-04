'use strict';

var d3 = require( 'd3' );
var _ = require( 'lodash' );
//var chainable = require( 'chainable-object' );
//var $ = require( 'jquery' );

var DEFAULTS = {
  margin: {
    top: 30,
    right: 30,
    left: 30,
    bottom: 30
  },
  graph: {
    width: undefined,
    height: undefined,
    ratio: 0.5
  },
  point: {
    radius: undefined,
    ratio: 4
  },
  el: false,
  data: false,
  hitmargin: 4,
  debug: false
};

function convertToNumber( value ){
  return Number( value );
}
function Renderer(){
};
Renderer.prototype.render = function render( opts ){
  console.log( 'GRAPH RENDER' );
  opts = _.defaultsDeep( opts, DEFAULTS );
  if( !opts.el ){
    throw new Error( '"el" required.' );
  }
  if( !opts.data ){
    throw new Error( '"data" required.' );
  }

  var el = d3.select( opts.el );
  var graphWidth = opts.graph.width || parseInt( el.style( 'width' ) );
  var graphHeight = opts.graph.height || opts.graph.ratio * graphWidth;

  var contentWidth = graphWidth - opts.margin.left - opts.margin.right;
  var contentHeight = graphHeight - opts.margin.top - opts.margin.bottom;
  this._cache = {
    graph: {
      width: graphWidth,
      height: graphHeight
    },
    content: undefined,
    x: d3.scale.linear().range( [ 0, contentWidth ] ),
    y: d3.scale.linear().range( [ contentHeight, 0 ] ),
    color: d3.scale.category10()
  };

  var xScale = d3.scale.linear().range( [ 0, contentWidth ] );

  function returnX( d ){
    return xScale( d.x );
  }

  var yScale = d3.scale.linear().range( [ contentHeight, 0 ] );
  var color = d3.scale.category10();

  function returnColor( d ){
    return color( d.state );
  }

  var n = _.size( opts.data );
  var xAxis = d3.svg.axis()
    .scale( xScale )
    .orient( "bottom" );
  var yAxis = d3.svg.axis()
    .scale( yScale )
    .orient( "left" );
  var content = el
    .append( "svg" )
    .attr( 'class', 'd3-stock-plot' )
    .attr( "width", graphWidth )
    .attr( "height", graphHeight )
    .append( "g" )
    .attr( "transform", "translate(" + opts.margin.left + "," + opts.margin.top + ")" );
  xScale.domain( [ 0, n ] );
  yScale.domain( [
    d3.min( opts.data, function( d ){
      return d.y - d.se
    } ) - 1,
    d3.max( opts.data, function( d ){
      return d.y + d.se
    } ) + 1
  ] );

  content.append( "g" )
    .attr( "class", "x axis" )
    .attr( "transform", "translate(0," + contentHeight + ")" )
    .call( xAxis );

  content.append( "g" )
    .attr( "class", "y axis" )
    .call( yAxis );

  var radius = opts.point.radius || (graphWidth / n / opts.point.ratio / 2);

  function grow( d ){
    var selection = d3.select( '#value-' + d.id + " .point" );
    if( !d._selected ){
      selection
        .transition().duration( 250 ).ease( 'cubic-out' ).delay( 0 )
        .attr( 'r', opts.point.ratio * radius );
    }
    return selection;
  }

  function shrink( d ){
    var selection = d3.select( '#value-' + d.id + " .point" );
    if( !d._selected ){
      selection
        .transition().duration( 500 ).ease( 'cubic-in-out' ).delay( 0 )
        .attr( 'r', radius );
    }
    return selection;
  }

  var selectedDatum;

  var values = content.selectAll( "values" )
    .data( opts.data ).enter()
    .append( "g" )
    .attr( 'class', function(d){
      if( d.classes){
        return d.classes.concat('stock-value' ).join(' ');
      }
      return 'stock-value';
    } )
    .attr( 'id', function( d ){
      return "value-" + d.id;
    } )
    .on( 'mouseover.stockplot', function( d ){
      grow( d );
    } )
    .on( 'mouseout.stockplot', shrink )
    .on( 'click.stockplot', function( d ){
      var selection;
      if( selectedDatum ){
        selection = d3.select( '#value-' + selectedDatum.id + " .point" );
        selectedDatum._selected = false;
        selection.classed( 'selected', false );
        selection.classed( 'visited', true );
        shrink( selectedDatum );
      }
      d._selected = true;
      selectedDatum = d;
      selection = d3.select( '#value-' + d.id + " .point" );
      selection.classed( 'selected', true );
    } );

  //lines
  values
    .append( "line" )
    .attr( 'class', 'range' )
    .attr( "x1", returnX )
    .attr( "x2", returnX )
    .attr( "y1", function( d ){
      return yScale( d.y - d.se );
    } )
    .attr( "y2", function( d ){
      return yScale( d.y + d.se );
    } )
    .style( "stroke-width", 1 )
    .style( "stroke", returnColor )
    .style( "fill", "none" )
  ;

  //circles
  values
    .append( "circle" )
    .attr( "class", "point" )
    .attr( "r", radius )
    .attr( "cx", returnX )
    .attr( "cy", function( d ){
      return yScale( d.y );
    } )
    .style( "fill", returnColor )
  ;

  //hit boxes
  values.append( 'rect' )
    .each( function(){
      //var parent = $(this.parentNode);
      //console.log(this.parentNode.getBoundingClientRect());
      var bounds = this.parentNode.getBBox();
      d3.select( this )
        .attr( {
          'class': 'hitbox',
          x: bounds.x - opts.hitmargin,
          y: bounds.y - opts.hitmargin,
          width: bounds.width + (opts.hitmargin * 2),
          height: bounds.height + (opts.hitmargin * 2)
        } )
        .style( 'fill', 'rgba(0,0,0,' + (opts.debug
            ? '0.3'
            : '0' )
          + ')' )
      ;
    } );

  return { svg: content, values: values};
};

module.exports = function D3StockPlot(){
  return new Renderer();
};

module.exports.DEFAULTS = DEFAULTS;