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
 describe( "Internacional or Grêmio", function() {

  var neuralNetwork = new graymatter.NeuralNetwork();

  var sensors = [
    new graymatter.Sensor({ id: "in0" }),
    new graymatter.Sensor({ id: "in1" }),
    new graymatter.Sensor({ id: "in2" })
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
    new graymatter.Synapse({ weight: 0 })
  ];

  sensors[ 0 ].getSynapses().push( synapses[ 0 ] );
  sensors[ 1 ].getSynapses().push( synapses[ 1 ] );
  sensors[ 2 ].getSynapses().push( synapses[ 2 ] );

  synapses[ 0 ].setNeuron( neurons[ 0 ] );
  synapses[ 1 ].setNeuron( neurons[ 0 ] );
  synapses[ 2 ].setNeuron( neurons[ 0 ] );

  neuralNetwork.setSensors( sensors );
  neuralNetwork.setNeurons( neurons );
  neuralNetwork.setSynapses( synapses );

  it( "Should recognize Internacional players", function() {

    expect( neuralNetwork.input({ in0: 1, in1: 1, in2: 0 }).out ).to.be.equal( 1 );
    expect( neuralNetwork.input({ in0: 1, in1: 1, in2: 1 }).out ).to.be.equal( 1 );

  });

  it( "Should recognize Grêmio players", function() {

    expect( neuralNetwork.input({ in0: 1, in1: 0, in2: 0 }).out ).to.be.equal( 0 );
    expect( neuralNetwork.input({ in0: 1, in1: 0, in2: 1 }).out ).to.be.equal( 0 );
  });

 });