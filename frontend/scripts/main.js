// ONBOARDING REDIRECT LOGIC - PLACE AT THE VERY TOP
/**
 * Immediately redirects the user to `onboarding.html` if they have not completed onboarding.
 * The check is based on a localStorage flag `hasCompletedOnboarding`.
 * 
 * This logic should be placed at the top of your script to ensure it executes
 * before any other UI logic, preventing unauthorized access to the landing page.
 *
 * @function
 * @returns {void}
 */
(function () {
    if (localStorage.getItem('hasCompletedOnboarding') !== 'true') {
        // Ensure we are not already on onboarding.html to prevent redirect loop
        if (!window.location.pathname.endsWith('onboarding.html')) {
            window.location.href = 'onboarding.html'; // Adjusts path when needed
        }
    }
})(); // Self-invoking function to run immediately

// Import functions from localStorage.js and the ReviewCard component
import { getReviewsFromStorage, saveReviewsToStorage, createReviewObject, addReviewsToDocument as originalAddReviewsToDocument, updateReview, deleteReviewById, initFormHandler } from '../../backend/localStorage.js';
import '../../backend/reviewCard.js'; // This ensures ReviewCard custom element is defined

// --- Carousel Variables & Functions ---
let carouselTrack = null;
let reviewCardsInCarousel = []; // Holds the DOM elements of review-card
let currentCarouselIndex = 0;

const BASE_CARD_WIDTH = 280; // The actual width property of the review-card component
const CARD_MARGIN_RIGHT = 15; // The margin-right we added in CSS (must match value in landing_page.css)
// This is the total horizontal space one card (and its spacing) occupies in the sequence
const EFFECTIVE_CARD_FOOTPRINT = BASE_CARD_WIDTH + CARD_MARGIN_RIGHT;

let mainViewportElement = null;

/**
 * Updates the position of the carousel to center the currently active card.
 * Applies a transform to shift the carousel track based on the active index.
 * Also applies the 'active-card' class to the current card for styling.
 *
 * @param {boolean} [animate=true] - If false, disables animation for the movement.
 * @returns {void}
 */
function updateCarouselPosition(animate = true) {
    if (!carouselTrack || !mainViewportElement) {
        console.warn("Carousel track or viewport not ready for positioning.");
        return;
    }
    if (reviewCardsInCarousel.length === 0) {
        carouselTrack.style.transform = `translateX(0px)`;
        return;
    }

    // Calculate the offset to center the current card within the mainViewportElement.
    // The mainViewportElement is currently 290px wide.
    // We want to shift the track so the LEFT edge of the current card
    // aligns with the LEFT edge of the mainViewportElement.
    // Each step in the sequence is now EFFECTIVE_CARD_FOOTPRINT wide.
    const targetTranslateX = -(currentCarouselIndex * EFFECTIVE_CARD_FOOTPRINT);

    if (!animate) carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = `translateX(${targetTranslateX}px)`;

    if (!animate) {
        // Force reflow to apply non-animated position immediately
        void carouselTrack.offsetWidth;
        // Restore animation for subsequent moves
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    }

    // Optional: Add classes to side cards for different styling
    reviewCardsInCarousel.forEach((card, index) => {
        card.classList.remove('active-card', 'prev-card', 'next-card');
        if (index === currentCarouselIndex) {
            card.classList.add('active-card');
        }
    });
}
/**
 * Adds a new `<review-card>` element to the carousel DOM based on the given review data.
 * The card is inserted at a specified index or appended to the end if no valid index is provided.
 *
 * @function
 * @param {Object} reviewObject - The data object used to populate the review card.
 * @param {number} [atIndex=-1] - Optional index at which to insert the card. 
 *                                 If out of bounds, appends the card instead.
 * @returns {HTMLElement|null} The newly created `<review-card>` element, or `null` if insertion failed.
 */
function addReviewCardToCarouselDOM(reviewObject, atIndex = -1) {
    if (!carouselTrack) {
        console.error("Carousel track not found. Cannot add card.");
        return null;
    }
    const reviewCard = document.createElement('review-card');
    reviewCard.data = reviewObject;

    if (atIndex >= 0 && atIndex < reviewCardsInCarousel.length) {
        carouselTrack.insertBefore(reviewCard, reviewCardsInCarousel[atIndex]);
        reviewCardsInCarousel.splice(atIndex, 0, reviewCard);
    } else {
        carouselTrack.appendChild(reviewCard);
        reviewCardsInCarousel.push(reviewCard);
    }
    return reviewCard;
}

// --- Logic for loading the NEW review form (Mostly Unchanged) ---
const addButton = document.getElementById('add-ticket-button');
const textBubble = document.getElementById('text-bubble');
const newReviewFormContainer = document.getElementById('form-container');
let newReviewForm = null;
let newReviewFormLoaded = false;

