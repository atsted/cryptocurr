import Vue from 'vue'
import Vuex from 'vuex'
import { IMG_SRC } from './api/config'
import {
  fetchCryptocurrencies,
  refreshCryptocurrencies
} from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    page: 0,
    limit: 100,
    nodata: false,
    loading: false
  },
  getters: {
    cryptocurrencies (state) {
      let data = state.data.map(e => ({
        id: e.CoinInfo.Id,
        src: `${IMG_SRC}${e.CoinInfo.ImageUrl}`,
        url: `${IMG_SRC}${e.CoinInfo.Url}`,
        abbr: e.CoinInfo.Name,
        name: e.CoinInfo.FullName,
        price: (e.RAW && e.RAW.USD.PRICE) || 0,
        fmtPrice: e.DISPLAY && e.DISPLAY.USD.PRICE
      }))
      return data.sort((a, b) => (b.price - a.price))
    },
    loading (state) {
      return state.loading
    },
    nodata (state) {
      return state.nodata
    },
    mayFetch (state) {
      return !(state.loading || state.nodata)
    },
    fetchParams (state) {
      return {
        page: state.page,
        limit: state.limit
      }
    }
  },
  mutations: {
    UPDATE_LIST (state, newData = []) {
      state.data = newData
    },
    PUSH_TO_LIST (state, data = []) {
      state.data.push(...data)
      state.page += 1
    },
    LOADING_START (state) {
      if (!state.nodata) {
        state.loading = true
      }
    },
    LOADING_STOP (state) {
      state.loading = false
    },
    STOP_FETCHING (state) {
      state.nodata = true
    }
  },
  actions: {
    async fetchData ({ commit, getters }) {
      if (getters.mayFetch) {
        commit('LOADING_START')
        const data = await fetchCryptocurrencies(getters.fetchParams)
        switch (data['Message']) {
          case 'Success':
            commit('PUSH_TO_LIST', data['Data'])
            break
          case 'Err:No Data':
            commit('STOP_FETCHING')
            break
        }
        commit('LOADING_STOP')
      }
    },
    async refreshData ({ commit, getters }) {
      const n = getters.fetchParams.page * getters.fetchParams.limit
      commit('UPDATE_LIST', await refreshCryptocurrencies(n))
    }
  }
})
