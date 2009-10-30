package com.tandberg.gold;

import java.util.ArrayList;
import java.util.List;

public class XMLElement implements XMLNode {
	
	private String name;
	private List<XMLNode> nodes = new ArrayList<XMLNode>();
	private List<XMLAttribute> attributes = new ArrayList<XMLAttribute>();

	public XMLElement(String name) {
		if (StringUtil.isNullOrEmpty(name)) {
			throw new IllegalArgumentException("XML Elements must have a name");
		}
		this.name = name;
	}
	
	public XMLElement(String name, String value) {
		this(name);
		this.nodes.add(new XMLText(value));
	}
	
	public XMLElement add(XMLNode...nodes) {
		for (XMLNode node : nodes) {
			if (node instanceof XMLAttribute) {
				attributes.add((XMLAttribute)node);
			} else {
				this.nodes.add(node);
			}
		}
		return this;
	}
	
	@Override
	public String toString() {
		StringBuilder xml = new StringBuilder();
		xml.append("<").append(name);
		for (XMLAttribute attribute : attributes) {
			xml.append(attribute);
		}
		xml.append(">\r\n");
		for (XMLNode node : nodes) {
			xml.append(node);
		}
		xml.append("</").append(name).append(">\r\n");
		return xml.toString();
	}
	
}
