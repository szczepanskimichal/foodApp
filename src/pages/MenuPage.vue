<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'

const { showSuccess, showInfo } = useToast()

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  emoji: string
  image: string
  category: string
  spicy?: boolean
  popular?: boolean
  vegetarian?: boolean
}

const activeCategory = ref('all')

const menuItems: MenuItem[] = [
  // Signature Burgers
  {
    id: 1,
    name: 'The Shmash Classic',
    description: 'Double smashed beef patties, American cheese, lettuce, tomato, pickles, secret sauce',
    price: 189,
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    category: 'burgers',
    popular: true
  },
  {
    id: 2,
    name: 'BBQ Bacon Beast',
    description: 'Smoked bacon, BBQ sauce, onion rings, cheddar cheese, beef patty',
    price: 209,
    emoji: '🥓',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'burgers',
    popular: true
  },
  {
    id: 3,
    name: 'Spicy Jalapeño Fire',
    description: 'Jalapeños, pepper jack cheese, spicy mayo, lettuce, tomato',
    price: 199,
    emoji: '🌶️',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    category: 'burgers',
    spicy: true
  },
  {
    id: 4,
    name: 'Mushroom Swiss Delight',
    description: 'Sautéed mushrooms, Swiss cheese, truffle aioli, arugula',
    price: 199,
    emoji: '🍄',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=300&fit=crop',
    category: 'burgers'
  },
  {
    id: 5,
    name: 'The Veggie Champion',
    description: 'Beyond meat patty, avocado, sprouts, vegan cheese, herb mayo',
    price: 179,
    emoji: '🥬',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    category: 'burgers',
    vegetarian: true
  },
  
  // Chicken & Alternatives
  {
    id: 6,
    name: 'Crispy Chicken Deluxe',
    description: 'Fried chicken breast, coleslaw, pickles, mayo, brioche bun',
    price: 169,
    emoji: '🐔',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    category: 'chicken'
  },
  {
    id: 7,
    name: 'Buffalo Chicken Wrap',
    description: 'Spicy buffalo chicken, lettuce, tomato, ranch, flour tortilla',
    price: 149,
    emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    category: 'chicken',
    spicy: true
  },
  
  // Sides & Fries
  {
    id: 8,
    name: 'Truffle Parmesan Fries',
    description: 'Hand-cut fries with truffle oil and fresh parmesan',
    price: 99,
    emoji: '🍟',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop',
    category: 'sides',
    popular: true
  },
  {
    id: 9,
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with chipotle aioli',
    price: 89,
    emoji: '🍠',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop',
    category: 'sides'
  },
  {
    id: 10,
    name: 'Loaded Nachos',
    description: 'Tortilla chips, cheese sauce, jalapeños, sour cream, guac',
    price: 139,
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
    category: 'sides'
  },
  {
    id: 11,
    name: 'Onion Rings',
    description: 'Beer-battered onion rings with ranch dipping sauce',
    price: 79,
    emoji: '🧅',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop',
    category: 'sides'
  },
  
  // Drinks & Desserts
  {
    id: 12,
    name: 'Craft Milkshake',
    description: 'Vanilla, chocolate, or strawberry with whipped cream',
    price: 69,
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    category: 'drinks'
  },
  {
    id: 13,
    name: 'Fresh Lemonade',
    description: 'House-made lemonade with fresh mint',
    price: 45,
    emoji: '🍋',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
    category: 'drinks'
  },
  {
    id: 14,
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    price: 79,
    emoji: '🍫',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    category: 'desserts'
  }
]

const categories = [
  { id: 'all', name: 'All Items', emoji: '🍽️' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'chicken', name: 'Chicken', emoji: '🐔' },
  { id: 'sides', name: 'Sides', emoji: '🍟' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
  { id: 'desserts', name: 'Desserts', emoji: '🍫' }
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') {
    return menuItems
  }
  return menuItems.filter(item => item.category === activeCategory.value)
})

