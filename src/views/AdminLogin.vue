<template>
  <div class="loginPage">
    <h1 class="title">后台管理系统</h1>
    <div class="login-box">
      <div class="login-title">管理员登录</div>
      <form action="" id="login">
        <label for="adminname">
          <span class="el-icon-user"></span>
          <input
            type="text"
            name="adminname"
            id="adminname"
            placeholder="请输入账号"
            v-model="acount"
          />
        </label>
        <label id="p-ico" for="password">
          <span class="el-icon-lock"></span>
          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="请输入密码"
            v-model="password"
          />
        </label>
        <button class="login-btn" @click.prevent="AdminLogin()">登录</button>
      </form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center
      top="17%"
      :before-close="handleClose"
    >
      <span>{{ dialogMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      acount: null,
      password: null,
      dialogVisible: false,
      dialogMessage: null,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    AdminLogin() {
      if (!this.acount || !this.password) {
        this.dialogVisible = true;
        this.dialogMessage = "请输入正确的账号或密码";
        return false;
      }
      this.axios({
        method: "post",
        url: "/admin/login",
        params: {
          number: this.acount,
          pwd: this.password,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.status != 0) {
            this.dialogVisible = true;
            this.dialogMessage = response.data.data.message;
          } else {
            window.sessionStorage.setItem('token',response.data.data)
            this.$store.state.adminName=response.data.data
            this.goManagement();
          }
        })
        .catch((err) => {
          // console.log(err);
          this.dialogVisible = true;
          this.dialogMessage = err.message;
        });
    },
  },
  beforeRouteEnter: (to, from, next) => {
    document.body.style.backgroundImage =
      "url(" + require("../../public/img/abgi.png") + ")";
    next();
  },
};
</script>

<style>
body {
  background-image: url("../../public/img/abgi.png");
  /* background: no-repeat; */
  background-size: 100%;
  /* filter: blur(1px); */
  height: 100%;
}

h1 {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-family: "宋体";
  height: 40px;
  line-height: 40px;
  letter-spacing: 1.5px;
  font-size: 40px;
  color: #fff;
}

.login-box {
  margin: 15% auto;
  width: 350px;
  background-color: rgba(95, 80, 109, 0.7);
  /* padding: 40px; */
  border-radius: 10px;
  color: #fff;
  transition: 0.2s;
}
.login-box:hover {
  background-color: rgba(95, 80, 109, 0.9);
}
.login-title {
  margin-bottom: 20px;
  border-bottom: 2px solid #ffffffaa;
  padding: 20px 40px 10px;
  font-size: 20px;
}

#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
}

label {
  font-family: "iconfont";

  background-color: rgba(255, 255, 255, 0.35);
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 3px;
}

input {
  border: 0;
  background-color: transparent;
  color: #fff;
  outline: none;
  font-size: 14px;
  width: 200px;
  padding-left: 10px;
}

::-ms-input-placeholder {
  color: #ffffffaa;
}

::-webkit-input-placeholder {
  color: #ffffffaa;
}

.login-btn {
  width: 85%;
  padding: 8px;
  margin-bottom: 10px;
  background: #ef4c53aa;
  color: #fff;
  font-size: 16px;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
}

.login-btn:hover {
  background: #ef4c53;
}
</style>