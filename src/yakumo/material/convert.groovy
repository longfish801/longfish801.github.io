/*
 * script.groovy
 *
 * Copyright (C) io.github.longfish801 All Rights Reserved.
 */

import io.github.longfish801.tpac.TpacServer

load {
	material 'fyakumo', 'thtml', scriptFile.parentFile
}

related {
	outDir 'build/docs'
	// relatedフォルダ配下のファイルすべてを関連ファイルとしてコピー対象に設定します
	File related = new File(scriptFile.parentFile, 'related')
	def scanner = new AntBuilder().fileScanner {
		fileset(dir: related.path) { include(name: '**/*') }
	}
	for (File file in scanner){
		source 'draft', file.absolutePath.substring(related.absolutePath.length() + 1), file
	}
}

script {
	// 原稿を読みこみます
	def server = new TpacServer()
	File draftDir = new File(scriptFile.parentFile, '..')
	[ 'base', 'novel', 'text', 'selfpub', 'guide'].each {
		server.soak(new File(draftDir, "${it}.tpac"))
	}
	append 'draft', server.draft
	// 一部のキーに設定されたテキストをbltxt形式に変換するよう設定します
	targets {
		server.draft.scan { def handle ->
			['title', 'dflt', 'ccopy'].findAll {
				handle.map.containsKey(it)
			}.each { String prop ->
				target "${handle.path}#${prop}",
					(handle.map[prop] instanceof List)?
						handle.map[prop].join(System.lineSeparator) :
						handle.map[prop]
			}
		}
	}
	results {
		result 'index', new File('build/docs/index.html')
	}
	doLast {
		results.index.fprint.logs.each { println it }
	}
}
