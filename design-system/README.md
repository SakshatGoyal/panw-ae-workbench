# Design System Trial

## Where semantic tokens live

Semantic tokens are hand-authored in packages/themes/src/. One TS file per mode: shell.ts, stage.ts, emphasis.ts, global.ts. The themes build reads these files directly (via tsx) and generates Sass and CSS from them. There is no separate token definition file — the TS source is the source of truth.
