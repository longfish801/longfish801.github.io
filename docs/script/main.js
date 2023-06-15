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
<!-- サイトヘッダ -->
<div id="siteHeader" />

隠蔽箇所を表示するには <button type="button" class="revert-unseen btn btn-primary">ネタバレ解除</button>をクリックしてください。

それは<span class="unseen">秘密</span>です。

<script src="/script/main.js" type="module"></script>
-----
 */

import {Banners, SiteHeader} from './banners/banners.js';
import {Unseen} from './unseen/unseen.js';

const bannersConfig = {
	// 表示タグのid属性値
	id: {
		bannerList: 'bannerList',
		siteHeader: 'siteHeader'
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
			src: '/img/banner/ban_ddfr.png',
			alt: 'デデフラ'
		},
		{
			href: '/pages/2019/191229_reasoning/',
			src: '/img/banner/ban_reasoning.png',
			alt: '探偵が推理を殺す'
		},
		{
			href: '/pages/2016/160814_hypergame/',
			src: '/img/banner/ban_hypergame.png',
			alt: 'ハィパァゲィム'
		},
		{
			href: '/pages/2008/081027_iron/',
			src: '/img/banner/ban_iron.png',
			alt: '鉄錆風味歪夢'
		}
	]
}

const unseenConfig = {
	// 隠蔽/隠蔽解除ボタン
	buttons: {
		// クラス名
		cname: 'revert-unseen',
		// ボタン名
		buttonName: {
			unseen: 'ネタバレを表示',
			seen: 'ネタバレを隠す'
		}
	},
	// 隠蔽箇所
	spans: {
		// クラス名
		cname: 'unseen',
		// 表示/非表示制御のためのクラス名
		controlCname: {
			hide: 'unseen-hide',
			show: 'unseen-show'
		}
	}
}

// DOMツリー構築完了時
window.addEventListener('DOMContentLoaded', (event) => {
	// バナー一覧を表示します
	new Banners(bannersConfig.banners).show(document.getElementById(bannersConfig.id.bannerList));
	// ガイドヘッダを表示します
	new SiteHeader(bannersConfig.header, bannersConfig.banners).show(document.getElementById(bannersConfig.id.siteHeader));
	// 隠蔽解除ボタンを初期化します
	new Unseen(unseenConfig);
});
