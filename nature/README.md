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
