# DM × SCP 情境導向功能互動原型

這是一個不需要後端或建置工具的靜態網站。資料來源為 `產品架構.xlsx` 中的 DM 與 SCP 平台結構。

## 原型內容

- 14 個常見業務情境
- 112 個 DM／SCP 功能項目
- 情境的使用條件、預期結果、功能互動路徑
- 每個功能的前後游、跨平台與相關情境
- 關鍵字搜尋與 DM／SCP／跨平台篩選
- 響應式桌機與行動版介面

> 本原型只用於說明資訊架構與功能互動，不會執行 ATP、MPS、MRP、最佳化或真實資料交換。

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
index.html                主要頁面
styles.css                視覺樣式與響應式版面
app.js                    搜尋、篩選、抽屜與頁面互動
data.js                   從 Excel 結構轉換的功能與情境資料
.nojekyll                 避免 GitHub Pages 的 Jekyll 處理
.github/workflows/pages.yml  自動部署流程
```

## 後續維護方式

功能主資料集中在 `data.js`。若 Excel 結構更新，可重新產生此檔；畫面本身不需修改。情境資料與完整 Capability Catalog 分離，因此未納入主要情境的功能仍可在「功能目錄」中查詢。
