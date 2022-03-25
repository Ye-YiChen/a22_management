<template>
  <el-main>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(data, index) in localUserData"
        :title="data.id + data.name + '  '"
        :key="index"
        name="1"
      >
        <el-table
          :data="localUserData"
          v-if="!isEmpty"
          :stripe="true"
          @current-change="handleCurrentChange"
          max-height="650"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- <el-form-item label="产品编号">
              <span>{{ props.row.name }}</span>
            </el-form-item> -->
                <el-form-item label="用户账号">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="用户名称">
                  <span>{{ props.row.name }}</span>
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

          <el-table-column prop="userId" label="用户账号" width="">
          </el-table-column>
          <el-table-column prop="userName" label="用户名称" width="">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[
              { text: '有资格', value: '有资格' },
              { text: '无资格', value: '无资格' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '无资格' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <input
                type="text"
                v-model="searchText"
                placeholder="用户搜索"
                class="user-search"
              />
            </template>
          </el-table-column>

          <!-- <el-table-column prop="address" label="产品利率"> </el-table-column>
          <el-table-column prop="address" label="秒杀开始时间">
          </el-table-column>
          <el-table-column prop="address" label="产品状态"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </el-collapse-item>
    </el-collapse>

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
      searchText: "",
      searchTimer: null,
      activeNames: [],
      localUserData: [],
      showUserData: [],
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/admin/item/loan",
      params: {
        token: window.sessionStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status != 0) {
        this.MessageBox.alert(response.data.data.message);
      } else {
        this.localUserData = response.data.data;
      }
    });
  },
  computed: {
    isEmpty() {
      if (!this.localUserData && this.localUserData.length != 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    handleChange() {
      // 展开 最外层数据 this.activeNames 时触发
      console.log(1);
    },
    handleCurrentChange(val) {
      // 点击 某条具体数据时触发
      console.log(2);
      this.currentRow = val;
    },
  },
  watch: {
    searchText(oldValue, newValue) {
      console.log(1);
      console.log(newValue);
      clearInterval(this.searchTimer);
      this.searchTimer = setInterval(() => {
        // 进行一次筛选
        for (let i = 0; i < this.showUserData.length; i++) {
          this.showUserData.filter(
            (data) =>
              !newValue ||
              data.name.toLowerCase().includes(newValue.toLowerCase())
          );
        }
      }, 300);
    },
    activeNames: {
      deep: true,
      handler(newValue, oldValue) {
        let index=newValue[newValue.length-1]-1
        if (newValue.length > oldValue.length) {
          // 在这里请求具体数据 flag 0 cg  1 sb
          this.axios({
            method: "post",
            url: "/admin/item/user",
            params: {
              token: window.sessionStorage.getItem("token"),
              // itemId:23
              itemId: this.localUserData[index].id,
            },
          }).then(response=>{
            console.log(response);
          });
        }
      },
    },
  },
};
</script>

<style scoped>
.el-collapse-item__header {
  font-size: 20px;
  font-weight: 700;
}
.user-search {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 35px;
  width: 200px;
  line-height: 35px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.user-search:focus {
  border: 1px solid rgb(179, 192, 209);
}
</style>