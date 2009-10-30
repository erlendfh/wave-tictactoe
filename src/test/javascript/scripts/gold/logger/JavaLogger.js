gold.lang.namespace('gold.logger');

gold.logger.JavaLogger = function() {
	var log = function(severity, message) {
		java.lang.System.err.println(message);
	};
	
	return {
		debug: function(message) {
			log('debug', message);
		},
		info: function(message) {
			log('info', message);
		},
		warn: function(message) {
			log('warn', message);
		},
		error: function(message) {
			log('error', message);
		}
	};
};
