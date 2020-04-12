<template>
  <div class="goods">
    <goods-list-item v-for = "item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "goods",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }

      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /*justify-content:space-evenly;*/
    padding: 3px;
  }

</style>