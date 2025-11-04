<script setup lang="ts">
</script>
<template>
  <nav class="nav"> 
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo">
          <img src="../../assets/burgerImg.webp" alt="Logo" />
        <span class="brand-text">ShmashingBurger</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/menu" class="nav-link">Menu</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/location" class="nav-link">Location</router-link>
        <router-link to="/reviews" class="nav-link">Reviews</router-link>
      </div>
    </div>
    </div>
  </nav>
</template>
<style scoped>
.nav {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo:hover {
  text-decoration: none;
}

.logo img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  margin-left: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>