if (addButton && textBubble && newReviewFormContainer) {
    addButton.addEventListener('click', async () => {
        const updateForm = document.querySelector('#update-form');
        if (updateForm && updateForm.style.display !== 'none') {
            updateForm.style.display = 'none'; // Hide update form if open
        }
        // Hide the update form if it's open
        if (updateForm && updateForm.style.display !== 'none') {
            updateForm.style.display = 'none';
            updateForm.reset(); // Optionally reset the form fields
        }

        // Hide the new review form if it's open
        if (newReviewFormContainer && !newReviewFormContainer.classList.contains('hidden')) {
            newReviewFormContainer.classList.add('hidden');
        }

        if (!newReviewFormLoaded) {
            try {
                const response = await fetch('../components/template.html');
                const html = await response.text();
                newReviewFormContainer.innerHTML = html;
                newReviewFormLoaded = true;
                newReviewForm = newReviewFormContainer.querySelector('form');
                if (newReviewForm) {
                    if (!newReviewForm.id) newReviewForm.id = 'new-review'; // Ensure ID for localStorage handler
                    // The initFormHandler in localStorage.js should call a function to add the review
                    // to the carousel after it's created and saved.
                    initFormHandler((createdReviewObject) => {
                        addReviewCardToCarouselDOM(createdReviewObject); // Add to end
                        // If we want to show the new card immediately:
                        currentCarouselIndex = reviewCardsInCarousel.length - 1;
                        updateCarouselPosition(true); // Animate to the new card
                        newReviewFormContainer.classList.add('hidden'); // Hide the form
                        if (textBubble) textBubble.classList.remove('expanded');
                    });
                } else { console.error("Loaded template.html does not contain a form element."); }
            } catch (err) { console.error('Failed to load new review form:', err); }
        }
        // Toggle visibility of the form container and text bubble state
        textBubble.classList.toggle('expanded');
        newReviewFormContainer.classList.toggle('hidden');
    });
} else {
    console.warn("Add ticket button, text bubble, or new review form container not found.");
}

document.addEventListener('DOMContentLoaded', () => {
    const addTicketButton = document.getElementById('add-ticket-button');
    const promptElement = document.getElementById('prompt');

    addTicketButton.addEventListener('click', () => {
        // Toggle the visibility of the prompt element
        if (promptElement.classList.contains('hidden')) {
            promptElement.classList.remove('hidden');
        } else {
            promptElement.classList.add('hidden');
        }
    });
});

// --- End of new review form loading logic ---

// NEW HELPER FUNCTION (copied from localStorage.js or defined here)
async function processImageForStorage(imageFile, maxWidth = 600, maxHeight = 600, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = (err) => {
                console.error("Image load error in processImageForStorage (main.js)", err);
                reject(new Error("Failed to load image for processing."));
            };
            img.src = event.target.result;
        };
        reader.onerror = (err) => {
            console.error("FileReader error in processImageForStorage (main.js)", err);
            reject(new Error("Failed to read file for processing."));
        };
        reader.readAsDataURL(imageFile);
    });
}

