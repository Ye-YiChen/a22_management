<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <router-link to="user" class="router" active-class="current"
            ><el-menu-item index="1">
              <template slot="title"
                ><i class="el-icon-user"></i>用户管理</template
              >
            </el-menu-item>
          </router-link>
          <router-link to="product" class="router" active-class="current">
            <el-menu-item index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>产品管理</template
              >
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container direction="vertical">
        <show-header />
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ShowHeader from "./components/ShowHeader.vue";
export default {
  components: { ShowHeader },
};
</script>
<style lang="less">
html{
  min-height: 100%;
}
body{
  min-height: calc(100% - 18px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-container {
  height: 100%;
  border: 1px solid #eee;
}
.el-aside {
  color: #333;
  background-color: rgb(238, 241, 246);
  height: 100%;
}
.router {
  text-decoration: none;
}
</style>
