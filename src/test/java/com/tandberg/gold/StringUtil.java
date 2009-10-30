package com.tandberg.gold;

public final class StringUtil {

	private StringUtil() {
		// ohai
	}

	public static boolean isNullOrEmpty(String string) {
		if (string == null || "".equals(string)) {
			return true;
		}
		return false;
	}
}
