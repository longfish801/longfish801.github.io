/*
 * unseen.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

/*
文字列を読めないよう隠蔽します。
文字色と同じ背景色をつけることで、マウスで選択しなければ読めないようにします。
マウスを使用できない環境を考慮し、ボタンでも隠蔽/隠蔽解除を可能にします。
ボタンをクリックすることで隠蔽を解除します。
もう一度ボタンをクリックすると再び隠蔽します。

文字色の変更は CSSで制御します。
JavaScriptによる処理の制約上、rgbaで指定する必要があります。

---
span.unseen.unseen-hide {
	background-color: rgba(0, 0, 0.2, 1.0);
	color: rgba(0, 0, 0.2, 1.0);
}
span.unseen.unseen-show {
	background-color: rgba(0, 0, 0.2, 0.2);
	color: rgba(0, 0, 0.2, 1.0);
}
---


---
<button type="button" class="revert-unseen btn btn-primary">ネタバレ解除</button>
---

---
それは<span class="unseen">秘密</span>です。
---

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
