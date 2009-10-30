gold.lang.namespace('gold.logger');

gold.logger.HtmlLogger = function(documentForTest) {
	var _document = documentForTest || document;
	var container = _document.createElement('ul');
	_document.getElementsByTagName('body')[0].appendChild(container);
	
	var createAndAppendElement = function(severity, message) {
		var elem = _document.createElement('li');
		elem.innerHTML = message;
		elem.className = severity;
		container.appendChild(elem);
	};
	
	return {
		debug: function(message) {
			createAndAppendElement('debug', message);
		},
		info: function(message) {
			createAndAppendElement('info', message);
		},
		warn: function(message) {
			createAndAppendElement('warn', message);
		},
		error: function(message) {
			createAndAppendElement('error', message);
		}
	};
};
