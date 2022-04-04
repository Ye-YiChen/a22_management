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
              <span>{{ dateFormat(props.row.startTime) }}</span>
            </el-form-item>
            <el-form-item label="秒杀结束时间">
              <span>{{ dateFormat(props.row.endTime) }}</span>
            </el-form-item>
            <el-form-item label="起息日时间">
              <span>{{ dateFormat(props.row.numTime) }}</span>
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
      <el-table-column sortable label="秒杀开始时间">
        <template slot-scope="scope">
          <span> {{ dateFormat(scope.row.startTime) }} </span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="state" label="产品状态">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="formatState(scope.row.state)">
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" sortable label="规则配置">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            round
            plain
            :disabled="scope.row.state == '已经结束' ? true : false"
            @click="ruleEdit(scope.$index, scope.row, scope.row.state)"
            >配置规则</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="medium"
            circle
            type="info"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="medium"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="产品编辑" :visible.sync="dialogFormVisible1" width="50%">
      <el-form
        :model="form"
        label-width="150px"
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
            v-model.number="form.stock"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="限购数量" prop="limited">
          <el-input-number
            :min="1"
            v-model.number="form.limited"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品单价 (元)" prop="price">
          <el-input-number
            :min="0"
            v-model.number="form.price"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="年化利率 (%)" prop="num">
          <el-input-number
            :precision="2"
            :step="0.1"
            :min="0.0"
            v-model.number="form.num"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="产品期限 (天)" prop="term">
          <el-input-number
            :min="0"
            v-model.number="form.term"
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
            <el-option label="低风险" value="低风险" />
            <el-option label="中风险" value="中风险" />
            <el-option label="高风险" value="高风险" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmEditInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="产品新增" :visible.sync="dialogFormVisible2">
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
            <el-option label="低风险" value="低风险" />
            <el-option label="中风险" value="中风险" />
            <el-option label="高风险" value="高风险" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmAddInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="规则配置" :visible.sync="dialogFormVisible3">
      <el-form
        :model="ruleForm"
        label-width="150px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="模板选择" prop="template">
          <el-select v-model="ruleForm.template" placeholder="请选择">
            <el-option
              v-for="template in templateData"
              :label="template.templateName"
              :value="template.id"
              :key="template.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 这里是一个 年龄选择器 可能后来话需要 -->
        <el-form-item label="年龄（岁）" prop="age">
          <el-input-number
            :min="0"
            :step="1"
            v-model="ruleForm.age"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="2">不限</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader
            size="small"
            :options="options"
            v-model="ruleForm.area"
            @change="handleChange(0)"
            multiple
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="现有资产（万元）" prop="money">
          <span style="margin-right: 10px">不低于 </span>

          <el-input-number
            :min="0"
            :precision="2"
            :step="0.01"
            v-model="ruleForm.money"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="VIP" prop="vip">
          <span style="margin-right: 10px">不低于 </span>
          <el-select v-model="ruleForm.vip" placeholder="请选择" size="small">
            <el-option label="大众会员" value="0"> </el-option>
            <el-option label="黄金会员" value="1"></el-option>
            <el-option label="白金会员" value="2"> </el-option>
            <el-option label="钻石会员" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-select v-model="ruleForm.job" placeholder="请选择" size="small">
            <el-option label="不限" value="不限"> </el-option>
            <el-option label="无业" value="无业"> </el-option>
            <el-option label="学生" value="学生"></el-option>
            <el-option label="老师" value="老师"> </el-option>
            <el-option label="农民" value="农民"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="职业" prop="job">
          <el-checkbox v-model="checked">保存为模板</el-checkbox>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRuleInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmRuleInfo()">确 定</el-button>
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
// Vue.use(Cascader)
import {
  regionDataPlus,
  // CodeToText,
  // TextToCode,
} from "element-china-area-data";
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
      tableData: [], // 直接获取的数据
      productData: [], // 处理后展示的数据
      ruleData: [], // 规则数据
      currentRow: null, //
      isPagination: false,
      isLoading: null,
      dialogFormVisible1: false, // 产品编辑
      dialogFormVisible2: false, // 产品新增
      dialogFormVisible3: false, // 规则配置
      dialogFormVisible4: false, // 新增规则
      templateData: [],
      editIndex: null,
      editInfo: null,
      ruleForm: {
        template: "",
        // 0 女生 1男生 2 不限
        sex: 2,
        vip: "",
        age: "",
        area: [],
        job: "",
        money: "",
      },
      form: {},
      options: [...regionDataPlus],
      templateForm: {},
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
          // min: 1,
          trigger: "blur",
        },
        price: {
          required: true,
          message: "请输入产品单价",
          // min: 1,
          trigger: "blur",
        },
        num: {
          required: true,
          message: "请输入年化利率",
          // min: 0.01,
          trigger: "blur",
        },
        term: {
          required: true,
          message: "请输入产品期限",
          // min: 1,
          trigger: "blur",
        },
        // state: { message: "请输入产品总数", min: 1, trigger: "blur" },
        startTime: {
          validator: checkDate,
          required: true,
          // min: 1,
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
    areaCodeChange(code) {
      code = String(code);
      if (code == "") return [""];
      let s1 = code.substr(0, 2),
        s2 = code.substr(2, 2),
        s3 = code.substr(4, 2);
      if (s2 == "00") {
        return [code, ""];
      }
      if (s3 == "00") {
        return [s1 + "0000", s1 + s2 + "00", ""];
      }
      return [s1 + "0000", s1 + s2 + "00", s1 + s2 + s3];
    },
    emptyRuleForm() {
      this.ruleForm = {
        vip: "",
        age: "",
        area: [],
        job: "",
        money: "",
      };
    },
    handleChange(value) {
      // 0 修改rule 1 修改template
      if (this.ruleForm.area && value == 0) {
        if (this.ruleForm.area[this.ruleForm.area.length - 1] != "")
          this.ruleForm.area =
            this.ruleForm.area[this.ruleForm.area.length - 1];
        else if (this.ruleForm.area[this.ruleForm.area.length - 2] != "")
          this.ruleForm.area =
            this.ruleForm.area[this.ruleForm.area.length - 2];
        else if (this.ruleForm.area[this.ruleForm.area.length - 3] != "")
          this.ruleForm.area =
            this.ruleForm.area[this.ruleForm.area.length - 3];
      } else this.ruleForm.area = "";
      console.log(this.ruleForm.area);
      if (this.templateForm.area && value == 1) {
        if (this.templateForm.area[this.templateForm.area.length - 1] != "")
          this.templateForm.area =
            this.templateForm.area[this.templateForm.area.length - 1];
        else if (
          this.templateForm.area[this.templateForm.area.length - 2] != ""
        )
          this.templateForm.area =
            this.templateForm.area[this.templateForm.area.length - 2];
        else if (
          this.templateForm.area[this.templateForm.area.length - 3] != ""
        )
          this.templateForm.area =
            this.templateForm.area[this.templateForm.area.length - 3];
      } else this.templateForm.area = "";
    },
    ruleEdit(index, info) {
      // 数据回显
      this.editInfo = info;
      this.axios({
        method: "get",
        url: "/admin/rule/template/",
        params: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.data == null) {
            this.dialogFormVisible3 = true;
            return;
          }
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            this.templateData = response.data.data;
            this.dialogFormVisible3 = true;
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
      this.axios({
        method: "get",
        url: "admin/item/rule/select",
        params: {
          token: window.sessionStorage.getItem("token"),
          itemId: info.id,
        },
      })
        .then((response) => {
          if (response.data.data == null) {
            this.emptyRuleForm();
            this.dialogFormVisible3 = true;
            return;
          }
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            this.ruleForm = response.data.data;
            this.ruleForm.money = response.data.data.money / 10000;
            if (this.ruleForm.vip == 0) {
              this.ruleForm.vip = "大众会员";
            } else if (this.ruleForm.vip == 1) {
              this.ruleForm.vip = "黄金会员";
            } else if (this.ruleForm.vip == 2) {
              this.ruleForm.vip = "白金会员";
            } else {
              this.ruleForm.vip = "钻石会员";
            }

            this.ruleForm.area = this.areaCodeChange(this.ruleForm.area);
            this.dialogFormVisible3 = true;
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    cancelRuleInfo() {
      this.dialogFormVisible3 = false;
      this.emptyRuleForm();
    },
    confirmRuleInfo() {
      if (typeof this.ruleForm.area != "string") {
        this.ruleForm.area = this.ruleForm.area[this.ruleForm.area.length - 1];
      }
      let vip = 0;
      if (this.ruleForm.vip == "黄金会员") {
        vip = 1;
      }
      if (this.ruleForm.vip == "白金会员") {
        vip = 2;
      }
      if (this.ruleForm.vip == "钻石会员") {
        vip = 3;
      }
      this.axios({
        method: "get",
        url: "/admin/item/rule/config",
        params: {
          token: window.sessionStorage.getItem("token"),
          itemId: this.editInfo.id,
          itemName: this.editInfo.name,
          ...this.ruleForm,
          money: this.ruleForm.money * 10000,
          vip,
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            this.MessageBox.alert("配置成功！");
            console.log(1);
            this.emptyRuleForm();
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    addProduct() {
      this.form = {
        flag: 1,
        state: "即将开始",
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
          numTime: null,
          numTime1: this.dayjs(this.form.numTime).format("YYYY-MM-DD HH:mm:ss"),
          startTime: null,
          startTime1: this.dayjs(this.form.startTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          endTime: null,
          endTime1: this.dayjs(this.form.endTime).format("YYYY-MM-DD HH:mm:ss"),
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data);
            return false;
          } else {
            this.MessageBox.alert("修改成功！");
            this.dialogFormVisible1 = false;
            // this.productData.splice(this.editIndex, 1);
            // this.tableData.splice(this.editIndex, 1);
            // this.productData[this.editIndex] = this.form;
            this.$set(this.productData, this.editIndex, this.form);
            this.productData[this.editIndex].startTime = this.dateFormat(
              this.form.startTime
            );
            this.tableData[this.editIndex] = {
              ...this.form,
              state:
                this.form.state == "即将开始"
                  ? 0
                  : this.form.state == "已经结束"
                  ? 1
                  : 2,
            };
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
          numTime: null,
          numTime1: this.dayjs(this.form.numTime).format("YYYY-MM-DD HH:mm:ss"),
          startTime: null,
          startTime1: this.dayjs(this.form.startTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          endTime: null,
          endTime1: this.dayjs(this.form.endTime).format("YYYY-MM-DD HH:mm:ss"),
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
            console.log(this.form);
            this.productData.unshift(this.form);
            this.tableData.unshift(this.form);
            this.tableData[0] = {
              state:
                this.form.state == "即将开始"
                  ? 0
                  : this.form.state == "已经结束"
                  ? 1
                  : 2,
            };
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
    document.getElementsByTagName("html")[0].style.overflowY = "auto";
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
          this.tableData.sort((a, b) => {
            return b.state - a.state;
          });
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
    /* this.axios({
      method:'post',
      url: requestUrl,
      data: {
        id:requestUrl
      }
    }) */
  },
  watch: {
    "ruleForm.template"(newValue) {
      console.log();
      console.log(newValue);
      for (let i of this.templateData) {
        if (i.id == newValue) {
          let vip = "大众会员";
          if (i.vip == 1) vip = "黄金会员";
          else if (i.vip == 2) vip = "白金会员";
          else if (i.vip == 3) vip = "钻石会员";

          this.ruleForm = {
            ...i,
            template: i.id,
            vip,
            money: i.money / 10000,
          };
        }
      }
    },
  },
};
</script>

<style >
.el-select {
  width: 120px;
  margin-right: 10px;
}
.el-checkbox-button {
  padding: 0;
}
.el-cascader-menu {
  height: 300px;
}
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
.el-form-item__content {
  margin: 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>