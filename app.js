const CAPABILITIES = [
  {
    "id": "M1",
    "name": "需求模型與資料底座",
    "nameEn": "Demand Model & Data Foundation",
    "children": [
      {
        "id": "M1-1",
        "name": "統一需求語意模型",
        "items": [
          {
            "id": "M1-1-1",
            "name": "客戶模型"
          },
          {
            "id": "M1-1-2",
            "name": "產品模型"
          },
          {
            "id": "M1-1-3",
            "name": "組織與供應地點模型"
          },
          {
            "id": "M1-1-4",
            "name": "時間模型"
          },
          {
            "id": "M1-1-5",
            "name": "需求分類模型"
          },
          {
            "id": "M1-1-6",
            "name": "需求版本模型"
          },
          {
            "id": "M1-1-7",
            "name": "需求狀態模型"
          },
          {
            "id": "M1-1-8",
            "name": "單位與價值模型"
          }
        ]
      },
      {
        "id": "M1-2",
        "name": "需求事件模型",
        "items": [
          {
            "id": "M1-2-1",
            "name": "Forecast建立事件"
          },
          {
            "id": "M1-2-2",
            "name": "Forecast版本更新事件"
          },
          {
            "id": "M1-2-3",
            "name": "訂單建立、變更與取消事件"
          },
          {
            "id": "M1-2-4",
            "name": "Forecast轉PO事件"
          },
          {
            "id": "M1-2-5",
            "name": "客戶需求提前或延後事件"
          },
          {
            "id": "M1-2-6",
            "name": "新產品導入事件"
          },
          {
            "id": "M1-2-7",
            "name": "產品停產與Last Buy事件"
          },
          {
            "id": "M1-2-8",
            "name": "SCP供應回覆事件"
          },
          {
            "id": "M1-2-9",
            "name": "客戶回覆與確認事件"
          },
          {
            "id": "M1-2-10",
            "name": "Demand Plan定版與發布事件"
          }
        ]
      },
      {
        "id": "M1-3",
        "name": "資料來源整合",
        "items": [
          {
            "id": "M1-3-1",
            "name": "ERP訂單、出貨與Backlog整合"
          },
          {
            "id": "M1-3-2",
            "name": "CRM Opportunity與Sales Forecast整合"
          },
          {
            "id": "M1-3-3",
            "name": "客戶Forecast與EDI整合"
          },
          {
            "id": "M1-3-4",
            "name": "Excel、CSV與人工上傳"
          },
          {
            "id": "M1-3-5",
            "name": "API與Webhook接入"
          },
          {
            "id": "M1-3-6",
            "name": "Data Lake與Data Warehouse整合"
          },
          {
            "id": "M1-3-7",
            "name": "市場、產業及經濟指標整合"
          },
          {
            "id": "M1-3-8",
            "name": "價格、促銷及產品生命週期資料整合"
          },
          {
            "id": "M1-3-9",
            "name": "SCP供應承諾與供需結果整合"
          },
          {
            "id": "M1-3-10",
            "name": "對外系統資料發布"
          }
        ]
      },
      {
        "id": "M1-4",
        "name": "資料擷取與同步",
        "items": [
          {
            "id": "M1-4-1",
            "name": "批次同步"
          },
          {
            "id": "M1-4-2",
            "name": "即時或準即時同步"
          },
          {
            "id": "M1-4-3",
            "name": "增量資料擷取"
          },
          {
            "id": "M1-4-4",
            "name": "Change Data Capture"
          },
          {
            "id": "M1-4-5",
            "name": "排程管理"
          },
          {
            "id": "M1-4-6",
            "name": "同步頻率管理"
          },
          {
            "id": "M1-4-7",
            "name": "失敗重試"
          },
          {
            "id": "M1-4-8",
            "name": "重複資料防止"
          },
          {
            "id": "M1-4-9",
            "name": "資料補載與重新處理"
          }
        ]
      },
      {
        "id": "M1-5",
        "name": "資料轉換與標準化",
        "items": [
          {
            "id": "M1-5-1",
            "name": "客戶料號與內部料號對映"
          },
          {
            "id": "M1-5-2",
            "name": "客戶與組織代碼對映"
          },
          {
            "id": "M1-5-3",
            "name": "時間Bucket轉換"
          },
          {
            "id": "M1-5-4",
            "name": "單位、幣別與價格轉換"
          },
          {
            "id": "M1-5-5",
            "name": "欄位格式與資料型態轉換"
          },
          {
            "id": "M1-5-6",
            "name": "客戶Forecast格式模板管理"
          },
          {
            "id": "M1-5-7",
            "name": "欄位拆分、合併與衍生計算"
          },
          {
            "id": "M1-5-8",
            "name": "Aggregation與Disaggregation"
          },
          {
            "id": "M1-5-9",
            "name": "缺值補正"
          },
          {
            "id": "M1-5-10",
            "name": "退貨、取消及異常交易排除"
          },
          {
            "id": "M1-5-11",
            "name": "Stockout與供應受限歷史校正"
          },
          {
            "id": "M1-5-12",
            "name": "外部需求信號特徵化"
          }
        ]
      },
      {
        "id": "M1-6",
        "name": "資料品質管理",
        "items": [
          {
            "id": "M1-6-1",
            "name": "必填欄位檢查"
          },
          {
            "id": "M1-6-2",
            "name": "主資料完整性檢查"
          },
          {
            "id": "M1-6-3",
            "name": "重複需求檢查"
          },
          {
            "id": "M1-6-4",
            "name": "異常數量與異常變動檢查"
          },
          {
            "id": "M1-6-5",
            "name": "時間區間合理性檢查"
          },
          {
            "id": "M1-6-6",
            "name": "單位及幣別一致性檢查"
          },
          {
            "id": "M1-6-7",
            "name": "客戶版本連續性檢查"
          },
          {
            "id": "M1-6-8",
            "name": "資料品質評分"
          },
          {
            "id": "M1-6-9",
            "name": "錯誤資料隔離區"
          },
          {
            "id": "M1-6-10",
            "name": "修正、重新送審與重新載入"
          }
        ]
      },
      {
        "id": "M1-7",
        "name": "資料血緣與可追溯性",
        "items": [
          {
            "id": "M1-7-1",
            "name": "原始來源追溯"
          },
          {
            "id": "M1-7-2",
            "name": "轉換規則追溯"
          },
          {
            "id": "M1-7-3",
            "name": "人工修改紀錄"
          },
          {
            "id": "M1-7-4",
            "name": "預測模型來源追溯"
          },
          {
            "id": "M1-7-5",
            "name": "版本差異追溯"
          },
          {
            "id": "M1-7-6",
            "name": "DM至SCP資料傳遞追溯"
          },
          {
            "id": "M1-7-7",
            "name": "SCP回覆至客戶回覆追溯"
          }
        ]
      }
    ]
  },
  {
    "id": "M2",
    "name": "需求分析與AI預測",
    "nameEn": "Demand Intelligence & AI Forecasting",
    "children": [
      {
        "id": "M2-1",
        "name": "需求輪廓分析",
        "items": [
          {
            "id": "M2-1-1",
            "name": "需求量與需求金額分析"
          },
          {
            "id": "M2-1-2",
            "name": "客戶、產品、區域與通路分析"
          },
          {
            "id": "M2-1-3",
            "name": "趨勢與季節性分析"
          },
          {
            "id": "M2-1-4",
            "name": "間歇性需求分析"
          },
          {
            "id": "M2-1-5",
            "name": "波動程度分析"
          },
          {
            "id": "M2-1-6",
            "name": "長尾需求分析"
          },
          {
            "id": "M2-1-7",
            "name": "需求生命週期分析"
          },
          {
            "id": "M2-1-8",
            "name": "客戶Forecast行為分析"
          },
          {
            "id": "M2-1-9",
            "name": "Forecast轉單率分析"
          },
          {
            "id": "M2-1-10",
            "name": "訂單提前、延後與取消行為分析"
          }
        ]
      },
      {
        "id": "M2-2",
        "name": "需求分群",
        "items": [
          {
            "id": "M2-2-1",
            "name": "ABC價值分群"
          },
          {
            "id": "M2-2-2",
            "name": "XYZ波動分群"
          },
          {
            "id": "M2-2-3",
            "name": "Forecastability分群"
          },
          {
            "id": "M2-2-4",
            "name": "客戶重要度分群"
          },
          {
            "id": "M2-2-5",
            "name": "產品生命週期分群"
          },
          {
            "id": "M2-2-6",
            "name": "間歇性與常態需求分群"
          },
          {
            "id": "M2-2-7",
            "name": "自動選擇規劃及預測策略"
          }
        ]
      },
      {
        "id": "M2-3",
        "name": "描述與診斷分析",
        "items": [
          {
            "id": "M2-3-1",
            "name": "Actual、Forecast、Order與Shipment比較"
          },
          {
            "id": "M2-3-2",
            "name": "Forecast Error分析"
          },
          {
            "id": "M2-3-3",
            "name": "Forecast Bias分析"
          },
          {
            "id": "M2-3-4",
            "name": "MAPE、WAPE、MAE與RMSE分析"
          },
          {
            "id": "M2-3-5",
            "name": "Forecast Value Add分析"
          },
          {
            "id": "M2-3-6",
            "name": "Forecast Accuracy分層分析"
          },
          {
            "id": "M2-3-7",
            "name": "需求變動貢獻分析"
          },
          {
            "id": "M2-3-8",
            "name": "客戶、產品及期間根因分析"
          },
          {
            "id": "M2-3-9",
            "name": "人工調整效益分析"
          },
          {
            "id": "M2-3-10",
            "name": "預測模型效益比較"
          }
        ]
      },
      {
        "id": "M2-4",
        "name": "Demand Sensing",
        "items": [
          {
            "id": "M2-4-1",
            "name": "短期訂單信號偵測"
          },
          {
            "id": "M2-4-2",
            "name": "出貨、POS與Channel Signal偵測"
          },
          {
            "id": "M2-4-3",
            "name": "市場與外部信號偵測"
          },
          {
            "id": "M2-4-4",
            "name": "趨勢轉折偵測"
          },
          {
            "id": "M2-4-5",
            "name": "Demand Spike與Drop偵測"
          },
          {
            "id": "M2-4-6",
            "name": "異常值識別與排除"
          },
          {
            "id": "M2-4-7",
            "name": "短期Forecast修正"
          },
          {
            "id": "M2-4-8",
            "name": "日級或週級需求更新"
          },
          {
            "id": "M2-4-9",
            "name": "信號可信度評分"
          },
          {
            "id": "M2-4-10",
            "name": "避免過度反應的穩定性控制"
          }
        ]
      },
      {
        "id": "M2-5",
        "name": "統計預測引擎",
        "items": [
          {
            "id": "M2-5-1",
            "name": "Naive Forecast"
          },
          {
            "id": "M2-5-2",
            "name": "Moving Average"
          },
          {
            "id": "M2-5-3",
            "name": "Exponential Smoothing"
          },
          {
            "id": "M2-5-4",
            "name": "Holt-Winters"
          },
          {
            "id": "M2-5-5",
            "name": "Croston及間歇性需求模型"
          },
          {
            "id": "M2-5-6",
            "name": "ARIMA及時間序列模型"
          },
          {
            "id": "M2-5-7",
            "name": "自動模型選擇"
          },
          {
            "id": "M2-5-8",
            "name": "模型參數最佳化"
          },
          {
            "id": "M2-5-9",
            "name": "Ensemble Forecast"
          },
          {
            "id": "M2-5-10",
            "name": "模型Fallback機制"
          }
        ]
      },
      {
        "id": "M2-6",
        "name": "AI／ML預測引擎",
        "items": [
          {
            "id": "M2-6-1",
            "name": "Gradient Boosting"
          },
          {
            "id": "M2-6-2",
            "name": "Random Forest"
          },
          {
            "id": "M2-6-3",
            "name": "XGBoost類模型"
          },
          {
            "id": "M2-6-4",
            "name": "深度時間序列模型"
          },
          {
            "id": "M2-6-5",
            "name": "多模型組合"
          },
          {
            "id": "M2-6-6",
            "name": "因果預測"
          },
          {
            "id": "M2-6-7",
            "name": "價格與促銷影響模型"
          },
          {
            "id": "M2-6-8",
            "name": "經濟與市場驅動模型"
          },
          {
            "id": "M2-6-9",
            "name": "客戶行為特徵模型"
          },
          {
            "id": "M2-6-10",
            "name": "自動特徵工程"
          },
          {
            "id": "M2-6-11",
            "name": "Hyperparameter Tuning"
          },
          {
            "id": "M2-6-12",
            "name": "Champion／Challenger模型"
          }
        ]
      },
      {
        "id": "M2-7",
        "name": "新產品與生命週期預測",
        "items": [
          {
            "id": "M2-7-1",
            "name": "新產品屬性比對"
          },
          {
            "id": "M2-7-2",
            "name": "Reference Product選擇"
          },
          {
            "id": "M2-7-3",
            "name": "相似產品群集"
          },
          {
            "id": "M2-7-4",
            "name": "類比產品歷史借用"
          },
          {
            "id": "M2-7-5",
            "name": "Launch Curve建立"
          },
          {
            "id": "M2-7-6",
            "name": "Ramp-up預測"
          },
          {
            "id": "M2-7-7",
            "name": "Phase-out預測"
          },
          {
            "id": "M2-7-8",
            "name": "Product Supersession"
          },
          {
            "id": "M2-7-9",
            "name": "Cannibalization影響分析"
          },
          {
            "id": "M2-7-10",
            "name": "新舊產品需求轉移"
          }
        ]
      },
      {
        "id": "M2-8",
        "name": "階層預測與一致化",
        "items": [
          {
            "id": "M2-8-1",
            "name": "客戶層級預測"
          },
          {
            "id": "M2-8-2",
            "name": "產品層級預測"
          },
          {
            "id": "M2-8-3",
            "name": "產品家族預測"
          },
          {
            "id": "M2-8-4",
            "name": "地區及通路預測"
          },
          {
            "id": "M2-8-5",
            "name": "Top-down Forecast"
          },
          {
            "id": "M2-8-6",
            "name": "Bottom-up Forecast"
          },
          {
            "id": "M2-8-7",
            "name": "Middle-out Forecast"
          },
          {
            "id": "M2-8-8",
            "name": "Hierarchical Reconciliation"
          },
          {
            "id": "M2-8-9",
            "name": "自動拆分比例"
          },
          {
            "id": "M2-8-10",
            "name": "跨階層一致性檢查"
          }
        ]
      },
      {
        "id": "M2-9",
        "name": "預測解釋與模型治理",
        "items": [
          {
            "id": "M2-9-1",
            "name": "預測驅動因子說明"
          },
          {
            "id": "M2-9-2",
            "name": "模型選擇原因"
          },
          {
            "id": "M2-9-3",
            "name": "特徵重要度"
          },
          {
            "id": "M2-9-4",
            "name": "信賴區間"
          },
          {
            "id": "M2-9-5",
            "name": "模型準確度比較"
          },
          {
            "id": "M2-9-6",
            "name": "模型漂移偵測"
          },
          {
            "id": "M2-9-7",
            "name": "資料漂移偵測"
          },
          {
            "id": "M2-9-8",
            "name": "模型版本管理"
          },
          {
            "id": "M2-9-9",
            "name": "模型核准與發布"
          },
          {
            "id": "M2-9-10",
            "name": "人工覆寫原因追蹤"
          }
        ]
      }
    ]
  },
  {
    "id": "M3",
    "name": "需求規劃",
    "nameEn": "Demand Planning",
    "children": [
      {
        "id": "M3-1",
        "name": "規劃範圍與週期管理",
        "items": [
          {
            "id": "M3-1-1",
            "name": "Planning Scope設定"
          },
          {
            "id": "M3-1-2",
            "name": "規劃粒度設定"
          },
          {
            "id": "M3-1-3",
            "name": "Planning Horizon設定"
          },
          {
            "id": "M3-1-4",
            "name": "Rolling Cycle管理"
          },
          {
            "id": "M3-1-5",
            "name": "凍結期及接單Lead Time設定"
          },
          {
            "id": "M3-1-6",
            "name": "規劃日曆與截止時間"
          },
          {
            "id": "M3-1-7",
            "name": "客戶別規劃頻率"
          },
          {
            "id": "M3-1-8",
            "name": "產品別規劃策略"
          }
        ]
      },
      {
        "id": "M3-2",
        "name": "基準需求計畫",
        "items": [
          {
            "id": "M3-2-1",
            "name": "歷史需求載入"
          },
          {
            "id": "M3-2-2",
            "name": "統計Baseline Forecast"
          },
          {
            "id": "M3-2-3",
            "name": "AI Baseline Forecast"
          },
          {
            "id": "M3-2-4",
            "name": "業務Forecast"
          },
          {
            "id": "M3-2-5",
            "name": "客戶Forecast"
          },
          {
            "id": "M3-2-6",
            "name": "財務或預算目標"
          },
          {
            "id": "M3-2-7",
            "name": "市場活動與專案需求"
          },
          {
            "id": "M3-2-8",
            "name": "Baseline選擇及比較"
          }
        ]
      },
      {
        "id": "M3-3",
        "name": "需求整合與淨化",
        "items": [
          {
            "id": "M3-3-1",
            "name": "多客戶需求整合"
          },
          {
            "id": "M3-3-2",
            "name": "多來源Forecast整合"
          },
          {
            "id": "M3-3-3",
            "name": "重複需求排除"
          },
          {
            "id": "M3-3-4",
            "name": "訂單與Forecast優先順序"
          },
          {
            "id": "M3-3-5",
            "name": "Forecast Consumption"
          },
          {
            "id": "M3-3-6",
            "name": "Forecast與PO沖銷"
          },
          {
            "id": "M3-3-7",
            "name": "Backlog滾入"
          },
          {
            "id": "M3-3-8",
            "name": "Cancellation與Return沖銷"
          },
          {
            "id": "M3-3-9",
            "name": "Demand Overlap檢查"
          },
          {
            "id": "M3-3-10",
            "name": "淨需求計算"
          }
        ]
      },
      {
        "id": "M3-4",
        "name": "Planner Workbench",
        "items": [
          {
            "id": "M3-4-1",
            "name": "多維度Planning Worksheet"
          },
          {
            "id": "M3-4-2",
            "name": "客戶、產品、時間Pivot"
          },
          {
            "id": "M3-4-3",
            "name": "Forecast版本並列比較"
          },
          {
            "id": "M3-4-4",
            "name": "圖表與明細同步檢視"
          },
          {
            "id": "M3-4-5",
            "name": "Mass Edit"
          },
          {
            "id": "M3-4-6",
            "name": "Copy、Spread與比例調整"
          },
          {
            "id": "M3-4-7",
            "name": "Planner Override"
          },
          {
            "id": "M3-4-8",
            "name": "Override Reason Code"
          },
          {
            "id": "M3-4-9",
            "name": "Comment與Attachment"
          },
          {
            "id": "M3-4-10",
            "name": "修改前後影響預覽"
          }
        ]
      },
      {
        "id": "M3-5",
        "name": "情境模擬",
        "items": [
          {
            "id": "M3-5-1",
            "name": "Base、Upside與Downside Scenario"
          },
          {
            "id": "M3-5-2",
            "name": "客戶需求成長情境"
          },
          {
            "id": "M3-5-3",
            "name": "訂單提前或延後情境"
          },
          {
            "id": "M3-5-4",
            "name": "價格與促銷情境"
          },
          {
            "id": "M3-5-5",
            "name": "新產品上市情境"
          },
          {
            "id": "M3-5-6",
            "name": "產品停產情境"
          },
          {
            "id": "M3-5-7",
            "name": "客戶流失或取得情境"
          },
          {
            "id": "M3-5-8",
            "name": "情境差異及影響分析"
          },
          {
            "id": "M3-5-9",
            "name": "情境複製與合併"
          },
          {
            "id": "M3-5-10",
            "name": "情境轉正式版本"
          }
        ]
      },
      {
        "id": "M3-6",
        "name": "需求調整與塑形",
        "items": [
          {
            "id": "M3-6-1",
            "name": "Sales Override"
          },
          {
            "id": "M3-6-2",
            "name": "Marketing Override"
          },
          {
            "id": "M3-6-3",
            "name": "Customer Intelligence調整"
          },
          {
            "id": "M3-6-4",
            "name": "Promotion Lift調整"
          },
          {
            "id": "M3-6-5",
            "name": "價格變動調整"
          },
          {
            "id": "M3-6-6",
            "name": "戰略客戶需求調整"
          },
          {
            "id": "M3-6-7",
            "name": "產品組合調整"
          },
          {
            "id": "M3-6-8",
            "name": "人工調整上限與下限"
          },
          {
            "id": "M3-6-9",
            "name": "調整效果及偏差追蹤"
          }
        ]
      },
      {
        "id": "M3-7",
        "name": "例外式需求規劃",
        "items": [
          {
            "id": "M3-7-1",
            "name": "Demand Surge"
          },
          {
            "id": "M3-7-2",
            "name": "Demand Drop"
          },
          {
            "id": "M3-7-3",
            "name": "Forecast Bias"
          },
          {
            "id": "M3-7-4",
            "name": "低Forecast Accuracy"
          },
          {
            "id": "M3-7-5",
            "name": "客戶版本大幅變更"
          },
          {
            "id": "M3-7-6",
            "name": "凍結期內需求變更"
          },
          {
            "id": "M3-7-7",
            "name": "Forecast未轉PO"
          },
          {
            "id": "M3-7-8",
            "name": "訂單超過Forecast"
          },
          {
            "id": "M3-7-9",
            "name": "新產品無歷史資料"
          },
          {
            "id": "M3-7-10",
            "name": "長時間無需求"
          },
          {
            "id": "M3-7-11",
            "name": "例外優先級排序"
          },
          {
            "id": "M3-7-12",
            "name": "Planner Action建議"
          }
        ]
      },
      {
        "id": "M3-8",
        "name": "需求計畫定版與發布",
        "items": [
          {
            "id": "M3-8-1",
            "name": "Consensus Plan建立"
          },
          {
            "id": "M3-8-2",
            "name": "Approved Demand Plan定版"
          },
          {
            "id": "M3-8-3",
            "name": "版本鎖定"
          },
          {
            "id": "M3-8-4",
            "name": "發布前完整性檢查"
          },
          {
            "id": "M3-8-5",
            "name": "發布至SCP"
          },
          {
            "id": "M3-8-6",
            "name": "發布至財務及其他系統"
          },
          {
            "id": "M3-8-7",
            "name": "發布結果確認"
          },
          {
            "id": "M3-8-8",
            "name": "版本撤回與重新發布"
          },
          {
            "id": "M3-8-9",
            "name": "Planning Cycle Close"
          },
          {
            "id": "M3-8-10",
            "name": "Snapshot與歷史封存"
          }
        ]
      }
    ]
  },
  {
    "id": "M4",
    "name": "需求協同",
    "nameEn": "Demand Collaboration",
    "children": [
      {
        "id": "M4-1",
        "name": "內部需求協同",
        "items": [
          {
            "id": "M4-1-1",
            "name": "業務需求提交"
          },
          {
            "id": "M4-1-2",
            "name": "Demand Planner審查"
          },
          {
            "id": "M4-1-3",
            "name": "Marketing輸入"
          },
          {
            "id": "M4-1-4",
            "name": "Finance目標輸入"
          },
          {
            "id": "M4-1-5",
            "name": "Product Manager輸入"
          },
          {
            "id": "M4-1-6",
            "name": "工廠與供應鏈意見回饋"
          },
          {
            "id": "M4-1-7",
            "name": "跨功能Consensus Meeting"
          },
          {
            "id": "M4-1-8",
            "name": "意見差異比較"
          },
          {
            "id": "M4-1-9",
            "name": "共識數字定版"
          }
        ]
      },
      {
        "id": "M4-2",
        "name": "客戶需求協同",
        "items": [
          {
            "id": "M4-2-1",
            "name": "客戶Forecast上傳"
          },
          {
            "id": "M4-2-2",
            "name": "客戶需求變更申請"
          },
          {
            "id": "M4-2-3",
            "name": "Forecast確認與Acknowledgement"
          },
          {
            "id": "M4-2-4",
            "name": "Demand Assumption交換"
          },
          {
            "id": "M4-2-5",
            "name": "客戶需求差異確認"
          },
          {
            "id": "M4-2-6",
            "name": "客戶Portal"
          },
          {
            "id": "M4-2-7",
            "name": "EDI及API協同"
          },
          {
            "id": "M4-2-8",
            "name": "客戶回覆紀錄"
          },
          {
            "id": "M4-2-9",
            "name": "客戶爭議與問題追蹤"
          }
        ]
      },
      {
        "id": "M4-3",
        "name": "任務與工作流程",
        "items": [
          {
            "id": "M4-3-1",
            "name": "任務指派"
          },
          {
            "id": "M4-3-2",
            "name": "Due Date與SLA"
          },
          {
            "id": "M4-3-3",
            "name": "Review流程"
          },
          {
            "id": "M4-3-4",
            "name": "Approval流程"
          },
          {
            "id": "M4-3-5",
            "name": "Reject與Return流程"
          },
          {
            "id": "M4-3-6",
            "name": "Escalation流程"
          },
          {
            "id": "M4-3-7",
            "name": "Delegate與代理人"
          },
          {
            "id": "M4-3-8",
            "name": "任務狀態追蹤"
          },
          {
            "id": "M4-3-9",
            "name": "逾期提醒"
          }
        ]
      },
      {
        "id": "M4-4",
        "name": "假設與決策紀錄",
        "items": [
          {
            "id": "M4-4-1",
            "name": "Planning Assumption"
          },
          {
            "id": "M4-4-2",
            "name": "Decision Log"
          },
          {
            "id": "M4-4-3",
            "name": "Comment Thread"
          },
          {
            "id": "M4-4-4",
            "name": "Attachment"
          },
          {
            "id": "M4-4-5",
            "name": "Meeting Note"
          },
          {
            "id": "M4-4-6",
            "name": "Change Reason"
          },
          {
            "id": "M4-4-7",
            "name": "Decision Owner"
          },
          {
            "id": "M4-4-8",
            "name": "Expected Benefit"
          },
          {
            "id": "M4-4-9",
            "name": "Follow-up Action"
          }
        ]
      },
      {
        "id": "M4-5",
        "name": "供應回覆協同",
        "items": [
          {
            "id": "M4-5-1",
            "name": "接收SCP供應結果"
          },
          {
            "id": "M4-5-2",
            "name": "Demand與Supply Gap展示"
          },
          {
            "id": "M4-5-3",
            "name": "可滿足與不可滿足需求分類"
          },
          {
            "id": "M4-5-4",
            "name": "替代日期或替代數量展示"
          },
          {
            "id": "M4-5-5",
            "name": "業務確認供應回覆"
          },
          {
            "id": "M4-5-6",
            "name": "客戶回覆內容產生"
          },
          {
            "id": "M4-5-7",
            "name": "客戶確認及再協商"
          },
          {
            "id": "M4-5-8",
            "name": "回覆版本追蹤"
          }
        ]
      },
      {
        "id": "M4-6",
        "name": "協同稽核",
        "items": [
          {
            "id": "M4-6-1",
            "name": "修改者及修改時間"
          },
          {
            "id": "M4-6-2",
            "name": "修改前後數值"
          },
          {
            "id": "M4-6-3",
            "name": "審批歷程"
          },
          {
            "id": "M4-6-4",
            "name": "客戶回覆歷程"
          },
          {
            "id": "M4-6-5",
            "name": "附件與意見版本"
          },
          {
            "id": "M4-6-6",
            "name": "SLA達成率"
          },
          {
            "id": "M4-6-7",
            "name": "協同參與率"
          },
          {
            "id": "M4-6-8",
            "name": "Consensus Cycle Time"
          }
        ]
      }
    ]
  },
  {
    "id": "M5",
    "name": "智慧自動化",
    "nameEn": "Intelligent Automation & Orchestration",
    "children": [
      {
        "id": "M5-1",
        "name": "事件驅動引擎",
        "items": [
          {
            "id": "M5-1-1",
            "name": "Forecast上傳觸發"
          },
          {
            "id": "M5-1-2",
            "name": "訂單建立或變更觸發"
          },
          {
            "id": "M5-1-3",
            "name": "需求異常觸發"
          },
          {
            "id": "M5-1-4",
            "name": "凍結期變更觸發"
          },
          {
            "id": "M5-1-5",
            "name": "Approval完成觸發"
          },
          {
            "id": "M5-1-6",
            "name": "SCP回覆觸發"
          },
          {
            "id": "M5-1-7",
            "name": "Planning Cycle到期觸發"
          },
          {
            "id": "M5-1-8",
            "name": "Model Drift觸發"
          }
        ]
      },
      {
        "id": "M5-2",
        "name": "商業規則引擎",
        "items": [
          {
            "id": "M5-2-1",
            "name": "Forecast Consumption規則"
          },
          {
            "id": "M5-2-2",
            "name": "Demand Priority規則"
          },
          {
            "id": "M5-2-3",
            "name": "需求分類規則"
          },
          {
            "id": "M5-2-4",
            "name": "Approval門檻"
          },
          {
            "id": "M5-2-5",
            "name": "例外判斷規則"
          },
          {
            "id": "M5-2-6",
            "name": "自動調整容許範圍"
          },
          {
            "id": "M5-2-7",
            "name": "客戶別Planning Policy"
          },
          {
            "id": "M5-2-8",
            "name": "產品別Forecast Policy"
          },
          {
            "id": "M5-2-9",
            "name": "通知及Escalation規則"
          }
        ]
      },
      {
        "id": "M5-3",
        "name": "工作流程自動化",
        "items": [
          {
            "id": "M5-3-1",
            "name": "自動建立Review Task"
          },
          {
            "id": "M5-3-2",
            "name": "自動送審"
          },
          {
            "id": "M5-3-3",
            "name": "自動催辦"
          },
          {
            "id": "M5-3-4",
            "name": "自動升級主管"
          },
          {
            "id": "M5-3-5",
            "name": "自動發布需求計畫"
          },
          {
            "id": "M5-3-6",
            "name": "自動呼叫AI預測"
          },
          {
            "id": "M5-3-7",
            "name": "自動呼叫SCP模擬"
          },
          {
            "id": "M5-3-8",
            "name": "自動回寫結果"
          },
          {
            "id": "M5-3-9",
            "name": "失敗補償與重新執行"
          }
        ]
      },
      {
        "id": "M5-4",
        "name": "AI需求助理",
        "items": [
          {
            "id": "M5-4-1",
            "name": "自然語言查詢需求資料"
          },
          {
            "id": "M5-4-2",
            "name": "需求變動摘要"
          },
          {
            "id": "M5-4-3",
            "name": "異常根因摘要"
          },
          {
            "id": "M5-4-4",
            "name": "Forecast解釋"
          },
          {
            "id": "M5-4-5",
            "name": "Planner Action建議"
          },
          {
            "id": "M5-4-6",
            "name": "Scenario建議"
          },
          {
            "id": "M5-4-7",
            "name": "Meeting Summary"
          },
          {
            "id": "M5-4-8",
            "name": "客戶回覆草稿"
          },
          {
            "id": "M5-4-9",
            "name": "審批摘要"
          },
          {
            "id": "M5-4-10",
            "name": "Demand Risk Briefing"
          }
        ]
      },
      {
        "id": "M5-5",
        "name": "AI Agent",
        "items": [
          {
            "id": "M5-5-1",
            "name": "Demand Intake Agent"
          },
          {
            "id": "M5-5-2",
            "name": "Data Quality Agent"
          },
          {
            "id": "M5-5-3",
            "name": "Forecast Monitoring Agent"
          },
          {
            "id": "M5-5-4",
            "name": "Exception Triage Agent"
          },
          {
            "id": "M5-5-5",
            "name": "Collaboration Follow-up Agent"
          },
          {
            "id": "M5-5-6",
            "name": "Customer Response Agent"
          },
          {
            "id": "M5-5-7",
            "name": "Planning Cycle Agent"
          },
          {
            "id": "M5-5-8",
            "name": "Model Governance Agent"
          }
        ]
      },
      {
        "id": "M5-6",
        "name": "RPA與舊系統自動化",
        "items": [
          {
            "id": "M5-6-1",
            "name": "郵件附件擷取"
          },
          {
            "id": "M5-6-2",
            "name": "客戶Portal資料下載"
          },
          {
            "id": "M5-6-3",
            "name": "Legacy系統畫面輸入"
          },
          {
            "id": "M5-6-4",
            "name": "無API系統資料查詢"
          },
          {
            "id": "M5-6-5",
            "name": "Excel模板自動整理"
          },
          {
            "id": "M5-6-6",
            "name": "客戶回覆文件上傳"
          },
          {
            "id": "M5-6-7",
            "name": "RPA執行監控"
          },
          {
            "id": "M5-6-8",
            "name": "RPA失敗人工接管"
          }
        ]
      },
      {
        "id": "M5-7",
        "name": "Human-in-the-loop控制",
        "items": [
          {
            "id": "M5-7-1",
            "name": "AI建議人工確認"
          },
          {
            "id": "M5-7-2",
            "name": "高風險動作強制審批"
          },
          {
            "id": "M5-7-3",
            "name": "自動執行額度限制"
          },
          {
            "id": "M5-7-4",
            "name": "信心分數門檻"
          },
          {
            "id": "M5-7-5",
            "name": "AI決策原因保存"
          },
          {
            "id": "M5-7-6",
            "name": "人工駁回及修正回饋"
          },
          {
            "id": "M5-7-7",
            "name": "Agent權限限制"
          },
          {
            "id": "M5-7-8",
            "name": "緊急停止機制"
          }
        ]
      }
    ]
  },
  {
    "id": "M6",
    "name": "需求治理與平台管理",
    "nameEn": "Demand Governance & Administration",
    "children": [
      {
        "id": "M6-1",
        "name": "使用者與權限",
        "items": [
          {
            "id": "M6-1-1",
            "name": "Role-based Access Control"
          },
          {
            "id": "M6-1-2",
            "name": "客戶及產品資料範圍權限"
          },
          {
            "id": "M6-1-3",
            "name": "欄位檢視及修改權限"
          },
          {
            "id": "M6-1-4",
            "name": "Planner、Reviewer與Approver角色"
          },
          {
            "id": "M6-1-5",
            "name": "外部客戶帳號"
          },
          {
            "id": "M6-1-6",
            "name": "API及Service Account權限"
          },
          {
            "id": "M6-1-7",
            "name": "職務分離"
          },
          {
            "id": "M6-1-8",
            "name": "Single Sign-on"
          }
        ]
      },
      {
        "id": "M6-2",
        "name": "規劃政策管理",
        "items": [
          {
            "id": "M6-2-1",
            "name": "Demand Policy"
          },
          {
            "id": "M6-2-2",
            "name": "Forecast Policy"
          },
          {
            "id": "M6-2-3",
            "name": "Consumption Policy"
          },
          {
            "id": "M6-2-4",
            "name": "Frozen Zone Policy"
          },
          {
            "id": "M6-2-5",
            "name": "Approval Policy"
          },
          {
            "id": "M6-2-6",
            "name": "Exception Policy"
          },
          {
            "id": "M6-2-7",
            "name": "Customer Response Policy"
          },
          {
            "id": "M6-2-8",
            "name": "Data Retention Policy"
          }
        ]
      },
      {
        "id": "M6-3",
        "name": "KPI與績效治理",
        "items": [
          {
            "id": "M6-3-1",
            "name": "Forecast Accuracy"
          },
          {
            "id": "M6-3-2",
            "name": "Forecast Bias"
          },
          {
            "id": "M6-3-3",
            "name": "Forecast Value Add"
          },
          {
            "id": "M6-3-4",
            "name": "Forecast轉單率"
          },
          {
            "id": "M6-3-5",
            "name": "需求變動率"
          },
          {
            "id": "M6-3-6",
            "name": "Planning Cycle Time"
          },
          {
            "id": "M6-3-7",
            "name": "Planner Touch Rate"
          },
          {
            "id": "M6-3-8",
            "name": "Exception Resolution Time"
          },
          {
            "id": "M6-3-9",
            "name": "Consensus達成率"
          },
          {
            "id": "M6-3-10",
            "name": "Demand Plan準時發布率"
          },
          {
            "id": "M6-3-11",
            "name": "客戶需求確認時效"
          },
          {
            "id": "M6-3-12",
            "name": "DM至SCP整合成功率"
          }
        ]
      },
      {
        "id": "M6-4",
        "name": "系統營運監控",
        "items": [
          {
            "id": "M6-4-1",
            "name": "Integration Job Monitor"
          },
          {
            "id": "M6-4-2",
            "name": "Forecast Job Monitor"
          },
          {
            "id": "M6-4-3",
            "name": "Workflow Monitor"
          },
          {
            "id": "M6-4-4",
            "name": "API Monitor"
          },
          {
            "id": "M6-4-5",
            "name": "Agent Monitor"
          },
          {
            "id": "M6-4-6",
            "name": "效能與容量監控"
          },
          {
            "id": "M6-4-7",
            "name": "錯誤紀錄"
          },
          {
            "id": "M6-4-8",
            "name": "告警管理"
          },
          {
            "id": "M6-4-9",
            "name": "系統健康度Dashboard"
          }
        ]
      },
      {
        "id": "M6-5",
        "name": "稽核與合規",
        "items": [
          {
            "id": "M6-5-1",
            "name": "使用者操作紀錄"
          },
          {
            "id": "M6-5-2",
            "name": "數值修改紀錄"
          },
          {
            "id": "M6-5-3",
            "name": "模型執行紀錄"
          },
          {
            "id": "M6-5-4",
            "name": "Agent執行紀錄"
          },
          {
            "id": "M6-5-5",
            "name": "Approval歷程"
          },
          {
            "id": "M6-5-6",
            "name": "資料匯出紀錄"
          },
          {
            "id": "M6-5-7",
            "name": "權限變更紀錄"
          },
          {
            "id": "M6-5-8",
            "name": "稽核報表"
          },
          {
            "id": "M6-5-9",
            "name": "敏感資料遮罩"
          },
          {
            "id": "M6-5-10",
            "name": "資料保存與刪除"
          }
        ]
      }
    ]
  }
];

