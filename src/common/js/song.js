export default class Song {
	constructor({id, mid, singer, name, album, duration, image, url}) {
		this.id = id,
		this.mid = mid,
		this.singer = singer,
		this.name = name,
		this.album = album,
		this.duration = duration,
		this.image = image,
		this.url = url
	}
}

export function creatSongs(musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url: `https://dl.stream.qqmusic.qq.com/${musicData.songmid}.m4a?formtag=66`	
	})

}

function filterSinger(singers) {
	let ret = []
	if (!singers.length) {
		return ''
	}
	singers.forEach((sin) => {
		ret.push(sin.name)
	})
	return ret.join('/')
}