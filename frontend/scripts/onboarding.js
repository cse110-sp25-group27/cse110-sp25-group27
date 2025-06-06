// Imports from localStorage.js (adjust path if necessary)
import { getReviewsFromStorage, saveReviewsToStorage } from '../../backend/localStorage.js';

/**
 * Immediately redirects the user to `landing_page.html` if there is at least one review.
 * The check is based on if there is at least 1 review using getReviewsFromStorage().
 * 
 * This logic should be placed at the top of your script to ensure it executes
 * before any other UI logic, preventing unauthorized access to the onboarding page.
 *
 * @function
 * @returns {void}
 */
(function() {
    if (window.location.pathname.endsWith('onboarding.html')) {
        const reviews = getReviewsFromStorage();
        if (reviews.length >= 1) {
            window.location.href = 'landing_page.html';
        }
    }
})(); // Self-invoking function to run immediately

const presetMovies = [
    {
      id_preset: 'p1',
      title: 'Inception',
      posterUrl: '../assets/posters/inception.png',
      releaseDate: '2010-07-16'
    },
    {
      id_preset: 'p2',
      title: 'The Matrix',
      posterUrl: '../assets/posters/matrix.png',
      releaseDate: '1999-03-31'
    },
    {
      id_preset: 'p3',
      title: 'Interstellar',
      posterUrl: '../assets/posters/interstellar.png',
      releaseDate: '2014-11-07'
    },
    {
      id_preset: 'p4',
      title: 'Parasite',
      posterUrl: '../assets/posters/parasite.png',
      releaseDate: '2019-10-11'
    },
    {
      id_preset: 'p5',
      title: 'Barbie',
      posterUrl: '../assets/posters/barbie.png',
      releaseDate: '2023-07-21'
    },
    {
      id_preset: 'p6',
      title: 'Oppenheimer',
      posterUrl: '../assets/posters/oppenheimer.png',
      releaseDate: '2023-07-21'
    },
    {
      id_preset: 'p7',
      title: 'Everything Everywhere All at Once',
      posterUrl: '../assets/posters/everything_everywhere.png',
      releaseDate: '2022-03-11'
    },
    {
      id_preset: 'p8',
      title: 'La La Land',
      posterUrl: '../assets/posters/la_la_land.png',
      releaseDate: '2016-12-09'
    },
    {
      id_preset: 'p9',
      title: 'The Dark Knight',
      posterUrl: '../assets/posters/dark_knight.png',
      releaseDate: '2008-07-18'
    },
    {
      id_preset: 'p10',
      title: 'The Social Network',
      posterUrl: '../assets/posters/social_network.png',
      releaseDate: '2010-10-01'
    },
    {
      id_preset: 'p11',
      title: 'Get Out',
      posterUrl: '../assets/posters/get_out.png',
      releaseDate: '2017-02-24'
    },
    {
      id_preset: 'p12',
      title: 'The Shawshank Redemption',
      posterUrl: '../assets/posters/shawshank.png',
      releaseDate: '1994-09-23'
    },
    {
      id_preset: 'p13',
      title: 'Spider-Man: Into the Spider-Verse',
      posterUrl: '../assets/posters/spiderman.png',
      releaseDate: '2018-12-14'
    },
    {
      id_preset: 'p14',
      title: 'The Hunger Games',
      posterUrl: '../assets/posters/hunger_games.png',
      releaseDate: '2012-03-23'
    },
    {
      id_preset: 'p15',
      title: 'The Avengers',
      posterUrl: '../assets/posters/avengers.png',
      releaseDate: '2012-05-04'
    },
    {
      id_preset: 'p16',
      title: 'Titanic',
      posterUrl: '../assets/posters/titanic.png',
      releaseDate: '1997-12-19'
    },
    {
      id_preset: 'p17',
      title: 'The Wolf of Wall Street',
      posterUrl: '../assets/posters/wolf_wallstreet.png',
      releaseDate: '2013-12-25'
    },
    {
      id_preset: 'p18',
      title: 'Avatar',
      posterUrl: '../assets/posters/avatar.png',
      releaseDate: '2009-12-18'
    },
    {
      id_preset: 'p19',
      title: 'Mean Girls',
      posterUrl: '../assets/posters/mean_girls.png',
      releaseDate: '2004-04-30'
    },
    {
      id_preset: 'p20',
      title: 'Black Panther',
      posterUrl: '../assets/posters/black_panther.png',
      releaseDate: '2018-02-16'
    }
  ];
  

