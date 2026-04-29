# Petstore Browser

A prototype web app that integrates with the [Swagger Petstore API](https://petstore.swagger.io/) — built to demonstrate the team's prototype hosting workflow via GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

Open the app and enter `special-key` when prompted for the API key.

## Features

- Browse pets by status (available, pending, sold)
- View pet details (category, tags, photos)
- Place orders for pets
- View store inventory

## Credential Handling

This app follows the team's security requirements:
- **No API keys in source code** — prompted at runtime
- **Memory only** — never stored in localStorage or cookies
- **Session-only** — refreshing the page requires re-entry

## Deployment

Merging to `main` triggers a GitHub Actions workflow that:
1. Scans for secrets (gitleaks)
2. Builds the app
3. Deploys to GitHub Pages

## Tech Stack

- React 18 + TypeScript
- Vite
- GitHub Actions + GitHub Pages
