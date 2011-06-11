describe('Mote.Publiser', function() {
	
	var People;
	
	beforeEach(function() {
		
		People = new Mote.Collection(function() {
			this.name = 'people';
			this.keys = ['name', 'age'];
		});
	});
	
	describe('#subscribe', function() {
		
		it ('should add a subscription to the subscribers array for that topic', function() {
			var cb = function() {};
			People.subscribe('something', cb);
			expect(People.subscriptions.something[0]).toBe(cb);
		});
	});
	
	describe('#publish', function() {
		
		it ('should publish to all subscriptions on that topic', function() {
			var published = false;
			People.subscribe('something', function() {
				published = true;
			});
			People.publish('something');
			expect(published).toBe(true);
		});
		
		it ('should also include any subscriptions to *', function() {
			var published = false;
			People.subscribe('something', function() {});
			People.subscribe('*', function() {
				published = true;
			});
			People.publish('something');
			expect(published).toBe(true);
		});
	});
	
});