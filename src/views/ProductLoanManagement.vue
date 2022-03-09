<template>
  <el-main>
    <el-table :data="tableData" v-if="!isEmpty" v-loading="isLoading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产品编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="产品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="产品总数">
              <span>{{ props.row.stock }}</span>
            </el-form-item>
            <el-form-item label="限购数量">
              <span>{{ props.row.limited }}</span>
            </el-form-item>
            <el-form-item label="产品单价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="年化利率">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="产品期限">
              <span>{{ props.row.term }}天</span>
            </el-form-item>
            <el-form-item label="产品状态">
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item label="秒杀开始时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="秒杀结束时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="起息日时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="到期日时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="风险等级">
              <span>{{ props.row.risk }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="产品名称" width=""> </el-table-column>
      <el-table-column sortable prop="price" label="产品单价" width="">
      </el-table-column>
      <el-table-column sortable label="产品利率" :sort-method="compare">
        <template slot-scope="scope">
          <span> {{ scope.row.num }}% </span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="startTime" label="秒杀开始时间">
      </el-table-column>
      <el-table-column sortable prop="state" label="产品状态">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="formatState(scope.row.state)">
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>
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
    return {
      tableData: [],
      currentRow: null,
      isPagination: false,
      isLoading: null,
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
  methods: {
    handleDelete(index) {
      this.tableData.splice(index,1)
    },

    filterHandler() {},
    formatState(value) {
      if (value == 1) {
        return "warning";
      } else if (value == 2) {
        return "info";
      } else if (value == 3) {
        return "danger";
      } else {
        return "";
      }
    },
    compare(a, b) {
      return a - b;
    },
  },
  mounted() {
    this.isLoading = true;
    this.axios({
      method: "get",
      url: "/item/loan/list",
    })
      .then((response) => {
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.message);
        } else {
          this.tableData = response.data.data;
        }
        this.isLoading = false;
      })
      .catch((err) => {
        this.tableData = [];
        this.MessageBox.alert(err.message);
        this.isLoading = false;

        return false;
      });
  },
  filters: {},
};
</script>

<style scoped>
.el-form-item span{
  font-weight: 700;
  padding-left: 8px;
}
.el-form-item__label {
  width: 100px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>