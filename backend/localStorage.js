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
 * @param {Array<Object>} reviews 
 */
export function saveReviewsToStorage(reviews) {
	localStorage.setItem('reviews', JSON.stringify(reviews));	
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
    return new Promise((resolve, reject)=>{
        let currentID = parseInt(localStorage.getItem('idCounter') || 0);
        localStorage.setItem('idCounter', currentID + 1);
        const file = form.get('movie-poster');

        if(!file || file.size === 0){
            resolve({
                id : currentID,       
                title : form.get('movie-title'),
                watchedOn : form.get('watch-date'),
                watchCount: parseInt(form.get('watch-count')) || 1,
                rating : parseInt(form.get('rating')),
                imageData : "",
                notes : form.get('review'),
                releaseDate: form.get('release-date'),
                createdAt : new Date().toISOString(),
                updatedAt : new Date().toISOString()
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            resolve({
                id : currentID,       
                title : form.get('movie-title'),
                watchedOn : form.get('watch-date'),
                watchCount: parseInt(form.get('watch-count')) || 1,
                rating : parseInt(form.get('rating')),
                imageData : e.target.result,
                notes : form.get('review'),
                releaseDate: form.get('release-date'),
                createdAt : new Date().toISOString(),
                updatedAt : new Date().toISOString()
            });
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);

    });

}

/**
 * Initializes all event handlers for form interactions in the review application.
 * 
 * This includes:
 * - Handling form submission to create a new review card, update the DOM, and save to localStorage.
 * - Handling "Clear" button to remove all reviews from localStorage and the page.
 * - Handling "Delete" button to remove a review by matching its title.
 * - Handling "Edit" button to pre-fill an update form with review data for a selected title.
 * - Handling update form submission to modify a review, update localStorage, and re-render the DOM.
 * 
 * Expects the following DOM elements to exist:
 * - <form> main review form
 * - <main> container where <review-card> elements are appended
 * - Button with class `danger` to clear all reviews
 * - Button with id `delete-button` and input with id `delete-title-input`
 * - Button with id `edit-button` and input with id `edit-title-input`
 * - Form with id `update-form` for editing reviews
 * 
 * Side effects:
 * - Manipulates localStorage
 * - Updates the DOM by adding/removing/replacing <review-card> elements
 */
export function initFormHandler() {
    if (localStorage.getItem('idCounter') === null) {
        localStorage.setItem('idCounter', '0');
    }

	const form = document.querySelector('#new-review');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
        const formData = new FormData(form);

        const title = formData.get('movie-title')?.toLowerCase();
        const existingReviews = getReviewsFromStorage();
        const exist = existingReviews.some(r => r.title.toLowerCase() == title);
        if(exist){
            alert(`A review for "${formData.get('movie-title')}" already exists.`);
            form.reset();
            return;
        }

        try{
            const reviewObject = await createReviewObject(formData);
            const reviewCard = document.createElement('review-card');
            reviewCard.data = reviewObject;
            document.querySelector('main').appendChild(reviewCard);

            const curr = getReviewsFromStorage();
            curr.push(reviewObject);
            saveReviewsToStorage(curr);
            form.reset();
        }
        catch(err){
            console.error("Error reading image file or creating review:", err);
            alert("Failed to process image upload or create review.");
        }
	});

	const clearButton = document.querySelector('button.danger');

	clearButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete ALL reviews? This cannot be undone.")) {
            localStorage.clear();
            localStorage.setItem('idCounter', '0');
            document.querySelector('main').innerHTML = '';
        }
	});

}

/**
 * Updates an existing review in localStorage by matching its ID.
 * 
 * @param {Object} updatedReview - The updated review object.
 * @param {string} updatedReview.id - The unique identifier of the review to update.
 * Other expected properties: title, watchedOn, watchCount, rating, imageData, review, createdAt, updatedAt.
 * 
 * Side effects:
 * - Replaces the existing review with the same ID in localStorage.
 */
export function updateReview(updatedReview) {
	const reviews = getReviewsFromStorage().map(r =>
		r.id === updatedReview.id ? updatedReview : r
	);
	saveReviewsToStorage(reviews);
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


