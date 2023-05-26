/*
 * html.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

class HTMLTag {
	tag = '';
	props = {};
	lowers = [];
	
	constructor(tag) {
		this.tag = tag;
	}
	
	htmlize(){
		let html = `<${this.tag}`;
		Object.keys(this.props).forEach((key) => {
			let val = HTMLTag.escapeHTML(this.props[key]);
			html += ` ${key}="${val}"`;
		});
		if (this.lowers.length == 0) html += '/';
		html += '>';
		this.lowers.forEach((lower) => {
			html += lower.htmlize();
		});
		if (this.lowers.length > 0) html += `</${this.tag}>`;
		return html;
	}
	
	static escapeHTML(str) {
		str = str.replaceAll('&', '&amp;');
		str = str.replaceAll('"', '&quot;');
		str = str.replaceAll('<', '&lt;');
		str = str.replaceAll('>', '&gt;');
		return str;
	}
}

export class AnchorTag extends HTMLTag {
	constructor() {
		super('a');
	}
}

export class ImgTag extends HTMLTag {
	constructor() {
		super('img');
	}
}

export class ButtonTag extends HTMLTag {
	constructor() {
		super('button');
		this.props['type'] = 'button';
	}
}
