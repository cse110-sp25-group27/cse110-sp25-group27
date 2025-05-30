---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 101
title: SingleCardWithToggleSections
status: accepted
date: 2025-05-30
---
<!-- markdownlint-disable-next-line MD025 -->
# How should we structure the review card element?

## Context and Problem Statement
Currently, we have a `review-card` element that treats the **front** and **back** as two separate visual components, often switching between them by flipping or hiding/showing. This introduces extra complexity in maintaining two separate pieces and coordinating their display logic.

We are considering an alternative: rather than having distinct front and back components, we design **one long card element** (`reviewCard`) that contains both the front and back as sections. We toggle which section is shown, rather than managing separate card faces.

This aligns with our goal of having a single, unified `reviewCard` element for easier maintenance, simpler styling, and more predictable toggling behavior.

## Decision Drivers
* Simplifies the component structure by having a single JS element (`reviewCard`)
* Reduces complexity in display logic (no need for flip animations unless desired)
* Easier to implement responsive layouts using CSS grid/flex
* Consistency in data handling: both front and back live under the same card object

## Considered Options
* **Option 1**: Keep two separate card faces (front and back) and swap between them
* **Option 2**: Create one long card with toggleable sections for front and back

## Decision Outcome
We choose **Option 2** — one long card with toggleable front/back sections.  

This simplifies the implementation and aligns well with our grid layout. The user can toggle between viewing the front and back without the need for separate DOM elements or flip animations, though we can still optionally add animations if desired.

## Pros and Cons of the Options

### Option 1: Separate card faces
**Pros**
- Allows for animated flip effects
- Mimics real-world card interactions

**Cons**
- More complex DOM structure
- Requires careful coordination between front/back components
- Harder to maintain responsive grid layouts

### Option 2: Single card with toggle sections (Chosen)
**Pros**
- Single unified component (`reviewCard`)
- Simpler CSS and JS logic
- Easier to implement within a grid or scroll layout
- Reduces duplication of styles and handlers

**Cons**
- Less “realistic” card flip unless custom animations are added
- Requires careful design to visually separate the front/back sections internally

## Links
N/A
