<template>
    <div class="deatail-swiper">
      <swiper class="Swiper">
        <swiper-item   v-for="item in topImages">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
    </div>
</template>

<script>

  import {Swiper,SwiperItem} from "components/common/swiper";


  export default {
    name: "DeatailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
    .Swiper{
      height: 300px;
      overflow: hidden;
    }
</style>