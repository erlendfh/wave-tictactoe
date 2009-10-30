gold.lang.namespace('gold.framework');

gold.framework.Assert = function(actual) {
	var format = function(value) {
		return gold.isString(value) ? '\'' + value + '\'' : value;
	};
	
	var fail = function(message) {
		throw new Error('Assertion failed' + (message ? ': ' + message : '.'));
	};
	
	return {
		isTrue: function() {
			if (actual !== true) {
				fail('Expected true but was ' + actual);
			}
			return this;
		},
		isFalse: function() {
			if (actual !== false) {
				fail('Expected false but was ' + actual);
			}
			return this;
		},
		equals: function(expected) {
			if (actual !== expected) {
				fail('Expected ' + format(expected) + ' but was ' + format(actual));
			}
			return this;
		},
		isNull: function() {
			if (actual) {
				fail('Expected value is not null');
			}
			return this;
		},
		isNotNull: function() {
			if (!actual) {
				fail('Expected value is null');
			}
			return this;
		},
		fail: function(message) {
			fail(message);
		},
		instanceOf: function(type) {
			if (!(actual instanceof type)) {
				fail('Expected value is not of specified type.');
			}
			return this;
		},
		doesThrow: function(message) {
			// TODO: Check that actual is a function
			try {
				actual();
			} catch (e) {
				if (message && e.message.indexOf(message) === -1) {
					fail('Expected exception with message \'' + message + '\' but got \'' + e.message +'\'');
				} 
				else if (!message) {
					gold.warn('Using \'doesThrow\' without matching on a message could cause false positives. Message was: ' + e.message);
				}
				return;
			}
			fail('The function did not throw an exception.');
		}
	};
};