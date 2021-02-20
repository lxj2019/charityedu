<template>
  <div>
    <div :class="['card',type=='ppt' ? 'ppt' : 'video']" :style="cardStyle">
      <div class="front-cover" :style="{'background-image':`url('${image}')`}" @click="clickImage">
        <!-- 封面左下角区域 -->
        <div class="count">
          <slot name="count" />
        </div>
      </div>
      <div class="card-info">
        <h2 class="title" :title="title" @click="clickTitle">{{ title }}</h2>
        <slot />
        <slot class="bottom-left"><slot name="bottom-left" /></slot>
        <div class="bottom-right"><slot name="bottom-right" /></div>
        <div class="top-left"><slot name="top-left" /></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WorkCommon',
  props: {
    image: {
      type: String,
      default: '"https://edu-image.nosdn.127.net/F355766D26A19A259FD020126628FD36.png"'
    },
    type: {
      type: String,
      default: 'ppt'
    },
    cardStyle: {
      type: Object,
      default: () => {
        return {
          width: '200px'
        }
      }
    },
    title: {
      type: String,
      default: () => {
        return '暂无标题'
      }
    }
  },
  computed: {
    bgImg() {
      const url = this.image
      const bgUrl = 'backgroundImage:' + `url('${url}')`
      return bgUrl
    }
  },
  methods: {
    clickImage() {
      this.$emit('click-image')
    },
    clickTitle() {
      this.$emit('click-title')
    }
  }
}
</script>

<style scoped>
  .card {
    position: relative;
    /* height: 250px; */
    background-color: #fff;
    cursor: pointer;
    transition: 0.3s;
    font-size: 12px;
    z-index: 1;
    border-radius: 5px;
    transition:all ease-in 0.2s;
    /* box-shadow: 0 6px 10px 0 rgba(95,101,105,.15);  */
  }
  .front-cover {
    position: relative;
    width: 100%;
    height: 96px;
    border-radius: 5px;
    /* transition: all 1s cubic-bezier(0, 0.5, 0.5, 1) 0s; */
    background: no-repeat center/100%;
    /* background-size: cover */
  }
  .front-cover .count {
    position:absolute;
    left: 0;
    bottom: 0;
  }
  .card:hover{
    box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12);
    z-index: 0;
  }
  .card:hover .front-cover {
    transition:all 1s;
    /* animation: move 1s infinite; */
    animation: play 1.8s steps(10) infinite
    /* background: no-repeat center/102%; */
  }
  @keyframes play {
  from {
    /* background: no-repeat */
    background-size: center/100%;
  }
  to {
    background-size: center;
    /* background: repeat-x */
  }
}

  .card::before{
    position: absolute;
    top: 6px;
    right: -6px;
    width: 38px;
    height: 23px;
    color: #fff;
    background: no-repeat center/100%;
    z-index: 1;
  }
  .ppt::before{
    content: 'PPT';
  }
  .video::before{
    content: '视频';
  }
  .card-info{
    padding:8px 10px 0px 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .card-info .title {
    height: 32px;
    margin:0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 13px;
    color: #333;
    font-weight: 500;
    font-family: PingFangSC-Medium, PingFangSC;
    line-height: 16px;
  }
  .bottom-left{
    position: absolute;
    bottom: 5px;
    left:10px;
  }
  .top-left{
    position: absolute;
    left: 0;
    top: 0;
  }
  .bottom-right{
    position: absolute;
    right: 0;
    bottom: 2px;
  }

</style>
