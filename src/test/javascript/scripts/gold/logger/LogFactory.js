gold.lang.namespace('gold.logger');

gold.lang.require('gold.logger.ConsoleLogger');
gold.lang.require('gold.logger.HtmlLogger');
gold.lang.require('gold.logger.JavaLogger');

gold.logger.LogFactory = (function() {
	return {
		getLogger: function() {
			if (typeof(window) !== 'undefined' && window.console && window.console.firebug) {
				return new gold.logger.ConsoleLogger();
			} else if (typeof(document) !== 'undefined') {
				return new gold.logger.HtmlLogger();
			} else if (typeof(com) !== 'undefined') {
				return new gold.logger.JavaLogger();
			} else {
				throw new Error('Unable to initialize suited logger for current environment');
			}
		}
	};
})();
