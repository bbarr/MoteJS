describe('Mote.Util', function() {
	
	describe('#extend', function() {
		
		it ('should extend an object', function() {
			
			var src = { 'x': 'y' };
			var dest = { 'a': 'b' };
			
			Mote.Util.extend(dest, src);
			expect(dest.a).toBeDefined();
		});
	});
});