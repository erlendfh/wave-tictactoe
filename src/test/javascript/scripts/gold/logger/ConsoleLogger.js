gold.lang.namespace('gold.logger');

gold.logger.ConsoleLogger = function(consoleForTest) {
	var _console = consoleForTest || console;
	return {
		debug: function(message) {
			_console.debug(message);
		},
		info: function(message) {
			_console.info(message);
		},
		warn: function(message) {
			_console.warn(message);
		},
		error: function(message) {
			_console.error(message);
		}
	};
};
