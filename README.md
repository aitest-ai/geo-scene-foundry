# geo-scene-foundry

可由多個 AI 共同讀取的地理 3D／自然景色技能庫。

**第一版：自然景色共享技能 v0.1.0**

- [青池 blue-pond](skills/blue-pond/SKILL.md)（**真實可執行 WebGL2 程式**：[`blue-pond-001.html`](nature/demos/blue-pond-001.html)）
- [夏季湖 lake-summer](skills/lake-summer/SKILL.md)
- [清晨薄霧 misty-morning-lake](skills/misty-morning-lake/SKILL.md)
- [夕照湖 sunset-lake](skills/sunset-lake/SKILL.md)
- [四季狀態切換 nature-season-system](skills/nature-season-system/SKILL.md)
- [開發說明](nature/README.md)、[AI 協作規則](AGENTS.md)、[品質與授權](nature/QA.md)

`npm test`：Node 20+、不需額外安裝套件。

**請注意：** `blue-pond-001.html` 是原本的多頻波與反射實驗，**並非** Open Water FFT 引擎完整移植，其他湖景目前是設計預設；任何技能不應自行覆寫既有地圖。
## 002 四季互動實驗版（待 GPU 視覺驗收）

- [青池四季互動 HTML](nature/demos/blue-pond-seasons-002.html)：青池、夏湖、薄霧、夕照＋春夏秋冬的色彩、天空與霧參數過渡，**保留 001 不變**。
- [002 技術與驗收紀錄](nature/demos/README-season-002.md)：目前 JS 靜態檢查通過，但環境 Chromium 無 WebGL2，尚未完成真實瀏覽器 GPU 測試。
