<template>
  <div class="ad_admin">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="账号">
        <el-input v-model="form.name" class="input"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
       <el-input-number v-model="form.level"  :min="0" :max="1" ></el-input-number>
       <p class="notice">注:1为超级管理员，0为普通管理员</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >添加</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        level: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios.post('/admin',this.form).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.push('/admin_list')
          }, 1000);
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    },

  }
};
</script>

<style scoped lang = "scss">
.ad_admin{
  background: #fff;
  height: 90vh;
  margin-left: 10px;
  padding-top: 30px;
  .input{
    width: 30%;
  }
  .notice{
    color: red;
    font-size: 12px;
  }
}
</style>
