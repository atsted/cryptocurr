<template>
  <div class="list-item">
    <div>
      <img
        class="list-img"
        :src="item.src"
        :alt="item.abbr"
      />
    </div>
    <a
      class="list-name"
      :href="item.url"
      target="_blanck">
      {{ item.name }}
      ({{ item.abbr }})
    </a>
    <div>{{ item.fmtPrice }}</div>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: ['item']
}
</script>

<style lang="stylus" scoped>
.list
  &-item
    padding .5rem
    display flex
    align-items center
    justify-content space-between
    box-shadow 0 1px 1px rgba(128, 128, 128, .5)
    box-sizing border-box
    &:hover
      background rgba(128, 128, 128, .1)
  &-name
    padding 0 .5rem
    flex-grow 1
    text-align left
    color rgba(0, 120, 176, 1)
    box-sizing border-box
    text-decoration none
  &-img
    width 25px
    display block
</style>
