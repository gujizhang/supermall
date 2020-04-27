import {debounce} from "common/utils";
import {NEW, POP, SELL} from "common/const";
import BackTop from "components/content/backTop/BackTop";


export const itemImageListener = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce( this.$refs.scroll.refresh, 50)
    //监听item中图片加载完成
    this.itemImageListener= () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener )
   // console.log('我是混入');
  },
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  }
}

