<template>
  <el-main>
    <el-table
      :data="tableData"
      v-if="!isEmpty"
      :stripe="true"
      @current-change="handleCurrentChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item label="产品编号">
              <span>{{ props.row.name }}</span>
            </el-form-item> -->
            <el-form-item label="产品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="产品总数">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="限购数量">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="产品单价">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="年化利率">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="产品期限">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="秒杀开始时间">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="秒杀结束时间">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="起息日时间">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="到期日时间">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="风险等级">
              <span>{{}}</span>
            </el-form-item>
            <el-form-item label="管理员">
              <span>{{}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column sortable prop="date" label="产品名称" width="">
      </el-table-column>
      <el-table-column prop="name" label="产品单价" width=""> </el-table-column>
      <el-table-column prop="address" label="产品利率"> </el-table-column>
      <el-table-column prop="address" label="秒杀开始时间"> </el-table-column>
      <el-table-column prop="address" label="产品状态"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="true"
      background
      layout="prev, pager, next"
      :total="1"
    >
    </el-pagination>
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