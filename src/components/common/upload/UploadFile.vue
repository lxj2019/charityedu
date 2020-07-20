<template>
  <div>
  <file-pond
    class="file-pond"
    ref="pond"
    name="file"
    labelIdle='请将您作品拖到此处或点击上传'
      labelInvalidField= '您选择的文件是无效文件'
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
    :accepted-file-types="['application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','video/mp4']"
    :fileValidateTypeLabelExpectedTypesMap="{'application/vnd.ms-powerpoint':'ppt','application/vnd.openxmlformats-officedocument.presentationml.presentation':'pptx','video/mp4':'mp4'}"


    allowFileSizeValidation= true,
    maxFileSize= 1000*1000*800
    labelMaxFileSizeExceeded='文件超出范围'
    labelMaxFileSize='限制{filesize}以下'

    instantUpload=false
    chunkUploads=true
    chunkSize=1024*1024*1
    chunkForce=true
    chunkRetryDelays=1000

    :server="{url:'http://localhost:8443/charityedu/upload',process:'/works/',revert:'/works/',patch:'/works?patch='}"

    v-bind:files="myFiles"
    v-on:init="handleFilePondInit"/>

  </div>
</template>

<script>

  // Import FilePond
  import vueFilePond from 'vue-filepond';
  // Import plugins
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";

  // Import styles
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

  // Create FilePond component
  const FilePond = vueFilePond( FilePondPluginFileValidateType, FilePondPluginImagePreview );

  export default {
    name: "UploadFile",
    data: function() {
      return { myFiles: [] };
    },
    methods: {
      handleFilePondInit: function() {
        console.log('FilePond has initialized');
        // example of instance method call on pond reference
        this.$refs.pond.getFiles();
      }
    },
    components: {
      FilePond
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
