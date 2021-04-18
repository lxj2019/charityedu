<template>
  <div class="cmb-tree-option">
    <el-tree
      ref="tree"
      :data="optionData"
      v-bind="$attrs"
      :props="props"
      :filter-node-method="filterNodeMethod"
      @check="clickNode"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'CmbTreeOption',
  inject: ['select'],
  props: {
    /**
     * 树的数据加载
    */
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    /**
     * 树节点的属性
    */
    props: {
      type: Object,
      default: function() {
        return { id: 'id', children: 'children', label: 'label' }
      }
    },
    /**
     * 树过滤方法
    */
    filterNodeMethod: {
      type: Function,
      default: function(value, data) {
        if (!value) {
          return true
        }
        return data.currentLabel.indexOf(value) !== -1
      }
    }
  },
  data: function() {
    return {
      // 选中值
      value: '',
      // 选中文本
      currentLabel: '',
      // 树的数据
      optionData: []
    }
  },
  watch: {
    // 监控数据变化
    options: function(newValue) {
      this.refreshOptionData(newValue)
    }
  },
  created: function() {
    // 将当前的树推入select下拉选项
    this.select.options.push(this)
    this.select.optionsCount++
  },
  mounted: function() {
    // 监控查询
    this.select.$watch('query', function(val) {
      if (this.select.visible) {
        this.$refs.tree.filter(val)
      } else {
        this.$refs.tree.filter('')
      }
    }.bind(this))
    // 监控值
    this.select.$watch('value', function(val) {
      this.setCheckedKeys(val)
    }.bind(this))
    // 刷新数据，第一次加载不会出现数据
    this.refreshOptionData(this.options)
  },
  methods: {
    setCheckedKeys(val) {
      if (val instanceof Array) {
        this.$refs.tree.setCheckedKeys(val)
      } else {
        this.$refs.tree.setCheckedKeys([val])
      }
    },
    /**
     * 节点点击事件
     * @config {*} current
     */
    clickNode: function(current) {
      this.value = current[this.props.id]
      this.currentLabel = current[this.props.label]
      // 选择框选中当前的选项
      this.select.handleOptionSelect(this, true)
      // 如果是多选,使得树选中当前值
      if (!this.select.multiple) {
        this.$refs.tree.setCheckedKeys([this.value])
      }
    },
    /**
     * 缓存数据
     * @config {*} data
     */
    cachedOptions: function(data) {
      data.value = data[this.props.id]
      data.currentLabel = data[this.props.label]
      this.select.cachedOptions.push(data)
      if (data.children) {
        for (var i = 0; i < data.children.length; i++) {
          this.cachedOptions(data.children[i])
        }
      }
    },
    /**
     * 刷新树的数据
    */
    refreshOptionData: function(data) {
      this.$set(this, 'optionData', [])
      this.$set(this.select, 'cachedOptions', [])
      // 回显input框中的值
      if (this.select.value instanceof Array) {
        this.select.$emit('input', this.select.value)
      } else {
        this.select.$emit('input', this.select.value)
      }
      for (var i = 0; i < data.length; i++) {
        this.optionData.push(data[i])
        this.cachedOptions(data[i])
      }
      // 设置选中的值
      this.setCheckedKeys(this.select.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cmb-tree-option .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: #ddddff;
}
</style>
