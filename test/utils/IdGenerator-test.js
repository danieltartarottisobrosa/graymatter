var expect = require( "chai" ).expect;
var IdGenerator = require( "../../dist/graymatter" ).IdGenerator;

describe( "IdGenerator", function() {

	it( "Should generate sequence ids by prefixes", function() {
		var ig = new IdGenerator();

		expect( ig.genId( "a" ) ).to.be.equal( "a0" );
		expect( ig.genId( "a" ) ).to.be.equal( "a1" );
		expect( ig.genId( "b" ) ).to.be.equal( "b0" );
		expect( ig.genId( "a" ) ).to.be.equal( "a2" );
		expect( ig.genId( "b" ) ).to.be.equal( "b1" );
		expect( ig.genId( "b" ) ).to.be.equal( "b2" );

	});

});