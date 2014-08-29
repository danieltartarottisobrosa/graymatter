(function() {

  /**
   * @constructor
   */
  function Synapse( options ) {
    var _id = exports.genId( "Synapse" );
    var _weight = 0;
    var _neuron = null;

    (function() {
      if ( !options ) return;

      if ( typeof options.weight !== "undefined" ) {
        _weight = options.weight;
      }
    }());

    this.getId = function() {
      return _id;
    };

    this.setId = function( id ) {
      _id = id;
    };

    this.getWeight = function() {
      return _weight;
    };

    this.setWeight = function( weight ) {
     _weight = weight;
    };

    this.getNeuron = function() {
      return _neuron;
    };

    this.setNeuron = function( neuron ) {
      _neuron = neuron;
    };

    this.input = function( value ) {
      return value * _weight;
    };

  }

  exports.Synapse = Synapse;

}());