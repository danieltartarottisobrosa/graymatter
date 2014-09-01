(function() {

  /**
   * @constructor
   */
  function Neuron( options ) {
    var self = this;
    var _id;
    var _activationFunction = function( u ) { return u; };
    var _synapses = [];

    (function() {
      if ( !options ) return;

      if ( options.id ) {
        _id = options.id;
      }

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
      var i;

      for ( i = 0; i < values.length; i++ ) {
        u += values[ i ];
      }

      y = _activationFunction( u );
      //console.log( self.getId(), "(", values, ") = f(", u, ") =", y );
      return y;
    };
  }

  exports.Neuron = Neuron;

}());