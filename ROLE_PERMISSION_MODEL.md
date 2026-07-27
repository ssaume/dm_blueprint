# DM × SCP 角色權限模型

本模型共定義 **19 個角色**：16 個人員角色與 3 個系統服務帳號。所有 589 個細部功能均已配置功能層級角色與權限。

## 權限定義

| 權限 | English | 定義 |
|---|---|---|
| 檢視 | View | 查看功能、資料、版本、分析結果與處理歷程。 |
| 執行 | Execute | 建立任務、執行分析或規劃、處理例外、重跑與提交。 |
| 維護 | Maintain | 維護主檔、模型、政策、規則、流程、對映與排程設定。 |
| 核准 | Approve | 審查並核准版本、例外、情境、共識或發布申請。 |
| 發布 | Release | 凍結、發布或對外傳送正式版本與承諾結果。 |
| 系統管理 | Administer | 管理帳號、角色、權限、環境、安全與平台級設定。 |

## 角色清單

| 角色 | English | 類型 | 平台範圍 | 標準權限 | 配置功能數 |
|---|---|---|---|---|---:|
| 業務與客戶服務 | Sales & Customer Service | 人員 | DM、CROSS | 檢視、執行 | 120 |
| 產品經理 | Product Manager | 人員 | DM、CROSS | 檢視、執行 | 62 |
| 需求規劃人員 | Demand Planner | 人員 | DM、CROSS | 檢視、執行 | 274 |
| 需求主管 | Demand Manager | 人員 | DM、CROSS | 檢視、核准、發布 | 123 |
| 供應規劃人員 | Supply Planner | 人員 | SCP、CROSS | 檢視、執行 | 137 |
| 生管與產能規劃人員 | Production & Capacity Planner | 人員 | SCP | 檢視、執行 | 81 |
| 物料規劃與採購人員 | Material Planner & Buyer | 人員 | SCP | 檢視、執行 | 56 |
| 庫存規劃人員 | Inventory Planner | 人員 | SCP | 檢視、執行 | 37 |
| 工廠主管 | Plant Manager | 人員 | SCP、CROSS | 檢視、核准 | 76 |
| 供應鏈主管 | Supply Chain Manager | 人員 | SCP、CROSS | 檢視、核准、發布 | 137 |
| 資料治理人員 | Data Steward | 人員 | DM、SCP、CROSS | 檢視、執行、維護 | 82 |
| 供應模型管理者／IE | Supply Modeler / Industrial Engineer | 人員 | SCP | 檢視、執行、維護 | 77 |
| 資料整合工程師 | Data Integration Engineer | 人員 | DM、SCP、CROSS | 檢視、執行、維護 | 103 |
| 流程與自動化管理者 | Process & Automation Administrator | 人員 | DM、SCP、CROSS | 檢視、執行、維護 | 123 |
| 系統管理員 | System Administrator | 人員 | DM、SCP、CROSS | 檢視、系統管理 | 589 |
| 稽核與唯讀檢視者 | Auditor & Read-only Viewer | 人員 | DM、SCP、CROSS | 檢視 | 589 |
| 資料整合服務帳號 | Data Integration Service Account | 服務帳號 | DM、SCP、CROSS | 執行 | 95 |
| 規劃運算引擎服務帳號 | Planning Engine Service Account | 服務帳號 | DM、SCP、CROSS | 執行 | 181 |
| 工作流自動化服務帳號 | Workflow Automation Service Account | 服務帳號 | DM、SCP、CROSS | 執行 | 184 |

## 功能層級配置原則

每個細部功能均配置以下責任類型：

- **主責角色（OWNER）**：至少具備檢視與執行權限；主檔、模型、規則或設定型功能另具維護權限。
- **協作角色（PARTICIPANT）**：依客戶、產品、產能、物料、庫存、工廠或資料整合領域取得檢視與執行權限。
- **核准角色（APPROVER）**：僅在審查、共識、治理、凍結或發布功能中取得核准權；正式發布功能才取得發布權。
- **系統執行角色（SERVICE）**：資料整合、規劃運算與工作流服務帳號僅具執行權，不具核准或發布權。
- **治理存取（GOVERNANCE）**：系統管理員管理技術權限；稽核角色維持唯讀。

實際功能配置由 `roles.js` 產生，並在功能詳細說明中顯示角色、責任類型與權限。
