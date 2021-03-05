<template>
  <div class="login-section">
    <el-form 
      label-position="top"
      :rules="rules"
      :model="ruleForm" status-icon 
      ref="ruleForm" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
<<<<<<< HEAD
import {login} from '@/service/api';
=======
import {login} from '@/service/api.js'
>>>>>>> again2

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
<<<<<<< HEAD
        // true 
        if (valid) {
          login({
            name: this.ruleForm.name,
            password: this.ruleForm.password
          }).then((data) => {
            if(data.code === 0) {  // 登录成功
              // 拿到后端返回的token存到localStorage
              localStorage.setItem('token', data.data.token);
              // 跳转到首页
              window.location.href = '/';
            }
            if(data.code === 1){  // 失败
              this.$message.error(data.mes);
            }
          })
=======
        
        if (valid) {
          // 在这里向后端发送登录用户名和密码

          login({
            name: this.ruleForm.name,
            password: this.ruleForm.password,
          }).then((data) => {
            if(data.code === 1){
              this.$message.error(data.mes);
              return;
            }
            localStorage.setItem('token', data.data.token);
            window.location.href = '/'
          })
          
>>>>>>> again2
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
