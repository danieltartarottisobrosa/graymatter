(function() {

  /**
   * @constructor
   */
  function Sensor( options ) {
    var self = this;
    var _id;
    var _neuron = new exports.Neuron();
  
    (function() {
      if ( !options ) return;

      if ( options.id ) {
        _id = options.id;
      }
    }());

    this.getId = function() {
      return _id;
    };

    this.setId = function( id ) {
      _id = id;
    };

    this.getSynapses = function() {
      return _neuron.getSynapses();
    };

    this.setSynapses = function( synapses ) {
      _neuron.getSynapses( synapses );
    };

    this.input = function( value ) {
      //console.log( self.getId(), "(", value, ") =", _neuron.getActivationFunction()( value ) );
      return _neuron.getActivationFunction()( value );
    };
  }

  exports.Sensor = Sensor;

}());