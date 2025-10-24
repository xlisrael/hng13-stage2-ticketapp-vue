<template>
  <main class="container dashboard-page">
    <h1>Dashboard</h1>

    <div class="stats-grid" role="region" aria-label="ticket summary">
      <div class="stat-card">
        <h3>Total</h3>
        <p>{{ total }}</p>
      </div>
      <div class="stat-card">
        <h3>Open</h3>
        <p>{{ open }}</p>
      </div>
      <div class="stat-card">
        <h3>In Progress</h3>
        <p>{{ inProgress }}</p>
      </div>
      <div class="stat-card">
        <h3>Resolved</h3>
        <p>{{ resolved }}</p>
      </div>
    </div>

    <div class="dash-actions">
      <button class="btn" @click="goToTickets">Manage Tickets</button>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTickets } from '../utils/storage'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const tickets = ref([])
    
    const total = ref(0)
    const open = ref(0)
    const resolved = ref(0)
    const inProgress = ref(0)

    onMounted(() => {
      tickets.value = getTickets()
      total.value = tickets.value.length
      open.value = tickets.value.filter(t => t.status === "open").length
      resolved.value = tickets.value.filter(t => t.status === "closed").length
      inProgress.value = tickets.value.filter(t => t.status === "in_progress").length
    })

    const goToTickets = () => {
      router.push('/tickets')
    }

    return {
      total,
      open,
      resolved,
      inProgress,
      goToTickets
    }
  }
}
</script>