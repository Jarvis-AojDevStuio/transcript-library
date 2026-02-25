# S-Tier Google Apps Script Testing Setup Guide

The **S-Tier** of Google Apps Script (GAS) testing is a professional software engineering setup that moves development *off* the browser and into a local environment.

The goal of the S-Tier is to treat GAS like a standard TypeScript/Node.js project, enabling instant feedback loops, type safety, and automated pipelines.

## The S-Tier Stack

| Component | Tool / Strategy | Why it's S-Tier |
| --- | --- | --- |
| **Environment** | **VS Code + Clasp** | No more online editor. You write code locally using standard git version control. |
| **Language** | **TypeScript** | Provides autocomplete for GAS services (`SpreadsheetApp.get...`) and catches errors before you even run the code. |
| **Unit Testing** | **Jest** | The industry standard. Tests run locally in milliseconds without touching Google's servers. |
| **Mocking** | **Dependency Injection** | Instead of hard-coding `DriveApp`, you pass it into functions or mock the global object, allowing you to test logic in isolation. |
| **Bundler** | **Rollup / Webpack** | Bundles your code into a single file. This allows you to use **NPM packages** (like Lodash, date-fns) in your GAS project. |
| **CI/CD** | **GitHub Actions** | Every push triggers tests. Every merge to `main` automatically deploys the script using `clasp push`. |

---

## Phase 1: Local Unit Testing (The "Fast" Loop)

In the S-Tier, you do not use `Logger.log` and click "Run" to test logic. You use **Jest**.

Since `SpreadsheetApp` and `DriveApp` do not exist on your laptop, you must mock them.

### The "Clean Architecture" Approach (Best)

Write your business logic as pure functions that accept *data*, not *services*.

```typescript
// ❌ C-Tier: Hard to test locally
function processSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data"); // Fails locally
  const data = sheet.getDataRange().getValues();
  // ... heavy logic ...
}

// ✅ S-Tier: Pure logic is testable anywhere
// logic.ts
export function calculateMetrics(rows: any[]) {
  return rows.map(r => r[0] * 2);
}

// controller.ts (The "Dirty" layer)
function onOpen() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  const data = sheet.getDataRange().getValues();
  const result = calculateMetrics(data); // Easy to unit test calculateMetrics with Jest!
}
```

### The "Global Mock" Approach

If you must test code that calls GAS services directly, you mock the global namespace in Jest.

```typescript
// jest.config.js or setup file
global.SpreadsheetApp = {
  getActiveSpreadsheet: jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getDataRange: jest.fn(() => ({
        getValues: jest.fn(() => [['mock', 'data']])
      }))
    }))
  }))
};
```

---

## Phase 2: Integration Testing (The "Real" Loop)

Unit tests pass, but does it actually work on Google's servers?

**Tools:** `clasp run` (Execution API)

The S-Tier setup uses the execution API to trigger functions remotely from your terminal.

1. **Deployment:** `clasp push` uploads your code.
2. **Trigger:** You run a script (e.g., `npm run test:integration`) that calls `clasp run 'myTestFunction'`.
3. **Result:** The terminal shows you the logs from the server execution.

---

## Phase 3: The CI/CD Pipeline

You should never manually copy-paste code into the script editor.

### Workflow

1. **Push Code:** You push code to a feature branch on GitHub.
2. **GitHub Action Trigger:**
   - Installs dependencies (`npm ci`).
   - Runs Linter (`ESLint`).
   - Runs Unit Tests (`npm test`).

3. **Merge:** When you merge to the `main` branch, a second Action runs:
   - Authenticates with Google (using a `CLASPRC` secret).
   - Runs `clasp push` to update the production script.
   - Creates a new version checkpoint automatically.

---

## Summary: The Tier List

- **F-Tier:** Writing code in the browser. Debugging with `Logger.log`. Copy-pasting code to back it up.
- **C-Tier:** Using the browser editor but using a library like **QUnit** or **GasTap** to run tests inside the execution log.
- **A-Tier:** Using **Clasp** to pull code locally, but still manually testing by pushing and running.
- **S-Tier:** Local **TypeScript** development + **Jest** unit tests (with mocks) + **GitHub Actions** for auto-deployment.
- **S+ Tier:** Everything above but with **Bun** replacing Node/NPM/Jest/Webpack for 10-20x faster performance.

---

## S+ Tier: Bun-Native Setup (Recommended)

Using **Bun** elevates the S-Tier setup to **S+ Tier** because it collapses three tools into one.

