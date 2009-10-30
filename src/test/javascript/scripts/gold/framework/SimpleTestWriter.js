gold.lang.namespace('gold.framework');

gold.framework.SimpleTestWriter = function(){
	var start = null;
	var totalNumberOfTests = 0;
	var numberOfTestFailures = 0;
	
    var formatName = function(name){
        var formatted = '';
        var splitted = name.replace(/([A-Z])/g, ",$1").split(',');
        for (var i = 1; i < splitted.length; i++) {
            formatted += (formatted.length === 0 ? '' : ' ') + splitted[i];
        }
        return formatted;
    };
	
	var printTestResults = function(time){
        if (numberOfTestFailures) {
            gold.error('--');
            gold.error(totalNumberOfTests + ' tests executed in ' + time + ' seconds. ' + numberOfTestFailures + ' failures.');
        }
        else {
            gold.info('--');
            gold.info(totalNumberOfTests + ' tests successfully executed in ' + time + ' seconds.');
        }
    };
	
	return {
		'beforeTestSuite': function(status) {
			start = new Date();
		},
		'afterTestSuite': function(status) {
			printTestResults((new Date() - start) / 1000);
		},
		'beforeTestCase': function(status) {
			gold.info('Running testcase: ' + status.name);
		},
		'afterTestCase': function(status) {
			
		},
		'beforeTest': function(status) {
			totalNumberOfTests++;
		},
		'afterTest': function(status) {
			if (status.status === 'success') {
				gold.debug('Ok: ' + formatName(status.name));
			} else if (status.status === 'failure') {
				numberOfTestFailures++;
				gold.error('Test \'' + formatName(status.name) + '\' failed: ' + status.message);
			} else {
				gold.error('Unknown status: ' + status.status);
			}
		}
	};
};