(() => {
  'use strict';
  const data = window.PROTOTYPE_DATA;
  if (!data) return;

  const frequencyEn = {
    EVENT: ['Event-driven', 'Run immediately when each demand, order, supply, or status event is received or changed.', 'A new, changed, cancelled, converted, exception, or response event is received.'],
    CONT: ['Continuous monitoring', 'Refresh near real time, typically every 5–15 minutes; notify owners immediately for critical exceptions.', 'A process is delayed, failed, timed out, interrupted, or exceeds a threshold.'],
    RUN: ['Planning run', 'Run whenever an ATP, PPO, MAO, MPS, MRP, optimization, or scenario batch is created.', 'A new baseline, demand change, supply snapshot, or recalculation request is available.'],
    HOURLY: ['Hourly batch', 'Run hourly or after the source data is updated; cadence may vary by customer or plant.', 'A source file arrives, an API is updated, or a scheduled time is reached.'],
    DAILY: ['Daily', 'Run once per day; high-volatility plants may run once per shift or several times per day.', 'Daily close, shift close, data snapshot, or daily planning window.'],
    WEEKLY: ['Weekly', 'Run before the weekly demand or supply review, normally aligned with the rolling weekly plan.', 'Weekly planning cycle, review meeting, or weekly plan freeze.'],
    MONTHLY: ['Monthly', 'Run during the monthly S&OP or consensus cycle, with an optional mid-month rerun.', 'Monthly planning, finance alignment, or consensus review.'],
    QUARTERLY: ['Quarterly governance', 'Run quarterly, before annual planning, or when a major policy change is introduced.', 'Governance review, product-line change, organization change, or model upgrade.'],
    CHANGE: ['On change', 'Run when master data, rules, policies, models, or ownership change; review at least quarterly.', 'Create, update, deactivate, effective-date, or ownership change.'],
    ADHOC: ['On demand', 'Run manually when a user analyzes, simulates, investigates, or makes a decision.', 'A user query, assumption change, management request, or exception investigation.'],
    RELEASE: ['Approval and release', 'Run whenever a version is approved, consensus is frozen, or a plan is released.', 'Approval completed, version frozen, downstream publication, or customer response.']
  };

  const moduleActors = {
    'Unified Demand Model': ['資料治理人員', 'Data steward'],
    'Demand Data Exchange': ['資料工程師', 'Data engineer'],
    'Demand Event Center': ['需求規劃人員', 'Demand planner'],
    'Demand Analytics': ['需求規劃人員', 'Demand planner'],
    'Demand Planning Workbench': ['需求規劃人員', 'Demand planner'],
    'Demand Collaboration & Review': ['需求主管', 'Demand owner'],
    'Automation Studio': ['流程管理者', 'Process administrator'],
    'Unified Supply Model': ['供應模型管理者', 'Supply modeler'],
    'Supply Data Exchange': ['資料工程師', 'Data engineer'],
    'Supply Event Center': ['供應規劃人員', 'Supply planner'],
    'Supply Analytics': ['供應規劃人員', 'Supply planner'],
    'Supply Planning Workbench': ['供應規劃人員', 'Supply planner'],
    'Supply Collaboration & Review': ['供應鏈主管', 'Supply chain manager']
  };

  const replacements = [
    ['Forecast-to-Order', 'Forecast-to-Order'], ['Customer Delivery Location', 'Customer Delivery Location'],
    ['Frozen／Slushy／Free Zone', 'Frozen / Slushy / Free Zone'], ['Top-down／Bottom-up', 'Top-down / Bottom-up'],
    ['Sold-to／Ship-to／Bill-to／Payer', 'Sold-to / Ship-to / Bill-to / Payer'],
    ['Customer Part Number', 'Customer Part Number'], ['Internal Part Number', 'Internal Part Number'],
    ['Statistical／AI Forecast', 'Statistical / AI Forecast'], ['Firm Order、Backlog與Intercompany Order', 'Firm Order, Backlog and Intercompany Order'],
    ['Opportunity、Sample、Project與NPI Demand', 'Opportunity, Sample, Project and NPI Demand'],
    ['Safety／Strategic Demand', 'Safety / Strategic Demand'], ['Cancellation／Return Demand', 'Cancellation / Return Demand'],
    ['Baseline／Working／Consensus', 'Baseline / Working / Consensus'], ['Full／Delta', 'Full / Delta'],
    ['ATP Qty', 'ATP Quantity'], ['ATP Date', 'ATP Date'], ['Fiscal Calendar', 'Fiscal Calendar'],
    ['Customer Forecast', 'Customer Forecast'], ['Sales Forecast', 'Sales Forecast'], ['Forecast Consumption', 'Forecast Consumption'],
    ['Customer Group', 'Customer Group'], ['Demand Owner', 'Demand Owner'], ['Change Set', 'Change Set'],
    ['Reason Code', 'Reason Code'], ['Human-in-the-loop', 'Human-in-the-loop'], ['Copilot', 'Copilot'], ['Agent', 'Agent'],
    ['S&OP', 'S&OP'], ['PPO', 'PPO'], ['MAO', 'MAO'], ['MPS', 'MPS'], ['MRP', 'MRP'], ['ATP', 'ATP'],
    ['API', 'API'], ['EDI', 'EDI'], ['SFTP', 'SFTP'], ['RPA', 'RPA'], ['ERP', 'ERP'], ['CRM', 'CRM'],
    ['Excel', 'Excel'], ['PDF', 'PDF'], ['CSV', 'CSV'], ['BOM', 'BOM'], ['KPI', 'KPI'], ['SLA', 'SLA'],
    ['MAPE', 'MAPE'], ['WAPE', 'WAPE'], ['Bias', 'Bias'], ['FVA', 'FVA'], ['UOM', 'UOM'], ['Currency', 'Currency'], ['Timestamp', 'Timestamp'],
    ['建立', 'Create '], ['設定', 'Configure '], ['管理', 'Manage '], ['執行', 'Run '], ['監控', 'Monitor '],
    ['檢視', 'Review '], ['查看', 'View '], ['比較', 'Compare '], ['顯示', 'Display '], ['識別', 'Identify '],
    ['產生', 'Generate '], ['匯入', 'Import '], ['匯出', 'Export '], ['選擇', 'Select '], ['套用', 'Apply '],
    ['驗證', 'Validate '], ['追蹤', 'Track '], ['維護', 'Maintain '], ['計算', 'Calculate '], ['標示', 'Flag '],
    ['提交', 'Submit '], ['發布', 'Publish '], ['分析', 'Analyze '], ['定義', 'Define '], ['決定', 'Determine '],
    ['整合', 'Integrate '], ['轉換', 'Transform '], ['處理', 'Process '], ['分派', 'Assign '], ['回覆', 'Respond to '],
    ['核准', 'Approve '], ['調整', 'Adjust '], ['模擬', 'Simulate '], ['規劃', 'Plan '], ['搜尋', 'Search '],
    ['隔離', 'Isolate '], ['重跑', 'Rerun '], ['補數', 'Backfill '], ['鎖定', 'Lock '], ['封存', 'Archive '],
    ['還原', 'Restore '], ['撤銷', 'Undo '], ['重做', 'Redo '], ['拆分', 'Split '], ['合併', 'Merge '],
    ['聚合', 'Aggregate '], ['分群', 'Segment '], ['鑽取', 'Drill down '], ['映射', 'Map '], ['對映', 'Mapping '],
    ['客戶與商業夥伴', 'Customer and Business Partner'], ['客戶', 'Customer'], ['商業夥伴', 'Business Partner'],
    ['產品家族', 'Product Family'], ['產品線', 'Product Line'], ['產品', 'Product'], ['內部料號', 'Internal Part'], ['客戶料號', 'Customer Part'],
    ['公司', 'Company'], ['事業群', 'Business Group'], ['工廠', 'Plant'], ['倉庫', 'Warehouse'], ['供應地點', 'Supply Location'],
    ['交貨地點', 'Delivery Location'], ['服務區域', 'Service Region'], ['地點', 'Location'], ['組織', 'Organization'],
    ['規劃日曆', 'Planning Calendar'], ['時間桶', 'Time Bucket'], ['時區', 'Time Zone'], ['維度', 'Dimension'],
    ['完整性', 'Completeness'], ['生效期間', 'Effective Period'], ['需求類型', 'Demand Type'], ['需求優先級', 'Demand Priority'],
    ['人工調整', 'Manual Adjustment'], ['審批要求', 'Approval Requirement'], ['事件唯一鍵', 'Event Unique Key'], ['去重規則', 'Deduplication Rule'],
    ['事件優先級', 'Event Priority'], ['路由', 'Routing'], ['需求量', 'Demand Quantity'], ['金額', 'Amount'], ['訂單', 'Order'],
    ['預測績效', 'Forecast Performance'], ['客戶承諾', 'Customer Commitment'], ['需求風險', 'Demand Risk'], ['變異指標', 'Variability Measure'],
    ['聚合、換算與顯示規則', 'Aggregation, Conversion and Display Rules'], ['指標公式', 'Metric Formula'], ['版本一致性', 'Version Consistency'],
    ['情境', 'Scenario'], ['隔離資料區', 'Isolated Data Area'], ['版本繼承', 'Version Inheritance'], ['可見範圍', 'Visibility Scope'],
    ['版本差異', 'Version Difference'], ['替代關係', 'Replacement Relationship'], ['版本保存', 'Version Retention'], ['保留政策', 'Retention Policy'],
    ['模型完整性檢核', 'Model Integrity Check'], ['模型變更申請', 'Model Change Request'], ['測試／正式環境', 'Test / Production Environment'],
    ['模型回滾', 'Model Rollback'], ['緊急修正', 'Emergency Fix'], ['季度模型治理檢討', 'Quarterly Model Governance Review'],
    ['來源系統', 'Source System'], ['資料Owner', 'Data Owner'], ['連線', 'Connection'], ['認證', 'Authentication'], ['安全政策', 'Security Policy'],
    ['更新頻率', 'Update Frequency'], ['資料到達', 'Data Arrival'], ['樣本資料', 'Sample Data'], ['來源健康度', 'Source Health'],
    ['接收', 'Receive '], ['解壓', 'Decompress '], ['落地流程', 'Landing Flow'], ['事件觸發', 'Event Trigger'], ['批次排程', 'Batch Schedule'],
    ['Schema', 'Schema'], ['基本驗證', 'Basic Validation'], ['失敗', 'Failure'], ['重試', 'Retry'], ['正式發布', 'Production Release'],
    ['欄位', 'Field'], ['代碼', 'Code'], ['產品、客戶、組織與地點', 'Product, Customer, Organization and Location'],
    ['單位', 'Unit'], ['幣別', 'Currency'], ['日曆', 'Calendar'], ['原始值', 'Original Value'], ['資料品質', 'Data Quality'],
    ['正確性', 'Accuracy'], ['一致性', 'Consistency'], ['品質評分', 'Quality Score'], ['錯誤資料', 'Invalid Data'], ['修正任務', 'Correction Task'],
    ['批次', 'Batch'], ['狀態', 'Status'], ['延遲', 'Delay'], ['錯誤明細', 'Error Detail'], ['失敗步驟', 'Failed Step'], ['異常通知', 'Exception Notification'],
    ['營運報表', 'Operations Report'], ['接收系統', 'Receiving System'], ['格式', 'Format'], ['發布範圍', 'Publication Scope'],
    ['發布內容', 'Publication Content'], ['發布前審批', 'Pre-release Approval'], ['凍結檢查', 'Freeze Check'], ['接收確認', 'Receipt Confirmation'],
    ['資料血緣', 'Data Lineage'], ['稽核', 'Audit'], ['需求事件', 'Demand Event'], ['事件工作清單', 'Event Worklist'],
    ['需求比對', 'Demand Matching'], ['沖銷預覽', 'Consumption Preview'], ['變更前後資料', 'Before / After Data'], ['Change Type', 'Change Type'],
    ['凍結區', 'Frozen Zone'], ['政策', 'Policy'], ['衝突', 'Conflict'], ['接受', 'Accept '], ['排除', 'Exclude '],
    ['例外', 'Exception'], ['根因', 'Root Cause'], ['交付', 'Delivery'], ['數量', 'Quantity'], ['成本', 'Cost'], ['風險', 'Risk'],
    ['建議處置', 'Recommended Action'], ['替代方案', 'Alternative'], ['責任任務', 'Owner Task'], ['升級路徑', 'Escalation Path'],
    ['規劃批次', 'Planning Run'], ['資料快照', 'Data Snapshot'], ['一致性鎖定', 'Consistency Lock'], ['版本／批次編號', 'Version / Run ID'],
    ['時間軸', 'Timeline'], ['狀態變化', 'Status Change'], ['使用者操作', 'User Action'], ['留言', 'Comment'], ['附件', 'Attachment'], ['歷程', 'History'],
    ['趨勢', 'Trend'], ['當期快照', 'Current Snapshot'], ['前期', 'Prior Period'], ['前版', 'Prior Version'], ['基準差異', 'Baseline Difference'],
    ['門檻異常', 'Threshold Exception'], ['Top影響項目', 'Top Impact Items'], ['共享視圖', 'Shared View'], ['報表快照', 'Report Snapshot'],
    ['需求輪廓', 'Demand Profile'], ['行為分析', 'Behavior Analytics'], ['核心指標', 'Core Metrics'], ['警示', 'Alert'], ['行動清單', 'Action List'],
    ['可承諾數量', 'Available-to-Promise Quantity'], ['可承諾日期', 'Available-to-Promise Date'], ['配額衝突', 'Allocation Conflict'],
    ['客戶與訂單層級影響', 'Customer and Order-level Impact'], ['回覆建議', 'Response Recommendation'], ['轉SCP條件', 'SCP Escalation Criteria'],
    ['供應回覆', 'Supply Response'], ['供應影響', 'Supply Impact'], ['供應方案', 'Supply Option'], ['供應限制原因', 'Supply Constraint Cause'],
    ['共識輸入', 'Consensus Input'], ['標準與自訂報告', 'Standard and Custom Reports'], ['報表排程', 'Report Schedule'], ['訂閱', 'Subscription'],
    ['權限', 'Permission'], ['收件群組', 'Recipient Group'], ['報表使用率', 'Report Usage'], ['規劃範圍', 'Planning Scope'],
    ['版本選擇', 'Version Selection'], ['需求範圍', 'Demand Scope'], ['時間粒度', 'Time Granularity'], ['工作集', 'Workset'], ['責任人', 'Owner'],
    ['需求計畫', 'Demand Plan'], ['書籤', 'Bookmark'], ['比例分配', 'Proportional Allocation'], ['市場', 'Market'], ['促銷', 'Promotion'],
    ['業務假設', 'Sales Assumption'], ['供應網路', 'Supply Network'], ['產能', 'Capacity'], ['材料', 'Material'], ['庫存', 'Inventory'],
    ['供應商', 'Supplier'], ['途程', 'Routing'], ['資源', 'Resource'], ['瓶頸', 'Bottleneck'], ['缺料', 'Shortage'], ['安全庫存', 'Safety Stock'],
    ['補貨', 'Replenishment'], ['跨廠', 'Inter-plant'], ['委外', 'Subcontracting'], ['最佳化', 'Optimization'], ['求解器', 'Solver'],
    ['限制', 'Constraint'], ['目標函數', 'Objective Function'], ['不可行', 'Infeasible'], ['放寬', 'Relaxation'], ['計畫工單', 'Planned Order'],
    ['採購建議', 'Purchase Recommendation'], ['計畫庫存', 'Plan Inventory'], ['共識', 'Consensus'], ['審查', 'Review'], ['會議', 'Meeting'],
    ['人工覆核', 'Human Review'], ['自動化工作流', 'Automation Workflow'], ['排程', 'Schedule'], ['通知', 'Notification'], ['逾時', 'Timeout'],
    ['工作', 'Job'], ['結果', 'Result'], ['資料', 'Data'], ['模型', 'Model'], ['規則', 'Rule'], ['版本', 'Version'], ['是否放行', 'Whether to Release'], ['決定', 'Determine '], ['放行', 'Release'], ['血緣', 'Lineage'], ['去重', 'Deduplicate '], ['優先級', 'Priority'], ['影響範圍', 'Impact Scope'], ['留言', 'Comment'], ['決策紀錄', 'Decision Record'], ['決策', 'Decision'], ['重複', 'Duplicate'], ['內', 'Within '], ['沖銷後', 'Post-consumption '], ['項目', 'Item'], ['處置結果', 'Resolution Result'], ['處置', 'Resolution'], ['結果', 'Result'], ['需求增減', 'Demand Increase / Decrease'], ['增減', 'Increase / Decrease'], ['輸入', 'Enter '], ['缺口', 'Gap'], ['留在', 'Keep in '], ['送SCP', 'Send to SCP '], ['送入', 'Send to '], ['送出', 'Submit'], ['方案', 'Option'], ['各', 'Each '], ['期望', 'Expected '], ['使用版本', 'Used Version'], ['使用', 'Use '], ['預計完成', 'Expected Completion'], ['預計', 'Expected '], ['重新提交', 'Resubmit'], ['重新', 'Re-'], ['不同', 'Different '], ['可接受', 'Acceptable'], ['承諾', 'Commitment'], ['異議', 'Objection'], ['主管', 'Manager'], ['商務', 'Commercial'], ['符合', 'Comply with '], ['樣本', 'Sample'], ['重播', 'Replay'], ['以', 'Using '], ['可用', 'Available'], ['要求', 'Requirement'], ['使用率', 'Usage Rate'], ['覆核量', 'Review Volume'], ['告警', 'Alert'], ['至', 'to '], ['範本', 'Template'], ['權限', 'Permission'], ['計畫', 'Plan'], ['錯誤', 'Error'], ['異常', 'Exception'], ['標記', 'Flag'], ['供應', 'Supply'], ['需求版本', 'Demand Version'], ['穩定度', 'Stability'], ['差異與穩定度', 'Delta and Stability'], ['分析範圍', 'Analytics Scope'], ['跨層級', 'Cross-level'], ['換算', 'Conversion'], ['正式規劃環境', 'Production Planning Environment'], ['治理', 'Governance'], ['執行權限', 'Execution Permission'], ['工作中', 'Working'], ['已發布', 'Published'], ['有限／無限結果', 'Finite / Infinite Results'], ['定位', 'Locate '], ['記錄', 'Record '], ['在途', 'In-transit'], ['工單', 'Work Order'], ['轉撥', 'Transfer'], ['評估', 'Evaluate '], ['缺料處置', 'Shortage Resolution'], ['診斷', 'Diagnose '], ['放寬建議', 'Relaxation Recommendation'], ['放寬', 'Relax '], ['穩定度', 'Stability'], ['已有', 'Existing '], ['跨廠', 'Inter-plant'], ['可提交', 'Submittable'], ['需', 'Require '], ['退回重算', 'Return for Recalculation'], ['鎖定', 'Lock '], ['提出', 'Propose '], ['生效日期', 'Effective Date'], ['回寫', 'Write Back '], ['責任', 'Ownership'], ['加急選項', 'Expedite Option'], ['配額', 'Allocation'], ['接收DM', 'Receive DM '], ['決策問題', 'Decision Question'], ['回傳', 'Return '], ['可行量', 'Feasible Quantity'], ['協調', 'Coordinate '], ['彙整', 'Consolidate '], ['下游', 'Downstream'], ['執行系統', 'Execution System'], ['人工核准', 'Human Approval'], ['動作', 'Action'], ['接受', 'Accept '], ['拒絕', 'Reject '], ['覆核', 'Review'], ['等待', 'Wait'], ['風險', 'Risk'], ['成本', 'Cost'], ['新增', 'Add '], ['變更', 'Change '], ['取消', 'Cancel '], ['保留', 'Retain '], ['修正', 'Correction '], ['改善', 'Improvement '], ['撤回', 'Withdraw '], ['新版', 'New Version '], ['端到端', 'End-to-end '], ['使用者', 'User '], ['異動', 'Change '], ['物件', 'Object'], ['證據', 'Evidence'], ['紀錄', 'Record'], ['相關', 'Related '], ['嚴重度', 'Severity'], ['自動', 'Automatic '], ['協作者', 'Collaborator'], ['未接單', 'Unaccepted'], ['逾期', 'Overdue'], ['連結', 'Link '], ['衍生', 'Derived '], ['相依需求', 'Dependent Demand'], ['相依關係', 'Dependency'], ['相依', 'Dependency'], ['淨', 'Net '], ['未變', 'Unchanged '], ['關閉', 'Close '], ['重啟', 'Reopen '], ['啟動', 'Start '], ['恢復', 'Restore '], ['複製', 'Copy '], ['歷史', 'Historical '], ['變動', 'Changed '], ['每日', 'Daily '], ['每週', 'Weekly '], ['每月', 'Monthly '], ['單筆', 'Single-record '], ['屬性', 'Attribute'], ['權重', 'Weight'], ['適用', 'Applicable '], ['實現度', 'Realization'], ['統計', 'Statistical '], ['從', 'From '], ['提前', 'Expedite '], ['延後', 'Delay '], ['參與者', 'Participant'], ['保存', 'Save '], ['尋找', 'Find '], ['供應點', 'Supply Location'], ['判定', 'Determine '], ['全面', 'Full '], ['快照', 'Snapshot'], ['並列', 'Side-by-side '], ['服務', 'Service'], ['營收', 'Revenue'], ['敏感度', 'Sensitivity'], ['關鍵', 'Key '], ['選定', 'Select '], ['建議方案', 'Recommended Option'], ['建議', 'Recommendation'], ['理由', 'Rationale'], ['必要', 'Required '], ['說明', 'Explanation'], ['直接', 'Directly '], ['期限', 'Due Date'], ['待辦', 'Task'], ['轉派', 'Reassign '], ['共同', 'Collaborative '], ['個人', 'Individual'], ['團隊', 'Team'], ['負荷', 'Workload'], ['完成率', 'Completion Rate'], ['案件', 'Case'], ['參與角色', 'Participant Role'], ['意見', 'Comment'], ['條件', 'Condition'], ['補件要求', 'Additional Information Request'], ['補件', 'Additional Information'], ['退回', 'Return '], ['下一', 'Next '], ['協同', 'Collaboration'], ['行動', 'Action'], ['解除', 'Resolution'], ['回寫', 'Write Back '], ['提出', 'Propose '], ['增班', 'Add Shift'], ['轉線', 'Transfer Line'], ['可承諾', 'Committed '], ['責任人', 'Owner'], ['分配', 'Allocation'], ['優先需求', 'Priority Demand'], ['接收', 'Receive '], ['可行量', 'Feasible Quantity'], ['供需', 'Supply-demand'], ['前提', 'Assumption'], ['表決', 'Vote'], ['裁決', 'Adjudication'], ['授權', 'Authorization'], ['再開', 'Reopen'], ['執行物件', 'Execution Object'], ['反向', 'Reverse '], ['舊版', 'Previous Version'], ['條件、判斷與動作', 'Condition, Decision and Action'], ['優先順序', 'Priority Order'], ['命中率', 'Hit Rate'], ['失效', 'Invalid'], ['任務', 'Task'], ['分支', 'Branch'], ['回圈', 'Loop'], ['表單', 'Form'], ['系統動作', 'System Action'], ['正常', 'Normal'], ['暫停', 'Pause'], ['對象', 'Recipient'], ['頻道', 'Channel'], ['內容範本', 'Content Template'], ['告警抑制', 'Alert Suppression'], ['健康度', 'Health'], ['容量', 'Capacity'], ['知識', 'Knowledge'], ['工具', 'Tool'], ['提示範本', 'Prompt Template'], ['角色情境', 'Role Scenario'], ['引用', 'Citation'], ['解釋', 'Explanation'], ['新鮮度', 'Freshness'], ['品質', 'Quality'], ['安全', 'Safety'], ['幻覺', 'Hallucination'], ['採納率', 'Adoption Rate'], ['回饋', 'Feedback'], ['目標', 'Objective'], ['記憶', 'Memory'], ['預算', 'Budget'], ['停止條件', 'Stop Condition'], ['沙箱', 'Sandbox'], ['多步驟', 'Multi-step'], ['行為', 'Behavior'], ['必須', 'Required '], ['高風險', 'High-risk'], ['信心門檻', 'Confidence Threshold'], ['自動／人工分流', 'Automatic / Human Routing'], ['畫面', 'Screen'], ['必要證據', 'Required Evidence'], ['修改', 'Modify '], ['等待時間', 'Wait Time'], ['繞過', 'Bypass'], ['跳過', 'Skip '], ['人工接管', 'Human Takeover'], ['成功率', 'Success Rate'], ['治理報告', 'Governance Report'], ['營運', 'Operations'], ['供應商', 'Supplier'], ['委外商', 'Subcontractor'], ['物流', 'Logistics'], ['零件', 'Part'], ['模組', 'Module'], ['Transportation Lane', 'Transportation Lane'], ['模式', 'Mode'], ['前置期', 'Lead Time'], ['路徑', 'Path'], ['依賴', 'Dependency'], ['循環', 'Cycle'], ['多階', 'Multi-level'], ['用量', 'Usage'], ['替代料', 'Substitute Material'], ['比例', 'Ratio'], ['共同料', 'Common Material'], ['虛擬件', 'Phantom Item'], ['套件', 'Kit'], ['失效', 'Invalid'], ['孤兒', 'Orphan'], ['製程', 'Process'], ['順序', 'Sequence'], ['產線', 'Production Line'], ['機台', 'Machine'], ['人力', 'Labor'], ['治工具', 'Tooling'], ['標準工時', 'Standard Time'], ['節拍', 'Takt Time'], ['產出率', 'Throughput'], ['良率', 'Yield'], ['損耗', 'Scrap'], ['重工', 'Rework'], ['聯產品', 'Co-product'], ['班別', 'Shift'], ['停機', 'Downtime'], ['保養', 'Maintenance'], ['臨時產能', 'Temporary Capacity'], ['料件', 'Material'], ['採購前置期', 'Procurement Lead Time'], ['交期日曆', 'Delivery Calendar'], ['委外加工', 'Subcontract Processing'], ['代工', 'Contract Manufacturing'], ['外包材料責任', 'Outsourced Material Responsibility'], ['同步', 'Synchronize '], ['採購單', 'Purchase Order'], ['協議', 'Agreement'], ['回覆', 'Response'], ['庫存分配', 'Inventory Allocation'], ['可用性', 'Availability'], ['跨層級', 'Cross-level'], ['有限／無限', 'Finite / Infinite'], ['求解策略', 'Solver Strategy'], ['全球', 'Global'], ['展開', 'Explode '], ['在途', 'In-transit'], ['採購供應', 'Purchase Supply'], ['無限產能', 'Infinite Capacity'], ['有限產能', 'Finite Capacity'], ['人工調整', 'Manual Adjustment'], ['展料', 'Material Explosion'], ['晚料', 'Late Material'], ['超量供應', 'Excess Supply'], ['轉撥', 'Transfer'], ['外包', 'Outsourcing'], ['緊急採購', 'Expedited Procurement'], ['材料分配', 'Material Allocation'], ['改期', 'Reschedule'], ['拆單', 'Split Order'], ['部分供應', 'Partial Supply'], ['求解設定', 'Solver Configuration'], ['引擎', 'Engine'], ['整合求解', 'Integrated Solving'], ['硬限制', 'Hard Constraint'], ['軟限制', 'Soft Constraint'], ['求解時間', 'Solve Time'], ['收斂', 'Convergence'], ['無解', 'Infeasibility'], ['服務水準', 'Service Level'], ['需求滿足率', 'Demand Fulfillment Rate'], ['可行性', 'Feasibility'], ['加班', 'Overtime'], ['加急', 'Expedite'], ['代價', 'Cost'], ['擾動', 'Disruption'], ['差異根因', 'Difference Root Cause'], ['推薦方案', 'Recommended Option'], ['Policy', 'Policy'], ['已有處置', 'Has Resolution'], ['可提交', 'Submittable'], ['例外審查', 'Exception Review'], ['重算', 'Recalculation'], ['工作中', 'Working'], ['已發布', 'Published'], ['註解', 'Annotation'], ['負荷與完成率', 'Workload and Completion Rate'], ['日期與屬性', 'Date and Attribute'], ['有效期間', 'Effective Period'], ['角色', 'Role'], ['對照', 'Mapping'], ['參與', 'Participation'], ['改版', 'Revision'], ['指標', 'Metric'], ['審批', 'Approval'], ['登錄', 'Register '], ['測試', 'Test '], ['停用', 'Deactivate '], ['設計', 'Design '], ['流程', 'Flow'], ['版本化', 'Versioning'], ['沖銷', 'Consumption'], ['錯誤', 'Error'], ['評分', 'Scoring'], ['時間', 'Time'], ['筆數', 'Record Count'], ['交易', 'Transaction'], ['回執', 'Receipt'], ['重送', 'Resend'], ['差異', 'Difference'], ['並', ' and '], ['來源', 'Source'], ['原始', 'Original'], ['比對', 'Match '], ['預覽', 'Preview '], ['檢查', 'Check '], ['回滾', 'Rollback'], ['分類', 'Classify '], ['確認', 'Confirm '], ['量化', 'Quantify '], ['影響', 'Impact'], ['範圍', 'Scope'], ['基準', 'Baseline'], ['唯一', 'Unique'], ['完成', 'Completion'], ['後續', 'Next-step'], ['草稿', 'Draft'], ['按', 'By '], ['行為', 'Behavior'], ['關聯', 'Related'], ['日期', 'Date'], ['將', ''], ['需求', 'Demand'], ['追查', 'Trace '], ['形成', 'Form '], ['前後', 'Before and After'], ['幅度', 'Magnitude'], ['假設', 'Assumption'], ['載入', 'Load '], ['既有計畫', 'Current Plan'], ['方案回傳', 'Option Return'], ['原', 'Original '], ['更新', 'Update '], ['分享', 'Share '], ['數據', 'Data'], ['蒐集', 'Collect '], ['單位', 'Unit'], ['申請', 'Request'], ['附加', 'Attach '], ['排隊', 'Queued'], ['原因', 'Cause'], ['彙整', 'Consolidate '], ['拒絕', 'Reject '], ['再議', 'Renegotiate'], ['責任', 'Responsibility'], ['提醒', 'Reminder'], ['升級', 'Escalation'], ['報表', 'Report'], ['相依', 'Dependency'], ['並行', 'Parallelism'], ['耗時', 'Duration'], ['階層', 'Hierarchy'], ['區域', 'Region'], ['有效日期', 'Effective Date'], ['主檔', 'Master Data'], ['粒度', 'Granularity'], ['節點', 'Node'], ['供應關係', 'Supply Relationship'], ['跨區', 'Cross-region'], ['替代', 'Alternate'], ['供應來源', 'Source of Supply'], ['群組', 'Group'], ['批量', 'Lot Size'], ['目標', 'Target'], ['上限', 'Upper Limit'], ['呆滯', 'Obsolescence'], ['效期', 'Shelf Life'], ['未轉PO的', 'Not Converted to PO '], ['人工協同', 'Human Collaboration'], ['繼承', 'Inheritance'], ['緊急停用', 'Emergency Deactivation'], ['事件', 'Event'],
    ['與', ' and '], ['及', ' and '], ['或', ' or '], ['、', ', '], ['／', ' / '], ['至', ' to ']
  ].sort((a, b) => b[0].length - a[0].length);


  const explicitTitleTranslations = {
    '比較變動需求與既有供應計畫':'Compare Changed Demand with the Current Supply Plan',
    '顯示凍結區、異常與未處理事件':'Display Frozen-zone Exceptions and Unprocessed Events',
    '計算可承諾量、日期與缺口':'Calculate ATP Quantity, Date, and Gap',
    '尋找既有計畫內的替代日期或供應點':'Find an Alternate Date or Supply Location within the Current Plan',
    '判定可直接提交或需例外審批':'Determine Direct Submission or Exception Approval',
    '鎖定結果並觸發下一流程':'Lock the Result and Trigger the Next Workflow',
    '指定期望方案與回覆期限':'Specify the Expected Option and Response Due Date',
    '檢查回覆是否符合商務與授權政策':'Check Response Compliance with Commercial and Authorization Policies',
    '執行業務與主管審查':'Run Sales and Management Review',
    '定義事件來源、Schema與唯一鍵':'Define Event Source, Schema, and Unique Key',
    '設定觸發條件、記憶與任務計畫':'Configure Trigger Conditions, Memory, and Task Plan',
    '在沙箱模擬多步驟任務':'Simulate a Multi-step Task in the Sandbox',
    '定義必須人工核准的高風險動作':'Define High-risk Actions Requiring Human Approval',
    '建立工廠至倉庫與跨區補貨關係':'Create Plant-to-Warehouse and Cross-region Replenishment Relationships',
    '建立多階BOM與用量關係':'Create Multi-level BOM and Usage Relationships',
    '設定事件嚴重度、影響門檻與SLA':'Configure Event Severity, Impact Threshold, and SLA',
    '識別需建立PPO／MAO規劃批次的範圍':'Identify the Scope Requiring a PPO / MAO Planning Run',
    '模擬庫存轉撥與保留策略':'Simulate Inventory Transfer and Reservation Policies',
    '查看需求至供應的差異根因':'View Demand-to-Supply Difference Root Causes',
    '檢查瓶頸與缺料是否已有處置':'Check Whether Bottlenecks and Shortages Have Resolutions'
  };

  function translateName(input, fallback) {
    if (explicitTitleTranslations[input]) return explicitTitleTranslations[input];
    let out = String(input || '');
    replacements.forEach(([zh, en]) => { out = out.split(zh).join(en); });
    out = out.replace(/[。；：]/g, '').replace(/，/g, ', ').replace(/（/g, ' (').replace(/）/g, ')').replace(/\s+/g, ' ').trim();
    const chinese = (out.match(/[\u3400-\u9fff]/g) || []).length;
    if (!out || chinese > 0) return fallback;
    return out.replace(/([a-z)])([A-Z])/g, '$1 $2').replace(/\s+,/g, ',').replace(/,+/g, ',').replace(/\s+\//g, ' /').replace(/\s+and\s+and\s+/g, ' and ').replace(/\s+/g, ' ').trim();
  }

  function automationMode(f) {
    const text = `${f.nameZh} ${f.description}`;
    const human = /選擇|調整|審查|核准|確認|接受|排除|輸入|決策|回覆|Commit|協同|會議|留言|人工|覆核|設定|建立|管理|維護|設計/.test(text);
    const system = /計算|監控|偵測|驗證|比對|轉換|匯入|匯出|產生|展開|通知|分派|排程|執行|同步|映射|評分|識別|追蹤|發布/.test(text);
    if (f.frequencyCode === 'CONT' || f.frequencyCode === 'HOURLY') return human ? 'HYBRID' : 'AUTO';
    if (f.frequencyCode === 'ADHOC') return 'MANUAL';
    if (f.frequencyCode === 'RELEASE') return 'HYBRID';
    if (f.frequencyCode === 'CHANGE' || f.frequencyCode === 'QUARTERLY') return system ? 'HYBRID' : 'MANUAL';
    if (f.frequencyCode === 'EVENT' || f.frequencyCode === 'RUN' || f.frequencyCode === 'DAILY') return human ? 'HYBRID' : 'AUTO';
    if (f.frequencyCode === 'WEEKLY' || f.frequencyCode === 'MONTHLY') return human ? 'HYBRID' : 'AUTO';
    return system ? 'AUTO' : 'HYBRID';
  }

  const scenarioEn = {
    'dm-new-source': ['Data onboarding', 'Routine', 'Add a new customer forecast or external demand source', 'A customer, sales team, or external platform provides a new FCST or order format that must be securely onboarded and standardized in DM.', ['Add a customer or plant data source', 'The source fields, units, or delivery cadence change', 'An existing RPA process must be formally governed'], ['A monitored demand-data ingestion pipeline', 'Standard data aligned to the unified demand model', 'Traceable data-quality errors and lineage']],
    'dm-demand-event': ['Event handling', 'Real time', 'Customer updates, delays, or cancels demand', 'A demand change is classified, matched against the current plan, consumed where appropriate, and converted into a traceable demand-plan version.', ['A customer adds, delays, or cancels demand', 'Forecast converts to PO or a forecast version changes', 'The same demand may be duplicated or require consumption'], ['A classified and assigned demand event', 'Demand matching and consumption preview', 'A traceable new demand version']],
    'dm-demand-risk': ['Analytics', 'Exception', 'Demand volatility exceeds thresholds or forecast performance declines', 'The team separates customer behavior, forecast error, and major one-off events to decide whether the demand plan should be changed.', ['WoW or MoM change exceeds a threshold', 'Bias, MAPE, or conversion rate deteriorates', 'Risk concentration rises for a customer or product'], ['Segmented demand variance and root causes', 'A prioritized risk list', 'Findings ready for the planning workbench']],
    'dm-plan-adjust': ['Planning decision', 'Cycle', 'Adjust and compare demand-plan versions', 'Planners start from a baseline, add commercial assumptions and manual adjustments, compare scenarios, and submit a governed plan for review.', ['Weekly or monthly demand-planning cycle', 'NPI, promotion, or project probability changes', 'Management requests alternative growth assumptions'], ['Demand adjustments with reasons and assumptions', 'Comparable planning scenarios', 'A policy-checked plan ready for review']],
    'dm-atp-check': ['Rapid commitment', 'Real time', 'Sales needs a fast demand-commitment check', 'When the change can be evaluated against an existing supply plan, DM performs a rapid ATP impact check before triggering a full SCP replanning run.', ['A customer asks to expedite, increase, or reschedule demand', 'A commitment response is needed quickly', 'The change is not yet large enough for full supply replanning'], ['Rapid ATP impact assessment', 'Commit, partial commit, or simulate classification', 'Exceptions routed into collaboration']],
    'cross-simulation': ['Cross-platform simulation', 'Major', 'Demand change exceeds ATP and requires full SCP simulation', 'DM sends the governed demand version, assumptions, and due date to SCP. SCP solves capacity, material, inventory, and optimization constraints and returns comparable alternatives.', ['ATP cannot commit or multiple plants are affected', 'The change involves capacity, BOM, purchasing, or alternative sourcing', 'Cost, service, and risk trade-offs must be compared'], ['A formal cross-platform simulation task', 'Comparable supply alternatives and constraint causes', 'A shared demand-and-supply decision version']],
    'scp-new-model': ['Model governance', 'Project', 'Add a plant, product line, or inter-plant supply relationship', 'New plants, subcontracting relationships, BOMs, lines, or suppliers are added to a governed supply network and capability model.', ['A plant or production location is added', 'Plant A output becomes a component for Plant B', 'Subcontracting, alternate sourcing, or BOM structure changes'], ['An explorable global supply-network model', 'Consistent BOM, routing, capacity, and purchasing relationships', 'A governed model version available to planning']],
    'scp-supply-event': ['Event handling', 'Real time', 'A supply change requires multi-level impact expansion', 'Equipment downtime, supplier delay, order changes, or inventory adjustments are expanded through the multi-level BOM and current supply plan.', ['Equipment, capacity, or calendar changes', 'Supplier quantity or due date changes', 'Inventory, work order, or inter-plant supply changes'], ['Multi-level supply-event impact', 'A classified change set and exception list', 'A new planning run']],
    'scp-capacity': ['Capacity planning', 'Major', 'Finite and infinite simulations expose a capacity bottleneck', 'Infinite load is compared with finite-capacity feasibility to locate constrained resources, periods, gaps, and adjustment options.', ['Demand load exceeds available capacity', 'Multiple plants compete for the same constrained resource', 'Commitment requires overtime, transfer, or outsourcing'], ['Bottleneck resources, periods, and gaps', 'A feasible MPS and alternate capacity options', 'Owner commitments and unresolved constraints']],
    'scp-material': ['Material planning', 'Major', 'MRP expansion identifies shortages or supply delay', 'Multi-level shortages are analyzed using substitution, expediting, transfer, allocation, and replenishment options with purchasing and production control.', ['A critical component is short or late', 'A demand change alters purchasing quantity or timing', 'A shared component must be allocated across products or plants'], ['Shortage impact from components to orders and customers', 'Alternative supply and replenishment options', 'Agreed procurement and production actions']],
    'scp-inventory': ['Inventory policy', 'Cycle', 'Service level and inventory risk are out of balance', 'Safety-stock and replenishment policies are reviewed when variability, lead time, or supply uncertainty causes excess or shortage risk.', ['Inventory value or obsolescence risk increases', 'Service level drops or shortages recur', 'Lead time, MOQ, or replenishment cadence changes'], ['Inventory risk segments and drivers', 'Alternative inventory and replenishment policies', 'Cost and service-level comparison']],
    'scp-optimize': ['Solution design', 'Cycle', 'Optimize supply across multiple plants and constraints', 'The solver considers capacity, material, inventory, inter-plant flows, cost, and service objectives to produce feasible alternatives and explain infeasibility.', ['Manual adjustment cannot manage the number of constraints', 'The business compares cost-first, service-first, or stability-first objectives', 'A changed scenario must be solved again at detail level'], ['Configurable solver objectives and constraints', 'Candidate supply plans with KPIs', 'Infeasible constraints and relaxation suggestions']],
    'scp-release': ['Review and release', 'Cycle', 'Freeze and release the approved supply plan', 'After bottleneck, shortage, scenario, and consensus review, a supply-plan version is approved and published to execution systems.', ['The planning cycle is ready to freeze', 'Major exceptions are resolved or accepted', 'MPS, replenishment, or purchase recommendations must be released'], ['An approved supply-plan version', 'Publication status and receipt records', 'A complete review, consensus, and change trail']],
    'automation-exception': ['Automation governance', 'Exception', 'The same data or planning exception repeats', 'Repeated event detection, decision thresholds, task assignment, notification, and human review are converted into a monitored automation flow.', ['The same issue requires repeated manual judgment', 'Exceptions are delayed by missed notices or SLA breaches', 'Copilot or agents are introduced while human control remains'], ['An event-driven automation workflow', 'Defined AI, agent, and human-review boundaries', 'Execution monitoring, notifications, and audit logs']]
  };

  const journeyEn = {
    signal: ['1. Demand signal arrives', 'External forecasts, orders, and changes are ingested, transformed, and validated.'],
    'demand-decision': ['2. Interpret and adjust demand', 'Analyze demand changes, apply assumptions, and form a demand version ready for evaluation.'],
    handoff: ['3. Request cross-platform simulation', 'When ATP is insufficient, send the governed demand version and evaluation conditions to SCP.'],
    'supply-plan': ['4. Expand and plan supply', 'SCP expands BOM, capacity, material, inventory, and inter-plant impacts.'],
    resolution: ['5. Resolve constraints and solve', 'Generate alternatives and optimized responses for bottlenecks, shortages, and inventory risk.'],
    consensus: ['6. Reach consensus, return, and release', 'DM and SCP compare results, agree on the response, and release the supply plan.']
  };

  Object.entries(frequencyEn).forEach(([code, en]) => {
    let item = data.meta.frequencyGuide.find(x => x.code === code);
    if (!item) {
      item = { code, label: ({ HOURLY:'小時批次', QUARTERLY:'每季治理' }[code] || en[0]), description: en[1] };
      data.meta.frequencyGuide.push(item);
    }
    item.labelEn = en[0];
    item.descriptionEn = en[1];
  });

  data.capabilities.forEach(c => {
    c.whenEn = `Use ${c.nameEn} when the organization must define, review, analyze, execute, or govern this part of the ${c.moduleEn} process.`;
    c.resultEn = `${c.nameEn} produces a governed output that can be reused by downstream events, analytics, planning, collaboration, or publication activities.`;
    const actor = moduleActors[c.moduleEn] || (c.platform === 'DM' ? ['需求規劃人員', 'Demand planner'] : ['供應規劃人員', 'Supply planner']);
    c.detailedFunctions.forEach((f, index) => {
      const fallbackName = `${c.nameEn} — Operational Step ${index + 1}`;
      f.nameEn = f.nameEn || translateName(f.nameZh, fallbackName);
      f.descriptionEn = translateName(f.description, `Performs ${f.nameEn} within ${c.nameEn}, using the configured data scope, rules, version, and governance controls.`);
      const freq = frequencyEn[f.frequencyCode] || ['Operational cadence', f.frequencyDetail, f.trigger];
      f.frequencyTypeEn = freq[0];
      f.frequencyDetailEn = freq[1];
      f.triggerEn = freq[2];
      f.executionMode = automationMode(f);
      const modeText = {
        MANUAL: ['人工執行', 'Human-required'],
        AUTO: ['系統自動', 'System automated'],
        HYBRID: ['人機協作', 'Human-system collaboration']
      }[f.executionMode];
      f.executionModeZh = modeText[0];
      f.executionModeEn = modeText[1];
      const triggerShort = String(f.trigger || '需要處理此項業務時').replace(/[。；].*$/, '');
      if (f.executionMode === 'AUTO') {
        f.useCaseZh = `當${triggerShort}時，系統自動執行「${f.nameZh}」：${f.description}若執行失敗或超過門檻，則通知${actor[0]}處理例外。`;
        f.useCaseEn = `When ${f.triggerEn.replace(/[.]+$/, '').toLowerCase()}, the system automatically runs ${f.nameEn}. Exceptions, failures, or threshold breaches are routed to the ${actor[1].toLowerCase()}.`;
        f.automationNoteZh = '可依事件或排程自動執行，人員主要處理告警與例外。';
        f.automationNoteEn = 'Can run from an event or schedule; people mainly handle alerts and exceptions.';
      } else if (f.executionMode === 'MANUAL') {
        f.useCaseZh = `${actor[0]}在${triggerShort}時使用「${f.nameZh}」，${f.description}系統負責檢核輸入、權限、版本與操作紀錄。`;
        f.useCaseEn = `When ${f.triggerEn.replace(/[.]+$/, '').toLowerCase()}, the ${actor[1].toLowerCase()} uses ${f.nameEn} to make or record the required business decision. The system validates inputs, access, version, and audit history.`;
        f.automationNoteZh = '需要使用者判斷、輸入或操作，系統提供檢核與留痕。';
        f.automationNoteEn = 'Requires user judgment or input; the system provides validation and auditability.';
      } else {
        f.useCaseZh = `當${triggerShort}時，系統先準備「${f.nameZh}」所需資料或計算結果；${actor[0]}再依${f.description}確認例外、調整內容或核准結果。`;
        f.useCaseEn = `When ${f.triggerEn.replace(/[.]+$/, '').toLowerCase()}, the system prepares the data or calculation for ${f.nameEn}; the ${actor[1].toLowerCase()} then reviews exceptions, adjusts the outcome, or approves the result.`;
        f.automationNoteZh = '系統可自動準備或運算，但需要人員確認、調整或核准。';
        f.automationNoteEn = 'The system prepares or calculates the result, while a person reviews, adjusts, or approves it.';
      }
    });
  });

  data.scenarios.forEach(s => {
    const en = scenarioEn[s.id];
    if (!en) return;
    [s.stageEn, s.severityEn, s.titleEn, s.summaryEn, s.triggerEn, s.resultsEn] = en;
    s.actorsEn = s.actors.map(a => ({
      '資料管理者':'Data steward','業務':'Sales','Demand Planner':'Demand planner','系統管理者':'System administrator',
      '業務主管':'Sales manager','產品主管':'Product manager','產品經理':'Product manager','客戶服務':'Customer service',
      'Supply Planner':'Supply planner','生管':'Production control','採購':'Procurement','業務主管':'Sales manager',
      'Supply Modeler':'Supply modeler','工廠 IE':'Plant IE','工廠窗口':'Plant coordinator','生管主管':'Production-control manager',
      '工廠主管':'Plant manager','IE':'Industrial engineer','Material Planner':'Material planner','供應商管理':'Supplier management',
      '庫存管理':'Inventory management','財務':'Finance','供應鏈主管':'Supply chain manager','採購主管':'Procurement manager',
      '流程管理者':'Process administrator','資料管理者':'Data steward','Planner':'Planner'
    }[a] || a));
  });

  data.journey.forEach(j => {
    const en = journeyEn[j.id];
    if (en) { j.titleEn = en[0]; j.descriptionEn = en[1]; }
  });
})();
