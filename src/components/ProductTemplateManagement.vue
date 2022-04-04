<template>
  <el-main>
    <el-button round type="primary" class="right" @click="addTemplate()"
      >新增规则</el-button
    >
    <el-table :data="templateData" v-if="!isEmpty" v-loading="isLoading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="规则编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="规则名称">
              <span>{{ props.row.templateName }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.age }} 岁</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex == 0 ? "女" : "男" }}</span>
            </el-form-item>
            <el-form-item label="地区">
              <span>{{ CodeToText(areaCodeChange(props.row.area)) }}</span>
            </el-form-item>
            <el-form-item label="现有资产">
              <span>{{ props.row.money }}元</span>
            </el-form-item>
            <el-form-item label="VIP">
              <span>{{ props.row.vip }}</span>
            </el-form-item>
            <el-form-item label="职业">
              <span>{{ props.row.job }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="规则编号"> </el-table-column>
      <el-table-column label="规则名称">
        <template slot-scope="scope">
          <span> {{ scope.row.templateName }} </span>
        </template>
      </el-table-column>
      <el-table-column sortable label="性别" :sort-method="compare">
        <template slot-scope="scope">
          <span> {{ scope.row.sex == 0 ? "女" : "男" }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column sortable label="地区">
        <template slot-scope="scope">
          <span> {{ CodeToText(areaCodeChange(scope.row.area)) }} </span>
        </template>
      </el-table-column> -->
      <el-table-column prop="vip" label="VIP"> </el-table-column>

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
    <el-dialog title="规则配置" :visible.sync="dialogFormVisible3">
      <el-form :model="templateForm" label-width="150px" label-position="left">
        <!-- 这里是一个 年龄选择器 可能后来话需要 -->

        <el-form-item label="模板名称" prop="name">
          <el-input
            v-model="templateForm.templateName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄（岁）" prop="age">
          <el-input-number
            :min="0"
            :precision="0"
            :step="1"
            v-model="templateForm.age"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="templateForm.sex">
            <el-radio :label="2">不限</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader
            size="small"
            :options="options"
            v-model="templateForm.area"
            @change="handleChange"
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
            v-model="templateForm.money"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="VIP" prop="vip">
          <span style="margin-right: 10px">不低于 </span>
          <el-select
            v-model="templateForm.vip"
            placeholder="请选择"
            size="small"
          >
            <el-option label="大众会员" value="0"> </el-option>
            <el-option label="黄金会员" value="1"></el-option>
            <el-option label="白金会员" value="2"> </el-option>
            <el-option label="钻石会员" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-select
            v-model="templateForm.job"
            placeholder="请选择"
            size="small"
          >
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
        <el-button @click="cancelTemplateEdit()">取 消</el-button>
        <el-button type="primary" @click="confirmTemplateEdit()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="新增规则" :visible.sync="dialogFormVisible4">
      <el-form :model="templateForm" label-width="150px" label-position="left">
        <el-form-item label="模板名称" prop="name">
          <el-input
            v-model="templateForm.templateName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄（岁）" prop="age">
          <el-input-number
            :min="0"
            :precision="0"
            :step="1"
            v-model="templateForm.age"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="templateForm.sex">
            <el-radio :label="2">不限</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <el-cascader
            size="small"
            :options="options"
            v-model="templateForm.area"
            @change="handleChange"
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
            v-model="templateForm.money"
            autocomplete="off"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="VIP" prop="vip">
          <span style="margin-right: 10px">不低于 </span>
          <el-select
            v-model="templateForm.vip"
            placeholder="请选择"
            size="small"
          >
            <el-option label="大众会员" value="0"></el-option>
            <el-option label="黄金会员" value="1"></el-option>
            <el-option label="白金会员" value="2"></el-option>
            <el-option label="钻石会员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-select
            v-model="templateForm.job"
            placeholder="请选择"
            size="small"
          >
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
        <el-button @click="cancelTemplateInfo()">取 消</el-button>
        <el-button type="primary" @click="confirmTemplateInfo(index)"
          >确 定</el-button
        >
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
import { regionDataPlus, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      tableData: [], // 直接获取的数据
      currentRow: null, //
      isPagination: false,
      isLoading: false,
      dialogFormVisible3: false, // 规则配置
      dialogFormVisible4: false, // 新增规则
      templateData: [],
      editIndex: null,
      editInfo: null,
      options: [...regionDataPlus],
      templateForm: {
        template: "",
        // 0 女生 1男生 2 不限
        sex: 2,
        vip: "",
        age: "",
        area: [],
        job: "",
        money: "",
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
    emptytemplateForm() {
      this.templateForm = {
        template: "",
        // 0 女生 1男生 2 不限
        sex: 2,
        vip: "",
        age: "",
        area: [],
        job: "",
        money: "",
      };
    },
    CodeToText(data) {
      let doc = CodeToText[data[0]] + CodeToText[data[1]] + CodeToText[data[2]];
      //   console.log(doc);
      //   console.log(data);
      //   console.log(CodeToText[data[2]]);
      //   for (let i of data) {
      //     console.log(CodeToText[i]);
      //     doc += CodeToText[i];
      //   }
      return doc;
    },
    cancelTemplateInfo() {
      this.templateForm = {
        area: [],
      };
      this.dialogFormVisible4 = false; // 新增规则
    },
    confirmTemplateInfo() {
      this.axios({
        method: "get",
        url: "/admin/rule/template/add",
        params: {
          ...this.templateForm,
          money: this.templateForm.money * 10000,
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            this.MessageBox.alert("模板添加成功！");
            // 在这里刷新
            this.axios({
              method: "get",
              url: "/admin/rule/template",
              params: {
                token: window.sessionStorage.getItem("token"),
              },
            })
              .then((response) => {
                if (response.data.status != 0) {
                  this.MessageBox.alert(response.data.data.message);
                } else {
                  this.tableData = response.data.data;
                  this.tableData.sort((a, b) => {
                    return b.state - a.state;
                  });
                  this.templateData = this.tableData;
                  for (let i of this.templateData) {
                    if (i.vip == 0) {
                      i.vip = "大众会员";
                    } else if (i.vip == 1) {
                      i.vip = "黄金会员";
                    } else if (i.vip == 2) {
                      i.vip = "白金会员";
                    } else {
                      i.vip = "钻石会员";
                    }
                  }
                }
                this.isLoading = false;
              })
              .catch((err) => {
                this.tableData = [];
                this.MessageBox.alert(err.message);
                this.isLoading = false;

                return false;
              });
            this.emptytemplateForm();
            this.dialogFormVisible4 = false; // 新增规则
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
          this.dialogFormVisible4 = false; // 新增规则
        });
    },
    addTemplate() {
      this.dialogFormVisible4 = true; // 新增规则
    },
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
    handleChange() {
      if (this.templateForm.area) {
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
      console.log(this.templateForm.area);
    },
    handleDelete(index, info) {
      this.axios({
        method: "get",
        url: "/admin/rule/template/delete",
        params: {
          id: info.id,
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
          } else {
            // this.tableData.splice(index, 1);
            this.templateData.splice(index, 1);
            this.MessageBox.alert("删除成功！");
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    handleEdit(index, info) {
      this.dialogFormVisible3 = true;
      this.templateForm = { ...info };
      console.log(this.templateForm);
      this.templateForm.money = info.money / 10000;
    },
    cancelTemplateEdit() {
      this.emptytemplateForm();
    },
    confirmTemplateEdit() {
      let vip = "0";
      if (this.templateForm == "黄金会员") {
        vip = "1";
      } else if (this.templateForm == "白金会员") {
        vip = "2";
      } else if (this.templateForm == "钻石会员") {
        vip = "3";
      }

      this.axios({
        method: "get",
        url: "/admin/rule/template/update",
        params: {
          token: window.sessionStorage.getItem("token"),
          ...this.templateForm,
          money: this.templateForm.money * 10000,
          vip,
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data);
          } else {
            this.MessageBox.alert("修改成功！");
            for (let i = 0; i < this.templateData.length; i++) {
              if (this.templateData[i].id == this.templateForm.id) {
                this.$set(this.templateData, i, {
                  ...this.templateForm,
                  money: this.templateForm.money * 10000,
                });
              }
            }
            // this.templateData = this.templateForm;
            this.dialogFormVisible3 = false;
          }
        })
        .catch((err) => {
          this.tableData = [];
          this.MessageBox.alert(err.message);
          this.isLoading = false;
          this.dialogFormVisible3 = false;

          return false;
        });
    },
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
      url: "/admin/rule/template",
      params: {
        token: window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.data.message);
        } else {
          this.tableData = response.data.data;
          this.tableData.sort((a, b) => {
            return b.state - a.state;
          });
          this.templateData = this.tableData;
          for (let i of this.templateData) {
            if (i.vip == 0) {
              i.vip = "大众会员";
            } else if (i.vip == 1) {
              i.vip = "黄金会员";
            } else if (i.vip == 2) {
              i.vip = "白金会员";
            } else {
              i.vip = "钻石会员";
            }
          }
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
  watch: {},
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