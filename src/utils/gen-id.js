(function() {

  var prefixes = {};

  function IdGenerator() {

	this.genId = function( prefix ) {
		if ( typeof prefixes[ prefix ] === "undefined" ) {
		  prefixes[ prefix ] = -1;
		}

		prefixes[ prefix ]++;

		return prefix + "" + prefixes[ prefix ];
	};

  }

  exports.IdGenerator = IdGenerator;

}());