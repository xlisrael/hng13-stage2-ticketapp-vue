<template>
  <main class="container tickets-page">
    <h1>Ticket Management</h1>

    <form class="ticket-form" @submit.prevent="handleSubmit" novalidate>
      <div class="form-row">
        <label>
          <span>Title</span>
          <input name="title" v-model="form.title" @input="handleChange" aria-describedby="err-title" />
          <div class="error" id="err-title">{{ errors.title }}</div>
        </label>

        <label>
          <span>Status</span>
          <select name="status" v-model="form.status" @change="handleChange" aria-describedby="err-status">
            <option v-for="status in STATUS_VALUES" :key="status" :value="status">{{ status }}</option>
          </select>
          <div class="error" id="err-status">{{ errors.status }}</div>
        </label>
      </div>

      <label>
        <span>Priority</span>
        <select name="priority" v-model="form.priority" @change="handleChange">
          <option value="low">low</option>
          <option value="normal">normal</option>
          <option value="high">high</option>
        </select>
      </label>

      <label>
        <span>Description</span>
        <textarea name="description" v-model="form.description" @input="handleChange" aria-describedby="err-desc" />
        <div class="error" id="err-desc">{{ errors.description }}</div>
      </label>

      <div class="form-actions">
        <button class="btn" type="submit">{{ editing ? 'Update Ticket' : 'Create Ticket' }}</button>
        <button type="button" class="btn-ghost" @click="resetForm">Reset</button>
      </div>
    </form>

    <div v-if="message" :class="`msg ${message.type}`">{{ message.text }}</div>

    <section class="tickets-list" aria-live="polite">
      <p v-if="tickets.length === 0">No tickets yet — create one above.</p>
      <TicketCard
        v-else
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getTickets, createTicket, updateTicket, deleteTicket } from '../utils/storage'
import TicketCard from '../components/TicketCard.vue'

const STATUS_VALUES = ["open", "in_progress", "closed"]

export default {
  name: 'Tickets',
  components: {
    TicketCard
  },
  setup() {
    const tickets = ref([])
    const editing = ref(null)
    const form = ref({ title: "", description: "", status: "open", priority: "normal" })
    const errors = ref({})
    const message = ref(null)

    onMounted(() => {
      tickets.value = getTickets()
    })

    const resetForm = () => {
      form.value = { title: "", description: "", status: "open", priority: "normal" }
      editing.value = null
      errors.value = {}
    }

    const validate = () => {
      const e = {}
      if (!form.value.title.trim()) e.title = "Title is required"
      if (!STATUS_VALUES.includes(form.value.status)) e.status = "Invalid status"
      if (form.value.description && form.value.description.length > 1000) e.description = "Description too long"
      if (form.value.description && form.value.description.length < 10) e.description = "Description must be at least 10 characters"
      return e
    }

    const handleChange = (e) => {
      form.value = {...form.value, [e.target.name]: e.target.value}
    }

    const handleSubmit = (e) => {
      const eObj = validate()
      errors.value = eObj
      if (Object.keys(eObj).length) return

      try {
        if (editing.value) {
          updateTicket(editing.value.id, form.value)
          message.value = { type: "success", text: "Ticket updated" }
        } else {
          createTicket(form.value)
          message.value = { type: "success", text: "Ticket created" }
        }
        tickets.value = getTickets()
        resetForm()
        setTimeout(() => message.value = null, 3000)
      } catch (err) {
        message.value = { type: "error", text: err.message || "Failed to save" }
      }
    }

    const handleEdit = (ticket) => {
      editing.value = ticket
      form.value = { title: ticket.title, description: ticket.description || "", status: ticket.status, priority: ticket.priority || "normal" }
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleDelete = (id) => {
      if (!confirm("Delete this ticket?")) return
      try {
        deleteTicket(id)
        tickets.value = getTickets()
        message.value = { type: "success", text: "Ticket deleted" }
        setTimeout(() => message.value = null, 3000)
      } catch (err) {
        message.value = { type: "error", text: "Failed to delete" }
      }
    }

    return {
      STATUS_VALUES,
      tickets,
      editing,
      form,
      errors,
      message,
      resetForm,
      handleChange,
      handleSubmit,
      handleEdit,
      handleDelete
    }
  }
}
</script>