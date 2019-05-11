<template>
  <div class="ad_goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="form.g_name" class="input"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input
          v-model="form.g_price"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品头图">
        <el-input
          v-model="form.poster" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="value" placeholder="请选择" @change="changeOption(value)">
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.c_name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input
          v-model="form.g_desc" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >添加</el-button>
</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        g_name: "",
        g_price: "",
        poster: "",
        g_desc:"",
        category:""
      },
      options:'',
      value:''
    };
  },
  mounted(){
   this.getOptions()
  },
  methods: {
    onSubmit() {
      this.$axios.post("/goods",this.form).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.go(-1)
          }, 1000);
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    },
    getOptions(){
      this.$axios.get("/cates").then(res=>{
        // console.log(res.data);
        if(res.code == 200){
            this.options = res.data
            console.log(this.options)
        }
      })
    },
    changeOption(value){
      // console.log(id)
      this.form.category = value
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
