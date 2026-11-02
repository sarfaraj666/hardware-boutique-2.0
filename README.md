# Hardware Boutique 2.0 — Italian-inspired four-page website

A custom, lightweight HTML/CSS/JavaScript frontend concept for Hardware Boutique 2.0. **The Home page has been replaced by Kitchen.**

## Four content pages

- `kitchen.html` — Kitchen collection, editorial gallery, design details **and contact/enquiry section**
- `about.html` — About Us
- `wardrobe.html` — Wardrobe collection
- `vanity.html` — Vanity collection

`index.html` is a **redirect only**, so visiting the site root (`/`) opens `kitchen.html` automatically. There is no separate Home content page or Home menu item.

## Preview

Open `index.html` or `kitchen.html` in a modern browser, or use **Live Server** in VS Code.

**Internet connection is required** for external Unsplash demo photography and Google Fonts. No build tools or npm installation required.

## Before publishing

1. Replace demo photographs with the actual client-approved Kitchen, Wardrobe and Vanity photographs. Sample images illustrate style only and must **not** be described as Hardware Boutique 2.0 installations or products.
2. Enter verified business contact information in `assets/config.js` (`whatsappNumber` in international digits only, and optional `businessEmail`). If neither is configured, enquiries can be copied for Instagram DM.
3. Replace the placeholder business story on About Us with verified copy.
4. Check images, captions, privacy, copyright/license permissions and business details before commercial launch. See `PHOTO-CREDITS.md`.
5. Test that all inquiry links and form methods open the configured service and require the visitor to press Send. **There is no submission backend.**

## Customization

- Design/colors: `css/style.css`.
- Page copy and demo photography: `.html` files.
- Functional navigation, mobile menu, image lightbox and enquiry preparation: `js/main.js`.
- Contact details: `assets/config.js`.

## Deploy

Upload **all files and folders** to GitHub Pages, Netlify, or a similar static host. GitHub Pages will serve `index.html`, redirecting visitors to the Kitchen page.

This is a sample website frontend, not a verified depiction of the Instagram account or its inventory. Confirm actual products, photos, logo and contact details with the business.


## October 31 UI polish update
- Kitchen, Wardrobe, Vanity and About Us have viewport-height hero covers (no blank cream strip in the first screen).
- Fixed Kitchen page navigation so only Kitchen is active (desktop and mobile).
- Desktop navigation is centered using three-column layout; mobile navigation remains responsive.
- Added subtle scroll progress indicator, gallery fade-ins, hero entrance motion and page-to-page wipe transitions.
- Motion effects honor `prefers-reduced-motion`.
- UI refinements are in `css/refinements.css`, JavaScript enhancements in `js/main.js`.
- Instagram photos/contact details are not automatically imported. Replace sample photos and update `assets/config.js` before publishing.
