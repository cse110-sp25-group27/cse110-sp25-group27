// reviewCard.js

class ReviewCard extends HTMLElement {

  constructor() {
    super(); // Inherit everything from HTMLElement

    let shadowEl = this.attachShadow({ mode: "open" });
    let articleEl = document.createElement("article");
    let styleEl = document.createElement("style");

    styleEl.textContent = `
	* {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    }

    a {
    text-decoration: none;
    }

  a:hover {
    text-decoration: underline;
  }

  article {
    align-items: center;
    border: 1px solid rgb(223, 225, 229);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 118px 56px 14px 18px 15px 36px;
    height: auto;
    row-gap: 5px;
    padding: 0 16px 16px 16px;
    width: 178px;
  }

  div.rating {
    align-items: center;
    column-gap: 5px;
    display: flex;
  }

  div.rating>img {
    height: auto;
    display: inline-block;
    object-fit: scale-down;
    width: 78px;
  }

  article>img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 118px;
    object-fit: cover;
    margin-left: -16px;
    width: calc(100% + 32px);
  }

  p.ingredients {
    height: 32px;
    line-height: 16px;
    padding-top: 4px;
    overflow: hidden;
  }

  p.organization {
    color: black !important;
  }

  p.title {
    display: -webkit-box;
    font-size: 16px;
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p:not(.title),
  span,
  time {
    color: #70757A;
    font-size: 12px;
  }
		
		`;
    shadowEl.appendChild(styleEl);
    shadowEl.appendChild(articleEl);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For example:
   * let reviewCard = document.createElement('review-card'); // Calls constructor()
   * reviewCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <review-card> must be of the
   *                        following format:
 /**
                             * {
                             *  id : string,
                             *  title : string,
                             *  watchedDate : string,
                             *  watchCount : number (default at 1),
                             *  rating : number 1-5,
                             *  imageData : string (base 64/url),
                             *  notes : string,
                             *  releaseDate : string,
                             *  username : string,
                             *  createdAt : string (ISO),
                             *  updatedAt : string (ISO)
                             * }
 */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;
    const article = this.shadowRoot.querySelector("article");
    
    //TO BE CONTINUED
    article.innerHTML = `
      <img src="${data.imageData}" alt="Movie Poster">
      <p class="title">${data.title}</p>
      <time>Watched: ${data.watchDate || "N/A"}</time>
      <p>Release Date: ${data.releaseDate || "N/A"}</p>
      <div class="rating">
          Rating: ${data.rating}/5
      		<span>${data.rating}</span>
          <img src="/assets/${data.rating}_star.png" alt="${data.rating} stars">
          <span>${data.numRatings}</span>
      </div>
      <p class="notes">
        ${data.notes || ""}
      </p>
      `;
  }
}

customElements.define('review-card', ReviewCard);
