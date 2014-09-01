var expect = require( "chai" ).expect;
var graymatter = require( "../../dist/graymatter" );

describe( "NeuralNetwork", function() {

  var neuralNetwork;

  it( "Should create simple neural network", function() {

    neuralNetwork = new graymatter.NeuralNetwork();
    var sensors;
    var neurons;
    var synapses;

    // Activation functions
    var binaryNeuronOptions = {
      activationFunction: function binary( u ) {
        return u < 0.5 ? 0 : 1;
      }
    };

    var synapseOptions = {
      weight: 1
    };

    // Layer 0 (input)
    sensors = [
      new graymatter.Sensor(),
      new graymatter.Sensor(),
      new graymatter.Sensor()
    ];

    // Layer 1 (hidden)
    neurons = [
      new graymatter.Neuron( binaryNeuronOptions ),
      new graymatter.Neuron( binaryNeuronOptions )
    ];

    // Layer 2 (output)
    neurons.push(
      new graymatter.Neuron( binaryNeuronOptions )
    );

    // Synapses
    synapses = [
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions ),
      new graymatter.Synapse( synapseOptions )
    ];

    // Link all the cells
    sensors[ 0 ].getSynapses().push( synapses[ 0 ] );
    sensors[ 0 ].getSynapses().push( synapses[ 1 ] );
    sensors[ 1 ].getSynapses().push( synapses[ 2 ] );
    sensors[ 1 ].getSynapses().push( synapses[ 3 ] );
    sensors[ 2 ].getSynapses().push( synapses[ 4 ] );
    sensors[ 2 ].getSynapses().push( synapses[ 5 ] );

    synapses[ 0 ].setNeuron( neurons[ 0 ] );
    synapses[ 1 ].setNeuron( neurons[ 1 ] );
    synapses[ 2 ].setNeuron( neurons[ 0 ] );
    synapses[ 3 ].setNeuron( neurons[ 1 ] );
    synapses[ 4 ].setNeuron( neurons[ 0 ] );
    synapses[ 5 ].setNeuron( neurons[ 1 ] );

    neurons[ 0 ].getSynapses().push( synapses[ 6 ] );
    neurons[ 1 ].getSynapses().push( synapses[ 7 ] );

    synapses[ 6 ].setNeuron( neurons[ 2 ] );
    synapses[ 7 ].setNeuron( neurons[ 2 ] );

    // Setup the neural network
    neuralNetwork.setSensors( sensors );
    neuralNetwork.setNeurons( neurons );
    neuralNetwork.setSynapses( synapses );

  });

  it( "Should return 0 to input 000", function() {

    // Send a input
    var output = neuralNetwork.input({
      Sensor0: 0,
      Sensor1: 0,
      Sensor2: 0
    });

    expect( output.Neuron2 ).to.be.equal( 0 );

  });

  it( "Should return 0 to input 001", function() {

    // Send a input
    var output = neuralNetwork.input({
      Sensor0: 1,
      Sensor1: 0,
      Sensor2: 0
    });

    expect( output.Neuron2 ).to.be.equal( 1 );

  });

  it( "Should return 1 to input 111", function() {

    // Send a input
    var output = neuralNetwork.input({
      Sensor0: 1,
      Sensor1: 1,
      Sensor2: 1
    });

    expect( output.Neuron2 ).to.be.equal( 1 );

  });

});