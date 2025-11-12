# SEO Meta Tag Analyzer - Design Guidelines

## Design Approach: Utility-Focused System

**Selected Framework:** Clean, data-visualization inspired design drawing from tools like Linear, Vercel Analytics, and developer-focused dashboards.

**Core Principles:**
- Information clarity over visual flair
- Instant feedback and status visibility
- Scannable, structured data presentation
- Professional, trustworthy aesthetic

---

## Typography

**Font Stack:** Inter (Google Fonts)
- Headings: 600 weight, tracking-tight
- Body: 400 weight, standard tracking
- Code/URLs: Use monospace font (font-mono)

**Hierarchy:**
- Page title: text-3xl font-semibold
- Section headers: text-xl font-semibold
- Tag labels: text-sm font-medium uppercase tracking-wide
- Tag values: text-base font-normal
- Helper text: text-sm text-gray-600

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent use: gap-4 for tight groupings, gap-8 for section separation
- Card padding: p-6 to p-8
- Page margins: px-4 md:px-8

**Container Strategy:**
- Max width: max-w-5xl mx-auto (keeps content focused)
- Single-column layout for clarity
- No multi-column - information flows vertically for easy scanning

---

## Core Components

### 1. URL Input Section
- Prominent input field (full width on mobile, constrained to max-w-2xl on desktop)
- Large "Analyze" button positioned to the right of input (inline on desktop)
- Input should have subtle border, focus state with ring
- Include placeholder: "https://example.com"
- Show loading state with spinner when analyzing

### 2. Status Cards Grid
Display meta tag categories as individual cards with clear status indicators:
- Card layout: White background, subtle border, rounded corners (rounded-lg)
- Status badge in top-right: Green (complete), Yellow (warning), Red (missing)
- Badge states: "✓ Good" | "⚠ Needs Review" | "✗ Missing"
- Each card contains: Tag name, current value (or "Not found"), character count, recommendation

**Tag Categories to Display:**
- Title Tag (with 60 char guideline)
- Meta Description (with 155 char guideline)
- Canonical URL
- Open Graph Tags (og:title, og:description, og:image)
- Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image)
- Robots meta tag
- Viewport tag

### 3. Preview Panels
**Google Search Preview:**
- Styled card mimicking Google's search result appearance
- Blue clickable title (text-xl)
- Green URL display
- Gray description text
- Labeled clearly: "Google Search Preview"

**Social Media Previews:**
Side-by-side cards (stack on mobile):
- Facebook/Open Graph preview (card with image placeholder if og:image exists, title, description)
- Twitter Card preview (similar layout, Twitter-style card)
- Both show placeholder image areas if og:image/twitter:image detected

### 4. Recommendations Panel
- Collapsible sections for each issue category
- Color-coded left border (red for critical, yellow for warnings, green for success)
- Bullet points with specific, actionable recommendations
- Priority ordering: Critical issues first

### 5. Technical Details Accordion
- Expandable section showing raw meta tag data
- Code block styling for actual HTML tags
- Copy-to-clipboard button for each tag

---

## Visual Treatment

**Status Indicators:**
- Green (#10b981): Tag meets best practices
- Yellow (#f59e0b): Tag present but needs optimization
- Red (#ef4444): Critical missing tag
- Gray (#6b7280): Optional/informational

**Card Styling:**
- Background: white
- Border: 1px solid gray-200
- Shadow: subtle (shadow-sm)
- Hover: slight shadow increase (hover:shadow-md)
- Radius: rounded-lg (8px)

**Empty State:**
Show before analysis with:
- Large icon (search or document icon from Heroicons)
- Centered text: "Enter a URL to analyze SEO meta tags"
- Subtle gray background

---

## Page Structure

1. **Header Bar** (sticky top)
   - App title: "SEO Meta Tag Analyzer"
   - Subtitle: "Analyze and optimize your website's SEO tags"

2. **Input Section** (prominent, centered)
   - URL input + Analyze button
   - Space: mt-8 mb-12

3. **Results Section** (appears after analysis)
   - Overall Score Card (large, centered, shows percentage/grade)
   - Status Cards Grid (gap-6, full width)
   - Preview Panels (mt-12, grid on desktop)
   - Recommendations Panel (mt-12)
   - Technical Details Accordion (mt-8)

4. **Footer** (minimal)
   - Powered by info
   - padding: py-8

---

## Icons

**Library:** Heroicons (outline style)
- Use for: status indicators, expand/collapse arrows, copy buttons, external link indicators

**No custom SVG generation** - stick to library icons only.

---

## Interaction Notes

- No page transitions or animations
- Instant feedback on status changes
- Smooth scroll to results after analysis
- Copy-to-clipboard functionality with brief success toast