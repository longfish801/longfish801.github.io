/*
 * unseen.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

/**
 * 隠蔽処理
 */
export class Unseen {
	constructor(config) {
		let buttons = new UnseenButtons(config.buttons);
		let spans = new UnseenSpans(config.spans);
		let clickFnUnseen, clickFnSeen;
		clickFnUnseen = () => {
			buttons.unseen(clickFnSeen);
			spans.unseen();
		}
		clickFnSeen = () => {
			buttons.seen(clickFnUnseen);
			spans.seen();
		}
		buttons.unseen(clickFnSeen);
		spans.unseen();
	}
}

/**
 * 隠蔽/隠蔽解除ボタン
 */
class UnseenButtons {
	constructor(config) {
		this.cname = config.cname;
		this.buttonNameUnseen = config.buttonName.unseen;
		this.buttonNameSeen = config.buttonName.seen;
	}
	
	unseen(clickFn){
		this.#modifyButton(this.buttonNameUnseen, clickFn);
	}
	
	seen(clickFn){
		this.#modifyButton(this.buttonNameSeen, clickFn);
	}
	
	#modifyButton(text, clickFn){
		let buttons = document.getElementsByClassName(this.cname);
		for (let cnt = 0; cnt < buttons.length; cnt ++){
			buttons[cnt].textContent = text;
			buttons[cnt].addEventListener('click', clickFn);
		}
	}
}

/**
 * 隠蔽箇所
 */
class UnseenSpans {
	constructor(config) {
		this.cname = config.cname;
		this.cnameHide = config.controlCname.hide;
		this.cnameShow = config.controlCname.show;
	}
	
	unseen(){
		this.#modifyClass(this.cnameHide, this.cnameShow);
	}
	
	seen(){
		this.#modifyClass(this.cnameShow, this.cnameHide);
	}
	
	#modifyClass(addCname, removeCname){
		let spans = document.getElementsByClassName(this.cname);
		for (let cnt = 0; cnt < spans.length; cnt ++){
			spans[cnt].classList.add(addCname);
			spans[cnt].classList.remove(removeCname);
		}
	}
}
