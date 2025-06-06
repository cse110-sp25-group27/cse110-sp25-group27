describe('Basic user flow for onboarding', () => {
  beforeAll(async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/onboarding.html");
  });

  it('block users from landing with zero reviews', async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/onboarding.html");
    const dialogPromise = new Promise(resolve =>{
        page.on('dialog', async dialog =>{
            expect(dialog.message()).toMatch("Please save details for at least one movie before continuing.");
            await dialog.dismiss();
            resolve();
        });
    });

    await page.click("#save-onboarding-button");
    await dialogPromise;

    const onboarded = await page.evaluate(() => {
        return localStorage.getItem('hasCompletedOnboarding');
    });

    expect(onboarded).toBe(null);
  });

  it('Onboarding page updates correctly after movies are selected', async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/onboarding.html");
    await page.evaluate(() => localStorage.clear());

    await page.click('[data-preset-id="p4"] .select-button', { delay: 100 });
    await page.click('[data-preset-id="p4"] .save-card-details-button', { delay: 100 });
    await page.click("#save-onboarding-button", { delay: 100 });

    const onboarded = await page.evaluate(() => {
        return localStorage.getItem('hasCompletedOnboarding');
    });

    expect(onboarded).toBe('true');
  }, 15000);

});

describe('Basic user flow for landing', ()=>{
  beforeAll(async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/onboarding.html");

    await page.evaluate(() => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    });
    
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/landing_page.html");

  });

  it('adds new movie review and displays it on page', async ()=>{
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/landing_page.html");
        
    await page.click('#add-ticket-button');

    await page.waitForSelector('#movie-title');
    await page.type('#movie-title', 'Test Movie');
    
    await page.$eval('#release-date', el => el.value = '2024-06-01');
    await page.$eval('#date-input', el => el.value = '2024-06-01');

    await page.$eval('#watch-count', el => el.value = '2');    
    await page.$eval('#review', el => el.value = 'Amazing!');    
    await page.click('input[name="rating"][value="5"]');

    const fileInput = await page.waitForSelector('input[type="file"]');
    await fileInput.uploadFile('frontend/assets/ticket.png');

    await page.click('button[type="submit"]');

    await page.waitForSelector('main .review-card');

    const reviews = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('reviews') || '[]');
    });
    const found = reviews.some(r => r.title === 'Test Movie');
    expect(found).toBe(true);
    
    /*await page.waitForSelector('main review-card');
    const reviewCards = await page.$$('main review-card');
    expect(reviewCards.length).toBeGreaterThan(0);*/
  }, 20000);
  
})