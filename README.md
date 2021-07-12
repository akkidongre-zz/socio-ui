# Socio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Design choices

1. First page as the login page.
2. Lazy loaded modules for profile and posts.
3. Route guards for profile and posts to prevent unauthorized access.
4. Using local storage for user session management.
5. Shared modules for importing common modules between lazy loaded feature modules.

## Libraries used

1. Bootstrap - For nice, responsive grid layouts
2. Angular material and dependencies - For material design components.
3. angularx-social-login - For enabling logging in using google, facebook

## What can be improved?

1. The way components and modules that are setup.
2. Creating a signup and login forms separately - Helps in separation of instances.
3. Components can be lazy loaded.
4. Better models for data types can be created.
5. Initial components can be lazy loaded to improve lcp.
6. Instagram, git logins could be done.

## Possible design issues

1. Date and times can be changed in localstorage to have long time access.
2. When more details come in, modules can become heavier.
3. Logging in apis can be called from backend for security. Now it is using a library.