<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-contrl"
                   :titles="['流行' , '新款' , '精选']"
                   @tabClick="tabClick"
      />
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
<!--要监听组件的活动要加.native修饰符号-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
//导入的子组件

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  // import Swiper from "components/common/swiper/Swiper";
  // import SwiperItem from "components/common/swiper/SwiperItem";


//导入的公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

//导入的函数数据以及方法
  import { getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      //为了存储请求过来的数据创建的数组
      return {
        banners: [],
        recommends: [],
        goods: {
          pop :{page:0,list: []},
          new :{page:0,list: []},
          sell :{page:0,list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
      }
    },
    created() {
      //请求成功之后将数据进行一定的操作
      this.getHomeMultidata();
      //生命周期函数有作用域，所以要将局部变量换到林外的地方存起来
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell')
    },
    methods: {
      //@
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(position)
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        console.log('我是一个小宝贝嘻嘻嘻');
        this.getHomeGoods(this.currentType)
      },
      //net
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //这里的this就是这个组件对象
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        });
        this.$refs.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>
  #home{
    /*100%视口高度*/
    height: 100vh;
    padding-top: 44px;
    position: relative;
  }

  .home-nav{
    color: white;
    background-color: var(--color-tint) ;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
  .tab-contrl{
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }
  .content{
   position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
  }
  /*.content{*/
  /*   height: calc(100% - 93px);*/
  /*   overflow: hidden;*/
  /*   margin-top: 44px;*/
  /* }*/

</style>
