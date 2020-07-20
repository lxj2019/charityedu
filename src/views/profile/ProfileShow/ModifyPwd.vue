<template>
<!--  修改密码模块-->
  <div class="updateBox">
    <div class="update-pwd">
      <Form ref="pwdInfo" class="update-from" :model="pwdInfo" :label-width="85" :rules="ruleInline" >
        <FormItem prop="oldPassword" label="原密码">
          <!--          <Input v-model="pwdInfo.password" type="password" password placeholder="请输入密码...">-->
          <Input  password type="password" v-model="pwdInfo.oldPassword" placeholder="请输入旧密码">
            <!--            <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          </Input>
        </FormItem>
        <FormItem prop="newPassword" label="新密码">
          <!--          <Input v-model="pwdInfo.password" type="password" password placeholder="请输入密码...">-->
          <Input  password type="password" v-model="pwdInfo.newPassword" placeholder="请输入新密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="confirmPwd" label="原密码">
          <!--          <Input v-model="pwdInfo.password" type="password" password placeholder="请输入密码...">-->
          <Input  password type="password" v-model="pwdInfo.confirmPwd" placeholder="请输入确认密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="savePwd('pwdInfo')" >保存密码</Button>
          <p>
            <router-link to="/forgetpasswd">找不到密码？忘记原密码？</router-link>
          </p>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import {Input,Icon,Form,FormItem,Button} from 'view-design'
  import {request} from "../../../network/request";

  export default {
    name: "ModifyPwd",
    data() {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入您的密码'));
        } else if (value !== this.pwdInfo.newPassword) {
          callback(new Error('两次输入的密码不同！'));
        } else {
          callback();
        }
      }
      return {
        pwdInfo: {
          oldPassword: '',
          newPassword: '',
          confirmPwd: '',
        },
        ruleInline: {
          oldPassword: [
            {required: true, message: '请填写密码.', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请填写密码.', trigger: 'blur'},
            {type: 'string', min: 6, message: '新密码长度不能少于6位', trigger: 'blur'}
          ],
          confirmPwd: [
            {value: 'newPassword', message: '两次输入密码不同，请重新输入', trigger: 'blur'},
            {validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      }
    },

    methods:{
      savePwd(name)
        {
          this.$refs[name].validate((valid) => {
            if (valid) {
              request({
                url:'/charityedu/modifypwd',
                method:"post",
                data:{
                  newPassword:this.newPassword,
                  oldPassword:this.oldPassword
                }
              }).then(res=>{
                console.log(res);
                if (res.data.code=='200')
                this.$Message.success(res.data.message)
                else this.$Message.error(res.data.message)
              }).catch(err=>{
                this.$Message.error('修改失败'+err)
              })
            } else {
              this.$Message.error('提交失败!');
            }
          })
        }
      },
    components: {
      Input,
      Icon,
      Form,
      FormItem,
      Button
    },

  }
</script>

<style scoped>
  .updateBox{
    width: 100%;
    height: 100%;

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
