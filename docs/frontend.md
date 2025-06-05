# Frontend Documentation

## Navigation

1. [May 10](#may-10-meeting)
2. [May 12](#may-12-meeting)
3. [May 14](#may-14-meeting)
4. [May 19](#may-19-meeting)
5. [May 28](#may-28-meeting)
6. [June 2](#june-2-meeting)
   
---

## May 10 Meeting

### Agenda - 5/10

- 1pm to 4:30pm

### Attendance - 5/10

- Inchul Kim
- Samantha Phan
- Svetlana Bobiles
- Nadine Apresto

### Notes - 5/10

- Ticket stub design
- "Admit One" ticket stub style with movie poster in front
- Backside of ticket stub has the text movie information and user review 
- Background will be the front of an old theater
- Landing page will show an old theater with a scrolling "now showing" of past reviewed movies

### Accomplished - 5/10

- Ticket stub design (back and front)
- Landing page assets:
- Powell as ticket seller in ticket booth
- Movie theater with "BoxOffice" labeling
- Highfidelity wireframes of landing page, viewing pages, and editing pages

### Images - 5/10

![Powell Ticket Seller](/frontend/assets/meeting_refs/PowellTicketSeller.png)
![BoxOffice Theater](/frontend/assets/meeting_refs/BoxOffice.png)
![Highfidelity Wireframes](/frontend/assets/meeting_refs/hifidelity_wireframes.png)

---

## May 12 Meeting

### Agenda - 5/12

- 12pm to 4:30pm
- Assign programming pairs
- Address Codacy merge issues
- Reformat repository (for frontend organization)
- Establish frontend folder/file tree

### Attendance - 5/12

- Inchul
- Nadine
- Samantha
- Albert
- Svetlana

### Notes - 5/12

- Programming Pairs:
  - Inchul & Svetlana -> Landing Page and Front_moudle
  - Nadine & Samantha -> Viewing Page and Back_moudle

- When pushing new edits:
  
1. Make a new branch: `git checkout -b <branchname>`
2. Add edits to commit: `git add .`
3. Commit: `git commit -am <message>`
4. Stage commit and push: `git push --set-upstream origin <branchname>`

> To check which branch you're on: `git branch`

### Goals to Accomplish by Next Meeting - 5/12

> Next group meeting for Wednesday's meeting 1-2pm

- Discuss structure of the movie card
- Title
- ImgLink
- ImgAtr
- Rating
- Etc.

> Next group meeting for end of week

- Finish all HTML files

---

## May 14 Meeting

### Agenda - 5/14

- 2pm to 3pm, before general meeting at 3pm to 4pm

### Attendance - 5/14

- Inchul
- Nadine
- Samantha
- Albert
- Svetlana

### Notes - 5/14

- created new folder differentiating the edit and viewing back module
- stars are filled in based on hover (filling in the ones before)
- sizing of images should be set dimensions, done before css
- square: 500x500?
- rectangles: 1000x500?
- following the articles and template like Lab 6

### Accomplished - 5/14

- implemented skeleton template for the backend team to fill in (like lab 6)
- front_module.HTML
- back_modeul.HTML
- backTemplate.HTML

---

## May 19 Meeting

### Attendance - 5/19

- Albert 
- Inchul
- Samantha
- Nadine
- Svetlana

### Agenda - 5/19

- Brief overview after wednesday meeting

### Notes - 5/19

- consolidated template.html to one page (back_module template for the html elements is now just template.html)
- template styling will allow one form for backend implementation and styling will display two "cards" using CSS, but using one form for user input
- beginning on styling
- adjustments for the cards and positioning
- issues with positioning of the articles and buttons

### Accomplished - 5/19

- fully implemented template, front_module, back_module htmls
- temp styling for landing and viewing pages

### Need to Work On - 5/19

- make sure backend CRUD operations generate html articles correctly
- ensure that the css styling for the cards is working
- ensure that the data is displaying correctly on the pages
- ensure that none of the modules are breaking and there are no issues with positioning
- implementing stacked cards in landing page
- ensure webpages are adaptive to different screens of different sizings 

### Questions and Clarifications

- Q: One form? A: Yes, all the data is collected on one form so that the CRUD operations will work with one retrieval function
- Q: Accessing viewing from landing page? A: Click on text option from Powell and it will direct you to the viewing page. To go backwards, right now, there is a link directing you backwards. However, once fully implemented, onve you edit, it will direct you back automatically.

### Questions from Frontend to Backend

- To implement the styling for the stacked ticket stubs, should frontend hard code the "stacked look" in CSS, or will backend be able to help out with the implementation in JS?


## May 28 Meeting

### Attendance - 5/28

- Albert 
- Inchul
- Nadine
- Svetlana

### Agenda - 5/28

- A brief meeting after the general meeting 

### Notes - 5/28

- When you click on dialogue, open up the form
  - Form will allow the user to fill out the form
  - Scrolling within the container
  - Once you fill out the form, it will update with the card
    - Cards will continue to appear when updated, allowing you to scroll
    - If there are less than a certain amount of cards, no scroll
    - Otherwise, scrolling enabled
  - By default there is padding between the banner and office box
    - Once populated with posters, replace padding with cards
  
## June 2 Meeting

### Attendance - 6/2

- Albert 
- Inchul
- Samantha
- Nadine
- Svetlana

### Agenda - 6/2

- 1pm to 3pm for working, a bit after 3 to clarify some stuff

### Notes - 6/2

- Fix up the Landing Page html and css 
- Style the form based on what would improve the user experience
- Deleted viewing page html/css along with back_moudle and front moudle css files(not needed anymore)
- Changed the ticket booth attendent to respect Powell

### Accomplished - 6/2

- Styling of the add ticket form is completed
  - Form will now open up to the center of the page (ticket)
- Revamped the frontend folder to reflect the new mvp

### Need to Work On - 6/2

- Finish up some styling issues if ended
- Final sprint on Friday with backend team
- Fix up new Design

### Questions and Clarifications - 6/2

- Q: Removing Viewing Page? A: Yes, the viewing page is a redundant feature if we have the landing page with the attendent adding a ticket. Having the features all at once would let the user have a better experience.

## Progress of Frontend as of 6/4 

- Frontend.md has been updated (5/28 a little (i don't really know what went on)+ 6/2 from the info/summary in our group communications)
- Powell ticketbooth in meetingref also deleted in addition to the current ticketbooth in landing page to respect Powell
- New Design Wireframes to reflect our new MVP
- Flowchart updated in MVP to reflect new functionality of our website
- New design is in frontend/meetingref/in case we need to make an ADR on friday for it
- Old Design has been uploaded in order to be used in our adr for revamping our project scale