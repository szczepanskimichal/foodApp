<template>
  <div class="not-found-page">
    <div class="error-content">
      <div class="error-icon">
        <div class="foodtruck">
          🚚💨
        </div>
      </div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! This page seems to have driven away like our food truck.</p>
      <p>But don't worry - you can still find us!</p>
      
      <div class="actions">
        <router-link to="/" class="btn btn-primary">Go Home</router-link>
        <router-link to="/location" class="btn btn-secondary">Find Our Location</router-link>
      </div>
      
      <div class="suggestions">
        <h3>Looking for something specific?</h3>
        <div class="links">
          <router-link to="/menu">View Our Menu</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/reviews">Customer Reviews</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  overflow: hidden;
}

.error-content {
  max-width: 500px;
  position: relative;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  height: 4rem;
  overflow: hidden;
}

.foodtruck {
  display: inline-block;
  animation: drive 4s ease-in-out infinite;
}

/* Animacja: food truck startuje z lewej, jedzie w prawo i znika */
@keyframes drive {
  0% {
    transform: translateX(-150%);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  80% {
    transform: translateX(150%);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.error-content h1 {
  font-size: 2.5rem;
  color: #dc2626;
  margin-bottom: 1rem;
}

.error-content p {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
  transform: translateY(-2px);
}

.suggestions {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.suggestions h3 {
  color: #374151;
  margin-bottom: 1rem;
}

.links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.links a {
  color: #dc2626;
  text-decoration: none;
  font-weight: 500;
}

.links a:hover {
  text-decoration: underline;
}
</style>
