<script setup lang="ts">
const reviews = [
  { id: 1, title: 'Amazing Burgers!', content: 'The best burgers I have ever had. Highly recommend!' },
  { id: 2, title: 'Great Service', content: 'The staff were friendly and the service was quick.' },
  { id: 3, title: 'Will Come Back Again', content: 'Delicious food and a great atmosphere. Can\'t wait to return!' },
];
</script>
<template>
  <div>
    <h1>Reviews</h1>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <h2>{{ review.title }}</h2>
        <p>{{ review.content }}</p>
      </li>
    </ul>
  </div>
</template>
