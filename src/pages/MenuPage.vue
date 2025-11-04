<script lang="ts"></script>
<template>
  <div class="menu-page">
    <h1>Our Menu</h1>
    <p>Delicious burgers made with love and fresh ingredients</p>

    <div class="menu-grid">
      <div class="menu-item">
        <h3>Classic Burger</h3>
        <p>Beef patty, lettuce, tomato, onion, pickle</p>
        <span class="price">$12.99</span> 
      </div>
      <div class="menu-item">
        <h3>Cheese Deluxe</h3>
        <p>Double cheese, beef patty, special sauce</p>
        <span class="price">$14.99</span>
      </div>
      <div class="menu-item">
        <h3>BBQ Beast</h3>
        <p>BBQ sauce, bacon, onion rings, beef patty</p>
        <span class="price">$16.99</span>
      </div>
      <div class="menu-item">
        <h3>Veggie Burger</h3>
        <p>Plant-based patty, avocado, sprouts</p>
        <span class="price">$13.99</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.menu-page {
  padding: 2rem 0;
  text-align: center;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.menu-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.menu-item h3 {
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #059669;
}
</style>