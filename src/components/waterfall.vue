<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-show="isLoading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>

// throttle 节流库
import {throttle} from 'throttle-debounce'
export default {
  name: 'Waterfall',
  data(){
    return {
      isLoading: false
    }
  },
  mounted(){
    this.scrollHandler = throttle(300, this.scroll.bind(this)); // 时间，执行代码
    window.addEventListener('scroll', this.scrollHandler);
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods:{
    scroll(){
      console.log(123)
      if(this.isLoading) return;
      if(this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight){
        console.log('已到达可视区')
        this.isLoading = true;
        this.$emit('view')
      }
    }
  }
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>