<template>
  <!--  教师端：我的课堂展示模块-->
  <div class="collectBox">
    <!--    引入筛选菜单组件-->
    <filter-menu class="top">
      <span slot="first" @click="sort('publishtime')">最近发布</span>
      <span slot="second" @click="sort('applaudnum')">最多点赞</span>
      <span slot="third" @click="sort('worksClickNum')">最多点击</span>
      <span slot="forth" @click="select('checkstate')"> 已审核/未审核</span>
    </filter-menu>
    <!--    引入“教师作品“卡片组件，并根据作品数遍历-->
    <div class="collect">
      <teacher-works v-for="(item,index) in listShow" :key="index" class="collection-works" :works="item" />
    </div>
  </div>
</template>

<script>
import TeacherWorks from '@/components/common/works/TeacherWorks'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'

export default {
  name: 'MyClass',
  components: {
    FilterMenu,
    TeacherWorks
  },
  data() {
    // 模仿后端传过来的数据
    return {
      list: [
        {
          worktitle: '二元一次方程',
          img: 'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          src: '112',
          type: 'video',
          publishtime: '2020.04.30 10:35',
          applaudnum: 10,
          worksClickNum: 10,
          commentnum: 20,
          commentState: '已评分',
          checkstate: '未审核通过'
        },
        {
          worktitle: '二元一次方程',
          img: 'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          src: '112',
          type: 'video',
          publishtime: '2020.1.30 11:35',
          applaudnum: 1000,
          worksClickNum: 150,
          commentnum: 20,
          commentState: '已评分',
          checkstate: '未审核通过'
        },
        {
          worktitle: '二元一次方程',
          img: 'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          src: '112',
          type: 'video',
          publishtime: '2020.02.30 11:35',
          applaudnum: 1200,
          worksClickNum: 170,
          commentnum: 20,
          commentState: '已评分',
          checkstate: '已审核通过'
        },
        {
          worktitle: '二元一次方程',
          img: 'https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png',
          src: '112',
          type: 'video',
          publishtime: '2020.4.30 11:35',
          applaudnum: 1,
          worksClickNum: 109,
          commentnum: 20,
          commentState: '已评分',
          checkstate: '已审核通过'
        }
      ],
      listShow: [] // 真正用于展示的数据，根据筛选的条件改变
    }
  },
  mounted() {
    this.sort('publishtime')
  },
  methods: {
    sort(type) { // 排序
      this.listShow = this.list
      // 更改为 升序或降序
      this.order = !this.order
      this.sortType = type
      this.listShow.sort(this.compare(type))
      // 调用下面 compare 方法 并传值
    },
    compare(attr) { // 排序方法
      const that = this
      return function(a, b) {
        const val1 = a[attr]
        const val2 = b[attr]
        if (that.order) { // 升序
          if (that.sortType === 'publishtime') { // 如果是时间就转换成时间格式
            return new Date(val2.replace(/-/, '/')) - new Date(val1.replace(/-/, '/'))
          } else {
            return val2 - val1
          }
        } else { // 降序
          if (that.sortType === 'publishtime') {
            return new Date(val1.replace(/-/, '/')) - new Date(val2.replace(/-/, '/'))
          } else {
            return val1 - val2
          }
        }
      }
    },
    // 筛选出已审核通过的作品
    select(type) {
      this.listShow = this.list.filter((item) => {
        return item.checkstate === '已审核通过'
      })
    }
  }
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
