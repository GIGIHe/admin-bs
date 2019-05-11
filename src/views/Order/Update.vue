<template>
  <div class="ad_goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
     <el-form-item label="会员名">
        <el-input v-model="result.user.username" class="input" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="result.user.phone"
          class="input"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="result.goods.g_name" class="input" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input
          v-model="result.goods.g_price"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input
          v-model="result._id" class="input" disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="收获地址">
        <el-input
          v-model="result.user.address" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      result:{},
      form: {

      }
    };
  },
  computed:{
// ...mapState(["orders"])
  },
  mounted(){
 this.getData()
  },
  methods: {
    getData(){
      let order = this.$route.query.order
      let user  = this.$route.query.user
       this.$axios.get(`/order/${user}/${order}`).then(res=>{
      if(res.code == 200){
         this.result = res.data[0]
         console.log(res.data[0]);
       }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
       }
        })
    },
    onSubmit() {
      this.form = {
        address:this.result.user.address
      }
         let order = this.$route.query.order
      let user  = this.$route.query.user
      this.$axios.patch(`/order/${order}/${user}`,this.form).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.push('/goods_list')
          }, 1000);
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    }
  }
};
</script>

<style scoped lang = "scss">
.ad_goods{
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
