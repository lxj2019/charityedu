<template>
  <div class="box">
    <h2>欢迎注册</h2>
    <Form ref="registerInfo" :model="registerInfo" :rules="registerRule" style="width: 250px">
      <Select class='grant' v-model="registerInfo.grant" style="width: auto">
        <Option class="grant-list" v-for="item in grantList" :value="item.value" :key="item.value">{{item.label}}</Option>
      </Select>
      <FormItem prop="phoneNum">
        <Input  v-model="registerInfo.phoneNum" placeholder="请输入手机号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="userName">
        <Input type="text" v-model="registerInfo.userName" placeholder="请输入用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input  password type="password" v-model="registerInfo.password" placeholder="请输入密码">
        </Input>
      </FormItem>

      <get-code :phone-num="registerInfo.phoneNum">
        <FormItem  slot="inputCode" prop="code" >
          <Input  placeholder="请输入验证码" v-model="registerInfo.code"  >
          </Input>
        </FormItem>
      </get-code>
      <Checkbox class="protocol" v-model="single"> 请阅读<a>《使用协议》</a>并同意</Checkbox>
        <button prop="single" class="registerBtn" :disabled="!single" type="submit"
                @click.prevent="registerSubmit('registerInfo')" >注册</button>
        <p>
          <router-link to="/login">已经账号？请登录？</router-link>
        </p>
    </Form>
  </div>

</template>
import { register } from "@/api/user.js"
<script>
  import {Input,Icon,Form,FormItem,Checkbox,Select,Option,Button} from 'view-design'
  import {request} from "../../network/request";
  import GetCode from "../../components/common/GetCode";
  export default {
    name: "Register",
    data(){
      return{
        single:false,
        grantList:[
          {value:'student',label:'学生'},
          {value:'teacher',label: '教师'},
          {value:'administrator',label: '管理员'}
        ],
        registerInfo: {
          userName:'',
          phoneNum: '',
          password: '',
          code:'',
          grant:'student',

        },
        registerRule: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          userName:{
            required: true, message: '请填写用户名.', trigger: 'blur'
          },
          password: [
            { required: true, message: '请填写密码.', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
            // { validator: validatePassCheck, trigger: 'blur' }
          ],
          code:[
            { required:true,message:'请填写验证码',trigger:'blur'},
          ]

        }
      }
    },
    components: {
      Input, Icon, Form, FormItem, Checkbox, Button, GetCode,Select,Option
    },
    methods: {
      registerSubmit(name){
        console.log('妈的');
        this.$refs[name].validate((valid) => {
          if (valid) {
            reegister({
                code:this.registerInfo.code,
                userName: this.registerInfo.userName,
                phoneNum:this.registerInfo.phoneNum,
                password:this.registerInfo.password,
                grant:this.registerInfo.grant,
              })
              .then(res=>{
              console.log(res.data);
              if(res.data.code==200)
              this.$Message.success(res.data.message)
              else this.$Message.error(res.data.message)
            }).catch(err=>{
              this.$Message.error('提交注册失败')
            })
          } else {
            this.$Message.error('提交失败!请检查信息格式是否正确');
          }
        })
      },

    }
  }
</script>

<style scoped>
  .box{
    margin: 30px auto;
    width: 360px;
    /*height: 400px;*/
    background-color: rgba(255,255,255,.3);
    border: 1px solid rgba(0,0,0,.2);
    padding: 50px;
    text-align: center;
  }

  .protocol{
    font-size: 11px;
  }
  .grant{
    position: relative;
    left: 50%;
  }
  .grant-list{
    padding-left: 0px;
  }
  .box button{
    width: 250px;
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

</style>
