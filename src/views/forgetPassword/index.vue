<template>
  <div>
    <Card class="form-layout">
      <Form
        ref="resetPwdForm"
        auto-complete="on"
        :model="resetPwdForm"
        :rules="formRules"
        label-position="left"
      >
        <div style="text-align: center">
          <Icon type="ios-key" class="title-icon" />
        </div>
        <h2 class="form-title">重置密码</h2>
        <FormItem prop="phoneNum">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="resetPwdForm.phoneNum"
            name="phoneNum"
            type="text"
            size="large"
            placeholder="请输入手机号"
          >
          <Icon slot="prefix" class="icon" type="ios-shirt-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="password">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="resetPwdForm.password"
            name="password"
            password
            size="large"
            type="password"
            placeholder="请输入新密码"
            @keyup.enter.native="handleReset"
          >
          <Icon slot="prefix" class="icon" type="ios-lock-outline" />
            <!-- <Icon slot="suffix" type="ios-eye-off" class="color-main"  @click="showPwd"></Icon> -->
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem class="mybox" prop="code">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="resetPwdForm.code"
            placeholder="请输入验证码"
            size="large"
            style="width:60%;background-color:transparent;border:0;"
            class="dd"
          >
          <Icon slot="prefix" class="icon" type="ios-apps-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
          <Button
            v-show="show"
            type="primary"
            size="large"
            style="width:38%;border:none;border-radius:0px;margin-left:5px"
            @click="send('resetPwdForm')"
          >发送验证码</Button>
          <Button
            v-show="!show"
            type="primary"
            disabled
            size="large"
            style="width:38%;border:none;border-radius:0px;margin-left:5px"
          >重新发送{{ count }}s</Button>
        </FormItem>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button size="large" style="width: 100%;border-radius:0px" type="primary" :loading="loading" @click.native.prevent="handleReset">
            重置密码
          </Button>
        </FormItem>
      </Form>
    </Card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
import { RepwdGetcode, resetPwd } from '@/api/user'
import login_center_bg from '@/assets/img/login_center_bg.png'

export default {
  name: 'Login',
  data() {
    return {
      resetPwdForm: {
        phoneNum: '',
        password: '',
        code: ''
      },
      count: '',
      show: true,
      timer: null,
      formRules: {
        phoneNum: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写新密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '新密码长度不能少于6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码.', trigger: 'blur' }
        ]
      },
      loading: false,
      login_center_bg
    }
  },
  methods: {
    handleReset() {
      this.$refs.resetPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          resetPwd(this.resetPwdForm).then((res) => {
            console.log(res)
            this.loading = false
            this.$Message.success(res.data.message)
            this.$router.replace('/login')
          })
        } else {
          console.log('请填写必要信息!')
          return false
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
          RepwdGetcode({
            phoneNum: this.resetPwdForm.phoneNum
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
    font-size: 30px;
    color:#409EFF
  }

  .form-title {
    margin:10px;
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

</style>
