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
			
			it ('should add embedded collection name to embeddable array', function() {
				People.embeds_many(Stats);
				expect(People.embeddable[0]).toEqual('stats');
			});
			
			it ('should add embedded collection name to keys array', function() {
				People.embeds_many(Stats);
				expect(People.keys[1]).toEqual('stats');
			});
		});
		
		describe('#embeds_one', function() {
			
			it ('should add singular embedded collection name to embeddable array', function() {
				People.embeds_one(Stats);
				expect(People.embeddable[0]).toEqual('stat');
			});
			
			it ('should add singular embedded collection name to keys array', function() {
				People.embeds_one(Stats);
				expect(People.keys[1]).toEqual('stat');
			});
		});
	});
});