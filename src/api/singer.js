import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		loginUin: 0,
		hostUin: 0,
		platform: 'yqq',
		notice: 0,
		needNewCode: 0,
		page: 'list'
	})
	return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		notice: 0,
		needNewCode: 0,
		order: 'listen',
		begin: 0,
		num: 100,
		songstatus: 1,
		singermid: singerId,
		loginUin: 0,
		hostUin: 0
	})

	return jsonp(url, data, options)
}