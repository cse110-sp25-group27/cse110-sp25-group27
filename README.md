# The POWELL RANGERS

<img src='admin/branding/PowellRangersLOGO.png' width='100%' >

We're the Powell Rangers, a plucky group of students whose mission is to defeat bad software engineering practices and save the industry.

**Learn more about us:**
- [Team Page](admin/team.md)
- [Team Video](admin/videos/teamintro.mp4)
  

## About Box Office Project:
- Box Office is an interactive and visually engaging movie review platform designed for everyday movie lovers — not just critics or industry insiders. Inspired by the charm of classic theaters, ticket booths, and cinema nostalgia, it lets users create personalized, ticket-stub-style movie reviews, track the exact day they watched films, and explore posters and ratings through intuitive, playful interactions. Unlike traditional text-heavy review sites, Box Office focuses on delivering a beautiful, user-friendly experience where people can privately journal, customize, and celebrate their movie-watching journeys.
- [Access the Project](https://cse110-sp25-group27.github.io/cse110-sp25-group27/frontend/pages/onboarding.html)

**Project Flow:**
1. [Flow v1](specs/brainstorm/Box%20Office%20Flow_v1.png)
2. [Flow v2](specs/brainstorm/Box%20Office%20Flow_v2.png)

**BoxOffice Pitch Documents:**
- [Original](specs/mvp/BoxOfficePitchScript-Draft1.pdf)
- [Reevaluated/Updated](specs/mvp/BoxOfficePitchScript-Draft2.pdf)

**Installation/Local Deployment:**
1. Clone the repo
```
  git clone https://github.com/cse110-sp25-group27/cse110-sp25-group27.git
```
1. Install dependencies
```
  # Recommended to do a virtual environment
  npm install
```
1. Go to index.html
2. Run live server
```
  # If on VSCode, use the Go Live button on the bottom right
  npm run dev # Extra dependency needed to run
```
1. Edit/Update any changes

**CI/CD Documentation:**
- [Phase1 docs](admin/cipipeline/phase1.md)
- [Phase1 video](admin/cipipeline/phase1.mp4)
- [Phase2 docs](admin/cipipeline/phase2.md)
- [Phase2 video](admin/cipipeline/phase2.mp4)
- [Phase3 docs](admin/cipipeline/phase3.md)
- [CI/CD Pipeline Documentation](admin/cipipeline/phase1-2.drawio.png)

[**JS Documentation**](/docs/documentation.md)

[**Code Coverage Report**](https://cse110-sp25-group27.github.io/cse110-sp25-group27/)

[**Code Styling Documentation**](/docs/code_style.md)


## Internal Docs

**Team Meeting Notes:**
- Frontend:
  - [Frontend, May 10](admin/meetings/frontend_may_10.md)
  - [General Frontend](docs/frontend.md)
- Backend:
  - [General Backend](docs/backend.md)

**Meetings Notes:**
- [April 11](admin/meetings/apr_11.md)
- [April 16](admin/meetings/april_16.md)
- [April 16 TA](admin/meetings/april_16_TA.md)
- [April 18](admin/meetings/april_18.md)
- [April 25, Brainstorming](admin/meetings/042525-brainstorm.md)
- [May 21 TA](admin/meetings/may_21_TA.md)
- [May 23 TA](admin/meetings/april_23_TA.md)
- [May 28](admin/meetings/may_28.md)
- [May 30 TA](admin/meetings/may_30_TA.md)

**Sprint Notes:**
- [Sprint 1 Review](admin/meetings/51525-sprint-1-review.md)
- [Sprint 2 Review](admin/meetings/052525-sprint-2-review.md)
- [Sprint 3 Review](admin/meetings/53025-sprint-3-review.md)

**Retrospective Notes:**
- [Retrospective 1](admin/meetings/51525-retrospective-1.md)
- [Retrospective 2](admin/meetings/52025-retrospective-2.md)
- [Retrospective 3](admin/meetings/53025-retrospective-3.md)

**Status Video 1:**
- [Status Video 1 Compressed File](admin/videos/statusvideo1.zip)
- [Status Video 1 YouTube Link](https://youtu.be/NZEfHYE5-Vs?si=rzmtmBIWv8Kk1MVd)

**Team ADRs:**
- [ConfirmationButtons](/specs/adrs/05082025-ConfirmationButtons.md)
- [ButtonsForDialogue](/specs/adrs/05102025-ButtonsforDialogue.md)
- [Design](/specs/adrs/05102025-Design.md)
- [DuplicateEntry](/specs/adrs/05142025-DuplicateEntry.md)
- [FormSubmission](/specs/adrs/05142025-FormSubmission.md)
- [GridLayout](/specs/adrs/05302025-GridLayout.md)
- [CardLayout](/specs/adrs/05302025-CardLayout.md)

## Repo Formatting (Tree diagram):
```
.
├── __tests__
├── admin
│   ├── adr
│   ├── branding
│   ├── cipipeline
│   ├── meetings
│   │   └── assets
│   ├── misc
│   └── videos
├── backend
├── code-to-unit-test
├── docs
│   └── coverage_report
│       ├── backend
│       ├── code-to-unit-test
│       └── lcov-report
│           ├── backend
│           └── code-to-unit-test
├── frontend
│   ├── assets
│   │   └── meeting_refs
│   ├── components
│   ├── pages
│   ├── scripts
│   └── styles
├── source
├── specs
│   ├── adrs
│   ├── brainstorm
│   └── script
└── unit-testing
```
