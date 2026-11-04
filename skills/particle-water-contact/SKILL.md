---
name: particle-water-contact
description: Reuse Blue Pond 005's world-space GPU particle occlusion and visual water-impact ripples without overwriting existing 3D maps or falsely claiming physics accuracy.
---

# GPU 粒子遮擋與水面接觸｜005 試驗技能

## 使用時機
當自然場景需要秋葉、飄雪或花瓣經過樹木、落到岸邊及湖面時使用。先讀 `../../AGENTS.md` 與 `../../nature/QA.md`。

## 可用程式及參數
- `../../nature/demos/blue-pond-seasons-005.html`: 完整獨立 WebGL2 示範，沿用 004 的 320 粒子和自然湖面。
- `../../nature/effects/particle-contact-v0.1.json`: 作用範圍、關閉開關、12 個候選接觸點與 QA。
- `../../nature/runtime/particle-contact.mjs`: 用於 Node/其他 AI 的可重現 CPU 接觸事件參考；真正畫面仍由 GPU Shader 決定。
- GitHub 上的 004 與 005 原始碼可直接進行版本差異比較；獨立 ZIP 套件另包含重建腳本。

## 整合方法
1. 從既有正式 3D 世界建立獨立副本，先保留所有模型與碰撞資料。
2. 粒子遮擋必須與該世界**同一相機、同一世界座標、同一地形與物件**比較，不能用螢幕隨機遮罩。
3. 自訂 WebGL 程式可沿用 005 的 `blockedByScene()`、`uImpacts`；Three.js 不可直接貼用 005 的全螢幕 Render Shader，應改用原場景深度紋理與自訂材質。
4. 湖面波紋屬視覺性法線擾動，只有近接觸時間的細環，不是衝擊導致的真實流體模擬。
5. 如發現白邊／鬼影、粒子穿樹、幀率下降，立即保留 004 並改進 005 的副本。正式世界仍維持不變。
6. 完整驗收必須包含有 GPU 的 Chrome/Edge WebGL2、桌機與行動裝置 FPS／p95、同鏡位對照及錯誤日誌。

## 限制與誠實標示
這是原型且尚未完成 GPU 視覺驗收。岸邊是 Shader 交點，不是遊戲碰撞網格；沒有落葉堆積、積雪累積、粒子流體耦合或 Open Water 四層 FFT。不要宣稱高擬真正式驗收。

## 005 Fix1：跨 Shader 函式作用域（必要工程教訓）

`treeIntersect()` 必須在**獨立粒子片段 Shader 本身**定義，不能只存在主場景 Shader。005 Fix1 已將主場景的樹木相交函式移植進 `particleFrag`。每個獨立 GLSL program 均須自己有完整的依賴；新增跨 Shader 功能必須跑實際 OpenGL ES 3.0 編譯與程式連結，再進行瀏覽器視覺／FPS 驗收。
