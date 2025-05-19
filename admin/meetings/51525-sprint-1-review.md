# Sprint Review 1 
### May 15th, 2025

## Attendance
- Prachi Heda
- Minnie Zhang
- Albert Ho
- Samantha Phan
- Nadine Apresto
- Svetlana Bobiles
- Inchul Kim
- Charlie Zhu
- Austin Choi
- Skyler Nguyen
- Srujam Daves

## Sprint Goals Recap
- Conduct frontend, backend, and full team meetings
- Finish HTML files/website template, so backend can start their side


## Complete Work
- Website UI Design
  - Completed design of overall website and layout of pages
  - Finish uploading basic pictures for layout of the website
- Front module template
    - HTML article with different aspects of the card that should be filled in by the javascript. Within this module, it is the image and the title of the movie poster. Within the module, we need the backend team to work on the implementation for filling in the defined information.
- Back module template
    - HTML article with different aspects of the card that should be filled in by the javascript. Within this module, it is the user's review (description, rating, when watched, etc.). Need backend team to implement information within the article.
- Back module form template
    - HTML article with aspects that the user should fill out when submitting a new card. This should be linked with the local storage backend to store the information for the rontn
- Object definitions and CRUD operations
    - defined ReviewCard object and its fields(id, title, notes, createdOn, etc.)
    - defined CRUD functions
- Custom HTML Element
    - Utilized resources from lab 6 to define the skeleton of a review-card html element.  


## Incomplete/Pending Work
- Need to refactor Custom HTML Element
    - Instead of one custom element, we will need two elements to correspond to front and back module templates created by the frontend team. 
- Still working on the CSS styling for the HTML pages
    - Left incomplete for now because we want to focus on the HTML and JS first before completing the styling to avoid any implementation issues.
- Still working on fixing up and finalizing the HTML for the landing and viewing pages
    - Frontend needs to meet to finish and review the HTML for landing and viewing pages to check if we have everything we need.
- Working on making sure the tests for CRUD functionality cover all edgecases before integrating with frontend
    - Backend needs to confirm that test cases provided are of high quality and comprehensive, some of the cases are still not written
- Fill out skeleton js file for the custom review card element
    - Now that frontend has provided the HTML for said element, backend needs to meet and confirm on the implementation of said file

## Demos (Feature Walkthrough)
- Frontend: N/A, visuals implemented but no connected user interactions/features yet
- Backend: N/A, need to test the functionality of the CRUD operations and make sure the no duplicate rule works

## Sprint Metric
- Velocity: [Number of Story Points Completed]
    1. Design template finalized
    2. Front Module of card completed
    3. Back Module of card completed
    4. CRUD rough implementation completed
    5. Skeleton custom element created
    6. Test case writing began

- Planned vs. Delivered: [Planned Points vs. Delivered Points]
    Planned: 
    1. Finish card templates html asap for backend
    2. Review/Finish up landing/viewing pages
    3. Finish CRUD rough implementation
    4. Custom element review card finalization
    - Delivered: 
    1. Finished card template html
    2. Finish CRUD rough implementation

## Feedback & Discussions
- Discuss the implemenation of the card form along with animation and how to make that an interacive user-friendly element without going too much into the developer perspecitve
- Created another ADR about the forms deceision
- Dicuss card template html implementation
- Discussed topic of repeat movies within the backend team and created corresponding ADR to document our design choice and why it was made
- Discuss how the form's data is going to be passed in to be handled by backend

## Next Steps
- Frontend needs to meet (preferably at least once in-person this week) to discuss and finalize HTML files in addition to starting/finishing the css files
- Frontend needs to continue to communicate with backend to work on how to implement
- Backend needs to meet sometime after test cases have been written to finalize and discuss whether any edgecases are missing
- Backend needs to confirm with frontend that the custom review card element can start being finalized