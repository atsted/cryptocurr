<template>
  <div class="list">
    <div>
      <p v-show="total">Total: {{ total }}</p>
      <list-item
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
      <p v-show="total">Total: {{ total }}</p>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  name: 'list',
  props: ['items'],
  components: { ListItem },
  computed: {
    total () {
      return this.items.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  width 100%
  max-width 720px
  margin 0 auto
</style>
