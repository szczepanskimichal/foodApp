<script setup lang="ts">
</script>
<template>
  <div class="about-page">
    <h1>About The Burger Truck</h1>
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
            <h3>Michal Jerzak</h3>
            <p>Founder & CEO</p>
          </div>
          <div class="team-member">
            <h3>Michal Jerzak</h3>
            <p>Head Chef</p>
          </div>
          <div class="team-member">
            <h3>Silje Vestrum Bakken</h3>
            <p>Marketing Specialist</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
.about-page {
  padding: 2rem 0;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-content section {
  margin-bottom: 3rem;
}

.about-content h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.about-content p {
  line-height: 1.7;
  color: #4b5563;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.team-member {
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.team-member h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}
</style>