import {
  createReviewObject,
  getReviewsFromStorage,
  saveReviewsToStorage
} from '../../backend/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('new-review');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const review = await createReviewObject(formData);

    // Append to <main>
    const reviewCard = document.createElement('review-card');
    reviewCard.data = review;
    document.querySelector('main')?.appendChild(reviewCard);

    // Save to localStorage using exported helper
    const reviews = getReviewsFromStorage();
    reviews.push(review);
    saveReviewsToStorage(reviews);

    form.reset();
  });
});
