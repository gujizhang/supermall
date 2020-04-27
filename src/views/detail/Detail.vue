<template>
  <div id="detail" >
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
    >
      <deatail-swiper :top-images="topImages"></deatail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="pramaInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"> </detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar  @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DeatailSwiper from "./childComps/DeatailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail"
  import {getRecommend} from "network/detail";
  import {itemImageListener , backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DeatailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,

      Scroll
    },
    mixins: [itemImageListener , backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        pramaInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
         //console.log(res.result)
        const data = res.result;
         this.topImages = data.itemInfo.topImages;

        this.goods = new Goods(data.itemInfo, data.columns , data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.pramaInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        //这个函数等在前面数据渲染完之后才会执行
        this.$nextTick(() =>{
        })
      })

      getRecommend().then(res =>{
        this.recommends = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',itemImageListener)
    },
    mounted() {
    },

    methods: {
      imageLoad() {
    //    console.log('=======');
        this.newRefresh()


        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
        this.themeTopYs.push(Number.MAX_VALUE);

//        console.log(this.themeTopYs);


      },
      titleClick(index) {
        /*console.log(index);*/
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position) {
        const positionY = -position.y

        let length = this.themeTopYs.length

        for (let i=0; i< length-1; i++){

          if (this.currentIndex !== i &&(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            //this.themeTopYs[index]=this.themeTopYs[i]
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.isShowBackTop = (-position.y) > 1000

      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.iid = this.iid
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        this.$store.commit('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }
</style>