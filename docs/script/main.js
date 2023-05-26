/*
 * main.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

/*
以下のように、表示したい箇所に特定の id属性値を指定したタグを記述してください。
-----
<!-- バナー一覧 -->
<div id="bannerList" />
<!-- ガイドヘッダ -->
<div id="guideHeader" />
... 中略 ...
<script src="/script/main.js" type="module"></script>
-----
 */

import {Banners, GuideHeader} from './banners/banners.js';

const setting = {
	// 表示タグのid属性値
	id: {
		bannerList: 'bannerList',
		guideHeader: 'guideHeader'
	},
	// ガイドヘッダ
	header: {
		avatar: {
			href: '/',
			src: '/img/avatar.png',
			alt: 'ながいさかなちゃん'
		},
		title: {
			href: '/',
			src: '/img/title.png',
			alt: '*the long fish*'
		}
	},
	// バナー
	banners: [
		{
			href: '/ddfl/',
			src: 'img/banner/ban_ddfr.png',
			alt: 'デデフラ'
		},
		{
			href: '/pages/2019/191229_reasoning/',
			src: 'img/banner/ban_reasoning.png',
			alt: '探偵が推理を殺す'
		},
		{
			href: '/pages/2016/160814_hypergame/',
			src: 'img/banner/ban_hypergame.png',
			alt: 'ハィパァゲィム'
		},
		{
			href: '/pages/2008/081027_iron/',
			src: 'img/banner/ban_iron.png',
			alt: '鉄錆風味歪夢'
		}
	]
}

// DOMツリー構築完了時
window.addEventListener('DOMContentLoaded', (event) => {
	// バナー一覧を表示します
	let banners = new Banners(setting.banners);
	banners.show(document.getElementById(setting.id.bannerList));
	// ガイドヘッダを表示します
	let header = new GuideHeader(setting.header, banners);
	header.show(document.getElementById(setting.id.guideHeader));
});
