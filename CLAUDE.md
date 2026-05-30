# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (Vite, http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
```

There is no lint or test script configured in this project.

## Architecture

This is a **pure-frontend React SPA** with zero backend. All data is persisted exclusively in `localStorage` under the key `codex-data`.

### Single-file design

The entire app lives in **`src/main.jsx`** — one heavily minified file containing all React components, state logic, and business utilities. There is no component folder. Key pieces inside that file:

- **`cfg`** — defines all module field configurations (columns for each tab like Clients, Chantiers, Factures, etc.)
- **`App`** — root component, holds all app state via `useState`, manages admin/worker mode switching, and handles import/export
- **`ModuleModal`** — renders any module as an overlay modal when a tab is clicked
- **`Crud`** — generic CRUD list+form reused for every module
- **`Dashboard`** — summary cards pulling totals from `data`
- **`Punch`** — worker punch-in/out widget with pay-mode selector
- **`Calendar`** — static day-intensity legend display
- **Helper functions**: `money()`, `lineTotal()`, `netTotal()`, `csvSafe()`, `stamp()`

### Module system

All modules (`Clients`, `Employes`, `Chantiers`, `Factures`, etc.) are driven by field arrays in `cfg`. Adding a new module means:
1. Adding an entry to `cfg` with field names
2. Adding the module name to the `admin` or `worker` nav array
3. Optionally adding quick-status buttons via `quickStatus`

### Themes

Eight CSS themes (`carbon`, `storm`, `arctic`, `inferno`, `ocean`, `forest`, `neon`, `classic`) are applied as a class on the `<main>` element. Theme styles are in **`src/styles/global.css`**.

### Financial calculations

- `lineTotal(row)` — `Quantite × Prix CAD`, falls back to `Total CAD`
- `netTotal(row)` — `Montant CAD + tax - Remise - Depot`
- The `Lignes` module links to parent documents by matching `Document` field to a `Numero` exactly

### Print / PDF

`printDoc()` opens a new browser popup with a formatted HTML invoice/devis/contract ready for the browser's native print dialog. Popups must be allowed by the browser.

### Data lifecycle

On load, `data` is initialized from `localStorage` or `empty` (all modules as empty arrays). Every state change calls `useEffect` to re-serialize to `localStorage`. The Reset button calls `clearAll()` which replaces state with `empty` after a `confirm()`.

### Roadmap context

The project is currently at **Phase 3** (punch + calendar). Phase 4 targets Supabase migration (auth, multi-company, roles). Keep this in mind when adding features — avoid creating architecture that assumes a backend, since it does not exist yet.
