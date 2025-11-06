<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '../composables/useToast';

const { showSuccess, showError } = useToast();

interface review {
  id: number;
  name: string;
  rating: number;
  content: string;
  date: string;
}
const reviews = ref([ // this is very important to remember aobut ref!!!!
  { 
    id: 1,
    name: 'John Doe',
    rating: 5, 
    content: 'The best burgers I have ever had. Highly recommend!',
    date: '2024-06-15'
   },
  { id: 2, 
    name: 'Jane Smith', 
    rating: 4, 
    content: 'The staff were friendly and the service was quick.', 
    date: '2024-06-16' 
  },
  { 
    id: 3, 
    name: 'Alice Johnson', 
    rating: 5, 
    content: 'Delicious food and a great atmosphere. Can\'t wait to return!', 
    date: '2024-06-17' 
  },
]);


const newReview = ref({
  name: '',
  rating: 5,
  content: '',
});

const submitReview = () => {
  try {
    if (!newReview.value.name.trim()) {
      showError('Please enter your name!');
      return;
    }
    
    if (!newReview.value.content.trim()) {
      showError('Please write a review!');
      return;
    }

    const review: review = {
      id: reviews.value.length + 1,
      name: newReview.value.name,
      rating: newReview.value.rating,
      content: newReview.value.content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    reviews.value.unshift(review)
    
    // Reset form!!!!!!!!!!!
    newReview.value = {
      name: '',
      rating: 5,
      content: ''
    }
    
    showSuccess('Thank you for your review! 🍔');
  } catch (error) {
    showError('An error occurred while adding your review. Please try again.');
  }
}
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

    <div class="add-review">
      <h2>Add Your Review</h2>
      <form class="review-form" @submit.prevent="submitReview">
        <input v-model="newReview.name" class="form-input name-input" type="text" placeholder="Your Name" required />
        <select v-model="newReview.rating" class="form-input" required>
          <option value="" disabled selected>Rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
        </select>
        <textarea v-model="newReview.content" placeholder="Your Review" class="form-textarea" required></textarea>
        <button type="submit" class="btn btn-primary">Submit Review</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.reviews-page {
  padding: 2rem 0;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  justify-content: center;
}

.review-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.review-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap:1rem;
  margin-bottom: 1rem;
}

.stars {
  color: #fbbf24;
  font-size: 1.2rem;
}

.reviewer {
  font-weight: 600;
  color: #1f2937;
}

.review-text {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.review-date {
  font-size: 0.875rem;
  color: #9ca3af;
}

.add-review {
  max-width: 500px;
  margin: 3rem auto 0;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.add-review h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.name-input {
  font-weight: 600;
}
</style>