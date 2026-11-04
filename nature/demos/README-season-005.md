# Blue Pond 005｜樹林遮擋、岸線接觸與湖面細漣漪（原型）

日期：2026-11-04，基底為 **004 原版**，新增獨立 005；001～004 及所有既有洞爺湖、鄭成功部署均未改動。

## 改良內容

- `particleFrag` 內的 `blockedByScene()` 使用同一組樹幹／枝條膠囊幾何、原 003 的 `woodland()` 兩層遠景樹林、`shoreHeight()` 岸地以及 `wave()` 水面交點，判斷粒子前方有無遮擋。
- 004 的粒子生成仍由 WebGL2 `gl_VertexID` 控制；005 將其中部分粒子延伸至岸邊，遮擋在岸地後的粒子，使它們不再直接透過岸邊。
- `uImpacts[12]` 以固定種子及落下時刻生成短暫水面細波，僅對水面反射法線進行細微擾動；與外海浪花、雨滴物理、積雪堆積不同。
- 新增遮擋與水面漣漪兩個可切換控制；保留原本風力、水色、季節、粒子密度、暫停、002/003 同鏡位功能。
- 004 若粒子 Shader 編譯失敗，曾可能因為讀取 null program 的 uniform 而破壞 fallback；005 修正為 null 安全的 uniform 讀取，湖面本身應仍可運作。

## 品質限制

- 目前只有 JavaScript、程序與數學參照測試；環境的 Chromium 無法建立 WebGL2 context，無法驗證 GLSL 編譯、實際畫面、GPU FPS 與手機效能。粒子遮擋耗費額外 GPU 計算，**必須真機量測才可決定是否可用**。
- 遠方樹林用 alpha 閾值進行近似遮擋；落葉／雪落到岸邊後是立即被遮住，不會堆積。水面只有視覺細波，不是真實流體耦合。
- 未與 Three.js 或洞爺湖實際地形整合；未使用完整 Open Water FFT 系統。
- 凡有 Shader 錯誤或畫面閃爍，應停用 005 遮擋／漣漪、保持 004 副本可用。

## 測試指引

1. 瀏覽器開啟 005，等待 WebGL2 主畫面和粒子 Shader 初始化，無編譯錯誤。
2. 先選秋季，開啟粒子、遮擋和接觸漣漪，在水面近景觀察短暫環波。選冬季觀察雪花。
3. 保持同鏡位，一鍵切換遮擋關／開，確認樹幹前後層次以及湖面／岸線遮擋。
4. 測試暫停：漣漪時間也應暫停；關閉粒子應同時取消接觸漣漪。注意失去 WebGL context 時的回復。
5. 實測不同解析度與手機 GPU，記錄平均及 p95 frame time，與 004 比較；未通過不得發佈為正式效果。


## 005 Fix1：粒子 Shader treeIntersect 編譯修復（2026-11-04）

**重現問題：** `ERROR: 0:82: 'treeIntersect' : no matching overloaded function found`。主場景 `frag` 有樹木相交函式，但季節粒子使用獨立的 `particleFrag`，兩個 Shader 程式不共用函式定義。

**修正方式：** 從原版主場景直接複製 `trunkBase`、`trunkHeight`、`trunkTop`、`treeIntersect` 及其使用的共同 `rayCapsule` 依賴，放進 `particleFrag`。原本主場景與水面 Shader、001～004 未更改。

**編譯實測：** 在離屏 EGL / ANGLE OpenGL ES 3.0 環境中，005 Fix1 的主場景頂點／片段以及粒子頂點／片段 Shader 均編譯 PASS；兩組 program link 均 PASS。這是實際 GLSL 編譯，但不等於 Chrome／手機的視覺與 FPS 驗收。

**回歸防護：** 增加 Node 測試，分開解析兩個 fragment shader，確認各自包含完整樹木相交函式。以後不可再把只存在於主場景的 GLSL 函式當成粒子 Shader 可以呼叫。
