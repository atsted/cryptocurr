<template>
  <div id="app">
    <list :items="cryptocurrencies" />
    <div v-show="loading">
      <div>\ (•◡•) /</div>
      <div class="loader">
        <div class="gooey">
          <span class="dot" />
          <div class="dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
    <p v-show="nodata">¯ \ _ (ツ) _ / ¯<br><br>No more data...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import List from './components/List.vue'

export default {
  name: 'app',
  components: { List },
  computed: mapGetters([
    'cryptocurrencies',
    'loading',
    'nodata',
    'mayFetch'
  ]),
  created () {
    this.fetchData()
    this.setGlobalHandlers()
  },
  destroyed () {
    this.removeGlobalHandlers()
  },
  methods: {
    ...mapActions(['fetchData', 'refreshData']),
    setGlobalHandlers () {
      window.addEventListener('scroll', this.scrollHandler)
      this.timeId = setInterval(() => {
        this.refreshData(this.cryptocurrencies.length)
      }, 10000)
    },
    removeGlobalHandlers () {
      window.removeEventListener('scroll', this.scrollHandler)
      clearInterval(this.timeId)
    },
    scrollHandler (event) {
      if (this.mayFetch) {
        if (document.body.clientHeight < window.scrollY + window.innerHeight) {
          this.fetchData()
        }
      }
    }
  },
  data () {
    return {
      timeId: null
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin 60px auto
  cursor default
.loader
    height 40px
    margin 20px auto
    position relative
.gooey
  top 50%
  left 50%
  width 142px
  height 100%
  margin -20px 0 0 -71px
  position absolute
  background white
  filter contrast(20)
  .dot
    position absolute
    width 16px
    height 16px
    top 12px
    left 15px
    filter blur(4px)
    background #000
    border-radius 50%
    transform translateX(0)
    animation dot 2.8s infinite
  .dots
    margin-top 12px
    margin-left 31px
    transform translateX(0)
    animation dots 2.8s infinite
    span
      display block
      float left
      width 16px
      height 16px
      margin-left 16px
      filter blur(4px)
      background #000
      border-radius 50%

@keyframes dot
  50%
    transform translateX(96px)
@keyframes dots
  50%
    transform translateX(-31px)
</style>
