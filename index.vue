<template>
  <div class="app-container">
    <el-row class="row" :gutter="20">
      <!-- 审批组树形区域 -->
      <el-col class="left" :span="6">
        <div class="">
          <h2 class="title">审批组列表</h2>
          <el-button
            class="icon add"
            size="small"
            icon="el-icon-circle-plus-outline"
            type="text"
            title="新增审批组"
            @click="clickAddNode()"
          />
        </div>
        <el-input
          v-model="searchValue"
          class="input"
          size="medium"
          placeholder="请输入审批组"
          @input="getWlfGroupTree(searchValue)"
        >
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            @click="getWlfGroupTree(searchValue)"
          />
        </el-input>
        <!-- 树形控件区域 -->
        <el-tree
          ref="tree"
          class="tree"
          default-expand-all
          :data="approvalGroupNodes"
          :expand-on-click-node="false"
          node-key="approvalId"
          @node-click="clickNode"
        >
          <div slot-scope="{ data }" class="custom-tree-node">
            <span>{{ data.approvalName }}</span>
            <span>
              <el-button
                class="icon"
                size="small"
                type="text"
                title="新增用户"
                icon="el-icon-user"
                @click="() => userVisible = true"
              />
              <el-button
                class="icon"
                size="small"
                type="text"
                title="编辑"
                icon="el-icon-edit"
                @click="() => clickEditNode(data)"
              />
              <el-button
                class="icon"
                size="small"
                type="text"
                title="移除"
                icon="el-icon-remove-outline"
                @click="() => clickDeleteNode(data)"
              />
              <el-button
                class="icon"
                size="small"
                type="text"
                title="新增"
                icon="el-icon-circle-plus-outline"
                @click="() => clickAddNode(data)"
              />
            </span>
          </div>
        </el-tree>
      </el-col>
      <!-- 审批组对应人员列表区域 -->
      <el-col class="right" :span="18">
        <div class="right-container">
          <cmb-form
            ref="queryForm"
            class="queryForm"
            :form="queryForm"
            :form-props="queryProps"
            operation-type="query"
            @on-change="onChange"
          />
          <cmb-table
            ref="table"
            data="workflow/approval/findApprovalPeople"
            :columns="columns"
            :request="{method: 'POST', body: queryForm, params: { approvalId }}"
          >
            <template #operations="{ scope }">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" icon="el-icon-delete" circle @click="clickDelete(scope.row)" />
              </el-tooltip>
            </template>
          </cmb-table>
        </div>
      </el-col>
    </el-row>
    <!-- 审批组编辑表单区域 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <h4 v-if="parentName" style="margin-left: 40px">父级：{{ parentName }}</h4>
      <cmb-form
        ref="form"
        :form="form"
        :form-props="formProps"
        :operation-type="operationType"
        @on-submit="onSubmit"
        @on-cancel="dialogVisible = false"
      />
    </el-dialog>
    <select-user-dialog :visible.sync="userVisible" title="新增审批组用户" @on-submit="selectedUser" />
  </div>
</template>

