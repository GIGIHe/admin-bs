<template>
  <div class="header_w">
    <div class="inner">
      <div class="left">
        <img
          src="../assets/mall.png"
          alt=""
          class="logo"
        >
        <span>天中商城</span>
      </div>
      <div class="right">
<el-dropdown >
  <span class="el-dropdown-link">
    <img
          :src="avatar"
          alt=""
          class="avatar"
        ><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="update">修改个人资料</el-dropdown-item>
    <el-dropdown-item @click.native="$router.push('/chagePass')">修改密码</el-dropdown-item>
    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    avatar() {
      return this.$store.state.userInfo.avatar;
    }
  },
  methods: {
    logout() {
      this.$axios.post("/admin/logout").then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_USER", "");
          this.$message({
            message: res.msg,
            type: "warning"
          });
          setTimeout(() => {
           this.$router.push('/')
          }, 1000);
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    update(){
      this.$router.push('/update_admin')
    }
    // handleCommand(){
    //  let id = this.$store.state.userInfo.id
    //    alert('hello')
      // this.$axios.patch(`/admin/update/${id}`).then(res=>{
      //  if(res.code == 200){
      //  this.$message({
      //       message: res.msg,
      //       type: "success"
      //     });
      //  }else{
      //     this.$message({
      //       message: res.msg,
      //       type: "warning"
      //     });
      //  }
      // })
    // }
  }
};
</script>

<style scoped lang = "scss">
.header_w {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #579fe9;
  font-size: 18px;
  color: #fff;
  .inner {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 62px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .avatar {
      width: 62px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>
