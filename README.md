# The POWELL RANGERS

<img src='./admin/branding/PowellRangersLOGO.png' width='100%' >

We're the Powell Rangers, a plucky group of students whose mission is to defeat bad software engineering practices and save the industry.

**Learn more about us:**
- [Team Page](./admin/team.md)

## Internal Docs

**Team Meeting Notes:**
- Frontend:
  - [Frontend, May 10](./admin/meetings/frontend_may_10.md)
  - [General Frontend](./docs/frontend.md)
- Backend:
  - [General Backend](./docs/backend.md)

**Meetings Notes:**
- [April 11](./admin/meetings/apr_11.md)
- [April 16](./admin/meetings/april_16.md)
- [April 16 TA](./admin/meetings/april_16_TA.md)
- [April 18](./admin/meetings/april_18.md)
- [April 25, Brainstorming](./admin/meetings/052525-brainstorm.md)
- [May 21](./admin/meetings/may_21_TA.md)
- [May 23 TA](./admin/meetings/may_23_TA.md)
- [May 28](./admin/meetings/may_28.md)
- [May 30 TA](./admin/meetings/may_30_TA.md)

**Status Video 1:**
- [Status Video 1 Compressed File](./admin/videos/statusvideo1.zip)
- [Status Video 1 YouTube Link](https://youtu.be/NZEfHYE5-Vs?si=rzmtmBIWv8Kk1MVd)

**Team ADRs:**
- [ConfirmationButtons](./specs/adrs/05082025-ConfirmationButtons.md)
- [ButtonsForDialogue](./specs/adrs/05102025-ButtonsforDialogue.md)
- [Design](./specs/adrs/05102025-Design.md)
- [DuplicateEntry](./specs/adrs/05142025-DuplicateEntry.md)
- [FormSubmission](./specs/adrs/05142025-FormSubmission.md)

## Movie Box Documentation

**Installation/Local Deployment:**
1. Clone the repo
```
  git clone https://github.com/cse110-sp25-group27/cse110-sp25-group27.git
```
2. Install dependencies
```
  # Recommended to do a virtual environment
  npm install
```
3. Go to index.html
4. Run live server
```
  # If on VSCode, use the Go Live button on the bottom right
  npm run dev # Extra dependency needed to run
```
5. Edit/Update any changes

**CI/CD Documentation:**
- [phase1](./admin/cipipeline/phase1.md)
- [phase1 video](./admin/cipipeline/phase1.mp4)
- [phase2](./admin/cipipeline/phase2.md)
- [phase2 video](./admin/cipipeline/phase2.mp4)

[**JS Documentation**](./docs/documentation.md)

**Repo Formatting (Tree diagram):**
```
.
├── __tests__
│   ├── localStorage.test.js
│   └── sum.test.js
├── admin
│   ├── adr
│   │   └── SWOT_analysis.pdf
│   ├── branding
│   │   └── PowellRangersLOGO.png
│   ├── cipipeline
│   │   ├── phase1-2.drawio.png
│   │   ├── phase1.md
│   │   ├── phase1.mp4
│   │   ├── phase2.md
│   │   └── phase2.mp4
│   ├── meetings
│   │   ├── 042525-brainstorm.md
│   │   ├── 052525-sprint-2-review.md
│   │   ├── 51525-retrospective-1.md
│   │   ├── 51525-sprint-1-review.md
│   │   ├── 52025-retrospective-2.md
│   │   ├── apr_11.md
│   │   ├── april_16_TA.md
│   │   ├── april_16.md
│   │   ├── april_18.md
│   │   ├── april_23_TA.md
│   │   ├── assets
│   │   │   ├── apr16_img.png
│   │   │   ├── apr18_img.jpg
│   │   │   └── table_idea.jpg
│   │   ├── frontend_may_10.md
│   │   ├── may_21_TA.md
│   │   ├── may_28.md
│   │   └── may_30_TA.md
│   ├── misc
│   │   ├── rules-albertho.pdf
│   │   ├── rules-austinchoi.pdf
│   │   ├── rules-charliezhu.pdf
│   │   ├── rules-inchulkim.pdf
│   │   ├── rules-minniezhang.pdf
│   │   ├── rules-nadineapresto.pdf
│   │   ├── rules-prachiheda.pdf
│   │   ├── rules-samanthaphan.pdf
│   │   ├── rules-skylernguyen.pdf
│   │   ├── rules-srujamdave.pdf
│   │   ├── rules-svetlanabobiles.pdf
│   │   └── rules.md
│   ├── team.md
│   ├── teambonding.jpg
│   └── videos
│       ├── statusvideo1.zip
│       └── teamintro.mp4
├── backend
│   ├── localStorage.js
│   ├── reviewCard.js
│   ├── reviewCardBack.js
│   └── reviewCardFront.js
├── code-to-unit-test
│   └── sum.js
├── docs
│   ├── backend.md
│   ├── code_style.md
│   ├── diagram.drawio.png
│   ├── documentation.md
│   └── frontend.md
├── eslint.config.js
├── frontend
│   ├── assets
│   │   ├── 0_star.png
│   │   ├── 1_star.png
│   │   ├── 2_star.png
│   │   ├── 3_star.png
│   │   ├── 4_star.png
│   │   ├── 5_star.png
│   │   ├── blank_star.png
│   │   ├── boxoffice_banner.png
│   │   ├── city_top.png
│   │   ├── filmstrip_btn.png
│   │   ├── gold_left_arrow.png
│   │   ├── gold_right_arrow.png
│   │   ├── gold_star.png
│   │   ├── meeting_refs
│   │   │   ├── BoxOffice.png
│   │   │   ├── hifidelity_wireframes.png
│   │   │   └── PowellTicketSeller.png
│   │   ├── PowellRangersLOGO.png
│   │   ├── ticket_booth.png
│   │   └── ticket.png
│   ├── components
│   │   ├── back_module.html
│   │   ├── front_module.html
│   │   └── template.html
│   ├── index.html
│   ├── pages
│   │   ├── landing_page.html
│   │   └── viewing_page.html
│   └── styles
│       ├── back_module.css
│       ├── front_module.css
│       ├── landing_page.css
│       └── viewing_page.css
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── source
└── specs
    ├── adrs
    │   ├── 05082025-ConfirmationButtons.md
    │   ├── 05102025-ButtonsforDialogue.md
    │   ├── 05102025-Design.md
    │   ├── 05142025-DuplicateEntry.md
    │   └── 05142025-FormSubmission.md
    ├── brainstorm
    │   ├── Box Office Flow_v1.png
    │   └── Box Office Flow_v2.png
    └── script
        └── Box Office Pitch Script Draft.pdf
```