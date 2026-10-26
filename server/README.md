# CIVITAS multiplayer server (experimental)

The production browser game is still Babylon.js. This directory adds a Docker build of the **actual upstream Voxelize Rust demo server**, isolated from the existing browser game. Upstream source: https://github.com/voxelize/voxelize (MIT). The upstream server runs on TCP port 10000 inside the Render container.

## Deployment
Render Web Service (Docker) -> Dockerfile Path: `./server/Dockerfile`; instance: Free; branch: main; Docker context: `.`. Do not change the GitHub Pages configuration. Docker build downloads Voxelize upstream and compiles Rust; the free builder may exceed time or memory limits. Test and check build logs before relying on it.

## Known limitations
- Browser Voxelize client is **not integrated yet**; the existing CIVITAS pages will not connect to this server.
- The upstream demo is a test world, not a CIVITAS persistent civilization world.
- The Render free tier sleeps and its filesystem is ephemeral. Do not store valuable world saves there.
- The Dockerfile pins neither upstream commit nor dependency lock; pin a known-good SHA after successful build.
- Source attribution: Voxelize MIT, https://github.com/voxelize/voxelize/blob/main/LICENSE. Assets need independent review.
