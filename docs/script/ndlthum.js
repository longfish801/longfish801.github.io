/*
 * ndlthum.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

/*

書影を表示したい箇所に以下の属性を持つ divタグを記述してください。
指定した ISBNに対応する書影を表示します。
指定したキーワードについて Googleの検索結果へリンクします。
キーワードは画像の代替表示文字列（alt属性値）にも使用します。

* class：CSSのクラス名、"ndlthum"固定
* data-isbn13：ISBN（13桁）、必須
* data-keyword：検索キーワード、省略可、省略時はリンクなし
* data-width：書影画像の表示幅、省略可、デフォルト値は 150

サンプルは以下のとおりです。

---
<div class="ndlthum" data-isbn13="978-4041111659" data-keyword="青崎有吾『地雷グリコ』" data-width="300"></div>
---

 */

/**
 * 国立国会図書館サーチを利用した書影を表示します
 */
export class NDLThum {
	constructor(config) {
		this.cname = config.cname
		this.noimage = config.noimage
		this.dfltWidth = config.dfltWidth
		document.querySelectorAll(`div.${this.cname}`).forEach((div) => { this.createEachThumbnail(div) });
	}
	
	createEachThumbnail(div){
		const keyword = div.getAttribute('data-keyword');
		const isbn = div.getAttribute('data-isbn13').replaceAll('-', '');
		const width = div.getAttribute('data-width');
		let anchor;
		if (keyword){
			// リンクのタグを作成します
			anchor  = document.createElement('a');
			anchor.href = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&ie=UTF-8`;
			anchor.target = '_blank';
		}
		// 書影画像のタグを作成します
		let img = document.createElement('img');
		img.src = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;
		img.width = (width)? width : this.dfltWidth;
		if (keyword) img.alt = keyword;
		img.onerror = () => { img.src = this.noimage; };
		// いったん子要素をすべて削除します（再読込を考慮）
		while (div.firstChild){
			div.removeChild(div.firstChild);
		}
		// 書影表示のための要素を格納します
		if (keyword){
			div.appendChild(anchor);
			anchor.appendChild(img);
		} else {
			div.appendChild(img);
		}
	}
}
