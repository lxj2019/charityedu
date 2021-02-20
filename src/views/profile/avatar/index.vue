<template>
  <div class="avatar-wrapper">
    <filter-menu>
      <span slot="first">更换头像</span>
    </filter-menu>
    <div class="uploadAvatar-container">
      <pan-thumb :image="$store.getters.avatar" />
      <Button type="primary" icon="upload" style="position: relative;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
        更换头像
      </Button>
    </div>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      :url="url"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>
<script>
import ImageCropper from '@/components/common/ImageCropper'
import PanThumb from '@/components/common/PanThumb'
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
export default {
  name: 'AvatarUpload',
  components: { ImageCropper, PanThumb, FilterMenu },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      url: `${process.env.VUE_APP_BASE_API}/filedeal/saveImg`
    }
  },
  methods: {
    cropSuccess(resData) {
      this.$store.dispatch('user/getUserImg')
      this.$Message.success(resData.message)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.avatar-wrapper{
  height: 500px;

}
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .uploadAvatar-container{
    margin:60px
  }
</style>

