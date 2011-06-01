
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
	
	uid: function() {
		var count = 0;
		return function() {
			return count++;
		}
	}(),
	
	find: function(queries) {

		var found = _(this.documents).filter(function(doc) {
			
			for (var key in queries) {
				if (doc.data[key] != queries[key]) return false;
			}

			return doc;
		});

		return found || [];
	},
	
	find_one: function(queries) {
		
		var found = _(this.documents).find(function(doc) {
			
			for (var key in queries) {
				if (doc.data[key] != queries[key]) return false;
			}
			
			return doc;
		});
		
		return found;
	},
	
	index_of: function(doc) {
		
		var docs = this.documents,
			len = docs.length,
			i = 0,
			index;
			
		for (; i < len; i++) {
			if (docs[i].id === doc.id) {
				index = i;
				break;
			}
		}

		return index;
	},
	
	insert: function(doc) {
		this.documents.push(doc);
	},
	
	update: function(doc) {
		var index = this.index_of(doc);
		this.documents.splice(index, 1, doc);
	},
	
	validate: function() {}
}

Mote.Document = function(data, collection) {
	this.load(data);
	this.is_new = true;
	this.collection = collection || {};
	this.errors = {};
}

Mote.Document.prototype = {
	
	load: function(attrs) {
		var data = this.data = {};
		for (var key in attrs) data[key] = attrs[key];
	},
	
	save: function() {
		this.is_new ? this.insert() : this.update();
	},
	
	insert: function() {
		this.errors = this.collection.validate(this);
		if (this.errors) return false;
		this.is_new = false;
		this._generate_id();
		this.collection.insert(this._duplicate());
	},
	
	update: function() {
		this.errors = this.collection.validate(this);
		if (this.errors) return false;
		this.collection.update(this._duplicate());
	},
		
	_duplicate: function() {
		var doc = new Mote.Document(this.data, this.collection);
		doc.id = this.id;
		return doc;
	},
	
	_generate_id: function() {
		this.id = this.id || this.collection.uid();
	}
}