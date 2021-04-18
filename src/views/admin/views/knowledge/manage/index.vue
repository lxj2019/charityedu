<template>
  <div class="app-container">
    <div class="btn-bar">
      <Button>新增</Button>
    </div>
    <Table row-key="knowledgeId" :load-data="getChildList" :columns="columns" :data="rootList" :loading="loading">
      <template #knowledgeName="{ row }">
        <Input v-if="buffer.knowledgeid ===row.knowledgeId" :ref="row['knowledgeName']" v-model="buffer.knowledgename" @on-enter="editSumit(row)" @on-blur="buffer={}" />
        <span v-else @click.prevent="clickEdit(row)">{{ row.knowledgeName }}</span>
      </template>
      <template #action="{ row }">

        <Tooltip content="新增" theme="light">
          <Button class="table-btn" type="dashed" shape="circle" icon="ios-add" @click="clickAdd(row)" />
        </Tooltip>
        <Tooltip :content="buffer.knowledgeid !== row.knowledgeId ? '编辑': '确认'" theme="light">
          <Button v-if="buffer.knowledgeid !==row.knowledgeId" class="table-btn" type="dashed" shape="circle" icon="ios-create-outline" @click="clickEdit(row)" />
          <Button v-else class="table-btn" type="dashed" shape="circle" icon="md-checkmark" @click="editSumit(row)" />
        </Tooltip>
        <Tooltip content="删除" theme="light">
          <Button class="table-btn" type="dashed" shape="circle" icon="ios-trash-outline" @click="clickDelete(row)" />
        </Tooltip>
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">新增</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button> -->
      </template>
    </Table>
    <Modal
      v-model="model"
      :title="title"
      draggable
      footer-hide
    >
      <Form ref="form" :model="form" :rules="rules" :label-width="100">
        <FormItem label="父级知识点">
          <span>{{ fatherName }}</span>
        </FormItem>
        <FormItem label="知识点名称" prop="knowledgename">
          <Input v-model="form.knowledgename" placeholder="请输入知识点名称" />
        </FormItem>
        <FormItem label="前知识点" prop="previousid">
          <Select v-model="form.previousid" placeholder="请选择在哪个子节点后">
            <Option v-for="item in knowledgeOptions" :key="item.value" :value="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="form.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="知识点描述..." />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="onSubmit('form')">提交</Button>
          <Button style="margin-left: 8px" @click="handleReset('form')">重置</Button>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
import { getChildList, getRootList, addKnowledge, updateKnowledge, deleteKnowledge } from '@/api/knowledge/manage'
export default {
  name: 'KnowledgeManage',
  data() {
    return {
      buffer: {},
      columns: [
        {
          title: '年级',
          key: 'schoolGrade',
          tree: true
        },
        {
          title: '课本名称',
          slot: 'knowledgeName',
          key: 'knowledgeName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      model: false,
      title: '新增知识点',
      fatherName: '',
      rootList: [],
      loading: false,
      form: {
        fatherid: '',
        knowledgeid: '',
        previousid: null,
        knowledgename: '',
        desc: ''
      },
      knowledgeOptions: [],
      rules: {
        knowledgename: [
          { required: true, message: '请输入知识点名称', trigger: 'blur' }
        ],
        previousid: [
          { required: true, message: '请选择知识点位置' }
        ]
      }
    }
  },
  created() {
    this.getRootList()
  },
  methods: {
    clickAdd(row) {
      console.log(row)
      this.getOptions(row.knowledgeId)
      this.form = {
        fatherid: row.knowledgeId,
        knowledgename: '',
        previousid: ' ',
        desc: ''
      }
      this.fatherName = row.knowledgeName
      this.title = '新增知识点'
      this.model = true
    },
    clickEdit(row) {
      this.buffer = {
        knowledgeid: row.knowledgeId,
        knowledgename: row.knowledgeName
      }
      const name = row.knowledgeName
      this.$nextTick(() => {
        this.$refs[name].focus({
          cursor: 'all'
        })
      })
    },
    editSumit() {
      updateKnowledge(this.buffer).then(res => {
        this.$Message.success('编辑成功')
        this.getRootList()
        this.buffer = {}
      })
    },
    clickDelete(row) {
      this.$Modal.confirm({
        title: '警告',
        content: `<p>确定删除${row.knowledgeName}吗？</p>`,
        onOk: () => {
          deleteKnowledge({ knowledgeid: row.knowledgeId }).then(res => {
            this.$Message.success('删除成功!')
            this.getRootList()
          })
        },
        onCancel: () => {
          this.$Message.info('已取消删除')
        }
      })
    },
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          addKnowledge(this.form).then(res => {
            this.$Message.success('新增成功')
            this.getRootList()
          })
        } else {
          this.$Message.error('请完善信息')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getOptions(knowledgeid) {
      getChildList({ knowledgeid }).then(res => {
        const data = res.data.data.children
        this.knowledgeOptions = [...data.map((item, index) => {
          return { label: item.knowledgeName, value: index + 1 }
        })]
        this.knowledgeOptions.unshift({ label: '首节点', value: 0 })
      })
    },
    getRootList() {
      this.loading = true
      getRootList().then(res => {
        this.loading = false
        const list = res.data.data.books
        this.rootList = list.map(item => {
          item.children = []
          item._loading = false
          return item
        })
      })
    },
    getChildList (item, callback) {
      console.log(item)
      getChildList({
        knowledgeid: item.knowledgeId
      }).then(res => {
        const data = res.data.data.children
        if (data.length !== 0) {
          callback(data)
        } else {
          this.$Message.info('该课本还没有知识点,你可以点击右侧新增按钮添加')
          setTimeout(() => {
            item._loading = false
          }, 2000)

          // item.children = [{ knowledgeId: '', knowledgeName: '' }]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-btn {
  margin-right: 10px;
}
</style>>
