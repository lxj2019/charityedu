<template>
  <div class="video-box">
    <div class="video-top"></div>
    <video :src="src"
           class="video"
           controls
    ></video>
  </div>
</template>

<script>
  export default {
    name: "VideoShow",
    props:['src']
  }
</script>

<style scoped>
  .video-box{
    width: 100%;
    padding:  30px 10px;
    background-color: #222222;
  }


  .video{
    width: 100%;
  }

</style>
