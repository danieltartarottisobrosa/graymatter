(function() {

  /**
   * @constructor
   */
  function Sensor( options ) {
    var _id = exports.genId( "Sensor" );
    var _neuron = new exports.Neuron();
  
    (function() {
      if ( !options ) return;

      if ( options.activationFunction ) {
        _neuron.setActivationFunction( options.activationFunction );
      }
    }());

    this.getId = function() {
      return _id;
    };

    this.setId = function( id ) {
      _id = id;
    };

    this.getActivationFunction = function() {
      return _neuron.getActivationFunction();
    };

    this.setActivationFunction = function( activationFunction ) {
      _neuron.setActivationFunction( activationFunction );
    };

    this.getSynapses = function() {
      return _neuron.getSynapses();
    };

    this.setSynapses = function( synapses ) {
      _neuron.getSynapses( synapses );
    };

    this.input = function( value ) {
      return _neuron.getActivationFunction()( value );
    };
  }

  exports.Sensor = Sensor;

}());