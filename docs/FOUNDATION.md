# CIVITAS — ONE WORLD: foundation migration

Status: architecture decision; integration NOT yet deployed.

## Identity and product direction
Independent CIVITAS branding, world rules, characters, UI and art. A persistent browser civilization sandbox: gather resources, build homes and settlements, eventually establish ownership, economy and states. Mobile-first, desktop supported.

## Upstream components
- Voxelize (https://github.com/voxelize/voxelize), MIT: primary candidate for chunked world, editable terrain, entities, physics and authoritative multiplayer. TypeScript/Three.js client; Rust server. Keep upstream LICENSE and notices when distributing copied code.
- Aetheria (https://github.com/mositron/Aetheria), MIT: reference for inventory, crafting, housing, mobile UI, player interactions. Port individual concepts/components only after checking dependencies and compatibility. Do not assume its Colyseus/React systems plug into Voxelize.
- Check every third-party texture, font, audio and model license separately. Build original CIVITAS art assets.

## Isolation and rollout
1. Keep current Babylon.js alpha on main and GitHub Pages playable. No changes to CARDOVIO, MONOTOURS24 or personal VPS.
2. Prototype Voxelize in a separate branch or project, preserving current release. Establish reproducible build and test on Android and desktop.
3. Validate performance, chunk generation, placement/removal, saving and server connectivity before migration.
4. Build CIVITAS presentation layer: camera, avatar, HUD, touch joystick, art direction.
5. Port inventory, harvesting, recipes and building permissions in small, testable modules.
6. Deploy backend separately when multiplayer is enabled; GitHub Pages hosts static frontend only. Evaluate free-tier services before spending.
7. Promote tested version to main only when browser gameplay works.

## Initial playable acceptance criteria
- Mobile and desktop movement; usable camera and inventory
- Gather wood/stone and place a house
- Terrain edits persist correctly
- No regressions in public demo
- Licenses and attribution tracked

## Important
The current Babylon.js game has not been converted to Voxelize. This document is the starting architecture and implementation checklist.
