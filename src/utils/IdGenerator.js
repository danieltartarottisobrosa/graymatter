(function() {

  function IdGenerator() {
    var prefixes = {};
    
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