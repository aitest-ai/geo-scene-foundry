---
name: lake-forest-canopy
description: Improve procedural lake forests with layered evergreen, larch and deciduous canopies, shoreline shrubs, seasonal colors and reflections, without altering the existing water shader.
---

# 湖景森林自然化技能 v0.1.0

## 目的
修復規律三角形樹林、過度圓滑樹冠、欠缺林緣矮灌木與季節連動的湖面倒影。適用於青池示意景觀，或其他需獨立套用的程序式湖景。

## 必讀及來源
讀取 `AGENTS.md`、`nature/README.md`、`nature/QA.md` 與 `nature/demos/README-forest-007.md`。
- 006 原版：`nature/demos/blue-pond-landscape-006.html`。
- 007 程式：`nature/demos/blue-pond-forest-007.html`。
- 參數：`nature/effects/lake-forest-007.json`；樹位置的純 JS 參考：`nature/runtime/forest-007.mjs`。
- 原版單檔包含 WebGL2 主場景、粒子與水面系統，無外部 3D 模型。

## 操作流程
1. 永遠先建立獨立副本，不覆蓋洞爺湖、鄭成功、原本 006 或任何舊版預覽。
2. 在同一鏡位以「森林：007 混合樹冠／006 舊樹林」按鈕比較；007 只在 006 自然岸坡模式下啟用。
3. `grove007` 使用有種子的兩層林相：針葉樹枝棚、落葉松與非對稱闊葉樹冠；`understory007` 提供岸草及低矮灌木。
4. 主場景 `frag` 和獨立粒子 `particleFrag` 各自保留相同的 `grove007`、`understory007`、`treeIntersect` 和 `shoreHeight` 依賴，避免跨 Shader 未定義函式。
5. 確認 `shadeWater` 未更動；季節森林藉 `environment()` 進入原有 Fresnel 反射。
6. 執行 `npm test`，再進行真正 GLSL ES 3.0 / WebGL2 編譯、瀏覽器截圖、手機效能與 FPS 實測。
7. 有畫質或效能問題就關閉 007 或回退 006，保留原版母檔。

## 驗證界線
007 已通過 Node 單元測試、Mesa OpenGL ES 3.2 llvmpipe 兩個 GPU 程式的四段 Shader 編譯與連結，並產出同鏡位夏秋冬影像。**llvmpipe 是軟體渲染器，不是實體 GPU FPS。** 仍未完成 Chrome/Android/iOS 畫質與幀率驗收。

這是 Biei-inspired 的示意視覺原型，非現地 DEM、真實樹種清查或完整 Open Water 四層 FFT。

## 008 後續（保持 007 完整可回退）

- [008 樹冠 LOD／效能技能](../lake-forest-lod/SKILL.md)｜[008 可操作源碼](../../nature/demos/blue-pond-forest-008.html)。
- 提供同鏡位 007/008 比較及可選畫面解析度；目前沒有通過實機加速驗證，不可宣稱加速已完成。