<script>
import SelectUserDialog from './SelectUserDialog'
import { getWlfGroupTree, deleteApprovalPeople, addApprovalPeople, addApprovalGroup, editApprovalGroup, deleteApprovalGroup } from '@/api/workflow/approval-group'
export default {
  name: 'ApprovalGroup',
  components: { SelectUserDialog },
  data() {
    return {
      searchValue: '',
      approvalGroupNodes: [],
      queryForm: {},
      dialogTitle: '',
      parentName: '',
      approvalId: '1',
      queryProps: {
        contents: [
          {
            label: '姓名',
            name: 'nickName',
            type: 'input'
          },
          {
            label: '账号',
            name: 'username',
            type: 'input'
          }
        ]
      },
      form: {},
      formProps: {
        contents: [
          { name: 'approvalName', label: '审批组名', type: 'input', required: true, span: 20 },
          { name: 'orderNum', label: '显示序号', type: 'input', required: true, span: 20 }
        ]
      },
      operationType: 'add',
      dialogVisible: false,
      userVisible: false,
      columns: [
        { props: { prop: 'nickName', label: '姓名' }},
        { props: { prop: 'userName', label: '账号' }},
        { props: { prop: 'phonenumber', label: '手机号' }},
        { props: { prop: 'email', label: '邮箱' }},
        { render: 'operations', props: { prop: 'operations', label: '操作', width: 100 }}
      ]
    }
  },
  created() {
    this.getWlfGroupTree(this.searchValue)
  },
  methods: {
    // 获取审批树
    getWlfGroupTree(approvalName) {
      getWlfGroupTree({ approvalName }).then(res => {
        this.approvalGroupNodes = res.data
      })
    },
    onChange() {
      this.$refs.table.reload()
    },
    // 点击节点获取审批人列表
    clickNode(data) {
      this.approvalId = data.approvalId
      this.$nextTick(() => {
        this.$refs.table.reload()
      })
    },
    // 编辑审批组
    clickEditNode(data) {
      this.parentName = ''
      this.form = { ...data }
      this.dialogTitle = '审批组--编辑'
      this.operationType = 'edit'
      this.dialogVisible = true
    },
    // 删除审批组
    clickDeleteNode(data) {
      this.$confirm(`此操作删除${data.approvalName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApprovalGroup(data.approvalId).then(res => {
          this.$message.success('删除成功')
          this.getWlfGroupTree(this.searchValue)
        })
      })
    },
    // 新增审批组
    clickAddNode(data) {
      this.parentName = data ? data.approvalName || '' : ''
      this.form = {
        approvalName: '',
        parentId: data ? data.parentId || 0 : 0,
        orderNum: ''
      }
      this.dialogTitle = '审批组--新增'
      this.operationType = 'add'
      this.dialogVisible = true
    },
    // 提交
    onSubmit() {
      if (this.operationType === 'add') {
        this.addApprovalGroup(this.form)
      } else {
        this.editApprovalGroup(this.form)
      }
      this.dialogVisible = false
    },
    //
    addApprovalGroup(wlfGroup) {
      addApprovalGroup(wlfGroup).then(res => {
        this.$message.success('新增成功')
        this.getWlfGroupTree(this.searchValue)
      })
    },
    editApprovalGroup(wlfGroup) {
      editApprovalGroup(wlfGroup).then(res => {
        this.getWlfGroupTree(this.searchValue)
        this.$message.success('修改成功')
      })
    },
    // 新增审批人
    selectedUser(userInfo) {
      console.log(userInfo)
      addApprovalPeople({
        approvalId: this.approvalId,
        username: userInfo.userName
      }).then(res => {
        this.$message.success('新增成功')
        this.$refs.table.reload()
      })
      this.userVisible = false
    },
    clickDelete(row) {
      console.log(row)
      this.$confirm(`此操作删除${row.userName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApprovalPeople({
          approvalId: this.approvalId,
          username: row.username
        }).then(res => {
          this.$$message.success('新增成功')
        })
      })
    }
  }
}
</script>

<style lang="scss">
.tree {
  margin: 10px 0;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-right: 8px;
  white-space: normal;
  line-height: 25px
}
.el-tree-node__content {
  height: 100%;
}
// 改变树形控件的展开图标
.el-tree .el-tree-node__expand-icon.el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.el-tree-node__content .el-icon-caret-right:before {
    content: "\e723";
    // content: "\e6d9";
}
.el-tree-node__content .expanded.el-tree-node__expand-icon.el-icon-caret-right:before {
  content: "\e722";
  // content: "\e6d8"
}
</style>

<style lang="scss" scoped>
.row {
  height: 100%;
	width: 100%;
	position: absolute;
	overflow: hidden
}
.left {
  height: 100%;
  background-color: #fff;
}
.right-container {
  // padding: 2px 10px 50px;
  // background-color: #fff;
}
.queryForm {
  padding: 10px 0;
  margin-bottom: 10px;
}
.title {
  display: inline-block;
  font-size: 18px;
}
.add.icon {
  float: right;
  font-size: 18px;
  margin: 5px;
}

.icon {
  font-size: 15px;
  color: #999
}
.icon:hover {
  color: black;
}
</style>>
