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

## 003｜分層秋林、岸雪與季節倒影候選

- [003 獨立互動 HTML](nature/demos/blue-pond-seasons-003.html)：兩層不規則森林、冬季岸雪微地形、秋冬反射和 002/003 同鏡位切換。
- [003 技術 QA](nature/demos/README-season-003.md)：WebGL2 實際 GPU、FPS 與手機尚未驗證；舊版 001/002 均保留。

## 004 季節粒子獨立實驗（未完成 GPU 視覺驗收）

- [004 單檔互動頁](nature/demos/blue-pond-seasons-004.html)：春花瓣、秋落葉、冬細雪，與粒子密度、暫停／開關。
- [季節粒子技能](skills/seasonal-particles/SKILL.md)｜[設定 JSON](nature/effects/seasonal-particles-v0.1.json)｜[003→004 QA](nature/demos/README-season-004.md)。
- 003 和過去版本、既有地圖／網站均保留。上述是 visual prototype，尚未通過真實 WebGL2/手機測試。

## 005｜季節粒子遮擋及水面細漣漪（實驗候選）

- [獨立 005 HTML](nature/demos/blue-pond-seasons-005.html)｜[技能](skills/particle-water-contact/SKILL.md)｜[參數](nature/effects/particle-contact-v0.1.json)｜[QA](nature/demos/README-season-005.md)。
- 005 依樹幹、岸地、森林和水面判斷遮擋，另以小範圍法線擾動呈現落水漣漪。實際 WebGL2/手機畫面未驗收，沒有完整 FFT 與物理落葉／積雪。
- 保留原始 001～004 及所有洞爺湖、鄭成功等既有專案不變。

## 青池自然景色 006｜對岸地形修復（獨立候選）

- [006 可操作 HTML](nature/demos/blue-pond-landscape-006.html)：修正 005 對岸灰白高牆，加入有界岸坡、低丘、林冠與冬雪斑塊；提供新舊地景同鏡位切換。
- [自然湖岸共用技能](skills/lake-shore-naturalizer/SKILL.md)／[006 技術文件](nature/demos/README-landscape-006.md)／[參數與 QA](nature/effects/lake-shore-006.json)。
- 001～005 和原本網站保留；已通過離屏 OpenGL ES 編譯／同鏡位渲染，但未完成 Chrome／手機性能和地理精度驗收。

## 007｜湖岸林相精修（獨立候選）

- [007 程序式湖景](nature/demos/blue-pond-forest-007.html) — 針葉／落葉松／闊葉混合樹冠、林緣矮灌木、秋冬倒影。
- [共用技能](skills/lake-forest-canopy/SKILL.md)｜[樹種預設](nature/effects/lake-forest-007.json)｜[驗收與限制](nature/demos/README-forest-007.md)。
- 001～006 和全部既有地圖均保留。GLSL ES 3.20 軟體離屏編譯與渲染通過；實體 GPU／瀏覽器／手機的 FPS 尚未驗收。
