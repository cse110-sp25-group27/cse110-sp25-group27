# Frontend Documentation

## Navigation

1. [May 10](#may-10-meeting)

## May 10 Meeting

### Agenda

- 1pm to 4:30pm

### Attendance

- Inchul Kim
- Samantha Phan
- Svetlana Bobiles
- Nadine Apresto

### Notes

- Ticket stub design
  - "Admit One" ticket stub style with movie poster in front
  - Backside of ticket stub has the text movie information and user review 
- Background will be the front of an old theater
- Landing page will show an old theater with a scrolling "now showing" of past reviewed movies

### Accomplished

- Ticket stub design (back and front)
- Landing page assets:
  - Powell as ticket seller in ticket booth
  - Movie theater with "BoxOffice" labeling
- Highfidelity wireframes of landing page, viewing pages, and editing pages

### Images

![Powell Ticket Seller](/frontend/assets/meeting_refs/PowellTicketSeller.png)
![BoxOffice Theater](/frontend/assets/meeting_refs/BoxOffice.png)
![Highfidelity Wireframes](/frontend/assets/meeting_refs/hifidelity_wireframes.png)

## May 12 Meeting

### Agenda

- Assign programming pairs
- Address Codacy merge issues
- Reformat repository (for frontend organization)
- Establish frontend folder/file tree

### Attendance

- Inchul
- Nadine
- Samantha
- Albert
- Svetlana

### Notes

- Programming Pairs:
  - Inchul & Svetlana -> Landing Page and Front_moudle
  - Nadine & Samantha -> Viewing Page and Back_moudle

- When pushing new edits:
  
1. Store changes to a stack: `git stash`
2. Make a new branch: `git branch -b <branchname>`
3. Add changes to new branch: `git stash pop`
4. Add edits to commit: `git add .`
5. Commit: `git commit -am <message>`
6. Stage commit and push: `git push --set-upstream origin <branchname>`

> To check which branch you're on: `git branch`

### Goals to Accomplish by Next Meeting

> Next group meeting for Wednesday's meeting 1-2pm

- Discuss structure of the movie card
  - Title
  - ImgLink
  - ImgAtr
  - Rating
  - Etc.

> Next group meeting for end of week

- Finish all HTML files