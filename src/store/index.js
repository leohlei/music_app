import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
//mutation打印日志log
import creatLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//检测是否由mutation更改state
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	state,
	getters,
	mutations,
	strict: debug,
	plugins: debug ? [creatLogger()] : []
})