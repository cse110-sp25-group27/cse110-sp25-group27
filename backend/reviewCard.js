// Color Palette (as used in the perforation version)
const TICKET_BACKGROUND = '#2E2925'; 
const TICKET_GOLD = '#B08D57';       
const TICKET_TEXT_GOLD = '#B08D57';
const TICKET_TEXT_CONTENT = '#D7D7D7'; 

// frontTemplateHTML from the iteration with perforations and "ADMIT ONE"
const frontTemplateHTML = `
  <style>
    .review-card-front-content { /* Renamed from .review-card-front for consistency */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start; 
      height: 100%;
      
      box-sizing: border-box;
      text-align: center;
      position: relative; 
    }
    .admit-one-text {
      font-family: 'Times New Roman', Times, serif; 
      font-size: 1.8em; 
      font-weight: bold; 
      color: ${TICKET_TEXT_GOLD};
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 5px; 
      margin-bottom: 10px;
      width: 100%;
      z-index: 1; 
    }
    .dashed-line { /* This was part of that version's front */
      width: calc(100% - 10px); 
      height: 2px;
      border: none;
      border-top: 3px dashed ${TICKET_GOLD};
    }
    .movie-title-front { /* Ensure class name matches render method */
      font-size: 1.4em;
      font-weight: bold;
      color: ${TICKET_TEXT_CONTENT};
      line-height: .1;
    }
    .movie-poster-front { /* Ensure class name matches render method */
      width: 90%;
      max-height: 100%; 
      object-fit: contain;
      margin-bottom: 10px;
    }
    .dashed-line-bottom { /* This was part of that version's front */
      width: calc(100% - 10px);
      height: 2px;
      border: none;
      border-top: 3px dashed ${TICKET_GOLD};
      margin-top: auto; 
      margin-bottom: 5px; 
    }
  </style>
  <div class="review-card-front-content">
    <p class="admit-one-text">Admit One</p>
    <hr class="dashed-line">
    <p class="movie-title-front">Movie Title</p>
    <img class="movie-poster-front" src="" alt="Movie Poster">
    <div style="flex-grow: 1;"></div> 
    <hr class="dashed-line-bottom">
  </div>
`;

