---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: GridLayout

# These are optional elements. Feel free to remove any of them.
# status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
# date: {YYYY-MM-DD when the decision was last updated}
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# How should we implement the viewing page layout?

## Context and Problem Statement
When the user clicks on the viewing page, the user will be able to see the cards that they made. Originally, we planned on layout out the cards in a horizontal matter. However, since we can adjust the sizing, it seems like it would be counter intuitive to keep the cards horizontal. We can utilize the grid layout to show the cards. With this, the user can click on the cards (to see front and back) and scroll down to see more cards.

## Decision Drivers
* Simplicity vs. aesthetic animation
* Simple to follow submission for user
* Easier backend implementation

## Considered Options
* Grid View w/ Scroll
* Scroll sideways to see cards

## Decision Outcome
* Decided to use grid view, easier to implement, alter with grid sizing

## Pros and Cons of the Options

### Pros
* Better UI design to have the user fill out the form by flipping and viewing both sides of the card
* Layout is easier to navigate, user can see all their cards easier

### Cons
* Page might be populated