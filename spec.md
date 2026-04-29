# Petstore Browser — Prototype Spec

## Purpose

A lightweight web app that integrates with the [Swagger Petstore API](https://petstore.swagger.io/) to demonstrate the prototype hosting workflow described in the proposal. This is the first prototype deployed via GitHub Pages using the team's new process.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** CSS Modules (no external UI library — keep it light)
- **Deployment:** GitHub Pages via GitHub Actions

## API Integration

- **Base URL:** `https://petstore.swagger.io/v2`
- **Authentication:** API key passed in the `api_key` header
- **Endpoints used:**
  - `GET /pet/findByStatus?status={status}` — list pets by status
  - `GET /pet/{petId}` — get pet details
  - `GET /store/inventory` — get inventory counts by status
  - `POST /store/order` — place an order for a pet

## Credential Handling

Per project requirements:

- **No API keys in source code.** The key is never hardcoded.
- **Prompted at runtime.** On first load, a modal asks the user for their API key. A hint explains that `special-key` works for the demo.
- **Held in memory only.** The key is stored in a React context/ref — never written to localStorage, sessionStorage, or cookies.
- **Session-only lifetime.** Refreshing the page requires re-entering the key.

## Features

### 1. API Key Entry Modal

- Appears on app load before any API calls are made
- Single input field with a "Connect" button
- Helper text: "Enter your Petstore API key. For the demo, use `special-key`."
- Key is stored in an in-memory React context

### 2. Pet Browser

- Tab/filter bar with three statuses: Available, Pending, Sold
- Fetches pets from `GET /pet/findByStatus` when a status is selected
- Displays results as a card grid showing: pet name, ID, category, status badge
- Clicking a card opens the pet detail view

### 3. Pet Detail View

- Shows full pet info: name, ID, category, status, tags, photo URLs (rendered as images if valid)
- "Order this pet" button that places an order via `POST /store/order`
- Back button to return to the browser

### 4. Store Inventory

- Accessible via a nav link
- Calls `GET /store/inventory`
- Displays a simple table/card view of status → count

### 5. Navigation

- Simple top nav bar: **Pets** | **Inventory**
- App title: "Petstore Browser"
- Shows a "Connected" indicator when API key is set

## Non-Functional Requirements

- Responsive layout (works on desktop and mobile)
- Graceful error handling (network errors, 404s shown to user — no silent failures)
- No external runtime dependencies beyond the Petstore API
- Build output is static files suitable for GitHub Pages

## CI/CD Pipeline (GitHub Actions)

### On push/PR to `main`:
1. Install dependencies (`npm ci`)
2. Run gitleaks secret scan
3. Build (`npm run build`)
4. Deploy to GitHub Pages (only on merge to `main`)

### Gitleaks
- Installed directly (pinned to v8.24.3) rather than using the GitHub Action wrapper for more control
- On **push events**: attempts a commit-range scan (`before..after`) for speed
- **Fallback**: if the commit range is invalid (first push to a new repo, root commit with no parent), falls back to a full-repo scan (`gitleaks detect --source .`)
- On **pull requests**: always runs a full-repo scan
- Fails the build (exit code 2) if secrets are detected

### GitHub Pages
- Source: GitHub Actions deployment
- Base path configured for the repo name

## Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── context/
│   │   └── ApiKeyContext.tsx
│   ├── components/
│   │   ├── ApiKeyModal.tsx
│   │   ├── NavBar.tsx
│   │   ├── PetBrowser.tsx
│   │   ├── PetCard.tsx
│   │   ├── PetDetail.tsx
│   │   └── Inventory.tsx
│   ├── api/
│   │   └── petstore.ts
│   └── styles/
│       └── *.module.css
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── spec.md
└── README.md
```

## Acceptance Criteria

- [ ] App loads and prompts for API key before making requests
- [ ] Pets can be browsed by status
- [ ] Pet detail view shows full information
- [ ] Orders can be placed from the detail view
- [ ] Inventory page shows store status counts
- [ ] No credentials in source code (gitleaks passes)
- [ ] Build succeeds and deploys to GitHub Pages on merge
- [ ] App is accessible via the GitHub Pages URL