Bun acts as your **Node runtime**, **Package Manager** (replacing NPM), **Test Runner** (replacing Jest), and **Bundler** (replacing Webpack/Rollup). It is significantly faster and requires much less configuration.

### The S+ Tier Stack

| Component | Tool / Strategy | Why it's S+ Tier |
| --- | --- | --- |
| **Environment** | **VS Code + Clasp** | No more online editor. You write code locally using standard git version control. |
| **Language** | **TypeScript** | Bun has native TypeScript support - no compilation step needed. |
| **Runtime** | **Bun** | Replaces Node.js with faster performance. |
| **Package Manager** | **Bun** | Replaces NPM with faster installs and smaller `node_modules`. |
| **Unit Testing** | **Bun Test** | Replaces Jest with 10-20x faster test execution. |
| **Bundler** | **Bun.build** | Replaces Webpack/Rollup with native bundling API. |
| **CI/CD** | **GitHub Actions** | Every push triggers tests. Every merge to `main` automatically deploys. |

---

## S+ Tier Boilerplate Setup

### 1. Directory Structure

```text
my-gas-project/
├── src/
│   ├── index.ts        <-- Your main GAS entry points (triggers)
│   ├── logic.ts        <-- Pure logic (testable)
│   └── appsscript.json <-- The project manifest
├── dist/               <-- Bundled output (pushed to GAS)
├── tests/
│   └── logic.test.ts   <-- Your unit tests
├── build.ts            <-- Bun build script
├── package.json
└── .clasp.json
```

---

### 2. The "Bunified" `package.json`

Notice how much cleaner this is. We removed `jest`, `ts-jest`, `ts-node`, and `typescript` (as a dev dependency) because Bun has all of this built-in.

```json
{
  "name": "gas-s-tier-bun",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch",
    "build": "bun run build.ts",
    "push": "bun run build && clasp push"
  },
  "devDependencies": {
    "@google/clasp": "^2.4.2",
    "@types/google-apps-script": "^1.0.83"
  }
}
```

**Setup Action:** Run `bun install` in your terminal.

---

### 3. The Build Script (`build.ts`)

Google Apps Script cannot run native TypeScript, and it doesn't support ES Modules (`import/export`) across files in the way standard web servers do. You must **bundle** your code into a single file.

Instead of a complex `webpack.config.js`, we write a simple Bun script to bundle the code.

**Create a file named `build.ts` in your root:**

```typescript
import { build } from "bun";

// 1. Bundle the code
const result = await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'browser', // GAS is browser-like (V8)
  format: 'esm',     // GAS V8 runtime supports standard syntax
  minify: false,     // Keep it readable for debugging in GAS editor
});

if (!result.success) {
  console.error("Build failed");
  for (const message of result.logs) {
    console.error(message);
  }
} else {
  console.log("Build succeeded!");
}
```

*Note: You will need to point your `.clasp.json` to push from the `./dist` folder, not `./src`.*

---

### 4. The "Global Scope" Problem

This is the **critical** difference when using a bundler (Bun, Webpack, etc.) for Apps Script.

When Bun bundles your code, it encapsulates variables to prevent them from leaking. However, **Apps Script Triggers (`onOpen`, `myFunction`) MUST be global** to be seen by the Google interface.

You must explicitly expose your triggers in `src/index.ts`.

**src/index.ts:**

```typescript
import { calculateTax } from './logic';

const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('My Bun App')
    .addItem('Calculate Tax', 'runTaxCalc') // Strings refer to global functions
    .addToUi();
};

const runTaxCalc = () => {
  const result = calculateTax(100, 0.2);
  Logger.log(result);
};

// CRITICAL: Expose functions to the GAS global scope
// @ts-ignore
globalThis.onOpen = onOpen;
// @ts-ignore
globalThis.runTaxCalc = runTaxCalc;
```

---

### 5. Testing with Bun (`tests/logic.test.ts`)

Bun's test runner is Jest-compatible, so the syntax is nearly identical, but it runs instantly.

```typescript
import { describe, expect, test, beforeAll } from "bun:test";
import { calculateTax } from '../src/logic';

// Mock Logger if needed
beforeAll(() => {
  globalThis.Logger = {
    log: (msg: any) => console.log(msg),
    clear: () => {},
    getLog: () => ""
  } as any;
});

describe('Tax Calculator', () => {
  test('should correctly calculate 10% tax', () => {
    expect(calculateTax(100, 0.1)).toBe(10);
  });
});
```

