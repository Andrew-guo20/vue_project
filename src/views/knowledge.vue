<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit({})">新增</el-button>
        <!-- <el-button type="primary">编辑</el-button> -->
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <el-table :data="tableData" style="width: 100%;margin-top: 25px;">
      <el-table-column label="文章标题" fixed="left" width="300">
        <template #default="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex;align-items: center;">
            <el-icon><timer/></el-icon>
            <span>{{scope.row.title}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150"/>
      <el-table-column prop="readCount" label="阅读量" width="150"/>
      <el-table-column prop="updatedAt" label="发布时间" width="150"/>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
          <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 2" text type="success">发布</el-button>
          <el-button @click="handleUnpublish(scope.row)" v-if="scope.row.status === 1" text type="warning">下线</el-button>
          <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px;"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
    <!-- :modelValue  动态参数-->
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories" @success="handleSuccess"/>
  </div>
</template>

<script setup name="knowledge">
import { onMounted, ref ,reactive} from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, articlePage ,getArticleDetail,changeArticleStatus,deleteArticle} from '@/api/admin'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox,ElMessage } from 'element-plus'

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categories = ref([])

// 新增和编辑
const dialogVisible = ref(false)
const currentArticle = ref(null)
// 新增成功后刷新列表
const handleSuccess = () => {
  dialogVisible.value = false
  ElMessage.success('操作成功')
  // 刷新列表
  handleSearch()
}
const handleEdit = (row) => {
  console.log(row,'row')
  if(!row.id) {
    currentArticle.value = null
    dialogVisible.value = true
  }else {
    getArticleDetail(row.id).then(res => {
    console.log('res12343',res)
    currentArticle.value = res
    dialogVisible.value = true
  })
  }
}
// 发布文章
const handlePublish = (row)=>{
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`, '确认', {
    confirmButtonText: '确认发布',
    cancelButtonText: '取消',
    type: 'info'
  }).then(() => {
      changeArticleStatus(row.id,{status:1}).then(res => {
      ElMessage.success('发布成功')
      handleSearch()
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消发布'
    });
  });
}
// 下线文章
const handleUnpublish =(row) =>{
   ElMessageBox.confirm(`确认下线文章${row.title}吗？`, '确认', {
    confirmButtonText: '确认下线',
    cancelButtonText: '取消',
    type: 'info'
  }).then(() => {
      changeArticleStatus(row.id,{status:2}).then(res => {
      ElMessage.success('下线成功')
      handleSearch()
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消发布'
    });
  });
}

// 删除文章
const handleDelete = (row)=>{
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`, '确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'danger'
  }).then(() => {
    deleteArticle(row.id).then(res => {
      ElMessage.success('删除成功')
      handleSearch()
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
}

onMounted(async () => {
  try {
    const res = await categoryTree()
    categories.value = res.map(item => {
      categoryMap[item.id] = item.categoryName
      return {
        label:item.categoryName,
        value:item.id
      }
    })
    formItem[1].options = categories.value

    // 获取列表
    handleSearch({})
  } catch (error) {
    console.error('获取分类失败:', error)
  }
})

// 分页参数
const pagination = reactive({
  currentPage:1,
  size:10,
  total:0,
})

// 列表数据
const tableData = ref([])
// - 当用户在 TableSearch 组件中点击搜索按钮时，组件会触发 search 事件
// - 事件参数就是用户在表单中输入的所有数据
const handleSearch = async (formData = {}) => {
  try {
    const params = {
      ...pagination,
      ...formData,
    }
    console.log('请求参数:', params)
    const {records,total} = await articlePage(params)
    tableData.value = records
    pagination.total = total
  } catch (error) {
    console.error('查询文章失败:', error)
  }
}

// 分页改变时触发
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

const formItem = [
  { comp:'input',props:'title',label:'文章标题',placeholder:'请输入文章标题'},
  { comp:'select',props:'catagoryId',label:'分类',placeholder:'请选择分类'},
  { comp:'select',props:'status',label:'状态',placeholder:'请输入状态',
    options: [
      { label:'草稿', value:'0' },
      { label:'已发布', value:'1' },
      { label:'已下线', value:'2' },
    ]
  },
]
</script>
