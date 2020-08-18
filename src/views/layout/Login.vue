<template>
  <div class="login">
    <a-form-model class="login-form"
                  ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="账号" prop="email">
        <a-input type="email" v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">Reset</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const emailReg = /^[\w-]+@[\w-]+\.com$/;
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else if (!emailReg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm).then((res) => {
            console.log(res);
            this.$store.dispatch('setUser', res);
            this.$router.push({
              name: 'Home',
            });
          }).catch((err) => {
            console.log(err);
            this.$message.error(err);
          });
          return false;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/login.less');
</style>
