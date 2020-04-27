<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!--ref设定之后就可以利用 this.$refs.组件名字 来访问组件-->
    <tab-control ref="tabControl1"
                 :titles="['流行' , '新款' , '精选']"
                 @tabClick="tabClick"
                 class="tab-contrl"
                 v-show="isTabFixed"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper @swiperImageLoad="swiperImageLoad"
                   :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行' , '新款' , '精选']"
                   @tabClick="tabClick"
      />
      <goods-list :goods="showGoods"/>
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
/*  import {debounce} from "common/utils";*/
  import {itemImageListener} from "common/mixin";


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
  mixins: [itemImageListener],
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
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY ,1)
    this.$refs.scroll.refresh()
  },
  deactivated() {
      //保存y
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImageLoad',itemImageListener)
  },
  created() {
      //请求成功之后将数据进行一定的操作
      this.getHomeMultidata();
      //生命周期函数有作用域，所以要将局部变量换到林外的地方存起来
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {

/*
      const refresh = debounce( this.$refs.scroll.refresh, 50)
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      }
      )
*/

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // console.log(position)
        //决定backtop是否显示

        this.isShowBackTop = (-position.y) > 1000
        //决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // console.log('我是一个小宝贝嘻嘻嘻');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          this.$refs.scroll.finishPullUp();
        });

      }
    }
  }
</script>

<style scoped>
  #home{
    /*100%视口高度*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    color: white;
    background-color: var(--color-tint) ;
/*    position: fixed;
    left: 0;
    right: 0;
    top: 0;
     z-index: 999;*/

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
  .tab-contrl{
/*    position: fixed;
    left: 0;
    top: 44px;
    right: 0;*/
    position: relative;
    z-index: 9;
  }
</style>
