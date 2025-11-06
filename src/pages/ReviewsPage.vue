<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '../composables/useToast';
import { useI18n } from '../composables/useI18n';

const { showSuccess, showError } = useToast();
const { t } = useI18n();

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
    date: '11/6/2025'
   },
  { id: 2, 
    name: 'Jane Smith', 
    rating: 4, 
    content: 'The staff were friendly and the service was quick.', 
    date: '11/6/2025' 
  },
  { 
    id: 3, 
    name: 'Alice Johnson', 
    rating: 5, 
    content: 'Delicious food and a great atmosphere. Can\'t wait to return!', 
    date: '11/6/2025' 
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
        month: 'numeric', 
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
    <h1>{{ t('reviews.title') }}</h1>
    <p>{{ t('reviews.subtitle') }}</p>
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
      <h2>{{ t('reviews.writeReview') }}</h2>
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

.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: 1200px;
  margin: 2rem auto;
  gap: 1.5rem;
  justify-content: center;
}

@media (min-width: 1024px) {
  .review-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .review-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
}

.review-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-stars {
  color: #fbbf24;
  font-size: 1.2rem;
  font-weight: bold;
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

/* Dark Mode Styles */
body.dark-mode h1 {
  color: #e5e5e5 !important;
}

body.dark-mode p {
  color: #b3b3b3 !important;
}

body.dark-mode .review-card {
  background: #2d2d2d !important;
  border: 1px solid #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .review-card h3 {
  color: #e5e5e5 !important;
}

body.dark-mode .review-card p {
  color: #b3b3b3 !important;
}

body.dark-mode .review-date {
  color: #888 !important;
}

body.dark-mode .add-review h2 {
  color: #e5e5e5 !important;
}

body.dark-mode .add-review {
  background: #2d2d2d !important;
  border: 1px solid #404040 !important;
}

body.dark-mode .form-input,
body.dark-mode .form-textarea {
  background: #1a1a1a !important;
  border-color: #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .form-input::placeholder,
body.dark-mode .form-textarea::placeholder {
  color: #888 !important;
}

body.dark-mode .form-input:focus,
body.dark-mode .form-textarea:focus {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  background: #2d2d2d !important;
}

body.dark-mode .form-input option {
  background: #2d2d2d !important;
  color: #e5e5e5 !important;
}

body.dark-mode select {
  background: #1a1a1a !important;
  color: #e5e5e5 !important;
  border-color: #404040 !important;
}

body.dark-mode select:focus {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  background: #2d2d2d !important;
}

body.dark-mode .review-stars {
  color: #fbbf24 !important;
}

body.dark-mode .reviews-grid {
  background: transparent !important;
}

body.dark-mode .review-card:hover {
  background: #353535 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
}
</style>