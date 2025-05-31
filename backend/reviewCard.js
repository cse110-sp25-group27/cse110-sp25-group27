const frontTemplateHTML = `
  <style>
    .review-card-front {
      padding: 15px;
      box-sizing: border-box;
      text-align: center;
    }
    .review-card-front .movie-title {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .review-card-front img {
      max-width: 100%;
      max-height: 200px; /* Adjust as needed */
      object-fit: contain;
      border: 1px solid #ddd;
    }
  </style>
  <div class="review-card-front">
    <p class="movie-title">Movie Title</p>
    <img src="" alt="Movie Poster">
  </div>
`;

const backTemplateHTML = `
  <style>
    .review-card-back {
      padding: 15px;
      box-sizing: border-box;
      font-size: 0.9em;
    }
    .review-card-back .movie-title {
      font-size: 1.1em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .review-card-back p {
      margin-bottom: 3px;
    }
    .review-card-back .label {
      font-weight: bold;
    }
    .review-card-back .rating-display {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 10px;
    }
    .review-card-back .rating-display img {
      width: 100px; /* Adjust as needed */
      margin-left: 5px;
      margin-right: 5px;
    }
    .review-card-back .actions button {
      padding: 8px 12px;
      margin-right: 10px;
      cursor: pointer;
    }
  </style>
  <div class="review-card-back">
    <p class="movie-title">Movie Title</p>
    <p><span class="label">Released:</span> <span class="release-date"></span></p>
    <p><span class="label">Watched On:</span> <span class="watch-date"></span> at <span class="watch-time"></span></p>
    <p><span class="label">Watch Count:</span> <span class="watch-count"></span></p>
    <div class="user-review-container">
      <p class="label">Review:</p>
      <p class="user-review"></p>
    </div>
    <div class="rating-display">
      <span class="label">Rating:</span>
      <span class="rating-value"></span>/5
      <img class="rating-stars" src="" alt="Rating Stars">
    </div>
    <div class="actions">
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    </div>
  </div>
`;

class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._isFlipped = false;
    this._data = null;

    // Create general card styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin: 10px;
        width: 300px; /* Adjust as needed */
        height: 350px; /* Adjust as needed */
        overflow: hidden;
        cursor: pointer;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        position: relative; /* For positioning front/back */
      }
      .card-face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden; /* For potential 3D flip later */
        -webkit-backface-visibility: hidden;
        transition: transform 0.6s; /* For potential 3D flip later */
      }
      /* Basic flip by hiding/showing. Real flip animation is more complex. */
      .front-view {
        /* transform: rotateY(0deg); */ /* For 3D flip */
      }
      .back-view {
        /* transform: rotateY(180deg); */ /* For 3D flip */
        display: none; /* Initially hidden if front is shown */
      }
      :host(.flipped) .front-view {
        /* transform: rotateY(-180deg); */ /* For 3D flip */
        display: none;
      }
      :host(.flipped) .back-view {
        /* transform: rotateY(0deg); */ /* For 3D flip */
        display: block;
      }
    `;
    this.shadowRoot.appendChild(style);

    // Create front and back containers
    this.frontDiv = document.createElement('div');
    this.frontDiv.classList.add('card-face', 'front-view');
    this.frontDiv.innerHTML = frontTemplateHTML;
    this.shadowRoot.appendChild(this.frontDiv);

    this.backDiv = document.createElement('div');
    this.backDiv.classList.add('card-face', 'back-view');
    this.backDiv.innerHTML = backTemplateHTML;
    this.shadowRoot.appendChild(this.backDiv);
    
    this.addEventListener('click', this._flipCard.bind(this));
  }

  set data(reviewData) {
    if (!reviewData) return;
    this._data = reviewData;
    this._render();
  }

  get data() {
    return this._data;
  }

  _render() {
    if (!this._data) return;

    // Populate Front
    this.frontDiv.querySelector('.movie-title').textContent = this._data.title || 'N/A';
    const frontImg = this.frontDiv.querySelector('img');
    frontImg.src = this._data.imageData || '../assets/placeholder_poster.png'
    frontImg.alt = this._data.title ? `Poster for ${this._data.title}` : 'Movie Poster';

    // Populate Back
    this.backDiv.querySelector('.movie-title').textContent = this._data.title || 'N/A';
    this.backDiv.querySelector('.release-date').textContent = this._data.releaseDate ? new Date(this._data.releaseDate).toLocaleDateString() : 'N/A';
    
    const watchedDate = this._data.watchedOn ? new Date(this._data.watchedOn) : null;
    this.backDiv.querySelector('.watch-date').textContent = watchedDate ? watchedDate.toLocaleDateString() : 'N/A';
    this.backDiv.querySelector('.watch-time').textContent = watchedDate ? watchedDate.toLocaleTimeString() : '';
    
    this.backDiv.querySelector('.watch-count').textContent = this._data.watchCount !== undefined ? this._data.watchCount : 'N/A';
    this.backDiv.querySelector('.user-review').textContent = this._data.notes || 'No review provided.';
    
    const rating = this._data.rating !== undefined ? parseInt(this._data.rating) : 0;
    this.backDiv.querySelector('.rating-value').textContent = rating;
    // Assuming you have images named 0-star.svg, 1-star.svg, ..., 5-star.svg in /assets/images/icons/
    this.backDiv.querySelector('.rating-stars').src = `/assets/images/${rating}_star.png`;
    this.backDiv.querySelector('.rating-stars').alt = `${rating} out of 5 stars`;

    // Add event listeners for edit/delete, ensuring they don't also flip the card
    const editButton = this.backDiv.querySelector('.edit-button');
    editButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card flip
      this._handleEdit();
    });

    const deleteButton = this.backDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card flip
      this._handleDelete();
    });
    
    this._updateView();
  }

  _flipCard(event) {
    // Only flip if the click is directly on the card and not on buttons inside backDiv
    if (event.target.closest('button')) {
        return;
    }
    this._isFlipped = !this._isFlipped;
    this.classList.toggle('flipped', this._isFlipped);
    this._updateView();
  }

  _updateView() {
    if (this._isFlipped) {
      this.frontDiv.style.display = 'none';
      this.backDiv.style.display = 'block';
    } else {
      this.frontDiv.style.display = 'block';
      this.backDiv.style.display = 'none';
    }
  }

  _handleEdit() {
    this.dispatchEvent(new CustomEvent('edit-review', {
      detail: { reviewData: this._data },
      bubbles: true, // Allows event to bubble up through the DOM
      composed: true // Allows event to cross shadow DOM boundaries
    }));
    console.log('Edit review:', this._data); // Placeholder
  }

  _handleDelete() {
    this.dispatchEvent(new CustomEvent('delete-review', {
      detail: { reviewId: this._data.id },
      bubbles: true,
      composed: true
    }));
    console.log('Delete review ID:', this._data.id); // Placeholder
    // The actual removal from DOM and localStorage will be handled by the listener of this event.
  }
}

customElements.define('review-card', ReviewCard);