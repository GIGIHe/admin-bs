import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Index from "@/views/Index";



import Login from "@/components/Login";
import Admin from "@/views/Admin/addmin";
import Update from "@/views/Admin/update";
import Adminlist from "@/views/Admin/adminlist";
import UserList from "@/views/User/index";
import cates1 from "@/views/Goods/veg";
import fruit from "@/views/Goods/fruit";
import cates3 from "@/views/Goods/cates3";
import cates4 from "@/views/Goods/cates4";
import cates5 from "@/views/Goods/cates5";
import Goods from "@/views/Goods/index";
import Cates from "@/views/Cates/index";
import AddCates from "@/views/Cates/add_cates";
import Update_g from "@/views/Goods/Update";
import Orderlist from "@/views/Order/orderlist";
import Update_order from "@/views/Order/Update";
import chagePass from "@/views/Admin/ad_changePass";
import desc from "@/views/Order/desc";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/index",
      name: "首页",
      component: Index,
      redirect:'/admin_list',
      children: [
        {
          path: "/add_admin",
          name: "添加管理员",
          component: Admin
        },
        {
          path: "/admin_list",
          name: "管理员列表",
          component: Adminlist
        },
        {
          path: "/update_admin",
          name: "修改个人信息",
          component: Update
        },
        {
          path: "/chagePass",
          name: "修改密码",
          component: chagePass
        },
        {
          path: "/user_list",
          name: "用户列表",
          component: UserList
        },
        {
          path: "/cates1",
          name: "蔬菜",
          component: cates1
        },
        {
          path: "/fruit",
          name: "水果",
          component: fruit
        },
        {
          path: "/cates3",
          name: "滋补养生",
          component: cates3
        },
        {
          path: "/cates4",
          name: "米面粮油",
          component: cates4
        },
        {
          path: "/cates5",
          name: "禽蛋肉奶",
          component: cates5
        },
        {
          path: "/add_goods",
          name: "添加商品",
          component: Goods
        },
        {
          path: "/update_g",
          name: "修改商品信息",
          component: Update_g
        },
        {
          path: "/cates_list",
          name: "分类列表",
          component: Cates
        },
        {
          path: "/add_cates",
          name: "添加分类",
          component: AddCates
        },
        {
          path: "/order_list",
          name: "订单列表",
          component: Orderlist
        },
        {
          path: "/update_order",
          name: "修改订单",
          component: Update_order
        },
        {
          path: "/order_desc",
          name: "订单信息",
          component: desc
        }
      ]
    }
  ]
});
