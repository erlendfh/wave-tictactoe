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

public final class ScriptContext {
	private static String testCaseName;
	
	private static int succeeded = 0;
	private static int failures = 0;
	
	private static Context context;
	private static Scriptable scope;
	
	private static XMLElement currentTest;
	private static XMLElement rootElement;
	
	static {
		context = ContextFactory.getGlobal().enterContext();
		scope = context.initStandardObjects();
	}
	
	private ScriptContext() {
		// ohai!
	}
	
	public static void evalScript(String filename) throws Exception {
		try {
			File file = new File(filename);
			InputStream inputStream = new FileInputStream(file);
			InputStreamReader reader = new InputStreamReader(inputStream);
			context.evaluateReader(scope, reader, filename, 0, null); 
		} catch (Exception e) {
			System.err.println("\r\nError: " + e.getMessage() + "\r\n");
			throw new RuntimeException(e);
		}
	}
	
	public static void testStarted(String name) {
		currentTest = new XMLElement("testcase");
		currentTest.add(new XMLAttribute("name", name));
	}
	
	public static void testFailed(String message) {
		XMLElement failure = new XMLElement("failure");
		failure.add(new XMLText(message));
		currentTest.add(failure);
		
		rootElement.add(currentTest);
		failures++;
	}
	
	public static void testSuccess() {
		rootElement.add(currentTest);
		succeeded++;
	}
	
	public static void startTestCase(String name) throws Exception {
		rootElement = new XMLElement("testsuite");
		rootElement.add(
			new XMLAttribute("name", name)
		);
		testCaseName = name;
		succeeded = 0;
		failures = 0;
	}
	
	public static void endTestCase() throws Exception {
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
