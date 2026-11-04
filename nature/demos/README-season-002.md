# 青池四季 002｜獨立互動展示

- 衍生自保留不動的 `blue-pond-001.html`；獨立 HTML 檔案。
- 加入 `uSeason`、`uFog`、`uSunWarmth`；森林秋色、冬季岸邊雪色、薄霧與夕照會在 shader 漸變。
- 主題按鈕：青池、夏湖、薄霧、夕照；四季按鈕：春／夏／秋／冬。
- 仍使用 001 的多頻正弦波、反射光線近似，**尚未移植 Open Water FFT**。
- 冬季只表示表面白化的視覺候選；沒有積雪幾何、冰水碰撞或實地測繪。
- 靜態檢查：已執行 `node --check`，通過。
- 瀏覽器 QA：本次 Chromium 無法建立 WebGL2 context；未有有效 GPU 畫面、FPS 或手機證據。**QA status: provisional/unverified**。
- 原本洞爺湖、鄭成功地圖、Vercel 網站均未改動。
