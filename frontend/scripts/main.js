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
        if (!window.location.pathname.endsWith('onboarding.html')) {
            window.location.href = 'onboarding.html'; 
        }
    }
})();

import { getReviewsFromStorage, saveReviewsToStorage, createReviewObject, addReviewsToDocument as originalAddReviewsToDocument, updateReview, deleteReviewById, initFormHandler } from '../../backend/localStorage.js';
import '../../backend/reviewCard.js';

const ADD_REVIEW_BTN_SRC = '../assets/landing_imgs/add_review_btn.png';
const CANCEL_REVIEW_BTN_SRC = '../assets/landing_imgs/cancel_review_btn.png';

// --- Carousel Variables & Functions ---

/** @type {HTMLElement|null} The carousel track container where review cards are placed */
let carouselTrack = null;

/** @type {HTMLElement[]} Array of <review-card> elements currently in the carousel */
let reviewCardsInCarousel = [];

/** @type {number} The index of the currently active review card in the carousel */
let currentCarouselIndex = 0;

/** @constant {number} Width of a single review card in pixels */
const BASE_CARD_WIDTH = 280;

/** @constant {number} Margin-right of each card, must match CSS value */
const CARD_MARGIN_RIGHT = 15;

/** @constant {number} Total horizontal footprint of a card including margin */
const EFFECTIVE_CARD_FOOTPRINT = BASE_CARD_WIDTH + CARD_MARGIN_RIGHT;

