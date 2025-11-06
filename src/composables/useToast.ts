import { ref } from 'vue'

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const toasts = ref<ToastItem[]>([])

export const useToast = () => {
  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    toasts.value.push({ ...toast, id })
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const showSuccess = (message: string, duration = 4000) => {
    addToast({ message, type: 'success', duration })
  }

  const showError = (message: string, duration = 6000) => {
    addToast({ message, type: 'error', duration })
  }

  const showWarning = (message: string, duration = 5000) => {
    addToast({ message, type: 'warning', duration })
  }

  const showInfo = (message: string, duration = 4000) => {
    addToast({ message, type: 'info', duration })
  }

  const clearAll = () => {
    toasts.value = []
  }

  return {
    toasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAll
  }
}