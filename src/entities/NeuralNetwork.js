(function() {

  /**
   * @constructor
   */
  function NeuralNetwork() {
    var self = this;
    var idGenerator = new exports.IdGenerator();

    var _sensors = [];
    var _neurons = [];
    var _synapses = [];

    (function() {

      // Initialize options

    }());

    function setIds( prefix, arr ) {
      var i;
      var id;

      for ( i = 0; i < arr.length; i++ ) {
        id = idGenerator.genId( prefix );
        arr[ i ].setId( id );
      }

      return arr;
    }

    this.getSensors = function() {
      return _sensors;
    };

    this.setSensors = function( sensors ) {
      _sensors = setIds( "Sensor", sensors );
    };

    this.getNeurons = function() {
      return _neurons;
    };

    this.setNeurons = function( neurons ) {
      _neurons = setIds( "Neuron", neurons );
    };

    this.getSynapses = function() {
      return _synapses;
    };

    this.setSynapses = function( synapses ) {
      _synapses = setIds( "Synapse", synapses );
    };

    function applyValuesToSensors( values, sensors ) {
      var sensor, value;
      var key, newKey;
      var links, link;
      var i;

      var ret = { values: {} };
      ret.synapses = {};

      // Percorre os celulas
      for ( key in  sensors ) {
        sensor = sensors[ key ];

        // Pulsa o valor por dentro da celula
        value = sensor.input( values[ key ] );
        links = sensor.getSynapses();

        // Mapeia o valor para cada uma dos links da celula
        for ( i = 0; i < links.length; i++ ) {
          link = links[ i ];
          newKey = link.getId();

          // Armazena no retorno
          ret.values[ newKey ] = value;
          ret.synapses[ newKey ] = link;
        }
      }

      return ret;
    }

    function applyValuesToNeurons( values, neurons ) {
      var neuron, value;
      var key, newKey;
      var links, link;
      var i;
      var count = 0;

      var ret = { values: {} };
      ret.synapses = {};

      // Percorre os neurônios
      for ( key in  neurons ) {
        neuron = neurons[ key ];
        count++;

        // Pulsa os valores para dentro do neurônio
        value = neuron.input( values[ key ] );
        links = neuron.getSynapses();

        // Mapeia o valor para cada uma dos links da celula
        for ( i = 0; i < links.length; i++ ) {
          link = links[ i ];
          newKey = link.getId();

          // Armazena no retorno
          ret.values[ newKey ] = value;
          ret.synapses[ newKey ] = link;
        }
      }

      if ( count === 1 ) {
        ret = { finish: true, value: {} };
        ret.value[ key ] = value;
      }

      return ret;
    }

    function applyValuesToSynapses( values, synapses ) {
      var synapse, value;
      var key, newKey;
      var link;
      var i;

      var ret = { values: {} };
      ret.neurons = {};

      // Percorre os celulas
      for ( key in  synapses ) {
        synapse = synapses[ key ];

        // Pulsa o valor por dentro da celula
        value = synapse.input( values[ key ] );
        link = synapse.getNeuron();

        // Mapeia o valor para cada uma dos links da celula
        newKey = link.getId();

        // Armazena no retorno
        if ( !ret.values[ newKey ] ) {
          ret.values[ newKey ] = [];
        }

        ret.values[ newKey ].push( value );
        ret.neurons[ newKey ] = link;
      }

      return ret;
    }

    function arrayToMap( arr ) {
      var map = {};
      var i;
      var item;

      for ( i = 0; i < arr.length; i++ ) {
        item = arr[ i ];
        map[ item.getId() ] = item;
      }


      return map;
    }

    function hasKeys( map ) {
      var key;

      for ( key in map ) {
        return true;
      }

      return false;
    }

    this.input = function( values ) {
      var sensorsMap = arrayToMap( _sensors );
    	var retNeurons = applyValuesToSensors( values, sensorsMap );
      var retSynapses;

      do {
        retSynapses = applyValuesToSynapses( retNeurons.values, retNeurons.synapses );
        retNeurons = applyValuesToNeurons( retSynapses.values, retSynapses.neurons );

      } while ( !retNeurons.finish );

      return retNeurons.value;
    };

  }

  exports.NeuralNetwork = NeuralNetwork;

}());