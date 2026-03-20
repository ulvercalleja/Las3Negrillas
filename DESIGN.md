# Design System Strategy: The Tactile Archive

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Heritage Manuscript."** 

Unlike modern travel platforms that prioritize high-gloss efficiency, this design system treats the digital screen as a physical, curated tactile experience. We are moving away from the "app-like" feel toward a high-end editorial layout that mirrors the experience of leafing through a bespoke countryside journal. 

To break the "template" look, we employ **intentional asymmetry**. Images should rarely be perfectly centered; instead, they should bleed off the edges or overlap with floating text containers. We lean into the "Slow Living" philosophy by using expansive white space—not as "empty" space, but as "breathing" space—allowing the organic textures of wood and stone to define the rhythm of the page.

---

## 2. Colors: Tonal Earth & Warm Light
The palette is derived from the raw materials of a *Casa Rural*: the baked earth of terracotta, the moss of the garden, and the deep shadows of ancient timber.

### The "No-Line" Rule
**Traditional 1px borders are strictly prohibited.** To define sections, use background color shifts. A section using `surface-container-low` (#fbf2ed) should transition into a `surface` (#fff8f5) section without a stroke. This creates a soft, organic flow that mimics the transition from one room to another in a house.

### Surface Hierarchy & Nesting
Treat the UI as a series of layered natural materials.
*   **Base:** `surface` (#fff8f5) represents the lime-washed walls.
*   **Containers:** Use `surface-container` tiers to create depth. A card using `surface-container-lowest` (#ffffff) sitting on a `surface-container-low` (#fbf2ed) background provides a subtle "lift" that feels like a piece of fine paper resting on a wooden table.

### The "Glass & Gradient" Rule
For floating elements like navigation bars or detail overlays, use **Glassmorphism**. Apply a `surface` color at 80% opacity with a `backdrop-blur` of 12px. This mimics the soft, diffused light coming through a frosted window. Use subtle gradients for CTAs, transitioning from `primary` (#703d23) to `primary-container` (#8c5438) to give buttons a "fired clay" dimensionality.

---

## 3. Typography: The Editorial Voice
Our typography pairing balances the tradition of the hearth with the clarity of modern hospitality.

*   **Display & Headlines (Newsreader):** This serif choice brings an authoritative, handcrafted feel. Use `display-lg` (3.5rem) for hero titles to establish an immediate sense of "place." The variable weights of Newsreader should be used to emphasize specific words, creating a poetic, rhythmic reading experience.
*   **Body & Labels (Manrope):** We use Manrope for its humanist qualities. It remains highly legible even at small scales (`body-sm`, 0.75rem) while maintaining a warmth that avoids the clinical "tech" feel of more geometric sans-serifs.
*   **Hierarchy as Identity:** Wide letter spacing (0.05em) should be applied to `label-md` and `label-sm` tokens to create a "premium boutique" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
In a rustic environment, shadows are soft and ambient, never harsh or black.

*   **The Layering Principle:** Avoid shadows for 90% of components. Instead, use the `surface-container` hierarchy. A `surface-container-highest` element against a `surface` background provides all the hierarchy required without digital clutter.
*   **Ambient Shadows:** Where floating is necessary (e.g., a "Book Now" floating action), use a shadow with a blur of 30px–40px at 6% opacity. Use a tinted shadow color: `rgba(31, 27, 24, 0.06)` (a tint of our `on-surface` color).
*   **The Ghost Border:** If a form field or container needs a boundary for accessibility, use `outline-variant` (#d7c2ba) at 15% opacity. It should feel like a light pencil mark on paper, not a digital box.

---

## 5. Components: The Handcrafted UI

### Buttons
*   **Primary:** Large rounded corners (`rounded-lg`, 1rem), `primary` background, `on-primary` text. No harsh borders.
*   **Secondary:** `surface-container-highest` background. It should feel "pressed" into the page rather than floating on it.
*   **Tertiary:** Text-only with an `outline-variant` underline that appears on hover, mimicking a handwritten note.

### Cards & Lists
**Divider lines are forbidden.** 
*   **Cards:** Use `surface-container-low` with `rounded-xl` corners. Separate cards using the `12` (4rem) spacing scale to allow the background textures to breathe.
*   **Lists:** Separate items using vertical white space (`spacing-4` or `spacing-6`). For amenities (e.g., "Fireplace," "Stone Walls"), use selection chips with `secondary-container` backgrounds.

### Input Fields
Avoid the "boxed" look. Use a `surface-container-highest` background with a `rounded-sm` corner. Labels should always use `label-md` in `on-surface-variant` for a soft, sophisticated prompt.

### Signature Component: The "Heritage Gallery"
A custom component for this system: an asymmetrical masonry grid for photos of the house, where images use different `roundedness` values (e.g., one image with `rounded-xl`, another with `rounded-none`) to mimic a physical scrapbook.

---

## 6. Do's and Don'ts

### Do:
*   **Use High Spacing:** Lean on the `16` (5.5rem) and `20` (7rem) spacing tokens between major sections to emphasize the "slow-living" vibe.
*   **Overlap Elements:** Let a text container in `surface-container-lowest` overlap a `primary-container` image by `spacing-10` to create editorial depth.
*   **Use Texture:** Use subtle grain overlays or stone texture images as backgrounds for `surface-dim` sections.

### Don't:
*   **Don't use pure black:** Never use #000000. Use `on-surface` (#1f1b18) for all high-contrast text.
*   **Don't use hard corners:** Avoid `none` or `sm` roundedness for large containers; it feels too aggressive for a cozy rural setting.
*   **Don't use bright "web" colors:** Even for errors, use the muted `error` token (#ba1a1a) which feels like dried madder root rather than a digital alert.