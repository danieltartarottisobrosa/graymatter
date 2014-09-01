var expect = require( "chai" ).expect;
var RatioConverter = require( "../../dist/graymatter" ).RatioConverter;

describe( "RatioConverter", function() {

	it( "Should convert ratio '-1 <= x <= 1' to ratio '0 <= x <= 1'", function() {

		var converter = new RatioConverter( -1, 1, 0, 1 );

		expect( converter.convert( -1   ) ).to.be.equal( 0    );
		expect( converter.convert( -0.5 ) ).to.be.equal( 0.25 );
		expect( converter.convert(  0   ) ).to.be.equal( 0.5  );
		expect( converter.convert(  0.5 ) ).to.be.equal( 0.75 );
		expect( converter.convert(  1   ) ).to.be.equal( 1    );

	});

});