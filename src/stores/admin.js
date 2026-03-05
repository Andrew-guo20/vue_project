import { defineStore } from 'pinia'
import { ref } from 'vue'

// 组合式 API 定义 admin 状态管理模块
export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false)

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    toggleCollapse
  }
})

// 选项式 API 定义 admin 状态管理模块
// export const useAdminStore = defineStore('admin', {
//   state: () => ({
//     isCollapse: false
//   }),
//   actions: {
//     toggleCollapse() {
//       this.isCollapse = !this.isCollapse
//     }
//   }
// }) 