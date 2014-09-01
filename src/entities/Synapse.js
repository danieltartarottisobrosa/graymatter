(function() {

  /**
   * @constructor
   */
  function Synapse( options ) {
    var self = this;
    var _id;
    var _weight = 0;
    var _neuron = null;

    (function() {
      if ( !options ) return;

      if ( options.id ) {
        _id = options.id;
      }

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
      //console.log( self.getId(), "(", value, ") =", value * _weight );
      return value * _weight;
    };

  }

  exports.Synapse = Synapse;

}());