<template>
<div class="box">
    <Button type="primary" icon="upload"
     @click="imagecropperShow=true">
      上传轮播图
    </Button>
    <Table  :columns="columns12" 
    :data="imgList"
    size='small'
    border
    width="800"
    :loading="loading" 
    show-context-menu
    @on-selection-change='select' class="table">
        <template slot-scope="{ row }" slot="id">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">预览</Button>
            <Button type="error" size="small" @click="remove(row,index)">删除</Button>
        </template>
        <template slot="contextMenu">
            <DropdownItem @click.native="show(row)">编辑</DropdownItem>
            <DropdownItem @click.native="remove(row,index)" style="color: #ed4014">删除</DropdownItem>
        </template>
    </Table>
     <Button type="success" icon="upload" 
     @click="upload">
      提交修改
    </Button>
    <!-- 上传轮播图 -->
    <Modal
        v-model="imagecropperShow"
        title="请选择轮播图图片和跳转地址"
        @on-ok="uploadLoop"
        @on-cancel="cancel">
        <upload-image @updateImg="updateImg" ></upload-image>
        跳转地址：
        <Input type="text" v-model="jumpUrl" />
    </Modal>
    <!-- 预览轮播图 -->
    <Modal
        class="previewBox"
        v-model="previewVisable"
        title="预览"
        @on-cancel="cancel">
    <img class="img" :src="previewImg.url"  :alt="previewImg.alt"/>
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
                previewVisable:false,
                loading:false,
                columns12: [
                       {
                        title: '图片id',
                        key: 'id',
                        width:'100px'
                    },
                    {
                        title: '图片标题',
                        key: 'imgName',
                        align: 'center',
                        // width:'200px'
                    },
                    {
                        title: '跳转路径',
                        key: 'jumpUrl',
                        align: 'center',
                        // minWidth:'200'
                    },
                     {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center',
                        minWidth:'200px'
                    },
                      {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        // minWidth:'100px'
                    },
                ],
                imgList: [],
                loopSelection:[],
                previewImg:{
                    url:'',
                    alt:''
                }
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
            show (row) {
                console.log(row)
                this.previewImg.url = row.imgRealName
                this.previewImg.alt = row.imgName
                this.previewVisable = true
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
                              if(res.data.code=="200"){
                            this.$Message.success(res.data.message)
                             this.getLoopList()
                      }
                       
                     })  
                     }
                    },
                    onCancel: () => {
                        this.$Message.info('已取消删除');
                    }
                });
                
     
            },
            getLoopList(){
                this.loading = true
                loopManager().then(res=>{
                    this.imgList = res.data.data
                    this.selectImg()
                    this.loading = false
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
                             this.getLoopList()
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
                        this.getLoopList()
                      
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
.previewBox{
    text-align: center;
}
.img{
    width: 450px;
}

</style>