<template>
  <div id="app">
<!--    <side-menu></side-menu>-->
    <div class="article-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">文章列表</el-breadcrumb-item>
<!--        <el-breadcrumb-item><a href="/">文章发步</a></el-breadcrumb-item>-->
      </el-breadcrumb>
      <div style="margin: 16px">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
// import sideMenu from '@/components/sideMenu/index.vue';

export default {
  components: {
    // sideMenu,
  },
};
</script>
<style lang="less">
@import "./style/common.less";
html,body, #app {
  height: 100%;
  width: 100%;
  //min-width: 1100px;
  background: #f4f6fc
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}

.article-content{
  overflow: auto;
  flex: 1;
  .el-breadcrumb{
    height: 48px;
    line-height: 48px;
    background: white;
    padding-left: 16px;
    margin-bottom: 16px;
  }
}
</style>
