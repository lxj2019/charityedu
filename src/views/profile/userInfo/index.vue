<template>
  <div class="personal-info">
    <filter-menu>
      <span slot="first">个人资料</span>
    </filter-menu>
    <Form class="form-box" :model="userInfo" :label-width="85" :rules="ruleValidate" inline>
      <FormItem label="姓名：" class="Form-item" prop="userName">
        <Input v-model="userInfo.userName" />
      </FormItem>
      <FormItem label="性别" class="Form-item">
        <RadioGroup v-model="userInfo.sex">
          <Radio label="男">男</Radio>
          <Radio label="女">女</Radio>
        </RadioGroup>
      </FormItem>
      <br>
      <FormItem label="账号ID：" class="Form-item">
        <Input v-model="userInfo.userId" :disabled="true" />
      </FormItem>
      <FormItem label="手机号：" class="Form-item" prop="phoneNum">
        <Input v-model="userInfo.phoneNum" :disabled="true" />
      </FormItem><br>
      <FormItem label="邮箱：" class="Form-item">
        <Input v-model="userInfo.mail" :disabled="true" />
      </FormItem>
      <FormItem label="身份：" class="Form-item">
        <Input v-model="userInfo.grant" :disabled="true" />
      </FormItem><br>
      <!-- <FormItem label="班级："  class="Form-item" v-if="userInfo.grant!='teacher'">
        <Input v-model="userInfo.schoolClass"  />
      </FormItem> -->
      <FormItem label="地区：" class="Form-item">
        <Input v-model="userInfo.region" />
      </FormItem>
      <FormItem label="学校：" class="Form-item">
        <Input v-model="userInfo.schoolName" />
      </FormItem>
      <FormItem :label="schoolClass" class="Form-item">
        <Input v-model="userInfo.schoolGrade" />
      </FormItem>
      <FormItem
        label="班级："
        class="Form-item"
      >
        <Input v-model="userInfo.schoolClass" />
      </FormItem>
      <br>
      <!--      <FormItem label="身份："  class="Form-item">-->
      <!--        <Select v-model="userInfo.grant">-->
      <!--          <Option value="beijing">New York</Option>-->
      <!--          <Option value="shanghai">London</Option>-->
      <!--          <Option value="shenzhen">Sydney</Option>-->
      <!--        </Select>-->
      <!--      </FormItem>-->
      <FormItem label="出生日期：" class="Form-item">
        <!-- <Row> -->
        <DatePicker v-model="userInfo.birthday" type="date" placeholder="Select date" />
        <!-- </Row> -->
      </FormItem>
      <br>

      <!-- <FormItem label="介绍自己：" class="Form-item">
        <Input v-model="userInfo.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
      </FormItem>
      <br> -->
      <FormItem>
        <Button type="primary" @click="updateInfo">保存</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>

    </Form>

  </div>

</template>
<script>
import FilterMenu from '@/components/common/FilterMenu/FilterMenu'
import { updateInfo, getInfo } from '@/api/user'
// import { formatDate } from '@/utils/date'
export default {
  name: 'PersonalInfo',
  components: {
    FilterMenu
  },
  data() {
    return {
      userInfo: this.$store.getters.userInfo,
      ruleValidate: {
        userName: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ],
        mail: [
          // { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'change' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    schoolClass() {
      return this.userInfo.grant === 'teacher' ? '专业：' : '年级：'
    }
  },
  created() {
    this.getUser()
    // this.upload();
  },
  methods: {
    getUser() {
      getInfo().then(res => {
        const data = res.data
        this.userInfo = data.data
      })
    },
    updateInfo() {
      const { birthday, mail, region, schoolClass, schoolGrade, schoolName, sex, userId, userName } = this.userInfo
      // birthday = new Date(birthday)
      //  birthday = formatDate(birthday,'yyyy-MM-dd')
      console.log(birthday)
      updateInfo({
        birthday,
        mail,
        region,
        schoolClass,
        schoolGrade,
        schoolName,
        sex,
        userId,
        userName
      }).then(res => {
        this.$Message.success('修改成功')
        this.$store.dispatch('user/getInfo')
      })
    }
  }

}
</script>
<style>
  .personal-info{
    width: 100%;
    height: 100%;
  }
  .form-box{
    margin: 10px;
  }
  .form-box .Form-item{
  margin-left:50px;
}

</style>
