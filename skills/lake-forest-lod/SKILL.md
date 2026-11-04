---
name: lake-forest-lod
description: Improve procedural lake forest quality with early GPU canopy culling, near/far foliage detail, A/B rollback, optional render-resolution scaling, and independently complete scene/particle GLSL programs.
---

# 湖景樹冠 LOD 與效能驗收技能 v0.1

## 必讀及可直接運作的來源
- 根目錄 AGENTS.md、nature/QA.md
- 完整可執行 HTML：nature/demos/blue-pond-forest-008.html
- 詳細 QA：nature/demos/README-forest-008.md
- 機器參數：nature/effects/lake-forest-lod-008.json
- 純函式示範：nature/runtime/forest-008.mjs

## 每個 AI 接手時
1. 複製到新環境；不更動洞爺湖、鄭成功或 001–007 原始來源／正式網站。
2. 相同相機、風、季節、畫面解析度，以 uForest008 / pForest008 同時切換新版與 007 來做公平 A/B。別用 65% 畫面對照 100% 宣稱新 Shader 更快。
3. 先判斷樹冠水平範圍，再計算 shoreHeight；近處多層樹葉，遠處簡化，避免多餘高頻像素細節。
4. 場景 frag、粒子 particleFrag 是不同 GLSL 程式；必須各自包含 grove008、understory008、treeIntersect，不可跨程式引用。
5. 禁止更改原水波 shadeWater 的核心運算；測試確認和 007 一致。
6. npm test + 實際 WebGL2 編譯 + 同鏡位畫面；手機/桌機硬體 FPS、最差畫面需另測，尚未驗收。
7. 若 008 畫質或效能不理想，立即用 UI 切換 007；保留來源版本與使用者已認可的場景。

## 現況
EGL/GLES3 llvmpipe shader 編譯與秋冬畫面通過；同解析度小樣本 007 約 41.2ms，008 約 45.2ms，沒有證明加速。仍是 prototype，不是正式版、非 Open Water 完整 FFT。
