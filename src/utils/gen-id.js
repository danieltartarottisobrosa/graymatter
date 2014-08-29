(function() {

  var prefixes = {};

  function idGenerator( prefix ) {
    if ( !prefixes[ prefix ] ) {
      prefixes[ prefix ] = -1;
    }

    prefixes[ prefix ]++;

    return prefix + "" + prefixes[ prefix ];
  }

  exports.genId = idGenerator;

}());