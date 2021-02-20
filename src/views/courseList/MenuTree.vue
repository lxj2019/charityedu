<template>
  <div>
    <template v-for="menu in menuList">
      <!-- <el-submenu :index="String(menu.menuId)" v-if="menu.type==='导航菜单'" :key="menu.menuId"> -->
      <el-submenu v-if="menu.sonMenuList.length!==0" :key="menu.menuId" :index="String(menu.menuId)">
        <template slot="title">
          <i :class="menu.picUrl" />
          <span>{{ menu.menuName }}</span>
        </template>

        <menu-tree :menu-list="menu.sonMenuList" />

      </el-submenu>
      <!-- <el-menu-item v-if="menu.type==='操作菜单'" :index="menu.menuUrl" :key="menu.menuId"> -->
      <el-menu-item v-else :key="menu.menuId" :index="menu.menuUrl">
        <i :class="menu.picUrl" />
        <span slot="title">{{ menu.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
import MenuTree from './MenuTree'
export default {
  name: 'MenuTree',
  components: {
    MenuTree
  },
  props: {
    menuList: {
      type: Array,
      // required: true,
      default: () => {
        return []
      }

    }
  },
  data() {
    return {
      menu_data: {}
    }
  },
  created() {
    // console.log(this.data[0].sonMenuList==undefined);
  }
}
</script>
