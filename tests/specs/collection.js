describe('Mote.Collection', function() {
	
	var People,
		allison;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
		
		allison = new People.Document({name: 'allison'});
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
				this.plugin(AdditionalFunctionality);
				this.name = 'things';
				this.keys = ['x'];
			});
			
			expect(Things.additional_thing).toEqual([]);
			expect(Things.foo).toEqual('bar');
		});
	});
	
	describe('#_generate_mote_id', function() {
		
		it ('should create an ID (auto-increment)', function() {
			var spud = People._generate_mote_id();
			var scuz = People._generate_mote_id();
			expect(spud).not.toEqual(scuz); // wow, this is thorough
		});
		
	});
	
	describe('#save', function() {
		
		it ('should insert new document into collection', function() {
			var _mote_id = allison.save();
			expect(People.documents[0]).toEqual(allison);
		});
		
		it ('should update document', function() {
			var _mote_id = allison.save();
			allison.data.demeaner = 'happy';
			allison.save();
			expect(People.documents[0].data.demeaner).toBe('happy');
		});
	});
	
	describe('#find', function() {
		
		it ('should return a set of documents that match', function() {
			allison.save();
			var allisons = People.find({ name: 'allison' });
			expect(allisons[0]).toEqual(allison);
		});
		
		it ('should work for multiple conditions', function() {
			allison.save();
			var other_allison = new People.Document({ name: 'allison', age: 24 });
			other_allison.save();
			
			var allisons = People.find({ name: 'allison', age: 24 });
			expect(allisons[0]).toEqual(other_allison);
		});
		
	});
	
	describe('#find_one', function() {
		
		it ('should return first doc that matches', function() {
			allison.save();
			var one_allison = People.find_one({ name: 'allison' });
			expect(one_allison).toEqual(allison);
		});
	});
	
	describe('#validate', function() {
		
		it ('should not save if validate returns false', function() {
			People.validate = function(doc) { return false; }
			expect(allison.save()).toBe(false);
		});
	});
});