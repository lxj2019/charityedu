<template>
  <AutoComplete
    placement="bottom-start"
    v-model="value"
    :data="searchData"
    :filter-method="filterMethod"
    placeholder="查找课程"
    icon="ios-search "
    @on-change="selectChange(value)"
    @on-select="enter(value)"
    style="width:200px">
  </AutoComplete>
</template>
<script>
  import {AutoComplete} from 'view-design'
  import {request} from "../../../network/request";
  export default {
    name:"AutoSearch",
    components:{
      AutoComplete
    },
    data () {
      return {
        value: '',
        searchData: ['数据结构 ', '高数', '一元二次方程', '1', '2', '3', '4', '5', '6','7','8','9']
      }
    },
    methods: {
      filterMethod (value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      selectChange(value){
        console.log(typeof value);
        request({
          url:'charityedu/search/',
          method:'post',
          params:{
            content:value
          }
        })
          .then(res=>{
            if(res.data.code==200)
              this.searchData=res.data.data.list
        }).catch(err=>{
          console.log("失败");
          console.log(err);
        })
        console.log(value);
      },

      enter(id){

        this.$router.push('/courseList/'+"id")
      }
    }
  }
</script>
