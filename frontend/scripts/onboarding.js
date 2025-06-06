// Imports from localStorage.js (adjust path if necessary)
import { getReviewsFromStorage, saveReviewsToStorage } from '../../backend/localStorage.js';

const presetMovies = [
    {
      id_preset: 'p1',
      title: 'Inception',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      releaseDate: '2010-07-16'
    },
    {
      id_preset: 'p2',
      title: 'The Matrix',
      posterUrl: 'https://www.themoviedb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      releaseDate: '1999-03-31'
    },
    {
      id_preset: 'p3',
      title: 'Interstellar',
      posterUrl: 'https://m.media-amazon.com/images/I/514zBLkyJcL._AC_SY606_.jpg',
      releaseDate: '2014-11-07'
    },
    {
      id_preset: 'p4',
      title: 'Parasite',
      posterUrl: 'https://www.themoviedb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      releaseDate: '2019-10-11'
    },
    {
      id_preset: 'p5',
      title: 'Barbie',
      posterUrl: 'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      releaseDate: '2023-07-21'
    },
    {
      id_preset: 'p6',
      title: 'Oppenheimer',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
      releaseDate: '2023-07-21'
    },
    {
      id_preset: 'p7',
      title: 'Everything Everywhere All at Once',
      posterUrl: 'https://www.themoviedb.org/t/p/original/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
      releaseDate: '2022-03-11'
    },
    {
      id_preset: 'p8',
      title: 'La La Land',
      posterUrl: 'https://www.themoviedb.org/t/p/original/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      releaseDate: '2016-12-09'
    },
    {
      id_preset: 'p9',
      title: 'The Dark Knight',
      posterUrl: 'https://www.themoviedb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      releaseDate: '2008-07-18'
    },
    {
      id_preset: 'p10',
      title: 'The Social Network',
      posterUrl: 'https://www.themoviedb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
      releaseDate: '2010-10-01'
    },
    {
      id_preset: 'p11',
      title: 'Get Out',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png',
      releaseDate: '2017-02-24'
    },
    {
      id_preset: 'p12',
      title: 'The Shawshank Redemption',
      posterUrl: 'https://www.themoviedb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      releaseDate: '1994-09-23'
    },
    {
      id_preset: 'p13',
      title: 'Spider-Man: Into the Spider-Verse',
      posterUrl: 'https://www.themoviedb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      releaseDate: '2018-12-14'
    },
    {
      id_preset: 'p14',
      title: 'The Hunger Games',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/HungerGamesPoster.jpg',
      releaseDate: '2012-03-23'
    },
    {
      id_preset: 'p15',
      title: 'The Avengers',
      posterUrl: 'https://www.themoviedb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      releaseDate: '2012-05-04'
    },
    {
      id_preset: 'p16',
      title: 'Titanic',
      posterUrl: 'https://www.themoviedb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      releaseDate: '1997-12-19'
    },
    {
      id_preset: 'p17',
      title: 'The Wolf of Wall Street',
      posterUrl: 'https://www.themoviedb.org/t/p/original/pWHf4khOloNVfCxscsXFj3jj6gP.jpg',
      releaseDate: '2013-12-25'
    },
    {
      id_preset: 'p18',
      title: 'Avatar',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg',
      releaseDate: '2009-12-18'
    },
    {
      id_preset: 'p19',
      title: 'Mean Girls',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Mean_Girls_film_poster.png',
      releaseDate: '2004-04-30'
    },
    {
      id_preset: 'p20',
      title: 'Black Panther',
      posterUrl: 'https://www.themoviedb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
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
                <h4>${movie.title} - Your Details</h4>
                <div class="form-scroll-content">
                    <label for="watch-date-${movie.id_preset}">Your Watch Date:</label>
                    <input type="date" id="watch-date-${movie.id_preset}" name="watch-date-${movie.id_preset}">

                    <label for="watch-count-${movie.id_preset}">Times Watched:</label>
                    <input type="number" id="watch-count-${movie.id_preset}" name="watch-count-${movie.id_preset}" min="1" value="1">
                    
                    <label for="notes-${movie.id_preset}">Your Review/Notes:</label>
                    <textarea id="notes-${movie.id_preset}" name="notes-${movie.id_preset}" rows="3"></textarea>

                    <label>Your Rating:</label>
                    <div class="rating-group">
                        ${[0,1,2,3,4,5].map(r => `
                            <label>
                                <input type="radio" name="rating-${movie.id_preset}" value="${r}" ${r === 0 ? 'checked' : ''}> ${r}
                            </label>`).join('')}
                    </div>
                </div>
                <button class="save-card-details-button">Save Details for This Movie</button> 
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
                e.stopPropagation();
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