var expect = require( "chai" ).expect;
var Synapse = require( "../../dist/graymatter" ).Synapse;

describe( "Synapse", function() {

  it( "Should process input returning right output", function() {

    var synapse = new Synapse();

    expect( synapse.input( 1 ) ).to.be.equal( 0 );

  });

  it( "Should allow to change the weight", function() {

    var synapse = new Synapse();

    synapse.setWeight( 2 );

    expect( synapse.input( 1 ) ).to.be.equal( 2 );

  });

});