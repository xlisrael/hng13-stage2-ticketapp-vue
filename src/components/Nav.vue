<template>
  <header class="site-nav" role="navigation" aria-label="main">
    <div class="container nav-inner">
      <div class="brand">
        <router-link to="/" class="brand-link">TicketApp</router-link>
      </div>

      <nav class="links" aria-label="main navigation">
        <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/dashboard" :class="{ active: $route.path === '/dashboard' }">Dashboard</router-link>
        <router-link to="/tickets" :class="{ active: $route.path === '/tickets' }">Tickets</router-link>
      </nav>

      <div class="actions">
        <router-link v-if="!auth" to="/auth/login" class="btn-outline">Login</router-link>
        <template v-else>
          <button @click="goToDashboard" class="btn">Dashboard</button>
          <button @click="handleLogout" class="btn-ghost">Logout</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, logout as authLogout } from '../utils/auth'
import { clearSession } from '../utils/storage'

export default {
  name: 'Nav',
  setup() {
    const router = useRouter()
    const auth = ref(false)

    onMounted(() => {
      auth.value = isAuthenticated()
    })

    const goToDashboard = () => {
      router.push('/dashboard')
    }

    const handleLogout = () => {
      authLogout()
      clearSession()
      auth.value = false
      router.push('/auth/login')
    }

    return {
      auth,
      goToDashboard,
      handleLogout
    }
  }
}
</script>