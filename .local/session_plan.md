# Objective
Redesign the blog post page to match the clean editorial style from both reference images (competitor arborist blogs). The references show: background image hero with centered title + date, breadcrumbs below, then clean text on white with green headings, checkmark-style lists, a simple FAQ accordion near the bottom, and a contact form at the end. No cards wrapping content, no visual clutter. Also improve the seed blog posts to be more substantial and better structured.

# Tasks

### T001: Redesign blog post page layout & typography
- **Blocked By**: []
- **Details**:
  - Completely restyle `client/src/pages/blog-post.tsx` to match the reference images:
  - **Hero section**:
    - Background image with dark gradient overlay (map category slugs to existing service/gallery images — e.g. tree-trimming → service-tree-trimming.webp, tree-removal → service-tree-removal.webp, etc.)
    - Title centered in white, large and bold
    - Date centered below title in smaller white text
    - No badges, no tags, no excerpt in the hero — just title + date on the image
  - **Breadcrumbs**: Small text below the hero on white background, styled like reference (Home > Category Blog > Post Title, with green links)
  - **Article body**:
    - Plain white background — NO card wrapper, NO border, NO shadow, NO rounded container
    - Content centered at max-width ~750px (standard readable article width)
    - Body text: 16-17px, dark gray, line-height ~1.8-1.9
    - H2 headings: Bold, green (brand-green), ~24px, with good margin above
    - H3 headings: Bold, green, slightly smaller
    - Lists: Clean bullets with proper spacing, same gray text
    - Bold text in dark charcoal for emphasis
    - Overall feel: clean, minimal, editorial — like the references
  - **Remove**: Table of Contents component entirely (it adds clutter)
  - **CTA ("When to Call a Pro")**: Keep but simplify — clean green background box, phone + service link buttons, no decorative tree icon
  - **FAQ section**: Keep accordion but simplify — just a heading + clean collapsible questions with simple borders, like the reference's "Frequently Asked Questions" section with Open All link
  - **Social/share row**: Add a simple share/print row below the article (like the competitor has)
  - **Related articles**: Keep at bottom, simple cards on gray background
  - **Contact form**: Add the existing ContactForm component at the very bottom (like competitor's "Request A Free Consultation" section)
  - Files: `client/src/pages/blog-post.tsx`
  - Acceptance: Page matches the clean editorial feel from references — image hero, clean text on white, green headings, no visual noise

### T002: Improve seed blog post content quality
- **Blocked By**: []
- **Details**:
  - Rewrite the 9 seed blog posts in `server/seed-blog.ts` to be more substantial and better structured:
    - Each post should be 600-1000 words (currently some are thin)
    - Use clear H2/H3 hierarchy with descriptive headings (like the references: "How Tree Dormancy Works", "What Trees Are Most at Risk", etc.)
    - Include more bullet/numbered lists with detail (not just single-word items)
    - Bold key terms and phrases naturally within paragraphs
    - Add a clear intro paragraph before the first heading
    - Make content genuinely useful and readable, not filler
    - Each post should have 4-5 well-written FAQs
  - Files: `server/seed-blog.ts`
  - Acceptance: Seed posts read like real professional blog articles with good structure and substance
