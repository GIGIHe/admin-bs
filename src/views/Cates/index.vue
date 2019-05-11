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
        prop="_id"
        label="id"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="c_name"
        label="类别"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="添加时间"
        :formatter="formatterColumn"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary" icon="el-icon-edit"
            @click="handleEdit(scope.row._id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="count"
      :page-size="1"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pn: 1,
      count: 1
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    getData() {
      this.$axios.get("/cates", { pn: this.pn, size: 10 }).then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_CATES", res.data);
          this.tableData = res.data;
          this.count = res.count;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    formatterColumn(row, column) {
      // console.log(row,column);
      let date = new Date(row.created_at);
      //  var date = new Date(created_at)
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let hours = ("0" + date.getHours()).slice(-2);
      let minutes = ("0" + date.getMinutes()).slice(-2);
      let sed = ("0" + date.getSeconds()).slice(-2);
      return `${year}/${month}/${day} ${hours}:${minutes}:${sed}`;
    },
    handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData();
    },
    handleDelete(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/cates/${id}`).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getData();
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
    },
    handleEdit(id) {
       this.$router.push({path:'/add_cates',query:{id}})
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
  /deep/ .el-pagination {
    float: right;
    margin-right: 20px;
  }
}
</style>
