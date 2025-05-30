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
 *   - {number} watchCount - The number of times the item was watched.
 *   - {string} imageData - file converted to base 64 string.
 *   - {string} notes - Notes section of the review.
 *   - {string} createdAt - ISO string timestamp for when the object was created.
 *   - {string} updatedAt - ISO string timestamp for when the object was last updated.
 */
function createReviewObject(form){
    return new Promise((resolve, reject)=>{
        let currentID = parseInt(localStorage.getItem('idCounter') || 0);
        localStorage.setItem('idCounter', currentID + 1);
        const file = form.get('movie-poster');

        if(!file || file.size == 0){
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
function initFormHandler() {
    if (localStorage.getItem('idCounter') === null) {
        localStorage.setItem('idCounter', '0');
    }

	const form = document.querySelector('#new-review');

	form.addEventListener('submit', async (e) =>{
		e.preventDefault();
        const formData = new FormData(form);

        const title = formData.get('movie-title')?.toLowerCase();
        const exist = getReviewsFromStorage().some(r =>r.title.toLowerCase() == title);
        if(exist){
            alert(`A review for "${title}" already exists.`);
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
        }
        catch(err){
            console.error("Error reading image file:", err);
            alert("Failed to process image upload.");
        }

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
            alert("movie review not found");
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
            alert("movie review not found");
            return;
        }

        const formData = document.getElementById('update-form');
        formData.elements['movie-title'].value = reviewTBE.title;
        formData.elements['watch-date'].value = reviewTBE.watchedOn;
        formData.elements['watch-count'].value = reviewTBE.watchCount;
        formData.elements['rating'].value = reviewTBE.rating;
        formData.elements['movie-poster'].value = reviewTBE.imageData;
        formData.elements['release-date'].value = reviewTBE.releaseDate;
        formData.elements['review'].value = reviewTBE.notes;

        formData.dataset.reviewId = reviewTBE.id;
        formData.dataset.createdAt = reviewTBE.createdAt;


    });

    //user edit: update data
    document.getElementById('update-form').addEventListener('submit', async (e) => {
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

        const file = formData.get('movie-poster');

        let imageData = oldReview.imageData;
        if(file && file.size > 0){
            try{
                imageData = await new Promise((resolve, reject) =>{
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () =>{
                        alert("Failed to read the image file.");
                        finishUpdate(null);
                    };
                    reader.readAsDataURL(file);
                });
            }
            catch(err){
                alert(err);
                return;
            }
        }

        const updatedReview = {
            id: reviewId,
            createdAt: createdAt,
            updatedAt: new Date().toISOString(),

            title: formData.get('movie-title') || oldReview.title,
            watchedOn: formData.get('watch-date') || oldReview.watchedOn,
            watchCount: parseInt(formData.get('watch-count')) || oldReview.watchCount || 1,
            rating: parseInt(formData.get('rating')) || oldReview.rating,
            imageData: imageData || oldReview.imageData,
            releaseDate: formData.get('release-date') || oldReview.releaseDate,
            notes: formData.get('review') || oldReview.notes,
            
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
 * Other expected properties: title, watchedOn, watchCount, rating, imageData, review, createdAt, updatedAt.
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


