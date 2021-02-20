<template>
  <div>
    <file-pond
      ref="pond"
      class="file-pond"
      name="fileImg"
      label-idle="请将图片拖到此处或点击上传"
      label-invalid-field="您选择的图片格式无效"
      label-file-loading="加载中"
      label-file-load-error="加载失败"
      label-file-processing="上传中"
      label-file-processing-complete="上传成功"
      label-file-processing-aborted="取消上传"
      label-file-processing-error="上传期间出现错误"
      label-button-remove-item="移除"
      label-button-abort-item-processing="取消"
      label-tap-to-undo="撤销"

      allow-file-type-validation="true"
      label-file-type-not-allowed="文件格式无效"
      file-validate-type-label-expected-types="格式要求: {allButLastType} 和 {lastType}"
      accepted-file-types="image/jpeg, image/png"

      allow-file-size-validation="true,"
      max-file-size="1000*500"
      label-max-file-size-exceeded="文件超出范围"
      label-max-file-size="限制{filesize}以下"

      instant-upload="false"
      allow-image-preview="true"
      image-preview-min-height="50"
      image-preview-max-height="100"
      image-preview-transparency-indicator="grid"

      allow-image-resize="true"
      image-resize-target-width="600"
      image-resize-target-height="400"
      image-resize-mode="contain"
      image-resize-upscale="false"

      allow-image-crop="true,"
      image-crop-aspect-ratio="16:10"
      :files="myFiles"
      @init="handleFilePondInit"
      @addfile="addfile"
    />
  </div>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Import styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'UploadImage',
  components: {
    FilePond
  },
  data() {
    return {
      myFiles: [],
      worksImg: {}
    }
  },
  methods: {
    handleFilePondInit: function() {
      console.log('FilePond has initialized')
      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    addfile() {
      // console.log( this.$refs.pond.getFile().file)
      this.worksImg = this.$refs.pond.getFile().file
      this.$emit('updateImg', this.worksImg)
    }
  }
}
</script>

<style scoped>
 .file-pond{
    width: 500px;
    opacity: 1;
    background-color: #ff8198;
    box-shadow: 1px 1px 5px 1px rgba(0,0,0,.1);
  }
</style>
