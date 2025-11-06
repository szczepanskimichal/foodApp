<template>
  <div v-if="!isConfigured" class="config-warning">
    <div class="warning-icon">⚠️</div>
    <div class="warning-content">
      <h3>EmailJS Not Configured</h3>
      <p>Email sending is not set up yet. Please check EMAILJS_SETUP.md for configuration instructions.</p>
      <details class="config-details">
        <summary>Quick Setup Guide</summary>
        <ol>
          <li>Create account at <a href="https://emailjs.com" target="_blank">emailjs.com</a></li>
          <li>Add Gmail service for michalszczepanski07@gmail.com</li>
          <li>Create email templates (see EMAILJS_SETUP.md)</li>
          <li>Update SERVICE_ID and PUBLIC_KEY in useEmailJS.ts</li>
        </ol>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmailJS } from '../../composables/useEmailJS'

const { isConfigured } = useEmailJS()
</script>

<style scoped>
.config-warning {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 2px solid #f59e0b;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.warning-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.warning-content {
  flex: 1;
}

.warning-content h3 {
  color: #92400e;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.warning-content p {
  color: #78350f;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.config-details {
  margin-top: 1rem;
}

.config-details summary {
  color: #92400e;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
}

.config-details ol {
  margin: 0.5rem 0 0 1rem;
  color: #78350f;
}

.config-details li {
  margin: 0.5rem 0;
  line-height: 1.4;
}

.config-details a {
  color: #dc2626;
  text-decoration: none;
  font-weight: 600;
}

.config-details a:hover {
  text-decoration: underline;
}
</style>