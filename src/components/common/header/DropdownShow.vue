<template>
  <div>
    <Dropdown placement="bottom-start">
      <DropdownItem>
        {{ schoolGrade }}
        <Icon type="ios-arrow-down" />
      </DropdownItem>
      <DropdownMenu v-for="(item,index) in grade" slot="list" :key="index">
        <DropdownItem @click.native="select(item)">
          {{ item }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

</template>
<script>
import { DropdownMenu, Dropdown, DropdownItem, Icon } from 'view-design'
import { getGrade } from '@/api/getData'
export default {
  name: 'DropdownShow',
  components: {
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Icon
  },
  data() {
    return {
      list: [
        {
          name: '小学',
          sort: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
        },
        {
          name: '初中',
          sort: ['初一', '初二', '初三']
        },
        {
          name: '高中',
          sort: ['高一', '高二', '高三']
        }
      ],
      schoolGrade: '一年级',
      grade: []
    }
  },

  created() {
    this.getGrade()
  },
  methods: {
    select(name) {
      this.schoolGrade = name
    },
    initData() {

    },
    getGrade() {
      getGrade().then(res => {
        this.grade = res.data.data.grade
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  DropdownItem{
    width: 50px;
  }
</style>
