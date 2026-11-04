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