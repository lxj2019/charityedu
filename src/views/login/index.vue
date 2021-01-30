<template>
  <div>
    <Card class="login-form-layout">
      <Form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
         <Icon type="md-book" class="title-icon" />
        </div>
        <h2 class="login-title">惠师惠学</h2>
        <FormItem prop="phoneNum">
          <!-- <span class="svg-container">
          <i class="el-icon-lock" /> -->
        <!-- </span> -->
          <Input name="phoneNum"
                    type="text"
                    v-model="loginForm.phoneNum"
                    autocomplete="on"
                    placeholder="请输入用户名">   
            <Icon slot="prefix" class="icon" type="ios-person" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input name="password"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autocomplete="on"
                    password
                    type="password"
                    placeholder="请输入密码">
            <Icon slot="prefix" class="icon" type="ios-lock" />
            <!-- <Icon slot="suffix" type="ios-eye-off" class="color-main"  @click="showPwd"></Icon> -->
          </Input>
        </FormItem>
    
        <div class="btn-box">
           <Checkbox class="btn" v-model="loginForm.rememberMe"> 记住用户名</Checkbox>
           <router-link style="float:right" to="/forgetpasswd"> 忘记密码?</router-link>
        </div>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button style="width: 100%;" type="primary"  :loading="loading" @click.native.prevent="handleLogin">
            登录
          </Button>
        </FormItem>
        <div>
        <router-link to="register" class="register-btn">注册用户</router-link>
        </div>
        
      </Form>
      
    </Card>
    
    <img :src="login_center_bg" class="login-center-layout">
 
  </div>
</template>

<script>
  import {isvalidphoneNum} from '@/utils/validate';
  import {setCookie,getCookie} from '@/utils/auth';
  import login_center_bg from '@/assets/img/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          phoneNum: '',
          password: '',
          rememberMe:false
        },
        loginRules: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码.', trigger: 'blur' },
            { type: "string", min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ]
        },
        loading: false,
        login_center_bg,
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created(){
        this.loginForm.phoneNum = getCookie("phoneNum");
        this.loginForm.password = getCookie("password");
    },
    methods: {

      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            let obj = {}
              obj.phoneNum = this.loginForm.phoneNum
              obj.password = this.loginForm.password
            this.loading = true
            this.$store.dispatch('user/login', obj).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
              if (this.loginForm.rememberMe==true) {
                setCookie("phoneNum",this.loginForm.phoneNum,15)
                setCookie("password",this.loginForm.password,15)
              } else {
                setCookie("phoneNum",'',15)
                setCookie("password",'',15)
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.Message.error('登陆失败')
            return false
          }
        })
      },
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
  .title-icon{
    font-size: 50px;
    color:#409EFF
  }

  .login-title {
    text-align: center;
    color:#409EFF
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
        span:first-of-type {
          margin-right: 16px;
        }
    
    .svg-container {
      padding: 6px 5px 6px 15px;
      /* color: $dark_gray; */
      font-size: 20px;
      vertical-align: middle;
      width: 20px;
      display: inline-block;
      
    }
    .icon{
      /* margin-left: 10px; */
      color:#409EFF
    }
    .btn-box{
      font-size: 12px;
      margin-bottom: 20px;
    }
    .btn{
      font-size: 12px;
    }
    .box{
      display: flex;

    }
    .box Input{
      width: 75%;
      display: inline-block
    }
   .box button{
      display: inline-block
    }
    .register-btn{
      font-size: 13px;
      float:right;
      color:#1890ff;
      text-decoration: none;
      cursor: pointer;

    }

</style>
