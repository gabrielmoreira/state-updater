var assert = require('chai').assert;
var select = require('../src/select');

describe('select.js', function() {
	describe('string selectors', function() {
		it('should get simple state', function() {
			var data = {name: 'Gabriel'};
			var response = select('name')(data);
			assert.equal('Gabriel', response);
		});
		it('should not find state', function() {
			var data = {name: 'Gabriel'};
			var response = select('names')(data);
			assert.equal(undefined, response);
		});
		it('should get array state', function() {
			var data = [{name: 'Gabriel'}];
			var response = select('[0].name')(data);
			assert.equal('Gabriel', response);
		});
		it('should get deep array state', function() {
			var data = {users: [{name: 'Gabriel'}]};
			var response = select('users[0].name')(data);
			assert.equal('Gabriel', response);
		});
		it('shoud not found on deep state', function() {
			var data = {users: [{name: 'Gabriel'}]};
			var response = select('company.persons[0].name')(data);
			assert.equal(undefined, response);
		});
	});
	describe('function selector', function() {
		it('should get state from function', function() {
			var data = {users: [{name: 'Gabriel'}]};
			var response = select(function(state){
				return state.users[0].name;
			})(data);
			assert.equal('Gabriel', response);
		});
	});
	describe('object selectors', function() {
		it('should get simple state', function() {
			var data = {name: 'Gabriel'};
			var response = select({
				select: 'name'
			})(data);
			assert.equal('Gabriel', response);
		});

		it('should compute state', function() {
			var data = {name: 'Gabriel'};
			var response = select({
				select: 'name',
				value: function(name) { return 'Hi ' + name }
			})(data);
			assert.equal('Hi Gabriel', response);
		});

		it('should compute multipĺe state', function() {
			var data = {name: 'Gabriel', lastName: 'Moreira'};
			var response = select({
				select: ['name', 'lastName'],
				value: function(name, lastName) { return 'Hi ' + name + ' ' + lastName }
			})(data);
			assert.equal('Hi Gabriel Moreira', response);
		});

		it('should compute deep states', function() {
			var data = {users:[{user: {name: 'Gabriel', lastName: 'Moreira'}}]};
			var response = select({
				select: ['users[0].user.name', 'users[0].user.lastName'],
				value: function(name, lastName) { return 'Hi ' + name + ' ' + lastName }
			})(data);
			assert.equal('Hi Gabriel Moreira', response);
		});

		it('should compute from multiple selectors', function() {
			var data = {users:[{user: {name: 'Gabriel', lastName: 'Moreira'}}]};
			var response = select({
				select: ['users[0].user.name', function(state) {
					return state.users[0].user.lastName;
				}],
				value: function(name, lastName) { return 'Hi ' + name + ' ' + lastName }
			})(data);
			assert.equal('Hi Gabriel Moreira', response);
		});
	});
});