const STORAGE_KEY = "dmCapabilityRoadmapV1";
const DEFAULT_YEAR = new Date().getFullYear();

let schedule = loadSchedule();
let searchTerm = "";

const treeRoot = document.getElementById("treeRoot");
const leafTemplate = document.getElementById("leafTemplate");
const emptyState = document.getElementById("emptyState");
const summaryHead = document.getElementById("summaryHead");
const summaryBody = document.getElementById("summaryBody");
const summaryEmpty = document.getElementById("summaryEmpty");
const yearFilter = document.getElementById("summaryYearFilter");
const quarterFilter = document.getElementById("summaryQuarterFilter");
const toast = document.getElementById("toast");

const flatItems = [];
for (const module of CAPABILITIES) {
  for (const capability of module.children) {
    for (const item of capability.items) {
      flatItems.push({
        moduleId: module.id,
        moduleName: module.name,
        capabilityId: capability.id,
        capabilityName: capability.name,
        itemId: item.id,
        itemName: item.name
      });
    }
  }
}

function loadSchedule() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Unable to load saved data.", error);
    return {};
  }
}

function saveSchedule() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
}

function normalizeEntries(itemId) {
  return Array.isArray(schedule[itemId]) ? schedule[itemId] : [];
}

function getItemTotal(itemId) {
  return normalizeEntries(itemId).reduce((sum, entry) => sum + Number(entry.quantity || 0), 0);
}

