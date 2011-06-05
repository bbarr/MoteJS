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
	
	describe('collection extentions', function() {
		
		describe('#embeds_many', function() {
			
			it ('should set up an array in documents to contain embedded docs', function() {
				People.embeds_many(Stats);
				var allison = new People.Document({ name: 'allison' });
				expect(allison.stats).toEqual([]);
			});
		});
		
		describe('#embeds_one', function() {
			
			it ('should set up an object to contain single documents', function() {
				People.embeds_one(Stats);
				var allison = new People.Document({ name: 'allison' });
				expect(allison.stats).not.toBeDefined();
				expect(allison.stat).toEqual({});
			});
		});
	});
	
	describe('document extentions', function() {
		
		describe('#embed', function() {
			
			it ('should add a document to an array if its embed_many', function() {
				People.embeds_many(Stats);
				var allison = new People.Document({ name: 'allison' });
				var age = new Stats.Document({ name: 'age' });
				allison.embed(age);
				expect(allison.stats[0]).toBe(age);
			});
			
			it ('should add a document to another if its embed_one', function() {
				People.embeds_one(Stats);
				var allison = new People.Document({ name: 'allison' });
				var age = new Stats.Document({ name: 'age' });
				allison.embed(age);
				expect(allison.stat).toBe(age);
			});
		});
	});
});