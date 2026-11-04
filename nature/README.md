# 自然景色共用規格 v0.1.0

## 使用
1. 挑選 `presets/*.json`（青池、夏季、薄霧、夕照）。
2. 需要季節時載入 `seasons/{spring,summer,autumn,winter}.json`，以 `mergeScene(base,season)` 疊加。
3. 需要漸變時用 `transitionScene(from,to,t)`（t: 0 到 1）。
4. 舊青池原型只讀 `uWind` 和 `uTurq`；可用 `toBluePondUniforms()` 做轉接。其餘季節效果要另在 Shader/地形/樹木實作。
5. `toOpenWaterWeather()` 只轉接 Open Water 天氣欄位，**不是**移植 FFT、湖岸與反射。
6. 執行 `npm test` 再做真實 WebGL/手機與畫質驗收。

## 單位與限制
- `windMps` 是 m/s、`fetchKm` 是 km；目前皆為示意設定，未由實地資料校準。
- `reflectionStrength`、`mineralScattering`、`fogDensity`、`autumnMix`、`snowCover` 是藝術參數，不等於物理濃度或測量值。
- 冬季積雪/結冰需獨立幾何與碰撞，不能只換色。
- 青池 001 有多頻正弦波與簡化反射；**尚未完成** Open Water 四層 FFT、測繪、跨裝置驗收。
- 詳見 [QA](QA.md)、[Sources](SOURCES.md)。

## 006 自然湖岸／遠方森林修正

- [可重用技能](../skills/lake-shore-naturalizer/SKILL.md)、[完整 WebGL2 實例](demos/blue-pond-landscape-006.html)、[純 JS 岸坡公式](runtime/shore-profile.mjs)。
- 保留 005 水面、樹木與季節粒子，並新增 005/006 對岸 A/B 切換；本階段仍非真實 DEM 地理還原。

## 007 森林自然化
[源碼](demos/blue-pond-forest-007.html)、[共用技能](../skills/lake-forest-canopy/SKILL.md)、[純 JS 樹林參數](runtime/forest-007.mjs)；007 只改森林與岸邊植被，不改 006 水面。
