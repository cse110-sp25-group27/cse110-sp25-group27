# Retrospective 1 (conducted after Sprint Review 1)
### May 15th, 2025

## Attendence
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


- ## Sprint Overview
    - The goal of this week was to get started on the project: conduct frontend and backend team meetings so everyone is on the same page, setup the initial CI/CD pipeline, and initiate communication between the teams so all features can be implemented.
    - Frontend goal:   
      - Finish front and back module: layout of what the user need to do in order to fill out their review
        - Front: moive poster, username, moive title
          - Fronttemplate-module: Form for user to input the poster
        - Back: date watched, moive title, moive review, moive rating
          - Backtemplate-module template: Form for the user to fill out their review
    - Backend goal: 
      - Decide how to handle duplicates, produce general logic for CRUD operations, create and fill in skeletons for our custom elements
        - Duplicates are NOT going to be allowed, decision process highlighted within our ADR folder.
        - Our general CRUD logic is held within the localstorage.js file on the crud branch
        - The reviewcard.js file in the same branch will serve as the skeleton to be filled out when frontend decides on their design
    

## What Went Well
- Frontend: 
  - Our communication skills for planning meetings or working on items
  - Working towards goals of finishing card template html
  - Meeting up with everyone giving their own input on each aspect of the things need to be done
- Backend: 
  - Having nuanced conversations about what features we wanted as well as understanding when there was conflict
  - Made good progress in developing the features needed for CRUD operations to occur
  - Every member's opinion was considered and heard

## What Didn’t Go Well
- Frontend: 
    - Communication issues with backend in the structure of how they want the CRUD operations being tied in with the frontend
    - Transfering information from documentation to make html data population work
    - Meetings were online so the design aspect was hard to work on and took longer to communicate our ideas
    - Some ideas were out of scope (implementing other libraries)
- Backend: 
    - Was hard finding a common time to meet that worked with everyone's schedule
    - Communciation with the frontend team was at times hazy and needed to wait to come to a good conclusion
    - Internet issues with meeting online sometimes hindered the progress on our part

## Lessons Learned
- [Insights or takeaways from this sprint that can guide future work]
- Frontend: 
    - Communication is key
    - Read and understand documentation to the fullest extent
    - Understand how to use tools in respect to project's scope
- Backend: 
    - Need more frequent checkins with frontend team to make sure everyone is on the same page
    - Understanding and patience are paramount to success

## Action Items
- [List of actionables or process changes the team agrees to try]
- Frontend:
    - Communicate better with backend on what is needed in order for them to succeeded
    - Reading up on materials for some ideas such as meta query before trying to implement them while reading
- Backend: 
    - Setup specific and agreed upon times during the week to quickly check in with frontends progress
    - Finish labs at least a day before they are due so our we will be prepared to use the topics in our project


## Follow-up / Next Steps
- [Who owns each action item, and when you’ll check in on them]
- Frontend: 
    - Team 1 (Inchul and Svetlana):
        - HTML/CSS for landing page and front module
        - Check-in: Middle of sprint (Wednesday and Thursday)
    - Team 2 (Samantha and Nadine):
        - HTML/CSS for viewing page and back module
        - Check-in: Middle of sprint (Wednesday and Thursday)
- Backend:
   - Team 1 (Skyler and Charlie):
        - Fill in assigned test cases and look into filling out our skeleton js file
        - Check-in: Middle of sprint (Wednesday and Thursday)
    - Team 2 (Srujam, Minnie, and Austin):
        - Polish CRUD file, do assigned test cases for functionality, if time, look into filling in skeleton js file
        - Check-in: Middle of sprint (Wednesday and Thursday)
