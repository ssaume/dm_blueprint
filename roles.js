(() => {
  'use strict';
  const data = window.PROTOTYPE_DATA;
  if (!data) return;

  const permissions = [
    { code: 'VIEW', nameZh: '檢視', nameEn: 'View', descriptionZh: '查看功能、資料、版本、分析結果與處理歷程。', descriptionEn: 'View capabilities, data, versions, analytics, and processing history.' },
    { code: 'EXECUTE', nameZh: '執行', nameEn: 'Execute', descriptionZh: '建立任務、執行分析或規劃、處理例外、重跑與提交。', descriptionEn: 'Create tasks, run analytics or planning, handle exceptions, rerun, and submit.' },
    { code: 'MAINTAIN', nameZh: '維護', nameEn: 'Maintain', descriptionZh: '維護主檔、模型、政策、規則、流程、對映與排程設定。', descriptionEn: 'Maintain master data, models, policies, rules, workflows, mappings, and schedules.' },
    { code: 'APPROVE', nameZh: '核准', nameEn: 'Approve', descriptionZh: '審查並核准版本、例外、情境、共識或發布申請。', descriptionEn: 'Review and approve versions, exceptions, scenarios, consensus, or release requests.' },
    { code: 'RELEASE', nameZh: '發布', nameEn: 'Release', descriptionZh: '凍結、發布或對外傳送正式版本與承諾結果。', descriptionEn: 'Freeze, release, or publish official versions and commitments.' },
    { code: 'ADMIN', nameZh: '系統管理', nameEn: 'Administer', descriptionZh: '管理帳號、角色、權限、環境、安全與平台級設定。', descriptionEn: 'Administer accounts, roles, access, environments, security, and platform settings.' }
  ];

  const roles = [
    { id:'sales-cs', type:'HUMAN', platformScope:['DM','CROSS'], nameZh:'業務與客戶服務', nameEn:'Sales & Customer Service', descriptionZh:'維護客戶需求、訂單與回覆資訊，確認客戶承諾及商業條件。', descriptionEn:'Maintains customer demand, orders, responses, commitments, and commercial conditions.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'product-manager', type:'HUMAN', platformScope:['DM','CROSS'], nameZh:'產品經理', nameEn:'Product Manager', descriptionZh:'管理產品、NPI、產品生命週期與需求假設，參與方案及優先級判斷。', descriptionEn:'Owns product, NPI, lifecycle, demand assumptions, and prioritization decisions.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'demand-planner', type:'HUMAN', platformScope:['DM','CROSS'], nameZh:'需求規劃人員', nameEn:'Demand Planner', descriptionZh:'處理需求事件、分析需求、調整預測、執行 ATP 快速評估並形成需求版本。', descriptionEn:'Processes demand events, analyzes and adjusts demand, runs ATP checks, and creates demand versions.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'demand-manager', type:'HUMAN', platformScope:['DM','CROSS'], nameZh:'需求主管', nameEn:'Demand Manager', descriptionZh:'審查需求計畫、例外與客戶回覆，核准共識需求及跨平台模擬申請。', descriptionEn:'Reviews demand plans, exceptions, and customer responses; approves consensus demand and simulation requests.', defaultPermissions:['VIEW','APPROVE','RELEASE'] },
    { id:'supply-planner', type:'HUMAN', platformScope:['SCP','CROSS'], nameZh:'供應規劃人員', nameEn:'Supply Planner', descriptionZh:'執行供應分析、情境模擬、供需平衡與跨廠供應配置。', descriptionEn:'Runs supply analysis, scenario simulation, demand-supply balancing, and inter-plant allocation.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'production-planner', type:'HUMAN', platformScope:['SCP'], nameZh:'生管與產能規劃人員', nameEn:'Production & Capacity Planner', descriptionZh:'維護產能可用量，評估有限／無限負荷、MPS、工單與生產可行性。', descriptionEn:'Maintains capacity availability and evaluates finite/infinite load, MPS, orders, and production feasibility.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'material-planner', type:'HUMAN', platformScope:['SCP'], nameZh:'物料規劃與採購人員', nameEn:'Material Planner & Buyer', descriptionZh:'執行 MRP、缺料分析、採購與供應商協同、替代料及補料處置。', descriptionEn:'Runs MRP, shortage analysis, purchasing and supplier collaboration, substitution, and replenishment actions.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'inventory-planner', type:'HUMAN', platformScope:['SCP'], nameZh:'庫存規劃人員', nameEn:'Inventory Planner', descriptionZh:'管理安全庫存、補貨政策、庫存風險、計畫庫存與庫存目標。', descriptionEn:'Manages safety stock, replenishment policies, inventory risk, planned inventory, and targets.', defaultPermissions:['VIEW','EXECUTE'] },
    { id:'plant-manager', type:'HUMAN', platformScope:['SCP','CROSS'], nameZh:'工廠主管', nameEn:'Plant Manager', descriptionZh:'承諾工廠產能、加班、轉廠、委外與瓶頸改善方案，核准廠內可行性。', descriptionEn:'Commits plant capacity, overtime, transfers, subcontracting, and bottleneck actions; approves plant feasibility.', defaultPermissions:['VIEW','APPROVE'] },
    { id:'supply-chain-manager', type:'HUMAN', platformScope:['SCP','CROSS'], nameZh:'供應鏈主管', nameEn:'Supply Chain Manager', descriptionZh:'審查跨廠供應方案、接受風險與例外，核准並發布正式供應計畫。', descriptionEn:'Reviews cross-plant supply options and accepted risks, then approves and releases the official supply plan.', defaultPermissions:['VIEW','APPROVE','RELEASE'] },
    { id:'data-steward', type:'HUMAN', platformScope:['DM','SCP','CROSS'], nameZh:'資料治理人員', nameEn:'Data Steward', descriptionZh:'治理維度、主檔、Key Figure、資料品質、版本與生效規則。', descriptionEn:'Governs dimensions, master data, key figures, data quality, versions, and effective-dating rules.', defaultPermissions:['VIEW','EXECUTE','MAINTAIN'] },
    { id:'supply-modeler', type:'HUMAN', platformScope:['SCP'], nameZh:'供應模型管理者／IE', nameEn:'Supply Modeler / Industrial Engineer', descriptionZh:'維護供應網路、BOM、途程、資源、產能、採購與跨廠關係模型。', descriptionEn:'Maintains supply-network, BOM, routing, resource, capacity, procurement, and inter-plant models.', defaultPermissions:['VIEW','EXECUTE','MAINTAIN'] },
    { id:'data-engineer', type:'HUMAN', platformScope:['DM','SCP','CROSS'], nameZh:'資料整合工程師', nameEn:'Data Integration Engineer', descriptionZh:'維護來源連線、資料接入、對映轉換、介面發布與批次監控。', descriptionEn:'Maintains source connections, ingestion, mapping, transformation, outbound interfaces, and batch monitoring.', defaultPermissions:['VIEW','EXECUTE','MAINTAIN'] },
    { id:'automation-admin', type:'HUMAN', platformScope:['DM','SCP','CROSS'], nameZh:'流程與自動化管理者', nameEn:'Process & Automation Administrator', descriptionZh:'設定事件、規則、工作流、排程、通知、Copilot、Agent 與人工覆核節點。', descriptionEn:'Configures events, rules, workflows, schedules, notifications, copilots, agents, and human-review controls.', defaultPermissions:['VIEW','EXECUTE','MAINTAIN'] },
    { id:'system-admin', type:'HUMAN', platformScope:['DM','SCP','CROSS'], nameZh:'系統管理員', nameEn:'System Administrator', descriptionZh:'管理身分、角色、權限、環境、安全政策與平台層級設定，不負責業務核准。', descriptionEn:'Administers identity, roles, access, environments, security, and platform settings without business approval authority.', defaultPermissions:['VIEW','ADMIN'] },
    { id:'auditor', type:'HUMAN', platformScope:['DM','SCP','CROSS'], nameZh:'稽核與唯讀檢視者', nameEn:'Auditor & Read-only Viewer', descriptionZh:'唯讀查看版本、操作、審批、資料血緣與發布紀錄，不可執行或修改。', descriptionEn:'Read-only access to versions, actions, approvals, lineage, and release records; cannot execute or modify.', defaultPermissions:['VIEW'] },
    { id:'integration-service', type:'SERVICE', platformScope:['DM','SCP','CROSS'], nameZh:'資料整合服務帳號', nameEn:'Data Integration Service Account', descriptionZh:'以服務身分執行 API、EDI、SFTP、RPA、資料接入、轉換與發布批次。', descriptionEn:'Service identity for API, EDI, SFTP, RPA, ingestion, transformation, and publication jobs.', defaultPermissions:['EXECUTE'] },
    { id:'planning-engine', type:'SERVICE', platformScope:['DM','SCP','CROSS'], nameZh:'規劃運算引擎服務帳號', nameEn:'Planning Engine Service Account', descriptionZh:'執行 ATP、預測、PPO、MPS、MRP、MAO、最佳化與情境批次，不具核准權。', descriptionEn:'Runs ATP, forecasting, PPO, MPS, MRP, MAO, optimization, and scenario jobs without approval authority.', defaultPermissions:['EXECUTE'] },
    { id:'workflow-service', type:'SERVICE', platformScope:['DM','SCP','CROSS'], nameZh:'工作流自動化服務帳號', nameEn:'Workflow Automation Service Account', descriptionZh:'執行事件路由、規則、通知、任務分派、Agent 與排程工作，不具業務發布權。', descriptionEn:'Runs event routing, rules, notifications, task assignment, agents, and schedules without business release authority.', defaultPermissions:['EXECUTE'] }
  ];

  const byId = new Map(roles.map(r => [r.id, r]));
  const lower = value => String(value || '').toLowerCase();
  const includesAny = (text, words) => words.some(word => text.includes(lower(word)));
  const unique = list => [...new Set(list)];
  const permissionSet = (...codes) => unique(codes.flat().filter(Boolean));

  const defaultOwnerByModule = {
    'Unified Demand Model':'data-steward',
    'Demand Data Exchange':'data-engineer',
    'Demand Event Center':'demand-planner',
    'Demand Analytics':'demand-planner',
    'Demand Planning Workbench':'demand-planner',
    'Demand Collaboration & Review':'demand-manager',
    'Unified Supply Model':'supply-modeler',
    'Supply Data Exchange':'data-engineer',
    'Supply Event Center':'supply-planner',
    'Supply Analytics':'supply-planner',
    'Supply Planning Workbench':'supply-planner',
    'Supply Collaboration & Review':'supply-chain-manager',
    'Automation Studio':'automation-admin'
  };

  const maintenanceWords = ['create','manage','maintain','configure','define','design','mapping','map ','model','policy','rule','workflow','schedule','master','dimension','key figure','建立','管理','維護','設定','定義','設計','對映','模型','政策','規則','流程','排程','主檔','維度','指標'];
  const approvalWords = ['approve','approval','review','consensus','submit','governance','核准','審查','共識','提交','治理'];
  const releaseWords = ['release','publish','publication','freeze','response review','發布','凍結','回覆審查'];

  function addAssignment(map, roleId, responsibility, permissions) {
    if (!roleId || !byId.has(roleId)) return;
    const key = `${roleId}|${responsibility}`;
    if (!map.has(key)) map.set(key, { roleId, responsibility, permissions: [] });
    map.get(key).permissions = permissionSet(map.get(key).permissions, permissions);
  }

  function serviceRoleFor(c, f, text) {
    if (c.moduleEn.includes('Data Exchange') || includesAny(text, ['api','edi','sftp','rpa','ingestion','mapping','transform','publication','匯入','接入','對映','轉換','發布批次'])) return 'integration-service';
    if (c.moduleEn === 'Automation Studio' || includesAny(text, ['workflow','notification','routing','agent','copilot','schedule','event designer','rule designer','工作流','通知','路由','排程','agent','copilot','規則設計'])) return 'workflow-service';
    if (includesAny(text, ['atp','forecast','ppo','mps','mrp','mao','solver','optimization','simulation','planning run','calculate','forecast consumption','預測','最佳化','模擬','規劃批次','運算','計算','沖銷'])) return 'planning-engine';
    if ((f.executionMode === 'AUTO' || f.executionMode === 'HYBRID') && c.moduleEn.includes('Event Center')) return 'workflow-service';
    if ((f.executionMode === 'AUTO' || f.executionMode === 'HYBRID') && c.moduleEn.includes('Analytics')) return 'planning-engine';
    if ((f.executionMode === 'AUTO' || f.executionMode === 'HYBRID') && c.moduleEn.includes('Planning Workbench')) return 'planning-engine';
    if ((f.executionMode === 'AUTO' || f.executionMode === 'HYBRID') && c.moduleEn.includes('Collaboration')) return 'workflow-service';
    return null;
  }

  function participantRoles(c, f, text) {
    const result = [];
    if (includesAny(text, ['customer','sales','order','commitment','response','sold-to','ship-to','客戶','業務','訂單','承諾','回覆'])) result.push('sales-cs');
    if (includesAny(text, ['product','npi','opportunity','lifecycle','產品','新品','商機','生命週期'])) result.push('product-manager');
    if (includesAny(text, ['demand','forecast','atp','consumption','需求','預測','沖銷'])) result.push('demand-planner');
    if (includesAny(text, ['capacity','mps','resource','routing','production','work order','finite','infinite','overtime','產能','生產','工單','途程','資源','有限','無限','加班'])) result.push('production-planner');
    if (includesAny(text, ['material','mrp','procurement','supplier','shortage','component','purchase','substitute','物料','採購','供應商','缺料','零件','替代料'])) result.push('material-planner');
    if (includesAny(text, ['inventory','replenishment','safety stock','stock','planned inventory','庫存','補貨','安全庫存','計畫庫存'])) result.push('inventory-planner');
    if (includesAny(text, ['plant','inter-plant','transfer','subcontract','factory','工廠','跨廠','轉廠','委外'])) result.push('plant-manager');
    if (includesAny(text, ['dimension','master data','key figure','data quality','version model','governance','維度','主檔','資料品質','指標','模型治理'])) result.push('data-steward');
    if (includesAny(text, ['bom','supply network','routing','resource model','供應網路','途程','資源模型'])) result.push('supply-modeler');
    if (includesAny(text, ['source','ingestion','api','edi','sftp','mapping','transform','lineage','來源','接入','對映','轉換','血緣'])) result.push('data-engineer');
    if (includesAny(text, ['workflow','rule','notification','agent','copilot','schedule','human-in-the-loop','工作流','規則','通知','排程','人工覆核'])) result.push('automation-admin');
    if (c.platform === 'DM' && includesAny(text, ['scenario','option','policy','情境','方案','policy'])) result.push('demand-manager');
    if (c.platform === 'SCP' && includesAny(text, ['scenario','option','optimization','policy','情境','方案','最佳化','policy'])) result.push('supply-chain-manager');
    return unique(result);
  }

  function approverRoles(c, f, text) {
    const result = [];
    const requiresApproval = f.frequencyCode === 'RELEASE' || includesAny(text, approvalWords) || includesAny(text, releaseWords);
    if (!requiresApproval) return result;
    if (c.platform === 'DM') result.push('demand-manager');
    if (c.platform === 'SCP') result.push('supply-chain-manager');
    if (includesAny(text, ['capacity','mps','plant','overtime','transfer','subcontract','產能','工廠','加班','轉廠','委外'])) result.push('plant-manager');
    return unique(result);
  }

  data.capabilities.forEach(c => {
    const capabilityRoles = new Set();
    c.detailedFunctions.forEach(f => {
      const text = lower([c.nameZh,c.nameEn,c.moduleZh,c.moduleEn,f.nameZh,f.nameEn,f.description].join(' '));
      let ownerId = defaultOwnerByModule[c.moduleEn] || (c.platform === 'DM' ? 'demand-planner' : 'supply-planner');
      if (c.moduleEn.includes('Collaboration') && includesAny(text, ['my tasks','我的任務'])) ownerId = c.platform === 'DM' ? 'demand-planner' : 'supply-planner';
      if (includesAny(text, ['customer response','客戶回覆']) && !includesAny(text, ['review','審查'])) ownerId = 'sales-cs';

      const assignments = new Map();
      const functionNameText = lower([f.nameZh,f.nameEn].join(' '));
      const isMaintenance = c.moduleEn.includes('Unified') || c.moduleEn === 'Automation Studio' ||
        (c.moduleEn.includes('Data Exchange') && includesAny(lower([c.nameZh,c.nameEn].join(' ')), ['management','design','mapping','transformation','quality','管理','設計','對映','轉換','品質'])) ||
        includesAny(functionNameText, ['create','manage','maintain','configure','define','design','建立','管理','維護','設定','定義','設計']);
      const isApproval = f.frequencyCode === 'RELEASE' || includesAny(text, approvalWords) || includesAny(text, releaseWords);
      const isRelease = f.frequencyCode === 'RELEASE' || includesAny(text, releaseWords);
      const ownerCanApprove = ['demand-manager','supply-chain-manager','plant-manager'].includes(ownerId) && isApproval;
      addAssignment(assignments, ownerId, 'OWNER', permissionSet('VIEW','EXECUTE', isMaintenance ? 'MAINTAIN' : null, ownerCanApprove ? 'APPROVE' : null, ownerCanApprove && isRelease ? 'RELEASE' : null));

      const approvers = approverRoles(c,f,text).filter(id => id !== ownerId);
      participantRoles(c,f,text).filter(id => id !== ownerId && !approvers.includes(id)).slice(0,5).forEach(id => {
        addAssignment(assignments, id, 'PARTICIPANT', ['VIEW','EXECUTE']);
      });

      approvers.forEach(id => {
        addAssignment(assignments, id, 'APPROVER', permissionSet('VIEW','APPROVE', isRelease ? 'RELEASE' : null));
      });

      const serviceRole = serviceRoleFor(c,f,text);
      if (serviceRole) addAssignment(assignments, serviceRole, 'SERVICE', ['EXECUTE']);

      addAssignment(assignments, 'system-admin', 'GOVERNANCE', ['VIEW','ADMIN']);
      addAssignment(assignments, 'auditor', 'GOVERNANCE', ['VIEW']);

      f.roleAssignments = [...assignments.values()];
      f.primaryRoleIds = f.roleAssignments.filter(x => x.responsibility === 'OWNER').map(x => x.roleId);
      f.participantRoleIds = f.roleAssignments.filter(x => x.responsibility === 'PARTICIPANT').map(x => x.roleId);
      f.approverRoleIds = f.roleAssignments.filter(x => x.responsibility === 'APPROVER').map(x => x.roleId);
      f.serviceRoleIds = f.roleAssignments.filter(x => x.responsibility === 'SERVICE').map(x => x.roleId);
      f.governanceRoleIds = f.roleAssignments.filter(x => x.responsibility === 'GOVERNANCE').map(x => x.roleId);
      f.roleAssignments.forEach(a => capabilityRoles.add(a.roleId));
    });
    c.roleIds = [...capabilityRoles];
  });

  const functionIndex = [];
  data.capabilities.forEach(c => c.detailedFunctions.forEach(f => functionIndex.push({ capability:c, function:f })));
  roles.forEach(role => {
    const assigned = functionIndex.filter(item => item.function.roleAssignments.some(a => a.roleId === role.id));
    role.functionCount = assigned.length;
    role.platformCounts = {
      DM: assigned.filter(x => x.capability.platform === 'DM').length,
      SCP: assigned.filter(x => x.capability.platform === 'SCP').length
    };
    role.moduleNamesZh = unique(assigned.map(x => x.capability.moduleZh));
    role.moduleNamesEn = unique(assigned.map(x => x.capability.moduleEn));
    role.capabilityIds = unique(assigned.map(x => x.capability.id));
    role.functionIds = assigned.map(x => x.function.id);
    role.permissionCounts = Object.fromEntries(permissions.map(p => [p.code, assigned.filter(x => x.function.roleAssignments.some(a => a.roleId === role.id && a.permissions.includes(p.code))).length]));
  });

  data.permissions = permissions;
  data.roles = roles;
  data.meta.roleCount = roles.length;
  data.meta.humanRoleCount = roles.filter(r => r.type === 'HUMAN').length;
  data.meta.serviceRoleCount = roles.filter(r => r.type === 'SERVICE').length;
})();
