gold.lang.require('gold.framework.TestRunner');
gold.lang.require('gold.framework.Assert');

gold.event.onload(function(){
	var tests = [
		'test.waveMock.WaveMockTest'
	];

	for (var i = 0; i < tests.length; i++) {
		gold.lang.require(tests[i]);
	}

	gold.TestRunner.run();
});