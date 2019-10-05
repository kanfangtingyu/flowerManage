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
          <el-form-item label="收支类型:">
            <el-select v-model="form.type" placeholder="收支类型">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="describe" label="收支描述:">
            <el-input type="describe" v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="form.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="form.expend"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="messageBox">提 交</el-button>
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
      format_type_list: [
        "收货",
        "出售",
      ],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { trigger: "blur" }
        ],
        expend: [
          { trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    messageBox() {
      let that = this
      const title = '确认'
      const message =
        '确认提交？'
      this.$Message.confirm(title, message, function(result) {
        if (result) {
          that.onSubmit('form')
        }
      })
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.form.id}`;
          this.$axios.post(`/api/profile/${url}`, this.form).then(res => {
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

