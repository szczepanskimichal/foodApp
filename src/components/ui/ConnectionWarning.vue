<template>
  <div v-if="isSlowConnection" class="connection-warning">
    <div class="warning-content">
      <span class="warning-icon">⚠️</span>
      <span class="warning-text">
        {{ t('connection.slowDetected') }}
      </span>
      <button @click="hideWarning" class="close-btn">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useImageOptimization } from '../../composables/useImageOptimization'
import { useI18n } from '../../composables/useI18n'

const { isSlowConnection } = useImageOptimization()
const { t } = useI18n()
const isVisible = ref(true)

const hideWarning = () => {
  isVisible.value = false
}
</script>

<style scoped>
.connection-warning {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-width: 320px;
}

.warning-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-icon {
  font-size: 18px;
}

.warning-text {
  flex: 1;
  font-size: 14px;
  color: #92400e;
}

.close-btn {
  background: none;
  border: none;
  color: #92400e;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #fbbf24;
  border-radius: 50%;
}

/* Dark mode */
body.dark-mode .connection-warning {
  background: #451a03;
  border-color: #d97706;
}

body.dark-mode .warning-text {
  color: #fed7aa;
}

body.dark-mode .close-btn {
  color: #fed7aa;
}

body.dark-mode .close-btn:hover {
  background: #d97706;
}
</style>