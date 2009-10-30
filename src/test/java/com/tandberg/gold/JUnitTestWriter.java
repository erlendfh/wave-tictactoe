package com.tandberg.gold;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.Scriptable;

public class JUnitTestWriter {
	
	private String testCaseName;
	private int succeeded = 0;
	private int failures = 0;
	
	private XMLElement currentTest;
	private XMLElement rootElement;
	
	public JUnitTestWriter(String name) {
		rootElement = new XMLElement("testsuite");
		rootElement.add(
			new XMLAttribute("name", name)
		);
		testCaseName = name;
	}
	
	public void testStarted(String name) {
		currentTest = new XMLElement("testcase");
		currentTest.add(
			new XMLAttribute("name", name)
		);
	}
	
	public void testFailed(String message) {
		XMLElement failure = new XMLElement("failure");
		failure.add(new XMLText(message));
		currentTest.add(failure);
		
		rootElement.add(currentTest);
		failures++;
	}
	
	public void testSuccess() {
		rootElement.add(currentTest);
		succeeded++;
	}
	
	public void endTestCase() throws Exception {
		rootElement.add(
			new XMLAttribute("failures", failures + ""),
			new XMLAttribute("tests", failures + succeeded + ""),
			new XMLAttribute("skipped", "0"),
			new XMLAttribute("errors", "0")
		);
		
		File file = new File("target/gold-js-testresult-" + testCaseName + ".xml");
		if (!file.exists()) {
			file.createNewFile();
		}
		
		FileOutputStream fileOutputStream = new FileOutputStream(file);
		fileOutputStream.write(rootElement.toString().getBytes());
		fileOutputStream.close();
	}
	
}
