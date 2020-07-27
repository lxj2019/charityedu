<template>
<!--  “我的收藏”展示模块-->
  <div class="collectBox">
    <FilterMenu class="top">
      <span slot="first" @click="sort('collecttime')">最近收藏</span>
      <span slot="second" @click="sort('ticket')">最多点赞</span>
      <span slot="third" @click="sort('integral')">最多播放</span>
    </FilterMenu>
      <div class="collect">
      <stu-collection class="collection-works" :works="item" v-for="item in list"></stu-collection>
<!--        <works-item class="works" v-for="item in list" :work="item" placement="top">-->
<!--          <Dropdown placement='top' slot="tag" class="more">-->
<!--            <DropdownItem>-->
<!--              <span></span>-->
<!--            </DropdownItem>-->
<!--            <DropdownMenu slot="list">-->
<!--              <DropdownItem @click.native="removeColl(item.worksId)">移除收藏</DropdownItem>-->
<!--              <DropdownItem>详细信息</DropdownItem>-->
<!--              <DropdownItem>{{item.worksId}}</DropdownItem>-->
<!--            </DropdownMenu>-->
<!--          </Dropdown>-->
<!--          <span class="time" slot="time">收藏于{{item.collecttime}}</span>-->
<!--        </works-item>-->
      </div>
    </div>

</template>

<script>
  import WorksItem from "../../../../components/common/works/WorksItem";
  import {DropdownItem} from 'view-design'
  import {request} from "../../../../network/request";
  import StuCollection from "../../../../components/common/works/StuCollection";
  import FilterMenu from "../../../../components/common/FilterMenu/FilterMenu";
  export default {
    name:'Collections',
    components:{
      FilterMenu,
      WorksItem,DropdownItem,StuCollection,FilterMenu
    },
    data: function(){
      return {
         list: [{
           worksId:101,
          worktitle: '一元二次方程',
          teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          ticket: 3,
          integral: 300000,
          collecttime:'2019-1-19',
        },{
           worksId:102,
          worktitle: '勾股定理',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          ticket: 2,
          integral: 50000,
           collecttime:'2019-1-29'
        },{
           worksId:101,
          worktitle: '高数',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          ticket: 5,
          integral: 3000,
           collecttime:'2019-1-22'
        },{
           worksId:101,
           worktitle: '高数fdfdfdfdfdfdfdfd发动机发的链接发链接',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
           ticket: 5,
           integral: 3000,
           collecttime:'2019-1-22'
         },{
           worksId:101,
           worktitle: '高数',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
           ticket: 5,
           integral: 3000,
           collecttime:'2020-1-22'
         },{
           worksId:101,
           worktitle: '高数',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
           ticket: 5,
           integral: 3000,
           collecttime:'2019-12-22'
         },{
           worksId:101,
           worktitle: '高数',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
           ticket: 5,
           integral: 3000,
           collecttime:'2019-9-22'
         },{
           worksId:101,
          worktitle: '计算机组成原理',
           teachername: '汪涵',
           src:12,
           img:'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          ticket: 9,
          integral: 90000,
           collecttime:'2019-8-30'
        }],
        sortType: null,                 // 数组对象中的哪一个属性进行排序
        order: false,                   // 升序还是降序
      }
    },
    methods: {
      sort(type){                     // 排序
        this.order = !this.order;		// 更改为 升序或降序
        this.sortType = type;
        this.list.sort(this.compare(type));
        // 调用下面 compare 方法 并传值
      },
      compare(attr){                  // 排序方法
        let that = this;
        return function(a,b){
          let val1 = a[attr];
          let val2 = b[attr];
          if(that.order){               //升序
            if(that.sortType == 'collecttime'){            // 如果是时间就转换成时间格式
              return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
            }else{
              return val2 - val1;
            }
          }else{                          //降序
            if(that.sortType == 'collecttime'){
              return new Date(val1.replace(/-/,'/')) - new Date(val2.replace(/-/,'/'));
            }else{
              return val1 - val2;
            }
          }
        }
      },
    },

  }

</script>

<style scoped>

  .collectBox{
    width:100%;
    height: 100%;
  }
.collect{
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*width: 100%;*/

  /*flex-wrap: wrap;*/
  /*overflow: auto;*/
  /*margin: 20px;*/
}
  .collection-works{
    position: relative;
    float: left;
    padding:5px;
    flex: 1;
    /*当动画效果变大时，才不会撑开盒子*/
    box-sizing: border-box;
  }


</style>
