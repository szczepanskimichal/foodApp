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
    <ul>
      <ol v-for="review in reviews" :key="review.id">
        <h2>{{ review.id + ': ' + review.name }}</h2>
        <p>{{ review.content }}</p>
      </ol>
    </ul>
  </div>
</template>
