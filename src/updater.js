'use strict';

var select = require('./select');

function updater(config) {
	var selectors = {};
  	var properties = Object.keys(config);
	properties.forEach(function each_property(property) {
		selectors[property] = select(config[property]);
	});
	return {
		update: function updater_update(state, instance) {
			var updated = false;
			properties.forEach(function each_property(property) {
				var value = selectors[property](state);
				if (instance[property] !== value) {
					instance[property] = value;
					updated = true;
				}
			});
			return updated;
		}
	}
}

module.exports = updater;
