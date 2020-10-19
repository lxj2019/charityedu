<template>
<div class="box">
  <h2>欢迎您登陆</h2><br>
  <Form ref="loginInfo" :model="loginInfo" :rules="ruleInline" style="width: 250px">
    <FormItem prop="phoneNum">
      <Input  v-model="loginInfo.phoneNum" placeholder="请输入手机号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
     </Input>
    </FormItem>
    <FormItem prop="password">
<!--      <Input v-model="loginInfo.password" type="password" password placeholder="请输入密码...">-->
      <Input  password type="password" v-model="loginInfo.password" placeholder="请输入密码">
       <!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
    </Input>
    </FormItem>
    <FormItem>
      <Checkbox class="rememberPasswd" v-model="loginInfo.rememberPwd"> 记住密码</Checkbox>
      <Checkbox class="rememberMe" v-model="loginInfo.rememberMe"> 记住我</Checkbox>
      <Button   @click="loginSubmit('loginInfo')" >登陆</Button>
      <p>
        <router-link to="/forgetpasswd">找不到密码？忘记密码？</router-link>
        <router-link to="/register">注册</router-link>
      </p>
    </FormItem>
  </Form>
  <!--        <Input search enter-button="Search" placeholder="Enter something..." />-->
</div>
</template>

<script>
  import {Input,Icon,Form,FormItem,Checkbox} from 'view-design'
  import {login} from '@/api/user.js'

  export default {
    name: "Login",
    data(){
      return{
        loginInfo: {
          rememberPwd:true,      //复选框默认不被勾选
          rememberMe:true,
          phoneNum: '', 
          password: '',
        },
        ruleInline: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码.', trigger: 'blur' },
            { type: "string", min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ]
        }
      }

    },
    components: {
      Input,
      Icon,
      Form,
      FormItem,
      Checkbox
    },
    methods: {
        loginSubmit(name){ 
          this.$refs[name].validate((valid) => {
             if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginInfo)
                .then(() => {
                   this.$router.push({ path: '/home' })
                  this.$store.dispatch('user/getUserImg')
                  console.log("fd")
                  // this.$store.dispatch('user/getAllRole')
                if(this.rememberPwd===true){       //检查是否勾选记住密码
                    this.setCookie(this.loginInfo.phoneNum,this.loginInfo.password,5)    //传入账号名，密码，和保存天数3个参数
                  }else{
                    this.clearCookie()
                  }
  
                })
            
          } else {
            this.$message.error("请正确填写信息")
          }
        })
        },
      setCookie(phoneNum, password, exdays) {
        const exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "phoneNum" + "=" + phoneNum + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + password + ";path=/;expires=" + exdate.toGMTString();
      },
      getCookie: function() {
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'phoneNum') {
              this.loginInfo.phoneNum = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.loginInfo.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    },
    mounted() {
      this.getCookie();
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

  .rememberPasswd,
  .rememberMe{
    font-size: 11px;
  }
  .rememberMe{
    float: right;
  }
  .rememberPasswd{
    float: left;
  }
  .box button{
    width: 250px;
    height: 25px;
    vertical-align: bottom;
    background-color: #00C758;
    border:none;
    color: #fff;

  }
  .box a{
    margin-left: 10px;
    font-size: 11px;
  }



</style>
