/**
 * Defines the structure for a movie review object.
 * {
 *  id: string, // Unique identifier
 *  title: string, // Movie title
 *  imageData: string, // Base64 encoded image data or image URL
 *  releaseDate: string, // Release date of the movie
 *  watchedOn: string, // Date the movie was watched (ISO format)
 *  watchCount: number, // How many times the user has watched this movie
 *  notes: string, // User's review/notes
 *  rating: number, // User's rating (0-5)
 *  createdAt: string, // Timestamp of creation (ISO format)
 *  updatedAt: string // Timestamp of last update (ISO format)
 * }
 */

/**
 * Reads 'reviews' from localStorage and returns an array of
 * all of the reviews found (parsed, not in string form). If
 * nothing is found in localStorage for 'reviews', an empty array
 * is returned.
 * @returns {Array<Object>} 
 */
export function getReviewsFromStorage() {
	return JSON.parse(localStorage.getItem('reviews')) || [];
}

/**
 * Takes in an array of reviews and for each reviews creates a
 * new <review-card> element, adds the review data to that card
 * using element.data = {...}, and then appends that new review
 * to <main>
 * @param {Array<Object>} reviews An array of recipes
 */
export function addReviewsToDocument(reviews) {
	const main = document.querySelector('main');
	for(const review of reviews){
		const reviewCard = document.createElement('review-card');
		reviewCard.data = review;
		main.appendChild(reviewCard);
	}
}

/**
 * Takes in an array of reviews, converts it to a string, and then
 * saves that string to 'reviews' in localStorage
 * @param {Array<Object>} reviews An array of review objects.
 * @returns {boolean} True if the save was successful, false otherwise.
 */
export function saveReviewsToStorage(reviews) {
	try {
		localStorage.setItem('reviews', JSON.stringify(reviews));	
		return true;
	} catch (e) {
		console.error("Failed to save reviews to storage:", e);
		return false;
	}
}

/**
 * Creates a review object using the data provided from a form.
 *
 * @param {FormData} form - A FormData object containing review details. Expected keys:
 *   - 'title': {string} The title of the review.
 *   - 'watchedOn': {string} The date the item was watched.
 *   - 'rating': {string|number} The rating given, which will be parsed as an integer.
 *   - 'imageData': {string} Base64 or URL string for the image.
 *   - 'notes': {string} Optional notes about the item.
 *
 * @returns {Object} A review object with the following properties:
 *   - {string} id - A unique identifier for the review.
 *   - {string} title - The title from the form.
 *   - {string} watchedOn - The date the item was watched.
 *   - {number} rating - The parsed integer rating.
 *   - {number} watchCount - The number of times the item was watched.
 *   - {string} imageData - file converted to base 64 string.
 *   - {string} notes - Notes section of the review.
 *   - {string} createdAt - ISO string timestamp for when the object was created.
 *   - {string} updatedAt - ISO string timestamp for when the object was last updated.
 */
export function createReviewObject(form){
    return new Promise(async (resolve, reject) => {
        let currentID = parseInt(localStorage.getItem('idCounter') || 0);
        localStorage.setItem('idCounter', currentID + 1);
        const file = form.get('movie-poster');
        let processedImageData = "";

        if (file && file.size > 0) {
            try {
                processedImageData = await processImageForStorage(file);
            } catch (err) {
                console.error("Image processing failed:", err);
            }
        }

        resolve({
            id : currentID,       
            title : form.get('movie-title'),
            watchedOn : form.get('watch-date'),
            watchCount: parseInt(form.get('watch-count')) || 1,
            rating : parseInt(form.get('rating')) || 0,
            imageData : processedImageData,
            notes : form.get('review'),
            releaseDate: form.get('release-date'),
            createdAt : new Date().toISOString(),
            updatedAt : new Date().toISOString()
        });
    });
}

/**
 * Initializes event handlers for new review form submission.
 * @param {function(Object): void} [onReviewCreated] - Optional callback function 
 *                                                    that receives the new review object.
 *                                                    If provided, DOM appending is skipped.
 */
