<template>
  <el-main>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <el-table
          :data="showUserData"
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

          <el-table-column prop="name" label="用户名称" width="">
          </el-table-column>
          <el-table-column prop="phone" label="用户账号" width="">
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
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
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
      showUserData: [{ phone: "nihao", name: "hello" }],
    };
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
    handleChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
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
  },
};
</script>

<style scoped>
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
.user-search:focus{
  border: 1px solid rgb(179,192,209);

}
</style>