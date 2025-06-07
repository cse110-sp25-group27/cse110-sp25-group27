# Project Onboarding Guide

Welcome to the team! This guide will walk you through the process of getting the project set up on your local machine, making changes, and contributing to the codebase.

---

## 1. Getting Started: Cloning the Repository

First, you need to get a copy of the project on your computer. 

1.  **Open your terminal or command prompt.**
2.  **Navigate to the directory where you want to store the project.**
3.  **Clone the repository using the following command:**
    ```bash
    git clone https://github.com/cse110-sp24-group27/cse110-sp24-group27.git
    ```
4.  **Navigate into the newly created project directory:**
    ```bash
    cd cse110-sp24-group27
    ```
5.  **Install the necessary dependencies:**
    ```bash
    npm install
    ```

You now have a complete copy of the project, and you're ready to start making changes!

---

## 2. Making and Pushing Changes

To keep our codebase clean and organized, we follow a standard workflow for making changes.

1.  **Create a New Branch:** Before you start working on a new feature or bugfix, create a new branch. This keeps your changes isolated.
    ```bash
    git checkout -b your-feature-name
    ```
    (Replace `your-feature-name` with a short, descriptive name, like `fix-login-bug` or `add-user-profile`.)

2.  **Make Your Changes:** Use your favorite code editor to make the necessary changes to the files.

3.  **Stage and Commit Your Changes:** Once you're happy with your changes, you need to "commit" them.
    ```bash
    git add .
    git commit -m "A brief, descriptive message about your changes"
    ```

4.  **Push Your Branch to GitHub:**
    ```bash
    git push -u origin your-feature-name
    ```

5.  **Create a Pull Request:** Go to the repository on GitHub. You'll see a prompt to create a pull request from your new branch. Fill out the details and submit it for review.

6.  **Get Your Pull Request Reviewed:** Once your pull request is created and all the automated checks have passed, you must get at least one other collaborator to review your changes. Our `main` branch is protected, which means direct pushes are blocked and reviews are mandatory.
    -   Ask a team member to review your code.
    -   Make any necessary fixes based on their feedback.
    -   Once your PR is approved, you can merge it into the `main` branch.

---

## 3. The CI/CD Pipeline: Automated Checks

When you push your code, our automated CI/CD pipeline, defined in `.github/workflows/pipeline.yml`, will run a series of checks to ensure code quality. If any of these checks fail, you will not be able to merge your pull request.

Here's a breakdown of what the pipeline does:

### Job: `tests`

This is the main job, and it runs on every push to any branch.

1.  **Checkout & Setup:** It checks out your code and sets up a Node.js environment.
2.  **Install Dependencies:** It runs `npm ci` to install the exact versions of the dependencies listed in `package-lock.json`.
3.  **Run Jest Tests (`npm test`):** It executes the automated tests in the `__tests__` directory to ensure existing functionality is not broken.
4.  **Run ESLint:** It checks your code for style issues and potential errors using the rules defined in `eslint.config.js`. It will fail if there are any errors or warnings.
5.  **Calculate Code Coverage (`npm run test -- --coverage`):** It runs the tests again, but this time it calculates how much of your code is covered by tests. The results are saved to the `docs/coverage_report/` directory.
6.  **Generate Documentation (`npm run generate-docs`):** This step generates JSDoc documentation for your code.
7.  **Upload Artifacts:** It uploads the `docs` and `coverage` directories as artifacts, which can be downloaded and inspected.

### Job: `deploy`

This job only runs on a successful push to the `main` branch.

1.  **Setup & Deploy:** It uses the `docs` artifact from the `tests` job to deploy the project to GitHub Pages, making it live.

### Job: `codacy-coverage-reporter`

This job also runs on a successful push to any branch.

1.  **Upload to Codacy:** It takes the `lcov.info` file generated during the coverage step and uploads it to Codacy, our code quality analysis tool. This allows us to track code coverage over time.

If any step in the `tests` job fails, your push will be marked with a red "X" on GitHub, and you'll need to fix the issues before your code can be merged.
