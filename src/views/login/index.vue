<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts" name="Login">
import { LocationQuery } from 'vue-router'

let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
const redirect = ref('')
const loading = ref(false)
const otherQuery = ref({})
const route = useRoute()

const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      ;(acc as any)[cur] = query[cur]
    }
    return acc
  }, {})
}

const handleLogin = () => {
  console.log(111)
}

watch(
  route,
  (route) => {
    const query = route.query as { redirect: string }
    if (query) {
      redirect.value = query.redirect
      otherQuery.value = getOtherQuery(query)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
