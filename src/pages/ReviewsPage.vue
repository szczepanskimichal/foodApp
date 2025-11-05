<script setup lang="ts">
const reviews = [
  { 
    id: 1,
    name: 'Amazing Burgers!',
    rating: 5, 
    content: 'The best burgers I have ever had. Highly recommend!',
    date: '2024-06-15'
   },
  { id: 2, 
    name: 'Great Service', 
    rating: 4, 
    content: 'The staff were friendly and the service was quick.', 
    date: '2024-06-16' 
  },
  { 
    id: 3, 
    name: 'Will Come Back Again', 
    rating: 5, 
    content: 'Delicious food and a great atmosphere. Can\'t wait to return!', 
    date: '2024-06-17' 
  },
];
</script>
<template>
  <div>
    <h1>Customers Reviews</h1>
    <p>What customers are saying about ours burgers</p>
    <div class="review-grid">
      <div class="review-card" v-for="review in reviews" :key="review.id">
        <div class="review-header">
          <h3>{{ review.name }}</h3>
          <p class="review-stars">{{ '★'.repeat(review.rating) }}</p>
        </div>
        <p>{{ review.content }}</p>
        <p class="review-date">{{ review.date }}</p>
      </div>
    </div>
  </div>
</template>
