<template>
  <article class="ticket-card" aria-labelledby="`t-${ticket.id}`">
    <div class="ticket-top">
      <h3 :id="`t-${ticket.id}`">{{ ticket.title }}</h3>
      <span class="status-pill" :style="{ background: STATUS_COLORS[ticket.status] }">
        {{ ticket.status.replace('_', ' ') }}
      </span>
    </div>
    <p class="ticket-desc">{{ ticket.description }}</p>
    <div class="ticket-meta">
      <small>Priority: {{ ticket.priority || 'normal' }}</small>
      <div class="ticket-actions">
        <button class="btn-sm" @click="handleEdit">Edit</button>
        <button class="btn-sm danger" @click="handleDelete">Delete</button>
      </div>
    </div>
  </article>
</template>

<script>
const STATUS_COLORS = {
  open: "var(--status-open)",
  in_progress: "var(--status-progress)",
  closed: "var(--status-closed)"
}

export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props, { emit }) {
    const handleEdit = () => {
      emit('edit', props.ticket)
    }

    const handleDelete = () => {
      emit('delete', props.ticket.id)
    }

    return {
      STATUS_COLORS,
      handleEdit,
      handleDelete
    }
  }
}
</script>