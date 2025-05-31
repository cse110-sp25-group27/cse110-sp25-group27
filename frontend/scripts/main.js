// Import functions from localStorage.js and the ReviewCard component
import { getReviewsFromStorage, saveReviewsToStorage, createReviewObject, addReviewsToDocument, updateReview, deleteReviewById, initFormHandler } from '../../backend/localStorage.js';
import '../../backend/reviewCard.js'; // This ensures ReviewCard custom element is defined

// --- Logic for loading the NEW review form ---
const addButton = document.getElementById('add-ticket-button');
const textBubble = document.getElementById('text-bubble');
const newReviewFormContainer = document.getElementById('form-container'); // Container for new review form
let newReviewForm = null; 
let newReviewFormLoaded = false;

if (addButton && textBubble && newReviewFormContainer) {
    addButton.addEventListener('click', async () => {
        const updateFormContainer = document.getElementById('update-form-container');
        if (updateFormContainer) updateFormContainer.classList.add('hidden'); // Hide update form if open

        if (!newReviewFormLoaded) {
            try {
                const response = await fetch('../components/template.html'); 
                const html = await response.text();
                newReviewFormContainer.innerHTML = html;
                newReviewFormLoaded = true;
                newReviewForm = newReviewFormContainer.querySelector('form'); 
                if (newReviewForm) {
                    if (!newReviewForm.id) {
                        newReviewForm.id = 'new-review';
                    }
                    initFormHandler(); 
                } else {
                    console.error("Loaded template.html does not contain a form element.");
                }
            } catch (err) {
                console.error('Failed to load new review form:', err);
            }
        }
        textBubble.classList.toggle('expanded'); 
        newReviewFormContainer.classList.toggle('hidden'); 
    });
} else {
    console.warn("Add ticket button, text bubble, or new review form container not found.");
}
// --- End of new review form loading logic ---

document.addEventListener('DOMContentLoaded', () => {
    const mainContentArea = document.querySelector('.poster-carousel main');
    const updateFormContainer = document.getElementById('update-form-container'); // Container for update form
    let currentUpdateForm = null; // Will hold the dynamically loaded update form

    if (!mainContentArea) {
        console.error('Error: <main> element (for reviews) not found.');
        return;
    }
    if (!updateFormContainer) {
        console.error('Error: Update form container (#update-form-container) not found. Editing will not work.');
    }

    const reviews = getReviewsFromStorage();
    addReviewsToDocument(reviews);

    mainContentArea.addEventListener('delete-review', (event) => {
        const reviewIdToDelete = event.detail.reviewId;
        const reviewTitle = event.target.data ? event.target.data.title : "this review";
        if (confirm(`Are you sure you want to delete ${reviewTitle}?`)) {
            deleteReviewById(reviewIdToDelete);
            event.target.remove();
            console.log(`Review ID: ${reviewIdToDelete} deleted.`);
        }
    });

    mainContentArea.addEventListener('edit-review', async (event) => {
        if (!updateFormContainer) {
            alert('Update form container is not available. Cannot edit review.');
            return;
        }

        // Hide new review form if it's visible
        if (newReviewFormContainer) newReviewFormContainer.classList.add('hidden');
        if (textBubble) textBubble.classList.remove('expanded'); // Assuming this hides the bubble text too

        const reviewDataToEdit = event.detail.reviewData;
        console.log('Editing review:', reviewDataToEdit);

        try {
            const response = await fetch('../components/update_template.html');
            const html = await response.text();
            updateFormContainer.innerHTML = html;
            currentUpdateForm = updateFormContainer.querySelector('form#update-form'); // Get the form by ID

            if (!currentUpdateForm) {
                console.error("Failed to find form with id 'update-form' in update_template.html");
                updateFormContainer.classList.add('hidden');
                return;
            }

            // Populate the dynamically loaded update form
            currentUpdateForm.querySelector('#update-movie-title').value = reviewDataToEdit.title;
            currentUpdateForm.querySelector('#update-release-date').value = reviewDataToEdit.releaseDate;
            const watchedDate = new Date(reviewDataToEdit.watchedOn);
            const formattedWatchedDate = watchedDate.toISOString().split('T')[0];
            currentUpdateForm.querySelector('#update-watch-date').value = formattedWatchedDate;
            currentUpdateForm.querySelector('#update-watch-count').value = reviewDataToEdit.watchCount;
            currentUpdateForm.querySelector('#update-review').value = reviewDataToEdit.notes;
            
            const ratingToSet = reviewDataToEdit.rating !== undefined ? reviewDataToEdit.rating.toString() : "0";
            const ratingRadios = currentUpdateForm.querySelectorAll('input[name="update-rating"]');
            ratingRadios.forEach(radio => {
                radio.checked = radio.value === ratingToSet;
            });

            currentUpdateForm.dataset.editingId = reviewDataToEdit.id;
            currentUpdateForm.dataset.createdAt = reviewDataToEdit.createdAt;

            // Attach submit listener to this specific form instance
            currentUpdateForm.addEventListener('submit', handleUpdateFormSubmit);
            
            // Attach cancel listener
            const cancelUpdateButton = currentUpdateForm.querySelector('#cancel-update');
            if (cancelUpdateButton) {
                cancelUpdateButton.addEventListener('click', () => {
                    updateFormContainer.classList.add('hidden');
                    updateFormContainer.innerHTML = ''; // Clear the loaded form
                    currentUpdateForm = null; // Reset reference
                });
            }
            
            updateFormContainer.classList.remove('hidden'); // Show the container with the loaded form

        } catch (err) {
            console.error('Failed to load update form:', err);
            alert('Could not load the edit form. Please try again.');
        }
    });

    // Handler for update form submission (defined once, attached dynamically)
    async function handleUpdateFormSubmit(e) {
        e.preventDefault();
        const form = e.target; // The update form that was submitted
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
                imageData = await readFileAsDataURL(imageFile);
            } catch (err) {
                console.error("Error reading new image file for update:", err);
                alert("Failed to process new image for update. Keeping old image.");
            }
        }
        
        const updatedReview = {
            id: parseInt(reviewId),
            title: formData.get('update-movie-title'),
            imageData: imageData,
            releaseDate: formData.get('update-release-date'),
            watchedOn: formData.get('update-watch-date'),
            watchCount: parseInt(formData.get('update-watch-count')) || 1,
            notes: formData.get('update-review'),
            rating: parseInt(formData.get('update-rating')) || 0,
            createdAt: createdAtOriginal,
            updatedAt: new Date().toISOString()
        };

        updateReview(updatedReview);

        let cardToUpdate = null;
        const cards = mainContentArea.querySelectorAll('review-card');
        cards.forEach(card => {
            if (card.data && card.data.id.toString() === reviewId) { 
                cardToUpdate = card;
            }
        });

        if (cardToUpdate) {
            cardToUpdate.data = updatedReview;
        } else {
            console.warn("Could not find specific card to update. Refreshing all reviews.");
            mainContentArea.innerHTML = '';
            addReviewsToDocument(getReviewsFromStorage());
        }

        // Clean up: Hide and clear the update form container
        if (updateFormContainer) {
            updateFormContainer.classList.add('hidden');
            updateFormContainer.innerHTML = ''; // Clear the loaded form
        }
        currentUpdateForm = null; // Reset reference
    }
});

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