/** @type {HTMLElement|null} The viewport container for centering the active review card */
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

    const targetTranslateX = -(currentCarouselIndex * EFFECTIVE_CARD_FOOTPRINT);

    if (!animate) carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = `translateX(${targetTranslateX}px)`;

    if (!animate) {
        void carouselTrack.offsetWidth;
        carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    }

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

    const defaultCard = carouselTrack.querySelector('#default-card');
    if (defaultCard) {
        carouselTrack.removeChild(defaultCard);
    }

    const prevButton = document.getElementById('carousel-prev-btn');
    const nextButton = document.getElementById('carousel-next-btn');
    if(prevButton && nextButton && prevButton.style.display === 'none'){
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
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

/**
 * Updates the add/cancel button icon based on the visibility of the new review form
 * or update form. If any form is currently visible, the cancel icon is shown.
 *
 * @function updateAddButtonState
 * @returns {void}
 */
function updateAddButtonState() {
    const buttonImg = document.getElementById('ticket-button-img');
    const newReviewForm = document.getElementById('form-container');
    const updateForm = document.getElementById('update-form');

    const welcomePrompt = document.getElementById('text-prompt');

    if (!buttonImg || !newReviewForm || !updateForm) {
        return;
    }

    const isNewFormVisible = !newReviewForm.classList.contains('hidden');
    const isUpdateFormVisible = updateForm.style.display !== 'none';

    if (isNewFormVisible || isUpdateFormVisible) {
        buttonImg.src = CANCEL_REVIEW_BTN_SRC;
        welcomePrompt.classList.add('hidden');
    } else {
        buttonImg.src = ADD_REVIEW_BTN_SRC;
        welcomePrompt.classList.remove('hidden');
    }
}

const addButton = document.getElementById('add-ticket-button');
const textBubble = document.getElementById('text-bubble');
const newReviewFormContainer = document.getElementById('form-container');
let newReviewForm = null;
let newReviewFormLoaded = false;


if (addButton && textBubble && newReviewFormContainer) {
    addButton.addEventListener('click', async () => {
        const updateForm = document.querySelector('#update-form');
        
        if (updateForm && updateForm.style.display !== 'none') {
            updateForm.style.display = 'none';
            updateForm.reset();
            textBubble.classList.remove('expanded');
            updateAddButtonState();
            return; 
        }

        if (!newReviewFormLoaded) {
            try {
                const response = await fetch('../components/template.html');
                const html = await response.text();
                newReviewFormContainer.innerHTML = html;
                newReviewFormLoaded = true;
                newReviewForm = newReviewFormContainer.querySelector('form');
                if (newReviewForm) {
                    if (!newReviewForm.id) newReviewForm.id = 'new-review';
                    initFormHandler((createdReviewObject) => {
                        addReviewCardToCarouselDOM(createdReviewObject);
                        currentCarouselIndex = reviewCardsInCarousel.length - 1;
                        updateCarouselPosition(true);
                        newReviewFormContainer.classList.add('hidden'); 
                        if (textBubble) textBubble.classList.remove('expanded');

                        updateAddButtonState(); 
                    });
                } else { console.error("Loaded template.html does not contain a form element."); }
            } catch (err) { console.error('Failed to load new review form:', err); }
        }
        
        textBubble.classList.toggle('expanded');
        newReviewFormContainer.classList.toggle('hidden');

        updateAddButtonState();
    });
} else {
    console.warn("Add ticket button, text bubble, or new review form container not found.");
}

document.addEventListener('DOMContentLoaded', () => {
    const addTicketButton = document.getElementById('add-ticket-button');
    const promptElement = document.getElementById('prompt');

    addTicketButton.addEventListener('click', () => {

        if (promptElement.classList.contains('hidden')) {
            promptElement.classList.remove('hidden');
        } else {
            promptElement.classList.add('hidden');
        }
    });
});

/**
 * Compresses and converts an image file into a base64-encoded JPEG for localStorage.
 *
 * @async
 * @function processImageForStorage
 * @param {File} imageFile - The image file to process.
 * @param {number} [maxWidth=600] - Maximum width of the output image.
 * @param {number} [maxHeight=20000] - Maximum height of the output image.
 * @param {number} [quality=0.7] - JPEG quality (0 to 1).
 * @returns {Promise<string>} - A Promise that resolves to a base64 JPEG string.
 */
async function processImageForStorage(imageFile, maxWidth = 600, maxHeight = 20000, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

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

document.addEventListener('DOMContentLoaded', () => {
    mainViewportElement = document.querySelector('.poster-carousel main');
    const updateReviewForm = document.querySelector('#update-form');

    if (!mainViewportElement) {
        console.error('CRITICAL: <main> element for carousel viewport not found. Carousel will not work.');
        return;
    }
    if (!mainViewportElement.querySelector('.carousel-track')) {
        carouselTrack = document.createElement('div');
        carouselTrack.classList.add('carousel-track');
        mainViewportElement.appendChild(carouselTrack);
    } else {
        carouselTrack = mainViewportElement.querySelector('.carousel-track');
    }

    if (!updateReviewForm) {
        console.warn('Update review form (#update-form) not found. Editing may not work as expected if it relies on this script managing it.');
    } else {
        updateReviewForm.style.display = 'none';
    }

    const addTicketButtonForPrompt = document.getElementById('add-ticket-button');
    const promptElement = document.getElementById('prompt');
    if (addTicketButtonForPrompt && promptElement) {
        addTicketButtonForPrompt.addEventListener('click', () => {
            promptElement.classList.toggle('hidden');
        });
    }

/**
 * Advances the carousel to the next review card (wraps to first if at end).
 *
 * @private
 * @function showNextCard
 * @returns {void}
 */
    function showNextCard() {
        if (reviewCardsInCarousel.length === 0) return;
        currentCarouselIndex = (currentCarouselIndex + 1) % reviewCardsInCarousel.length;
        updateCarouselPosition();
    }
/**
 * Moves the carousel to the previous review card (wraps to last if at beginning).
 *
 * @private
 * @function showPrevCard
 * @returns {void}
 */
    function showPrevCard() {
        if (reviewCardsInCarousel.length === 0) return;
        currentCarouselIndex = (currentCarouselIndex - 1 + reviewCardsInCarousel.length) % reviewCardsInCarousel.length;
        updateCarouselPosition();
    }
/**
 * Loads all reviews from localStorage and populates the carousel.
 * If no reviews exist, a default placeholder card is shown.
 *
 * @private
 * @function displayInitialReviews
 * @returns {void}
 */
    function displayInitialReviews() {
        if (!carouselTrack) {
            console.error("Carousel track not available for initial reviews.");
            return;
        }
        carouselTrack.innerHTML = ''; 
        reviewCardsInCarousel = [];
        const reviews = getReviewsFromStorage();
  
        if (reviews.length === 0) {
            const defaultCard = document.createElement('review-card');
            defaultCard.id = 'default-card';

            const shadow = defaultCard.shadowRoot;
            if (shadow) {
                const contentArea = shadow.querySelector('.review-card-front-content');
                const backFace = shadow.querySelector('.back-view');

                if (contentArea) {
                    contentArea.innerHTML = `
                        <p class="admit-one-text">No Reviews</p>
                        <hr class="dashed-line">
                        <p style="font-size: 1.1em; color: #D7D7D7; line-height: 1.5; font-family: Arial, sans-serif; padding: 20px; text-transform: none;">
                            Click "Add Ticket" to create your first review.
                        </p>
                    `;
                    contentArea.style.justifyContent = 'center';
                }
                if (backFace) {
                    backFace.remove();
                }
            }
  
            defaultCard.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
            }, true);

            carouselTrack.appendChild(defaultCard);
            const prevButton = document.getElementById('carousel-prev-btn');
            const nextButton = document.getElementById('carousel-next-btn');
            if(prevButton && nextButton){
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        } else {
          reviews.forEach(review => addReviewCardToCarouselDOM(review));
        }
        
        if (reviewCardsInCarousel.length > 0) {
            currentCarouselIndex = 0; 
            updateCarouselPosition(false);
        }
    }

    const prevButton = document.getElementById('carousel-prev-btn');
    const nextButton = document.getElementById('carousel-next-btn');

    if (prevButton) prevButton.addEventListener('click', showPrevCard);
    if (nextButton) nextButton.addEventListener('click', showNextCard);


    mainViewportElement.addEventListener('delete-review', (event) => {
        const reviewIdToDelete = event.detail.reviewId;
        const cardElement = event.target;

        const cardIndexInCarousel = reviewCardsInCarousel.indexOf(cardElement);

        if (cardIndexInCarousel === -1) {
            console.warn("Attempted to delete a card not found in the carousel's JS array.");
            return;
        }

        const reviewTitle = cardElement.data ? cardElement.data.title : "this review";

        if (confirm(`Are you sure you want to delete ${reviewTitle}?`)) {
            deleteReviewById(reviewIdToDelete);
        
            carouselTrack.removeChild(cardElement);
            reviewCardsInCarousel.splice(cardIndexInCarousel, 1);

            if (reviewCardsInCarousel.length === 0) {
                currentCarouselIndex = 0; 
                updateCarouselPosition(false); 
                displayInitialReviews(); 
            } else {
        
                if (currentCarouselIndex >= reviewCardsInCarousel.length) {
                    currentCarouselIndex = reviewCardsInCarousel.length - 1;
                } else if (cardIndexInCarousel < currentCarouselIndex) {
                    currentCarouselIndex--;
                }
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



        if (newReviewFormContainer && !newReviewFormContainer.classList.contains('hidden')) {
            newReviewFormContainer.classList.add('hidden');
            if (textBubble) textBubble.classList.remove('expanded');
        }

        const reviewDataToEdit = event.detail.reviewData;
        console.log('Editing review (from main.js):', reviewDataToEdit);

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
            : "0"; 
        const ratingRadios = updateReviewForm.querySelectorAll('input[name="update-rating"]');
        ratingRadios.forEach(radio => {
            radio.checked = radio.value === ratingValue;
        });

        updateReviewForm.dataset.editingId = reviewDataToEdit.id; 
        updateReviewForm.dataset.createdAt = reviewDataToEdit.createdAt; 

        updateReviewForm.style.display = 'block';
        if (textBubble) textBubble.classList.add('expanded'); 
        updateAddButtonState();
    });

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

            let imageData = oldReviewData.imageData; 
            const imageFile = formData.get('update-movie-poster');

            if (imageFile && imageFile.size > 0) {
                try {
                    imageData = await processImageForStorage(imageFile);
                } catch (err) {
                    console.error("Error processing image file for update:", err);
                    alert("Failed to process new image. Keeping old image or no image if new.");

                }
            }

            const updatedReviewData = {
                id: parseInt(reviewId),
                title: formData.get('update-movie-title'),
                imageData: imageData,
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
                const cardToUpdate = reviewCardsInCarousel.find(card => card.data.id.toString() === reviewId);
                if (cardToUpdate) {
                    cardToUpdate.data = updatedReviewData; 
                } else {
                    console.warn("Updated card not found in carousel DOM array for live update.");
                    displayInitialReviews();
                }
                form.style.display = 'none';
                form.reset();
                const textBubble = document.getElementById('text-bubble');
                if (textBubble) {
                    textBubble.classList.remove('expanded'); 
                }

                updateAddButtonState();

                alert('Review updated successfully!');
            } else {
                alert('Failed to update review in storage.');
            }
        });
    }

    displayInitialReviews();
});
