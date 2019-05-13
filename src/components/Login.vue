<template>
  <div class="wraaper">
    <div class="login">
      <h2 class="title">欢迎登录天中商城后台管理系统</h2>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formdata"
      >
        <el-form-item label="账号">
          <el-input v-model="formdata.name">
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formdata.password"
            type="password"
            @keyup.enter.native="login"
          >
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          size="medium"
          @click="login"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      formdata: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$axios.post("/admin/login", this.formdata).then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_USER", res.data);
          this.$message({
            message: `欢迎${res.data.name}登录天中商城后台管理系统`,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/index");
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang = "scss">
.wraaper {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background-color: rgb(177, 231, 255);
  /* background-size: cover; */
  overflow: hidden;
}
.title{
  text-align: center;
  margin-bottom: 50px;
}
.login {
  width: 500px;
  height: 360px;
  margin: 50px auto;
  /* background: rgba(0,0,0,0.3); */
  padding-top:40px;
  border-radius: 100px;
  /deep/ .el-input {
    width: 80%;
  }
  /deep/ .el-button {
    width: 275px;
    margin-top: 40px;
    margin-left: 110px;
  }
}
</style>
