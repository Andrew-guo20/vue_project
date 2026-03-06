<template>
  <div>
    <pageHead title="咨询记录" />
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="会话ID" width="100">
        <template #default="scope">
          <el-avatar>{{ scope.row.userNickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="清晰日志">
        <template #default="scope">
          <div class="session-title">{{ scope.row.sessionTitle }}</div>
          <div class="session-preview">{{ scope.row.lastMessageContent }}</div>
        </template>
      </el-table-column>
      <el-table-column label="消息数" prop="messageCount" width="100"/>
      <el-table-column label="时间" prop="lastMessageTime" width="100"/>
      <el-table-column label="清晰日志" width="200">
        <template #default="scope">
          <el-button @click="viewSessionDetail(scope.row)" text type="primary" size="small">详情</el-button>
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
  </div>
</template>

<script setup>
import pageHead from '@/components/PageHead.vue'
import { reactive, ref ,onMounted } from 'vue'
import { getConsultations } from '@/api/admin'

const tableData = ref([])
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

// 查看会话详情
const viewSessionDetail = (row) => {
  console.log(row,'row')
}

// 分页改变时触发
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

// 封装列表查询方法
const handleSearch = ()=> {
  getConsultations(pagination).then(res => {
    const {records,total} = res
    console.log(records,'records')
    tableData.value = records
    pagination.total = total
  })
}

onMounted(() => {
  handleSearch()
})

</script>

