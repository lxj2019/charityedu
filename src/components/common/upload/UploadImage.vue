<template>
  <div>
    <file-pond
      class="file-pond"
      ref="pond"
      name="fileImg"
      labelIdle='请将作品封面拖到此处或点击上传'
      labelInvalidField= '您选择的图片格式无效'
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
      labelFileTypeNotAllowed='文件格式无效'
      fileValidateTypeLabelExpectedTypes="格式要求: {allButLastType} 和 {lastType}"
      accepted-file-types="image/jpeg, image/png"

      allowFileSizeValidation= true,
      maxFileSize= 1000*500
      labelMaxFileSizeExceeded='文件超出范围'
      labelMaxFileSize='限制{filesize}以下'

      instantUpload=false

      allowImagePreview=true
      imagePreviewMinHeight=50
      imagePreviewMaxHeight=100
      imagePreviewTransparencyIndicator='grid'


      allowImageResize=true
      imageResizeTargetWidth=600
      imageResizeTargetHeight=400
      imageResizeMode='contain'
      imageResizeUpscale=false

      allowImageCrop=true,
      imageCropAspectRatio='16:10'


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
    name: "UploadImage",
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

</style>
