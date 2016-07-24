var assert = require('chai').assert;
var updater = require('../src/updater');

describe('updater.js', function() {
	it('should updater with instance', function() {
		var component = {};
		var state = {users: [{name: 'Gabriel'}]};
		var updated = updater({
			'user': 'users[0]'
		}).update(state, component);
		assert.equal(true, updated);
		assert.deepEqual({name: 'Gabriel'}, component.user);
	});
});