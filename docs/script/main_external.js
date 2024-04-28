/*
 * main_external.js
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

/*
外部から main処理だけ呼びたいときに本スクリプトを利用してください。
main処理を呼ぶにはイベント "newscreen"を発生させてください。
 */

import {main} from './main.js';

window.addEventListener('newscreen', (event) => {
	main(event);
});
window.addEventListener('load', (event) => {
	main(event);
})
