var expect = require( "chai" ).expect;
var graymatter = require( "../dist/graymatter" );

/**
 * A idéia é informar o código de uma pessoa e 
 * a rede neural saber identificar se ela é
 * homem ou mulher.
 *
 * # Legenda
 * 
 * -- 0 Homem --
 * 1000 Ivan
 * 1001 Thiago
 * 1010 Pedro
 *
 * -- 1 Mulher --
 * 1100 Tailine
 * 1101 Taina
 * 1110 Maria
 */
 describe( "Man or Woman (using a builder)", function() {

  var neuronOptions = {
    activationFunction: function( u ) {
      return u < 0.5 ? 0 : 1;
    }
  };

  var builder = new graymatter.NeuralNetworkBuilder();

  builder.createInputLayer( 4 );
  builder.createOutputLayer( 1, neuronOptions );

  var neuralNetwork = builder.build();
  neuralNetwork.getSynapses()[ 1 ].setWeight( 1 );

  it( "Should recognize as men", function() {

    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 0, Sensor2: 0, Sensor3: 0  }).Neuron0 ).to.be.equal( 0 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 0, Sensor2: 0, Sensor3: 1  }).Neuron0 ).to.be.equal( 0 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 0, Sensor2: 1, Sensor3: 0  }).Neuron0 ).to.be.equal( 0 );

  });

  it( "Should recognize as women", function() {

    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 1, Sensor2: 0, Sensor3: 0  }).Neuron0 ).to.be.equal( 1 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 1, Sensor2: 0, Sensor3: 1  }).Neuron0 ).to.be.equal( 1 );
    expect( neuralNetwork.input({ Sensor0: 1, Sensor1: 1, Sensor2: 1, Sensor3: 0  }).Neuron0 ).to.be.equal( 1 );
  });

 });