<template>
  <el-container class="header" >
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="AdminLogin()">登录</el-dropdown-item>
          <el-dropdown-item @click="AdminLogout()">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span @click="AdminLogin()">{{ AdminName ? AdminName : "尚未登录" }}</span>
    </el-header>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      AdminName: null,
    };
  },
  methods: {
    AdminLogin() {
      this.goLogin()
    },
    AdminLogout() {},
  },
  mounted(){
    // this.axios({
    //   method:'post',
    //   url: requestUrl,
    //   data: {
    //     id:requestUrl
    //   }
    // })
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>