<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1', '2']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>产品监控</template>
          <el-menu-item-group>
            <router-link
              to="/management/user/loan"
              class="router"
              active-class="current"
            >
              <el-menu-item index="1-1">贷款监控</el-menu-item>
            </router-link>
            <router-link
              to="/management/user/store"
              class="router"
              active-class="current"
            >
              <el-menu-item index="1-2">存款监控</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>产品管理</template>
          <el-menu-item-group>
            <router-link
              to="/management/product/loan"
              class="router"
              active-class="current"
            >
              <el-menu-item index="2-1">贷款产品</el-menu-item>
            </router-link>
            <router-link
              to="/management/product/store"
              class="router"
              active-class="current"
            >
              <el-menu-item index="2-2">存款产品</el-menu-item>
            </router-link>
            <router-link
              to="/management/product/template"
              class="router"
              active-class="current"
            >
              <el-menu-item index="2-3">产品规则</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container direction="vertical">
      <show-header />
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-container>
  </el-container>
</template>

<script>
import ShowHeader from "../components/ShowHeader.vue";
export default {
  components: { ShowHeader },
  beforeRouteEnter: (to, from, next) => {
    document.body.style.background = "none";
    if (!window.sessionStorage.getItem("token")) {
      this.goLogin();
      return false;
    }
    next();
  },
};
</script>

<style scoped>
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