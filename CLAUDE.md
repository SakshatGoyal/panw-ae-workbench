# Project rules

## Visual design review protocol

Every time a screenshot is taken of a rendered surface, a genuine designer review is mandatory before the work is considered done. "Mandatory" means: do not send a response summarizing the work until this review is written out.

The review must enumerate, explicitly, every aesthetic problem visible in the screenshot:
- Wrap / overflow issues (text truncation, column overflow, multi-line where single-line was intended)
- Spacing off the 4px grid
- Inconsistent treatment across sibling elements (one link, others buttons; one high-contrast tag, others low)
- Token violations (raw hex, unstyled fallback, missing hover, focus ring absent)
- Alignment drift (elements that should be flush but aren't)
- Empty or missing states that weren't designed
- Things a typical human-being would call 'a mistake'

If the review finds nothing, state that explicitly — "no issues found" — so the absence of problems is visible, not assumed.

Only after the review is written and any issues are fixed (or consciously deferred with a reason) is the work done.

This rule exists because taking a screenshot and describing that it "looks good" is not designer judgment. The screenshot is evidence. Judgment is what happens when you actually look at it.


## Pre-cleanup safety

Before running any destructive operation (`git clean -fdx`, `rm -rf` on directories, deleting `node_modules`, `git restore .`, etc.), run `git status` first. If there is untracked work, either commit it (even a `(WIP)` commit is fine) or stop and ask. Untracked files do not survive cleanup, and parallel Claude Code sessions on this repo have lost authored work this way (see `@ds/icons`, `@ds/filter`).

This applies to both the main checkout and any worktrees.

## Reporting error-scan output

When summarizing any `/error-scan*` result, the first line must state coverage, e.g. `Tools run: 7 of 25 (18 skipped — list below)`. Never use the word "clean" if any tool shows `not_installed` or `skipped_no_manifest`. The error count is meaningless without the coverage denominator.

Specifically: a `storybook-build` pass does **not** mean "all stories load." Build halts on the first import failure; later stories never compile. To verify stories load at runtime, `test-storybook` must show `ran_clean`. If it shows `not_installed`, say so.

When fixing errors, re-run the scan after each fix and read `errors.jsonl` directly — do not infer from my prose whether the issue cleared.

## Bootstrap

Use `pnpm`, not `npm`. Homebrew npm rejects `workspace:*` and any `npm install` here will fail. From `design-system/`:

```
pnpm install
pnpm run build:packages
```

The build step is required after a fresh install — generated artifacts (`packages/styles/css/*`, `packages/colors/lib/*`, etc.) are gitignored and `pnpm install` does not produce them.
