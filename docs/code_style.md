# Frontend Code Style Guide (HTML + CSS)

1. File Naming
- Use snake_case for all files.
  - index.html, main.css, landing_page.html
- Use lowercase for all element names and attributes.
- Always close tags (even self-closing ones in XHTML-style projects).
- Use semantic tags wherever possible:
- Attribute order: id, class, name, src/href, type, alt, title, data-*, aria-*.

2. CSS Conventions
- Use kebab-case for class names.
  - `.nav-bar`, `.form-input`, `.user-profile`
- Group CSS rules logically (layout, typography, color, hover states).
- Prefer utility classes or variables for repeatable values.



# Backend Code Style Guide (JavaScript)
1. File Naming
- Use camelCase for files.
  - userController.js, authService.js
- Organize files by purpose (e.g., controllers/, services/, routes/)

2. Variable Naming
- Use camelCase for variables and function names.
- Use PascalCase for classes and constructors.
  - DatabaseClient, UserModel

3. Constants
- Use UPPER_CASE_SNAKE_CASE for top-level, immutable constants.

4. Function Naming
Start functions with verbs to clarify behavior.

5. JSDoc Comments
Use JSDoc for public and complex functions:

6. General Practices
- Semicolons: Always use semicolons.
- Quotes: Prefer single quotes ' unless a string contains a single quote inside it.
- Formatting: Use Prettier to auto-format code with consistent spacing and indentation.

