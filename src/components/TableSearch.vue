<template>
  <el-form ref="ruleFormRef" :model="formData">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.props">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.props">
            <component v-model="formData[item.props]" :is="isComp(item.comp)" :placeholder="item.placeholder">
              <template v-if="item.comp === 'select'">
                <el-option lable="全部" value="全部"/>
                <el-option 
                  v-for="option in item.options" 
                  :key="option.value" 
                  :label="option.label" 
                  :value="option.value"/>
              </template>
            </component>
          </el-form-item>
        </el-col>
        
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(ruleFormRef)">重置</el-button>
    </el-row>
    
  </el-form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const formItemAttrs = computed(() => {
  const {formItem} = props
  formItem.forEach(item => {
    item.col = {xs:24,sm:12,md:8,lg:6,xl:6}
  })
  return formItem
})
const ruleFormRef = ref()

const props = defineProps({
  formItem: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['search'])

// 初始的表单数据
const formData = reactive({})
const isComp = (comp) => {
  return {
    input:'el-input',
    select:'el-select',
  }[comp]
  // 方括号语法 [comp] 用于 动态访问对象的属性 。当 comp 是变量时，它会被解析为具体的键名，从而获取对应的值
}

const handleSearch = () => {
  // console.log(formData)
  emit('search', formData)
}

const handleReset = (formRef) => {
  // 先重置表单，然后再触发查询
  if(!formRef) return
  formRef.resetFields()
  handleSearch()
}
</script>
