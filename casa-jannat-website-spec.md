# Casa Jannat — Website Build Spec

> **Casa Jannat** · *A Little Piece of Paradise*
> "Jannat" (Hindi/Urdu, from Arabic) = **paradise**. "Casa Jannat" = *House of Paradise*.
>
> Reference site analyzed: **jacoluxe.com** (+ its booking subdomain `jacoluxe.hospitable.rentals`), inspected Oct 4, 2026.
> Goal: build a site with the same feature set **minus Property Management**, with a noticeably better look, faster performance, and a single unified booking experience.
> Domain: still to be chosen — must contain "jaco", no "luxury" (e.g., `casajannatjaco.com`, `jannatjaco.com`). Brand should scale if more homes are added later (e.g., *Jannat Stays* with Casa Jannat as the flagship).

---

## Part 0 — Brand & property profile

### 0.1 Brand
| Item | Value |
|---|---|
| House name | **Casa Jannat** |
| Slogan | **A Little Piece of Paradise** |
| Spanish slogan | *Un Pedacito de Paraíso* |
| Name meaning (use on About page) | "Jannat" means paradise; "Casa" is Spanish for house — a Hindi word meeting Costa Rica's Pura Vida |
| Logo direction | Wordmark "Casa Jannat" in the display serif + a small mark (palm leaf / arch / sun over water); slogan set beneath in small caps |
| Primary website headline | **Casa Jannat — A Little Piece of Paradise in Jacó** |
| Sub-headline | Private pool, four bedrooms, and the beach just minutes away. |

