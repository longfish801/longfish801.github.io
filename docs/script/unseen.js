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
.unseen.unseen-hide {
	background-color: rgba(0, 0, 0.2, 1.0);
	color: rgba(0, 0, 0.2, 1.0);
}
.unseen.unseen-show {
	background-color: rgba(0, 0, 0.2, 0.2);
	color: rgba(0, 0, 0.2, 1.0);
}
---

以下の場合、ボタンをクリックすると spanタグ内を隠蔽解除/隠蔽します。
class属性に "unseen"を指定しているタグすべてが隠蔽解除/隠蔽の対象になります。

---
<button type="button" class="revert-unseen btn btn-primary">ネタバレ解除</button>
それは<span class="unseen">秘密</span>です。
---

以下の場合、ボタンをクリックすると divタグ内を隠蔽解除/隠蔽します。
buttonタグの data-target属性に指定した値のid属性値があるタグひとつだけを隠蔽解除/隠蔽します。

---
<button type="button" class="revert-unseen btn btn-primary" data-target="secret">ネタバレ解除</button>
<div class="unseen" id="secret">それは秘密です。</div>
---

 */

/**
 * 隠蔽処理
 */
export class Unseen {
	constructor(config) {
		const target = new UnseenTarget(config.target);
		target.unseen(null);
		const operate = new UnseenOperate(config.buttons, target);
		operate.unseen(null);
	}
}
/**
 * 隠蔽/隠蔽解除操作
 */
class UnseenOperate {
	constructor(config, target) {
		this.cname = config.cname;
		this.buttonNameUnseen = config.buttonName.unseen;
		this.buttonNameSeen = config.buttonName.seen;
		this.target = target;
	}
	
	unseen(targetID){
		let buttons = (targetID)
			? document.querySelectorAll(`button[data-target="${targetID}"]`)
			: document.getElementsByClassName(this.cname);
		for (let cnt = 0; cnt < buttons.length; cnt ++){
			buttons[cnt].textContent = this.buttonNameUnseen;
			const targetID = buttons[cnt].getAttribute('data-target');
			buttons[cnt].addEventListener('click', () => {
				this.seen(targetID);
				this.target.seen(targetID);
			});
		}
	}
	
	seen(targetID){
		let buttons = (targetID)
			? document.querySelectorAll(`button[data-target="${targetID}"]`)
			: document.getElementsByClassName(this.cname);
		for (let cnt = 0; cnt < buttons.length; cnt ++){
			buttons[cnt].textContent = this.buttonNameSeen;
			const targetID = buttons[cnt].getAttribute('data-target');
			buttons[cnt].addEventListener('click', () => {
				this.unseen(targetID);
				this.target.unseen(targetID);
			});
		}
	}
}

/**
 * 隠蔽箇所
 */
class UnseenTarget {
	constructor(config) {
		this.cname = config.cname;
		this.cnameHide = config.controlCname.hide;
		this.cnameShow = config.controlCname.show;
	}
	
	unseen(targetID){
		if (targetID){
			let target = document.getElementById(targetID);
			target.classList.add(this.cnameHide);
			target.classList.remove(this.cnameShow);
		} else {
			let elems = document.getElementsByClassName(this.cname);
			for (let cnt = 0; cnt < elems.length; cnt ++){
				elems[cnt].classList.add(this.cnameHide);
				elems[cnt].classList.remove(this.cnameShow);
			}
		}
	}
	
	seen(targetID){
		if (targetID){
			let target = document.getElementById(targetID);
			target.classList.add(this.cnameShow);
			target.classList.remove(this.cnameHide);
		} else {
			let elems = document.getElementsByClassName(this.cname);
			for (let cnt = 0; cnt < elems.length; cnt ++){
				elems[cnt].classList.add(this.cnameShow);
				elems[cnt].classList.remove(this.cnameHide);
			}
		}
	}
}
