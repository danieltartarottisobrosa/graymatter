var expect = require( "chai" ).expect;

describe( "NeuralNetworkBuilder", function() {
  var NeuralNetworkBuilder = require( "../../dist/graymatter" ).NeuralNetworkBuilder;

  it( "Should create a neural network correctly", function() {

    var neuronOptions = {
      activationFunction: function( u ) {
        return u < 0.5 ? 0 : 1;
      }
    };

    var synapseOptions = {
      weight: 1
    };

    var builder = new NeuralNetworkBuilder();

    builder.createInputLayer( 4 );
    builder.createHiddenLayer( 3, neuronOptions, synapseOptions );
    builder.createHiddenLayer( 2, neuronOptions, synapseOptions );
    builder.createOutputLayer( 1, neuronOptions, synapseOptions );

    var neuralNetwork = builder.build();
    var output;

    output = neuralNetwork.input({
      Sensor0: 0,
      Sensor1: 0,
      Sensor2: 0,
      Sensor3: 0
    });

    expect( output.Neuron5 ).to.be.equal( 0 );
    
    output = neuralNetwork.input({
      Sensor0: 0,
      Sensor1: 1,
      Sensor2: 1,
      Sensor3: 0
    });

    expect( output.Neuron5 ).to.be.equal( 1 );

  });

});