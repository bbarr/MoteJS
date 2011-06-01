describe('Mote.Collection', function() {
	
	var People,
		allison;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
		
		allison = new People.Document({ name: 'allison' });
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
	
	describe('#uid', function() {
		
		it ('should create an ID (auto-increment)', function() {
			var brendan = new People.Document({name: 'brendan'});
			allison.insert();
			brendan.insert();
			expect(allison.id).not.toEqual(brendan.id);
		});
		
	});
	
	describe('#find', function() {
		
		it ('should return a set of documents that match', function() {
			allison.save();
			var allisons = People.find({ name: 'allison' });
			expect(allisons[0].data).toEqual(allison.data);
		});
		
		it ('should work for multiple conditions', function() {
			allison.save();
			var other_allison = new People.Document({ name: 'allison', age: 24 });
			other_allison.save();
			
			var allisons = People.find({ name: 'allison', age: 24 });
			expect(allisons[0].data).toEqual(other_allison.data);
		});
		
	});
	
	describe('#find_one', function() {
		
		it ('should return first doc that matches', function() {
			allison.save();
			var one_allison = People.find_one({ name: 'allison' });
			expect(one_allison.data).toEqual(allison.data);
		});
	});
	
	describe('#insert', function() {
		
		it ('should insert new document into collection', function() {
			allison.is_new = false;
			allison._generate_id();
			var dup = allison._duplicate();
			People.insert(dup);
			expect(People.documents[0]).toBe(dup);
		});
	});
	
	describe('#update', function() {
		
		it ('should update document')
	});
	
	describe('#index_of', function() {
		
		it ('should return the proper index of the passed document', function() {
			allison.save();
			var index = People.index_of(allison);
			expect(index).toBe(0);
		});
	});
});