<template>
  <div class="backend-layout">
    <el-container class="mian-container">
      <Sidebar/>
      <el-container>
        <el-header>
          <Navbar/>
        </el-header>
        <el-main class="main-content">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue' 
import Navbar from './Navbar.vue'
</script>

<style lang="scss" scoped>
.backend-layout {
  height: 100vh;
  .el-header {
    height: 74px!important;  // 由于element默认高度为50px，需要自定义高度为74px
  }
  .mian-container {
    height: 100%;
    .content-container {
      padding: 20px;
      min-height: calc(100% - 74px);
      background-color: #fff;
    }
  }
}
</style>
