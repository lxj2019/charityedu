<template>
  <div>
    <Modal
      v-model="modalVisible"
      title="修改作品信息"
      draggable
      footer-hide
    >
      <Form ref="form" :model="workForm" :rules="rules" :label-width="100">
        <FormItem label="作品标题" prop="workTitle">
          <Input v-model="workForm.workTitle" min="1" max="20" placeholder="请输入标题" />
        </FormItem>
        <FormItem label="作品类型" prop="knowledgeIds">
          <Cascader
            v-model="workForm.knowledgeIds"
            :data="options"
            :change-on-select="true"
            :load-data="loadData"
          />
        </FormItem>
        <FormItem label="描述" prop="introduction">
          <Input v-model="workForm.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="知识点描述..." />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="onSubmit('workForm')">提交</Button>
          <Button style="margin-left: 8px" @click="handleReset('workForm')">重置</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { updateWork } from '@/api/teacher/worksManage'
import { getWorkInfo } from '@/api/work'
import { getChildList, getRootList } from '@/api/knowledge/manage'

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    worksId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      workForm: {
        workTitle: '',
        knowledgeIds: [],
        introduction: ''
      },
      options: [],
      rules: {
        workTitle: [
          { required: true, message: '请输入作品标题', trigger: 'blur' }
        ],
        knowledgeIds: [
          { required: true, message: '请选择作品知识点' }
        ],
        introduction: [
          { required: true, message: '请输入作品简介', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    modalVisible: {
      get: function() {
        return this.isVisible
      },
      set: function(val) {
        this.$emit('update:isVisible', val)
      }
    }
  },
  watch: {
    isVisible(val) {
      if (val) {
        this.getWorkInfo(this.worksId)
      }
    }
  },
  created() {
    this.getRootList()
  },
  methods: {
    getWorkInfo(worksid, callback) {
      getWorkInfo({ worksid }).then(res => {
        const { worksTitle, worksIntroduction } = res.data.data
        // this.worksForm = { knowledgeId, worksTitle, worksIntroduction }
        this.workForm.knowledgeIds = [19]
        setTimeout(() => {
          this.workForm.knowledgeIds = [21]
        }, 0)
        // this.workForm.knowledgeIds = [21]
        this.workForm.workTitle = worksTitle
        this.workForm.introduction = worksIntroduction
        console.log(this.workForm)
        if (typeof callback === 'function') {
          callback()
        }
      })
    },
    /** 获取知识点类型 */
    getRootList() {
      getRootList().then(res => {
        const list = res.data.data.books
        this.options = list.map(item => {
          item.children = []
          item.loading = false
          item.label = item.knowledgeName
          item.value = item.knowledgeId
          return item
        })
        // console.log(this.options)
      })
    },
    /** 加载知识点 */
    loadData(item, callback) {
      item.loading = true
      getChildList({
        knowledgeid: item.knowledgeId
      }).then(res => {
        const data = res.data.data.children
        this.bl(data)
        item.children = data
        item.loading = false
        callback()
      })
    },
    /** 遍历知识点 */
    bl(list) {
      list.forEach(item => {
        item.label = item.knowledgeName
        item.value = item.knowledgeId
        if (item.children && item.children.length !== 0) {
          this.bl(item.children)
        }
      })
    },
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          updateWork({
            worksId: this.worksId,
            knowledgeId: this.workForm.knowledgeIds.pop(),
            workTitle: this.workForm.workTitle,
            introduction: this.workForm.introduction
          }).then(res => {
            this.$Message.success('修改成功')
            this.modalVisible = false
          })
        } else {
          this.$Message.error('请完善信息')
        }
      })
    }
  }
}
</script>

<style>

</style>
