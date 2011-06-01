describe('Mote.Document', function() {
	
	describe('#insert', function() {
		
		it ('should add document to collection', function() {
			allison.save();
			expect(People.documents[0].data).toEqual(allison.data);
		});
	});
	
	describe('#update', function() {
		
		it ('should update document if already exists', function() {
			allison.save();
			allison.set('name', 'allicat');
			allison.update();
			expect(allison.get('name')).toBe('allicat');
		});
	});

	describe('#prep', function() {
		
		it ('should create a duplicate document instance for storage', function() {
			
		});
	});
	
});