gold.lang.namespace('gold.framework');

gold.framework.TestRunner = function(testWriter){
    var testcases = [];
	var testFailures = false;
    
	var beforeTestSuite = function() {
		testWriter.beforeTestSuite();
	};
	
	var afterTestSuite = function() {
		testWriter.afterTestSuite();
	};
	
	var beforeTestCase = function(name) {
		testWriter.beforeTestCase({
			name: name
		});
	};
	
	var afterTestCase = function(name) {
		testWriter.afterTestCase({
			name: name
		});
	};
	
	var beforeTest = function(name) {
		testWriter.beforeTest({
			name: name
		});
	};
	
	var afterTest = function(name, status, message) {
		testWriter.afterTest({
			name: name,
			status: status,
			message: message
		});
	};
	
    var extractAllTests = function(testcase){
        var key = null;
        var tests = {};
        for (key in testcase) {
            if (/^test/.test(key)) {
                tests[key] = testcase[key];
            }
        }
        return tests;
    };
    
    var executeTestcase = function(name, testcase, options){
        var setup = testcase.before || function(){};
        var teardown = testcase.after || function(){};
        var tests = extractAllTests(testcase);
        
		beforeTestCase(name);
		
        var key = null;
        for (key in tests) {
            if (/^test/.test(key)) {
                try {
					beforeTest(key);
                    setup();
                    tests[key].apply(gold.framework.TestRunnerContext);
					afterTest(key, 'success');
                    teardown();
                } 
                catch (e) {
                    if(typeof console != "undefined") {
                        console.log(e);
                    }
					afterTest(key, 'failure', e.message);
                    teardown();
					testFailures = true;
                }
            }
        }
		
		afterTestCase(name);
    };
    
    return {
        add: function(name, testcase){
            if (gold.isFunction(testcase)) {
                testcase = testcase();
            }
            if (!gold.isObject(testcase)) {
                throw new Error('Testcase must be an object or a function that returns an object.');
            }
            else {
                testcases.push({
                    name: name,
                    testcase: testcase
                });
            }
        },
        run: function(options){
            var test = null;
            options = options || {};
			
			beforeTestSuite();			
			testFailures = false;
			
            while ((test = testcases.pop())) {
                executeTestcase(test.name, test.testcase, options);
            }
			
			afterTestSuite();
			if (testFailures) {
				throw new Error("There are JavaScript test failures...");
			}
        }
    };
};