### 0.2 Property facts (from the Airbnb listing, Oct 2026)
Source: [Airbnb listing 1310243367711997885](https://www.airbnb.com/rooms/1310243367711997885)

| Field | Value |
|---|---|
| Type | Entire home, Jacó, Puntarenas, Costa Rica |
| Airbnb title | House private pool in Jacó · 4 bedrooms + parking |
| Rating | ★ 4.9 · 49 reviews (92% five-star) |
| Category scores | Cleanliness 4.9 · Accuracy 4.7 · Check-in 4.9 · Communication 5.0 · Location 4.8 · Value 4.7 |
| Guests | Airbnb header says **8**; the description says **max 6** → ⚠️ confirm the correct number before launch |
| Bedrooms / beds / baths | 4 bedrooms · 4 beds + 1 sofa bed · 3 bathrooms (2 inside, 1 by the pool), hot water |
| Sleeping | Bedroom 1: king · Bedroom 2: queen · Bedroom 3: queen · Bedroom 4 (new mezzanine): queen |
| A/C | Bedrooms 1–3 have their own A/C; the mezzanine is cooled by the living-room A/C |
| Outdoor | Private pool, BBQ area, pool-side bathroom |
| Extra space | Fully equipped guest house |
| Parking | 1 private space behind an electric gate |
| Check-in | Self check-in with lockbox |
| Amenities | 51 listed on Airbnb, incl. kitchen, Wi-Fi, dedicated workspace, free on-site parking, pool |
| Location selling points | Near the beach, restaurants and attractions; walkable (guests mention location, walkability, beach) |
| What guests praise most | Hospitality, location, cleanliness, the pool, walkability |
| Ideal for | Families and groups |

> Website copy must be rewritten in our own voice (not pasted from Airbnb) and should highlight: **private pool** (Airbnb notes it's one of the few in the area), **4 A/C bedrooms**, **guest house**, **gated parking**, **walk to beach & restaurants**, **4.9★ from 49 guests**.

### 0.3 Photos
These are the Airbnb listing photos (our own property). Download the full-resolution originals (the links below without `?im_w=…` give the original size) or, better, export them from the Airbnb host dashboard / original camera files.

| # | Use on site | Original URL |
|---|---|---|
| 1 | **Hero / cover** + Open Graph image | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/da31215a-7349-427c-bbdf-8df2ba228c0a.jpeg |
| 2 | Gallery mosaic | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/40742f96-c9a5-4a07-9977-4f074f8fa40e.jpeg |
| 3 | Bedroom 1 (king) + gallery | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/3cd439ef-29bb-4d7c-9219-9050e5c40678.jpeg |
| 4 | Gallery mosaic | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/529eeb07-67ba-4789-af85-470c16b68e29.jpeg |
| 5 | Gallery mosaic | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/c9460f6c-2423-4d60-b20a-4410e53e56f1.jpeg |
| 6 | Bedroom 2 (queen) | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/7ebb7452-c3cb-4daf-8fd7-01286ea16d3f.jpeg |
| 7 | Bedroom 3 (queen) | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/e826c6db-4e9b-4d6f-b90c-686349ecb51d.jpeg |
| 8 | Bedroom 4 (queen, mezzanine) | https://a0.muscache.com/im/pictures/hosting/Hosting-1310243367711997885/original/380dbc0b-7490-4ad3-bb44-6029d1b2ac3d.jpeg |

**Photo checklist**
- [ ] Download all listing photos (Airbnb shows only 8 publicly here; grab the rest from the host dashboard → *Photo tour*)
- [ ] Save to `/public/images/casa-jannat/` named by room: `hero-pool.jpg`, `bedroom-1-king.jpg`, `bedroom-2-queen.jpg`, `bedroom-3-queen.jpg`, `bedroom-4-mezzanine.jpg`, `living.jpg`, `kitchen.jpg`, `guest-house.jpg`, `bbq.jpg`, `parking-gate.jpg`, `bath-pool.jpg`…
- [ ] Do **not** hot-link Airbnb URLs on the live site — host the files ourselves (they can change or break)
- [ ] Export to WebP/AVIF at 640 / 1280 / 1920 px widths; write alt text per photo
- [ ] Book a professional shoot later: golden-hour pool, twilight with lights on, drone of the neighborhood and beach, a short hero video
- [ ] Photo gaps to fill: guest house, BBQ area, pool bathroom, gated parking, the beach walk

---

## Part 1 — Audit of the reference site

### 1.1 Tech stack observed
| Area | What they use |
|---|---|
| Main site | **Shopify** (generic purchased theme; services & tours sold as Shopify "products") |
| Villa booking | **Hospitable Direct** booking site on a separate subdomain (`*.hospitable.rentals`) |
| Payments | Shopify checkout — Amex, Apple Pay, Diners, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa |
| Messaging | WhatsApp click-to-chat links (`wa.me` with pre-filled message), toll-free phone (1-888-…-LUXE vanity number), email |
| Accounts | Shopify customer login / register |
| Social | Facebook, Instagram |

### 1.2 Global features (every page)
- Top utility bar: toll-free phone + email + social icons
- Sticky header with logo, mega-menu navigation, site search (overlay), cart icon with count
- Mobile slide-out menu with Login / Register
- Slide-in **mini cart** drawer (qty +/-, subtotal, "agree to terms" checkbox, View Cart)
- Footer: address (Jacó, Puntarenas), phone, email, Quick Links (About, Privacy, FAQ, Book Now), Services list, payment-method icons, copyright
- "Inquire Now" form block repeated on service/info pages
- Breadcrumbs on inner pages

### 1.3 Navigation / sitemap
- **Home**
- **Services** → VIP Concierge, Shuttle Transfer, Chef Service, Pool Party, DJ Service, Bartender Service, Personal Concierge
- **Vacation Rentals** → Jacó Beach (links out to booking subdomain)
- **Adventure Tours** (18) → Deep Sea Fishing, Party Yacht, ATV Tours, Ziplining, Waterfall Rappelling, White Water Rafting, Manuel Antonio NP, Tortuga Island, Surf Lessons, Horseback Riding, Extreme Canyoneering, Waterfall Tours, Crocodile River Safari, Monkey Mangrove Tour, Paragliding & Sky Tours, Chocolate Tour, Doka Coffee Tour, Poás Volcano NP
- **Book Now!** (→ booking subdomain)
- **Most Popular Services**
- **Golf Cart Rentals** (product with color variants, ~$70)
- ~~Property Management~~ *(excluded from our build)*
- **Contact Us**
- Footer-only: About Us, Privacy Policy, FAQ

### 1.4 Home page sections (top → bottom)
1. Hero slider — 2 slides ("Unlock Your Dream Adventure", "Amplify Your Jacó Experience") each with Book Now CTA
2. Intro: "Pura Vida" story about Jacó + Book Your Dream Vacation CTA
3. Feature block: Bachelor & Bachelorette parties (image + copy + Learn More)
4. Feature block: Sport fishing (30+ boats, Los Sueños Marina)
5. Services icon grid — Bachelor, Bachelorette, Adventure Tours, Fishing Charters, Weddings, Family Vacations + View All
6. "VIP Services" checklist (14 items: family reunions, stag parties, hangover IV, party boats, corporate retreats, massage, transport, chefs/bartenders, custom planning…) + Book Now
7. Rentals teaser ("mansions, condos, beach houses")
8. Photo gallery (10 images, lightbox)
9. Footer

### 1.5 Service / tour detail page (Shopify product template)
- Image with zoom
- Title, price, **variant dropdown** (e.g., Chef: Breakfast/Lunch/Dinner × group size 1–4 / 5–7 / 8–10, Full day)
- Add to cart
- Tabs: Product Details / Reviews
- Long description: "starting at" price, pricing table by meal & group size, notes ("excludes groceries & tips"), benefit sections
- "Explore our other services" cards (3) with Read More
- Inquire Now form
- Related Products carousel (Quick Shop / Quick View)
- Recently Viewed products

### 1.6 Tour info page (e.g., Deep Sea Fishing)
- Intro copy, target species
- What's Included list · Trip Options (half day / full day / private luxury) · Why Choose Us · Location
- Scarcity note ("limited availability")
- Book Now button + **Book on WhatsApp** button (pre-filled text)

### 1.7 Villa booking site (Hospitable)
- **Listing grid**: card with photo, name, location, guests / bedrooms / bathrooms (4 villas + a 2-villa combo listing)
- **Property page**:
  - Large gallery (~47 photos, "View more")
  - Title, location, stats (guests, bedrooms, baths)
  - "Check availability" anchor → date picker / instant booking widget
  - "Good to know" description (bedrooms, living, kitchen, outdoor oasis)
  - House rules (numbered; e.g., $300 broken-glass-in-pool fee, quiet after 11 pm)
  - Other details: security cameras disclosure, Wi-Fi speed, supplied essentials
  - **Upsell list** inside description (airport/party-bus transfer, chef, bartender, DJ, maid, grocery delivery, tours)
  - Amenities by category (Common, Bathroom, Bedroom & Laundry, Entertainment, Heating/Cooling, Home Safety, Kitchen, Location, Outdoors, Parking) + "See all"
  - Guest access / self check-in
  - "Find us" map (approximate location; exact address after booking)

### 1.8 FAQ content themes
About the company · How to book (web/phone/email) · Booking process & confirmation itinerary · Discounts (early-booking, group, seasonal) · Tour types · Family suitability · Cancellation/modification · Contact options

### 1.9 Problems to fix (our competitive edge)
| # | Issue on reference site | Our fix |
|---|---|---|
| 1 | Brand is split across two domains/designs (Shopify + Hospitable subdomain) | One domain, one design; booking embedded natively |
| 2 | Visible theme errors ("Liquid error … divided by 0"), $0.00 prices, leftover theme text in carousels | Clean custom build, QA checklist |
| 3 | Inconsistent pricing (pricing table ≠ variant prices on Chef page) | Single source of truth for prices in CMS |
| 4 | Many "Learn More" buttons link to `#`; fishing "Book Now" links to golf-cart page; Property Management link goes to golf-cart agreement | Every CTA wired and tested |
| 5 | Leftover theme SEO meta ("Fashion theme, Electronics"), copy says "worldwide" | Custom meta, local-SEO focus |
| 6 | Experiences sold through an e-commerce cart with "shipping" wording | Purpose-built "Trip Builder" with date, time, group size |
| 7 | Low-res thumbnails, generic stock-ish visuals | Full-bleed high-res photography + video |
| 8 | Zoom disabled on mobile (`user-scalable=no`) | Accessible (WCAG 2.2 AA) |
| 9 | No visible reviews/social proof, no map shown | Reviews pulled from Airbnb/Google, map with neighborhood guide |
| 10 | Copyright year stale (2024), no blog / local guide content | Auto year; content hub for SEO |

---

## Part 2 — New site: feature list (no property management)

### 2.1 Core
- [ ] **Villa listings** (start with 1 home, scales to many) — grid + map view, filters (dates, guests, bedrooms, pool, walk-to-beach, party-friendly)
- [ ] **Direct booking engine** embedded on own domain: live availability calendar, instant book or request-to-book, full price breakdown (nightly, cleaning, taxes, security deposit), promo codes, secure payment, synced with Airbnb/VRBO calendars
- [ ] **Experiences catalog**: services (chef, bartender, DJ, pool party, transfers, concierge, massage, hangover IV, golf cart) and tours (fishing, yacht, ATV, zipline, rafting, national parks, etc.)
- [ ] **Trip Builder / cart**: add villa + experiences in one checkout; each item stores date, time, group size, notes; deposit or full payment
- [ ] **Occasion landing pages**: Bachelor, Bachelorette, Weddings, Family Reunions, Corporate Retreats, Fishing Trips, Guys' Trips
- [ ] **Packages** (bundled bestsellers): e.g., "Bachelor Weekend" = villa + airport party bus + chef dinner + yacht + DJ pool party, with package pricing
- [ ] **Inquiry / custom quote form** (multi-step) + WhatsApp, phone, email, live chat
- [ ] **Guest account** (optional): view bookings, itinerary, pay balance, guest guidebook

### 2.2 Trust & conversion
- [ ] Reviews/testimonials (imported from Airbnb, Google) + rating badges
- [ ] Photo & video gallery with lightbox; drone/hero video
- [ ] "Why book direct" block (best price, no platform fees, free concierge)
- [ ] Sticky mobile "Check availability" bar + floating WhatsApp button
- [ ] Clear policies: cancellation, house rules, deposits, age/party rules
- [ ] Instagram feed
- [ ] Email capture with incentive (e.g., free airport transfer on direct booking)

### 2.3 Content & SEO
- [ ] Local guide / blog: "Things to do in Jacó", "Best bachelor party in Costa Rica", "Getting from SJO to Jacó", seasonal fishing calendar
- [ ] FAQ (accordion, FAQ schema)
- [ ] Structured data: `LodgingBusiness`, `VacationRental`, `Product`/`Offer` for experiences, `FAQPage`, `Review`
- [ ] Bilingual EN / ES; currency display USD (optionally CRC/CAD/EUR)
- [ ] Sitemap.xml, clean URLs, Open Graph images per page

### 2.4 Admin (owner side, lightweight — not a property-management suite)
- [ ] CMS to edit pages, prices, photos, packages, FAQs, blog
- [ ] Booking & experience order notifications (email + WhatsApp)
- [ ] Simple orders dashboard (experience bookings, deposits paid, balances)
- [ ] Analytics: GA4 + Meta Pixel, conversion tracking for booking & inquiry

---

## Part 3 — Sitemap (new site)

```
/                         Home
/stays                    All villas (grid + map)
/stays/casa-jannat        Casa Jannat detail + booking widget (/stays/[slug] for future homes)
/experiences              All services & tours (filterable)
/experiences/[slug]       Experience detail
/packages                 Bundles
/packages/[slug]
/occasions/bachelor       Occasion landing pages
/occasions/bachelorette
/occasions/weddings
/occasions/family
/occasions/corporate
/occasions/fishing
/trip                     Trip Builder / cart → checkout
/plan-my-trip             Multi-step custom inquiry
/guide                    Blog / local guide
/guide/[slug]
/about
/faq
/contact
/policies/(cancellation|privacy|terms|house-rules)
/account                  (optional) My bookings
/es/...                   Spanish mirror
```

---

## Part 4 — Page specs

### 4.1 Home
1. **Full-screen hero** (photo #1 now; video after the pro shoot) with headline **"Casa Jannat — A Little Piece of Paradise in Jacó"**, sub-headline, and an overlaid **search bar**: dates · guests · occasion → "Check availability"
2. **Trust strip**: ★ 4.9 from 49 guests · Private pool · Self check-in · "Book direct & save"
3. **Meet Casa Jannat** — large editorial block: photo mosaic, the name story ("Jannat means paradise"), key highlights (private pool, 4 A/C bedrooms, guest house, gated parking, walk to the beach), price-from, "See the house" CTA. When more homes are added this becomes a featured-villas grid.
4. **"Plan your occasion"** — 6 image tiles (Bachelor, Bachelorette, Weddings, Family, Corporate, Fishing)
5. **Signature experiences** — horizontal scroll of 8 top experiences with price-from and "Add to trip"
6. **Packages** — 3 bundle cards with savings badge
7. **How it works** — 3 steps: Pick your villa → Add experiences → Arrive, we handle the rest
8. **Reviews carousel**
9. **Jacó at a glance** — map + distances (SJO airport ~1.5 h, beach, Los Sueños Marina, nightlife strip, Manuel Antonio)
10. **Instagram grid**
11. **Final CTA band** + newsletter
12. Footer

### 4.2 Villa detail (Casa Jannat)
- Page title: **Casa Jannat · A Little Piece of Paradise** — Entire home in Jacó · 4 bedrooms · 3 baths · private pool
- Gallery: mosaic (photo #1 large + #2, #4, #5, #3 small) → full-screen swipeable lightbox grouped by room (Pool & outdoors, Living & kitchen, Bedrooms, Guest house)
- Title, location, stats chips (guests, bedrooms, beds, baths), highlight icons
- **Sticky booking card** (desktop right rail / mobile bottom bar): date range picker with blocked dates, guests, live price breakdown, promo code, "Reserve"
- Description (short + "read more")
- Sleeping arrangements (card per bedroom with photo, bed type & A/C): Bedroom 1 king (photo #3) · Bedroom 2 queen (#6) · Bedroom 3 queen (#7) · Bedroom 4 mezzanine queen, cooled by living-room A/C (#8) · plus 1 sofa bed
- Amenities grouped by category + "Show all" modal
- House rules, check-in/out times, deposit, cancellation policy
- **"Make it unforgettable" upsells** — chef, bartender, DJ, transfer, grocery pre-stock — add straight to trip
- Map (approximate area) + nearby points of interest with walk/drive times
- Reviews: 4.9★ / 49 with the category breakdown from Part 0.2 + a carousel of guest quotes (pull with permission or via the PMS review import)
- "Also on Airbnb" badge linking to the listing (social proof) — but booking CTA always stays direct
- Similar villas (when >1 property)

### 4.3 Experience detail
- Hero image/video, title, rating, duration, group size, pickup info, price-from
- **Option selector**: type (e.g., breakfast/lunch/dinner, half/full day, private), group size tier, date, time slot
- Live price → "Add to trip" / "Book now" / "Ask on WhatsApp"
- What's included / not included / what to bring
- Itinerary timeline (for tours)
- Pricing table (generated from the same price data — never hand-typed)
- Policies: cancellation, age/fitness requirements, weather
- FAQs for that experience
- Related experiences + "Pairs well with" (e.g., Yacht + DJ)

### 4.4 Occasion landing page (e.g., Bachelor)
- Hero with occasion-specific video and headline
- Ready-made itinerary (Day 1–4) built from experiences, each item clickable
- Recommended villa(s) and package with "Book this package"
- Testimonials from that occasion type
- Custom quote CTA

### 4.5 Trip Builder / Checkout
- Line items: villa (dates), experiences (date/time/group), package discounts
- Conflict warnings (experience outside stay dates)
- Payment: deposit (e.g., 30%) or pay in full; balance auto-charged X days before arrival
- Guest details, arrival flight number (for transfers), special requests
- Terms + house rules acknowledgement
- Confirmation page + email with full itinerary (PDF/ICS)

### 4.6 Plan My Trip (inquiry)
Multi-step form: Occasion → Dates (or flexible) → Group size → Budget range → Interests (checkboxes of experiences) → Contact (name, email, WhatsApp) → Thank-you page with WhatsApp shortcut.

---

## Part 5 — Design system ("better look")

**Direction:** modern tropical-editorial — calm, premium, photography-led; less "party flyer," more boutique hotel. Party energy comes through video and imagery, not loud UI. The "paradise" theme can show up in soft arch shapes (framing photos), warm sunset accents, and the slogan used as a quiet signature on section breaks and the footer.

| Token | Value |
|---|---|
| Primary (Deep Ocean) | `#0E3B43` |
| Accent (Sunset Coral) | `#E8735A` |
| Secondary (Jungle) | `#2F5D50` |
| Sand (background) | `#F6F1EA` |
| Ink (text) | `#1B1B1B` |
| Muted | `#6B6B6B` |
| Gold detail (sparingly) | `#C9A46A` |

- **Typography:** Display — *Fraunces* or *Cormorant Garamond* (serif, elegant); Body/UI — *Inter* or *Manrope*. Generous sizes: H1 56–72px desktop / 36–40px mobile.
- **Layout:** 12-col grid, max width 1280px, lots of whitespace, full-bleed image sections alternating with sand-colored panels.
- **Components:** rounded-2xl cards, soft shadows, pill chips for stats, glassmorphism search bar on hero, subtle scroll-reveal animations (Framer Motion), hover zoom on images.
- **Imagery:** professional photo shoot (golden hour + night lighting with pool LEDs), drone video, lifestyle shots of groups; WebP/AVIF, responsive sizes.
- **Iconography:** single line-icon set (Lucide/Phosphor).
- **Dark sections** for nightlife/party content to shift mood.
- **Accessibility:** contrast AA, zoom allowed, keyboard nav, alt text, focus states.

---

## Part 6 — Recommended tech stack

### Option A — Custom (best look & control)
| Layer | Choice |
|---|---|
| Frontend | **Next.js** (App Router) + **Tailwind CSS** + Framer Motion |
| CMS | **Sanity** or **Payload** (villas, experiences, packages, FAQs, blog, translations) |
| Villa availability & booking | Channel manager / PMS **API** — Hospitable, Guesty, OwnerRez, Hostaway or Lodgify (keeps Airbnb/VRBO calendars synced; avoids double bookings) |
| Experience payments | **Stripe** (Payment Intents, deposits, saved card for balance, Apple/Google Pay) |
| Database (orders) | Postgres (Supabase/Neon) |
| Email | Resend / Postmark (transactional), Mailchimp/Klaviyo (marketing) |
| Messaging | WhatsApp Business (click-to-chat + optional Cloud API notifications) |
| Maps | Mapbox or Google Maps |
| Reviews | Import from PMS/Airbnb; Google Places reviews |
| Hosting | Vercel + Cloudflare DNS |
| i18n | next-intl (EN/ES) |
| Analytics | GA4, Meta Pixel, Microsoft Clarity |

### Option B — Faster / low-code
Webflow or Framer for the marketing site + the PMS's embeddable booking widget on your domain + Stripe Payment Links or a booking tool (e.g., FareHarbor/Rezdy/Peek) for tours and services.

---

## Part 7 — Data models (CMS)

```ts
Villa {
  slug, name, tagline, location{area, lat, lng (approx)},
  maxGuests, bedrooms, beds, bathrooms,
  bedroomsDetail[{name, beds[], ac:boolean, ensuite:boolean}],
  highlights[], description, amenities[{category, items[]}],
  houseRules[], checkIn, checkOut, securityDeposit, cancellationPolicy,
  gallery[{image, room}], heroVideo?, pmsListingId, priceFrom,
  nearby[{name, minutes, mode}], seo{}
}

Experience {
  slug, title, type: "service" | "tour", category,
  summary, description, duration, pickupIncluded:boolean,
  options[{label, groupMin, groupMax, price}],   // single source of truth for prices
  timeSlots[], includes[], excludes[], whatToBring[],
  itinerary[{time, step}], policies, faqs[], gallery[],
  pairsWith[ref Experience], seo{}
}

Package {
  slug, title, occasion, items[{ref, qty, day}], villaOptions[ref Villa],
  priceFrom, savingsLabel, itineraryDays[], seo{}
}

Occasion { slug, title, heroMedia, intro, sampleItinerary, packages[], testimonials[] }

Order {
  id, guest{name,email,phone,whatsapp}, villaBooking{pmsReservationId,dates,guests},
  lines[{experienceId, optionLabel, date, time, groupSize, price, notes}],
  subtotal, discount, total, depositPaid, balanceDue, balanceDueDate, status
}

Review { source, author, rating, text, date, villa?/experience? }

// Seed record
Villa "casa-jannat" {
  name: "Casa Jannat", tagline: "A Little Piece of Paradise",
  location: { area: "Jacó, Puntarenas, Costa Rica" },
  maxGuests: 8 /* ⚠️ confirm: listing also says max 6 */,
  bedrooms: 4, beds: 4, sofaBeds: 1, bathrooms: 3,
  bedroomsDetail: [
    { name: "Bedroom 1", beds: ["king"],  ac: true },
    { name: "Bedroom 2", beds: ["queen"], ac: true },
    { name: "Bedroom 3", beds: ["queen"], ac: true },
    { name: "Bedroom 4 (mezzanine)", beds: ["queen"], ac: false /* cooled by living-room A/C */ }
  ],
  highlights: ["Private pool", "BBQ area", "Pool-side bathroom", "Guest house",
               "Gated parking (1 car)", "Self check-in", "Walk to beach & restaurants"],
  airbnbListingId: "1310243367711997885",
  rating: { score: 4.9, count: 49 }
}
FAQ { question, answer, category }
Post { slug, title, cover, body, tags, seo }
```

---

## Part 8 — Content to carry over (as starting catalog)

**Services:** VIP Concierge, Personal Concierge, Airport/Shuttle Transfers (incl. party bus/limo), Private Chef (breakfast/lunch/dinner tiers by group size, full day), Bartender, DJ, Pool Party, Maid service, Grocery pre-stock, Massage therapists, Hangover IV, Golf Cart Rental.

**Tours:** Deep Sea Fishing (half/full/private), Party Yacht, ATV, Ziplining, Waterfall Rappelling, White Water Rafting, Manuel Antonio NP, Carara NP, Tortuga Island, Surf Lessons, Horseback Riding, Canyoneering, Waterfall Tours, Crocodile River Safari, Monkey Mangrove, Paragliding, Chocolate Tour, Coffee Tour, Poás Volcano.

**Occasions:** Bachelor, Bachelorette, Guys' Trips, Weddings, Family Vacations & Reunions, Corporate Retreats, Fishing Trips.

> Write all copy fresh in your own words — don't reuse the reference site's text or photos.

---

## Part 9 — Build phases

| Phase | Scope | Est. |
|---|---|---|
| 0. Brand | ✅ Name (Casa Jannat) & slogan (A Little Piece of Paradise) · domain, logo, photo download + pro shoot, copy | 1–2 wks |
| 1. MVP | Home, villa page with live booking (PMS), experiences catalog with inquiry/WhatsApp booking, About, FAQ, Contact, policies, SEO basics | 3–4 wks |
| 2. Commerce | Trip Builder cart + Stripe deposits, packages, occasion pages, reviews | 3–4 wks |
| 3. Growth | Blog/guide, Spanish version, email automations, guest account & digital guidebook | 2–4 wks |

### Launch checklist
- [ ] Every CTA/link tested (no `#` links)
- [ ] Prices in one place (CMS) and rendered everywhere
- [ ] Calendar sync verified with Airbnb/VRBO (no double booking)
- [ ] Lighthouse ≥ 90 (performance, accessibility, SEO) on mobile
- [ ] Schema validated, sitemap submitted to Google Search Console
- [ ] Google Business Profile linked to site
- [ ] Legal: privacy, terms, cancellation, cookie notice; CR tourism tax/IVA shown correctly
- [ ] Test bookings end-to-end (villa only, experience only, villa + package)
- [ ] Max-guest count matches on website, Airbnb and PMS
- [ ] All photos self-hosted (no Airbnb hot-links)
