<template>
  <div>
    <file-pond
      ref="pond"
      class="file-pond"
      name="file"
      label-idle="请将文件拖到此处或点击上传"
      label-invalid-field="你选择的文件是无效文件"
      label-file-loading="加载中"
      label-file-load-error="加载失败"
      label-file-processing="上传中"
      label-file-processing-complete="上传成功"
      label-file-processing-aborted="取消上传"
      label-file-processing-error="上传期间出现错误"
      label-button-remove-item="移除"
      label-button-abort-item-processing="取消"
      label-tap-to-undo="撤销"
      label-tap-to-retry="点击重试"

      :allow-file-type-validation="true"
      label-file-type-not-allowed="文件类型无效"
      file-validate-type-label-expected-types="格式要求: {allButLastType} 和 {lastType}"
      :accepted-file-types="['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'video/mp4']"
      :file-validate-type-label-expected-types-map="{'application/vnd.ms-powerpoint':'ppt','application/vnd.openxmlformats-officedocument.presentationml.presentation':'pptx','video/mp4':'mp4'}"

      :allow-file-size-validation="true"
      :max-file-size="1000*1000*800"
      label-max-file-size-exceeded="文件超出范围"
      label-max-file-size="文件超出范围"
      :instant-upload="false"
      :chunk-uploads="true"
      :chunk-size="1024*1024*1"
      :chunk-force="true"
      chunk-retry-delays="1000"

      :server="{
        url: url,
        process: {
          url: '/works/',
          method: 'POST',
          withCredentials: true,
          timeout: 7000,
          onload: null,
          onerror: null
        },
        revert:{
          url: '/works/',
          withCredentials: true
        },
        patch:{
          url:'/works?patch=',
          withCredentials: true
        }
      }"

      :required="true"
      :files="myFiles"
      @init="handleFilePondInit"
      @processfile="addfile()"
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
  name: 'UploadFile',
  components: {
    FilePond
  },
  props: {
    fileType: {
      type: Array,
      default: () => {
        return ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'video/mp4']
      }
    },
    uploadUrl: {
      type: String,
      default: () => {
        return 'upload'
      }
    }
  },
  data() {
    return {
      myFiles: [],
      serverId: '',
      url: `${process.env.VUE_APP_BASE_API}/${this.uploadUrl}`
    }
  },
  methods: {
    handleFilePondInit: function() {
    },
    addfile() {
      this.serverId = this.$refs.pond.getFile().serverId
      this.$emit('updateServerId', this.serverId)
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
