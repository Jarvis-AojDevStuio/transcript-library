# Email: S-Tier Google Apps Script Setup

**To:** Mmesoma Kelvin
**From:** Ossie Irondi
**Subject:** Professional Google Apps Script Development Setup - Move Beyond the Browser Editor

---

Hey Mmesoma,

I wanted to share a professional approach to Google Apps Script development that will significantly improve your workflow. This setup moves you out of the browser editor and into a proper development environment.

## The Problem with the Browser Editor

Writing GAS code directly in Google's online editor has some major drawbacks:
- No proper version control (you're basically copy-pasting to back things up)
- Debugging with `Logger.log` is slow and clunky
- No autocomplete or error-catching before you run
- No automated testing

## The Solution: S-Tier Setup

Here's what a professional GAS setup looks like:

| What | Tool | Why |
|------|------|-----|
| Code Editor | VS Code + Clasp | Write code locally, push to Google |
| Language | TypeScript | Autocomplete and catch errors before runtime |
| Testing | Jest | Run tests instantly without touching Google's servers |
| Deployment | GitHub Actions | Auto-deploy when you merge to main |

## The Key Concept: Separate Logic from Google Services

The trick to making this work is writing your business logic as **pure functions** that don't directly call Google services:

```typescript
// Your logic (easy to test)
export function calculateTotal(rows: any[]) {
  return rows.reduce((sum, r) => sum + r[0], 0);
}

// Your controller (calls Google services)
function onOpen() {
  const data = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Data")
    .getDataRange()
    .getValues();

  const total = calculateTotal(data);  // This is testable!
}
```

This way, you can test `calculateTotal` with Jest without needing any Google services.

## Quick Start

1. **Install Clasp globally**: `npm install -g @google/clasp`
2. **Log in**: `clasp login`
3. **Clone your script**: `clasp clone <scriptId>`
4. **Set up the project** with the boilerplate I've attached
5. **Run tests**: `npm test`
6. **Push changes**: `clasp push`

## Tier List Summary

- **F-Tier**: Browser editor + Logger.log debugging
- **C-Tier**: Browser editor with test libraries like QUnit
- **A-Tier**: Clasp locally, but manual testing
- **S-Tier**: TypeScript + Jest + GitHub Actions CI/CD

I've attached a complete boilerplate with `package.json`, `tsconfig.json`, and `jest.config.js` ready to go.

Let me know if you have questions or want to walk through the setup together.

Best,
Ossie

---

**Attachment:** [gas-s-tier-testing-setup-guide.md](./gas-s-tier-testing-setup-guide.md)
