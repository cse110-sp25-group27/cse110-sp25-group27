describe('Movie Review Form Workflow', () => {
  beforeAll(async () => {
    await page.goto("http://localhost:5500/template.html"); //current live server url
  });

  it('fills out the review form and creates a review card', async () => {
    console.log('Checking for 20 product items...');

    await page.type('input[name="movie-title"]', "Interstellar");
    await page.type('input[name="watch-date"]', "2023-10-01");
    await page.type('input[name="watch-count"]', "2");
    await page.type('input[name="rating"]', "5");
    await page.type('input[name="release-date"]', "2014-11-07");
    await page.type('textarea[name="review"]', "Amazing sci-fi journey!");

    await page.click('form#new-review button[type="submit"]');

    await page.waitForSelector("review-card");

    const reviewExists = await page.$eval("review-card", el =>
      el.shadowRoot.querySelector("p.title").textContent.includes("Interstellar")
    );
    expect(reviewExists).toBe(true);

    const reviewData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("reviews"))
    );
    expect(reviewData[0].title).toBe("Interstellar");
    expect(reviewData[0].rating).toBe(5);
  });
});
