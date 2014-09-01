var expect = require( "chai" ).expect;
var Sensor = require( "../../dist/graymatter" ).Sensor;

describe( "Sensor", function() {

  it( "Should process input returning right output", function() {

    var sensor = new Sensor();

    expect( sensor.input( 1 ) ).to.be.equal( 1 );
    expect( sensor.input( 2 ) ).to.be.equal( 2 );

  });

});