export function initFormHandler(onReviewCreated) {
    if (localStorage.getItem('idCounter') === null) {
        localStorage.setItem('idCounter', '0');
    }

    // This assumes the form #new-review is loaded into the DOM when this is called.
    // In main.js, we ensure this by calling initFormHandler after fetching template.html.
    const form = document.querySelector('#new-review'); 

    if (!form) {
        console.warn("#new-review form not found when initFormHandler was called. Submit won't be handled by localStorage.js's default.");
        return;
    }
    
    // Check if a listener is already attached to prevent duplicates if called multiple times
    if (form.dataset.submitListenerAttached === 'true') {
        return;
    }
    form.dataset.submitListenerAttached = 'true';


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const title = formData.get('movie-title')?.toLowerCase();
        const existingReviews = getReviewsFromStorage();
        const exist = existingReviews.some(r => r.title.toLowerCase() === title);

        if (exist) {
            alert(`A review for "${formData.get('movie-title')}" already exists.`);
            form.reset();
            return;
        }

        try {
            const reviewObject = await createReviewObject(formData);
            
            // Save to localStorage
            const currLocalStorage = getReviewsFromStorage();
            currLocalStorage.push(reviewObject);
            saveReviewsToStorage(currLocalStorage);
            form.reset();

            if (typeof onReviewCreated === 'function') {
                onReviewCreated(reviewObject); // Call the callback
            } else {
                // Default DOM manipulation (original behavior if no callback)
                // This part should ideally not run if main.js handles carousel addition.
                console.warn("initFormHandler: No onReviewCreated callback provided, attempting default DOM add (may conflict with carousel).");
                const reviewCard = document.createElement('review-card');
                reviewCard.data = reviewObject;
                const mainElement = document.querySelector('main'); // General main
                if (mainElement) {
                     mainElement.appendChild(reviewCard);
                } else {
                    console.error("initFormHandler: Default DOM add failed, no <main> element found.")
                }
            }
        } catch (err) {
            console.error("Error reading image file or creating review:", err);
            alert("Failed to process image upload or create review.");
        }
    });

    // Clear button logic can remain if you have a global clear button
    const clearButton = document.querySelector('button.danger');
    if (clearButton && !clearButton.dataset.listenerAttached) {
        clearButton.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete ALL reviews? This cannot be undone.")) {
                localStorage.clear();
                localStorage.setItem('idCounter', '0');
                // Clearing the carousel track will be handled by main.js (e.g., by calling displayInitialReviews)
                const carouselTrackElement = document.querySelector('.carousel-track');
                if(carouselTrackElement) carouselTrackElement.innerHTML = '';
                // Also, ensure the reviewCardsInCarousel array in main.js is cleared. This requires more coupling or an event.
                // For simplicity, a full page reload or re-calling displayInitialReviews from main.js is an option here.
                 window.location.reload(); // Simple way to refresh the view
            }
        });
        clearButton.dataset.listenerAttached = 'true';
    }
}

/**
 * Updates an existing review in localStorage by matching its ID.
 * 
 * @param {Object} updatedReview - The updated review object.
 * @param {string} updatedReview.id - The unique identifier of the review to update.
 * Other expected properties: title, watchedOn, watchCount, rating, imageData, review, createdAt, updatedAt.
 * @returns {boolean} True if the review was found and updated successfully, false otherwise.
 * 
 * Side effects:
 * - Replaces the existing review with the same ID in localStorage.
 */
export function updateReview(updatedReview) {
	let reviewFound = false;
	const reviews = getReviewsFromStorage().map(r => {
		if (r.id === updatedReview.id) {
			reviewFound = true;
			return updatedReview;
		}
		return r;
	});
	
	if (reviewFound) {
		return saveReviewsToStorage(reviews);
	}
	return false;
}

/**
 * Deletes a review from localStorage by its unique ID.
 * 
 * @param {string} id - The unique identifier of the review to delete.
 * 
 * Side effects:
 * - Removes the review with the given ID from localStorage.
 */
export function deleteReviewById(id) {
	const reviews = getReviewsFromStorage().filter(r => r.id !== id);
	saveReviewsToStorage(reviews);
}

// NEW FUNCTION: To compress/resize images
export async function processImageForStorage(imageFile, maxWidth = 600, maxHeight = 600, quality = 0.7) {
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
                // Use image/jpeg for better compression for photos, adjust quality as needed
                resolve(canvas.toDataURL('image/jpeg', quality)); 
            };
            img.onerror = (err) => {
                console.error("Image load error in processImageForStorage", err);
                reject(new Error("Failed to load image for processing."));
            };
            img.src = event.target.result; // Original base64 from FileReader
        };
        reader.onerror = (err) => {
            console.error("FileReader error in processImageForStorage", err);
            reject(new Error("Failed to read file for processing."));
        };
        reader.readAsDataURL(imageFile); // Read the original file
    });
}


