<template>
  <div>
    <work-common
      class="works"
      placement="top"
      :work-width="workWidth"
      :work-height="workHeight"
      :works="works"
    >
      <!-- 封面左下角：点赞数和播放量 -->
      <div slot="img-leftBottom" class="comment">
        <span class="icon"></span>
        <span class="num">{{ works.worksCount.applaudNum }}</span>
        <span class="icon icon2"></span>
        <span class="num">{{ works.worksCount.worksClickNum }}</span>
      </div>
      <!--      /*左下角底部:作者名称和头像*/-->
      <div slot="bottom-left" class="author">
        <img class="avatar" :src="works.worksImg" alt="头像">
        <span>{{ works.teacherName }}</span>
      </div>
      <!--      左上角：收藏时间-->
      <!--      <span class="time" slot="top-left">发布于{{works.publishtime}}</span>-->
      <!--      右下角:点赞数与播放数-->
      <div slot="bottom-right" class="comment">
        <Icon type="md-thumbs-up" />
        <span>{{ works.worksCount.applaudnum }}</span>
        <span></span><span>{{ works.worksCount.worksClickNum }}</span>
      </div>
    </work-common>
  </div>

</template>

<script>
import WorkCommon from './WorkCommon'
export default {
  name: 'PublicWorks',
  components: {
    WorkCommon
  },
  props: {
    works: {
      type: Object,
      default: () => {
        return {}
      }
    },
    workWidth: {
      type: String,
      default: '230px'
    },
    workHeight: {
      type: String,
      default: '200px'
    }
  },
  methods: {
    enter(work) {
      console.log('jdfj')
      // this.$router.push('/assessCheck/'+this.works.src)
      this.$router.push({
        name: 'video',
        params: {
          id: work.worksId
        }
      })
    }
  }

}
</script>

<style scoped>
  /*底部:作者名称和头像*/
  .author .avatar{
    width: 30px;
    height: 30px;
    border-radius: 16px;
    vertical-align: middle;
  }
  .author span {
    display: inline-block;
    margin-left:5px;
    font-size: 15px;
    color: #999999;
  }
  .comment{
    display: flex;
    justify-content: space-around;
    align-items:flex-end;
    width: 60px;
    height: 20px;
    line-height: 20px;

    /*margin-bottom: 70px;*/
    /*color: white;*/
    color: #fff
  }
  .comment .icon{
    display: inline-block;
    font-family: icomoon;
    font-size: 14px;
    font-weight: 200;
  }
  .comment .num{

  }

</style>