---

### 6. S-Tier vs S+ Tier Comparison

| Component | NPM/Jest Setup | Bun Setup | Benefit |
| --- | --- | --- | --- |
| **Dependencies** | Huge `node_modules` | Tiny | Disk space & install speed |
| **Config** | `jest.config.js`, `tsconfig.json` | Zero config | Simplicity |
| **Testing** | `npm test` (starts Node -> Jest -> ts-jest) | `bun test` | **Speed (10x-20x faster)** |
| **Bundling** | Webpack/Rollup (Complex plugins) | `Bun.build` API | Native performance |

---

## Legacy S-Tier Boilerplate (NPM/Jest)

> **Note:** The following section is kept for reference if you need to use NPM/Jest instead of Bun.

### 1. Directory Structure

First, organize your folder so your source code doesn't get cluttered with config files.

```text
my-gas-project/
├── src/
│   ├── index.ts        <-- Your main GAS entry points (triggers)
│   ├── logic.ts        <-- Pure logic (testable)
│   └── appsscript.json <-- The project manifest
├── tests/
│   └── logic.test.ts   <-- Your unit tests
├── package.json
├── tsconfig.json
├── jest.config.js
└── .clasp.json
```

---

### 2. The `package.json`

This file defines your toolchain. We are installing:

- **`clasp`**: To push/pull code from Google.
- **`typescript`**: To write type-safe code.
- **`jest` & `ts-jest`**: The testing framework.
- **`@types/...`**: Definitions so VS Code knows what `SpreadsheetApp` and `test()` look like.

```json
{
  "name": "gas-s-tier-boilerplate",
  "version": "1.0.0",
  "description": "S-Tier Google Apps Script setup with Jest and TypeScript",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "push": "clasp push",
    "deploy": "npm run test && clasp push"
  },
  "devDependencies": {
    "@google/clasp": "^2.4.2",
    "@types/google-apps-script": "^1.0.83",
    "@types/jest": "^29.5.12",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.2",
    "typescript": "^5.4.5"
  }
}
```

**Setup Action:** Run `npm install` in your terminal after creating this file.

---

### 3. The `tsconfig.json`

You need this to tell TypeScript how to handle Google's global variables and how to compile.

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "lib": ["ESNext"],
    "module": "commonjs",
    "rootDir": "./",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "types": [
      "google-apps-script",
      "jest"
    ]
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

---

### 4. The `jest.config.js`

This tells Jest to use `ts-jest` to understand your TypeScript files.

We also add a `globals` section to mock `Logger`. Since `Logger.log` is used frequently for debugging, it is annoying if tests fail because `Logger` is undefined in the local Node environment.

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],

  // This helps handle absolute imports if you use them
  moduleDirectories: ['node_modules', 'src'],

  // Mocks common GAS globals so basic logs don't crash tests
  globals: {
    Logger: {
      log: console.log,
      clear: () => {},
      getLog: () => ""
    }
  }
};
```

---

### 5. Proof of Concept: How to Use It

**Step A: Write pure logic (`src/logic.ts`)**

Note that this file imports *nothing* from Google Apps Script. It is pure JavaScript/TypeScript.

```typescript
export const calculateTax = (amount: number, rate: number): number => {
  if (amount < 0) throw new Error("Amount cannot be negative");
  return amount * rate;
};
```

**Step B: Write the test (`tests/logic.test.ts`)**

```typescript
import { calculateTax } from '../src/logic';

describe('Tax Calculator', () => {
  test('should correctly calculate 10% tax', () => {
    expect(calculateTax(100, 0.1)).toBe(10);
  });

  test('should throw error on negative numbers', () => {
    expect(() => calculateTax(-50, 0.1)).toThrow("Amount cannot be negative");
  });
});
```

**Step C: The Controller (`src/index.ts`)**

This is the only file that touches Google services. It connects your pure logic to the spreadsheet.

```typescript
import { calculateTax } from './logic';

// This function is triggered by the spreadsheet
function onEditTrigger() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();

  if (range && range.getValue()) {
    const val = range.getValue();
    const tax = calculateTax(val, 0.2); // Uses the tested logic

    Logger.log(`Calculated tax: ${tax}`);
    range.offset(0, 1).setValue(tax);
  }
}
```

---

## Next Steps

To complete the S-Tier loop, you can add a **GitHub Actions workflow file** (`.yaml`) so that tests run automatically every time you push code to GitHub.
