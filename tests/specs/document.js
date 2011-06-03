describe('Mote.Document', function() {
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
		
		allison = new People.Document({ name: 'allison' });
		
		spyOn(People, 'insert');
		spyOn(People, 'update');
	});
	
	describe('#load', function() {
		
		it ('should return the value or nil', function() {
			allison.load({ 'x': 'y' });
			expect(allison.data['x']).toBe('y');
		});
	});
	
	describe('#save', function() {
		
		it ('should call collection#insert if new', function() {
			allison.save();
			expect(People.insert).toHaveBeenCalled();
		});
		
		it ('should call collection#update if not new', function() {
			allison.is_new = false;
			allison.save();
			expect(People.update).toHaveBeenCalled();
		});
	});
	
	describe('#copy', function() {
		
		it ('should be a copy by value, not reference', function() {
			expect(allison.copy()).not.toBe(allison);
			expect(allison.copy()).toEqual(allison);
		});
		
		it ('should have independent object properties', function() {
			var copy = allison.copy();
			allison.data.name = 'alli';
			expect(copy.data.name).not.toBe('alli');
		});
	});
	
});