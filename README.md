# DM Capability Tree Roadmap

一個可直接部署到 GitHub Pages 的靜態互動式原型，用於管理 DM（Demand Management）Capability Tree 與季度開發／導入數量。

## 功能

- 三階 Capability Tree：
  - 一階：DM 核心模組
  - 二階：能力群組
  - 三階：功能項目
- 每個三階項目可新增多筆：
  - 年度
  - 季度
  - 數量
- 自動彙總每個模組在各年度／季度的數量
- 搜尋、全部展開、全部收合
- 本機自動保存（Browser Local Storage）
- CSV 匯出
- JSON 備份與還原
- 響應式版面，可在桌機與手機使用
- 不需後端、不需 npm、不需建置流程

## 本機開啟

最簡單的方式是直接雙擊 `index.html`。

若瀏覽器限制本機檔案功能，可在資料夾中執行：

```bash
python -m http.server 8000
```

然後開啟：

```text
http://localhost:8000
```

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 Repository。
2. 將本封裝包內的所有檔案上傳到 Repository 根目錄。
3. 進入 Repository 的 `Settings`。
4. 選擇左側 `Pages`。
5. 在 `Build and deployment`：
   - Source 選擇 `Deploy from a branch`
   - Branch 選擇 `main`
   - Folder 選擇 `/ (root)`
6. 儲存設定。
7. GitHub 會提供 Pages 網址。

## 檔案結構

```text
dm-capability-tree/
├─ index.html
├─ styles.css
├─ app.js
├─ README.md
└─ .nojekyll
```

## 資料保存方式

輸入的規劃資料保存在目前瀏覽器的 Local Storage。

這代表：

- 同一台電腦、同一個瀏覽器再次開啟時，資料仍會保留。
- 換電腦或清除瀏覽器資料後，不會自動同步。
- 建議定期使用「備份 JSON」。
- 若未來需要多人共用或帳號權限，需再接後端資料庫與登入機制。

## 自訂 Capability Tree

開啟 `app.js`，修改最上方的 `CAPABILITIES` 常數即可。每個節點都使用固定 ID，請避免重複 ID，否則已儲存的排程可能無法正確對應。
