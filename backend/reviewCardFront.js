class ReviewCardFront extends HTMLElement {
  constructor() {
    super();
    const shadowEl = this.attachShadow({ mode: "open" });
    const articleEl = document.createElement("article");
    articleEl.innerHTML = `
      <p class="movie-title"></p>
      <img src="" alt="Movie Poster">
      <p class="user"></p>
    `;
    const styleEl = document.createElement("style");
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
        grid-template-rows: auto auto auto;
        row-gap: 5px;
        padding: 16px;
        width: 178px;
        box-sizing: border-box;
      }
      .movie-title {
        font-size: 16px;
        font-weight: bold;
        color: black;
      }
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
      }
      .user {
        color: #70757A;
        font-size: 12px;
      }`;
    shadowEl.append(styleEl, articleEl);
  }


  /**
   * Sets the data for the card.
   * @param {Object} data - {
   *   id: string,          // review ID (not shown)
   *   title: string,
   *   watchedOn: string,
   *   rating: number,
   *   imageData: string,
   *   notes: string,
   *   createdAt: string,
   *   updatedAt: string
   * }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;
    const article = this.shadowRoot.querySelector("article");
    // Use localStorage to retrieve the user instead TO BE IMPLEMENTED
    const username = localStorage.getItem("username") || "Anonymous";

    article.innerHTML = `
      <p class="movie-title">${data.title}</p>
      <img src="${data.imageData}" alt="Poster of ${data.title}">
    `;
  }
}

customElements.define("review-card-front", ReviewCardFront);