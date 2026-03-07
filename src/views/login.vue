<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon><Back/></el-icon>
        <span>返回首页</span>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>请输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form 
        ref="ruleFormRef" 
        :model="formData" 
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input v-model="formData.username" size="large" placeholder="请输入用户名或邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-button class="btn" size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Back } from '@element-plus/icons-vue';
// 引入登录接口
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'

// - 在模板中通过 ref="ruleFormRef" 绑定到 <el-form> 组件
// - 这样可以在脚本中访问到表单的实例对象
const ruleFormRef = ref()

const formData = ref({
  username: '',
  password: ''
})

// 表单验证规则 是否必填required
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

// 登录
const router = useRouter()
const submitForm = async (formRef) => {
  if(!formRef) return
  await formRef.validate((valid) => {
    if (valid) {
      console.log(formData)
      login(formData.value).then(res => {
        // 判断token是否存在
        if(!res.token) {
          return console.error('登录失败')
        }
        // 登录成功，保存token和用户信息
        localStorage.setItem('token', res.token)
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo))

        // 根据用户角色决定跳转的路径
        if(res.userInfo.userType === 2) {
          console.log(1111)
          router.push('/back/dashboard')
        } else {
          router.push('/')
        }
      })
    } else {
      console.log('表单验证失败')
    }
  })
}


</script>

<style lang="scss" scoped>
.container {
  width:384px;
  .title {
    .back-home {
      margin-bottom: 60px;
    }
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
  .form-container {
    margin-top: 30px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>