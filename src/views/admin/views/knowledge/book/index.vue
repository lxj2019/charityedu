<template>
  <Form ref="bookForm" :model="bookForm" class="bookForm" :rules="ruleValidate" :label-width="80">
    <FormItem label="作者" prop="author">
      <Input v-model="bookForm.author" placeholder="请输入作者名" />
    </FormItem>
    <FormItem label="书名" prop="bookName">
      <Input v-model="bookForm.bookName" placeholder="请输入书名" />
    </FormItem>
    <FormItem label="课本封面" prop="img">
      <span>（格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）</span>
      <image-cropper :fixed-width="270" :fixed-number="[16,9]" @on-change="getImg" />
    </FormItem>
    <FormItem label="年级" prop="grade">
      <Cascader
        v-model="bookForm.grade"
        placeholder="请选择年级"
        :data="options"
      />
    </FormItem>
    <FormItem label="出版时间" prop="publishTime">
      <DatePicker v-model="bookForm.publishTime" type="date" placeholder="选择出版时间" />
    </FormItem>
    <FormItem label="ISBN" prop="isbn">
      <Input v-model="bookForm.isbn" placeholder="请输入ISBN" />
    </FormItem>
    <FormItem label="出版社" prop="publisher">
      <Input v-model="bookForm.publisher" placeholder="请输入出版社..." />
    </FormItem>
    <FormItem label="简介" prop="introduction">
      <Input v-model="bookForm.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简介..." />
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('bookForm')">添加课本</Button>
      <Button style="margin-left: 8px" @click="handleReset('bookForm')">重置信息</Button>
    </FormItem>
  </Form>
</template>
<script>
import { addBook } from '@/api/knowledge/book'
import imageCropper from '@/components/common/upload/imageCropper'
import { parseTime } from '@/utils/index'
import tree from './tree'
export default {
  components: {
    imageCropper
  },
  data () {
    return {
      bookForm: {
        author: '',
        bookName: '',
        grade: [],
        img: null,
        introduction: '',
        isbn: '',
        publishTime: '',
        publisher: ''
      },
      options: tree,
      ruleValidate: {
        author: [
          { required: true, message: '请输入作者名', trigger: 'blur' }
        ],
        bookName: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请选择课本封面' }
        ],
        isbn: [
          { required: true, message: '请输入ISBN', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入出版社', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请选择年级' }
        ],

        publishTime: [
          { required: true, type: 'date', message: '请选择出版时间', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { type: 'string', min: 2, message: '作品简介不少于2个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getImg(data) {
      this.bookForm.img = new window.File([data], `${new Date().getTime()}.png`, { type: data.type })
      // this.$set(this.bookForm, 'img', file)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('img', this.bookForm.img)
          formData.append('author', this.bookForm.author)
          formData.append('publisher', parseTime(new Date(this.bookForm.publishTime)))
          // formData.append('publishTime', this.bookForm.publishTime)
          formData.append('publishTime', '2020-10-14')
          formData.append('isbn', this.bookForm.isbn)
          formData.append('grade', this.bookForm.grade.pop())
          formData.append('bookName', this.bookForm.bookName)
          formData.append('introduction', this.bookForm.introduction)
          addBook(formData).then(res => {
            this.$Message.success('添加成功')
            this.$refs[name].resetFields()
          })
        } else {
          this.$Message.error('请完善课本信息')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .bookForm {
    width: 600px;
    margin: 20px auto;
    FormItem {
      width: 200px
      input {
        width:200px
      }
    }
  }
</style>
