'use strict';

function selectString(selector) {
	var tokens = [];
	selector.replace(/[^\[\]\.]+/g, function(item) {
		tokens.push(item);
	});
	return function string_selector(data) {
		return tokens.reduce(function string_selector_reducer(value, token) {
			return value && value[token];
		}, data);
	}
}

function selectObject(object) {
	if (!object.select) throw new Error('select is required');
	if (!object.value) object.value = function get_value(state) { return state };
	var selectors = typeof(object.select) === 'string' ? [object.select] : object.select;
	selectors = selectors.map(function(options) {
		return select(options);
	});
	var selector = function object_selector(data) {
		var values = selectors.map(function object_selector_map(selector) {
			return selector(data);
		});
		var value = object.value.apply(object, values);
		return value;
	}
	return selector;
}

function select(options) {
	switch (typeof(options)) {
		case 'string':
			return selectString(options);
		case 'object':
			return selectObject(options);
		case 'function':
			return options;
	}
	throw new Error('options not supported: ' + options);
}


module.exports = select;