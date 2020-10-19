<template>
  <div class="components-container">
    <filter-menu>
      <span slot="first">更换头像</span>
    </filter-menu>
    <div class="uploadAvatar-container">
    <pan-thumb :image="image" />
    <Button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      更换头像
    </Button>
    </div>
  
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="http://47.115.10.129:8443/charityedu/filedeal/saveImg"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/common/ImageCropper'
import PanThumb from '@/components/common/PanThumb'
  import FilterMenu from "@/components/common/FilterMenu/FilterMenu";
export default {
  name: 'avatarUpload',
  components: { ImageCropper, PanThumb,FilterMenu },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: this.$store.getters.avatar
    }
  },
  methods: {
    cropSuccess(resData) {
      this.$store.dispatch('user/getUserImg')
       this.$Message.success(resData.message)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      // this.image = resData.files.file
      // this.$Message.success(resData.message)
      history.go(0)
      // lo
     
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .uploadAvatar-container{
    margin-top:60px
  }
</style>

