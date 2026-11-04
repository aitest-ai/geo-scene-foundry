# 青池 008｜樹冠 LOD 與效能模式

日期：2026-11-04，依據 007 獨立複製，任何 001–007 與既有洞爺湖等地圖均未覆寫。

## 已實作
1. grove008：先做水平範圍剔除，再運算昂貴岸坡與噪音。近層以多重不對稱小葉團、枝棚細節組成；遠層使用較少的像素細節。
2. understory008：岸草先檢查高程及水平距離，減少不可見灌木計算。
3. main frag 與獨立 particleFrag 都有同一套 grove008/understory008/treeIntersect 函式，避免 005 的跨 Shader 找不到函式錯誤重演。
4. 按鈕「008 枝葉細節／LOD」可以不改相機、季節、風和畫面解析度而回到 007 對照。
5. 提供 100%／80%／65% 畫面解析度；這是可選畫質/流暢度取捨。原本 shadeWater GLSL 完全不變。

## 測試與不可誇大之處
- 真正 Mesa llvmpipe 軟體 OpenGL ES 3.2：4 段 Shader 編譯及兩個 Program 連結 PASS，秋季/冬季離屏渲染 PASS。
- 相同 Shader、480×270、同相機與季節的實測暖機幀時間中位數，007 約 41.2ms，008 約 45.2ms；每模式只有少量樣本。008 尚未證明在相同解析度比較下更快，甚至略慢。
- 這是 llvmpipe 軟體測試，不是使用者電腦硬體 GPU 或手機 FPS；Chrome、Android、iOS 還未正式視覺與效能驗收。
- 所有畫面為程序式藝術原型、無現地 DEM 或真實樹種座標，不是完整 Open Water FFT。

## 檔案與追溯
- 008 原始碼：nature/demos/blue-pond-forest-008.html
- AI 技能：skills/lake-forest-lod/SKILL.md
- 參數：nature/effects/lake-forest-lod-008.json
- 相同畫面軟體渲染紀錄：nature/benchmarks/blue-pond-008-llvmpipe.json
- 可供別的 AI 存取的純函式：nature/runtime/forest-008.mjs
- GitHub Actions 自動測試：nature/tests/blue-pond-008.test.mjs

007 SHA-256: 9e3a562c77e475fb144149d7ddeb972531c26c7e46e4df04142a28de39b7398b
008 SHA-256: 9496ed23db8b5296e2d939c75456f78258447f632fb0bf8196f3999c2d2e362a

## 驗收建議
在同鏡位、同季節及 100% 渲染精度下，比較 007/008 樹冠、倒影和 FPS；接著試 80%/65% 選項，記錄 GPU、手機畫面及 p95 幀時間。若 008 變慢或畫質不佳，保留 007。
