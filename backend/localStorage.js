/**
 * {
 *  id : string,
 *  title : string,
 *  watchedOn : string (ISO),
 *  rating : number 1-5,
 *  imageData : string (base 64/url),
 *  notes : string,
 *  createdAt : string (ISO),
 *  updatedAt : string (ISO)
 * }
 */


/**
 * Reads 'reviews' from localStorage and returns an array of
 * all of the reviews found (parsed, not in string form). If
 * nothing is found in localStorage for 'reviews', an empty array
 * is returned.
 * @returns {Array<Object>} 
 */
function getReviewsFromStorage() {
	return JSON.parse(localStorage.getItem('reviews')) || [];
}

/**
 * Takes in an array of reviews and for each reviews creates a
 * new <review-card> element, adds the review data to that card
 * using element.data = {...}, and then appends that new review
 * to <main>
 * @param {Array<Object>} reviews An array of recipes
 */
function addReviewsToDocument(reviews) {
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
function saveReviewsToStorage(reviews) {
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
 *   - {string} imageData - Image data or image URL.
 *   - {string} notes - Any notes about the review.
 *   - {string} createdAt - ISO string timestamp for when the object was created.
 *   - {string} updatedAt - ISO string timestamp for when the object was last updated.
 */
function createReviewObject(form){
    let currentID = parseInt(localStorage.getItem('idCounter') || 0);
    localStorage.setItem('idCounter', currentID + 1);
    return{
        id : currentID,       
        title : form.get('title'),
        watchedOn : form.get('watchedOn'),
        rating : parseInt(form.get('rating')),
        imageData : form.get('imageData'),
        notes : form.get('notes'),
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString()
    }
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
function initFormHandler() {
    if (localStorage.getItem('idCounter') === null) {
        localStorage.setItem('idCounter', '0');
    }

	const form = document.querySelector('form');

	form.addEventListener('submit', (e) =>{
		e.preventDefault();

        const formData = new FormData(form);

        const reviewObject = createReviewObject(formData);

        const reviewCard = document.createElement('review-card');

        reviewCard.data = reviewObject;
        document.querySelector('main').appendChild(reviewCard);

        const curr = getReviewsFromStorage();
        curr.push(reviewObject);
        saveReviewsToStorage(curr);

	});
	const clear = document.querySelector('button.danger');

	clear.addEventListener('click', ()=>{
        localStorage.clear();
        document.querySelector('main').innerHTML = '';
	});

    //receive user input of review to be edited/deleted
    document.getElementById('delete-button').addEventListener('click', () =>{
        const titleTBD = document.getElementById('delete-title-input').value.trim().toLowerCase();
        if (!titleTBD) return;

        const reviews = getReviewsFromStorage();

        const reviewTBD = reviews.find(r => r.title.toLowerCase() === titleTBD);

        if(! reviewTBD){
            alert('movie review not found');

            return;
        }

        deleteReviewById(reviewTBD.id);
        const cards = document.querySelectorAll('review-card');
        for(const c of cards){
            if(c.data.title.toLowerCase() == titleTBD){
                c.remove();
                break;
            }
        }

        alert(`Review for ${reviewTBD.title} deleted.`);

    });

    //user edit: fetch stored data
    document.getElementById('edit-button').addEventListener('click', () =>{
        const titleTBE = document.getElementById('edit-title-input').value.trim().toLowerCase();

        if (!titleTBE) return;

        const reviews = getReviewsFromStorage();

        const reviewTBE = reviews.find(r => r.title.toLowerCase() === titleTBE);
        if(! reviewTBE){
            alert('movie review not found');
            return;
        }

        const formData = document.getElementById('update-form');
        formData.elements['title'].value = reviewTBE.title;
        formData.elements['watchedOn'].value = reviewTBE.watchedOn;
        formData.elements['rating'].value = reviewTBE.rating;
        formData.elements['imageData'].value = reviewTBE.imageData;
        formData.elements['notes'].value = reviewTBE.notes;

        formData.dataset.reviewId = reviewTBE.id;
        formData.dataset.createdAt = reviewTBE.createdAt;


    });

    //user edit: update data
    document.getElementById('update-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const reviewId = form.dataset.reviewId;
        const createdAt = form.dataset.createdAt;
        const allReviews = getReviewsFromStorage();
        const oldReview = allReviews.find(r => r.id === reviewId);

        if (!oldReview) {
            alert("Original review no longer exists.");
            return;
        }

        const updatedReview = {
            id: reviewId,
            createdAt: createdAt,
            updatedAt: new Date().toISOString(),

            //new data is used, otherwise fallback to old value
            title: formData.get('title') || oldReview.title,
            watchedOn: formData.get('watchedOn') || oldReview.watchedOn,
            rating: parseInt(formData.get('rating')) || oldReview.rating,
            imageData: formData.get('imageData') || oldReview.imageData,
            notes: formData.get('notes') || oldReview.notes
        };

        updateReview(updatedReview);

        // Clean up UI
        form.style.display = 'none';
        form.reset();

        // Re-render reviews
        document.querySelector('main').innerHTML = '';
        addReviewsToDocument(getReviewsFromStorage());

        alert(`Review for ${updatedReview.title} updated.`);
    });

}

/**
 * Updates an existing review in localStorage by matching its ID.
 * 
 * @param {Object} updatedReview - The updated review object.
 * @param {string} updatedReview.id - The unique identifier of the review to update.
 * Other expected properties: title, watchedOn, rating, imageData, notes, createdAt, updatedAt.
 * 
 * Side effects:
 * - Replaces the existing review with the same ID in localStorage.
 */
function updateReview(updatedReview) {
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
function deleteReviewById(id) {
	const reviews = getReviewsFromStorage().filter(r => r.id !== id);
	saveReviewsToStorage(reviews);
}