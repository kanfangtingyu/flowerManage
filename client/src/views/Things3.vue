<template>
    <div class="fillcontain">
      <div>
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
          max-height="450"
          border
          :default-sort="{prop: 'date', order: 'descending'}"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
          <el-table-column prop="name" label="概述" align="center" width="170"></el-table-column>
          <el-table-column prop="describe" label="详述" align="center"></el-table-column>
          <el-table-column prop="operation" align="center" label="操作" fixed="right">
            <template slot-scope="scope">
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
      <DialogThing :dialog="dialog" :form="form" @update="getthing"></DialogThing>
    </div>
  </template>
  
  <script>
  import DialogThing from "../components/DialogThing3";
  
  export default {
    name: "things",
    data() {
      return {
        allthingmoney:'',
        tableData: [],
        allTableData: [],
        filterTableData: [],
        dialog: {
          show: false,
          title: "",
          option: "edit"
        },
        form: {
          index: "",
          name: "",
          describe: "",
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
      DialogThing
    },
    created() {
      this.getthing();
    },
    methods: {
      getthing() {
        // 获取表格数据
        this.$axios("/api/things3").then(res => {
          // this.tableData = res.data;
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        });
      },
      onEditMoney(row) {
        // 编辑
        this.dialog = {
          show: true,
          title: "修改货物信息",
          option: "edit"
        };
        this.form = {
          index: row.index,
          name: row.name,
          describe: row.describe,
          id: row._id
        };
      },
      onDeleteMoney(row, index) {
        // 删除
        this.$axios.delete(`/api/things3/delete/${row._id}`).then(res => {
          this.$message("删除成功");
          this.getthing();
        });
      },
      onAddMoney() {
        console.log('asf')
        // 添加
        this.dialog = {
          show: true,
          title: "添加资金信息",
          option: "add"
        };
        this.form = {
          index: "",
          name:"",
          describe: "",
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