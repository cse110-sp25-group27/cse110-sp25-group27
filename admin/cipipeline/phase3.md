# CI/CD Pipeline PHASE 3

## 1. Linting (ESLint)  
We used **ESLint** to enforce consistent code style and catch syntax or logic errors early. The linter checks folder names, function names, prevents duplicate functions, and ensures consistent code formatting. This step helps maintain a clean and readable codebase before anything is merged or deployed.  
<br><br>

## 2. Code Quality with Codacy  
We integrated **Codacy**, an external platform connected to our GitHub repository, which automatically scans the code for potential bugs, security vulnerabilities, and style issues. Codacy runs automatically on every pull request, providing an extra layer of automated review.  
<br><br>
**Potential Issue:** Codacy’s free trial or plan limits might cap some advanced features or analysis depth.  
<br><br>

## 3. Code Review via Pull Requests  
We configured **GitHub Branch Protection Rules** to ensure no code gets merged without at least one approved pull request review.  
This enforces human oversight, encourages collaborative review, and maintains accountability for all changes going into the main branch.  
<br><br>

## 4. Automated Documentation Generation (documentation.js)  
For documentation, we used **documentation.js** (instead of JSDoc) to generate Markdown or HTML files summarizing the codebase’s functions, classes, and modules.  
This automation ensures up-to-date project docs are generated and stored alongside the code every time the pipeline runs.  
<br><br>

## 5. Unit Testing with Jest  
We wrote unit tests using **Jest**, ensuring key functionality works as expected.  
The pipeline is configured to run these tests automatically, pointing to the `__tests__` directory.  
Additionally, we generate a coverage report to track how much of the codebase is tested.  
<br><br>

