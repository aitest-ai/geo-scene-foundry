# Instructions for all GitHub-connected AI agents

1. Read `nature/README.md` and the applicable `skills/*/SKILL.md` before editing.
2. Shared GitHub repository is the source of truth for the *skill specification*, not automatic deployment/installation in every AI client. Agents need GitHub access or a checkout.
3. Do not change existing Toya Lake, Chenggong or other sites/maps without explicit authorization. Work in an isolated copy, keep originals and hashes.
4. Keep `nature/presets` and `nature/seasons` versioned; validate them with `npm test`.
5. Distinguish visual parameters from scientific measurements and mark `status` design, prototype or verified.
6. This repository contains the **original blue-pond prototype code**, but **not** the upstream Open Water FFT shaders; upstream MIT code and its separately licensed sound require separate handling.
7. A CPU test/EGL render is not evidence of browser/phone FPS or final realism. Record same-camera A/B, shaders, FPS and licensing before verification.
