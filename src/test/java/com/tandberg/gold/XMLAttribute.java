package com.tandberg.gold;

public class XMLAttribute implements XMLNode {

	private String value;
	private String name;

	public XMLAttribute(String name, String value) {
		if (StringUtil.isNullOrEmpty(name)) {
			throw new IllegalArgumentException("XMLAttribute names cannot be null.");
		}
		this.name = name;
		this.value = StringUtil.isNullOrEmpty(value) ? "" : value;
	}
	
	@Override
	public String toString() {
		return " " + name + "=\"" + value +"\"";
	}

}
