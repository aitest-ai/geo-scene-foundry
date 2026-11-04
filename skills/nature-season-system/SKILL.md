---
name: nature-season-system
description: Layer spring/summer/autumn/winter presets and interpolate natural scene states without modifying original games.
---

# 四季變換技能 v0.1.0

載入 `../../nature/seasons/` 的四季參數，使用 `../../nature/runtime/scene-engine.mjs` 的 `mergeScene` 和 `transitionScene`。

- 場景基底、季節、天氣與時間分層管理；單次只改要比較的因子。
- 數值與色彩平滑轉換，布林/季節標籤中間點切換。
- 秋季葉片、冬季積雪、冰面碰撞及落葉動畫**必須另外開發素材與物理**，不能靠 JSON 自己生出來。
- 每次交付同鏡位四季對照、瀏覽器/手機測試與完整版本可回退。
- **現況：** 參數/狀態運算原型，尚非完整四季 Shader 遊戲。