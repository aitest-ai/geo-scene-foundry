---
name: lake-water-performance
description: Profile and optimize procedural WebGL2 lake scenes without sacrificing water quality, using conservative ray bounds, shoreline cutoff, compact ripple events and same-camera A/B tests.
---

# 湖景效能分析與保真優化（009）

用途：湖景、水面倒影、枯立木、樹林或季節粒子造成 FPS 偏低，又不希望降低湖面畫質時。

## 必讀

閱讀 AGENTS.md、nature/QA.md、nature/demos/README-performance-009.md 和 nature/effects/lake-water-performance-009.json；完整 008 與 009 程式存放在 nature/demos/。

## 其他 AI 的實作流程

1. 建立隔離副本，保留 001～008、原本洞爺湖與鄭成功遊戲，不碰正式部署。
2. 固定相機、時間、風、季節、粒子狀態和 100% 解析度做公平比較；不能把降低解析度當成 Shader 加速。
3. 在 treeIntersect 前，以足以包住全部枯木和枝條的寬鬆 3D bounding box 排除不可能命中的光線；盒內完整保留原樹木精確相交。主場景和粒子 fragment Shader 需要各自定義完整函式。
4. 岸坡搜尋的停止條件必須留下完整一個粗步長作地形二分細化：t > tWater + stepT。先前使用 t >= tWater 曾造成湖岸幾像素的錯誤。
5. 活躍漣漪事件集中放在 uImpacts 陣列前段，由 uImpactCount 決定 GPU 迴圈數，沒有漣漪時直接跳過。
6. 完全透明的粒子像素先剔除，再做樹木和岸地遮擋。
7. 保留 008 舊路徑，用 009 介面的「優化開／關」以及「同鏡位 A/B 實測」比較，並下載 JSON。
8. 先執行 npm test，再以真正 OpenGL ES / WebGL2 編譯、連結與同鏡位圖片逐像素檢查。畫質和效能未通過就切回 008。
9. 必須記錄改善與退步案例，不得說 009 已解決使用者的 17 FPS，除非使用者自己的硬體實測支持。

## 已知限制

009 在 Mesa llvmpipe 軟體渲染的多組夏秋冬與粒子測試，RGB 畫面差異為 0，幀時間常有改善，但有一組冬季粒子／漣漪測試反而變慢。這不是實體 GPU 或手機驗收。水體仍是程序式多頻波，不是 Leonxlnx/open-water 四層 FFT 的完整移植。