<template>
  <div class="nav_w">
 <el-menu
      default-active="2"
      class=" menu"
      :router = true
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span>管理员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index = "/add_admin" v-show="$store.state.userInfo.level">添加管理员</el-menu-item>
          <el-menu-item index = "/admin_list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user_list">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-bell"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/add_goods">添加商品</el-menu-item>
        </el-menu-item-group>
         <el-submenu index="3-1">
          <template slot="title">商品列表</template>
          <el-menu-item index="/cates1">蔬菜</el-menu-item>
          <el-menu-item index="/fruit">水果</el-menu-item>
          <el-menu-item index="/cates3">滋补养生</el-menu-item>
          <el-menu-item index="/cates4">米面粮油</el-menu-item>
          <el-menu-item index="/cates5">禽蛋肉奶</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-check"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/cates_list">分类列表</el-menu-item>
          <el-menu-item index="/add_cates">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order_list">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
 </el-menu>
  </div>
</template>

<script>
  export default {
   created(){
   }
  }
</script>

<style scoped lang = "scss">
.nav_w{
  height: 170vh;
  background-color: #fff;
  .menu{
   border-right: 1px;
  }
}
</style>
