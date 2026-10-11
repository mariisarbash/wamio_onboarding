# Wamio — Web App UI/UX Design Prototype

An interactive frontend prototype of my interface design for **Wamio**'s web application. It explores how property managers would set up properties, follow incoming leads and configure an AI assistant, across six connected sections.

> **This is a design prototype, not the production product.** It runs locally with mock data and has no backend. The official startup website, [wamio.it](https://wamio.it), is linked for context only: it is not a live demo of this prototype, and not every screen here has been built or deployed there.

## About Wamio

Wamio is an early-stage startup building an AI-powered assistant for rental property managers. The intended product handles first-contact WhatsApp enquiries (availability, price, house rules, visits), qualifies leads and hands over to the manager when needed.

To do this well, the assistant needs structured information about each property and clear rules on how to behave. The web application is where managers provide that information and review the results. This prototype is my exploration of that interface.

## Prototype sections

| Section | Route | What it shows |
|---|---|---|
| Login | `/login` | Sign-in screen with a demo account |
| Dashboard | `/dashboard` | Overview of properties, active assistants, qualified leads and visit requests |
| Property details | `/properties/[id]` | Property data, assistant status and settings, related leads |
| Leads | `/leads` | Lead list with status filters and expandable lead summaries |
| Profile | `/profile` | Manager details, contact preferences and escalation contact |
| Property onboarding | `/properties/new` | Eight-step wizard (below) |

### Property onboarding flow

One of the main user journeys: collecting everything the assistant needs to answer enquiries about a property.

1. **Listing type**: whole apartment, single room or multiple rooms; long-term, short-term or both
2. **Property details**: name, address, Milan zone, floor, lift, size, rooms, bathrooms, maximum guests
3. **Price and costs**: rent or nightly price, deposit, negotiability, included costs
4. **Furnishing and amenities**
5. **House rules**: smoking, pets, legal residence, minimum stay
6. **Who can rent**: tenant types, in-person or video visits, preferred visit days
7. **Photos**: number of photos available, optional link to an existing listing
8. **Assistant settings**: communication tone, photo sharing on WhatsApp, how price may be discussed, escalation contact

## What works and what is mocked

**Works locally**
- Demo sign-in, a session that persists across reloads, redirect to login when signed out, and logout
- Navigation between all sections; dashboard cards open the matching property
- Lead filtering by status and expanding each lead's summary
- Profile edits, saved in the browser's `localStorage`
- Onboarding wizard: required-field validation, progress bar, back navigation, and fields that adapt to earlier answers (price label, visit days)
- Light and dark themes that follow the system setting

**Mocked, incomplete or not connected**
- Authentication is a hard-coded check in client code, not a real account system
- All properties, leads and owner details are fictional records in `lib/data.ts`
- Completing the wizard returns to the dashboard without saving the property
- The photo upload and *Activate assistant* buttons are placeholders
- No AI assistant, WhatsApp integration, backend, database or automated tests
- The interface text is in Italian

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui components (Base UI) · lucide-react icons

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in with the demo account:

- Email: `demo@wamio.it`
- Password: `demo1234`

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## My contribution

I am a Co-Founder of Wamio and lead the company's brand identity and product interface design. I designed the original Wamio logo, defined the visual direction and UX of the web application, and built this interactive frontend prototype using AI-assisted development tools. The prototype explores the intended interface across property management, leads and onboarding, while the production platform is being developed separately by the team.

In this repository specifically, I was responsible for:
- Screen layouts, visual hierarchy and interaction patterns across all six sections
- The user journeys, including the structure and content of the eight-step onboarding flow
- The visual system: colour palette, typography, cards and light/dark themes
- Turning these design decisions into a working interactive prototype

I did not build the official website, the AI backend or the WhatsApp infrastructure. Those are developed separately by the wider team and are not part of this repository.
