describe('Mote.EmbeddedDocument', function() {
	
	var People,
		Stats;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			
			this.use(Mote.EmbeddedDocuments);

			this.name = 'people';
			this.keys = [ 'name' ];
		});
		
		Stats = new Mote.Collection(function() {
			this.name = 'stats';
		});
	});
	
	describe('collection extensions', function() {
		
		describe('#embeds_many', function() {
			
			it ('should add embedded collection name to keys array', function() {
				People.embeds_many(Stats);
				expect(People.keys[1]).toEqual('stats');
			});
			
			it ('should add array by collection name to Document.inital object', function() {
				People.embeds_many(Stats);
				expect(People.Document.initial['stats']).toEqual({});
			});
		});
		
		describe('#embeds_one', function() {
			
			it ('should add singular embedded collection name to keys array', function() {
				People.embeds_one(Stats);
				expect(People.keys[1]).toEqual('stat');
			});
			
			it ('should add object by singular collection name to Document.inital object', function() {
				People.embeds_one(Stats);
				expect(People.Document.initial['stat']).toEqual([]);
			});
		});
	});
	
	describe('document extensions', function() {
		
		it ('should embed a single doc if its collection was called with embed_one', function() {
			People.embeds_one(Stats);
			var allison = new People.Document({ name: 'allison' });
			var age = new Stats.Document({ age: 25 });
			allison.embed(age);
			expect(allison.stat).toBe(age);
		});
		
		it ('should add a single doc to an array if collection was called with embed_many', function() {
			People.embeds_many(Stats);
			var allison = new People.Document({ name: 'allison' });
			var age = new Stats.Document({ age: 25 });
			var appearance = new Stats.Document({ appearence: 'pleasing' });
			allison.embed(age);
			expect(allison.stats[0]).toBe(age);
		});
	});
});