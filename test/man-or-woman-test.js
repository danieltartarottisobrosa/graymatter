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
 describe( "Man or Woman", function() {

  var neuralNetwork = new graymatter.NeuralNetwork();

  var sensors = [
    new graymatter.Sensor({ id: "in0" }),
    new graymatter.Sensor({ id: "in1" }),
    new graymatter.Sensor({ id: "in2" }),
    new graymatter.Sensor({ id: "in3" })
  ];

  var neurons = [
    new graymatter.Neuron({
      id: "out",
      activationFunction: function( u ) {
        return u < 0.5 ? 0 : 1;
      }
    })
  ];

  var synapses = [
    new graymatter.Synapse({ weight: 0 }),
    new graymatter.Synapse({ weight: 1 }),
    new graymatter.Synapse({ weight: 0 }),
    new graymatter.Synapse({ weight: 0 })
  ];

  sensors[ 0 ].getSynapses().push( synapses[ 0 ] );
  sensors[ 1 ].getSynapses().push( synapses[ 1 ] );
  sensors[ 2 ].getSynapses().push( synapses[ 2 ] );
  sensors[ 3 ].getSynapses().push( synapses[ 3 ] );

  synapses[ 0 ].setNeuron( neurons[ 0 ] );
  synapses[ 1 ].setNeuron( neurons[ 0 ] );
  synapses[ 2 ].setNeuron( neurons[ 0 ] );
  synapses[ 3 ].setNeuron( neurons[ 0 ] );

  neuralNetwork.setSensors( sensors );
  neuralNetwork.setNeurons( neurons );
  neuralNetwork.setSynapses( synapses );

  it( "Should recognize as men", function() {

    expect( neuralNetwork.input({ in0: 1, in1: 0, in2: 0, in3: 0  }).out ).to.be.equal( 0 );
    expect( neuralNetwork.input({ in0: 1, in1: 0, in2: 0, in3: 1  }).out ).to.be.equal( 0 );
    expect( neuralNetwork.input({ in0: 1, in1: 0, in2: 1, in3: 0  }).out ).to.be.equal( 0 );

  });

  it( "Should recognize as women", function() {

    expect( neuralNetwork.input({ in0: 1, in1: 1, in2: 0, in3: 0  }).out ).to.be.equal( 1 );
    expect( neuralNetwork.input({ in0: 1, in1: 1, in2: 0, in3: 1  }).out ).to.be.equal( 1 );
    expect( neuralNetwork.input({ in0: 1, in1: 1, in2: 1, in3: 0  }).out ).to.be.equal( 1 );
  });

 });