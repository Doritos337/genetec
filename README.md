# Genetec — Component Library Demo

A React application that showcases three reusable components — **DataGrid**, **Timeline**, and **EventForm** — wired together through a single global store. This project serves as a technical showcase demonstrating clean architectural layers, strict TypeScript usage, and deep implementation of Web Accessibility (A11y) standards.

## Tech Stack

| Area | Choice | Why |
| --- | --- | --- |
| Build tool | Vite | Fast dev server, native ESM, optimized production bundles. |
| UI framework | React 18 / 19 | Standardized rendering lifecycle, strict functional primitives. |
| UI kit | Mantine + Custom Components | Built-in A11y bindings, CSS module scoping, clean custom wrappers. |
| Forms | Custom Controlled State | Native input bindings ensuring exact focus-first-invalid DOM targeting. |
| Routing | `@tanstack/react-router` | Type-safe, declarative routes generated natively from the file tree. |
| State | `zustand` + `persist` | Simple, highly optimized unidirectional store powering real-time cross-view updates. |
| Notifications | `@mantine/notifications` | Non-blocking visual feedback mechanism triggered on state updates. |
| Linting | ESLint, Stylelint, Prettier, Knip | Enforces zero dead code, static layout checks, clean module encapsulation. |

### Layering Rules

- `components/` — **never** import from `features/`, `lib/store` or `mocks/`. Components act purely as presentational nodes driven by explicit props.
- `features/` — compose layout features, query store states, execute action transformations.
- `lib/store` — standalone global state orchestrator handling data ingestion and mutations.
- `mocks/` — isolated static dictionary sources utilized strictly to seed dynamic store generation.
- `ui/` — centralized abstract wrapper layer for third-party layouts. Prevents direct component coupling across application layers.

## The Three Components

### `DataGrid<T>`

- Type-safe generic architecture allowing custom column properties (`hidden`, `label`, `accessor`, `sortable`, `filter`).
- Supports client-side slicing for high-performance rendering across 180+ seeded datasets.
- Embedded data lifecycle regions handling loading, dynamic errors, and clean fallbacks.

### `Timeline`

- Dynamically clusters chronological logs into descending distinct date blocks.
- Advanced programmatic navigation: bindings support seamless arrow-key (`←`/`→`/`↑`/`↓`) traversal alongside explicit selection events (`Enter`/`Space`).
- Integrated `aria-live="polite"` structural properties providing contextual focus reading for screen readers.

### `EventForm`

- Controlled component pattern validating custom rule structures.
- Triggers dynamic focus routing to instantly target the earliest invalid DOM node on submission.
- Operates simultaneously as an isolated demo layout and as a persistent global modal window. Output payloads render instantly to explicit success regions.

## Data Flow

```
mocks/* ──► lib/store (zustand) ──► features/* (read + write) ──► components/* (display)
```

- Triggering the `New Event` action directly from the global navigation launches the event creation sequence. Submitting mutations passes data directly to the store, instantly updating the DataGrid and Timeline views simultaneously.
- Every state entry generates unique identities via `crypto.randomUUID()` to completely eliminate tracking overlaps during concurrent iterations.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development environment. |
| `npm run build` | Perform strict type checks and generate production assets. |
| `npm run lint` | Run structural analysis check passes. |
| `npm run format` | Standardize code formatting layouts. |
| `npm run knip` | Scan workspace files for unused dependencies and unreferenced exports. |
| `npm run preview` | Run a local server serving optimized production builds. |

## Requirements

- Node.js environment supporting modern ES features.

## Running the Application Locally

```bash
# Clone the target source repository
git clone <repository-url>
cd genetec

# Install dependencies using your preferred package manager
npm install

# Launch the live local development server
npm run dev
```

## Decisions Worth Noting

1. **Persistent State Management (`persist` middleware):** To emulate actual operational dashboard requirements where live security audit streams must survive unexpected browser refreshes, persistent middleware stores active state logs within local cache engines.

2. **Dynamic Generation vs. Raw Mocks:** The system avoids hardcoded JSON blocks in favor of procedural state builders consuming dictionary fragments. This guarantees realistic, high-volume production datasets (180+ entries) without redundant source file bloat.

3. **Decoupled Client Logic:** Sorting and custom attribute filtering logic live purely inside standalone custom React hooks (`useSorting`, `useFiltering`). This keeps view components incredibly light and explicitly focused on UI rendering.

4. **Targeted View Subsets:** While the DataGrid cleanly renders complete pagination views over the full set of store logs, the Timeline component selectively reads a localized subset of the most recent records. This approach maintains exact visual alignment with design guidelines and prevents massive vertical scroll bars.

5. **UI Layer Re-exports:** Implementing a dedicated internal `ui` package acts as an anti-corruption layer. If core layout configurations ever require structural migration, edits remain confined to a single directory path.