// backTemplateHTML from the iteration with perforations
const backTemplateHTML = `
  <style>
    .review-card-back-content { /* Renamed from .review-card-back for consistency */
      padding: 20px 25px; 
      box-sizing: border-box;
      font-size: 0.95em; 
      color: ${TICKET_TEXT_CONTENT};
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .movie-title-back { /* Ensure class name matches render method */
      font-size: 1.3em;
      font-weight: bold;
      color: ${TICKET_TEXT_CONTENT};
      margin-bottom: 10px;
      text-align: center;
    }
    .review-card-back-content p {
      margin-bottom: 6px;
      line-height: 1.4;
    }
    .review-card-back-content .label {
      font-weight: bold;
      color: #BDBDBD; 
    }
    .rating-display-back { /* Ensure class name matches render method */
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    .rating-display-back img {
      width: 90px; 
      margin-left: 8px;
      margin-right: 8px;
    }
    .actions-back { /* Ensure class name matches render method */
      margin-top: auto; 
      padding-top: 10px;
      text-align: center; 
    }
    .actions-back button {
      padding: 10px 18px;
      margin: 0 8px;
      cursor: pointer;
      background-color: ${TICKET_GOLD};
      color: ${TICKET_BACKGROUND};
      border: 1px solid ${TICKET_BACKGROUND};
      border-radius: 5px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.9em;
    }
    .actions-back button:hover {
      background-color: ${TICKET_BACKGROUND};
      color: ${TICKET_GOLD};
      border: 1px solid ${TICKET_GOLD};
    }
  </style>
  <div class="review-card-back-content">
    <p class="movie-title-back">Movie Title</p>
    <hr class="dashed-line" style="border-top-color: ${TICKET_GOLD}; width: calc(100% - 10px); margin-bottom: 10px;">
    <p><span class="label">Released:</span> <span class="release-date"></span></p>
    <p><span class="label">Watched:</span> <span class="watch-date"></span> at <span class="watch-time"></span></p>
    <p><span class="label">Count:</span> <span class="watch-count"></span></p>
    <div>
      <p class="label">Review:</p>
      <p class="user-review" style="max-height: 80px; overflow-y: auto;"></p>
    </div>
    <div class="rating-display-back">
      <span class="label">Rating:</span>
      <span class="rating-value"></span>/5
      <img class="rating-stars" src="" alt="Rating Stars">
    </div>
    <div class="actions-back">
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

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        background-color: ${TICKET_BACKGROUND};
        border: 1px solid ${TICKET_GOLD}; 
        box-shadow: 0 0 0 3px ${TICKET_BACKGROUND}, 0 0 0 4px ${TICKET_GOLD};
        border-radius: 15px; 
        margin: 20px auto; /* This auto margin might be an issue in a flex track */
        width: 280px;  
        height: 520px; 
        margin: 20px 0; 
        box-sizing: border-box;
        overflow: visible; /* For perforations to show */
        cursor: pointer;
        position: relative; 
        font-family: Arial, sans-serif;
        perspective: 1000px; /* Good, perspective is here */
        transform-style: preserve-3d; /* Crucial for nested 3D transforms */
      }

      /* Reinstated Perforation effect with larger circles and shifted higher */
      :host::before, :host::after {
        content: '';
        position: absolute;
        left: 10px; 
        right: 10px; 
        height: 20px; 
        background-image: radial-gradient(circle at 7.5px 7.5px, transparent 0, transparent 6px, ${TICKET_BACKGROUND} 7px);
        background-size: 20px 15px; 
        background-repeat: repeat-x;
      }
      :host::before {
        top: -13px; /* Shifted higher */
      }
      :host::after {
        bottom: -13px; /* Shifted higher (further down from content) */
      }

      .card-face {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden; 
        -webkit-backface-visibility: hidden; 
        transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
        box-sizing: border-box;
        border-radius: 13px; 
        overflow: hidden; 
        /* Ensure transform-style is also here if faces had their own 3D children, but not strictly needed for just rotation */
      }
      .front-view {
        transform: rotateY(0deg); 
        z-index: 2; 
      }
      .back-view {
        transform: rotateY(180deg); 
      }
      :host(.flipped) .front-view {
        transform: rotateY(-180deg); 
      }
      :host(.flipped) .back-view {
        transform: rotateY(0deg); 
      }
    `;
    this.shadowRoot.appendChild(style);

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

    // Populate Front - Ensure class names match the template
    this.frontDiv.querySelector('.movie-title-front').textContent = this._data.title || 'N/A';
    const frontImg = this.frontDiv.querySelector('.movie-poster-front');
    if (this._data.imageData) {
        frontImg.src = this._data.imageData;
        frontImg.style.display = 'block';
    } else {
        frontImg.style.display = 'none'; 
    }
    frontImg.alt = this._data.title ? `Poster for ${this._data.title}` : 'Movie Poster';

    // Populate Back - Ensure class names match the template
    this.backDiv.querySelector('.movie-title-back').textContent = this._data.title || 'N/A';
    this.backDiv.querySelector('.release-date').textContent = this._data.releaseDate ? new Date(this._data.releaseDate).toLocaleDateString() : 'N/A';
    const watchedDate = this._data.watchedOn ? new Date(this._data.watchedOn) : null;
    this.backDiv.querySelector('.watch-date').textContent = watchedDate ? watchedDate.toLocaleDateString() : 'N/A';
    this.backDiv.querySelector('.watch-time').textContent = watchedDate ? watchedDate.toLocaleTimeString() : '';
    this.backDiv.querySelector('.watch-count').textContent = this._data.watchCount !== undefined ? this._data.watchCount : 'N/A';
    this.backDiv.querySelector('.user-review').textContent = this._data.notes || 'No review provided.';
    const rating = this._data.rating !== undefined ? parseInt(this._data.rating) : 0;
    this.backDiv.querySelector('.rating-value').textContent = rating;
    this.backDiv.querySelector('.rating-stars').src = `../assets/landing_imgs/${rating}_star.png`; 
    this.backDiv.querySelector('.rating-stars').alt = `${rating} out of 5 stars`;

    const editButton = this.backDiv.querySelector('.edit-button');
    editButton.addEventListener('click', (event) => {
      event.stopPropagation(); this._handleEdit();
    });
    const deleteButton = this.backDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); this._handleDelete();
      event.stopPropagation(); // Prevent card flip
      this._handleDelete();
    });
    
    this._updateView();
  }

  _flipCard(event) {
    console.log('Review card clicked. ID:', this._data ? this._data.id : 'N/A', 'Target:', event.target); // DEBUG LINE
    // Don't flip if the click was on a button inside the card
    if (event.target.closest('button')) {
      console.log('Flip prevented: click was on a button.'); // DEBUG LINE
      return;
    }
    this._isFlipped = !this._isFlipped;
    this.classList.toggle('flipped', this._isFlipped);
    console.log('Flipped state:', this._isFlipped); // DEBUG LINE
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