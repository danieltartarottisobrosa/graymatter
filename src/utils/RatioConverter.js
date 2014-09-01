(function() {

	function RatioConverter( oldMin, oldMax, newMin, newMax ) {

		this.convert = function( value ) {
			return ( ( ( value - oldMin ) * ( newMax - newMin ) ) / ( oldMax - oldMin ) ) + newMin;
		};
	}

	exports.RatioConverter = RatioConverter;

}());