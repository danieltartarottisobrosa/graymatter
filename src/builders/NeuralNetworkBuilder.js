(function() {

  function NeuralNetworkBuilder() {
    var self = this;
    var _inputSensors = [];
    var _hiddenLayers = [];
    var _outputNeurons = [];
    var _synapses = [];

    this.createInputLayer = function( count ) {
      var i;
      _inputSensors = [];

      for ( i = 0; i < count; i++ ) {
        _inputSensors.push( new exports.Sensor() );
      }
    };

    function createSynapses( fromLayer, toNeuron, synapseOptions ) {
      var synapsesPerNeuron = fromLayer.length;
      var synapse;
      var i;

      for ( i = 0; i < synapsesPerNeuron; i++ ) {
        synapse = new exports.Synapse( synapseOptions );

        fromLayer[ i ].getSynapses().push( synapse );
        synapse.setNeuron( toNeuron );

        _synapses.push( synapse );
      }
    }

    this.createHiddenLayer = function( count, neuronOptions, synapseOptions ) {
      var layer = [];
      var neuron;
      var i;
      var previousLayer;

      if ( _hiddenLayers.length === 0 ) {
        previousLayer = _inputSensors;
      } else {
        previousLayer = _hiddenLayers[ _hiddenLayers.length - 1 ];
      }

      for ( i = 0; i < count; i++ ) {
        neuron = new exports.Neuron( neuronOptions );
        createSynapses( previousLayer, neuron, synapseOptions );
        layer.push( neuron );
      }

      _hiddenLayers.push( layer );
    };

    this.createOutputLayer = function( count, neuronOptions, synapseOptions ) {
      var i;
      var neuron;
      var previousLayer;

      if ( _hiddenLayers.length > 0 ) {
        previousLayer = _hiddenLayers[ _hiddenLayers.length - 1 ];
      } else {
        previousLayer = _inputSensors;
      }

      _outputNeurons = [];

      for ( i = 0; i < count; i++ ) {
        neuron = new exports.Neuron( neuronOptions );
        createSynapses( previousLayer, neuron, synapseOptions );
        _outputNeurons.push( neuron );
      }
    };

    function joinNeurons( hiddenLayers, outputLayer ) {
      var all = [], i, j;

      for ( i = 0; i < hiddenLayers.length; i++ ) {
        for ( j = 0; j < hiddenLayers[ i ].length; j++ ) {
          all.push( hiddenLayers[ i ][ j ] );
        }
      }

      for ( i = 0; i < outputLayer.length; i++ ) {
        all.push( outputLayer[ i ] );
      }

      return all;
    }

    this.build = function() {
      var nn = new exports.NeuralNetwork();

      nn.setSensors( _inputSensors );
      nn.setNeurons( joinNeurons( _hiddenLayers, _outputNeurons ) );
      nn.setSynapses( _synapses );

      return nn;
    };
  }

  exports.NeuralNetworkBuilder = NeuralNetworkBuilder;

}());