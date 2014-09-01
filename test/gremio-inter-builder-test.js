var expect = require( "chai" ).expect;
var graymatter = require( "../dist/graymatter" );

/**
 * A idéia é informar o código de um jogador e 
 * a rede neural saber identificar se ele joga
 * no Inter ou no Grêmio.
 *
 * # Legenda
 * 
 * -- 1 Inter --
 * 110 Folán
 * 111 Damião
 *
 * -- 0 Grêmio --
 * 100 Vargas
 * 101 Barcos
 */
 describe( "Internacional or Grêmio (using a builder)", function() {

  var neuronConfig = {
    activationFunction: function( u ) {
      return u < 0.5 ? 0 : 1;
    }
  };

  var builder = new graymatter.NeuralNetworkBuilder();
  builder.createInputLayer( 3 );
  builder.createOutputLayer( 1, neuronConfig );

  var neuralNetwork = builder.build();
  neuralNetwork.getSynapses()[ 1 ].setWeight( 1 );

  it( "Should recognize Internacional players", function() {

    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 1, Sensor2: 0 }).Neuron0 ).to.be.equal( 1 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 1, Sensor2: 1 }).Neuron0 ).to.be.equal( 1 );

  });

  it( "Should recognize Grêmio players", function() {

    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 0, Sensor2: 0 }).Neuron0 ).to.be.equal( 0 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 0, Sensor2: 1 }).Neuron0 ).to.be.equal( 0 );

  });

 });