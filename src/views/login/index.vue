<template>
  <div>
    <Card class="form-layout">
      <Form
        ref="loginForm"
        auto-complete="on"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
      >
        <div style="text-align: center">
          <Icon type="md-book" class="title-icon" />
        </div>
        <h2 class="login-title">惠师惠学</h2>
        <FormItem prop="phoneNum">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="loginForm.phoneNum"
            name="phoneNum"
            type="text"
            size="large"
            autocomplete="on"
            placeholder="请输入用户名"
          >
          <Icon slot="prefix" class="icon" type="ios-shirt-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="loginForm.password"
            name="password"
            autocomplete="on"
            size="large"
            password
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          >
          <Icon slot="prefix" class="icon" type="ios-lock-outline" />
            <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <div class="btn-box">
          <Checkbox v-model="loginForm.rememberMe" class="btn"> 记住用户名</Checkbox>
          <router-link style="float:right" to="/forget-password"> 忘记密码?</router-link>
        </div>
        <FormItem style="margin-bottom: 20px;text-align: center">
          <Button :loading="loading" style="width: 100%;border-radius:0px" type="primary" size="large" @click="handleLogin">
            登陆
          </Button>
        </FormItem>
        <!-- <div> -->
        <router-link to="register" class="register-btn">注册</router-link>
        <!-- </div> -->
      </Form>
    </Card>

    <img :src="login_center_bg" class="login-center-layout">

  </div>
</template>

<script>
import { getCookie, setCookie } from '@/utils/auth'
import login_center_bg from '@/assets/img/login_center_bg.png'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        phoneNum: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        phoneNum: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      },
      loading: false,
      login_center_bg
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
  created() {
    this.loginForm.phoneNum = getCookie('phoneNum')
    this.loginForm.password = getCookie('password')
  },
  methods: {

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const obj = {}
          obj.phoneNum = this.loginForm.phoneNum
          obj.password = this.loginForm.password
          this.loading = true
          this.$store.dispatch('user/login', obj).then(() => {
            this.$router.replace({ path: this.redirect || '/' })
            this.loading = false
            if (this.loginForm.rememberMe === true) {
              setCookie('phoneNum', this.loginForm.phoneNum, 15)
              setCookie('password', this.loginForm.password, 15)
            } else {
              setCookie('phoneNum', '', 15)
              setCookie('password', '', 15)
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.Message.error('登陆失败')
          return false
        }
      })
    }
  }
}
</script>
<style>
.ivu-input-large {
    font-size: 16px;
    border-radius: 1px;
    padding: 8px 40px;
    height: 40px;
}

</style>
<style scoped>
.form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 450px;
  padding: 0 40px;
  margin: 80px auto;
  border-top: 10px solid #409EFF;
}
.title-icon{
  font-size: 60px;
  color:#409EFF
}
.login-title {
  text-align: center;
   margin-bottom: 30px;
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
.input {
  border-radius: 0px;
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
  display: flex
}
.box Input{
  width: 75%;
  display: inline-block;
  height: 100px
}
  .box button{
  display: inline-block
}
.register-btn{
  display: inline-block;
  font-size: 14px;
  margin-bottom: 20px;
  color:#1890ff;
  text-decoration: none;
  cursor: pointer
}

.loading {
  display: inline-block;
  color:#fff
}
</style>
