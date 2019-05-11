<template>
  <div>
  <el-row>
    <Header></Header>
  </el-row>
<el-row >
  <el-col :span = 4><Nav></Nav></el-col>
  <el-col :span = 19 class="children">
    <router-view></router-view>
    </el-col>
</el-row>
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
  export default {
components:{
Header,
Nav
}
  }
</script>

<style scoped>
.children{
  height: 140vh;
  background: #fff;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
