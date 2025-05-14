---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Form Submission

# These are optional elements. Feel free to remove any of them.
# status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
# date: {YYYY-MM-DD when the decision was last updated}
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# How should we implement the user form submission for information input?

## Context and Problem Statement
When the user enters in data for movie information and review through Powell, we need to decide whether the form submission is split into two or consolidated into one. The front side of the ticket stub asks for movie poster and movie title while the back asks for everything else. Should the front and back be separated into two different form submissions so we can have an animation that flips between the front and back?

## Decision Drivers
* Simplicity vs. aesthetic animation
* Simple to follow submission for user
* Easier backend implementation

## Considered Options
* Single initial form for movie info
* Frontside poster and title form, backside rest of movie info in second form
* Front and back of ticket as a single form with animation between

## Decision Outcome
* Decided to only use one event listener for backend and implement card flip animation if possible for frontend later down the line

## Pros and Cons of the Options

### Pros
* Better UI design to have the user fill out the form by flipping and viewing both sides of the card
* By having only one event listener, it's easier to connect the objects
* Single form supports ease of use for a new user

### Cons
* Might be difficult due to uncertainity around the complexity of some aspects