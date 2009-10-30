gold.lang.namespace('gold.framework');

gold.framework.JUnitTestWriter = function(){

	var total = 0;
	var failed = 0;
	var success = 0;
	
	var testWriter = null;
	
	return {
		'beforeTestSuite': function(status) {
			
		},
		'afterTestSuite': function(status) {
			gold.info('\r\nJavaScript tests run: ' + total + ', Failures: ' + failed);
		},
		'beforeTestCase': function(status) {
			testWriter = new com.tandberg.gold.JUnitTestWriter(status.name);
		},
		'afterTestCase': function(status) {
			testWriter.endTestCase();
		},
		'beforeTest': function(status) {
			total++;
			testWriter.testStarted(status.name);
		},
		'afterTest': function(status) {
			if (status.status === 'success') {
				success++;
				testWriter.testSuccess();
			} else {
				failed++;
				testWriter.testFailed(status.message);
				gold.error('\r\nTest \'' + status.name + '\' failed: ' + status.message);
			}
		}
	};
};