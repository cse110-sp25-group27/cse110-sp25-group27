# Retrospective 3  
## May 27th, 2025  

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



## Sprint Overview  
The focus of this sprint was to integrate the backend and frontend, particularly:  
- Making sure forms correctly communicate with backend functions  
- Resolving styling issues with cards on the landing page  
- Ensuring CRUD operation unit tests match the new formatting  



## What Went Well  
**Frontend:**  
- Completed styling and positioning for the cards on the landing page  
- Linked form inputs to backend functions successfully  
- Adjusted the form to a single, unified format  
- Created functions in `reviewForm` to control and populate data between front and back modules  

**Backend:**  
- Deprecated unused files and template HTMLs, cleaning up the backend  
- Began restructuring and correcting CRUD operation unit tests to fit the updated design  



## What Didn’t Go Well  
**Frontend:**  
- Conflicting schedules delayed some sprint deliverables, especially on the styling side  
- After submission, the page still doesn’t properly display the newly submitted data  
- Changes in styling for the viewing pages
- Errors with positioning of the information and styling for the important interactions with the page
- Communication with backend wasn't as in-depth and some tests were made without actual use in backend

**Backend:**  
- Data received from frontend is not yet fully integrated into localStorage or frontend view population  
- CRUD unit test updates took longer than planned due to required data flow adjustments  
- Unit tests had issues with what were meant to be tested
- Some CI/CD operations don't work (ESlint)
- Fucntions for the frontend weren't linked and there were issues with ensuring that the data saved
- Some people were lost on what to do, only people that didn't have time conflicts knew
- Communication with frontend wasn't as in-depth and some tests were made without actual use in frontend



## Lessons Learned  
**Frontend:**  
- Closer coordination with backend during early UI setup can prevent mismatched expectations  
- Breaking the form components into smaller, modular parts earlier would have made styling adjustments easier  

**Backend:**  
- Testing data flow in small, incremental steps helps catch localStorage and integration issues sooner  
- Ensuring backend outputs are formatted to be frontend-ready speeds up the integration process  



## Action Items  
**Frontend:**  
- Refactor form positioning to avoid overlap with other page content  
- Collaborate with backend to ensure view page correctly pulls and displays submitted data  
- Set up adaptive frontend updates to sync with backend changes  
- Change the formatting for the viewing page to Grid rather than scrolling
- Change the styling for the data so that there are spaces and the page loads as intended when emtpy and not populated
- Continue to communicate issues with backend to refactor data collection and functions so that there are no issues once data is populated

**Backend:**  
- Finalize CRUD unit test updates  
- Build out localStorage integration and confirm end-to-end data flow  
- Implement validation and error handling on incoming form data  
- Ensure that the tests are made for what is possibly put into the frontend
- Ensure that the CI/CD pipeline is working and constantly updated
- Continue to communicate issues with the frontend to refactor the page so that the data is stored correctly



## Follow-up / Next Steps  
- *Albert:*
  - Make sure that the frontend team continues to maintaing stability of the page
  - Continue communication with backend about issues
  - Ensure that the functions and operations in backend are working as intended when on frontend

**Frontend Teams:**  
- *Team 1 (Inchul, Svetlana):*  
  - Focus on form positioning and frontend data display integration  
  - Work on the grid implementation for the cards
  - Work with Team 2 to ensure that the visuals match planning
  - Mid-sprint check-in: Wednesday and Thursday  

- *Team 2 (Samantha, Nadine):*  
  - Coordinate adaptive programming and frontend-backend syncing  
  - Work with Team 1 to ensure that the visuals match planning
  - Make sure that the data is populating and that styling is correct
  - Mid-sprint check-in: Wednesday and Thursday  

**Backend Teams:**  
- *Prachi:*  
  - Oversee CRUD unit test completion and validation updates  
  - Ensure communication with frontend team
  - Make sure that the team continues to work on stuff
  - Ensure validity of CI/CD pipeline and tests

- *Team 1 (Skyler, Charlie):*  
  - Work on localStorage integration and end-to-end data flow testing  
  - Ensure that the CRUD operations are working as intended
  - Conduct checks on the CI/CD pipeline to ensure that all packages are running and no tests are missed
  - Continue to work on unit tests and update CI/CD pipeline

- *Team 2 (Srujam, Minnie, Austin):*  
  - Ensure backend outputs meet frontend needs and assist with error handling  
  - Ensure that the data is populating the localStorage correctly
  - Conduct checks on funciton issues with storage and how it communicates with frontend
  - Continue to work on unit tests and update CI/CD pipeline