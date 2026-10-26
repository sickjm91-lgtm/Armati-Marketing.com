# ArmatiMarketing.Com — Developer Handoff

## Product

ArmatiMarketing.Com is intended to be a multi-tenant SaaS platform that can sell ready-to-go online businesses and also provide recurring website/AI marketing services.

## Core customer journey

1. Visitor browses marketplace.
2. Customer signs in.
3. Customer selects a business package.
4. Server creates Stripe Checkout Session.
5. Stripe sends a signed webhook.
6. Server records the billing event/subscription.
7. Workspace is provisioned.
8. Template is cloned.
9. Customer completes onboarding.
10. AI generates structured page data.
11. Customer edits/approves the draft.
12. Publishing service creates a deployment.
13. Customer manages site, leads and billing from the dashboard.

## Security model

Tenant isolation must be enforced by PostgreSQL RLS, not only by hiding UI controls.

Secret credentials belong only in environment variables or a secrets manager.

The license private key must never be shipped to the web application.

The browser must never receive the Supabase service-role key, Stripe secret key or OpenAI API key.

## Current starter boundary

Implemented:
- marketing page
- marketplace
- customer dashboard foundation
- admin authorization foundation
- Supabase SSR clients
- database schema/RLS
- AI generation route
- Stripe checkout route
- Stripe webhook route
- license activation route
- license key generation/signing scripts

Still required for a full commercial production system:
- robust onboarding UI
- full template editor
- template cloning API
- page editor and preview renderer
- publishing provider integration
- custom domain verification
- background job queue
- complete admin CRUD
- email workflows
- lead capture forms
- usage metering and hard limits
- automated tests
- observability
- legal/privacy workflows
- production security review
- deployment and DNS configuration

## API surface

- `POST /api/ai/generate`
- `POST /api/stripe/create-checkout`
- `POST /api/stripe/webhook`
- `POST /api/license/activate`

The next production routes should include:
- `GET/POST /api/sites`
- `GET/PATCH /api/sites/[id]/pages/[pageId]`
- `POST /api/sites/[id]/publish`
- `POST /api/templates/[id]/clone`
- `GET/POST /api/leads`
- `GET/PATCH /api/workspaces/[id]`

## Licensing

The included licensing foundation uses an Ed25519-signed JWT. The application verifies the signature with a public key.

This prevents someone who only has the deployed application from minting valid licenses, provided the private signing key remains protected.

For stronger commercial protection, operate licensing from a separate service with:
- license issuance
- activation records
- installation limits
- revocation
- grace periods
- audit logs
- rate limiting
- key rotation
- offline emergency validation policy

## GitHub workflow

Use a private repository during development. Require pull requests for production changes. Enable secret scanning, Dependabot/dependency alerts, branch protection and two-factor authentication.

## Production readiness

Do not advertise the starter as production-ready until provider configuration, security testing, payments, publishing, privacy/legal requirements, backups and monitoring are complete.
