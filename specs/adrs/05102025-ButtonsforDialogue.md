---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Buttons for Dialogue

# These are optional elements. Feel free to remove any of them.
# status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
# date: {YYYY-MM-DD when the decision was last updated}
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# For creating a new ticket stub, should we have 'yes' or 'no' buttons or a drop down selection for 'yes' or 'no'?

## Context and Problem Statement

When the user wants to create a new ticket stub through Powell, Powell's dialogue asks if we want to make a new ticket stub, however, for the HTML structure and design, we can either have two separate buttons 'yes' and 'no' or we can have a drop down selection box with the options 'yes' and 'no'. 

## Decision Drivers

* Changes the overall aesthetic 
* Affects how the user decisions are interpreted across other project files

## Considered Options

* Use two buttons
* Use a drop down selection menu

## Decision Outcome

* Still deciding.

## Pros and Cons of the Options

### Use Two Buttons

* Good, because it gives clear options to the user if they want to create the new ticket stub or not
* Good, because allows us more customizability of the buttons when it comes to styling
* Bad, because it might be more difficult to interpret the separate buttons inputs in the backend

### Use Drop Down Selection

* Good, because allows users to see all options in one space 
* Good, because it saves space on the screen, less clutter of buttons and images
* Bad, because might not be easily customizable to make it look aesthetically pleasing
* Bad, because might be less intuitive for users because they are more used to separate buttons when making 'yes' or 'no' decisions across platforms
