<template>
  <div class="goods_l">
    <el-table
      :data="tableData"
      border
      highlight
      style="width: 100%"
      :default-sort="{prop: 'like', order: 'descending'}"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="头图"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.poster"
            class="img"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
          >
            <p>描述: {{ scope.row.g_desc }}</p>
            <div
              slot="reference"
              class="name-wrapper"
            >
              <el-tag size="medium">{{ scope.row.g_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="g_price"
        label="价格"
      >
      </el-table-column>
      <el-table-column
        label="类别"
        width="100"
      >
        <template slot-scope="scope">
          <p>{{scope.row.category.c_name}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="storage"
        label="商品库存"
      >
      </el-table-column>
      <el-table-column
        prop="like"
        label="销售量"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
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
      count: 1,
      loading: true,
      search: ""
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    result() {
      const search = this.search;
      if (search) {
        // console.log(this.tableData)
        this.tableData.filter(items => items.g_name == search);
      }
      return this.tableData;
    }
  },
  methods: {
    getData() {
      this.$axios
        .get("/goods/5cb337e35772082678ee80c6", { pn: this.pn, size: 10 })
        .then(res => {
          // loadingInstance.close();
          if (res.code == 200) {
            this.$store.commit("CHANGE_GOODS", res.data);
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
    hotsearch() {
      const search = this.search;
      if (search) {
        // console.log(this.tableData)
        this.tableData.filter(items => items.g_name == search);
      }
      // return this.tableData
    },
    handleEdit(id) {
      this.$router.push({ path: "/update_g", query: { id } });
    },
    handleCurrentChange(page) {
      console.log(page);
      this.pn = page;
      this.getData();
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/goods/${id}`).then(res => {
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
