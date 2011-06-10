describe('Mote.Collection', function() {
	
	var People,
		allison;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
		
		allison = { name: 'allison' };
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
	
	describe('#use', function() {
		
		it ('extend collection with additional functionality', function() {
			
			var AdditionalFunctionality = function() {
				this.additional_thing = [];
			}
			
			AdditionalFunctionality.prototype.foo = 'bar';
			
			var Things = new Mote.Collection(function() {
				this.use(AdditionalFunctionality);
				this.name = 'things';
				this.keys = ['x'];
			});
			
			expect(Things.additional_thing).toEqual([]);
			expect(Things.foo).toEqual('bar');
		});
	});
	
	describe('#uid', function() {
		
		it ('should create an ID (auto-increment)', function() {
			var spud = People.uid();
			var scuz = People.uid();
			expect(spud).not.toEqual(scuz); // wow, this is thorough
		});
		
	});
	
	describe('#save', function() {
		
		it ('should insert new document into collection', function() {
			var _mote_id = People.save(allison);
			expect(People.documents[_mote_id]).toEqual(allison);
		});
		
		it ('should update document', function() {
			var _mote_id = People.save(allison);
			allison.demeaner = 'happy';
			People.save(allison);
			expect(People.documents[_mote_id].demeaner).toBe('happy');
		});
	});
	
	describe('#find', function() {
		
		it ('should return a set of documents that match', function() {
			People.save(allison);
			var allisons = People.find({ name: 'allison' });
			expect(allisons[0]).toEqual(allison);
		});
		
		it ('should work for multiple conditions', function() {
			People.save(allison);
			var other_allison = { name: 'allison', age: 24 };
			People.save(other_allison);
			
			var allisons = People.find({ name: 'allison', age: 24 });
			expect(allisons[0]).toEqual(other_allison);
		});
		
	});
	
	describe('#find_one', function() {
		
		it ('should return first doc that matches', function() {
			People.save(allison);
			var one_allison = People.find_one({ name: 'allison' });
			expect(one_allison).toEqual(allison);
		});
	});
	
	describe('#validate', function() {
		
		it ('should not save if validate returns false', function() {
			People.validate = function(doc) { return false; }
			expect(People.save(allison)).toBe(false);
		});
	});
});