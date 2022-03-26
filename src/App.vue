<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
<style lang="less">
.success {
  color: #5cb87a;
}
.primary {
  color: #409eff;
}
.danger {
  color: #f56c6c;
}
.warning {
  color: #e6a23c;
}
html {
  min-height: 100%;
}
body {
  overflow-y: hidden;
  min-height: calc(100% - 18px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow-y: hidden;
}
</style>
