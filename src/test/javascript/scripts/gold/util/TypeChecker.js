gold.lang.namespace('gold.util');

gold.util.TypeChecker = function() {
	return {
	    isString: function(object){
	        return typeof object === 'string';
	    },
	    isNumber: function(object){
	        return typeof object === 'number';
	    },
	    isBoolean: function(object){
	        return typeof object === 'boolean';
	    },
	    isFunction: function(object){
	        return typeof object === 'function';
	    },
	    isObject: function(object){
	        return !!object && typeof object === 'object';
	    }
	};
};