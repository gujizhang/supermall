<template>
   <div class="wrapper" ref="wrapper">
          <div class="content">
            <slot>
            </slot>
          </div>
   </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      });
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
      });
      this.scroll.on('pullingUp',() =>{
        // console.log('拉拉我嘤嘤嘤');
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=600) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>