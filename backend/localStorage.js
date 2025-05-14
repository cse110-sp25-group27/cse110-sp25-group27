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

//creates a review object with all the data entered
function createReviewObject(form){
    return{
        id : crypto.randomUUID(),       //id of the review card
        title : form.get('title'),
        watchedOn : form.get('watchedOn'),
        rating : parseInt(form.get('rating')),
        imageData : form.get('imageData'),
        notes : form.get('notes'),
        createdAt : new Date().toISOString,
        updatedAt : new Date().toISOString
    }
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 * Form for adding reviews; may change depending on frontend
 */
function initFormHandler() {
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

    //receieve user input of review to be deleted
    document.getElementById('delete-button').addEventListener('click', () =>{
        const titleTBD = document.getElementById('delete-title-input');
        if (!titleTBD) return;

        const reviews = getReviewsFromStorage();

        const reviewTBD = reviews.find(r => r.title.toLowerCase() == titleTBD);
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

        alert('Review for {$reviewTBD.title} deleted.');

    });
}

//update reviews
function updateReview(updatedReview) {
	const reviews = getReviewsFromStorage().map(r =>
		r.id === updatedReview.id ? updatedReview : r
	);
	saveReviewsToStorage(reviews);
}

//delete a specific review
function deleteReviewById(id) {
	const reviews = getReviewsFromStorage().filter(r => r.id !== id);
	saveReviewsToStorage(reviews);
}


