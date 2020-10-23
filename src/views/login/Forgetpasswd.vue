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
          <Input name="phoneNum"
                    type="text"
                    v-model="loginForm.phoneNum"
                    autocomplete="on"
                    placeholder="请输入手机号">
          
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
                    placeholder="请输入新密码">
            <Icon slot="prefix" class="icon" type="ios-lock" />
            <!-- <Icon slot="suffix" type="ios-eye-off" class="color-main"  @click="showPwd"></Icon> -->
          </Input>
        </FormItem>
        <FormItem class="mybox">
          <Input style="width:60%;background-color:transparent;border:0;" class="dd">
        </Input>
        <Button class="codeBtn" type="primary" 
        style="border:none;margin-left:10px"
         v-show="show" 
         @click="send('resetForm')"
         >发送验证码</Button>
        <span class="codeBtn" type="primary" v-show="!show" disabled style="border:none">重新发送{{count}}s</span>
        </FormItem>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button style="width: 100%;" type="primary"  :loading="loading" @click.native.prevent="handleLogin">
            重置密码
          </Button>
        </FormItem>
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
        count: '',
        show: true,
        timer: null,
        loginRules: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写新密码.', trigger: 'blur' },
            { type: "string", min: 6, message: '新密码长度不能少于6位', trigger: 'blur' }
          ]
        },
        loading: false,
        login_center_bg,
      }
    },
    created(){
    },
    methods: {

      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('user/login', this.loginForm).then((res) => {
              this.loading = false;
                  this.$router.push({path: '/'})
            }).catch(() => {
              this.$Message.error("账号或新密码错误")
              this.loading = false
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
        send(name) {
          this.$refs[name].validateField("email", (errMsg) => {
            if (errMsg) {
              this.$message.error("请输入正确格式的邮箱")
            }else{
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
              sendCode({
                email: this.resetForm.email
              }).then(res => {
                if(res.data.code=='200'){
                  this.$message.success(res.data.message)
                }
              })
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
    .codeBtn{
      border:none
    }
</style>
