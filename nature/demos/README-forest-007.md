# 青池 007｜混合樹冠、岸邊矮灌木及四季反射

2026-11-04；從唯讀 006 建立獨立 007。實際程式：[`blue-pond-forest-007.html`](blue-pond-forest-007.html)；[技能](../../skills/lake-forest-canopy/SKILL.md)。

**改動：** 兩層深度與不同樹距的森林；落葉松、常綠針葉、闊葉混合；多團不規則樹冠和枝棚輪廓；矮灌木、湖岸濕邊；秋冬葉色與倒影一致。保留 006 地形、原水波、枯立木、季節粒子與接觸漣漪。可使用 006/007 同鏡位切換，007 預設開啟。

**工程**：新 `grove007`、`understory007` 在主場景 `frag` 與粒子 `particleFrag` 中各有完整定義。007 啟用時不會再先計算 006 的 `woodland` 然後覆蓋。原版 `shadeWater` 未修改。

**驗證：** 本機 Node 新增 7/7 測試通過，待 GitHub CI 再驗證；Mesa EGL OpenGL ES 3.2 / GLSL ES 3.20 兩個 Program、四個 Shader 都成功編譯並連結，離屏畫面正常、`glGetError()=0`。使用 **llvmpipe 軟體渲染器**，不代表真正 GPU、手機或 Chrome FPS 驗收通過。夏秋冬為示意，並非真實美瑛青池樹木與位置測繪。

**下一關：** Android/桌機真實 WebGL2 的 FPS / p95 frame time、樹冠外觀照片比對、不同方向的岸邊遮擋。006 和更舊版本、既有洞爺湖、鄭成功地圖皆未更動。

技術參考：[美瑛觀光協會](https://www.biei-hokkaido.jp/zh/facility/shirogane-blue-pond)、[北海道官方旅遊](https://www.visit-hokkaido.jp/tw/spot/detail_10511.html)。第三方照片及模型沒有打包。原 006 水面仍為程序式多頻波紋，**沒有整合 Open Water FFT**。
