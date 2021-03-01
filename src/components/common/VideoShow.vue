<template>
  <div class="video-box">

    <div class="video-top" />
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
    />
  </div>

</template>

<script>
export default {
  name: 'VideoShow',

  props: {
    worksLink: {
      type: String,
      default: 'b19d2cbf83023a4a9591bd54b58c4037'
    }
  },
  computed: {

    playerOptions() {
      // const AT = this.randomNum(108, 2009)
      // const BT = AT * AT * 12 + 3
      const VID = this.worksLink
      return {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 类型
          src: VID
          // src: 'http://47.112.148.42:8443//charityedu/play/' + VID + '/' + AT + '/' + BT // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  methods: {
    // 拼接视频播放路径
    // play(){
    //   console.log(this.worksLink)
    //   let AT = this.randomNum(108, 2009);
    //   let BT = AT * AT * 12 + 3;
    //   let VID = this.worksLink
    //   this.playerOptions.sources[0].src = 'http://47.112.148.42:8443//charityedu/play/' + VID +  "/" + AT + "/" + BT;
    // },
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
    }
  }
}

</script>

<style scoped>
  .video-box{
    /* width: 100%;
    padding:  30px 10px;
    background-color: #222222; */
  }
  .video{
    width: 100%;
  }

</style>

<style >
.video-js{
  border: none;
   outline:none
}
.video-js:focus{
  /* position: relative; */
    outline:none
}
.video-js .vjs-big-play-button{
  /* position: absolute; */
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  /* border:none; */
  border-radius: 100px;
}
.video-js .vjs-big-play-button{
     /*
      播放按钮换成圆形
     */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  }
.video-js .vjs-big-play-button:focus{
  outline:none
}
</style>
