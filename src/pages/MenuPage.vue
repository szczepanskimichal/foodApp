<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { showSuccess, showInfo } = useToast()

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, onion, pickle',
    price: 12.99
  },
  {
    id: 2,
    name: 'Cheese Deluxe',
    description: 'Double cheese, beef patty, special sauce',
    price: 14.99
  },
  {
    id: 3,
    name: 'BBQ Beast',
    description: 'BBQ sauce, bacon, onion rings, beef patty',
    price: 16.99
  },
  {
    id: 4,
    name: 'Veggie Burger',
    description: 'Plant-based patty, avocado, sprouts',
    price: 13.99
  }
]

const addToCart = (item: MenuItem) => {
  showSuccess(`${item.name} added to cart! 🛒`)
  // Tu można by dodać logikę koszyka
}

const showDetails = (item: MenuItem) => {
  showInfo(`Learn more about our ${item.name}! ℹ️`)
  // Tu można by otworzyć modal z detalami
}
</script>
<template>
  <div class="menu-page">
    <h1>Our Menu</h1>
    <p>Delicious burgers made with love and fresh ingredients</p>

    <div class="menu-grid">
      <div class="menu-item" v-for="item in menuItems" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
        <div class="price">${{ item.price.toFixed(2) }}</div>
        
        <div class="item-buttons">
          <button class="btn btn-primary" @click="addToCart(item)">
            Add to Cart 🛒
          </button>
          <button class="btn btn-secondary" @click="showDetails(item)">
            Details ℹ️
          </button>
        </div>
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}

.menu-item {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.menu-item h3 {
  color: #dc2626;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.price {
  font-size: 2rem;
  font-weight: 900;
  color: #059669;
  margin-bottom: 1.5rem;
}

.item-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
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
  text-decoration: none;
  display: inline-block;
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
  .menu-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .item-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>