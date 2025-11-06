<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const { t } = useI18n()

const goToMenu = () => {
  setTimeout(() => {
    router.push('/menu')
  }, 500)
}

const goToReviews = () => {
  setTimeout(() => {
    router.push('/reviews')
  }, 500)
}
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-accent">Shmashing</span>Burger
          </h1>
          <h2 class="hero-subtitle">{{ t('home.heroTitle') }}</h2>
          <p class="hero-description">
            {{ t('home.heroSubtitle') }}
          </p>
          
          <div class="hero-buttons">
            <button class="btn btn-primary" @click="goToMenu">
              {{ t('home.heroButton') }} 🍟
            </button>
            <button class="btn btn-secondary" @click="goToReviews">
              {{ t('home.reviewsButton') }} ⭐
            </button>
          </div>
        </div>
        
        <div class="hero-image">
          <div class="burger-placeholder">
            🍔
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🥬</div>
            <h3>{{ t('home.featureQuality') }}</h3>
            <p>{{ t('home.featureQualityDesc') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>{{ t('home.featureFresh') }}</h3>
            <p>{{ t('home.featureFreshDesc') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">👨‍🍳</div>
            <h3>{{ t('home.featureFresh') }}</h3>
            <p>{{ t('home.featureFreshDesc') }}</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>{{ t('home.featureFast') }}</h3>
            <p>{{ t('home.featureFastDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Happy Customers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Events Served</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">4.9★</div>
            <div class="stat-label">Average Rating</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">15</div>
            <div class="stat-label">Menu Items</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Experience the Best Burgers?</h2>
          <p class="cta-description">
            Book our food truck for your next event or find us at one of our regular locations!
          </p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="goToMenu">
              Order Now 🍔
            </button>
            <a href="tel:+1234567890" class="btn btn-secondary">
              Call Us: (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #dc2626 0%, #f59e0b 50%, #dc2626 100%);
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  align-items: center;
}

.hero-text {
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.title-accent {
  color: #fbbf24;
  display: block;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #fbbf24;
  color: #1f2937;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
}

.btn-primary:hover {
  background: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.6);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #dc2626;
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.burger-placeholder {
  font-size: 15rem;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Stats Section */
.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

/* CTA Section */
.cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cta-description {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .burger-placeholder {
    font-size: 8rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>