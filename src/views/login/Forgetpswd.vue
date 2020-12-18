<template>
<div class="box">
  <h2>找回密码</h2><br>
  <Form ref="pwdInfo" :model="pwdInfo" :rules="pwdRule" >
    <FormItem prop="phoneNum">
      <Input  v-model="pwdInfo.phoneNum" placeholder="请输入手机号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input  password type="password" v-model="pwdInfo.password" placeholder="请输入新密码">
      </Input>
    </FormItem>
    <get-code :phone-num="pwdInfo.phoneNum">
      <FormItem  slot="inputCode" prop="code" >
        <Input  placeholder="请输入验证码" v-model="pwdInfo.code"  >
        </Input>
      </FormItem>
    </get-code>
    <br>
    <button  @click.prevent="pwdSubmit('pwdInfo')" >修改密码</button>
    <div>{{pwdInfo.code}}{{typeof pwdInfo.code}}</div>
    <div>{{pwdInfo.phoneNum}}{{pwdInfo.password}}</div>
  </Form>
<!--  <div>{{this.code}}</div>-->
</div>
</template>

<script>
  import {Checkbox, Form, FormItem, Icon, Input, Option, Select} from "view-design";
  import GetCode from "../../components/common/GetCode";
  import {request} from "../../network/request";

  export default {
    name: "Forgetpasswd",
    data(){
      return{
        pwdInfo: {
          phoneNum: '',
          password: '',
          code:'',
        },
        pwdRule: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写新密码.', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
            // { validator: validatePassCheck, trigger: 'blur' }
          ],
          code:[
            { required:true,message:'请填写验证码',trigger:'blur'}
          ]
        }
      }

    },
    components: {
      Input,
      Icon,
      Form,
      FormItem,
      Checkbox,
      Select,
      Option,
      GetCode
    },
    methods: {
      pwdSubmit(name){
      this.$refs.pwdInfo.validate(valid => {
          if (valid) {
            request({
              method:"post",
              url:"charityedu/repwd/modify",
              data:{
                code:this.pwdInfo.code,
                phoneNum:this.pwdInfo.phoneNum,
                password:this.pwdInfo.password,
              }
            }).then(res=>{
              console.log(res);
              this.$Message.success('修改密码成功，请重新登陆')
            })
              .catch(err=>{
              this.$Message.error('修改密码失败!')
            })
          }
          else {
            this.$Message.error('提交失败!,请完善信息');
          }
  
      },
      }
  }
</script>

<style scoped>
  .box{
    margin: 20px auto;
    width: 350px;
    height: 350px;
    background-color: rgba(255,255,255,.3);
    border: 1px solid rgba(0,0,0,.2);
    padding: 50px;
    text-align: center;
  }

  .box button{
    width: 200px;
    vertical-align: bottom;
    background-color: #00C758 !important;
    border:none;
    color: #fff;
    height: 30px;
  }
  .box a{
    margin-left: 10px;
    font-size: 11px;
  }
  .dd{
    width: 150px;
  }
</style>