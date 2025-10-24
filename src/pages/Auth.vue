<template>
  <main class="auth-page container">
    <h1>{{ isLogin ? 'Login' : 'Create an account' }}</h1>
    <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
      <label v-if="!isLogin">
        <span>Full name</span>
        <input name="name" v-model="form.name" aria-describedby="err-name" />
        <div class="error" id="err-name">{{ errors.name }}</div>
      </label>

      <label>
        <span>Email</span>
        <input name="email" v-model="form.email" aria-describedby="err-email" />
        <div class="error" id="err-email">{{ errors.email }}</div>
      </label>

      <label>
        <span>Password</span>
        <input name="password" type="password" v-model="form.password" aria-describedby="err-pass" />
        <div class="error" id="err-pass">{{ errors.password }}</div>
      </label>

      <div v-if="serverMsg" class="error" role="alert">{{ serverMsg }}</div>

      <div class="auth-actions">
        <button class="btn" type="submit">{{ isLogin ? 'Login' : 'Sign up' }}</button>
      </div>
    </form>
  </main>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login, signup } from '../utils/auth'

export default {
  name: 'Auth',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const isLogin = computed(() => route.params.mode === 'login')
    
    const form = ref({ name: '', email: '', password: '' })
    const errors = ref({})
    const serverMsg = ref(null)

    const handleChange = (e) => {
      form.value = { ...form.value, [e.target.name]: e.target.value }
    }

    const handleSubmit = async (e) => {
      errors.value = {}
      serverMsg.value = null

      // basic validation
      const errs = {}
      if (!isLogin.value && !form.value.name.trim()) errs.name = "Full name required"
      if (!form.value.email.trim()) errs.email = "Email required"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) errs.email = "Email invalid"
      if (!form.value.password || form.value.password.length < 4) errs.password = "Password too short"

      if (Object.keys(errs).length) {
        errors.value = errs
        return
      }

      try {
        if (isLogin.value) {
          login({ email: form.value.email, password: form.value.password })
        } else {
          signup({ name: form.value.name, email: form.value.email, password: form.value.password })
        }
        router.push('/dashboard')
      } catch (err) {
        serverMsg.value = err.message || "Authentication failed"
      }
    }

    return {
      isLogin,
      form,
      errors,
      serverMsg,
      handleChange,
      handleSubmit
    }
  }
}
</script>