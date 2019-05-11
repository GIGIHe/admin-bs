<template>
  <div class="ad_goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="result.c_name" class="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          v-if="this.isShow"

        >提交</el-button>
         <el-button
          type="primary"
          v-else
          @click="onUpdate"
        >修改</el-button>
</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      result:[],
      form: {

      },
      isShow:true
    };
  },
  computed:{
...mapState(["cates"])
  },
  mounted(){
 this.getData()
  },
  methods: {
    getData(){
      let id = this.$route.query.id
      if(id){
        this.isShow = false
       this.$axios.get(`/cates/${id}`).then(res=>{
      if(res.code == 200){
    this.result = res.data
       }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
       }
        })
      }
    },
    onSubmit() {
      this.form = {
        c_name: this.result.c_name
      }
        // let id = this.$route.query.id
      this.$axios.post(`/cates`,this.form).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.push('/cates_list')
          }, 1000);
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    },
    onUpdate(){
   let id = this.$route.query.id
  //  console.log(this.result.c_name);
    this.$axios.patch(`/cates/${id}`,{c_name:this.result.c_name}).then(res=>{
// console.log(res.data)
if(res.code == 200){
  setTimeout(() => {
this.$router.push("/cates_list")
  }, 1000);
}

    })
  }
  },

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
