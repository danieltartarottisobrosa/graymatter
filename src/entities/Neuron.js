(function() {

  /**
   * @constructor
   */
  function Neuron( options ) {
    var _id = exports.genId( "Neuron" );
    var _activationFunction = function( u ) { return u; };
    var _synapses = [];

    (function() {
      if ( !options ) return;

      if ( options.activationFunction ) {
        _activationFunction = options.activationFunction;
      }
    }());
    
    this.getId = function() {
      return _id;
    };

    this.setId = function( id ) {
      _id = id;
    };

    this.getActivationFunction = function() {
      return _activationFunction;
    };

    this.setActivationFunction = function( activationFunction ) {
      _activationFunction = activationFunction;
    };

    this.getSynapses = function() {
      return _synapses;
    };

    this.setSynapses = function( synapses ) {
      _synapses = synapses;
    };

    this.input = function( values ) {
      var u = 0;
      var y;
      var id;

      for ( id in values ) {
        u += values[ id ];
      }

      y = _activationFunction( u );
      return y;
    };
  }

  exports.Neuron = Neuron;

}());