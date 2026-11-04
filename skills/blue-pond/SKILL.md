---
name: blue-pond
description: Create Biei-style turquoise water, standing dead trees and gentle reflections in a safe, isolated 3D prototype.
---

# 青池風湖景技能 v0.1.0

**使用時機：** 青藍色礦物散射感、枯立木、森林倒影、微風細波。
**讀取：** `../../nature/README.md`、`../../nature/QA.md`、`../../nature/presets/blue-pond.json`。

**可執行源碼：** `../../nature/demos/blue-pond-001.html`。這是之前真正製作的單檔 WebGL2 原型，含三種水面模式、拖曳鏡頭、風力與水色滑桿。

**交接工作流程：**
1. 在新副本實驗，絕不可覆寫洞爺湖、鄭成功或其他正式地圖。
2. 固定鏡位測風、波、樹影、岸線、反射；保存對照與 FPS。
3. 改善地表、樹冠與雲霧時記錄來源，不捏造測繪資料。
4. 若要四季，套用 `nature/seasons/*.json`，並另外實作對應 Shader/樹木/積雪。
5. Node 通過不代表 GPU 畫面或 Android 通過，必須實際驗收。

**界線：** 現有 001 是五組程序波與簡化反射，**不是 Open Water FFT 的移植完成**；僅視覺原型，非美瑛青池精確還原。