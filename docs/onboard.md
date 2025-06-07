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
2.  **Install Dependencies:** It runs `npm ci` to install the exact versions of the dependencies listed in `package-lock.json`. This ensures a consistent environment.
3.  **Run unit tests with coverage:** The `npm test` command runs all unit tests. We have configured it to also generate a code coverage report, which shows how much of the code is tested.
4.  **Run ESLint:** It lints the code to check for style issues and potential errors based on our team's configuration (`eslint.config.js`). This helps maintain a consistent code style.
5.  **Generate Documentation:** It runs `npm run generate-docs` to create documentation from the JSDoc comments in the code.
6.  **Upload Artifacts:** It uploads the generated `docs` and `coverage_report` as build artifacts. This allows you to inspect the documentation and coverage report from the GitHub Actions run.

### Job: `e2e-tests`

This job runs after the `tests` job completes successfully. It ensures that the main features of the application work from end to end.

1.  **Checkout & Setup:** It checks out the code and sets up Node.js.
2.  **Install Dependencies:** It installs the required dependencies using `npm ci`.
3.  **Run E2E tests:** It executes the end-to-end tests using the `npm run test:e2e` command. These tests simulate user interactions to verify the application's functionality.

### Job: `deploy`

This job only runs on a successful push to the `main` branch. Its purpose is to deploy the project to GitHub Pages.

1.  **Setup & Deploy:** It uses the `docs` artifact from the `tests` job to deploy the project, making it live.

### Job: `codacy-coverage-reporter`

This job also runs on a successful push to any branch after `tests` completes.

1.  **Download Artifact:** It first downloads the `coverage` artifact that was uploaded by the `tests` job.
2.  **Upload to Codacy:** It takes the `lcov.info` file from the artifact and uploads it to Codacy, our code quality analysis tool. This allows us to track code coverage over time.