document.addEventListener('DOMContentLoaded', () => {
    const movieOptionsContainer = document.getElementById('movie-strip-container');
    const saveButton = document.getElementById('save-onboarding-button');

    if (!movieOptionsContainer || !saveButton) {
        console.error("Required onboarding elements not found!");
        return;
    }

    /**
     * Renders the preset movie options as interactive flip cards in the DOM.
     * Each card has a front with the movie poster and a button to add details,
     * and a back with a form for the user to input their review. Event listeners
     * are attached to handle flipping the card and tracking which cards have had
     * details saved.
     */
    function renderMovieOptionCards() {
        presetMovies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-option-card');
            card.dataset.presetId = movie.id_preset;
            card.dataset.detailsAdded = "false"; // Initialize: no details added yet

            // Card Inner structure for flip
            const cardInner = document.createElement('div');
            cardInner.classList.add('movie-card-inner');

            // Card Front
            const cardFront = document.createElement('div');
            cardFront.classList.add('movie-card-front');
            cardFront.innerHTML = `
                <div class="selection-indicator"></div>
                <img src="${movie.posterUrl}" alt="${movie.title} Poster" class="poster">
                <h3>${movie.title}</h3>
                <p class="release-date">Released: ${movie.releaseDate}</p>
                <button class="select-button">Add/Edit My Details</button>
            `;

            // Card Back (contains the form)
            const cardBack = document.createElement('div');
            cardBack.classList.add('movie-card-back');
            cardBack.innerHTML = `
                <form>
                <h4>${movie.title} - Your Details</h4>
                <div class="form-scroll-content">
                    <label for="watch-date-${movie.id_preset}">Your Watch Date:</label>
                    <input type="date" id="watch-date-${movie.id_preset}" name="watch-date-${movie.id_preset}" required>

                    <label for="watch-count-${movie.id_preset}">Times Watched:</label>
                    <input type="number" id="watch-count-${movie.id_preset}" name="watch-count-${movie.id_preset}" min="1" value="1" required>
                    
                    <label for="notes-${movie.id_preset}">Your Review/Notes:</label>
                    <textarea id="notes-${movie.id_preset}" name="notes-${movie.id_preset}" rows="3" required></textarea>

                    <label>Your Rating:</label>
                    <div class="rating-group">
                        ${[0,1,2,3,4,5].map(r => `
                            <label>
                                <input type="radio" name="rating-${movie.id_preset}" value="${r}" ${r === 0 ? 'checked' : ''}> ${r}
                            </label>`).join('')}
                    </div>
                </div>
                <button class="save-card-details-button">Save Details for This Movie</button> 
                </form>
            `;
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            movieOptionsContainer.appendChild(card);

            // Event listener for the select button on the front to flip to back
            const frontSelectBtn = card.querySelector('.movie-card-front .select-button');
            const backSaveDetailsBtn = card.querySelector('.movie-card-back .save-card-details-button');

            frontSelectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('is-flipped');
                // Update button text based on current status when flipping TO back
                if (card.dataset.detailsAdded === "true") {
                    frontSelectBtn.textContent = 'Edit My Details ✓';
                    // frontSelectBtn.classList.add('details-entered'); // Style might already be there
                } else {
                    frontSelectBtn.textContent = 'Add My Details';
                    // frontSelectBtn.classList.remove('details-entered');
                }
            });

            // Event listener for the "Save Details" button on the back to flip to front
            backSaveDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const form = cardBack.querySelector('form');

                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                card.dataset.detailsAdded = "true"; 
                frontSelectBtn.textContent = 'Edit My Details ✓';
                frontSelectBtn.classList.add('details-entered');
                card.classList.add('details-saved-indicator'); 
                card.classList.remove('is-flipped');
            });
        });
    }


    saveButton.addEventListener('click', async () => {
        const reviewsToSave = [];
        const allCards = document.querySelectorAll('.movie-option-card');
        let lastUsedId = parseInt(localStorage.getItem('idCounter') || '0');


        for (const card of allCards) {
            if (card.dataset.detailsAdded === "true") { // Ensure this is a string comparison
                const presetId = card.dataset.presetId;
                const moviePreset = presetMovies.find(m => m.id_preset === presetId);
                if (!moviePreset) {
                    continue;
                }

                lastUsedId++; 

                const reviewObject = {
                    id: lastUsedId, 
                    title: moviePreset.title,
                    imageData: moviePreset.posterUrl, 
                    releaseDate: moviePreset.releaseDate,
                    watchedOn: card.querySelector(`#watch-date-${presetId}`).value || '',
                    watchCount: parseInt(card.querySelector(`#watch-count-${presetId}`).value) || 1,
                    rating: parseInt(card.querySelector(`input[name="rating-${presetId}"]:checked`).value),
                    notes: card.querySelector(`#notes-${presetId}`).value || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                reviewsToSave.push(reviewObject);
            }
        }

        if (reviewsToSave.length === 0) {
            alert("Please save details for at least one movie before continuing.");
            return; 
        }

        const existingReviews = getReviewsFromStorage();
        const finalReviews = existingReviews.concat(reviewsToSave);
        saveReviewsToStorage(finalReviews);
        localStorage.setItem('idCounter', lastUsedId.toString());
        
        localStorage.setItem('hasCompletedOnboarding', 'true');
        window.location.href = 'landing_page.html';
    });

    // Initial render
    renderMovieOptionCards();
});