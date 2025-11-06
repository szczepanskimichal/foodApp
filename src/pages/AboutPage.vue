<script setup lang="ts">
import { ref } from 'vue'
import ContactModal from '../components/ui/ContactModal.vue'
import JobApplicationModal from '../components/ui/JobApplicationModal.vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const showContactModal = ref(false)
const showJobModal = ref(false)

const contactUs = () => {
  showContactModal.value = true
}

// const joinTeam = () => {
//   showJobModal.value = true
// }

const closeContactModal = () => {
  showContactModal.value = false
}

const closeJobModal = () => {
  showJobModal.value = false
}
</script>
<template>
  <div class="about-page">
    <h1>{{ t('about.title') }}</h1>
    <div class="about-content">
      <section class="story">
        <h2>Our Story</h2>
        <p>Founded in 2025, The Burger Truck started as a small food truck with a big dream: to serve the best gourmet burgers on wheels. Our passion for quality ingredients and unique flavors has driven us to create a menu that delights burger lovers everywhere.</p>
      </section>
      <section class="mission">
        <h2>Our Mission</h2>
        <p>At The Burger Truck, our mission is to provide an unforgettable dining experience through our delicious burgers, exceptional customer service, and commitment to sustainability. We believe in using locally sourced ingredients and eco-friendly practices to make a positive impact on our community.</p>
      </section>
      <section class="team">
        <h2>Meet the Team</h2>
        <div class="team-grid">
          <div class="team-member">
            <!-- <h3>Michal Jerzak</h3> -->
            <p>Founder & CEO</p>
          </div>
          <div class="team-member">
            <h3>Michal Szczepanski</h3>
            <p>Co-Founder & CTO</p>
          </div>
          <div class="team-member">
            <!-- <h3>Michal Jerzak</h3> -->
            <p>Head Chef</p>
          </div>
          <div class="team-member">
            <!-- <h3>Silje Vestrum Bakken</h3> -->
            <p>Marketing Specialist</p>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary" @click="contactUs">
            {{ t('about.contactUs') }} 📞
          </button>
          <!-- <button class="btn btn-secondary" @click="joinTeam">
            {{ t('about.joinTeam') }} 👨‍🍳
          </button> -->
        </div>
      </section>
    </div>
    
    <!-- Modals -->
    <ContactModal :isOpen="showContactModal" @close="closeContactModal" />
    <JobApplicationModal :isOpen="showJobModal" @close="closeJobModal" />
  </div>
</template>
<style scoped>
.about-page {
  padding: 2rem 0;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.about-content section {
  margin-bottom: 4rem;
}

.about-content h1 {
  text-align: center;
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.about-content h2 {
  color: #dc2626;
  margin-bottom: 1.5rem;
  font-size: 1.875rem;
  font-weight: 600;
  text-align: center;
}

.about-content p {
  line-height: 1.7;
  color: #4b5563;
  font-size: 1.1rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.team-member {
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.team-member h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.team-member p {
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #dc2626;
  color: white;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.btn-primary:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #dc2626;
  border: 2px solid #dc2626;
}

.btn-secondary:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-content h1 {
    font-size: 2rem;
  }
  
  .about-content h2 {
    font-size: 1.5rem;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}

/* Dark Mode Styles */
body.dark-mode .about-page {
  background: #1a1a1a !important;
  color: #e5e5e5 !important;
}

body.dark-mode .about-content h1 {
  color: #e5e5e5 !important;
}

body.dark-mode .about-content h2 {
  color: #dc2626 !important;
}

body.dark-mode .about-content p {
  color: #b3b3b3 !important;
}

body.dark-mode .team-member {
  background: #2d2d2d !important;
  border: 1px solid #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .team-member:hover {
  background: #353535 !important;
  border-color: #555555 !important;
}

body.dark-mode .team-member h3 {
  color: #e5e5e5 !important;
}

body.dark-mode .team-member p {
  color: #b3b3b3 !important;
}
</style>