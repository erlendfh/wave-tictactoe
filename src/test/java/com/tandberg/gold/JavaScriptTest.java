package com.tandberg.gold;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.io.File;

public class JavaScriptTest {

	@Test
	public void runAllJavaScriptTests() throws Exception {
        ScriptContext.evalScript("scripts/gold/gold.js");
		ScriptContext.evalScript("scripts/test/gold.js");
    }
	
	@Test
	public void verifyThatAllClassesHaveCorrespondingTestClasses() throws Exception {
		List<String> scripts = getAllScripts("scripts/gold");
		scripts.removeAll(getAllTests("scripts/test"));
		//TODO: Assert scripts is empty
		System.err.println("\r\nJavaScript Classes that are not tested: " + scripts + "\r\n");
	}

	private List<String> getAllScripts(String scriptRoot) {
		final List<String> tests = new ArrayList<String>();
		iterateFileSystem(new File(scriptRoot), new Callback() {
			@Override
			public void callback(File file) {
				if (file.isFile() && file.getName().endsWith(".js")) {
					tests.add(file.getName());
				}
			}
		});
		return tests;
	}
	
	private List<String> getAllTests(String testRoot) {
		final List<String> tests = new ArrayList<String>();
		iterateFileSystem(new File(testRoot), new Callback() {
			@Override
			public void callback(File file) {
				if (file.isFile() && file.getName().endsWith("Test.js")) {
					tests.add(file.getName().replace("Test.", "."));
				}
			}
		});
		return tests;
	}

	private void iterateFileSystem(File start, Callback callback) {
		if (start.isDirectory()) {
			for (File f : start.listFiles()) {
				iterateFileSystem(f, callback);
			}
		} else {
			callback.callback(start);
		}
	}
	
	private interface Callback {
		void callback(File file);
	}

}
