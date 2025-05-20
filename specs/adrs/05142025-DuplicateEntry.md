---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Duplicate Entry
---
## Context and Problem Statement
When users are submitting movies to review, how should the program behave when a user attempts to submit a movie with a duplicate name? How should we differentiate between actual duplicate entries and entries where the movies are different, but they just happen to have the same name?

## Considered Options
* Block users from submitting movie reviews with duplicate titles
* Block user from creating movie reviews with duplicate titles and images
* Add movie release dates to the form and block reviews with duplicate release dates and titles
* Allow duplicate reviews 
* Allow duplicates but give the user a warning
* Append duplicate movie reviews to existing movie reviews
* Redirect user to update existing review 

## Decision Outcome
* Block reviews duplicate titles and allow them to change their movie title
* Movie titles are not case sensitive
* Prompts users to make a variation with the title and then submit again

## Pros and Cons of the Options

### Pros
* Simplifies search function
* Prevents confusion between reviews from users
* Easier navigation for users across reviews
* Simplifies implementation by not redirecting users
* Mitigates complexity that could cause issues later

### Cons
* May hinder user experience by prompting them to change movie title
* Have to add additional checks and error handling to prevent duplicates
* Lose access to reviewing movies with the same name without having to alter one of the titles