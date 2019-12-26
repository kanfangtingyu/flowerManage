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

          <el-form-item label="鲜花名称:">
            <p type="thingname">{{form.thingname}}</p>
          </el-form-item>

          <el-form-item label="剩余数量:">
            <p type="describe">{{form.thingnumber}}</p>
          </el-form-item>

          <el-form-item label="单价:">
            <p type="describe">{{form.single}}</p>
          </el-form-item>

          <el-form-item label="购买数量:">
            <el-input type="expend" v-model="form.number"></el-input>
          </el-form-item>

          <el-form-item label="总价:">
            <p>{{ form.number *  form.single}}</p>
          </el-form-item>

          <el-form-item label="送货地址:">
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
  mounted() {
    console.log(this.form)
  },
  
  data() {
    return {
      format_type_list: [
        "收货",
        "出售",
      ],
      form_rules: {
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
          console.log('fei',form)
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

