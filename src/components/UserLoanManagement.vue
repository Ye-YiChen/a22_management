<template>
  <el-main>
    <el-collapse accordion v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(data, index) in localProductData"
        :key="index"
        :name="index + 1"
      >
        <template slot="title">
          <ul class="table-title">
            <li><span>产品编号：</span>{{ data.id }}</li>
            <li><span>产品名称：</span>{{ data.name }}</li>
            <li :class="stateFormate(data.state, 0)">
              <span>产品状态：</span>{{ stateFormate(data.state, 1) }}
            </li>
            <li>
              <el-button
                v-if="stateFormate(data.state, 1) == '已经结束'"
                size="small"
                type="primary"
                round
                @click.stop="moreInfo(data)"
                >数据监控</el-button
              >
            </li>
          </ul>
        </template>
        <el-table
          :data="localUserData"
          v-if="!isEmpty"
          :stripe="true"
          @current-change="handleCurrentChange"
          @expand-change="handleExpandChange"
          max-height="650"
        >
          <el-table-column type="expand">
            <template :slot-scope="detailUserData">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- <el-form-item label="产品编号">
              <span>{{ props.row.name }}</span>
            </el-form-item> -->
                <el-form-item label="用户账号">
                  <span>{{ detailUserData.id }}</span>
                </el-form-item>
                <el-form-item label="用户名称">
                  <span>{{ detailUserData.name }}</span>
                </el-form-item>
                <el-form-item label="用户性别">
                  <span>{{ detailUserData ? "男" : "女" }}</span>
                </el-form-item>
                <el-form-item label="用户年龄">
                  <span>{{ detailUserData.age }}</span>
                </el-form-item>
                <el-form-item label="用户等级">
                  <span>{{ detailUserData.vip }}</span>
                </el-form-item>

                <el-form-item label="用户身份证">
                  <span>{{ detailUserData.idNum }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="userId" label="用户账号" width="">
          </el-table-column>
          <el-table-column prop="userName" label="用户名称" width="">
          </el-table-column>
          <el-table-column
            prop="flag"
            label="筛选"
            width="100"
            :filters="[
              { text: '有资格', value: '有资格' },
              { text: '无资格', value: '无资格' },
              { text: '成功购买', value: '成功购买' },
            ]"
            :filter-method="filterflag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.flag == '无资格' ? 'danger' : 'success'"
                disable-transitions
                >{{ scope.row.flag }}</el-tag
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
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      size="50%"
      :modal="false"
      :before-close="handleClose"
    >
      <div
        id="fan-chart"
        style="width: 100%; height: 278px; float: left"
        v-loading="loading"
      ></div>
    </el-drawer>
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
      detailUserData: [],
      localProductData: [],
      drawer: false,
      loading: true,
      fanChart: {
        chart: "",
        option: ["购买成功人数", "取消订单人数"],
        optionData: [
          { value: 13, name: "购买成功人数" },
          { value: 19, name: "取消订单人数" },
        ],
      },
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
        this.localProductData = response.data.data;
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
    handleClose() {
      console.log(1);
      this.drawer = false;
    },
    drawChart(product) {
      // 基于 准备好的DOM 开始画图
      this.fanChart.chart = this.$echarts.init(
        document.getElementById("fan-chart")
      );
      // 绘制图表
      this.fanChart.chart.setOption({
        title: {
          text: product.name, // 主标题
          subtext: "", // 副标题
          x: "center", // x轴对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: this.fanChart.option,
        },
        series: [
          {
            name: product.name,
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            data: this.fanChart.optionData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0,0,0,0.5)",
              },
              // color() {
              //   // 自定义颜色
              //   let colorList = ["red", "#a1b394"];
              //   return colorList[params.dataIndex];
              // },
            },
          },
        ],
      });
    },
    moreInfo(product) {
      this.drawer = true;
      this.loading = true;
      this.axios({
        method: "get",
        url: "/admin/item/statistics",
        params: {
          token: window.sessionStorage.getItem("token"),
          itemId: product.id,
        },
      }).then((response) => {
        if (response.data.status != 0) {
          this.MessageBox.alert(response.data.data.message);
          return;
        } else {
          this.fanChart.optionData[0].value = response.data.data.success;
          this.fanChart.optionData[1].value = response.data.data.fail;
          this.loading = false;
        }
      });
      this.$nextTick(() => {
        this.drawChart(product);
      });
    },

    stateFormate(val, state) {
      // val 0 未开始 1 正在进行 2 时间截止 3商品售罄
      // state 0 查询 类名 ；1 查询 字符显示
      if (state == 0) {
        if (val == 0) {
          return "warning";
        } else if (val == 1) {
          return "success";
        } else {
          return "danger";
        }
      } else {
        if (val == 0) {
          return "尚未开始";
        } else if (val == 1) {
          return "正在进行";
        } else {
          return "已经结束";
        }
      }
    },
    handleExpandChange(data) {
      this.detailUserData = {};
      this.axios({
        method: "post",
        url: "/admin/user/info",
        params: {
          token: window.sessionStorage.getItem("token"),
          userId: data.userId,
        },
      })
        .then((response) => {
          if (response.data.status != 0) {
            this.MessageBox.alert(response.data.data.message);
            return;
          }
          console.log(response);
          this.detailUserData = response.data.data;
          if (this.detailUserData.vip == 0) {
            this.detailUserData.vip = "大众会员";
          } else if (this.detailUserData.vip == 1) {
            this.detailUserData.vip = "黄金会员";
          } else if (this.detailUserData.vip == 2) {
            this.detailUserData.vip = "白金会员";
          } else {
            this.detailUserData.vip = "钻石会员";
          }
        })
        .catch((err) => {
          this.MessageBox.alert(err.message);
        });
    },
    filterflag(value, row) {
      return row.flag === value;
    },
    handleChange(val) {
      // 展开 最外层数据 this.activeNames 时触发
      console.log(val);
      this.localUserData = [];
    },
    handleCurrentChange(val) {
      // 点击 某条具体数据时触发
      console.log(2);
      this.currentRow = val;
    },
  },
  watch: {
    searchText(newValue) {
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
      handler(newValue) {
        if (newValue == 0) {
          return;
        }
        let index = newValue - 1;
        // 0 未开始 1 正在进行 2 时间截止 3商品售罄
        // 如果商品未结束 显示 资格 请求路径
        if (
          this.localProductData[index].state == 0 ||
          this.localProductData[index].state == 1
        ) {
          // 在这里请求具体数据 flag 0 cg  1 sb
          this.axios({
            method: "post",
            url: "/admin/item/user",
            params: {
              token: window.sessionStorage.getItem("token"),
              // itemId:23
              itemId: this.localProductData[index].id,
            },
          }).then((response) => {
            console.log(response);
            setTimeout(() => {
              this.localUserData = response.data.data;
              for (let i of this.localUserData) {
                if (i.flag == "0") {
                  i.flag = "有资格";
                } else {
                  i.flag = "无资格";
                }
              }
            }, 200);
          });
        }
        // 否则显示 是否购买请求路径
        else {
          this.axios({
            method: "post",
            url: "/admin/item/user/success",
            params: {
              token: window.sessionStorage.getItem("token"),
              // itemId:23
              itemId: this.localProductData[index].id,
            },
          }).then((response) => {
            if (response.data.status != 0) {
              this.MessageBox.alert(response.data.data.message);
              return;
            }
            console.log(response);
            setTimeout(() => {
              this.localUserData = response.data.data;
              // userName
              for (let i of this.localUserData) {
                i.userName = i.name;
              }
              for (let i of this.localUserData) {
                i.flag = "成功购买";
              }
            }, 200);
          });
        }
      },
    },
  },
};
</script>

<style scoped>
ul {
  width: 100%;
  text-decoration: none;
  list-style: none;
  padding: 0;
  font-weight: 700;
  font-size: 15px;
  color: #909399;
}
li {
  flex: 1;
  text-align: left;
  padding-left: 60px;

  /* 1. 先强制一行内显示文本 */
  white-space: nowrap;
  /*(默认normal自动换行)*/
  /* 2. 超出部分隐藏 */
  overflow: hidden;
  /* 3.文字用省略号替代超出部分 */
  text-overflow: ellipsis;
}
li > span {
  font-weight: 400;
  font-size: 15px;
}
.table-title {
  display: flex;
  justify-content: space-around;
}
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