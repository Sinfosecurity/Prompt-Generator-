# PromptFoundry - AI Prompt Architect

**Turn ideas into AI-ready prompts**

A production-ready web application that generates precise, structured AI prompts for building web applications with tools like Cursor, Antigravity, v0, and similar AI builders.

## What Makes This Different

Unlike typical prompt generators, PromptFoundry:

- **Enforces Quality Thinking**: Opinionated structure that prevents vague inputs
- **Builder-Specific Output**: Tailored prompts for Cursor, Antigravity, v0, or universal use
- **No Ambiguity Rule**: Generates prompts designed to run without follow-up questions
- **Real Product Logic**: Includes input schema, output structure, and complete UX flow
- **Zero Friction**: No login, no accounts, no distractions

## Features

### 6-Step Wizard Flow
1. **App Type Selection** - Choose from common app types or define custom
2. **Target Users** - Define your audience precisely
3. **Problem Statement** - Articulate the pain point clearly
4. **Input Types** - Specify what users will provide (multi-select)
5. **Output Types** - Define what results should show (multi-select)
6. **Design Preferences** - Color scheme, visual style, tone, platform

### Smart Prompt Generation
- Comprehensive prompts with all necessary context
- Builder-specific optimizations (Cursor, Antigravity, v0, Universal)
- Includes: app purpose, success criteria, input validation, output specs, user flow, design requirements, technical specs, edge cases, and explicit deliverables

### Copy Functionality
- Copy as plain text
- Copy as Markdown
- Multiple builder formats
- One-click clipboard copy with feedback

## Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern, responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript** - No dependencies, pure JS
- **Local Storage Ready** - Can be extended to save drafts

## Design Philosophy

### Calm & Intelligent
The interface feels like a product manager sitting next to you:
- Not a chatbot
- Not a form
- Not a toy
- A thoughtful tool that guides you to clarity

### Clean & Minimal
- Generous white space
- Clear visual hierarchy
- No unnecessary elements
- Every feature serves the core goal

### Responsive & Accessible
- Mobile-first design
- Works on all screen sizes
- Keyboard accessible
- High contrast for readability

## File Structure

```
prompt-generator/
├── index.html      # Main HTML structure with wizard steps
├── styles.css      # Complete styling with responsive design
├── script.js       # State management, validation, prompt generation
└── README.md       # This file
```

## How It Works

### State Management
```javascript
appState = {
    currentStep: 1,
    totalSteps: 6,
    data: { /* all collected inputs */ },
    selectedBuilder: 'universal'
}
```

### Validation Logic
- Step-by-step validation ensures quality input
- Enforces minimum character counts for problem statements
- Requires at least one selection for multi-select fields
- Custom input fields for edge cases

### Prompt Generation
The `buildPrompt()` function creates comprehensive prompts with:
- Builder-specific headers (Cursor, Antigravity, v0, Universal)
- 10 structured sections covering all aspects
- Smart defaults for optional fields
- No placeholder text or ambiguous instructions

## Usage

### For End Users
1. Open `index.html` in any modern browser
2. Follow the 6-step wizard
3. Answer each question thoughtfully
4. Select your target AI builder
5. Copy the generated prompt
6. Paste into your AI builder and watch it work

### For Developers
```bash
# Clone or download the files
# No build process needed - it's pure HTML/CSS/JS

# Open in browser
open index.html

# Or serve with any static server
python -m http.server 8000
# Then visit: http://localhost:8000
```

## Customization

### Branding
Edit these in `index.html`:
```html
<h1 class="logo">PromptFoundry</h1>
<p class="tagline">Turn ideas into AI-ready prompts</p>
```

### Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --primary-hover: #4f46e5;
    --secondary-color: #64748b;
    /* ... more colors */
}
```

### Builder Options
Add new builders in `script.js` → `buildPrompt()` function:
```javascript
if (builder === 'your-builder') {
    prompt += '# Your Builder Instructions\n\n';
    // ... custom format
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Minimal JavaScript (~500 lines)
- CSS-only animations
- Fast initial load (<100KB total)
- No network requests

## Roadmap Ideas

- [ ] Save drafts to localStorage
- [ ] Export prompts as PDF
- [ ] Prompt history/templates
- [ ] Example prompts showcase
- [ ] Prompt quality scoring
- [ ] Dark mode toggle
- [ ] Share via URL parameters
- [ ] Analytics (privacy-focused)

## License

Free to use, modify, and distribute. No attribution required.

## Credits

Built with precision and zero ambiguity.
Designed for builders who value clarity.

---

**PromptFoundry** - Stop guessing. Generate precise AI prompts.
