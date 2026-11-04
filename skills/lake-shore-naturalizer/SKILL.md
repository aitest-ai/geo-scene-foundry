---
name: lake-shore-naturalizer
description: Fix unnatural wall-like distant banks and triangular forests in procedural WebGL2 lake environments. Preserve the existing water; safely add bounded shoreline relief, layered foliage, and low aerial-perspective ridges. Reuse the Blue Pond 006 standalone source and compare it against unchanged 005.
---

# 自然湖岸／對岸森林重塑技能 v0.1.0

**使用時機：** 湖對岸成為筆直灰牆、高大雪壁、鋸齒三角樹林、樹影遮擋順序錯誤、岸坡與水面交界不合理時。

## 必讀
- `../../AGENTS.md`
- `../../nature/QA.md`
- `../../nature/demos/README-landscape-006.md`
- `../../nature/runtime/shore-profile.mjs`
- 完整可執行實例：`../../nature/demos/blue-pond-landscape-006.html`

## 問題與解決方式
005 的 `shoreHeight()` 將 `0.21 * (shoreline - z)` 當作遠岸高度，沒有上限，導致後方陸地一直變高，冬季渲染成一整面灰白高牆。近處陸地先和鏡頭相交，還遮蔽了後面的樹林。

006 加入 `uLandscape` 狀態，預設啟用新對岸；舊演算法只保留作為同鏡位比較：
- **地形高程**：以多段 `smoothstep` 形成濕岸→緩坡→低丘，遠距離高程有界。不要用 `sd * constant` 無限增加。
- **遠丘**：兩層低矮、不規則、帶空氣透視的丘陵；高度不是山牆。
- **森林**：在原本的獨立樹冠外再建立連續的自然林冠底層，針葉樹不再只剩等距三角形。
- **冬雪**：僅局部覆蓋有坡度的地面，保留深綠樹林與土壤陰影。
- **水面**：不修改原水色、五頻波浪、枯立木、Fresnel 反射和接觸漣漪。
- **粒子**：`particleFrag` 和主場景 `frag` 各自有 `shoreHeight` 和 `forestBaseMask`；**不要跨 GLSL program 引用未定義的函式**。

## AI 開發及驗收工作流程
1. 以 005 Fix1 為唯讀基準複製新版本，不更新既有正式遊戲或網站。
2. 讀取 006 完整源碼，用 `uLandscape=0/1` 在相同季節、鏡位、風力下比較。
3. 每次更改岸坡，核對主畫面及粒子 Shader 高度函式一致，並檢查遮擋和水面交界。
4. 使用真正的 OpenGL ES 3.0/WebGL2 編譯與連結，另外做桌機／手機畫面、FPS、不同視角與冬季測試。
5. 只在品質通過後才考慮移植到其他 3D 地圖。保留 005 和新舊畫面回退選項。

**已通過：** Node 靜態語法及 006 回歸測試、EGL/ANGLE OpenGL ES 3.0 主場景和粒子 Shader 編譯／連結、同鏡位冬季離屏畫面比較。

**未通過：** Chrome/手機實機 FPS、視角全面驗收、真實地形測繪與完整 Open Water FFT 湖面整合。這是獨立程序式景觀候選，非美瑛白金青池精確復原。
