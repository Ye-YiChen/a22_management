<template>
  <el-main>
    <el-table
      highlight-current-row
      height=""
      :data="tableData"
      v-if="!isEmpty"
      :stripe="true"
      @current-change="handleCurrentChange"
    >
      <el-table-column prop="date" label="日期" width=""> </el-table-column>
      <el-table-column prop="name" label="姓名" width=""> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="isEmpty" description="这里一条数据都没有呢"></el-empty>
  </el-main>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };

    return {
      tableData: Array(20).fill(item),
    };
  },
  computed: {
    isEmpty() {
      if (!this.tableData && this.tableData.length != 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>