/** ------------------------------------------------------------------------------
 * @Overview code that handles the front end carousel UI. 
 * Handles the edit and delete interactions from each individual <review-card> element.
 * Mnagaes the Update Review form.
 * All of the execution begins once the DOM is fully finished loading.
 * @returns {void}
 * @listens document:DOMContentLoaded
 ------------------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    mainViewportElement = document.querySelector('.poster-carousel main');
    const updateReviewForm = document.querySelector('#update-form');

    if (!mainViewportElement) {
        console.error('CRITICAL: <main> element for carousel viewport not found. Carousel will not work.');
        return;
    }

    // Create and append the carousel track if it doesn't exist
    if (!mainViewportElement.querySelector('.carousel-track')) {
        carouselTrack = document.createElement('div');
        carouselTrack.classList.add('carousel-track');
        mainViewportElement.appendChild(carouselTrack);
    } else {
        // SO long as we keep the HTML clean it shoudn't happen, but good fallback to have
        carouselTrack = mainViewportElement.querySelector('.carousel-track');
    }

    if (!updateReviewForm) {
        console.warn('Update review form (#update-form) not found. Editing may not work as expected if it relies on this script managing it.');
    } else {
        updateReviewForm.style.display = 'none'; // Ensure it's hidden initially
        const cancelUpdateButton = updateReviewForm.querySelector('#cancel-update');
        if (cancelUpdateButton) {
            cancelUpdateButton.addEventListener('click', () => {
                updateReviewForm.style.display = 'none';
                updateReviewForm.reset();
                // Restore text bubble/new form visibility if needed
                // if (textBubble) textBubble.classList.add('expanded'); 
                const textBubble = document.getElementById('text-bubble');
                if (textBubble) {
                    textBubble.classList.remove('expanded'); // Restore original styling
                }
                // if (newReviewFormContainer && newReviewFormLoaded) newReviewFormContainer.classList.add('hidden');
            });
        }
    }

    /** -------------------------------------------------------------------
     * Carousel Navigation helper functions
     ------------------------------------------------------------------- */
    /** -------------------------------------------------------------------
     * Will advance the Carousel to show the next card (wraps around the end)
     * @private
     * @returns {void}
     ------------------------------------------------------------------- */
    function showNextCard() {
        if (reviewCardsInCarousel.length === 0) return;
        currentCarouselIndex = (currentCarouselIndex + 1) % reviewCardsInCarousel.length;
        updateCarouselPosition();
    }
    /** -------------------------------------------------------------------
     * Will move the Carousel to shwo the previous card (wraps around the start)
     * @private
     * @returns {void}
     ------------------------------------------------------------------- */
    function showPrevCard() {
        if (reviewCardsInCarousel.length === 0) return;
        currentCarouselIndex = (currentCarouselIndex - 1 + reviewCardsInCarousel.length) % reviewCardsInCarousel.length;
        updateCarouselPosition();
    }
    /** -------------------------------------------------------------------
     * Remakes the DOM for every review and positions the carousel track so 
     * that the first card is visible.
     * @private
     * @returns {void}
     ------------------------------------------------------------------- */
    function displayInitialReviews() {
        if (!carouselTrack) {
            console.error("Carousel track not available for initial reviews.");
            return;
        }
        carouselTrack.innerHTML = '';
        reviewCardsInCarousel = []; // Reset the array
        const reviews = getReviewsFromStorage();
        reviews.forEach(review => addReviewCardToCarouselDOM(review));

        if (reviewCardsInCarousel.length > 0) {
            currentCarouselIndex = 0;
            updateCarouselPosition(false); // Position without animation initially
        }
    }

    const prevButton = document.getElementById('carousel-prev-btn');
    const nextButton = document.getElementById('carousel-next-btn');

    if (prevButton) prevButton.addEventListener('click', showPrevCard);
    if (nextButton) nextButton.addEventListener('click', showNextCard);

    mainViewportElement.addEventListener('delete-review', (event) => {
        const reviewIdToDelete = event.detail.reviewId;
        const cardElement = event.target; // This is the review-card element

        const cardIndexInCarousel = reviewCardsInCarousel.indexOf(cardElement);

        if (cardIndexInCarousel === -1) {
            console.warn("Attempted to delete a card not found in the carousel's JS array.");
            // Fallback: try to find by ID if needed, but direct reference is better
            return;
        }

        const reviewTitle = cardElement.data ? cardElement.data.title : "this review";

        if (confirm(`Are you sure you want to delete ${reviewTitle}?`)) {
            deleteReviewById(reviewIdToDelete); // Delete from localStorage

            // Remove from DOM and array
            carouselTrack.removeChild(cardElement);
            reviewCardsInCarousel.splice(cardIndexInCarousel, 1);

            if (reviewCardsInCarousel.length === 0) {
                currentCarouselIndex = 0; // Reset
                updateCarouselPosition(false); // Update view (empty track)
            } else {
                // Adjust currentCarouselIndex if the deleted card affected it
                if (currentCarouselIndex >= reviewCardsInCarousel.length) {
                    // If deleted card was last, or current index is now out of bounds
                    currentCarouselIndex = reviewCardsInCarousel.length - 1;
                } else if (cardIndexInCarousel < currentCarouselIndex) {
                    // If a card BEFORE the current one was deleted, the current one's index effectively shifts left
                    currentCarouselIndex--;
                }
                // If the current card itself was deleted and it wasn't the last,
                // the new card at currentCarouselIndex (if it exists) will become current.
                // Or if a card AFTER current was deleted, index remains valid.
                updateCarouselPosition(reviewCardsInCarousel.length > 0);
            }
            console.log(`Review ID: ${reviewIdToDelete} deleted. New current index: ${currentCarouselIndex}`);
        }
    });

    mainViewportElement.addEventListener('edit-review', (event) => {
        if (!updateReviewForm) {
            alert('The #update-form element could not be found. Cannot edit review.');
            return;
        }

        // Hide the new review form if it's open
        if (newReviewFormContainer && !newReviewFormContainer.classList.contains('hidden')) {
            newReviewFormContainer.classList.add('hidden');
            if (textBubble) textBubble.classList.remove('expanded');
        }

        const reviewDataToEdit = event.detail.reviewData;
        console.log('Editing review (from main.js):', reviewDataToEdit);

        // Populate the update form (ensure all fields exist in your update-form HTML)
        updateReviewForm.querySelector('#update-movie-title').value = reviewDataToEdit.title || '';
        updateReviewForm.querySelector('#update-release-date').value = reviewDataToEdit.releaseDate || '';

        let formattedWatchedDate = '';
        if (reviewDataToEdit.watchedOn) {
            const watchedDate = new Date(reviewDataToEdit.watchedOn);
            if (!isNaN(watchedDate.getTime())) {
                try {
                    formattedWatchedDate = watchedDate.toISOString().split('T')[0];
                } catch (e) {
                    console.error("Error formatting watchedOn date:", e, "Value was:", reviewDataToEdit.watchedOn);
                    // formattedWatchedDate remains ''
                }
            } else {
                console.warn(`Invalid watchedOn date encountered: ${reviewDataToEdit.watchedOn}`);
            }
        }
        updateReviewForm.querySelector('#update-watch-date').value = formattedWatchedDate;

        updateReviewForm.querySelector('#update-watch-count').value = reviewDataToEdit.watchCount || 1;
        updateReviewForm.querySelector('#update-review').value = reviewDataToEdit.notes || '';

        const ratingValue = (reviewDataToEdit.rating !== null && reviewDataToEdit.rating !== undefined)
            ? reviewDataToEdit.rating.toString()
            : "0"; // Default to "0" if no rating
        const ratingRadios = updateReviewForm.querySelectorAll('input[name="update-rating"]');
        ratingRadios.forEach(radio => {
            radio.checked = radio.value === ratingValue;
        });

        updateReviewForm.dataset.editingId = reviewDataToEdit.id; // Store ID for submission
        updateReviewForm.dataset.createdAt = reviewDataToEdit.createdAt; // Preserve original creation timestamp

        // Show the update form
        updateReviewForm.style.display = 'block';
        if (textBubble) textBubble.classList.add('expanded'); // Expand text bubble if update form is inside it
    });

    // Update form submission logic (ensure this is robust)
    if (updateReviewForm) {
        updateReviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const reviewId = form.dataset.editingId;
            const createdAtOriginal = form.dataset.createdAt;

            if (!reviewId) {
                alert("Error: No review ID found for updating.");
                return;
            }

            const allReviews = getReviewsFromStorage();
            const oldReviewData = allReviews.find(r => r.id.toString() === reviewId);
            if (!oldReviewData) {
                alert("Original review data not found. Cannot update.");
                return;
            }

            let imageData = oldReviewData.imageData; // Preserve old image by default
            const imageFile = formData.get('update-movie-poster');

            if (imageFile && imageFile.size > 0) {
                try {
                    // USE THE PROCESSING FUNCTION HERE
                    imageData = await processImageForStorage(imageFile);
                } catch (err) {
                    console.error("Error processing image file for update:", err);
                    alert("Failed to process new image. Keeping old image or no image if new.");
                    // If oldReviewData.imageData was empty and processing new one fails, imageData remains empty.
                }
            }

            const updatedReviewData = {
                id: parseInt(reviewId),
                title: formData.get('update-movie-title'),
                imageData: imageData, // USE PROCESSED IMAGE DATA
                releaseDate: formData.get('update-release-date'),
                watchedOn: formData.get('update-watch-date'),
                watchCount: parseInt(formData.get('update-watch-count')),
                rating: parseInt(formData.get('update-rating')),
                notes: formData.get('update-review'),
                createdAt: createdAtOriginal,
                updatedAt: new Date().toISOString()
            };

            const success = updateReview(updatedReviewData);

            if (success) {
                // Find the card in the carousel and update its .data property
                const cardToUpdate = reviewCardsInCarousel.find(card => card.data.id.toString() === reviewId);
                if (cardToUpdate) {
                    cardToUpdate.data = updatedReviewData; // This should trigger re-render in ReviewCard
                } else {
                    console.warn("Updated card not found in carousel DOM array for live update.");
                    // As a fallback, re-display all reviews, but targeted update is better
                    displayInitialReviews();
                }
                form.style.display = 'none';
                form.reset();
                // Restore the text-bubble styling and content
                const textBubble = document.getElementById('text-bubble');
                if (textBubble) {
                    textBubble.classList.remove('expanded'); // Restore original styling
                }

                alert('Review updated successfully!');
            } else {
                alert('Failed to update review in storage.');
            }
        });
    }
    // --- Initialize ---
    displayInitialReviews(); // Load and display existing reviews
});

document.addEventListener('DOMContentLoaded', () => {
    const addTicketButton = document.getElementById('add-ticket-button');
    const promptElement = document.getElementById('prompt');

    addTicketButton.addEventListener('click', () => {
        // Toggle the visibility of the prompt element
        if (promptElement.classList.contains('hidden')) {
            promptElement.classList.remove('hidden');
        } else {
            promptElement.classList.add('hidden');
        }
    });
});
