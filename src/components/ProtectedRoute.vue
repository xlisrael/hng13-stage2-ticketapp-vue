<template>
  <router-view v-if="isAuthenticated" />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../utils/auth'

export default {
  name: 'ProtectedRoute',
  setup() {
    const router = useRouter()
    const isAuthenticated = ref(false)

    onMounted(() => {
      isAuthenticated.value = isAuthenticated()
      if (!isAuthenticated.value) {
        router.replace('/auth/login')
      }
    })

    return {
      isAuthenticated
    }
  }
}
</script>