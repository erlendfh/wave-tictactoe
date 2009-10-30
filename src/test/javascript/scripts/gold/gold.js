var gold = (function(){
	
	var getTestWriter = function() {
		if (gold.platform.isJUnit()) {
			return new gold.framework.JUnitTestWriter();
		} else {
			return new gold.framework.SimpleTestWriter();
		}
	};
	
    return {
        version: 0.1,
		initialize: function() {
			gold.platform = new gold.util.PlatformResolver();

		    var logger = gold.logger.LogFactory.getLogger();
		    gold.log = gold.debug = logger.debug;
		    gold.info = logger.info;
		    gold.warn = logger.warn;
		    gold.error = logger.error;
		    
		    var typeChecker = new gold.util.TypeChecker();
		    gold.isObject = typeChecker.isObject;
		    gold.isFunction = typeChecker.isFunction;
		    gold.isString = typeChecker.isString;
		    gold.isNumber = typeChecker.isNumber;
		    gold.isBoolean = typeChecker.isBoolean;
		    
		    gold.assert = gold.framework.Assert;
		    
			var testWriter = getTestWriter();
		    gold.TestRunner = new gold.framework.TestRunner(testWriter);
		}
    };
})();

// gold.lang - required for namespace creation and package import

gold.lang = (function(){
	
	var getGlobal = function() {
		return typeof(window) !== 'undefined' ? window : this;
	};
	
    var isLoaded = function(name){
        var current = getGlobal();
        var parts = name.split(/\./);
        for (var i = 0; i < parts.length; i++) {
            if (!current[parts[i]]) {
                return false;
            }
            current = current[parts[i]];
        }
        return true;
    };
    
    var loadScript = function(src){
        if (typeof(document) !== 'undefined') {
			if (window.ActiveXObject) {
        		addScriptElement(src);
			} else {
				xhrLoadScript(src);
			}
			
		} else if (typeof(load) !== 'undefined') {
            load(src);
        } else if (typeof(com) !== 'undefined') {
			com.tandberg.gold.ScriptContext.evalScript(src);
		} else {
			throw new Error("Unable to load script: " + src);
        }
    };
	
	var xhrLoadScript = function(src) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", src, false);
        xhr.overrideMimeType("text/plain");
		xhr.send(null);
		eval(xhr.responseText);
	};

    var addScriptElement = function(src){
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(script);
    };
	
    return {
        'namespace': function(ns){
            var current = getGlobal();
            var parts = ns.split(/\./);
            for (var i = 0; i < parts.length; i++) {
                if (!current[parts[i]]) {
                    current[parts[i]] = {};
                }
                current = current[parts[i]];
            }
        },
        'require': function(name){
            if (!isLoaded(name)) {
                var parts = name.split(/\./);
                var src = 'scripts/';
                for (var i = 0; i < parts.length; i++) {
                    src += parts[i];
                    if (i != parts.length - 1) {
                        src += '/';
                    }
                }
                loadScript(src + '.js');
            }
        }
    };
})();

// on load event helper

gold.event = (function() {
	var onloadListeners = [];
	
	var notifyOnloadListeners = function() {
		for (var i = 0; i < onloadListeners.length; i++) {
			onloadListeners[i]();
		}
	};
	
	if (typeof(window) !== 'undefined') {
		window.onload = notifyOnloadListeners;
	}
	
	return {
		onload: function(listener) {
			if (typeof(window) !== 'undefined') {
				onloadListeners.push(listener);
			} else {
				listener();
			}
		}
	};
})();


// add the required frameworks

gold.lang.require('gold.logger.LogFactory');
gold.lang.require('gold.framework.TestRunner');
gold.lang.require('gold.framework.JUnitTestWriter');
gold.lang.require('gold.framework.SimpleTestWriter');
gold.lang.require('gold.framework.Assert');
gold.lang.require('gold.util.TypeChecker');
gold.lang.require('gold.util.PlatformResolver');

// init gold after scripts are loaded

gold.event.onload(function() {
	gold.initialize();
});

