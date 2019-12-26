<template>
    <div class="fillcontain">
      <div :src="'a'">
        <el-form :inline="true" ref="search_data" :model="search_data">
          <el-form-item style="opacity: 0" label="投标时间筛选:">
            <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
            <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item  style="opacity: 0">
            <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
          </el-form-item>
          <el-form-item class="btnRight">
            <el-button
              type="primary"
              size="small"
              icon="view"
              @click="onAddMoney()"
              v-if="user.identity =='manager'"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
        <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          max-height="700"
          border
          :default-sort="{prop: 'date', order: 'descending'}"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
          <el-table-column prop="date" label="创建时间" align="center" width="250" sortable>
            <template slot-scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thingname" label="鲜花名称" align="center" width="150"></el-table-column>
          <el-table-column label="鲜花图片" align="center" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.src"/>
            </template>
          </el-table-column>
          <el-table-column prop="thingnumber" label="鲜花数量" align="center" width="180"></el-table-column>
          <el-table-column prop="single" label="单价" align="center" width="170"></el-table-column>
          <el-table-column prop="expend" label="习性" align="center" width="220"></el-table-column>
          <el-table-column prop="operation" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="edit"
                size="small"
                @click="onBuy(scope.row)"
                v-if="user.identity !=='manager'"
              >购买</el-button>
              <el-button
                type="warning"
                icon="edit"
                size="small"
                @click="onEditMoney(scope.row)"
                v-if="user.identity =='manager'"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="delete"
                size="small"
                v-if="user.identity =='manager'"
                @click="onDeleteMoney(scope.row,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                v-if="paginations.total > 0"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page.sync="paginations.page_index"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 弹框页面 -->
      <DialogThing :dialog="dialog1" :form="form" @update="getthing"></DialogThing>
      <DialogFound :dialog="dialog2" :form="form"></DialogFound>
    </div>
  </template>
  
  <script>
  import DialogThing from "../components/DialogThing";
  import DialogFound from "../components/profile";
  export default {
    name: "things",
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        allthingmoney:'',
        tableData: [],
        allTableData: [],
        filterTableData: [],
        dialog1: {
          show: false,
          title: "",
          option: "edit"
        },
        dialog2: {
          show: false,
          title: "",
          option: "edit"
        },
        form: {
          thingname: "",
          thingnumber: "",
          single: "",
          allmoney:"",
          expend: "",
          id: ""
        },
        //需要给分页组件传的信息
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 10, // 1页显示多少条
          layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
        },
        search_data: {
          startTime: "",
          endTime: ""
        }
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
      
    },
    components: {
      DialogThing,
      DialogFound
    },
    created() {
      this.getthing();
      console.log('tag',this.allmoney)
    },
    methods: {
      getthing() {
        // 获取表格数据
        this.$axios("/api/things").then(res => {
          // this.tableData = res.data;
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        });
      },
      onEditMoney(row) {
        // 编辑
        this.dialog1 = {
          show: true,
          title: "修改鲜花信息",
          option: "edit"
        };
        this.form = {
          thingname: row.thingname,
          thingnumber: row.thingnumber,
          single: row.single,
          expend: row.expend,
          id: row._id
        };
      },
      onBuy(row) {
        // 编辑
        this.dialog2 = {
          show: true,
          title: "添加订单",
          option: "add"
        };
        this.form = {
          number: 1,
          thingname: row.thingname,
          thingnumber: row.thingnumber,
          single: row.single,
          expend: row.expend,
          id: row._id
        };
      },
      onDeleteMoney(row) {
        // 删除
        this.$axios.delete(`/api/things/delete/${row._id}`).then(() => {
          this.$message("删除成功");
          this.getthing();
        });
      },
      onAddMoney() {
        console.log('asf')
        // 添加
        this.dialog1 = {
          show: true,
          title: "添加鲜花信息",
          option: "add"
        };
        this.form = {
          thingname: "",
          thingnumber:"",
          single: "",
          expend:"",
          id: ""
        };
      },
      handleCurrentChange(page) {
        // 当前页
        let sortnum = this.paginations.page_size * (page - 1);
        let table = this.allTableData.filter((item, index) => {
          return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        });
      },
      setPaginations() {
        // 总页数
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 10;
        // 设置默认分页数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        });
        this.tableData.forEach((item)=>{
          item.src = require('@/assets/' + item.thingname + '.png')
        })
      },
      
    }
  };
  </script>
  <style scoped>
  .fillcontain {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
  .btnRight {
    float: right;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
  </style>