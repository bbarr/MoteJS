var mongo = {};

mongo.Model = function(name, keys) {
	
	this.u = _(this).chain();
	
	this.u
		.extend(mongo.Keys)
		.extend(mongo.Validations);
	
	this.name = name;
	this.errors = {};

	this.keys = {};	
	this.populate_keys(keys);
}

mongo.Model.prototype = {
	
	// override to set validations
	validate: function() {}
}

mongo.Keys = {
	
	populate_keys: function(keys) {
		
		var name,
			len = keys.length,
			i = 0;
		
		for (; i < len; i++) {
			name = keys[i];
			this.keys[name] = {};
			this._generate_accessors(name);
		}
	},
	
	_generate_accessors: function(key) {
		this['find_by_' + key] = function(key) {
			console.log('finding by key');
		}
	}
}

Object.create || (Object.prototype.create = function() {
	var F = function() {};
	return function(obj) {
		F.prototype = obj;
		return new F();
	}
}());