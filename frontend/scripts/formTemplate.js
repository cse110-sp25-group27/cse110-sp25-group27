/**
 * @fileoverview This handles the client‑side logic for accepting a new review
 * Uses the <form id="new-review"> element to rendering it to the page as a
 * <review-card> custom element. 
 * 
 * @requires module:backend/localStorage.createReviewObject
 * @requires module:backend/localStorage.getReviewsFromStorage
 * @requires module:backend/localStorage.saveReviewsToStorage
 */

/**
 * Shape of review Object from createReviewObjects()
 * 
 * @typedef {Object} Review
 * @property {string} id         // Unique identifier (e.g. UUID)
 * @property {string} title      // Review headline
 * @property {string} body       // Main review text
 * @property {number} rating     // Numeric rating (1 to 5)
 * @property {string} createdAt  // ISO 8601 date time string
 */
import {
  createReviewObject,
  getReviewsFromStorage,
  saveReviewsToStorage
} from '../../backend/localStorage.js';


/**
 * 
 */
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
