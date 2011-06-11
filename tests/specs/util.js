describe('Mote.Util', function() {
	
	var src,
		dest;
	
	beforeEach(function() {
		dest = {};
		src = {
			foo: 'bar',
			bif: {
				'baz': true
			},
			zop: [0,1,2]
		};
	});
	
	describe('#extend', function() {
		
		it ('should extend an object', function() {
			Mote.Util.extend(dest, src);
			expect(dest.foo).toBeDefined();
		});
		
		it ('should extend objects by reference if deep != true', function() {
			Mote.Util.extend(dest, src);
			src.bif.baz = 'new value';
			expect(dest.bif.baz).toBe('new value');
		});
		
		it ('should extend objects by value if deep == true', function() {
			Mote.Util.extend(dest, src, true);
			src.bif.baz = 'new value';
			expect(dest.bif.baz).toBe(true);
		});
		
		it ('should extend arrays by value if deep == true', function() {
			Mote.Util.extend(dest, src, true);
			src.zop.push(3);
			expect(dest.zop.length).toBe(3);
		});
	});
});