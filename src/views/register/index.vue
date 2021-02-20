<template>
  <div>
    <Card class="form-layout">
      <Form
        ref="registerForm"
        auto-complete="on"
        :model="registerForm"
        :rules="registerRules"
        label-position="left"
      >
        <div style="text-align: center">
          <Icon type="md-book" class="title-icon" />
        </div>
        <h2 class="login-title">注册</h2>
        <FormItem prop="phoneNum">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="registerForm.phoneNum"
            name="phoneNum"
            type="text"
            size="large"
            autocomplete="on"
            placeholder="请输入手机号"
          >
          <Icon slot="prefix" class="icon" type="ios-phone-portrait" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="userName">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="registerForm.userName"
            name="userName"
            type="text"
            size="large"
            autocomplete="on"
            placeholder="请输入用户名"
          >
          <!-- <Icon slot="prefix" class="icon" type="ios-person" /> -->
          <Select slot="prepend" v-model="registerForm.grant" style="width: 80px; ">
            <Option value="student">学生</Option>
            <Option value="teacher">教师</Option>
            <Option value="admin">管理员</Option>
          </Select>
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="registerForm.password"
            name="password"
            autocomplete="on"
            size="large"
            password
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="registerSubmit"
          >
          <Icon slot="prefix" class="icon" type="ios-lock-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="code">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="registerForm.code"
            placeholder="请输入验证码"
            size="large"
            style="width:60%;background-color:transparent;border:0;"
          >
          <Icon slot="prefix" class="icon" type="ios-apps-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
          <Button
            v-show="show"
            type="primary"
            size="large"
            style="width:38%;border:none;border-radius:0px;margin-left:5px"
            @click="send('registerForm')"
          >发送验证码</Button>
          <Button
            v-show="!show"
            type="primary"
            disabled
            size="large"
            style="width:38%;border:none;border-radius:0px;margin-left:5px"
          >重新发送{{ count }}s
          </Button>
        </FormItem>
        <div class="btn-box">
          <Checkbox v-model="registerForm.rememberMe" class="btn"> 记住用户名</Checkbox>
          <router-link style="float:right" to="/forget-password"> 忘记密码?</router-link>
        </div>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button style="width: 100%; border-radius:0" type="primary" size="large" :loading="loading" @click="registerSubmit">
            注册
          </Button>
        </FormItem>

      </Form>

    </Card>

    <img :src="login_center_bg" class="login-center-layout">

  </div>
</template>

<script>
// import { isvalidphoneNum } from '@/utils/validate'
import { getCookie } from '@/utils/auth'
import login_center_bg from '@/assets/img/login_center_bg.png'
import { getcode, register } from '@/api/user'
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        phoneNum: '',
        password: '',
        userName: '',
        code: '',
        grant: 'student'

      },
      count: '',
      show: true,
      timer: null,
      registerRules: {
        phoneNum: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写用户名.', trigger: 'blur' },
          { max: 15, min: 2, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码.', trigger: 'blur' }
        ]

      },
      loading: false,
      login_center_bg
    }
  },
  created() {
    this.registerForm.phoneNum = getCookie('phoneNum')
    this.registerForm.password = getCookie('password')
  },
  methods: {
    registerSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          console.log('df')
          register({
            ...this.registerForm
          }).then(res => {
            this.$Message.success('注册成功！请登陆')
            this.$router.push('/login')
          }).catch(() => {
            this.$Message.error('提交注册失败')
          })
        } else {
          this.$Message.error('提交失败!请检查信息格式是否正确')
          this.$router.push('/login')
        }
      })
    },
    send(name) {
      this.$refs[name].validateField('phoneNum', (errMsg) => {
        if (errMsg) {
          this.$message.error('请输入正确的手机号')
        } else {
          this.show = false
          const TIME_COUNT = 10
          this.count = TIME_COUNT
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
          getcode({
            phoneNum: this.registerForm.phoneNum
          }).then(res => {
            this.$Message.success(res.data.message)
          })
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
    margin-bottom: 20px;
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
  display: inline-block
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
  display: inline-block
}
  .box button{
  display: inline-block
  }
</style>