const addToCart = (item: MenuItem) => {
  showSuccess(`${item.name} added to cart! 🛒`)
  // Tu można by dodać logikę koszyka
}

const setCategory = (category: string) => {
  activeCategory.value = category
  const categoryName = categories.find(c => c.id === category)?.name || 'items'
  showInfo(`Showing ${categoryName.toLowerCase()} 📋`)
}
</script>

<template>
  <div class="menu-page">
    <div class="menu-header">
      <h1>Our Menu</h1>
      <p>Delicious burgers made with love and fresh ingredients</p>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <button 
        v-for="category in categories" 
        :key="category.id"
        :class="['category-btn', { active: activeCategory === category.id }]"
        @click="setCategory(category.id)"
      >
        {{ category.emoji }} {{ category.name }}
      </button>
    </div>

    <!-- Menu Grid -->
    <div class="menu-grid">
      <div 
        class="menu-item" 
        v-for="item in filteredItems" 
        :key="item.id"
        :data-category="item.category"
      >
        <!-- Item Image -->
        <div class="item-image">
          <img :src="item.image" :alt="item.name" />
          <div class="item-badges">
            <span v-if="item.popular" class="badge popular">🔥 Popular</span>
            <span v-if="item.spicy" class="badge spicy">🌶️ Spicy</span>
            <span v-if="item.vegetarian" class="badge veggie">🌱 Veggie</span>
          </div>
        </div>

        <!-- Item Info -->
        <h3>{{ item.name }}</h3>
        <p class="description">{{ item.description }}</p>
        <div class="price">{{ item.price }} NOK</div>
        
        <!-- Item Actions -->
        <div class="item-buttons">
          <button class="btn btn-primary" @click="addToCart(item)">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Stats -->
    <div class="menu-stats">
      <div class="stat">
        <span class="stat-number">{{ menuItems.length }}</span>
        <span class="stat-label">Menu Items</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ menuItems.filter(item => item.vegetarian).length }}</span>
        <span class="stat-label">Vegetarian Options</span>
      </div>
      <div class="stat">
        <span class="stat-number">{{ categories.length - 1 }}</span>
        <span class="stat-label">Categories</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.menu-page {
  padding: 2rem 0;
  max-width: 1400px;
  margin: 0 auto;
}

.menu-header {
  text-align: center;
  margin-bottom: 3rem;
}

.menu-header h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 1rem;
}

.menu-header p {
  font-size: 1.3rem;
  color: #6b7280;
}

/* Category Filter */
.category-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 0 2rem;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 2rem;
  background: white;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.category-btn:hover {
  border-color: #dc2626;
  color: #dc2626;
  transform: translateY(-2px);
}

.category-btn.active {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

/* Menu Grid */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.menu-item {
  background: white;
  padding: 0;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.menu-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.item-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 1.5rem 1.5rem 0 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-item:hover .item-image img {
  transform: scale(1.05);
}

.item-badges {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.badge.popular {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.badge.spicy {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.badge.veggie {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.menu-item h3 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f2937;
  margin: 1.5rem 1.5rem 1rem;
  line-height: 1.2;
}

.description {
  color: #6b7280;
  margin: 0 1.5rem 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 900;
  color: #059669;
  margin: 0 1.5rem 1.5rem;
  text-align: center;
}

.item-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1.5rem 1.5rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  min-width: 200px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
}

/* Menu Stats */
.menu-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  border-radius: 2rem;
  margin: 0 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 900;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-header h1 {
    font-size: 2.5rem;
  }
  
  .menu-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .category-filter {
    padding: 0 1rem;
    gap: 0.5rem;
  }
  
  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .item-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .menu-stats {
    flex-direction: column;
    gap: 2rem;
    margin: 0 1rem;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .menu-header h1 {
    font-size: 2rem;
  }
  
  .menu-item {
    padding: 1.5rem;
  }
  
  .item-emoji {
    font-size: 3rem;
  }
  
  .price {
    font-size: 2rem;
  }
}
</style>