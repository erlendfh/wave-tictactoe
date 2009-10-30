gold.lang.namespace('gold.framework');

gold.framework.SilentTestWriter = function(){
	return {
		'beforeTestSuite': function(status) {},
		'afterTestSuite': function(status) {},
		'beforeTestCase': function(status) {},
		'afterTestCase': function(status) {},
		'beforeTest': function(status) {},
		'afterTest': function(status) {}
	};
};