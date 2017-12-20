<template>
	<transition name="slide">	
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {creatSongs} from 'common/js/song'
	import {ERR_OK} from 'api/config'
	import MusicList from 'components/music-list/music-list'
	export default {
		computed: {
			...mapGetters([
				'singer'
			]),
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			}
		},
		data() {
			return {
				songs: []
			}
		},
		created() {
			this._getDetail()
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push({
						path: '/singer'
					})
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._initSongs(res.data.list)
						console.log('songs',this.songs)
					}
				})
			},
			_initSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
					if (musicData.songid && musicData.albummid) {
						ret.push(creatSongs(musicData))
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}

	}
</script>

 <style scoped lang="stylus">
	.slide-enter-active
		transition: all .3s ease
	.slide-leave-active
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
	.slide-enter,.slide-leave-to
		transform: translate3d(100%,0,0)
 	
 </style>