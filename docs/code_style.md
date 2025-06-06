# Code Style Guide

This document outlines the coding conventions for this project to ensure consistency, readability, and maintainability.

---

## General

- **File Naming:**
  - JavaScript files should use `camelCase` (e.g., `reviewCard.js`, `localStorage.js`).
  - HTML and CSS files should use `snake_case` (e.g., `landing_page.html`, `landing_page.css`).
- **Indentation:** Use 4 spaces for HTML and JavaScript, and 2 spaces for CSS.
- **Line Endings:** Use LF (Unix-style) line endings.
- **Character Set:** Use UTF-8 for all files.

---

## JavaScript

- **Variable Declarations:**
  - Use `const` for variables that will not be reassigned.
  - Use `let` for variables that will be reassigned. Avoid `var`.
- **Naming Conventions:**
  - **Variables & Functions:** Use `camelCase` (e.g., `reviewCardsInCarousel`, `displayInitialReviews`).
  - **Classes:** Use `PascalCase` (e.g., `ReviewCard`).
  - **Constants:** Use `UPPER_SNAKE_CASE` for top-level, immutable constants (e.g., `BASE_CARD_WIDTH`).
- **Quotes:** Use single quotes `'` for strings unless the string contains a single quote.
- **Semicolons:** Always use semicolons at the end of statements.
- **Functions:**
  - Prefer arrow functions `() => {}` for callbacks and anonymous functions.
  - Use the `function` keyword for top-level or exported functions that may require `this` context binding.
  - Use `async/await` for handling promises.
- **Comments:**
  - Use **JSDoc comments** (`/** ... */`) for all non-trivial functions, classes, and exported modules. Document parameters (`@param`), return values (`@returns`), and a brief description of the function's purpose.
  - Use single-line comments `//` for clarifying individual lines or short blocks of code.
- **Modules:** Use ES6 modules (`import`/`export`).

---

## HTML

- **Formatting:**
  - Use 4-space indentation.
  - Use lowercase for all element names, attributes, and values.
- **Tag Conventions:**
  - Always include the `<!DOCTYPE html>` declaration.
  - Close all tags, including self-closing ones where appropriate.
  - Use semantic tags (`<main>`, `<section>`, `<nav>`, etc.) to structure the content meaningfully.
- **Attributes:**
  - Use double quotes `"` for attribute values.
  - Attribute order should be logical: `id`, `class`, data attributes (`data-*`), then functional attributes (`src`, `href`, `type`).
- **Comments:** Use `<!-- ... -->` for comments, indented to the same level as the code they describe.

---

## CSS

- **Formatting:**
  - Use 2-space indentation.
  - Place the opening brace `{` on the same line as the selector.
  - Place the closing brace `}` on its own line.
- **Selectors:**
  - Use `kebab-case` for class and ID names (e.g., `.poster-carousel`, `#add-ticket-button`).
- **Organization:**
  - Group related rules together (e.g., positioning, box model, typography, visual).
  - Place media queries at the end of the relevant rule set or at the end of the file.
- **Comments:** Use `/* ... */` for comments.

