
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
	
	use: function(object) {
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
	
	validate: function() {},
	
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
		this.documents.push(doc.copy());
	},
	
	update: function(doc) {
    	if (doc.is_new) return false;
    	if (!this.validate(doc)) return false;
    	
		var index = this.index_of(doc);
		this.documents.splice(index, 1, doc.copy());
	}
}

Mote.Document = function(data, collection) {
	this.collection = collection;
	this.name = Mote.NameHelper.singularize(collection.name);
	this.is_new = true;
	this.errors = {};
	this.data = {};
	
	this.load(data);
}

Mote.Document.prototype = {
	
	get: function(key) {
	    return this.data[key];
	},
	
	set: function(key, val) {
	    return this.data[key] = val;
	},
	
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

Mote.NameHelper = {

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
