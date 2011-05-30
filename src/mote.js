
var Mote = {};

Mote.Collection = function(block) {
	
	var self = this;
	
	if (typeof block === 'undefined') throw new Exception('Collection requires an initialize function');

	// run user provided initialization
	block.call(this);
	
	if (typeof this.name === 'undefined') throw new Exception('Collection requires a name');
	
	this.documents = [];
	this.Document = function(data) { return new Mote.Document(data, self); };
}

Mote.Collection.prototype = {
	
	include: function(object) {
		for (var key in object) this[key] = object[key];
	},
	
	identify: function(object) {
		object.id = this.documents.length;
	}
}

Mote.Document = function(data, collection) {
	this.data = data;
	this.is_new = true;
	this.collection = collection || {};
}

Mote.Document.prototype = {
	
	set: function(key, val) {
		this.data[key] = val;
	},
	
	get: function(key) {
		return this.data[key];
	},
	
	save: function() {
		if (this.is_new) {
			this.insert();
		}
		else {
			this.update();
		}
	},
	
	insert: function() {
		this.collection.identify(this);
		this.is_new = false;		
		var clone = Object.create(this);
		this.set('name', 'blah!');
		this.collection.documents.push(clone);
	},
	
	update: function() {
		var docs = this.collection.documents;
		var index = docs.indexOf(this);
		docs.splice(index, 1, Object.create(this));
	}
}