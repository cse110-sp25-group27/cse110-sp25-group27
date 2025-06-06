describe('Basic user flow for website', () => {
  beforeAll(async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/"); 
  });

  it('block users from landing with zero reviews', async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/");
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
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/");

    await page.click('[data-preset-id="p4"] .select-button');
    await page.click('[data-preset-id="p4] .save-card-details-button');

    const onboarded = await page.evaluate(() => {
        return localStorage.getItem('hasCompletedOnboarding');
    });

    expect(onboarded).toBe(true);
  });
});