---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Confirmation Buttons

# These are optional elements. Feel free to remove any of them.
# status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
# date: {YYYY-MM-DD when the decision was last updated}
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Do we need to include confirmation buttons for cancelations or continuations decisions?

## Context and Problem Statement

When clicking on buttons that could potentially mess up a user's addition to the application, there would be buttons that confirm the user's decision. This would be placed in edit and delete operations of the application. These additions to the application can help with users that may have accessibility issues or help users that may be indecisive. This would help address these issues, howevever, it could clutter the experience of users that do not have these issues.

## Decision Drivers

* Enable indecisive or users with accessibility issues to confirm certain actions
* Ensure that the actions made by users were intended
* Provides the users an option to continue their "danger" action within the application (deleting or editting cards)
* Include accessibility and responsiveness across different devices and user experiences

## Considered Options

* Include confirmation buttons
* Do not include the buttons
* Adjust potentially "dangerous" actions to be larger and more "accessible"

## Decision Outcome

Still deciding.

## Pros and Cons of the Options

### Include confirmation buttons

* Good, because allows users to confirm their actions
* Good, because users with accessibility issues can navigate applicaiton without any issues of misclicks
* Bad, because can clutter application with redundant actions

### Do not include the buttons

* Good, because less clutter for the users wihtout accessibility options
* Good, because users can access actions without any interruptions which may slow down thier actions
* Bad, because users with accessibility/indecisiveness may have issues with accidentally doing actions which may be harmful to their experience

### Adjust potentially "dangerous" actions to be larger and more "accessible"

* Good, because allows both accessibility options to ensure that they clicked the actions correctly
* Good, because users do not need to worry about clutter on the applications when looking at confirmation buttons
* Bad, because the application can be visually cluttering and intrude the user's experience.

