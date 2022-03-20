<template>
  <el-main>
    <el-button round type="primary" class="right" @click="addProduct()"
      >新增产品</el-button
    >
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
            <el-form-item label="产品类型">
              <span>{{ props.row.flag ? "贷款" : "存款" }}</span>
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
              <span>{{ props.row.state }}</span>
            </el-form-item>
            <el-form-item label="秒杀开始时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="秒杀结束时间">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <el-form-item label="起息日时间">
              <span>{{ props.row.numTime }}</span>
            </el-form-item>
            <el-form-item label="到期日时间">
              <span>{{
                dateFormat(MoneyTime(props.row.numTime, props.row.term))
              }}</span>
            </el-form-item>
            <el-form-item label="风险等级">
              <span>{{ props.row.risk }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="产品名称"> </el-table-column>
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
    <el-dialog title="产品编辑" :visible.sync="dialogFormVisible1">
      <el-form
        :model="form"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="产品编号" prop="id">
          <span>{{ form.id }}</span>
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
        <el-form-item label="产品单价 (元)" prop="price">
          <el-input-number
            :min="0"
            v-model="form.price"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="年化利率 (%)" prop="num">
          <el-input-number
            :precision="2"
            :step="0.1"
            :min="0.0"
            v-model="form.num"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品期限 (天)" prop="term">
          <el-input-number
            :min="0"
            v-model="form.term"
            autocomplete="off"
          ></el-input-number>
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
        <el-form-item label="起息日时间" prop="numTime">
          <el-date-picker
            type="datetime"
            v-model="form.numTime"
            autocomplete="off"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期日时间" prop="numTime">
          <!-- <el-date-picker
            type="datetime"
            v-model="form.endTime"
            autocomplete="off"
          ></el-date-picker> -->
          <span>{{ dateFormat(MoneyTime(form.numTime, form.term)) }}</span>
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
        <el-button @click="cancelEditInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmEditInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增产品" :visible.sync="dialogFormVisible2">
      <el-form
        :model="form"
        label-width="150px"
        label-position="left"
        :rules="rules"
      >
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
        <el-form-item label="产品单价 (元)" prop="price">
          <el-input-number
            :min="0"
            v-model="form.price"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="年化利率 (%)" prop="num">
          <el-input-number
            :precision="2"
            :min="0"
            :step="0.1"
            v-model="form.num"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品期限 (天)" prop="term">
          <el-input-number
            v-model="form.term"
            :min="0"
            autocomplete="off"
          ></el-input-number>
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
        <el-form-item label="起息日时间" prop="numTime">
          <el-date-picker
            type="datetime"
            v-model="form.numTime"
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
        <el-button @click="cancelAddInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmAddInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页器 -->
    <el-pagination
      :hide-on-single-page="true"
      background
      layout="prev, pager, next"
      :total="1"
    >
    </el-pagination>
  </el-main>
</template>

<script>
// import { MessageBox } from "element-ui";
export default {
  data() {
    var checkExample = (rule, value, callback) => {
      // console.log(value);
      if (!value) {
        callback(new Error("请输入产品名称"));
      } else {
        callback();
      }
    };
    var checkDate = (rule, value, callback) => {
      let dateTime = new Date();
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      if (!value) {
        callback(new Error("请选择时间"));
      } else if (new Date(value) < new Date(dateTime)) {
        callback(new Error("时间请至少提前一天"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      productData: [],
      currentRow: null,
      isPagination: false,
      isLoading: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form: {},
      editIndex: null,
      // 设置输入检测
      rules: {
        name: [{ validator: checkExample, required: true, trigger: "blur" }],
        stock: {
          required: true,
          message: "请输入产品总数",
          trigger: "blur",
        },
        limited: {
          required: true,
          message: "请输入限购数量",
          min: 1,
          trigger: "blur",
        },
        price: {
          required: true,
          message: "请输入产品单价",
          min: 1,
          trigger: "blur",
        },
        num: {
          required: true,
          message: "请输入年化利率",
          min: 0.01,
          trigger: "blur",
        },
        term: {
          required: true,
          message: "请输入产品期限",
          min: 1,
          trigger: "blur",
        },
        // state: { message: "请输入产品总数", min: 1, trigger: "blur" },
        startTime: {
          validator: checkDate,
          required: true,
          min: 1,
          trigger: "blur",
        },
        endTime: {
          required: true,
          validator: checkDate,
          // message: "请输入起息日时间",
          trigger: "blur",
        },
        numTime: {
          required: true,
          validator: checkDate,
          // message: "请输入起息日时间",
          trigger: "blur",
        },
        risk: {
          required: true,
          message: "请选择风险等级",
          trigger: "blur",
        },
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
  },
  methods: {
    addProduct() {
      this.form = {
        flag: 1,
        state: 0,
      };
      this.dialogFormVisible2 = true;
    },
    MoneyTime(value, add) {
      let time = new Date(value);
      // console.log(time);
      return time.setDate(time.getDate() + Number(add));
    },
    handleDelete(index, info) {
      this.axios({
        method: "get",
        url: "/admin/item/delete",
        params: {
          id: info.id,
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            this.tableData.splice(index, 1);
            this.productData.splice(index, 1);
            this.MessageBox.alert("删除成功！");
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    handleEdit(index) {
      this.dialogFormVisible1 = true;
      this.editIndex = index;
      this.form = {
        ...this.productData[index],
      };
    },
    cancelEditInfo() {
      // console.log(this.form);

      this.dialogFormVisible1 = false;
      // 这里这样写 是为了深拷贝
      /* for (let i in this.tableData[this.editIndex]) {
        // console.log(i);
        this.productData[this.editIndex][i] = this.tableData[this.editIndex][i];
      } */
      // 高端写法
      this.productData[this.editIndex] = { ...this.tableData[this.editIndex] };
    },
    confirmEditInfo() {
      this.axios({
        method: "get",
        url: "admin/item/update",
        params: {
          token: window.sessionStorage.getItem("token"),
          ...this.form,
          state:
            this.form.state == "即将开始"
              ? 0
              : this.form.state == "已经结束"
              ? 1
              : 2,
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
            return false;
          } else {
            this.MessageBox.alert("修改成功！");
            this.dialogFormVisible1 = false;
            this.productData.splice(this.editIndex, 1);
            this.tableData.splice(this.editIndex, 1);
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    cancelAddInfo() {
      this.dialogFormVisible2 = false;
    },
    confirmAddInfo() {
      // console.log(new Date(this.form.numTime).format());
      this.axios({
        method: "get",
        url: "admin/item/add",
        params: {
          token: window.sessionStorage.getItem("token"),
          ...this.form,
          state:
            this.form.state == "即将开始"
              ? 0
              : this.form.state == "已经结束"
              ? 1
              : 2,
          numTime: this.dayjs(this.form.numTime).format('YYYY-MM-DD HH:mm:ss'),
          startTime: this.dayjs(this.form.startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: this.dayjs(this.form.endTime).format('YYYY-MM-DD HH:mm:ss'),
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            if (response.data.data.message) {
              this.MessageBox.alert(response.data.data.message);
            } else {
              this.MessageBox.alert(response.data.data);
            }

            return false;
          } else {
            this.MessageBox.alert("添加成功！");
            this.dialogFormVisible2 = false;
            this.productData.unshift(this.form);
            this.tableData.unshift(this.form);
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    filterHandler() {},
    formatState(value) {
      if (value == "即将开始") {
        return "warning";
      } else if (value == "正在进行") {
        return "success";
      } else if (value == "已经结束") {
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
      url: "/admin/item/loan",
      params: {
        token: window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log(response);
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.data.message);
        } else {
          this.tableData = response.data.data;
          let temp = [];
          for (let i of this.tableData) {
            i.endTime = this.dateFormat(i.endTime);
            i.numTime = this.dateFormat(i.numTime);
            i.startTime = this.dateFormat(i.startTime);
            if (i.state == 0) {
              i.state = "即将开始";
            } else if (i.state == 1) {
              i.state = "已经结束";
            } else if (i.state == 2) {
              i.state = "正在进行";
            }
            temp.unshift(i);
          }
          this.productData = temp;
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
.right {
  float: right;
}
.el-input {
  width: auto;
}
.el-form-item span {
  font-weight: 700;
  padding-left: 8px;
}
.el-form-item__label {
  width: 200px;
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