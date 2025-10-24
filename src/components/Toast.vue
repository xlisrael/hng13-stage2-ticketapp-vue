<template>
  <div role="status" aria-live="polite" :class="`toast toast-${type}`">
    {{ message }}
    <button aria-label="close notification" @click="handleClose">✕</button>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'Toast',
  props: {
    id: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'error', 'warning'].includes(value)
    },
    onClose: {
      type: Function
    }
  },
  setup(props) {
    onMounted(() => {
      const t = setTimeout(() => {
        props.onClose && props.onClose(props.id)
      }, 4500)
      return () => clearTimeout(t)
    })

    const handleClose = () => {
      props.onClose && props.onClose(props.id)
    }

    return {
      handleClose
    }
  }
}
</script>