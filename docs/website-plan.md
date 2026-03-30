# Vishwakarma Wood Art & CNC Work Website Plan

## Summary
- Build a static, responsive multi-page business website for `Vishwakarma Wood Art & CNC Work` using plain `HTML/CSS/JS`.
- Position the site as a service business first and a product showcase second.
- Optimize for phone and desktop with fast loading, clear CTAs, and no backend dependency in v1.
- Keep all repeatable business content centralized in one shared data file.

## Key Changes
- Site structure includes 5 pages: `Home`, `About`, `Services`, `Products`, `Contact`.
- Primary conversion path is `WhatsApp + Call`; there is no server-side contact form in v1.
- Content style is `bilingual-ready`: English-first structure with local-friendly CTA placement and copy zones.
- Existing logo asset is preserved and copied into the new asset structure.

## Folder Structure
```text
/
|-- index.html
|-- about.html
|-- services.html
|-- products.html
|-- contact.html
|-- assets/
|   |-- css/
|   |   |-- base.css
|   |   |-- layout.css
|   |   |-- components.css
|   |   `-- responsive.css
|   |-- js/
|   |   |-- site-data.js
|   |   |-- main.js
|   |   |-- navigation.js
|   |   `-- gallery.js
|   `-- img/
|       |-- brand/
|       |   `-- logo.png
|       |-- hero/
|       |   `-- woodgrain-wave.svg
|       |-- products/
|       |   `-- showcase-placeholder.svg
|       `-- sections/
|           `-- cnc-grid.svg
|-- docs/
|   `-- website-plan.md
`-- README.md
```

## Implemented Structure
- `Home`: hero, featured services, featured products, trust reasons, workflow, testimonials, FAQ, CTA.
- `About`: business framing, mission/story placeholder, trust highlights, service area, hours, process.
- `Services`: complete service cards, workflow reinforcement, inquiry CTA.
- `Products`: filterable category showcase with placeholder visuals and contact prompts.
- `Contact`: call/WhatsApp focus, contact cards, map placeholder, address, hours, service area, inquiry checklist.

## Shared Content Contract
- `assets/js/site-data.js` stores:
  - `brand`
  - `navigation`
  - `contact`
  - `socialLinks`
  - `highlights`
  - `process`
  - `services`
  - `productCategories`
  - `products`
  - `testimonials`
  - `faq`
- Shared sections render from that file so repetitive business edits happen in one place.

## Test Plan
- Verify each page opens correctly on mobile and desktop.
- Verify shared header, footer, and floating contact CTA appear on every page.
- Verify product filters show and hide cards without breaking layout.
- Verify images and decorative assets scale correctly.
- Verify placeholder content can be updated in `assets/js/site-data.js` without editing the page layouts.
- Verify there are no broken local asset references or obvious console-triggering script issues.

## Assumptions
- Tech stack remains plain `HTML/CSS/JS`.
- The current version uses business-safe placeholder content until final PDF/manual details are confirmed.
- Product cards currently use stylized placeholders instead of project photography.
- Phone number, WhatsApp, address, email, and map are demo placeholders and should be updated before deployment.
