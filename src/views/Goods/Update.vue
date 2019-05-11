<template>
  <div class="ad_goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="商品名称">
        <el-input
          v-model="result.g_name"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select
          v-model="value"
           :placeholder="result.category.c_name"
          @change="changeOption(value)"
        >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.c_name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input
          v-model="result.g_price"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品头图">
        <el-input
          v-model="result.poster"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          v-model="result.g_desc"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      result: '',
      form: {},
      options: "",
      value: "",
      category:""
    };
  },
  computed: {
    ...mapState(["goods"])
  },
  mounted() {
    this.getData();
    this.getOptions();
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      this.$axios.get(`/goods/sigle/${id}`).then(res => {
        if (res.code == 200) {
          this.result = res.data;
          console.log(this.result);
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    changeOption(value){
      console.log(value)
      this.category = value
    },
    onSubmit() {
      this.form = {
        g_name: this.result.g_name,
        g_price: this.result.g_price,
        poster: this.result.poster,
        g_desc: this.result.g_desc,
        category:this.category==""?(this.result.category._id):(this.category)
      };
      // console.log(this.form.category);
      let id = this.$route.query.id;
      this.$axios.patch(`/goods/${id}`, this.form).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    getOptions() {
      this.$axios.get("/cates").then(res => {
        // console.log(res.data);
        if (res.code == 200) {
          this.options = res.data;
          // console.log(this.options);
        }
      });
    }
  }
};
</script>

<style scoped lang = "scss">
.ad_goods {
  background: #fff;
  height: 90vh;
  margin-left: 10px;
  padding-top: 30px;
  .input {
    width: 30%;
  }
  .notice {
    color: red;
    font-size: 12px;
  }
}
</style>
