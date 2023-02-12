/*
<div id="side"></div>内に、以下のHTML文字列を生成する。

... バナー画像 ... （常に表示）
<a href="javaScript:pullDown()"><img src="/_style/img/help.png" alt="help" width="43" height="43"></a>
<div id="hiddenMenu" style="position:absolute;visibility:hidden;">
... 各種メニューへのリンク ... （クリックされるまで非表示）
</div>
 */

var isMenuHidden = false;
function pullDown() {
	if (isMenuHidden){
		hiddenMenu.style.visibility = "hidden";
	} else {
		hiddenMenu.style.visibility = "visible";
	}
	isMenuHidden = !isMenuHidden;
}

function infobar(res){
	$('side').innerHTML += tagbanner(res)
/*
		+ '<div id="menuImg"><a href="javaScript:pullDown()"><img src="/_style/img/help.png" alt="help" width="43" height="43"></a></div>'
		+ '<ul id="hiddenMenu">'
		+ taglinks(res)
		+ tagShortcut(res)
		+ '</ul>';
*/
}

function tagbanner(res){
	var tagbanner = '';
	if (res['banner'] != ''){
		var banners = res['banner'];
		var tags = new Array();
		var cnt;
		for (cnt = 0; cnt < banners.length; cnt ++){
			var banner = banners[cnt];
			var tag = '';
			tag += '<li><a href="' + banner['href'] + '">';
			tag += '<img';
			tag += ' src="' + banner['src'] + '"';
			tag += ' alt="' + banner['alt'] + '"';
			tag += ' width="' + banner['width'] + '"';
			tag += ' height="' + banner['height'] + '"';
			tag += '></a></li>';
			tags.push(tag);
		}
		tagbanner += '<ul id="banner">' + tags.join('') + '</ul>';
	}
	return tagbanner;
}

function taglinks(res){
	var tagindex = '<li class="subhead">コンテンツ</li>';
	if (res['index'] != ''){
		var indexs = res['index'];
		var tags = new Array();
		var cnt;
		for (cnt = 0; cnt < indexs.length; cnt ++){
			var index = indexs[cnt];
			var tag = '';
			tag += '<li><a href="' + index['href'] + '">';
			tag += index['body'];
			tag += '</a></li>';
			tags.push(tag);
		}
		tagindex += tags.join('');
	}
	return tagindex;
}

function tagShortcut(res){
	var tagShortcut = '<li class="subhead">案内</li>';
	if (res['shortcut'] != ''){
		var shortcuts = res['shortcut'];
		var tags = new Array();
		var cnt;
		for (cnt = 0; cnt < shortcuts.length; cnt ++){
			var shortcut = shortcuts[cnt];
			var tag = '';
			tag += '<li><a href="' + shortcut['href'] + '">';
			tag += shortcut['body'];
			tag += '</a></li>';
			tags.push(tag);
		}
		tagShortcut += tags.join('');
	}
	return tagShortcut;
}

Event.observe(window, 'load', function(){
	var url = '';
	url += '/_cgi/infobar/infobar.js';
	url += '?domain=' + document.domain;
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('charset', 'utf-8');
	script.setAttribute('src', url);
	document.getElementsByTagName('body').item(0).appendChild(script);
});

