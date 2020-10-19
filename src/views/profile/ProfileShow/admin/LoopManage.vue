<template>
<div class="box">
    <Button type="primary" icon="upload"
     @click="imagecropperShow=true">
      上传轮播图
    </Button>
    <Table border :columns="columns12" :data="imgList" @on-selection-change='select' class="table">
        <template slot-scope="{ row }" slot="id">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button>
            <Button type="error" size="small" @click="remove(row,index)">删除</Button>
        </template>
    </Table>
     <Button type="success" icon="upload" 
     @click="upload">
      提交修改
    </Button>
        <Modal
        v-model="imagecropperShow"
        title="请选择轮播图图片和跳转地址"
        @on-ok="uploadLoop"
        @on-cancel="cancel">
        <upload-image @updateImg="updateImg" ></upload-image>
        跳转地址：
        <Input type="text" v-model="jumpUrl" />
    </Modal>
</div>

</template>
<script>
// import request from "@/utils/request";
import UploadImage from "@/components/common/upload/UploadImage";
import ImageCropper from '@/components/common/ImageCropper'
import PanThumb from '@/components/common/PanThumb'
import  {loopManager,loopDelete,loopUpdate,loopUpload}  from '@/api/loop.js'
export default {
    components: { ImageCropper, PanThumb,UploadImage},
        data () {
            return {
                file:null,
                jumpUrl:'',
                imagecropperShow: false,
                imagecropperKey: 0,
                columns12: [
                       {
                        title: '图片id',
                        key: 'id'
                    },
                    {
                        title: '图片标题',
                        key: 'imgName'
                    },
                    {
                        title: '跳转路径',
                        key: 'jumpUrl'
                    },
                     {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    },
                      {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                ],
                imgList: [],
                loopSelection:[]
            }
        },
        mounted () {
         this.getLoopList();
          
        },
        methods: {
              updateImg(value){
                  console.log(value)
                this.file = value
              console.log(this.file)
             },
            selectImg(){
            this.imgList.forEach(item => {
            if( item.selected == 'true' ) {
              item._checked = true; 
              this.loopSelection.push(item)
            }
                 });
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `<img src="${this.imgList[index].imgRealName}"  alt="${this.imgList[index].imgName}"/>`
                })
            },

            //删除轮播图
            remove (row,index) {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>删除后将无法恢复，确认删除该轮播图吗？</p>',
                    onOk: () => {
                        if(row.selected=='true'){
                        this.$Message.error("不能删除正在展示的轮播图！")
                        }else{
                          loopDelete({
                            id:row.id
                            }).then(res=>{
                              if(res.data.code==200){
                            this.$Message.success(res.data.message)
                      }
                        this.getLoopList()
                     })  
                     }
                    },
                    onCancel: () => {
                        this.$Message.info('已取消删除');
                    }
                });
                
     
            },
            getLoopList(){
                loopManager().then(res=>{
                    this.imgList = res.data.data
                    this.selectImg()
                })
            },
            select(section,row){
               
                if(section.length>5){
                    this.$Message.error("最多只能选五项")
                }
                 this.loopSelection=section
            },
            upload(){
                if(this.loopSelection.length>5){
                     this.$Message.error("展示的轮播图最多只能选五项，请重新选择！")
                }else{
                    const list = [];
                    this.loopSelection.forEach(item=>{
                        list.push(item.id)
                    })
                    loopUpdate({
                        id:list
                    }).then(res=>{
                       if(res.data.code==200){
                           this.$Message.success(res.data.message)
                       }
                    })
                }
             },
             uploadLoop(){
                 if (this.file != null && this.jumpUrl != ''){
                let formData = new FormData();
                  formData.append('file', this.file);
                 formData.append('jumpUrl', this.jumpUrl);
                 loopUpload(
                    formData
                 ).then(res=>{
                     if(res.data.code==200){
                        this.$Message.success(res.data.message)
                     }else{
                         this.$Message.error(res.data.message)
                     }
                 })
                 }else{
                     this.$Message.error("请选择图片和跳转地址!")
                 }
             },
             cancel(){

             }
        }

  }    

</script>
<style scoped>
.box{
    padding: 20px;
}
.table{
    margin:10px 0;
}

</style>