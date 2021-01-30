<template>
  <div>
  <file-pond
    class="file-pond"
    ref="pond"
    name="file"
    labelIdle='请将文件拖到此处或点击上传'
    labelInvalidField= '你选择的文件是无效文件'
    labelFileLoading= '加载中'
    labelFileLoadError= '加载失败'
    labelFileProcessing= '上传中'
    labelFileProcessingComplete='上传成功'
    labelFileProcessingAborted='取消上传'
    labelFileProcessingError='上传期间出现错误'
    labelButtonRemoveItem='移除'
    labelButtonAbortItemProcessing="取消"
    labelTapToUndo="撤销"

    allowFileTypeValidation=true
    labelFileTypeNotAllowed='文件类型无效'
    fileValidateTypeLabelExpectedTypes="格式要求: {allButLastType} 和 {lastType}"
    :accepted-file-types="fileType"
    :fileValidateTypeLabelExpectedTypesMap="{'application/vnd.ms-powerpoint':'ppt','application/vnd.openxmlformats-officedocument.presentationml.presentation':'pptx','video/mp4':'mp4'}"


    allowFileSizeValidation= true,
    maxFileSize= 1000*1000*800
    labelMaxFileSizeExceeded='文件超出范围'
    labelMaxFileSize='限制{filesize}以下'

    instantUpload=false
    chunkUploads=true
    chunkSize=1024*1024*1024
    chunkForce=true
    chunkRetryDelays=1000

    :server="{url:`${process.env.VUE_APP_BASE_API}+url`,process:'/works/',revert:'/works/',patch:'/works?patch='}"

    v-bind:files="myFiles"
    v-on:init="handleFilePondInit"
    v-on:processfile="addfile()"/>
  </div>
</template>

<script>

  // Import FilePond
  import vueFilePond from 'vue-filepond';
  // Import plugins
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
  import FilePondPluginImagePreview from "filepond-plugin-image-preview"

  // Import styles
  import 'filepond/dist/filepond.min.css'
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

  // Create FilePond component
  const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview )

  export default {
    name: "UploadFile",
    props: {
      fileType: {
        type: Array,
        default: () => {
          return ['application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','video/mp4']
        }
      },
      url: {
        type: String,
        default: () => {
          return '/upload'
        }
      }
    },
    data: function() {
      return {
         myFiles: [] ,
         serverId:''
        }
    },
  
    methods: {
      handleFilePondInit: function() {        
      },
      addfile(){
        this.serverId=this.$refs.pond.getFile().serverId;
        this.$emit('updateServerId', this.serverId)
      },

    },
    components: {
      FilePond
    },
  
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
