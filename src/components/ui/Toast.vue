<template>
  <!-- 
    Transition wrapper - dodaje animacje pojawiania/znikania toasta
    "appear" oznacza że animacja uruchomi się od razu przy renderowaniu
  -->
  <Transition name="toast" appear>
    <!-- 
      Główny kontener toasta - renderuje się tylko gdy visible=true
      Dynamiczne klasy: bazowa 'toast' + specyficzna dla typu np. 'toast-success'
      @click="close" - kliknięcie w toast zamyka go
    -->
    <div 
      v-if="visible" 
      :class="['toast', `toast-${type}`]"
      @click="close"
    >
      <!-- Ikona po lewej stronie - różne symbole dla różnych typów -->
      <div class="toast-icon">
        <span v-if="type === 'success'">✓</span>        
        <span v-else-if="type === 'error'">✗</span>     
        <span v-else-if="type === 'warning'">⚠</span>   
        <span v-else>ℹ</span>                           
      </div>
      
      <!-- Główna treść toasta - tekst wiadomości -->
      <div class="toast-content">
        <p class="toast-message">{{ message }}</p>
      </div>
      
      <!-- Przycisk zamykania (X) - @click.stop żeby nie triggerował @click z diva wyżej -->
      <button class="toast-close" @click="close">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Interfejs propsów - definiuje jakie dane może przyjąć komponent
interface Props {
  message: string                                        
  type?: 'success' | 'error' | 'warning' | 'info'      
  duration?: number                                      
}

// Ustawiamy propsy z wartościami domyślnymi
const props = withDefaults(defineProps<Props>(), {
  type: 'info',        
  duration: 4000       
})

// Definiujemy event który komponent może emitować
const emit = defineEmits<{
  close: []           
}>()

// Reaktywna zmienna kontrolująca widoczność toasta
const visible = ref(false)

// Funkcja zamykająca toast
const close = () => {
  visible.value = false                    
  setTimeout(() => {                       
    emit('close')                          
  }, 300)                                  
}

// Hook wykonywany po zamontowaniu komponentu
onMounted(() => {
  visible.value = true                     
  
  // Jeśli duration > 0, ustaw automatyczne zamykanie
  if (props.duration > 0) {
    setTimeout(() => {
      close()                              
    }, props.duration)
  }
})
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  min-width: 300px;
  max-width: 500px;
  cursor: pointer;
  position: relative;
}

.toast-success {
  border-left-color: #10b981;
  background: #f0fdf4;
}

.toast-error {
  border-left-color: #ef4444;
  background: #fef2f2;
}

.toast-warning {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.toast-info {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
}

.toast-success .toast-icon {
  background: #10b981;
  color: white;
}

.toast-error .toast-icon {
  background: #ef4444;
  color: white;
}

.toast-warning .toast-icon {
  background: #f59e0b;
  color: white;
}

.toast-info .toast-icon {
  background: #3b82f6;
  color: white;
}

.toast-content {
  flex: 1;
}

.toast-message {
  margin: 0;
  font-weight: 500;
  color: #1f2937;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Dark Mode Styles */
body.dark-mode .toast {
  background: #2d2d2d !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}

body.dark-mode .toast-success {
  background: rgba(16, 185, 129, 0.1) !important;
}

body.dark-mode .toast-error {
  background: rgba(239, 68, 68, 0.1) !important;
}

body.dark-mode .toast-warning {
  background: rgba(245, 158, 11, 0.1) !important;
}

body.dark-mode .toast-info {
  background: rgba(59, 130, 246, 0.1) !important;
}

body.dark-mode .toast-message {
  color: #e5e5e5 !important;
}

body.dark-mode .toast-close {
  color: #b3b3b3 !important;
}

body.dark-mode .toast-close:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #e5e5e5 !important;
}
</style>