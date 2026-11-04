---
name: seasonal-particles
description: Reuse the standalone GPU seasonal leaf, petal and snow particle layer from Blue Pond 004 in an isolated nature/3D scene, with reproducible presets and strict visual QA.
---

# 四季落物 GPU 技能 v0.1

適合新增春季落花、秋季落葉、冬季細雪及跨季節切換的自然場景。

## 接手順序
1. 先讀 `../../AGENTS.md`、`../../nature/QA.md`。
2. 取得 `../../nature/effects/seasonal-particles-v0.1.json` 和 `../../nature/demos/blue-pond-seasons-004.html` 的可執行來源。
3. 使用 `../../nature/runtime/particle-presets.mjs` 的純函式作跨引擎 CPU 參數參考；它**不是** GPU 演算法完全相同的逐像素模擬，正式畫面仍由實際 Shader 決定。
4. 若移植 Three.js，改為自訂 ShaderMaterial 或 InstancedBufferGeometry，保留原版模型與地圖。**不可建立第二個 WebGL context 覆蓋原引擎。**
5. 比較春花／秋葉／冬雪，同鏡位檢查風向、密度、色彩與消失時間。備妥 Shader 錯誤和 GPU 影片／截圖、FPS／p95、手機橫直式、碰撞與遮擋 QA。
6. 效果不合格時保持原地圖及 003、002 不變。不要將設計參數冒充實測氣象。

## 目前限制
004 是可重用的程式原型，**WebGL2 實機畫面尚未驗收**。無深度遮擋、落地碰撞、葉雪累積、真實降水或 FFT 水面完整移植。只可用於獨立試作，不能直接宣稱已通過正式遊戲品質。

## 005 可重用的遮擋與水面細波
[新技能](../particle-water-contact/SKILL.md) 與 [完整 005 範例](../../nature/demos/blue-pond-seasons-005.html) 已新增，仍屬待 GPU 驗收的試驗版本。
