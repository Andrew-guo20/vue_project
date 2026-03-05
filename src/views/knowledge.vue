<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">编辑</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
  </div>
</template>

<script setup name="knowledge">
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'

const handleSearch = (formData) => {
  console.log(formData,'查询参数')
}

const formItem = [
  { comp:'input',props:'title',label:'文章标题',placeholder:'请输入文章标题'},
  { comp:'select',props:'catagoryId',label:'分类',placeholder:'请选择分类',
    options:[
      { label:'心理健康基础', value:1},
      { label:'情绪管理', value:2},
    ]
  },
]
</script>
