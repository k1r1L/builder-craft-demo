# Field Builder (React + TypeScript)

A small **form field configuration UI** (“builder”) where an admin defines a **select-type field** for a future form. The builder supports **single-select** or **multi-select**, required/optional, default value, choices management, ordering, validation, and saving to a mock HTTP endpoint.

## ✨ What it does (demo idea)
- Lets a “builder” define a field like **Sales Region**:
  - **Type:** `single-select` or `multi-select`
  - **Required:** whether end-users must choose at least one option
  - **Default value**
  - **Choices:** one per line (max 50; no duplicates)
  - **Order:** As Entered or Alphabetical (applied on save)
- **Validates** the input as you edit.
- **Persists a draft** to `localStorage` (so accidental closings won’t lose your work).
- **Submits JSON** to a CORS-friendly mock endpoint (e.g., Pipedream).
- Optional: visually **highlights characters beyond 40 per choice** (stretch).

---

## 🧰 Libraries & tools

- **React 18 + TypeScript**
- **react-hook-form** for form state
- **Yup** + **@hookform/resolvers/yup** (`yupResolver`) for validation
- **styled-components** for styling & theming
- **react-i18next / i18next** for internationalization
- **Vite** for dev/build
- **Vitest + @testing-library/react** for unit tests (stretch)

---

## 🧱 Architecture (high level)

```
src/
  app/
    i18n.ts                 # i18next init
    theme.ts                # theme (colors, spacing, media)
  components/
    FieldBuilder/
      index.tsx             # main container
      useFieldBuilderResolver.ts  # Yup schema (yupResolver)
      types.ts              # FieldFormValues, defaults, keys
    LabelField/
    TypeField/
    DefaultValueField/
    ChoicesField/
    OrderField/
    Actions/
    styled.ts               # shared layout primitives (Card, Body, Footer, etc.)
  constants/
    field.ts                # field constants (names, limits, order/type options)
    useDebounce.ts          # tiny debounced-callback hook
  services/
    FieldService.ts         # postField + draft helpers (if added)
  utils/
    normalizeChoices.ts
    isPlainObject.ts
    highlightOverLimit.ts   # (if using highlight-within-textarea)
  test/
    setup.ts                # RTL + jest-dom
    test-utils.tsx          # render wrapper with ThemeProvider + I18n
```

---

## 🧪 Validation rules

- **Label** is required.
- **Choices**
  - Max **50** total.
  - No duplicates (trimmed, non-empty lines).
  - (Stretch) highlight characters **beyond 40** per choice (visual only).
- **Default value**
  - If not among choices, it’s **added automatically** on save.
- **Order**
  - `alphabetical` uses `localeCompare`.
  - `as-entered` preserves the user’s order.

All rules live in `useFieldBuilderResolver` with **Yup + yupResolver**:
```ts
choicesText: yup.string().required().default("")
  .test("choices-validation", function (val) {
    const lines = (val ?? "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (lines.length > MAX_CHOICES) {
      return this.createError({ message: `No more than ${MAX_CHOICES} choices allowed.` });
    }
    const set = new Set(lines);
    if (set.size !== lines.length) {
      return this.createError({ message: "Duplicate choices are not allowed." });
    }
    return true;
  })
```

---

## 🌐 Saving / mock backend

- Uses an env var **`VITE_POST_ENDPOINT`** (e.g., a **Pipedream** HTTP trigger URL).
- On save, posts this payload:
```json
{
  "label": "Sales Region",
  "type": "single-select",
  "required": true,
  "defaultValue": "Bulgaria",
  "choices": ["Africa", "Europe", "South America", "Bulgaria", "Germany"],
  "order": "as-entered"
}
```

---

## 🗂 Draft persistence

- **LocalStorage** autosave with lightweight debounce (400ms).
- Hydrates once on mount; cleared by “Clear & Start Fresh”.

---

## 🎨 Styling & theming

- **styled-components** Theme includes:
  - `theme.colors` (e.g., `header: #e9f5ff`, `primary`, `danger`, etc.)
  - `theme.spacing(n)` → 4px scale
  - `theme.radius`, `theme.shadow`
  - `theme.media` breakpoints (e.g., `theme.media.sm` for `<640px`)
- **Responsive**: desktop uses rows; under `sm` buttons stack vertically (flex-column).

---

## 🌍 i18n

- `react-i18next` initialized in `app/i18n.ts`.
- Copy keys like `"fieldBuilder"`, `"label"`, errors, buttons, etc.
- UI translates **message keys** from resolver where used (or plain strings if you prefer no i18n for errors).

---

## ✅ Testing (stretch)

- **Vitest** + **RTL** for unit/integration tests.
- Example tests:
  - `normalizeChoices` (dedupe/trim)
  - FieldBuilder duplicate error appears, max count error appears
- `vite.config.ts`: `import { defineConfig } from 'vitest/config'` + `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' }`
- `src/test/test-utils.tsx` wraps renders with **ThemeProvider** + **I18nextProvider**.

---

## 🔧 Env & scripts

**.env.local**
```
VITE_POST_ENDPOINT=https://<your-pipedream-id>.m.pipedream.net
```

**package.json scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## 🧠 Notable implementation details

- **All validation** centralized in the resolver (no imperative `setError`).
- **normalizeChoices** parses textarea once into a trimmed, deduped list.
- The **default value** is ensured to be part of choices before posting.
- **Order** applied **at save time** (textarea isn’t mutated live).
- **Actions Button** has a centered spinner overlay (no layout jank).
- **Accessibility**: labels use `htmlFor`, inputs use associated ids, and focus styles use `:focus-visible`.

---

## 🚀 Future improvements (nice talking points)

- Add unit tests for the resolver and `TypeField` behavior.
- Support more field types (number, text, etc.) and conditional props.
- Server-side persistence with auth + per-user drafts.
- Keyboard a11y shortcuts for moving/removing choices.
- E2E test (Playwright) for the full “configure → save” flow.
