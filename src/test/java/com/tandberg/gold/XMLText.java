package com.tandberg.gold;

public class XMLText implements XMLNode {

	private String value;

	public XMLText(String value) {
		this.value = StringUtil.isNullOrEmpty(value) ? "" : value;
	}
	
	@Override
	public String toString() {
		return value;
	}

}
