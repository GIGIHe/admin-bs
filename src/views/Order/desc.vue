<template>
  <div class="desc">
<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="user.username"
      label="会员名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods.g_name"
      label="商品名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user.phone"
      label="联系电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goods.g_price"
      label="价格"
      width="80">
    </el-table-column>
    <el-table-column
      prop="order_num"
      label="订单数量"
      width="80">
    </el-table-column>
    <el-table-column
      prop = "created_at"
        label="下单时间"
        :formatter="formatterColumn"
      >
    </el-table-column>
    <el-table-column
      label="地址">
       <template slot-scope="scope">
            <p class="address">{{scope.row.user.city}}{{scope.row.user.area}}{{scope.row.user.stress}}</p>
        </template>
    </el-table-column>
  </el-table>
      <a @click="$router.go(-1)" class="back"><img src="../../assets/back.svg" alt=""><span>返回</span></a>
  </div>
</template>

<script>
  export default {
  data(){
    return{
      tableData:[]
    }
  },
  mounted(){
this.getData()
  },
  methods:{
     getData(){
      let order = this.$route.query.order
      let user  = this.$route.query.user
       this.$axios.get(`/order/${user}/${order}`).then(res=>{
      if(res.code == 200){
         this.tableData = res.data
        //  console.log(res.data);
       }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
       }
        })
    },
     formatterColumn(row, column){
      // console.log(row,column);
      let date = new Date(row.created_at);
      //  var date = new Date(created_at)
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day =  ("0" + date.getDate()).slice(-2);
        let hours = ("0" + date .getHours()).slice(-2);
        let minutes = ("0" +date.getMinutes()).slice(-2);
        let sed = ("0" +date.getSeconds()).slice(-2);
        return `${year}/${month}/${day} ${hours}:${minutes}:${sed}`
    },
  }
  }
</script>

<style scoped lang = "scss">
.desc{
 /deep/ .el-table td,
  /deep/ .el-table th {
    text-align: center;
  }
  .address{
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .back{
    display: flex;
    /* width: 33px; */
    margin-left: 18px;
    margin-top: 23px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    img{
      width: 50px;
    }
  }
}
</style>
