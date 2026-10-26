# ArmatiMarketing.Com

A GitHub-ready starter for a multi-tenant AI website SaaS and ready-to-go online business marketplace.

## What is included

- Next.js + TypeScript application
- Supabase Auth/PostgreSQL integration
- Workspace and membership model
- PostgreSQL Row Level Security (RLS)
- AI website generation using OpenAI Responses API with structured JSON output
- Template catalog and template cloning foundation
- Stripe Checkout session creation
- Stripe webhook verification
- Subscription record handling
- Customer dashboard
- Admin dashboard foundation
- License activation and signed license verification
- Environment-variable based secrets
- SQL migrations and seed data
- Secure defaults and explicit production TODOs

The earlier product specification calls for customer isolation, AI generation, template cloning, marketplace products, billing, publishing, admin tools, and white-label configuration. This starter implements the foundation for those capabilities.

## 1. Prerequisites

Install:

- Node.js 20+ (use the current supported LTS for production)
- npm
- A GitHub account
- A Supabase project
- An OpenAI API key
- A Stripe account for payments
- A deployment provider such as Vercel

## 2. Install

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ArmatiMarketing.Com
npm install
cp .env.example .env.local
```

Fill `.env.local` with your real credentials.

## 3. Supabase

Create a Supabase project, then run:

```text
supabase/migrations/001_initial_schema.sql
supabase/seed.sql
```

in the Supabase SQL editor, or use the Supabase CLI migration workflow.

The SQL includes RLS policies. Do not disable RLS in production.

## 4. License keys

Generate an Ed25519 key pair locally:

```bash
npm run license:keys
```

This creates files under `license-keys/`, which is ignored by Git.

Copy the public key into `LICENSE_PUBLIC_KEY` in your deployment environment. Keep the private key offline and never commit it.

To sign a development license:

```bash
LICENSE_PRIVATE_KEY_PATH=license-keys/private.pem \
LICENSE_PRODUCT=armati-marketing \
LICENSE_CUSTOMER_ID=customer-demo \
LICENSE_EXPIRES_AT=2027-12-31T23:59:59Z \
npm run license:sign
```

The resulting token is an activation credential. In a commercial system, issue licenses from a protected operator service rather than from a developer workstation.

## 5. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## 6. Authentication

Supabase handles user authentication. Create an account through your Supabase Auth configuration, then add membership/workspace records as appropriate.

The server-side client uses cookie-based SSR sessions. Protected server code verifies the authenticated user before reading workspace data.

## 7. Stripe

Create a Stripe Price and set:

```text
STRIPE_PRICE_ID=price_...
```

The checkout route creates a server-side Stripe Checkout Session. The webhook route verifies Stripe's signature before changing subscription state.

Configure the Stripe webhook endpoint as:

```text
https://YOUR_DOMAIN.com/api/stripe/webhook
```

At minimum, test:

- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_failed

Do not grant paid entitlements from a client-side success page.

## 8. AI generation

The AI route uses the OpenAI Responses API and asks for structured JSON representing pages and sections. Generated content is treated as data and rendered by trusted React components; it is not executed as arbitrary HTML or JavaScript.

Set:

```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5
```

If your account uses a different currently available model, change `OPENAI_MODEL`.

## 9. GitHub

Create a private GitHub repository first if the project contains business-sensitive material.

```bash
git init
git add .
git commit -m "Initial ArmatiMarketing.Com starter"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Never commit `.env.local`, private license keys, Stripe secret keys, Supabase service-role keys, or OpenAI keys.

## 10. Production checklist

Before accepting real customers:

- Replace every placeholder environment value.
- Configure a production Supabase project.
- Confirm every RLS policy with cross-tenant tests.
- Configure email verification/password recovery.
- Configure Stripe live products and webhook endpoint.
- Add rate limiting/WAF.
- Add background job processing for long AI operations.
- Add monitoring/error reporting.
- Add backups and recovery testing.
- Implement domain publishing through the selected hosting provider.
- Implement custom-domain verification and SSL.
- Add audit-log retention policy.
- Add privacy policy, terms, refund policy and account deletion/export workflows.
- Run security review and dependency audit.
- Test subscription cancellation, failed payments and entitlement revocation.
- Keep the license private key offline or in a dedicated secret-management system.

## Architecture

```text
Browser
  |
  v
Next.js App Router
  |-- Marketing / Marketplace
  |-- Customer Dashboard
  |-- Admin Dashboard
  |-- Route Handlers
  |
  +--> Supabase Auth + PostgreSQL + RLS
  |
  +--> OpenAI API (server only)
  |
  +--> Stripe API + signed webhooks
  |
  +--> Publishing provider (production implementation)
```

## Important scope note

This repository is a production-oriented starter foundation, not a claim that external provider accounts, DNS, payments, domains, legal policies, monitoring, or deployment have already been configured. Those integrations must be connected and tested in your own accounts.
