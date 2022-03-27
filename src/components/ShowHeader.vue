<template>
  <el-container class="header">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">登录</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span @click="AdminLogin()">{{
        AdminName ? AdminName : "尚未登录"
      }}</span>
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
    handleCommand(command) {
      if (command == "login") {
        this.AdminLogin();
      } else if (command == "logout") {
        this.AdminLogout();
      }
    },
    AdminLogin() {
      if (this.AdminName != "尚未登录") return false;
      this.goLogin();
    },
    AdminLogout() {
      console.log(2);
      if (!window.sessionStorage.getItem("token")) {
        console.log(1);
        this.MessageBox.alert("你还没登录呢！");
        return false;
      }
      this.axios({
        method: "get",
        url: "/admin/logout",
        params: {
          token: window.sessionStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.data.message);
          this.goLogin();
        } else {
          window.sessionStorage.removeItem("token");
          this.goLogin();
        }
      });
    },
  },
  mounted() {
    if (!window.sessionStorage.getItem("token")) {
      this.goLogin();
    } else {
      this.axios({
        method: "get",
        url: "/admin/status",
        params: {
          token: window.sessionStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.data.message);
        } else {
          this.AdminName = response.data.data.name;
        }
      });
    }
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>