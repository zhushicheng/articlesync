<template>
  <div class="side-menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true">
      <el-menu-item index="/">文章同步</el-menu-item>
<!--      <el-submenu index="1">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>文章同步</span>-->
<!--        </template>-->
<!--        <el-menu-item index="/">文章同步</el-menu-item>-->
<!--        <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--        <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--      </el-submenu>-->
<!--      <el-menu-item index="/main">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">数据导出</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    msg: String,
  },
  watch: {
    $route(val) {
      this.activeIndex = val.path;
    },
  },
  data() {
    return {
      activeIndex: '/',
    };
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   this.$ro
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.side-menu{
  width: 230px;
  height: 100%;
  background: white;
  text-align: center;
  font-size: 20px;
  .el-menu{
    //padding-top: 40px;
    //border: none;
    .el-menu-item, .el-submenu{
      text-align: left;
      width: 100%;
    }
    .el-menu-item, .el-submenu__title{
      height: 48px;
      line-height: 48px;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
      border: none;
      background-color: #f0f6ff;
    }
  }
}
</style>
