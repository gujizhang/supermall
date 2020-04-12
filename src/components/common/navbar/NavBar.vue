<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(100,100,100) ;
}
  .left, .right {
    width: 60px;

  }
  .center {
    flex: 1;

  /*  其他的有长度
    flex: 1;就会使得center直接占据剩下的所有长度*/
  }
</style>