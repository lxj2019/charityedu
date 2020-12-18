<template>
  <div>
    <template v-for="menu in data">
      <!-- <el-submenu :index="String(menu.menuId)" v-if="menu.type==='导航菜单'" :key="menu.menuId"> -->
        <el-submenu :index="String(menu.menuId)" v-if="menu.sonMenuList.length!==0" :key="menu.menuId">
        <template slot="title">
          <i  :class="menu.picUrl"></i>
          <span>{{menu.menuName}}</span>
        </template>

          <menu-tree :data="menu.sonMenuList"></menu-tree>
       
      </el-submenu>
      <!-- <el-menu-item v-if="menu.type==='操作菜单'" :index="menu.menuUrl" :key="menu.menuId"> -->
      <el-menu-item v-else :index="menu.menuUrl" :key="menu.menuId">
        <i  :class="menu.picUrl"></i>
        <span slot="title">{{menu.menuName}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
  import MenuTree from "./MenuTree";
  export default {
    name: "MenuTree",
    created() {
      // console.log(this.data[0].sonMenuList==undefined);
    },
    data() {
      return {
        menu_data: {}
      };
    },
    components: {
      MenuTree,
    },
    props: ["data"],
  };
</script>