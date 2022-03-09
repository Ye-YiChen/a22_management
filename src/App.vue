<template>
  <div id="app">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <router-link to="user" class="router" active-class="current"
            ><el-menu-item index="1">
              <template slot="title"
                ><i class="el-icon-user"></i>用户管理</template
              >
              <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu> -->
            </el-menu-item>
          </router-link>
          <router-link to="product" class="router" active-class="current">
            <el-menu-item index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>产品管理</template
              >
              <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu> -->
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <show-header/>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import ShowHeader from './components/ShowHeader.vue'
export default {
  components: { ShowHeader },
  
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-aside {
  color: #333;
}
.router{
  text-decoration: none;
}
</style>
