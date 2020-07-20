<template>
<!--  学生收藏作品卡的封装-->
  <div>
    <works-item  placement="top" :works="works">
<!--      /*左下角底部:作者名称和头像*/-->
      <div class="author" slot="bottom-left">
        <img class="avatar" :src="works.img" alt="用户头像" > <span>{{works.teachername}}</span>
      </div>
<!--      右下角底部：“下拉菜单”-->
      <Dropdown placement='top' slot="bottom-right" class="more">
        <DropdownItem>
          <span></span>
        </DropdownItem>
        <DropdownMenu slot="list" class="dropdown-menu">
          <DropdownItem @click.native="removeColl(works.worksId)">移除收藏</DropdownItem>
          <DropdownItem>详细信息</DropdownItem>
          <DropdownItem>{{works.worksId}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
<!--      左上角：收藏时间-->
      <span class="time" slot="top-left">收藏于{{works.collecttime}}</span>
    </works-item>
  </div>

</template>

<script>
  import {request} from "../../../network/request";
  import WorksItem from "./WorksItem";
  import {DropdownMenu,Dropdown,DropdownItem} from 'view-design'
  export default {
    name: "stuCollection",
    components:{DropdownMenu,Dropdown,DropdownItem,WorksItem},
    props:['works'],

    data(){
      return{
      }
    },

    methods:{
      removeColl(worksId){
        request({
          url:'/charityedu/collection/delete',
          type:'get',
          params:{
            worksId:worksId
          }
        }).then(res=>{
          let data=res.data
          if(data.code=='500')
            this.$Message.error(data.message);
          else this.$Message.success('移除成功');
          console.log(res);
        }).catch(err=>{
          this.$Message.error('请求失败')
        })
      }
    }
  }
</script>

<style scoped>

  /*底部:作者名称和头像*/
  .author .avatar{
    width: 25px;
    height: 25px;
    border-radius: 12px;
    vertical-align: middle;
  }
  .author span {
    font-size: 12px;
    color: #999999;
  }
  .more{
    font-family: icomoon;
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: 0;*/
  }
  .time{
    font-size: 11px;
    color: #000;
  }

  /*DropdownItem的类*/
  .ivu-dropdown-item{
    padding: 6px 0px;
    z-index: 10000;
  }
  .v-application ul, .v-application ol{
    padding:0px 10px;

  }
  .ivu-dropdown-menu,
  .dropdown-menu{
    position: static;
    min-width: 60px;
    /*防止下来菜单被遮住*/
    z-index: 100;
  }

</style>
