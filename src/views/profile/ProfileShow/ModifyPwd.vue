<template>
  <!--  修改密码模块-->
  <div class="updateBox">
    <div class="update-pwd">
      <Form ref="pwdInfo" class="update-from" :model="pwdInfo" :label-width="85" :rules="ruleInline">
        <FormItem prop="oldPassword" label="原密码">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="pwdInfo.oldPassword"
            password
            size="large"
            type="password"
            placeholder="请输入旧密码"
          >
          <Icon slot="prepend" type="ios-lock-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="newPassword" label="新密码">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="pwdInfo.newPassword"
            size="large"
            password
            type="password"
            placeholder="请输入新密码"
          >
          <Icon slot="prepend" type="ios-lock-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem prop="confirmPwd" label="原密码">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <Input
            v-model="pwdInfo.confirmPwd"
            size="large"
            password
            type="password"
            placeholder="请输入确认密码"
          >
          <Icon slot="prepend" type="ios-lock-outline" />
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="savePwd('pwdInfo')">保存密码</Button>
          <p>
            <router-link to="/forgetpasswd">找不到密码？忘记原密码？</router-link>
          </p>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { Input, Icon, Form, FormItem, Button } from 'view-design'
import { modifyPwd } from '@/api/user.js'
export default {
  name: 'ModifyPwd',
  components: {
    Input,
    Icon,
    Form,
    FormItem,
    Button
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'))
      } else if (value !== this.pwdInfo.newPassword) {
        callback(new Error('两次输入的密码不同！'))
      } else {
        callback()
      }
    }
    return {
      pwdInfo: {
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      ruleInline: {
        oldPassword: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '新密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPwd: [
          { value: 'newPassword', message: '两次输入密码不同，请重新输入', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    savePwd(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          modifyPwd({
            newPassword: this.pwdInfo.newPassword,
            oldPassword: this.pwdInfo.oldPassword
          }).then(res => {
            this.$Message.success(res.data.message)
          }
          ).catch(err => {
            this.$Message.error('修改失败' + err)
          })
        } else {
          this.$Message.error('提交失败!')
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
  .updateBox{
    width: 100%;
    height: 450px;
  }
  .update-pwd{
    width: 300px;
    margin: 50px 200px;
    background-color: rgba(255,255,255,.3);
    /*border: 1px solid rgba(0,0,0,.2);*/
    text-align: center;
  }
  /*.box button{*/
  /*  width: 150px;*/
  /*  height: 30px;*/

  /*  background-color: #00C758 !important;*/
  /*  border:none;*/
  /*  color: #fff;*/
  /*}*/
    .update-pwd a{
    margin-left: 10px;
    font-size: 11px;
  }

</style>
