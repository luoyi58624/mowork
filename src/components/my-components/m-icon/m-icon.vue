<template>
  <text :class="['iconfont',type]" :style="{ color: color, 'font-size': size+'px' }" @click="_onClick"></text>
</template>

<script>

const getVal = (val) => {
  const reg = /^[0-9]*$/g
  return (typeof val === 'number' || reg.test(val)) ? val + 'px' : val;
}
export default {
  name: "m-icon",
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    size: {
      type: [Number, String],
      default: 16
    },
  },
  computed: {
    iconSize() {
      return getVal(this.size)
    }
  },
  methods: {
    _onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import "@/static/iconfont.css";
</style>
