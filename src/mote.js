
var Mote = {};

Mote.Collection = function(block) {
	
	var self = this;
	
	if (typeof block === 'undefined') throw new Exception('Collection requires an initialize function');
	
	// run user provided initialization
	block.call(this);
	
	if (typeof this.name === 'undefined') throw new Exception('Collection requires a name');
	
	this.documents = [];
	this.Document = function(data) { 
		if (self._document_prototype) Mote.Document.prototype = self._document_prototype;
		return new Mote.Document(data, self);
	};
}

Mote.Collection.prototype = {
	
	use: function(feature) {
		
		var util = Mote.Util;
		
		if (feature.collection) {
			util.extend(Mote.Collection.prototype, feature.collection);
		}
		
		if (feature.document) {
			this._document_prototype || (this._document_prototype = Mote.Document.prototype);
			util.extend(this._document_prototype, feature.document);
		}
	},
	
	uid: function() {
		var count = 0;
		return function() {
			return count++;
		}
	}(),
	
	find: function(queries, limit) {

		var docs = this.documents,
			matches = [],
			len = docs.length,
			i = 0,
			key,
			match;
			
		for (; i < len; i++) {
			
			doc = docs[i];
			match = true;			
			
			for (key in queries) {
				if (doc.data[key] != queries[key]) {
					match = false;
					break;
				}
			}
			
			if (match) matches.push(doc);
			
			if (limit) {
				if (matches.length === limit) {
					break;
				}
			}
		}

		return matches;
	},
	
	find_one: function(queries) {
		var matches = this.find(queries, 1);
		return matches[0];
	},
	
	index_of: function(doc) {
		
		var docs = this.documents,
			len = docs.length,
			i = 0,
			index = -1;
			
		for (; i < len; i++) {
			if (docs[i].id === doc.id) {
				index = i;
				break;
			}
		}
        
		return index;
	},
	
	insert: function(doc) {
	    if (!doc.is_new) return false;
	    if (!this.validate(doc)) return false;
	    doc.is_new = false;
		doc.id = this.uid();
		this.documents.push(doc.copy());
	},
	
	update: function(doc) {
    	if (doc.is_new) return false;
    	if (!this.validate(doc)) return false;
    	
		var index = this.index_of(doc);
		this.documents.splice(index, 1, doc.copy());
	},
	
	validate: function() { return true }
}

Mote.Document = function(data, collection) {
	this.collection = collection;
	this.name = Mote.Naming.singularize(collection.name);
	this.is_new = true;
	this.errors = {};
	this.data = {};
	
	this.load(data);
}

Mote.Document.prototype = {
	
	load: function(attrs) {
		var data = this.data;
		for (var key in attrs) data[key] = attrs[key];
	},
	
	save: function() {
	    var col = this.collection;
	    return this.is_new ? col.insert(this) : col.update(this);
	},

	copy: function() {
		var doc = new Mote.Document(this.data, this.collection);
        doc.id = this.id;
        doc.is_new = this.is_new;
		return doc;
	}
}

Mote.Naming = {

    singular: [],
    plural: [],
    
    register: function(s, p) {
        this.singular.push(s);
        this.plural.push(p);
    },
    
    singularize: function(name) {
        var index = this.plural.indexOf(name);
        return index > -1 ? this.singular[index] : name.replace(/s$/, '');
    },
    
    pluralize: function(name) {
        var index = this.singular.indexOf(name);
        return index > -1 ? this.plural[index] : (name + 's');
    }
}

Mote.EmbeddedDocuments = {
    
    collection: {
        
        embeddable: {
            many: [],
            one: []
        }, 
        
        embeds_many: function(col) {
            this.embeddable.many.push(col);
        },
        
        embeds_one: function(col) {
            this.embeddable.one.push(col);
        }
    },
    
    document: {
        
        embed: function(doc) {
        	
        }
    }
}

Mote.Util = {
	
	extend: function(dest, src) {
		var key;
		for (key in src) dest[key] = src[key];
	}
}