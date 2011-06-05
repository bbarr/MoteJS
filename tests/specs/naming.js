describe('Mote.Naming', function() {
	
	describe('#pluralize', function() {
		
		it ('should return a plural version for a plural with "s"', function() {
			expect(Mote.Naming.pluralize('keyboard')).toBe('keyboards');
		});
		
		it ('should return a plural version for a custom plural', function() {
			Mote.Naming.register('mouse', 'mice');
			expect(Mote.Naming.pluralize('mouse')).toBe('mice');
		});
	});
	
	describe('#singularize', function() {
		
		it ('should return a singular version for a plural with "s"', function() {
			expect(Mote.Naming.singularize('keyboards')).toBe('keyboard');
		});
		
		it ('should return a singular version for a custom plural', function() {
			Mote.Naming.register('mouse', 'mice');
			expect(Mote.Naming.singularize('mice')).toBe('mouse');
		});
	});
});