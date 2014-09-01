var expect = require( "chai" ).expect;
var Neuron = require( "../../dist/graymatter" ).Neuron;

describe( "Neuron", function() {

  it( "Should process input returning right output", function() {

    var neuron = new Neuron();

    expect( neuron.input([ 1 ]) ).to.be.equal( 1 );
    expect( neuron.input([ 1, 2 ]) ).to.be.equal( 3 );

  });

  it( "Should allow to change the activation function", function() {

    var neuron = new Neuron();

    neuron.setActivationFunction( function( u ) {
      return u < 0.5 ? 0 : 1;
    });

    expect( neuron.input([ 0, 0 ]) ).to.be.equal( 0 );
    expect( neuron.input([ 0, 1 ]) ).to.be.equal( 1 );
    expect( neuron.input([ 1, 0 ]) ).to.be.equal( 1 );
    expect( neuron.input([ 1, 1 ]) ).to.be.equal( 1 );

  });

});