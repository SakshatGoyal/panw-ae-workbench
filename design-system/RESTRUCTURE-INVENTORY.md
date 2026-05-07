# Workspace Restructure: Path Inventory Report

## Baseline Commit

**Commit hash:** `3bc7dd1`  
**Files committed:** 69  
**Message:** chore: baseline before workspace restructure

---

## Path Inventory

### REWRITE (will edit during restructure)

**`.codex/hooks.json:9`**
```json
"command": "/Users/sakshatgoyal/Documents/GitHub/design-system-trial-03/.venv/bin/graphify hook-check"
```
**Why:** Contains absolute path with both user directory and repo name. After restructure, this will break. Should update to use relative path or environment variable to .venv location once recreated.

**`package.json:2`**
```json
"name": "design-system-trial-03",
```
**Why:** Repo name in package manifest. Will need updating to reflect new workspace name (e.g., `panw-ae-workbench`).

**`package-lock.json:2,7`** (2 occurrences)
```
"name": "design-system-trial-03",
```
**Why:** Same as package.json—root package name appears in lockfile. However, this is typically regenerated rather than hand-edited.

---

### REGENERATE (will rebuild, don't edit)

**`package-lock.json`**  
**What it is:** npm dependency lockfile  
**Rebuild command:** `npm install` (after .venv recreation and moving all files)  
**Note:** The entire file will be regenerated; do not manually edit it. The name references will be updated automatically by npm.

**`.venv/`**  
**What it is:** Python virtual environment (ephemeral)  
**Rebuild command:** Deleted and recreated as part of restructure plan  
**Note:** Per restructure plan, .venv is deleted and recreated via `pip install -r requirements.txt`.

---

### REVIEW

None. All path references are unambiguous.

---

### IGNORE

- **ESLint patterns** (`.venv/**`, `dist/**`, etc. in `eslint.config.mjs`): These are relative glob patterns, not absolute paths. Safe to ignore.
- **graphify-out references** in `.gitignore`, `.graphifyignore`, and `AGENTS.md`: These reference a directory by name, not an absolute path. Safe to ignore.
- **Relative import paths** in source code (e.g., `../../../scripts/token-utils.mjs`, `../src/index.ts`): These are relative paths that will continue to work after the move to `design-system/` subfolder. Safe to ignore.

---

## Surprises

### Stale Reference to Deleted Directory

**`eslint.config.mjs:10`**
```javascript
'momentum/**',
```

**Finding:** This glob pattern references a directory (`momentum/`) that no longer exists in the repository. This was likely a recently deleted package or feature directory.

**Recommendation:** Remove this line from the ignores array during the restructure cleanup. It serves no purpose and clutters the config.

---

## Summary Table

| Category | Count | Files |
|----------|-------|-------|
| REWRITE | 3 references | `.codex/hooks.json`, `package.json`, `package-lock.json` |
| REGENERATE | 2 artifacts | `package-lock.json`, `.venv/` |
| REVIEW | 0 | — |
| IGNORE | Multiple patterns | `eslint.config.mjs`, `.gitignore`, `.graphifyignore`, source files |
| SURPRISES | 1 | `eslint.config.mjs` (momentum reference) |
