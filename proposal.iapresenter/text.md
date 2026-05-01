##### ArrowSphere Prototypes
# Sharing What We Build
	A proposal for hosting analysit prototypes 

We've been building increasingly useful prototypes with AI. Right now, sharing them means cloning a repo and running locally. We can do better.

---
## The Problem
	Our prototypes are trapped on localhost
	But prototypes need to be one-click accessible so that:
	- can be used without dev env to use/maintain
	- can be shared to less-technical users
	
 

Today's workflow: create a repo, build with Copilot, review a PR, clone, run locally. Every person who wants to see the app has to set up a dev environment. This limits who can use what we build and slows down feedback.

---
### Current Workflow
	1. Create GitHub repo
	2. Build with GitHub Copilot
	3. Review pull request (rubber stamped)
	4. Clone repo
	5. Run locally (do I have the right dev setup!?)
	6. Open localhost in a browser

Every person who wants to see the prototype has to repeat steps 4–6. It works, but it doesn't scale.
Cannot share with the team easily, nor outside the team.

---
## The Proposal
	A template repo with built-in deployment to GitHub Pages

One template repo. GitHub Actions builds and deploys automatically on merge. The result is a private, shareable URL — no cloning, no local setup, no friction.

---
### New Workflow
	1. Create repo from template
	2. Write a spec.md
	3. Agent builds from spec
	4. Review PR
	*Second team member for quality and knowledge sharing.*
	5. Merge → auto-deploys to GitHub Pages
	6. Share the URL

The prototype is live and shareable the moment the PR is merged. Anyone on the team can open it in a browser.

---
## Requirements
	Grouped by when they apply

We've identified twelve requirements across four areas. Let's walk through them.

---
### One-Time Setup
	Decisions and configuration we make once in the template

	1. Confirm GitHub Enterprise Cloud to support private Pages.
	2. Standard project structure and README, SPEC template in the repo template.
	3. Agree on a single default tech stack.
	4. Repo naming convention: proto-&lt;vendor&gt;-&lt;purpose&gt;.

Most of this is done once and inherited by every project created from the template.

---
### Every Project
	Rules we follow each time we build a prototype

	* No API keys or credentials in code
	 *prompt at runtime or fetch from AWS Parameter Store.*

	*  Runtime credentials held in memory only 
	*never localStorage or cookies.*

	*  Agent builds web app from spec
	*Spec-driven development spec.md is human readable source of truth. Agent confirms spec reflects implementation for each commit*

These are habits, not infrastructure. Simple to follow, easy to review in a PR.

---
### Always Enforced
	Automated guardrails that run without thinking

	10. Code, app, and Pages must remain private to the organization.
	11. Secret scanning in CI (e.g. gitleaks).
	12. Build must pass before deploy.

These are baked into the template's GitHub Actions workflow. They just run.

---
## GitHub Enterprise Cloud
	Required for private Pages

	Private GitHub Pages is only available on the Enterprise Cloud plan ($21/user/month).
	The org needs Enterprise Cloud — individual team members just need a GitHub account in the org.
	Viewers don't need a paid seat. Developers who push code do.

Worth checking with our GitHub admin — we may already be on Enterprise Cloud. If not, this is the first decision to make.

---
## Risks and Mitigations
	Nothing we can't handle
|     | Risk                                    | Mitigation                                                                       |     |
| :-- | :-------------------------------------- | :------------------------------------------------------------------------------- | :-- |
|     | Arrow Security Governance               | GitHub Enterprise Cloud supports needed features (SAML SSO, audit log, etc.)     |     |
|     | Credentials visible in browser DevTools | Acceptable for internal prototypes; memory-only, session-only                    |     |
|     | Agent-generated code quality            | PR review still required; agent develops from spec.md                            |     |
|     | Credentials committed to source code    | PR review, gitleaks scanning in CI, agent check instructed in spec.md            |     |
|     | Prototype sprawl                        | Naming convention + periodic cleanup review                                      |     |

These are real risks but each one has a clear path forward. None of them are blockers.

---
## What Changes For You
	Less setup. Same quality. Easier sharing.

You still write code the same way. You still raise a PR. The difference is: after merge, the app is live. No one has to clone anything. You send a link instead of a README.

