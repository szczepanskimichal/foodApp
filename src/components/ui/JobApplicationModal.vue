<template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Join Our Team 👨‍🍳</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      
      <form @submit.prevent="submitForm" class="job-form">
        <div class="form-group">
          <label for="fullName">Full Name *</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="form.fullName" 
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
          <label for="phone">Phone *</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="form.phone" 
            required 
            placeholder="+47 123 45 678"
          />
        </div>
        
        <div class="form-group">
          <label for="position">Position of Interest *</label>
          <select id="position" v-model="form.position" required>
            <option value="">Select a position</option>
            <option value="chef">Chef / Cook</option>
            <option value="cashier">Cashier</option>
            <option value="driver">Food Truck Driver</option>
            <option value="assistant">Kitchen Assistant</option>
            <option value="manager">Manager</option>
            <option value="marketing">Marketing Assistant</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="experience">Years of Experience</label>
          <select id="experience" v-model="form.experience">
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years (Entry level)</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years (Senior)</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="availability">Availability *</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.availability" value="mornings" />
              Mornings (8:00-14:00)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.availability" value="afternoons" />
              Afternoons (14:00-20:00)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.availability" value="evenings" />
              Evenings (20:00-23:00)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.availability" value="weekends" />
              Weekends
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="coverLetter">Why do you want to join our team? *</label>
          <textarea 
            id="coverLetter" 
            v-model="form.coverLetter" 
            required 
            rows="4"
            placeholder="Tell us about your passion for food, customer service experience, or what excites you about working with our team..."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting || !isFormValid">
            {{ isSubmitting ? 'Submitting...' : 'Submit Application' }} 📝
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

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
const { sendJobApplication, isConfigured } = useEmailJS()

const isSubmitting = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  availability: [] as string[],
  coverLetter: ''
})

const isFormValid = computed(() => {
  return form.fullName.trim() && 
         form.email.trim() && 
         form.phone.trim() && 
         form.position && 
         form.availability.length > 0 && 
         form.coverLetter.trim()
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.position = ''
  form.experience = ''
  form.availability = []
  form.coverLetter = ''
}

const submitForm = async () => {
  if (!isFormValid.value) {
    showWarning('Please fill in all required fields')
    return
  }

  // Sprawdź czy EmailJS jest skonfigurowane
  if (!isConfigured()) {
    showWarning('Email service is not configured yet. Your application has been logged.')
    console.log('Job Application Submission (EmailJS not configured):', {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      position: form.position,
      experience: form.experience || 'Not specified',
      availability: form.availability,
      coverLetter: form.coverLetter,
      timestamp: new Date().toISOString()
    })
    showSuccess(`Thank you ${form.fullName}! Your application has been received. We'll review it and get back to you within 3-5 business days! 🎉`)
    closeModal()
    return
  }
  
  isSubmitting.value = true
  
  try {
    const result = await sendJobApplication({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      position: form.position,
      experience: form.experience,
      availability: form.availability,
      coverLetter: form.coverLetter
    })
    
    if (result.success) {
      showSuccess(`Thank you ${form.fullName}! Your application has been sent to michalszczepanski07@gmail.com. We'll review it and get back to you within 3-5 business days! 🎉`)
      closeModal()
    } else {
      throw new Error('Failed to send application')
    }
  } catch (error) {
    console.error('Job application error:', error)
    showError('Failed to submit application. Please try again later or contact us directly.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

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
  max-width: 600px;
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

.job-form {
  padding: 0 1.5rem 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
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

.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal !important;
  margin-bottom: 0 !important;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.checkbox-label:hover {
  background: #f9fafb;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
  accent-color: #dc2626;
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
  min-width: 140px;
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
  .checkbox-group {
    grid-template-columns: 1fr;
  }
  
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
body.dark-mode .form-textarea,
body.dark-mode .form-select {
  background: #1a1a1a !important;
  border-color: #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .form-input:focus,
body.dark-mode .form-textarea:focus,
body.dark-mode .form-select:focus {
  border-color: #dc2626 !important;
  background: #2d2d2d !important;
}

body.dark-mode .checkbox-group label {
  color: #b3b3b3 !important;
}

body.dark-mode .checkbox-group input[type="checkbox"]:checked + label {
  color: #e5e5e5 !important;
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