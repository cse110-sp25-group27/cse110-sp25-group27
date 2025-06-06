describe('Basic user flow for website', () => {
  beforeAll(async () => {
    await page.goto("https://cse110-sp25-group27.github.io/cse110-sp25-group27/"); 
  });

  it('block users from landing with zero reviews', async () => {
    console.log('Checking for 20 product items...');

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

    const onboardingStatus = await page.evaluate(() => {
        return localStorage.getItem('hasCompletedOnboarding');
    });

    expect(hasCompletedOnboarding).toBe(null);
  });
});