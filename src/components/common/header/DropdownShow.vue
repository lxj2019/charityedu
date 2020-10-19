<template>
  <div>
    <!-- <Dropdown placement="bottom-start">
      <DropdownItem>
        {{schoolGrade}}
        <Icon type="ios-arrow-down"></Icon>
      </DropdownItem>
      <DropdownMenu slot="list" v-for="(item,index) in list" :key="index">
        <Dropdown x-placement="right">
          <DropdownItem>
            {{item.name}}
            <Icon type="ios-arrow-forward"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list" v-for="(grade,index) in item.sort" :key="index">
            <DropdownItem @click.native="select(grade)">
              {{grade}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </DropdownMenu>
    </Dropdown> -->
    <Dropdown placement="bottom-start">
          <DropdownItem>
            {{schoolGrade}}
            <Icon type="ios-arrow-down"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list" v-for="(item,index) in grade" :key="index">
            <DropdownItem @click.native="select(item)">
              {{item}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
  </div>

</template>
<script>
  import {DropdownMenu,Dropdown,DropdownItem,Icon} from 'view-design'
  import { getGrade,getBooks} from "@/api/getData"
  export default {
      name: "DropdownShow",
    components:{
      DropdownMenu,
      DropdownItem,
      Dropdown,
      Icon
    },
    data(){
      return{
        list:[
          {
            name:'小学',
            sort:['一年级','二年级','三年级','四年级','五年级','六年级']
          },
          {
            name:'初中',
            sort:['初一','初二','初三']
          },
          {
            name:'高中',
            sort:['高一','高二','高三']
          }
        ],
        schoolGrade:'一年级',
        grade:[]
      }
    },
    methods:{
      select(name){
        this.schoolGrade=name;

      },
      initData(){
       
      }
    },
    mounted() {

    },
    created() {
       getGrade().then(res=>{
        console.log(res.data.data.grade)
        this.grade = res.data.data.grade
      }).catch(err =>{
        console.log(err)
      })
   }
  }
</script>


<style scoped>
  DropdownItem{
    width: 50px;
  }
</style>
