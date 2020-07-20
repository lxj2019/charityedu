<template>
<div>
<!--  <Input type="text"  placeholder="请输入验证码" style="width: 150px" >-->
<!--  </Input>-->
  <div class="input"><slot name="inputCode" ></slot></div>
  <!--        <button class="codeBtn" display="inline" onclick="getCode()">获取验证码</button>-->
  <span class="codeBtn" v-show="show" v-on:click="getCode()">发送验证码</span>
  <button class="codeBtn" v-show="!show" disabled>重新发送{{count}}s</button>
</div>
</template>

<script>
  import {FormItem,Input} from 'view-design'
  import {request} from "../../network/request";

  export default {
    name: "GetCode",
    components:{
      FormItem,
      Input
    },
    data(){
      return{
        count:'',
        show:true,
        timer:null,
      }
    },
    props:['phoneNum'],
    methods:{
      getCode(){
        const pattern=/^1[3456789]\d{9}$/;
        if(pattern.test(this.phoneNum)){
          this.show = false;
          const TIME_COUNT = 10;
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)

          request({
            url:'/charityedu/register/getcode',
            method:"get",
            params:{
              phoneNum:this.phoneNum,
            }
          }).then(res=>{
            console.log(res);
            if (res.data.code==200)
            this.$Message.success(res.data.message);
            else  this.$Message.error('hhh')
          }).catch(err=>{
            this.$Message.error(err.data.message)
          })
        }
        else this.$Message.error('请填写正确的手机号码')
      }
    }
  }
</script>

<style scoped>
  .input{
    display: inline-block;
    width: 150px;
  }
    .codeBtn{
      display: inline-block;
    width: 60px;
    margin: 0px 10px;
    vertical-align: auto;
    height: 30px;
    font-size: 12px;
  }

</style>
