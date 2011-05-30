describe('Mote.Collection', function() {
	
	var People;
	
	beforeEach(function() {
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
	});
	
	describe('#instantiate', function() {
		
		it ('should throw exception if initialize function is not provided', function() {
			
			var missing_initialization = function() {
				new Mote.Collection();
			}
			
			expect(missing_initialization).toThrow();
		});
		
		it ('should throw exception if name is not provided', function() {

			var incomplete_initialization = function() {
				new Mote.Collection(function() {});
			}

			expect(incomplete_initialization).toThrow();
		});
	
	});
	
	describe('#Document', function() {

		it ('should create a document with a link back to itself as "collection"', function() {
			var allison = new People.Document({ name: 'allison' });
			expect(allison.collection).toBe(People);
		});
	});
	
	describe('#include', function() {
		
		it ('should add functionality', function() {
			
			var AdditionalFunctionality = {
				x: [],
				y: function() {}
			}
			
			People.include(AdditionalFunctionality);
			
			expect(typeof People.y).toEqual('function');
			expect(People.x).toEqual([])
		});
	});
	
	describe('#insert', function() {
		
		it ('should add document to collection', function() {
			var allison = new People.Document({ name: 'allison' });
			allison.save();
			expect(People.documents[0]).toEqual(allison);
		});
	});
	
	describe('#update', function() {

		it ('should update document if already exists', function() {
			var allison = new People.Document({ name: 'allison' });
			allison.save();
			console.log(People.documents[0].get('name'));
			allison.set('name', 'allicat');
			console.log(People.documents[0].get('name'));			
			expect(People.documents[0].get('name')).toBe('allicat');
		});
	});
	
});