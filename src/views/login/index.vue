<template>
  <div class="login flex-center">
    <el-form ref="formRef" :model="user" class="login-form" @submit.prevent="handleSubmit">
      <h1 class="login-title">登录</h1>
      <el-form-item prop="account" :rules="rules.change">
        <el-input v-model.number="user.account" type="text">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="rules.change">
        <el-input v-model.number="user.password" type="text">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" native-type="submit"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { login, randomString } from '@/api/common';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import CryptoJS from 'crypto-js';
import { loginData } from './data';
import { initWaterMark } from '@/utils/watermark';
import { Local } from '@/utils/storage';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const formRef = ref(null);
const rules = ref({
  change: [{ required: true, message: '请输入', trigger: 'change' }],
});
const loading = ref(false);
const user = reactive({
  account: 'admin',
  password: undefined,
});

const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return false;
  }
  loading.value = true;

  // const data = await login(user).finally(() => {
  //   loading.value = false;
  // });
  const data = loginData;
  userStore.setUser({ ...data.user, token: data.token });

  // 设置子应用数据
  Local.set('/base-app/user', { ...data.user, token: data.token }); // base-app user数据

  loading.value = false;

  let redirect = route.query.redirect || '/';
  if (typeof redirect !== 'string') {
    redirect = '/';
  }
  router.replace(redirect);
};

onMounted(() => {
  initWaterMark('');
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-color: $main;
  background-image: url('@/assets/images/login/bg.jpg');
  background-size: cover;
  justify-content: end;

  .login-form {
    margin-right: 80px;
    width: 300px;
    border-radius: 5%;
    padding: 15px;
    background-color: rgba($color: $main, $alpha: 0.1);

    .login-title {
      color: $color;
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
