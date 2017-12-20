<template>
  <div class="singer">
    <listview :data="singers" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
	import {getSingerList} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import Singer from 'common/js/singer'
	import Listview from 'base/listview/listview'
	import {mapMutations} from 'vuex'

	const HOT_NAME = '热门'
	const HOT_NAME_LENGTH = 10
	export default {
		mounted() {
			this._getSingerList()
		},
		data() {
			return {
				singers: []
			}
		},
		components: {
			Listview
		},
		methods: {
			selectSinger(singer) {
				// console.log(singer)
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.code === ERR_OK) {
						this.singers = this._initSingerList(res.data.list)						
					}
				})
			},
			_initSingerList(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items:[]
					}
				}
				list.forEach((item, index) => {
					if (index < HOT_NAME_LENGTH) {
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}
					const key = item.Findex
					if (!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))

				})
				
				let hot = [],ret = [];
				//遍历map生成有序的数组
				for(let k in map) {
					let res = map[k]
					if (res.title === HOT_NAME) {
						hot.push(res)
					}else if(res.title.match(/[a-zA-Z]/)){
						ret.push(res)
					}
				}

				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})

				return hot.concat(ret)

			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%

</style>
