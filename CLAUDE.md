# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
```

There is no lint or test command configured.

## Architecture

**Codexgpt-v1-gestion** is a fully client-side, localStorage-only React SPA — no backend, no API calls, no auth.

### Single-file app

The entire application lives in **`src/main.jsx`** as a single minified/compressed file. All components (`App`, `ModuleModal`, `Crud`, `Dashboard`, `Punch`, `Calendar`), business logic, and data schemas are defined inline there. There is no component folder structure for the core app.

The widget files in `src/` (`backup-widget.js`, `break-widget.js`, `calendar-widget.js`, etc.) exist as supplemental standalone modules that extend specific features. They are **not** imported by `main.jsx` by default — check `index.html` script tags to see what is active.

### Data model

All data lives in a single `localStorage` key: **`codex-data`**. The shape mirrors the `cfg` object in `main.jsx`, which maps module names (`Clients`, `Employes`, `Factures`, etc.) to their field arrays. Every record gets a `Date.now()` integer as its `id`.

The 16 admin modules are: `Tableau`, `Clients`, `Employes`, `Sous-traitants`, `Chantiers`, `Punchs`, `Lignes`, `Devis`, `Contrats`, `Factures`, `Catalogue`, `Comptabilite`, `Stats`, `Recompenses`, `IA`, `Reglages`.

The 8 worker modules are: `Punch`, `Breaks`, `Calendrier`, `Punchs`, `Stats`, `Profil`, `Mes factures`, `Recompenses`.

### Financial calculations

- `lineTotal(r)` — `Quantite × Prix CAD`, falling back to `Total CAD`
- `netTotal(r)` — `Montant CAD + tax% − Remise − Depot`
- `Lignes` rows are linked to invoices/devis by exact document number (`Document` field = `Numero`)

### Themes

Eight CSS themes are applied via a class on `<main>` (e.g., `class="shell carbon"`). Themes override `--accent` and background via CSS custom properties defined in `src/styles/global.css`. The full list: `carbon`, `storm`, `arctic`, `inferno`, `ocean`, `forest`, `neon`, `classic`.

### Modal navigation pattern

Clicking a tab opens a `<ModuleModal>` overlay immediately, rather than navigating to a new page. The `modal` state holds the currently open module name; `tab` tracks which tab is highlighted in the sidebar.

## Planned future work

Per `docs/roadmap.md`, planned phases include document signing, Supabase multi-tenant backend, and PWA publishing. The Supabase schema plan is in `docs/supabase-plan.md`. Each module's intended field spec is documented in `docs/`.