function getCapabilityTotal(capability) {
  return capability.items.reduce((sum, item) => sum + getItemTotal(item.id), 0);
}

function getModuleTotal(module) {
  return module.children.reduce((sum, capability) => sum + getCapabilityTotal(capability), 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlight(text, term) {
  if (!term) return escapeHtml(text);
  const safeText = escapeHtml(text);
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safeText.replace(new RegExp(`(${escapedTerm})`, "ig"), "<mark>$1</mark>");
}

function matches(module, capability, item) {
  if (!searchTerm) return true;
  const haystack = `${module.name} ${module.nameEn} ${capability.name} ${item.name}`.toLowerCase();
  return haystack.includes(searchTerm);
}

function renderTree() {
  treeRoot.innerHTML = "";
  let visibleLeafCount = 0;

  for (const module of CAPABILITIES) {
    const visibleChildren = module.children
      .map(capability => ({
        ...capability,
        visibleItems: capability.items.filter(item => matches(module, capability, item))
      }))
      .filter(capability => capability.visibleItems.length > 0);

    if (visibleChildren.length === 0) continue;

    const moduleDetails = document.createElement("details");
    moduleDetails.className = "module";
    moduleDetails.dataset.moduleId = module.id;
    moduleDetails.open = Boolean(searchTerm);

    const moduleSummary = document.createElement("summary");
    moduleSummary.innerHTML = `
      <div class="module-title">
        <div>
          <strong>${highlight(`${module.id}｜${module.name}`, searchTerm)}</strong>
          <small>${highlight(module.nameEn, searchTerm)}</small>
        </div>
        <span class="count-badge" data-module-total="${module.id}">${getModuleTotal(module)}</span>
      </div>
    `;
    moduleDetails.appendChild(moduleSummary);

    const moduleBody = document.createElement("div");
    moduleBody.className = "module-body";

    for (const capability of visibleChildren) {
      const capabilityDetails = document.createElement("details");
      capabilityDetails.className = "capability";
      capabilityDetails.dataset.capabilityId = capability.id;
      capabilityDetails.open = Boolean(searchTerm);

      const capabilitySummary = document.createElement("summary");
      capabilitySummary.innerHTML = `
        <div class="capability-title">
          <strong>${highlight(`${capability.id}｜${capability.name}`, searchTerm)}</strong>
          <span class="count-badge" data-capability-total="${capability.id}">${getCapabilityTotal(capability)}</span>
        </div>
      `;
      capabilityDetails.appendChild(capabilitySummary);

      const capabilityBody = document.createElement("div");
      capabilityBody.className = "capability-body";

      for (const item of capability.visibleItems) {
        visibleLeafCount += 1;
        const leaf = leafTemplate.content.firstElementChild.cloneNode(true);
        leaf.dataset.itemId = item.id;
        leaf.querySelector(".leaf-code").textContent = item.id;
        leaf.querySelector(".leaf-name").innerHTML = highlight(item.name, searchTerm);
        leaf.querySelector(".leaf-total").textContent = getItemTotal(item.id);
        leaf.querySelector(".year-input").value = DEFAULT_YEAR;
        leaf.querySelector(".quarter-input").value = "Q1";
        leaf.querySelector(".qty-input").value = 1;

        leaf.querySelector(".add-entry").addEventListener("click", () => addEntryFromLeaf(leaf));
        leaf.querySelector(".qty-input").addEventListener("keydown", event => {
          if (event.key === "Enter") addEntryFromLeaf(leaf);
        });

        renderEntryList(leaf);
        capabilityBody.appendChild(leaf);
      }

      capabilityDetails.appendChild(capabilityBody);
      moduleBody.appendChild(capabilityDetails);
    }

    moduleDetails.appendChild(moduleBody);
    treeRoot.appendChild(moduleDetails);
  }

  emptyState.hidden = visibleLeafCount > 0;
}

function addEntryFromLeaf(leaf) {
  const itemId = leaf.dataset.itemId;
  const year = Number(leaf.querySelector(".year-input").value);
  const quarter = leaf.querySelector(".quarter-input").value;
  const quantity = Number(leaf.querySelector(".qty-input").value);

  if (!Number.isInteger(year) || year < 2020 || year > 2100) {
    showToast("年度請輸入 2020–2100 的整數。");
    return;
  }
  if (!["Q1", "Q2", "Q3", "Q4"].includes(quarter)) {
    showToast("請選擇季度。");
    return;
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    showToast("數量必須大於 0。");
    return;
  }

  const entries = normalizeEntries(itemId);
  const existing = entries.find(entry => Number(entry.year) === year && entry.quarter === quarter);
  if (existing) {
    existing.quantity = Number(existing.quantity) + quantity;
  } else {
    entries.push({ year, quarter, quantity });
  }
  entries.sort((a, b) => Number(a.year) - Number(b.year) || a.quarter.localeCompare(b.quarter));
  schedule[itemId] = entries;
  saveSchedule();
  refreshAfterDataChange(itemId);
  showToast(`已加入 ${year} ${quarter}，數量 ${quantity}。`);
}

function renderEntryList(leaf) {
  const list = leaf.querySelector(".entry-list");
  const itemId = leaf.dataset.itemId;
  list.innerHTML = "";

  for (const entry of normalizeEntries(itemId)) {
    const chip = document.createElement("span");
    chip.className = "entry-chip";
    chip.innerHTML = `
      <span>${entry.year} ${entry.quarter}：${entry.quantity}</span>
      <button type="button" aria-label="刪除 ${entry.year} ${entry.quarter} 規劃">×</button>
    `;
    chip.querySelector("button").addEventListener("click", () => removeEntry(itemId, entry.year, entry.quarter));
    list.appendChild(chip);
  }
}

function removeEntry(itemId, year, quarter) {
  const next = normalizeEntries(itemId).filter(
    entry => !(Number(entry.year) === Number(year) && entry.quarter === quarter)
  );
  if (next.length) schedule[itemId] = next;
  else delete schedule[itemId];
  saveSchedule();
  refreshAfterDataChange(itemId);
  showToast(`已刪除 ${year} ${quarter} 規劃。`);
}

function refreshAfterDataChange(itemId) {
  const leaf = treeRoot.querySelector(`[data-item-id="${CSS.escape(itemId)}"]`);
  if (leaf) {
    leaf.querySelector(".leaf-total").textContent = getItemTotal(itemId);
    renderEntryList(leaf);
  }

  const itemMeta = flatItems.find(item => item.itemId === itemId);
  if (itemMeta) {
    const module = CAPABILITIES.find(row => row.id === itemMeta.moduleId);
    const capability = module.children.find(row => row.id === itemMeta.capabilityId);
    document.querySelectorAll(`[data-module-total="${module.id}"]`).forEach(el => el.textContent = getModuleTotal(module));
    document.querySelectorAll(`[data-capability-total="${capability.id}"]`).forEach(el => el.textContent = getCapabilityTotal(capability));
  }

  renderMetrics();
  refreshYearFilter();
  renderSummary();
}

function renderMetrics() {
  const moduleCount = CAPABILITIES.length;
  const capabilityCount = CAPABILITIES.reduce((sum, module) => sum + module.children.length, 0);
  const itemCount = flatItems.length;
  const scheduledTotal = Object.values(schedule)
    .flat()
    .reduce((sum, entry) => sum + Number(entry.quantity || 0), 0);

  document.getElementById("moduleCount").textContent = moduleCount;
  document.getElementById("capabilityCount").textContent = capabilityCount;
  document.getElementById("itemCount").textContent = itemCount;
  document.getElementById("scheduledTotal").textContent = scheduledTotal;
}

function aggregateSchedule() {
  const matrix = new Map();

  for (const meta of flatItems) {
    for (const entry of normalizeEntries(meta.itemId)) {
      const key = `${entry.year}-${entry.quarter}`;
      if (!matrix.has(key)) {
        matrix.set(key, {
          year: Number(entry.year),
          quarter: entry.quarter,
          modules: Object.fromEntries(CAPABILITIES.map(module => [module.id, 0]))
        });
      }
      matrix.get(key).modules[meta.moduleId] += Number(entry.quantity || 0);
    }
  }

  return [...matrix.values()].sort(
    (a, b) => a.year - b.year || a.quarter.localeCompare(b.quarter)
  );
}

function refreshYearFilter() {
  const selected = yearFilter.value;
  const years = [...new Set(
    Object.values(schedule).flat().map(entry => Number(entry.year)).filter(Number.isFinite)
  )].sort((a, b) => a - b);

  yearFilter.innerHTML = '<option value="ALL">全部年度</option>';
  for (const year of years) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearFilter.appendChild(option);
  }
  yearFilter.value = years.includes(Number(selected)) ? selected : "ALL";
}

function renderSummary() {
  const selectedYear = yearFilter.value;
  const selectedQuarter = quarterFilter.value;
  const rows = aggregateSchedule().filter(row =>
    (selectedYear === "ALL" || String(row.year) === selectedYear) &&
    (selectedQuarter === "ALL" || row.quarter === selectedQuarter)
  );

  summaryHead.innerHTML = `
    <tr>
      <th>年度</th>
      <th>季度</th>
      ${CAPABILITIES.map(module => `<th title="${escapeHtml(module.name)}">${module.id}</th>`).join("")}
      <th>合計</th>
    </tr>
  `;
  summaryBody.innerHTML = "";

  for (const row of rows) {
    const total = Object.values(row.modules).reduce((sum, value) => sum + value, 0);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.year}</td>
      <td>${row.quarter}</td>
      ${CAPABILITIES.map(module => `<td>${row.modules[module.id] || 0}</td>`).join("")}
      <td class="total-cell">${total}</td>
    `;
    summaryBody.appendChild(tr);
  }

  summaryEmpty.hidden = rows.length > 0;
  document.querySelector(".table-wrap").hidden = rows.length === 0;
}

function exportCsv() {
  const rows = [["一階模組", "二階能力", "三階項目", "年度", "季度", "數量"]];
  for (const meta of flatItems) {
    for (const entry of normalizeEntries(meta.itemId)) {
      rows.push([
        `${meta.moduleId} ${meta.moduleName}`,
        `${meta.capabilityId} ${meta.capabilityName}`,
        `${meta.itemId} ${meta.itemName}`,
        entry.year,
        entry.quarter,
        entry.quantity
      ]);
    }
  }

  if (rows.length === 1) {
    showToast("目前沒有可匯出的排程資料。");
    return;
  }

  const csv = "\uFEFF" + rows
    .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  downloadBlob(csv, "dm-capability-roadmap.csv", "text/csv;charset=utf-8");
}

function exportJson() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    schedule
  };
  downloadBlob(JSON.stringify(payload, null, 2), "dm-capability-roadmap-backup.json", "application/json");
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const imported = payload.schedule ?? payload;
      if (!imported || typeof imported !== "object" || Array.isArray(imported)) {
        throw new Error("Invalid format");
      }

      const knownIds = new Set(flatItems.map(item => item.itemId));
      const cleaned = {};
      for (const [itemId, entries] of Object.entries(imported)) {
        if (!knownIds.has(itemId) || !Array.isArray(entries)) continue;
        const validEntries = entries
          .map(entry => ({
            year: Number(entry.year),
            quarter: String(entry.quarter),
            quantity: Number(entry.quantity)
          }))
          .filter(entry =>
            Number.isInteger(entry.year) &&
            entry.year >= 2020 &&
            entry.year <= 2100 &&
            ["Q1", "Q2", "Q3", "Q4"].includes(entry.quarter) &&
            Number.isFinite(entry.quantity) &&
            entry.quantity > 0
          );
        if (validEntries.length) cleaned[itemId] = validEntries;
      }

      schedule = cleaned;
      saveSchedule();
      renderTree();
      renderMetrics();
      refreshYearFilter();
      renderSummary();
      showToast("JSON 排程已成功匯入。");
    } catch (error) {
      console.error(error);
      showToast("匯入失敗：檔案格式不正確。");
    }
  };
  reader.readAsText(file);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("expandAllBtn").addEventListener("click", () => {
  treeRoot.querySelectorAll("details").forEach(details => details.open = true);
});

document.getElementById("collapseAllBtn").addEventListener("click", () => {
  treeRoot.querySelectorAll("details").forEach(details => details.open = false);
});

document.getElementById("searchInput").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderTree();
});

document.getElementById("exportCsvBtn").addEventListener("click", exportCsv);
document.getElementById("exportJsonBtn").addEventListener("click", exportJson);

document.getElementById("importJsonInput").addEventListener("change", event => {
  const [file] = event.target.files;
  if (file) importJson(file);
  event.target.value = "";
});

document.getElementById("resetBtn").addEventListener("click", () => {
  const hasData = Object.keys(schedule).length > 0;
  if (!hasData) {
    showToast("目前沒有排程資料。");
    return;
  }
  if (!window.confirm("確定要清除所有年度、季度與數量資料嗎？此操作無法復原。")) return;
  schedule = {};
  saveSchedule();
  renderTree();
  renderMetrics();
  refreshYearFilter();
  renderSummary();
  showToast("所有排程資料已清除。");
});

yearFilter.addEventListener("change", renderSummary);
quarterFilter.addEventListener("change", renderSummary);

renderTree();
renderMetrics();
refreshYearFilter();
renderSummary();