---
## Open Questions
	We need your input on these

	- What should the default tech stack be?
	- Is the naming convention proto-&lt;vendor&gt;-&lt;purpose&gt; clear enough?
	- Are there any requirements we're missing?

These are genuine open questions. Your input shapes the template.

---
## Next Steps
	1. Confirm GitHub Enterprise Cloud supports private Pages
	2. Agree on tech stack and naming convention
	3. Build the template repo
	4. Pilot with one prototype
	5. Roll out to the team

We can have the template ready to pilot within a sprint.

---
## Proof of Concept
	We've already started

/assets/1.png
Size:contain

---

	We spun up a GitHub Enterprise Cloud trial with Enterprise Managed Users to validate the approach. The enterprise is called **Bad Face Industries** — a throwaway name for a real test.

	- **Plan:** Enterprise Cloud, 30-day free trial
	- **Identity Provider:** Microsoft Entra ID (our SSO)
	- **Data hosting:** GitHub.com (US, no data residency)
	- **Username shortcode:** badface (members get handles like user_badface)
	- **Admin:** badface_admin

	This confirms Enterprise Managed Users works with our identity provider and gives us private Pages to test with.

---
### It's Live
	Enterprise created, admin invite received

	![Admin invite email](/assets/2.png)

	Within minutes of submitting the form, the admin account received a setup email. The enterprise is live at github.com/enterprises/bad-face and ready for configuration.

	**What this proves:**
	- Enterprise Cloud signup is straightforward
	- Entra ID integration is a supported first-class option
	- Private Pages will be available once we configure an org under this enterprise

	Next: connect Entra ID, create an org, deploy a test page, and confirm private access works end-to-end.

---
## The Workflow
	From template to live app

	```
	DEVELOPERS (x5)                                              USERS (x20)
	─────────────                                                ──────────────
	
	┌─────────┐       ┌──────────────┐       ┌──────────────┐   ┌──────────┐
	│Developer│──────▶│ Template Repo │──────▶│   New Repo   │   │  Browser │
	└─────────┘create │  (Vite+React) │       │ proto-x-y    │   └──────────┘
	           from   └──────────────┘       └──────┬───────┘        ▲
	           template                             │                 │
	                                                ▼                 │
	                                     ┌──────────────────┐        │
	                                     │  AI Agent builds  │        │
	                                     │  app from spec.md │        │
	                                     └────────┬─────────┘        │
	                                              │                  │
	                                              ▼                  │
	                                     ┌──────────────────┐        │
	                                     │   Pull Request    │        │
	                                     │  (peer review)    │        │
	                                     └────────┬─────────┘        │
	                                              │                  │
	                                              ▼                  │
	                                     ┌──────────────────┐        │
	                                     │  Merge to main    │        │
	                                     └────────┬─────────┘        │
	                                              │                  │
	                                              ▼                  │
	                                     ┌──────────────────┐        │
	                                     │  GitHub Actions   │        │
	                                     │ ┌──────────────┐ │        │
	                                     │ │ gitleaks scan │ │        │
	                                     │ ├──────────────┤ │        │
	                                     │ │   build app   │ │        │
	                                     │ ├──────────────┤ │        │
	                                     │ │deploy to Pages│ │        │
	                                     │ └──────────────┘ │        │
	                                     └────────┬─────────┘        │
	                                              │                  │
	                                              ▼                  │
	                                     ┌──────────────────┐        │
	                                     │  GitHub Pages     │────────┘
	                                     │  (private URL)    │ 20 users access
	                                     └──────────────────┘ via browser
	```

---
## Pricing
	5 developers + 20 users, private AI web app workflow

	Assumption: AI tools already paid for.

	| Platform                | Tier       | Billable Seats | Price/seat/month | Total/month |
	|-------------------------|------------|----------------|------------------|-------------|
	| GitHub Enterprise Cloud | Enterprise | 25             | $21              | $525        |
	| GitLab.com SaaS         | Ultimate   | 5              | $99              | $495        |

	- GitLab best value (lowest billable seats).
	- Both support repo templates, merge workflows, private Pages.
	- Prices are list, billed annually; contact vendors for quotes.
