<template>
  <el-main>
    <el-table :data="productData" v-if="!isEmpty" v-loading="isLoading">
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
              <span>{{ props.row.price }}元</span>
            </el-form-item>
            <el-form-item label="年化利率">
              <span>{{ props.row.num }}%</span>
            </el-form-item>
            <el-form-item label="产品期限">
              <span>{{ props.row.term }}天</span>
            </el-form-item>
            <el-form-item label="产品状态">
              <span>{{props.row.state }}</span>
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
      <el-table-column sortable label="产品单价" :sort-method="compare">
        <template slot-scope="scope">
          <span> {{ scope.row.price }}元 </span>
        </template>
      </el-table-column>
      <el-table-column sortable label="产品利率" :sort-method="compare">
        <template slot-scope="scope">
          <span> {{ scope.row.num }}% </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="startTime"
        label="秒杀开始时间"
      >
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
    <el-dialog title="产品编辑" :visible.sync="dialogFormVisible">
      <el-form
        :model="form"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="产品编号" prop="id">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品总数" prop="stock">
          <el-input-number
            :min="0"
            v-model="form.stock"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="限购数量" prop="limited">
          <el-input-number
            :min="1"
            v-model="form.limited"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品单价" prop="price">
          <el-input-number
            :min="0"
            v-model="form.price"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="年化利率" prop="num">
          <el-input-number
            :precision="2"
            :step="0.1"
            v-model="form.num"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品期限" prop="term">
          <el-input v-model="form.term" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品状态" prop="state">
          <el-select v-model="form.state" autocomplete="off">
            <el-option label="即将开始" value="即将开始" />
            <el-option label="正在进行" value="正在进行" />
            <el-option label="已经结束" value="已经结束" />
          </el-select>
        </el-form-item>
        <el-form-item label="秒杀开始时间" prop="startTime">
          <el-date-picker
            type="datetime"
            v-model="form.startTime"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀结束时间" prop="endTime">
          <el-date-picker
            type="datetime"
            v-model="form.endTime"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="起息日时间" prop="startTime">
          <el-date-picker
            type="datetime"
            v-model="form.startTime"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期日时间" prop="endTime">
          <el-date-picker
            type="datetime"
            v-model="form.endTime"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="风险等级" prop="risk">
          <el-select v-model="form.risk" autocomplete="off">
            <el-option label="低风险" value="low" />
            <el-option label="中风险" value="mid" />
            <el-option label="高风险" value="high" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
    var checkExample = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        callback(new Error("hello"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      currentRow: null,
      isPagination: false,
      isLoading: null,
      dialogFormVisible: false,
      form: {},

      // 设置输入检测
      rules: {
        region: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name: [{ validator: checkExample, trigger: "blur" }],
      },
    };
  },
  computed: {
    isEmpty() {
      if (!this.tableData && this.tableData.length != 0) {
        return true;
      }
      return false;
    },
    productData() {
      let temp=[];
      for (let i of this.tableData) {
        i.endTime = this.dateFormat(i.endTime);
        i.numTime = this.dateFormat(i.numTime);
        i.startTime = this.dateFormat(i.startTime)
        if(i.state==0){
          i.state='即将开始'
        }else if(i.state==1){
          i.state='已经结束'
        }else if(i.state==2){
          i.state='正在进行'
        }
        temp.unshift(i)
      }
      return temp
    },
  },
  methods: {
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    handleEdit(index) {
      this.dialogFormVisible = true;
      this.form = this.tableData[index];
    },
    filterHandler() {},
    formatState(value) {
      if (value == '即将开始') {
        return "warning";
      } else if (value == '正在进行') {
        return "before";
      } else if (value == '已经结束') {
        return "danger";
      } else {
        return "";
      }
    },
    compare(a, b) {
      return a - b;
    },
    timeSize2(value) {
      if (Number(value) < 0) {
        value = -value;
      }
      if (String(value).length < 2) {
        value = "0" + value;
      } else if (String(value).length > 2) {
        value = String(value).substr(0, 2);
      }
      return value;
    },
    dateFormat(value) {
      var time = new Date(value);
      return (
        time.getFullYear(1) +
        "-" +
        this.timeSize2(Number(time.getMonth()) + 1) +
        "-" +
        this.timeSize2(time.getDate()) +
        " " +
        this.timeSize2(time.getHours()) +
        ":" +
        this.timeSize2(time.getSeconds())
      );
    },
  },
  mounted() {
    this.isLoading = true;
    this.axios({
      method: "get",
      url: "/admin/item/deposit",
      params: {
        token: window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
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
.el-input {
  width: auto;
}
.el-form-item span {
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