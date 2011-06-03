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
	
	describe('#use', function() {
		
		it ('should add functionality to collection', function() {
			
			var AdditionalFunctionality = {
				collection: {
					x: []
				},
				document: {
					y: function() {}
				}
			}
			
			var Things = new Mote.Collection(function() {
				this.use(AdditionalFunctionality);
				this.name = 'things';
				this.keys = ['x'];
			});
			
			expect(People.x).toEqual([]);
		});
	});
	
	describe('#uid', function() {
		
		it ('should create an ID (auto-increment)', function() {
			var brendan = new People.Document( {name: 'brendan'} );
			allison.save();
			brendan.save();
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
			allison.save();
			expect(People.documents[0]).toEqual(allison);
		});
	});
	
	describe('#update', function() {
		
		it ('should update document', function() {
			allison.save();
			allison.data['demeaner'] = 'happy';
			allison.save();
			expect(People.documents[0].data['demeaner']).toBe('happy');
		});
	});
	
	describe('#index_of', function() {
		
		it ('should return the proper index of the passed document', function() {
			allison.save();
			var index = People.index_of(allison);
			expect(index).toBe(0);
		});
	});
	
	describe('#validate', function() {
		
		it ('should not save if validate returns false', function() {
			People.validate = function(doc) { return false; }
			expect(allison.save()).toBe(false);
		});
	});
});