<template>
    <div class="logFund">
      <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.show"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal-append-to-body="false"
      >
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            :rules="form_rules"
            label-width="120px"
            style="margin:10px;width:auto;"
          >
            
  
            <el-form-item prop="name" label="概述:">
              <el-input type="name" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item prop="describe" label="详述:">
              <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>
  
            <el-form-item class="text_right">
              <el-button @click="dialog.show = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "logfound",
    props: {
      dialog: Object,
      form: Object
    },
    data() {
      return {
        form_rules: {
        }
      };
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            //表单数据验证完成之后，提交数据;
            const url = this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
            this.$axios.post(`/api/things3/${url}`, this.form).then(res => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.dialog.show = false;
              this.$emit("update");
            });
          }
        });
      }
    }
  };
  </script>
  
  