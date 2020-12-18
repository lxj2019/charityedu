<template>
  <div>
    <Card class="login-form-layout">
      <Form autoComplete="on"
               :model="registerForm"
               :rules="registerRules"
               ref="registerForm"
               label-position="left">
        <div style="text-align: center">
         <Icon type="md-book" class="title-icon" />
        </div>
        <h2 class="login-title">注册</h2>
        <FormItem prop="phoneNum">
          <!-- <span class="svg-container">
          <i class="el-icon-lock" />
        </span> -->
          <Input name="phoneNum"
                    type="text"
                    v-model="registerForm.phoneNum"
                    autocomplete="on"
                    placeholder="请输入手机号">   
            <Icon slot="prefix" class="icon" type="ios-person" />
          </Input>
        </FormItem>
        <FormItem prop="userName">
          <Input name="userName"
                    type="text"
                    v-model="registerForm.userName"
                    autocomplete="on"
                    placeholder="请输入用户名">  
            <!-- <Icon slot="prefix" class="icon" type="ios-person" /> -->
            <Select v-model="registerForm.grant" slot="prepend" style="width: 80px">
            <Option value="学生">学生</Option>
            <Option value="教师">教师</Option>
            <Option value="管理员">管理员</Option>
        </Select>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input name="password"
                    @keyup.enter.native="registerSubmit"
                    v-model="registerForm.password"
                    autocomplete="on"
                    password
                    type="password"
                    placeholder="请输入密码">
            <Icon slot="prefix" class="icon" type="ios-lock" />
            <!-- <Icon slot="suffix" type="ios-eye-off" class="color-main"  @click="showPwd"></Icon> -->
          </Input>
        </FormItem>
         <FormItem class="mybox" prop="code">
          <Input 
          placeholder="请输入验证码"
          v-model="registerForm.code"
          style="width:60%;background-color:transparent;border:0;" class="dd">
        </Input>
        <Button type="primary" 
        style="border:none;margin-left:10px"
         v-show="show" 
         @click="send('registerForm')"
         >发送验证码</Button>
        <Button  type="primary" v-show="!show" disabled 
        style="border:none;margin-left:10px">重新发送{{count}}s</Button>
        </FormItem>
    
        <div class="btn-box">
           <Checkbox class="btn" v-model="registerForm.rememberMe"> 记住用户名</Checkbox>
           <router-link style="float:right" to="/forgetpasswd"> 忘记密码?</router-link>
        </div>
        <FormItem style="margin-bottom: 60px;text-align: center">
          <Button style="width: 100%;" type="primary"  :loading="loading" @click.native.prevent="registerSubmit">
            注册
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
  import {getcode,register} from '@/api/user'
  export default {
    name: 'Register',
    data() {
      return {
        registerForm: {
          phoneNum: '',
          password: '',
          userName:'',
          code:'',
          grant:'学生',
          
        },
        count: '',
        show: true,
        timer: null,
        registerRules: {
          phoneNum: [
            { required: true, message: '请填写手机号', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message:'请输入正确的手机号',trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码.', trigger: 'blur' },
            { type: "string", min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请填写用户名.', trigger: 'blur' },
            { max:15, min: 2, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请填写验证码.', trigger: 'blur' },
          ]
          
        },
        loading: false,
        login_center_bg,
      }
    },
    created(){
        this.registerForm.phoneNum = getCookie("phoneNum");
        this.registerForm.password = getCookie("password");
    },
    methods: {
      registerSubmit(){
           this.$refs.registerForm.validate(valid => {
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
      send(name) {
          this.$refs[name].validateField("phoneNum", (errMsg) => {
            if (errMsg) {
              this.$message.error("请输入正确的手机号")
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
              getcode({
                phoneNum : this.registerForm.phoneNum 
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
    width: 400px;
    margin: 140px auto;
    padding: 0 20px;
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

</style>
