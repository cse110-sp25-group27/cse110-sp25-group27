---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: ReevaluatedMVP

# These are optional elements. Feel free to remove any of them.
# status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
# date: {YYYY-MM-DD when the decision was last updated}
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Do we need to reevaluate what I can do for our MVP?

## Context and Problem Statement
 In our second sprint, we realized that we would not be able to deliver our current MVP. Through thorough thought, the group has to descale our features and think about the most important part that users will want that we are able to deliver on time by June 8th.

## Decision Drivers
* Simplicity vs. Aesthetic 
* Simple to follow submission for user
* Required features for application

## Considered Options
* OnBoarding Page
* Landing Page has viewing page functionality
* Viewing Page feature are redundant
* Take out all the nice-to-have features on the MVP

## Decision Outcome
* We will combine the viewing page functionality onto the landing page
* The onboarding page will be there 

## Work for Final Sprint

Backend:
* unit testing, need to get code coverage report higher e2e testing similar to the lab
* fix edit functionality 
* jsdocs for all JS functions
* naming conventions should be consistent across repo
  
Frontend
* Redo Design (found in frontend.md) and include it in MVP w/ flowchart
* styling for the form
* Delete viewing page
* change the image
  
Both teams: try to get deployment ready by combining frontend and backend

## Pros and Cons of the Options

### Pros
* Better UI experience by simpilfy the features to be on one page for landing/viewing in addition to onboarding page
* Reevaluting the MVP will make the team be able to submit a working mvp on time

### Cons
* Have to redo the design and rewrite the MVP
* Some UI design that the user will like will have to be taken away
* Code written will have to be deleted 
* Code refactor might take some time