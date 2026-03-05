<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">编辑</el-button>
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
      <el-table-column prop="publishedAt" label="发布时间" width="150"/>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">编辑</el-button>
          <el-button v-if="scope.row.status === 0 || scope.row.status === 2" text type="success">发布</el-button>
          <el-button v-if="scope.row.status === 1" text type="warning">下线</el-button>
          <el-button text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup name="knowledge">
import { onMounted, ref ,reactive} from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, articlePage } from '@/api/admin'

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categories = ref([])

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
  console.log('formData:', formData)
  console.log('pagination:', pagination)
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
