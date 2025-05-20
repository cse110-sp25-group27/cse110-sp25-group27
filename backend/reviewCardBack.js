class ReviewCardBack extends HTMLElement {
  constructor() {
    super();

    const shadowEl = this.attachShadow({ mode: "open" });

    const articleEl = document.createElement("article");

    const styleEl = document.createElement("style");
    // to be changed
    styleEl.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      article {
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        padding: 16px;
        display: grid;
        row-gap: 6px;
        width: 220px;
        box-sizing: border-box;
      }

      .movie-title a {
        font-size: 16px;
        font-weight: bold;
        color: black;
        text-decoration: none;
      }

      .movie-title a:hover {
        text-decoration: underline;
      }

      .release-date,
      .location-watched,
      .date,
      .time,
      .user,
      .user-review {
        font-size: 12px;
        color: #70757A;
      }

      time {
        font-size: 12px;
        color: #70757A;
      }

      .rating {
        display: flex;
        align-items: center;
        column-gap: 5px;
      }

      .rating img {
        width: 78px;
        object-fit: scale-down;
      }
    `;

    shadowEl.appendChild(styleEl);
    shadowEl.appendChild(articleEl);
  }

  /**
   * @param {Object} data - {
   *   id: string,
   *   title: string,
   *   titleLnk: string,
   *   releaseDate: string,
   *   watchedOn: string (ISO),
   *   rating: number 1-5,
   *   numRatings: number,
   *   locationWatched: string,
   *   reviewText: string
   * }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;
    const article = this.shadowRoot.querySelector("article");

    // get the username from local storage TO BE IMPLEMENTED
    const username = localStorage.getItem("username") || "Anonymous";

    article.innerHTML = `
      <p class="movie-title">
        <a href="${data.titleLnk}" target="_blank">${data.title}</a>
      </p>
      <p class="release-date">${data.releaseDate}</p> 
      <time>${data.watchedOn}</time>
      <p class="user">Ticket Reserved for ${username}</p>
      <p class="location-watched">${data.locationWatched}</p>
      <p class="date">Date: ${new Date(data.watchedOn).toLocaleDateString()}</p>
      <p class="time">Time: ${new Date(data.watchedOn).toLocaleTimeString()}</p>
      <p class="user-review">${data.reviewText}</p>
      <div class="rating">
        <span>${data.rating}</span>
        <img src="/assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
        <span>(${data.numRatings})</span>
      </div>
    `;
  }
}

customElements.define("review-card-back", ReviewCardBack);
