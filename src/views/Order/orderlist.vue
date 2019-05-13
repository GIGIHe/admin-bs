<template>
  <div class="goods_l">
    <el-input
      v-model.trim="search"
      class="search"
    ></el-input>
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="search_btn"
    >搜索</el-button>
    <el-table
      :data="result"
      border
      highlight
      style="width: 100%"
      :default-sort="{prop: 'created_at', order: 'descending'}"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="user.username"
        label="会员名"
        width="120"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="goods.g_name"
        label="商品名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单编号"
        width="160"
      >
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="收获地址"
            width="200"
            trigger="hover"
            :content="`${scope.row.user.city}${scope.row.user.area}${scope.row.user.stress}`"
          >
            <p
              slot="reference"
              class="address"
            >{{scope.row.user.city}}{{scope.row.user.area}}{{scope.row.user.stress}}</p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="下单时间"
        :formatter="formatterColumn"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleDesc(scope.row._id,scope.row.user._id)"
          >详情</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row._id,scope.row.user._id)"
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
      count: 1,
      search: "",
      result:[]
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    handle() {}
  },
  watch: {
    tableData(n, old) {
      // console.log(n);
      return this.result = n;
    }
  },
  methods: {
    getData() {
      this.$axios.get("/order/all", { pn: this.pn, size: 10 }).then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_ORDER", res.data);
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
    handleEdit(id1, id2) {
      this.$router.push({
        path: "/update_order",
        query: { order: id1, user: id2 }
      });
    },
    handleDelete(id1, id2) {
      // console.log(id1,id2);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/order/${id2}/${id1}`).then(res => {
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
    handleDesc(id1, id2) {
      this.$router.push({
        path: "/order_desc",
        query: { order: id1, user: id2 }
      });
    },
    handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData();
    },
    search_btn() {
      let value = this.search;
      // console.log(value);
      let res = this.tableData.filter(item => {
        // console.log(value,(item.user.username));
        return item.user.username == value;
      });
      this.result = res;
    }
  }
};
</script>

<style scoped lang = "scss">
.goods_l {
  /deep/ .el-table td,
  /deep/ .el-table th {
    text-align: center;
  }
  /deep/ .el-pagination {
    float: right;
    margin-right: 20px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .address {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .search {
    width: 50%;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
