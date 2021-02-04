<template>
  <AutoComplete
    v-model="value"
    placement="bottom-start"
    :data="searchData"
    :filter-method="filterMethod"
    placeholder="查找课程"
    icon="ios-search "
    style="width:200px"
    @on-change="selectChange(value)"
    @on-select="enter(value)"
  />
</template>
<script>
import { AutoComplete } from 'view-design'
import { search } from '@/api/getData.js'
export default {
  name: 'AutoSearch',
  components: {
    AutoComplete
  },
  data() {
    return {
      value: '',
      searchData: ['数据结构 ', '高数', '一元二次方程', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      dd: [
        { ee: 'dd' },
        { ee: 'ff' },
        { ee: 'hh' },
        { ee: 'hh' }
      ]
    }
  },
  methods: {
    filterMethod(value, option) {
      console.log(option)
      if (value !== '') { return option.toUpperCase().indexOf(value.toUpperCase()) !== -1 }
    },
    selectChange(value) {
      const hh = this.dd.map(item => item.ee)
      console.log(hh)
      search({
        content: value
      }).then(res => {
        this.searchData = res.data.data.list.map(item =>
          item.knowledgename
        )
      }).catch(err => {
        console.log('失败')
        console.log(err)
      })
      // console.log(value);
    },

    enter(id) {
      this.$router.push('/courseList/' + 'id')
    }
  }
}
</script>
