(function() {

	function SupervisedLearning( options ) {
		var self = this;
		var _truthValues = [];
		var _neuralNetwork = neuralNetwork;

		(function() {
			if ( !options ) return;

			// Initialize input options
		}());

		this.addTruth = function( input, output ) {
			_truthValues.push({
				input: input,
				output: output
			});
		};

		this.setNeuralNetwork = function( neuralNetwork ) {
			_neuralNetwork = neuralNetwork;
		};

		function testOne( neuralNetwork, testValue ) {
			var output = neuralNetwork.input( testValue.input );

		}

		this.teach = function( neuralNetwork ) {

		};
	}

	exports.SupervisedLearning = SupervisedLearning;

}());