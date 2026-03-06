<template>
  <el-dialog
    :title="isEdit ? '编辑文章' : '新增文章'"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="formData" ref="formRef" :rules="rules" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable/>
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要(可选)" maxlength="1000" show-word-limit clearable :rows="4"/>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tagArray" placeholder="请输入标签(逗号分隔)" multiple filterable allow-create style="width: 100%;">
          <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag"/>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            :show-file-list="false"
            accept="image/*"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面图片</p>
            </div>
            <div v-else>
              <img :src="imgUrl" alt="封面图片" class="cover-image"/>
            </div>
          </el-upload>
          <div v-if="imgUrl" class="cover-remove">
            <el-button type="danger" size="small" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor 
          v-model="formData.content" 
          placeholder="请输入文章内容,支持富文本格式\n\n可以使用加粗、斜体、列表、标题等格式来丰富文章内容。"
          :maxlength="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="400px"
        />
      </el-form-item>
    </el-form>
    <!-- 预览区域 -->
    <div v-if="btnPreview" class="preview-content">
      <h3>内容预览</h3>
      <div v-html="formData.content"></div>
    </div>
    <template #footer>
      <el-button @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏预览' : '预览效果' }}</el-button>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit()" :loading="loading">{{ isEdit.value ? '更新文章' : '创建文章' }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed ,reactive,nextTick, watch} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile, createArticle, updateArticle } from '@/api/admin.js'
import { fileBaseUrl } from '@/config/index.js'
import RichTextEditor from '@/components/RichTextEditor.vue'
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  article: {
    type: Object,
    default: null  // 定义成null 创建一个字段  判断新增或编辑
 }
})
const emit = defineEmits(['update:modelValue','success'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)  // 当props.modelValue变化时，触发更新事件 向父组件传递新值
})
// 两个!! 把变量转换成布尔值
const isEdit = computed(() => !!props.article?.id)

// 用watch 对props.article进行监听  => 监听编辑数据
watch(()=>props.article,(newVal)=>{
  if(newVal) {
    nextTick(()=>{
      // 用reactive定义的对象 不能整体赋值 否则会失去响应式 
    Object.assign(formData,newVal)
    // 使用现有ID
    businessId.value = newVal.id
    // 封面Url
    imgUrl.value = fileBaseUrl + newVal.coverImage
    })
  }
})


const handleClose = () => {
  // 重置表单 一开始给formRef赋值是什么 重置后就是什么
  formRef.value.resetFields()
  // 清空业务ID
  businessId.value = null
  // 重置标签 -- 问题
  formData.tagArray = []
  // 重置封面图片和数据
  handleRemove()
  emit('update:modelValue', false)
}

// 表单数据
const formData = reactive({
    "title": "",
    "content": "",
    "coverImage": "",
    "categoryId": null,
    "summary": "",
    "tags": "",
    "id": ""
})

const rules = reactive({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { max: 200, message: '文章标题最多输入 200 个字符', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' },
    { max: 5000, message: '文章内容最多输入 5000 个字符', trigger: 'blur' }
  ],
})

const commonTags = [
  '情绪管理', '焦虑', '抑郁', '压力', '睡眠', 
  '冥想', '正念', '放松', '心理健康', '自我成长',
  '人际关系', '工作压力', '学习方法', '生活技巧'
]

// 上传图片
const imgUrl = ref('')
const beforeUpload = (file) => {
  // 针对上传的文件进行校验
  console.log(file)
  // 校验文件类型是否为图片
  const isImage = file.type.startsWith('image/')
  // 校验文件大小是否超过 5MB
  const isLt5M = file.size <= 5 * 1024 * 1024
  if(!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB')
    return false
  }
  if(!isImage) {
    ElMessage.error('请上传图片文件')
    return false
  }

  return true
}
// 上传图片请求
const businessId = ref(null)
const handleUploadRequest = async ({file}) => {
  // uuid 唯一标识 -- 上传文件的唯一标识
  businessId.value = crypto.randomUUID()
  console.log(businessId.value)
  const fileRes = await uploadFile(file,{
    businessId: businessId.value
  })
  console.log(fileRes)
  // 拼接完整的图片地址
  imgUrl.value = fileBaseUrl + fileRes.filePath
  formData.coverImage = fileRes.filePath
}

// 移除封面
const handleRemove = () => {
  imgUrl.value = ''
  formData.coverImage = ''
}

// 富文本内容改变时触发
const handleContentChange = (data) => {
  console.log('富文本内容:', data)
  formData.content = data.html
}
// 富文本编辑创建时触发
const editorInstance = ref(null)
const handleEditorCreated = (editor) => {
  console.log('富文本编辑创建时触发:', editor)
  editorInstance.value = editor
  if(formData.content && editor) {
    nextTick(() => {
      editor.setHtml(formData.content)
    })
  }
}

const btnPreview = ref(false)

// 提交
const formRef = ref()
const loading = ref(false)
const handleSubmit = () => {
  // 表单校验
  formRef.value.validate((valid,fields)=>{
    if(valid) {
      loading.value = true
    }
    console.log(formData,'formData')
    const submitDara = {
      ...formData,
      tags: formData.tagArray?.join(',') || ''
    }
    delete submitDara.tagArray
    if(!isEdit.value){
      submitDara.id = businessId.value
      createArticle(submitDara).then(res => {
        loading.value = false
        emit('success')
      })
    }else {
      updateArticle(formData.id, submitDara).then(res => {
        loading.value = false
        emit('success')
      })
    }
    
  })
}
</script>

<style scoped lang="scss">
.cover-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 120px;
  color: #8b949e;
  background-color: #f6f8fa;
}
.cover-image {
  width: 200px;
  height: 120px;
  display: block;
}
</style>

