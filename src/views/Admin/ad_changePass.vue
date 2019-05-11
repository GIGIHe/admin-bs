<template>
  <div class="c_w">
    <div class="chagePassword">
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="原密码"
          prop="pass"
        >
          <el-input
            type="password"
            class="input"
            v-model="form.pass"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="form.password"
            type="password"
            class="input"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >提交</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      }else {
        callback();
      }
    };
    return {
      form: {
        pass: "",
        password: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods:{
    onSubmit(){
      let id = this.userInfo._id
      this.$axios.patch(`/admin/adpass/${id}`,{password:this.form.password,oldpassword:this.form.pass}).then(res=>{
        if(res.code == 200){
          this.$message({
            type:"success",
            message:"修改成功，请重新登录！"
          })
          setTimeout(() => {
            this.$router.push("/")
          }, 1000);
        }else{
          this.$message({
            type:"success",
            message:res.msg
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.c_w{
// position: relative;
}
.chagePassword {
  width: 400px;
  height: 248px;
  border-radius: 10px;
  box-sizing: border-box;
  padding-top: 35px;
  padding-right: 53px;
  border: 1px solid #ddd;
  // background: rgba(56, 128, 146, 0.911);
  margin-top: 40px;
  margin-left: 100px;
/deep/ .el-form-item__label{
color: #409eff;}
}
</style>
