gold.lang.namespace('gold.util');

gold.util.PlatformResolver = function() {
	var air = 'Air';
	var junit = 'JUnit';
	var browser = 'Browser';
	
	var platform = null;
	if (typeof(window) != 'undefined') {
		platform = browser;
	} else if (typeof(com) !== 'undefined') {
		platform = junit;
	} else if (typeof(load) !== 'undefined') {
		platform = air;
	}
	
	return {
		isAir: function() {
			return platform == air;
		},
		isJUnit: function() {
			return platform == junit;
		},
		isBrowser: function() {
			return platform == browser;
		}
	};
};