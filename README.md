# NOVA — Case Study (Agency)

An e‑commerce product page prototype built by the agency to showcase product-detail UX, cart/checkout flows, and conversion patterns for retail clients.

Overview
- Role: Frontend prototyping and UX validation for product pages and checkout funnels.
- Goals: Demonstrate product gallery, variant selection, cart interactions, checkout flow and confirmation screen.
- Outcome: A clean, conversion-focused product experience with a persistent cart and modal/side-drawer cart UI.

Tech stack
- React + Vite
- Tailwind CSS
- lucide-react icons

How to run

```bash
npm install
npm run dev
```

App.jsx & architecture notes
- Views: the app uses a simple view state (`VIEWS.PRODUCT`, `VIEWS.CHECKOUT`, `VIEWS.CONFIRMATION`) to switch the page context.
- Cart: `cartItems` state is stored in-memory and shown via a cart sidebar. `addToCart` demonstrates optimistic UI patterns (showing a notification on success).
- Checkout: collects shipping and payment fields client-side only. `handlePlaceOrder` transitions to a confirmation view—no real payment gateway is wired.

Production considerations
- Integrate a server-side order API and secure payment gateway (Stripe, Braintree) before using for real orders.
- Persist cart state (localStorage or server-side sessions) and add validation for inventory and pricing.

Reuse & template guidance
- Extract `CartSidebar`, `CheckoutForm`, `ProductGallery` into separate components/packages for reuse across other e‑commerce case studies.

