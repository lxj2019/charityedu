<template>
  <div>
    <Card class="form">
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
          <Input
            v-model="resetPwdForm.phoneNum"
            name="phoneNum"
            type="text"
            autocomplete="on"
            placeholder="请输入手机号"
          />

          <Icon slot="prefix" class="icon" type="ios-person" />

          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="resetPwdForm.password"
            name="password"
            autocomplete="on"
            password
            type="password"
            placeholder="请输入新密码"
            @keyup.enter.native="handleReset"
          />
          <Icon slot="prefix" class="icon" type="ios-lock" />
            <!-- <Icon slot="suffix" type="ios-eye-off" class="color-main"  @click="showPwd"></Icon> -->
          </Input>
        </FormItem>
        <FormItem class="mybox" prop="code">
          <Input
            v-model="resetPwdForm.code"
            placeholder="请输入验证码"
            style="width:60%;background-color:transparent;border:0;"
            class="dd"
          />
          </Input>
          <Button
            v-show="show"
            type="primary"
            style="border:none;margin-left:10px"
            @click="send('resetPwdForm')"
          >发送验证码</Button>
          <Button
            v-show="!show"
            type="primary"
            disabled
            style="border:none;margin-left:10px"
          >重新发送{{ count }}s</Button>
        </FormItem>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button style="width: 100%;" type="primary" :loading="loading" @click.native.prevent="handleReset">
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
  created() {
  },
  methods: {

    handleReset() {
      this.$refs.resetPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          resetPwd(this.resetPwdForm).then((res) => {
            console.log(res)
            this.loading = false
            if (res.data.code == '200') {
              this.$Message.success(res.data.message)
              this.$router.replace('/login')
            } else {
              this.$Message.error(res.data.message)
            }
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
            if (res.data.code == '200') {
              this.$Message.success(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .form {
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

  .form-title {
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
