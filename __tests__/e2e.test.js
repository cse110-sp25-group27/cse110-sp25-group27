describe('Basic user flow for onboarding', () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");
  }, 20000);

  it('Block users from landing with zero reviews', async () => {
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");
    const dialogPromise = new Promise(resolve =>{
      page.once('dialog', async dialog =>{
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
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");
    await page.evaluate(() => localStorage.clear());

    await page.waitForSelector('#watch-date-p4');
    
    await page.$eval('#watch-date-p4', el => el.value = '2024-06-01');
    await page.$eval('#watch-count-p4', el => el.value = '2');  
    await page.$eval('#notes-p4', el => el.value = 'Amazing!');  
    await page.click('input[name="rating-p4"][value="5"]');

    await page.waitForSelector('[data-preset-id="p4"] .save-card-details-button', { visible: true });
    await page.$eval('#watch-date-p4', el => el.value = '2024-06-01');
    await page.evaluate(() => {
      document.querySelector('[data-preset-id="p4"] .save-card-details-button').click();
    }, { timeout: 2000 });

    await page.click("#save-onboarding-button", { delay: 1000 });

    const onboarded = await page.evaluate(() => {
      return localStorage.getItem('hasCompletedOnboarding');
    });
    expect(onboarded).toBe('true');
  }, 20000);

});

describe('Basic user flow for landing', ()=>{
  beforeAll(async () => {
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");

    await page.evaluate(() => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    });
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");
  }, 20000);

  it('Adds new movie review and displays it on page', async ()=>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");
        
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

    await page.waitForFunction(() => {
    return JSON.parse(localStorage.getItem('reviews') || '[]')
      .some(r => r.title === 'Test Movie');
    });

    const reviews = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('reviews') || '[]');
    });
    const found = reviews.some(r => r.title === 'Test Movie');
    expect(found).toBe(true);

  }, 30000);

  it('User inputs incorrect value', async ()=>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");
        
    await page.click('#add-ticket-button');

    await page.waitForSelector('#movie-title');
    await page.type('#movie-title', 'Invalid Movie');
    
    await page.$eval('#release-date', el => el.value = '2024-06-01');
    await page.$eval('#date-input', el => el.value = '2024-06-01');

    await page.$eval('#watch-count', el => el.value = 'a');  
    await page.$eval('#review', el => el.value = 'Amazing!');  
    await page.click('input[name="rating"][value="5"]');

    const fileInput = await page.waitForSelector('input[type="file"]');
    await fileInput.uploadFile('frontend/assets/ticket.png');

    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.waitForFunction(() => {
    return JSON.parse(localStorage.getItem('reviews') || '[]')
      .some(r => r.title === 'Test Movie');
    });

    const reviews = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('reviews') || '[]');
    });
    const found = reviews.some(r => r.title === 'Invalid Movie');
    expect(found).toBe(false);

  }, 30000);

  it('User inputs duplicate value', async ()=>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");

    let reviews = await page.evaluate(() => {
      return document.querySelectorAll('review-card').length;
    });
        
    await page.click('#add-ticket-button');

    await page.waitForSelector('#movie-title');
    await page.type('#movie-title', 'Parasite');
    
    await page.$eval('#release-date', el => el.value = '2024-06-01');
    await page.$eval('#date-input', el => el.value = '2024-06-01');

    await page.$eval('#watch-count', el => el.value = '1');  
    await page.$eval('#review', el => el.value = 'Amazing!');  
    await page.click('input[name="rating"][value="3"]');

    const fileInput = await page.waitForSelector('input[type="file"]');
    await fileInput.uploadFile('frontend/assets/ticket.png');

    const dialogPromise = new Promise(resolve => {
      page.once('dialog', async dialog => {
        await dialog.accept(); 
        resolve();
      });
    });

    await page.click('button[type="submit"]');
    await dialogPromise;

    const newCount = await page.evaluate(() => {
      return document.querySelectorAll('review-card').length;
    });

    expect(newCount).toBe(reviews);

  }, 30000);

  it('Updates an existing movie review', async () =>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      card.click();
    });

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      const shadow = card.shadowRoot;
      shadow.querySelector('.edit-button').click();
    });

    await page.waitForSelector('#update-form', );
    await page.$eval('#update-review', el => el.value = 'I hated it!');
    await page.click('input[name="update-rating"][value="0"]');

    const dialogPromise = new Promise(resolve =>{
      page.once('dialog', async dialog =>{
        expect(dialog.message()).toMatch("Review updated successfully!");
        await dialog.accept();
        resolve();
      });
    });

    await page.click('button[type="submit"]');
    await dialogPromise;

    const updated = await page.evaluate(() => {
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      return reviews.some(r => r.notes === 'I hated it!' && r.rating === 0);
    });

    expect(updated).toBe(true);
  }, 30000);

  it('Incorrectly updated review with missing field', async () =>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      card.click();
    });

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      const shadow = card.shadowRoot;
      shadow.querySelector('.edit-button').click();
    });

    await page.waitForSelector('#update-form', );
    await page.$eval('#update-review', el => el.value = '');

    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updated = await page.evaluate(() => {
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      return reviews.some(r => r.notes === '');
    });

    expect(updated).toBe(false);
  }, 30000);

  it('Delete existing review on landing page', async () =>{
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");

    let reviews = await page.evaluate(() => {
      return document.querySelectorAll('review-card').length;
    });

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      card.click();
    });

    const dialogPromise = new Promise(resolve =>{
      page.once('dialog', async dialog =>{
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
        resolve();
      });
    });

    await page.evaluate(() => {
      const card = document.querySelector('review-card');
      const shadow = card.shadowRoot;
      shadow.querySelector('.delete-button').click();
    });

    await dialogPromise;

    await page.waitForFunction((prevCount) => {
      return document.querySelectorAll('review-card').length === prevCount - 1;
    }, {}, reviews);

    const newCount = await page.evaluate(() => {
      return document.querySelectorAll('review-card').length;
    });

    expect(newCount).toBe(reviews - 1);
  }, 30000);

});

describe('Test redirect to landing page if there is at least 1 review', () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");

    await page.evaluate(() => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    });
      
    await page.goto("http://localhost:8080/frontend/pages/landing_page.html");

  }, 20000);

  it('Test redirect', async () => {
    await page.goto("http://localhost:8080/frontend/pages/onboarding.html");

    await page.waitForFunction(() => window.location.pathname.endsWith('landing_page.html'));

    expect(page.url()).toContain('landing_page.html');
  }, 30000);
});