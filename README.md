# DM × SCP 情境導向功能互動原型

這是一個不需要後端或建置工具的靜態網站。原始產品結構來自 `產品架構.xlsx`，並參考本專案既有的 DM／SCP Capability Tree、ATP 分流、PPO／MAO、全球多工廠與資料整合自動化討論，將每個功能類別再展開為可執行操作與建議頻率。

## 原型內容

- 14 個常見業務情境
- 112 個 DM／SCP 功能類別
- 589 個細部可執行功能
- 每項細部功能的建議執行頻率、節奏與觸發條件
- 情境的使用條件、預期結果與功能互動路徑
- 每個功能的前後游、跨平台與相關情境
- 關鍵字、平台及執行頻率篩選
- 響應式桌機與行動版介面

> 本原型用於說明資訊架構與產品互動，不會執行 ATP、PPO、MAO、MPS、MRP、最佳化或真實資料交換。

## 執行頻率定義

| 類型 | 使用方式 |
|---|---|
| 事件觸發 | 每筆需求、訂單、供應或狀態事件發生時 |
| 持續監控 | 近即時監控與異常告警 |
| 規劃批次 | ATP、PPO、MAO、MPS、MRP或情境運算時 |
| 小時批次 | 來源更新後或每小時整合 |
| 每日 | 執行快照、日滾動計畫與品質檢查 |
| 每週 | 週需求／供應檢討與滾動規劃 |
| 每月 | S&OP、共識與管理週期 |
| 每季治理 | 模型、政策與全球標準檢討 |
| 變更時 | 主檔、規則、政策與模型異動 |
| 隨需 | 分析、模擬、調查與人工決策 |
| 核准發布 | 版本定版、客戶回覆或下游發布 |

## 本機預覽

在專案資料夾執行：

```bash
python -m http.server 8000
```

然後在瀏覽器開啟 `http://localhost:8000`。

## 部署到 GitHub Pages

### 方法 A：使用已附的 GitHub Actions

1. 建立新的 GitHub repository。
2. 將本資料夾內所有檔案推送到 `main` branch。
3. 到 repository 的 **Settings → Pages**。
4. 將 **Source** 設定為 **GitHub Actions**。
5. 推送後，`Deploy static prototype to GitHub Pages` workflow 會自動發布網站。

### 方法 B：直接從 branch 發布

1. 將檔案放在 repository 根目錄並推送到 `main`。
2. 到 **Settings → Pages**。
3. 選擇 **Deploy from a branch**。
4. Branch 選 `main`，Folder 選 `/ (root)`。

## 檔案結構

```text
index.html                   主要頁面
styles.css                   視覺樣式與響應式版面
app.js                       搜尋、平台／頻率篩選與抽屜互動
data.js                      功能類別、細部功能、頻率與情境資料
.nojekyll                    避免 GitHub Pages 的 Jekyll 處理
.github/workflows/pages.yml  自動部署流程
```

## 後續維護方式

功能、細部操作與頻率主資料集中在 `data.js`。畫面會依資料自動統計功能類別與細部功能數量。若未來把資料改由後端或資料庫管理，可保留現有前端互動，將 `data.js` 替換成 API 回傳即可。
