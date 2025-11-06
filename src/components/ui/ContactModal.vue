<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useToast } from '../../composables/useToast'
import { useEmailJS } from '../../composables/useEmailJS'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const { showSuccess, showError, showWarning } = useToast()
const { sendContactEmail, isConfigured } = useEmailJS()

const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isFormValid = computed(() => {
  return form.name.trim() && 
         form.email.trim() && 
         form.subject && 
         form.message.trim()
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
}

const submitForm = async () => {
  if (!isFormValid.value) {
    showWarning('Please fill in all required fields')
    return
  }

  // Sprawdź czy EmailJS jest skonfigurowane
  if (!isConfigured()) {
    showWarning('Email service is not configured yet. Your message has been logged.')
    console.log('Contact Form Submission (EmailJS not configured):', {
      name: form.name,
      email: form.email,
      phone: form.phone || 'Not provided',
      subject: form.subject,
      message: form.message,
      timestamp: new Date().toISOString()
    })
    showSuccess(`Thank you ${form.name}! Your message has been received. We'll get back to you soon! 📧`)
    closeModal()
    return
  }
  
  isSubmitting.value = true
  
  try {
    const result = await sendContactEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message
    })
    
    if (result.success) {
      showSuccess(`Thank you ${form.name}! Your message has been sent to michalszczepanski07@gmail.com. We'll get back to you soon! 📧`)
      closeModal()
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Contact form error:', error)
    showError('Failed to send message. Please try again later or contact us directly.')
  } finally {
    isSubmitting.value = false
  }
}
</script><template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Contact Us 📞</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name *</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required 
            placeholder="Your full name"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required 
            placeholder="your.email@example.com"
          />
        </div>
        
        <div class="form-group">
          <label for="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="form.phone" 
            placeholder="+47 123 45 678"
          />
        </div>
        
        <div class="form-group">
          <label for="subject">Subject *</label>
          <select id="subject" v-model="form.subject" required>
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="catering">Catering Services</option>
            <option value="complaint">Complaint</option>
            <option value="compliment">Compliment</option>
            <option value="partnership">Business Partnership</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message *</label>
          <textarea 
            id="message" 
            v-model="form.message" 
            required 
            rows="4"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting || !isFormValid">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }} ✉️
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  color: #dc2626;
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.contact-form {
  padding: 0 1.5rem 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background: #dc2626;
  color: white;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}

/* Dark Mode Styles */
body.dark-mode .modal-overlay {
  background: rgba(0, 0, 0, 0.8) !important;
}

body.dark-mode .modal-content {
  background: #2d2d2d !important;
  border: 1px solid #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .modal-header h2 {
  color: #e5e5e5 !important;
}

body.dark-mode .close-btn {
  color: #b3b3b3 !important;
}

body.dark-mode .close-btn:hover {
  color: #e5e5e5 !important;
  background: #404040 !important;
}

body.dark-mode .form-group label {
  color: #e5e5e5 !important;
}

body.dark-mode .form-input,
body.dark-mode .form-textarea {
  background: #1a1a1a !important;
  border-color: #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .form-input:focus,
body.dark-mode .form-textarea:focus {
  border-color: #dc2626 !important;
  background: #2d2d2d !important;
}

body.dark-mode .btn-secondary {
  background: transparent !important;
  color: #b3b3b3 !important;
  border-color: #404040 !important;
}

body.dark-mode .btn-secondary:hover {
  background: #404040 !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}
</style>