<template>
  <div class="admin_l">
    <el-table
      :data="tableData"
      border
      highlight
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="头像"
        width="180"
      >
<template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>个人描述: {{ scope.row.desc }}</p>
          <div slot="reference" class="name-wrapper">
            <img
            :src="scope.row.avatar"
            class="img"
          >
          </div>
        </el-popover>
      </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
      >
      </el-table-column>
       <el-table-column
        prop="level"
        label="权限"
        :formatter = "formal"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="handle"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <el-pagination background layout="prev,pager,next" :total="count"  :page-size = "1"   @current-change="handleCurrentChange">
        </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pn:1,
      count:1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    handle() {
      return this.$store.state.userInfo.level ? false : true;
    }
  },
  methods: {
    getData() {
      this.$axios.get("/admin",{pn:this.pn,size:10}).then(res => {
        if (res.code == 200) {
          // this.$store.commit("CHANGE_USER", "");
          this.tableData = res.data;
          this.count = res.count
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

   handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData()
    },
    handleDelete(id) {
      // console.log(id);
      let O_id = this.$store.state.userInfo._id;
      if (id == O_id) {
        this.$message('不能删除自己哦');
      } else {
        this.$confirm("此操作将永久删除该账户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios.delete(`/admin/${id}`).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getData()
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    formal(row,column){
      return row.level == 1 ?"超管":"管理员"
    //  if(row.level == 1){
    //    return "管理员"
    //  }
    //  if(row.level == 0){
    //    return "超管"
    //  }
    }
  }
};
</script>

<style scoped lang = "scss">
.admin_l {
  /deep/ .el-table td,
  /deep/ .el-table th {
    text-align: center;
  }
  img {
    width: 50px;
    height: 50px;
  }
   /deep/ .el-pagination{
    float: right;
    margin-right: 20px;
  }
}
</style>
