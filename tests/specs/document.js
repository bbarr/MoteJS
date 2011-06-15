describe('Mote.DocumentPrototype', function() {

	var People,
		Stats,
		allison;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.plugin(Mote.EmbeddedDocuments)
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
		
		Stats = new Mote.Collection(function() {
			this.name = 'stats';
			this.keys = ['name', 'value']
		});
		
		allison = new People.Document({name: 'allison'});
	});
	
	describe('#to_json', function() {
	
		it ('should generate a json string of a simple object', function() {
			var json = allison.to_json();
			expect(json).toEqual('{"name":"allison"}');
		});
		
		it ('should act recursively on a single embedded document', function() {
			People.embeds_one(Stats);
			allison = new People.Document({name: 'allison'});
			var stat = new Stats.Document({name: 'age', value: 25});
			allison.embed(stat);
			var json = allison.to_json();
			console.log(json)
			expect(json).toEqual('{"stat":[{"name":"age","value":25}],"name":"allison"}');
		});
		
		it ('should act recusively on an array of embedded documents', function() {
			People.embeds_many(Stats);
			allison = new People.Document({name: 'allison'});
			var age = new Stats.Document({name: 'age', value: 25});
			var demeaner = new Stats.Document({name: 'demeaner', value: 'happy'});
			allison.embed(age);
			allison.embed(demeaner);
			var json = allison.to_json();
			expect(json).toEqual('{"stats":[{"name":"age","value":25},{"name":"demeaner","value":"happy"}],"name":"allison"}');
		});
	});
	
});