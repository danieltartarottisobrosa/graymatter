(function() {

  /**
   * @constructor
   */
  function NeuralNetwork() {
    var self = this;

    var _sensors = [];
    var _neurons = [];
    var _synapses = [];

    (function() {

    }());

    this.getSensors = function() {
      return _sensors;
    };

    this.setSensors = function( sensors ) {
      _sensors = sensors;
    };

    this.getNeurons = function() {
      return _neurons;
    };

    this.setNeurons = function( neurons ) {
      _neurons = neurons;
    };

    this.getSynapses = function() {
      return _synapses;
    };

    this.setSynapses = function( synapses ) {
      _synapses = synapses;
    };

    function applyValueToCells( values, cells, linksName, getLinksName ) {
      var cell;
      var value;
      var key;
      var i;
      var newKey;
      var links;
      var link;

      var ret = { values: {} };
      ret[ linksName ] = {};

      // Percorre os celulas
      for ( key in  cells ) {
        cell = cells[ key ];

        // Pulsa o valor por dentro da celula
        value = cell.input( values[ key ] );
        links = cell[ getLinksName ]();

        if ( cell instanceof exports.Synapse ) {
          links = [ links ];
        }

        // Mapeia o valor para cada uma dos links da celula
        for ( i = 0; i < links.length; i++ ) {
          link = links[ i ];
          newKey = link.getId();

          // Armazena no retorno
          ret.values[ newKey ] = value;
          ret[ linksName ][ newKey ] = link;
        }
      }

      return ret;
    }

    function applyValuesToSensors( values, sensors ) {
      return applyValueToCells( values, sensors, "synapses", "getSynapses" );
    }

    function applyValuesToNeurons( values, neurons ) {
      return applyValueToCells( values, neurons, "synapses", "getSynapses" );
    }

    function applyValuesToSynapses( values, synapses ) {
      return applyValueToCells( values, synapses, "neurons", "getNeuron" );
    }

    this.input = function( values ) {
    	var ret = applyValuesToSensors( values, _sensors );

      do {
        ret = applyValuesToSynapses( ret.values, ret.synapses );
        ret = applyValuesToNeurons( ret.values, ret.neurons );

      } while ( ( ret.neurons && ret.neurons.length ) || ( ret.synapses && ret.synapses.length ) );

      return ret.values;
    };

  }

  exports.NeuralNetwork = NeuralNetwork;

}());