(() => {
  'use strict';
  const data = window.PROTOTYPE_DATA;
  const capabilityById = new Map(data.capabilities.map(c => [c.id, c]));
  const roleById = new Map((data.roles || []).map(r => [r.id, r]));
  const permissionByCode = new Map((data.permissions || []).map(p => [p.code, p]));
  const functionIndex = data.capabilities.flatMap(c => (c.detailedFunctions || []).map(f => ({ capability: c, function: f })));
  const savedCollapsed = JSON.parse(localStorage.getItem('dm-scp-collapsed-modules') || '[]');
  const state = {
    view: 'scenarios', platform: 'ALL', frequency: 'ALL', query: '',
    lang: localStorage.getItem('dm-scp-language') === 'en' ? 'en' : 'zh-TW',
    collapsedModules: new Set(savedCollapsed), drawer: null
  };

  const messages = {
    'zh-TW': {
      brandHome:'回到情境總覽', mainNavigation:'主要導覽', languageSwitch:'語系切換', openGuide:'開啟原型說明',
      brandSubtitle:'情境導向功能互動原型', navScenarios:'情境地圖', navJourney:'跨平台流程', navCatalog:'功能目錄', navRoles:'角色權限',
      heroTitle:'先從「發生什麼事」找到該用的功能', heroDescription:'本原型不執行真實運算，而是回答：什麼情況下使用、包含哪些操作、由哪些角色執行、具備哪些權限、執行頻率，以及會得到什麼結果。',
      prototypeMetrics:'原型統計', metricScenarios:'主要情境', metricCategories:'功能類別', metricFunctions:'細部功能', metricPlatforms:'整合平台', metricRoles:'標準角色',
      filterTools:'篩選工具', searchPlaceholder:'搜尋情境、功能、模組、角色、使用案例或關鍵字…', frequencyLabel:'執行頻率', frequencyAll:'全部頻率', platformFilter:'平台篩選', platformAll:'全部', platformCross:'跨平台',
      scenarioHeading:'常見業務情境', scenarioIntro:'點選情境查看完整功能路徑、使用條件、預期產出與跨模組關聯。', scenarioEmptyTitle:'找不到符合條件的情境', scenarioEmptyText:'請調整平台篩選或搜尋關鍵字。',
      journeyHeading:'DM 到 SCP 的跨平台決策流程', journeyIntro:'從需求訊號到供應計畫發布，依序呈現平台交接與主要功能。', decisionRuleTitle:'核心分流原則', decisionRuleText:'需求變動可在既有供應計畫內快速判斷時，留在 DM 執行 ATP；一旦涉及多工廠、產能、材料、庫存或最佳化取捨，則建立正式 SCP 模擬任務。',
      catalogHeading:'完整功能目錄', catalogIntro:'模組可個別收合；點擊功能類別可查看使用案例、細部功能、角色權限、頻率與人工／自動執行方式。', expandAll:'全部展開', collapseAll:'全部收合', catalogEmptyTitle:'找不到符合條件的功能', catalogEmptyText:'請調整平台篩選、頻率或搜尋關鍵字。',
      footerSource:'來源：產品架構.xlsx 與專案內 DM／SCP 架構討論', footerScope:'原型範圍：情境、使用案例、細部功能、角色權限、執行方式、頻率、結果與關聯', details:'詳細資料', close:'關閉',
      guideTitle:'這個原型如何使用', guideOneTitle:'從情境開始', guideOneText:'以實際發生的業務問題尋找功能，不必先知道系統模組名稱。', guideTwoTitle:'展開模組與功能', guideTwoText:'功能目錄的模組可以收合；點擊功能類別會開啟細部功能。', guideThreeTitle:'確認人機分工', guideThreeText:'每個細部功能都標示使用案例，以及人工執行、系統自動或人機協作。', guideFourTitle:'檢查角色權限', guideFourText:'查看主責、協作、核准與系統服務角色，以及其檢視、執行、維護、核准、發布或管理權限。', guideNote:'這是資訊架構與互動概念原型，不會連接真實資料、執行 ATP、MPS、MRP 或最佳化計算。',
      demandPlatform:'DM 需求平台', supplyPlatform:'SCP 供應平台', crossPlatform:'DM × SCP', scenarioSuffix:'情境', relatedFunctions:'個關聯功能', viewPath:'查看路徑', noFrequencyFunctions:'此步驟沒有符合目前頻率篩選的功能。',
      categories:'類', items:'項', detailFunctions:'項細部功能', whenUse:'何時使用', result:'帶來結果', viewDetails:'查看詳細資料', collapseModule:'收合模組', expandModule:'展開模組',
      mainActors:'主要使用角色', useConditions:'什麼情況下會使用', interactionPath:'功能互動路徑', outcomes:'完成後會得到什麼',
      useWhen:'什麼情況下使用', bringsResult:'會帶來什麼結果', executableFunctions:'可能包含的可執行功能', relatedCapabilities:'牽涉的其他功能', scenariosUsed:'出現在哪些情境', sourceStructure:'來源結構', noRelations:'目前未建立額外關聯。', onlyCatalog:'此功能目前只在完整功能目錄中呈現。',
      suggestedCadence:'建議節奏', triggerCondition:'觸發條件', useCase:'使用案例', executionMethod:'執行方式', automationBoundary:'人機分工說明', originalChinese:'中文原文', platformWord:'平台',
      rolesHeading:'角色與權限清單', rolesIntro:'依職責與最小權限原則，區分人員角色與系統服務帳號，並統計每個角色可操作的功能範圍。', rolesEmptyTitle:'找不到符合條件的角色', rolesEmptyText:'請調整平台篩選、頻率或搜尋關鍵字。', humanRoles:'人員角色', serviceRoles:'系統服務角色', assignedFunctions:'配置功能', roleScope:'平台範圍', defaultPermissions:'標準權限', roleResponsibilities:'角色職責', roleModules:'涉及模組', permissionDistribution:'功能權限分布', openRole:'查看角色權限', roleTypeHuman:'人員角色', roleTypeService:'服務帳號',
      assignedRoles:'角色與功能權限', ownerRole:'主責角色', participantRole:'協作角色', approverRole:'核准角色', serviceRole:'系統執行角色', governanceRole:'治理存取', rolePermissionNote:'權限依功能個別配置；系統管理與稽核角色不取得業務核准權。', functionsUnit:'項功能', capabilitiesUnit:'個功能類別'
    },
    en: {
      brandHome:'Back to scenario overview', mainNavigation:'Main navigation', languageSwitch:'Language switch', openGuide:'Open prototype guide',
      brandSubtitle:'Scenario-oriented interactive capability prototype', navScenarios:'Scenario Map', navJourney:'Cross-platform Flow', navCatalog:'Capability Catalog', navRoles:'Roles & Access',
      heroTitle:'Start with what happened, then find the right capability', heroDescription:'This prototype does not run live planning. It explains when a capability is used, what it contains, which roles execute it, what access they receive, how often it runs, and what result it produces.',
      prototypeMetrics:'Prototype metrics', metricScenarios:'Scenarios', metricCategories:'Capability Categories', metricFunctions:'Detailed Functions', metricPlatforms:'Integrated Platforms', metricRoles:'Standard Roles',
      filterTools:'Filter tools', searchPlaceholder:'Search scenarios, capabilities, modules, roles, use cases, or keywords…', frequencyLabel:'Execution cadence', frequencyAll:'All cadences', platformFilter:'Platform filter', platformAll:'All', platformCross:'Cross-platform',
      scenarioHeading:'Common Business Scenarios', scenarioIntro:'Select a scenario to review its capability path, usage conditions, expected outputs, and cross-module relationships.', scenarioEmptyTitle:'No matching scenario', scenarioEmptyText:'Change the platform filter or search terms.',
      journeyHeading:'Cross-platform Decision Flow from DM to SCP', journeyIntro:'Follow the handoffs and main capabilities from demand signal to supply-plan release.', decisionRuleTitle:'Core routing rule', decisionRuleText:'Keep the request in DM for an ATP check when the change can be assessed against the current supply plan. Create a formal SCP simulation when multiple plants, capacity, materials, inventory, or optimization trade-offs are involved.',
      catalogHeading:'Complete Capability Catalog', catalogIntro:'Each module can be collapsed. Select a capability category to review use cases, detailed functions, role access, cadence, and human-versus-system execution.', expandAll:'Expand all', collapseAll:'Collapse all', catalogEmptyTitle:'No matching capability', catalogEmptyText:'Change the platform, cadence, or search filter.',
      footerSource:'Source: 產品架構.xlsx and project DM/SCP architecture discussions', footerScope:'Scope: scenarios, use cases, detailed functions, roles and permissions, execution mode, cadence, outcomes, and relationships', details:'Details', close:'Close',
      guideTitle:'How to use this prototype', guideOneTitle:'Start from a scenario', guideOneText:'Find capabilities through the real business situation without knowing the module name first.', guideTwoTitle:'Expand modules and capabilities', guideTwoText:'Modules in the catalog can be collapsed; selecting a capability category opens its detailed functions.', guideThreeTitle:'Check the operating model', guideThreeText:'Every detailed function identifies its use case and whether it is human-required, system automated, or collaborative.', guideFourTitle:'Review roles and access', guideFourText:'Review owner, participant, approver, and service roles together with view, execute, maintain, approve, release, or administration access.', guideNote:'This is an information-architecture and interaction prototype. It does not connect to live data or execute ATP, MPS, MRP, or optimization.',
      demandPlatform:'DM Demand Platform', supplyPlatform:'SCP Supply Platform', crossPlatform:'DM × SCP', scenarioSuffix:'scenario', relatedFunctions:'related capabilities', viewPath:'View path', noFrequencyFunctions:'No capability in this step matches the selected cadence.',
      categories:'categories', items:'functions', detailFunctions:'detailed functions', whenUse:'When to use', result:'Outcome', viewDetails:'View details', collapseModule:'Collapse module', expandModule:'Expand module',
      mainActors:'Primary users', useConditions:'When this scenario is used', interactionPath:'Capability interaction path', outcomes:'Expected outcomes',
      useWhen:'When to use', bringsResult:'Expected outcome', executableFunctions:'Executable detailed functions', relatedCapabilities:'Related capabilities', scenariosUsed:'Scenarios using this capability', sourceStructure:'Source structure', noRelations:'No additional relationship is currently defined.', onlyCatalog:'This capability currently appears only in the complete catalog.',
      suggestedCadence:'Suggested cadence', triggerCondition:'Trigger condition', useCase:'Use case', executionMethod:'Execution mode', automationBoundary:'Operating boundary', originalChinese:'Original Chinese', platformWord:'platform',
      rolesHeading:'Role and Permission List', rolesIntro:'Separate human roles from system service identities and apply least-privilege access according to responsibility.', rolesEmptyTitle:'No matching role', rolesEmptyText:'Change the platform, cadence, or search filter.', humanRoles:'Human roles', serviceRoles:'System service roles', assignedFunctions:'Assigned functions', roleScope:'Platform scope', defaultPermissions:'Standard access', roleResponsibilities:'Role responsibilities', roleModules:'Related modules', permissionDistribution:'Function-level permission distribution', openRole:'View role access', roleTypeHuman:'Human role', roleTypeService:'Service identity',
      assignedRoles:'Roles and function permissions', ownerRole:'Primary owner', participantRole:'Participant', approverRole:'Approver', serviceRole:'System execution role', governanceRole:'Governance access', rolePermissionNote:'Access is assigned per function; administrators and auditors do not receive business approval authority.', functionsUnit:'functions', capabilitiesUnit:'capability categories'
    }
  };

  const els = {
    views:{scenarios:document.querySelector('#scenariosView'),journey:document.querySelector('#journeyView'),catalog:document.querySelector('#catalogView'),roles:document.querySelector('#rolesView')},
    scenarioGrid:document.querySelector('#scenarioGrid'),scenarioEmpty:document.querySelector('#scenarioEmpty'),journeyFlow:document.querySelector('#journeyFlow'),
    moduleIndex:document.querySelector('#moduleIndex'),catalogContent:document.querySelector('#catalogContent'),catalogEmpty:document.querySelector('#catalogEmpty'),
    search:document.querySelector('#globalSearch'),frequency:document.querySelector('#frequencyFilter'),drawer:document.querySelector('#detailDrawer'),
    drawerContent:document.querySelector('#drawerContent'),backdrop:document.querySelector('#drawerBackdrop'),
    rolesGrid:document.querySelector('#rolesGrid'),rolesEmpty:document.querySelector('#rolesEmpty'),permissionLegend:document.querySelector('#permissionLegend'),roleSummary:document.querySelector('#roleSummary')
  };

  const tr = key => messages[state.lang][key] || messages['zh-TW'][key] || key;
  const loc = (zh, en) => state.lang === 'en' ? (en || zh) : zh;
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const platformClass = p => p === 'SCP' ? 'scp' : p === 'CROSS' ? 'cross' : 'dm';
  const platformLabel = p => p === 'DM' ? tr('demandPlatform') : p === 'SCP' ? tr('supplyPlatform') : tr('crossPlatform');
  const matches = text => !state.query || text.toLocaleLowerCase().includes(state.query.toLocaleLowerCase());
  const frequencyMatchesCapability = c => state.frequency === 'ALL' || c.detailedFunctions?.some(f => f.frequencyCode === state.frequency);
  const frequencyClass = code => `freq-${String(code || '').toLowerCase()}`;
  const frequencyGuide = () => new Map((data.meta.frequencyGuide || []).map(x => [x.code, loc(x.label, x.labelEn)]));

  function persistCollapsed() { localStorage.setItem('dm-scp-collapsed-modules', JSON.stringify([...state.collapsedModules])); }
  function capabilityName(c) { return loc(c.nameZh, c.nameEn); }
  function moduleName(m) { return loc(m.nameZh, m.nameEn); }
  function roleName(roleOrId) { const role = typeof roleOrId === 'string' ? roleById.get(roleOrId) : roleOrId; return role ? loc(role.nameZh, role.nameEn) : String(roleOrId || ''); }
  function permissionName(code) { const permission = permissionByCode.get(code); return permission ? loc(permission.nameZh, permission.nameEn) : code; }
  function permissionChips(codes) { return (codes || []).map(code => `<span class="permission-chip perm-${String(code).toLowerCase()}">${esc(permissionName(code))}</span>`).join(''); }
  function primaryFrequency(c) {
    const code = c.detailedFunctions?.find(f => f.frequencyType === c.primaryFrequency)?.frequencyCode;
    return code ? (frequencyGuide().get(code) || c.primaryFrequency) : c.primaryFrequency;
  }
  function frequencyChips(c, max = 3) {
    const labels = frequencyGuide(); const codes = [];
    (c.detailedFunctions || []).forEach(f => { if (!codes.includes(f.frequencyCode)) codes.push(f.frequencyCode); });
    return codes.slice(0,max).map(code => `<span class="frequency-chip ${frequencyClass(code)}">${esc(labels.get(code) || code)}</span>`).join('');
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-Hant';
    document.title = state.lang === 'en' ? 'DM × SCP Scenario-oriented Capability Prototype' : 'DM × SCP 情境導向功能原型';
    document.querySelector('meta[name="description"]').content = state.lang === 'en'
      ? 'Explore DM and SCP capabilities, use cases, operating modes, cadence, outcomes, and dependencies through business scenarios.'
      : '以業務情境瀏覽 DM 與 SCP 平台功能、使用案例、執行模式、頻率、結果與相依關係。';
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = tr(node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.placeholder = tr(node.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-aria]').forEach(node => { node.setAttribute('aria-label', tr(node.dataset.i18nAria)); });
    document.querySelectorAll('[data-language]').forEach(btn => btn.classList.toggle('active', btn.dataset.language === state.lang));
    const labels = frequencyGuide();
    [...els.frequency.options].forEach(opt => { if (opt.value !== 'ALL') opt.textContent = labels.get(opt.value) || opt.value; });
  }

  function scenarioSearchText(s) {
    const caps = s.functions.map(id => capabilityById.get(id)).filter(Boolean);
    return [s.title,s.titleEn,s.summary,s.summaryEn,s.stage,s.stageEn,s.severity,s.severityEn,...s.actors,...(s.actorsEn||[]),...s.trigger,...(s.triggerEn||[]),...s.results,...(s.resultsEn||[]),
      ...caps.flatMap(c => [c.nameZh,c.nameEn,c.moduleZh,c.moduleEn,c.when,c.whenEn,c.result,c.resultEn,...(c.detailedFunctions||[]).flatMap(f => [f.nameZh,f.nameEn,f.description,f.descriptionEn,f.useCaseZh,f.useCaseEn,f.executionModeZh,f.executionModeEn,f.frequencyType,f.frequencyTypeEn,f.frequencyDetail,f.frequencyDetailEn,f.trigger,f.triggerEn,...(f.roleAssignments||[]).flatMap(a=>{const r=roleById.get(a.roleId);return r?[r.nameZh,r.nameEn,...a.permissions.map(permissionName)]:[];})])])].join(' ');
  }
  function capabilitySearchText(c) {
    return [c.nameZh,c.nameEn,c.moduleZh,c.moduleEn,c.when,c.whenEn,c.result,c.resultEn,c.code,c.sourceCategory,c.frequencySummary,
      ...(c.detailedFunctions||[]).flatMap(f => [f.nameZh,f.nameEn,f.description,f.descriptionEn,f.useCaseZh,f.useCaseEn,f.executionModeZh,f.executionModeEn,f.frequencyType,f.frequencyTypeEn,f.frequencyDetail,f.frequencyDetailEn,f.trigger,f.triggerEn,f.code,...(f.roleAssignments||[]).flatMap(a=>{const r=roleById.get(a.roleId);return r?[r.nameZh,r.nameEn,...a.permissions.map(permissionName)]:[];})])].join(' ');
  }
  function scenarioFrequencyMatch(s) { return state.frequency === 'ALL' || s.functions.some(id => frequencyMatchesCapability(capabilityById.get(id)||{detailedFunctions:[]})); }

  function setView(view) {
    state.view = view;
    Object.entries(els.views).forEach(([key,node]) => node.classList.toggle('active',key===view));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active',btn.dataset.view===view));
    location.hash = view; render();
  }

  function renderScenarios() {
    const list = data.scenarios.filter(s => (state.platform==='ALL'||s.platform===state.platform) && scenarioFrequencyMatch(s) && matches(scenarioSearchText(s)));
    els.scenarioGrid.innerHTML = list.map(s => {
      const rhythms = state.lang === 'en' ? (s.functions.flatMap(id => capabilityById.get(id)?.detailedFunctions||[]).map(f=>f.frequencyCode)) : null;
      const summary = state.lang === 'en'
        ? [...new Set(rhythms)].slice(0,3).map(code => frequencyGuide().get(code))
        : (s.frequencySummary||[]).slice(0,3);
      return `<article class="scenario-card ${platformClass(s.platform)}" data-open-scenario="${esc(s.id)}" tabindex="0">
        <div class="card-top"><span class="badge ${platformClass(s.platform)}">${esc(platformLabel(s.platform))}</span><span class="severity">${esc(loc(s.severity,s.severityEn))} ${tr('scenarioSuffix')}</span></div>
        <h3>${esc(loc(s.title,s.titleEn))}</h3><p>${esc(loc(s.summary,s.summaryEn))}</p>
        <div class="scenario-rhythm">${summary.filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
        <div class="card-meta"><span>${s.functionCount} ${tr('relatedFunctions')} · ${esc(loc(s.stage,s.stageEn))}</span><button class="open-link" data-open-scenario="${esc(s.id)}">${tr('viewPath')} →</button></div>
      </article>`;
    }).join('');
    els.scenarioEmpty.classList.toggle('hidden',list.length>0);
  }

  function renderJourney() {
    const visible = data.journey.filter(j => state.platform==='ALL'||j.platform===state.platform||(state.platform==='CROSS'&&j.platform==='CROSS'));
    els.journeyFlow.innerHTML = visible.map(step => {
      const functions = step.functions.map(id=>capabilityById.get(id)).filter(Boolean).filter(frequencyMatchesCapability);
      return `<article class="journey-step"><span class="badge ${platformClass(step.platform)}">${esc(platformLabel(step.platform))}</span>
        <h3>${esc(loc(step.title,step.titleEn))}</h3><p>${esc(loc(step.description,step.descriptionEn))}</p>
        ${functions.map(c=>`<button class="flow-function" data-open-capability="${c.id}"><strong>${esc(capabilityName(c))}</strong><br><span>${esc(c.platform)} · ${esc(loc(c.moduleZh,c.moduleEn))} · ${esc(primaryFrequency(c))}</span></button>`).join('')||`<span class="source-note">${tr('noFrequencyFunctions')}</span>`}
      </article>`;
    }).join('');
  }

  function renderCatalog() {
    const modules = data.modules.filter(m => state.platform==='ALL'||m.platform===state.platform);
    let visibleModuleCount=0;
    els.moduleIndex.innerHTML = modules.map((m,i) => {
      const visibleCaps = m.capabilityIds.map(id=>capabilityById.get(id)).filter(Boolean).filter(frequencyMatchesCapability).filter(c=>matches(capabilitySearchText(c)));
      if (!visibleCaps.length) return '';
      const detailCount = visibleCaps.reduce((sum,c)=>sum+(c.detailedFunctionCount||0),0);
      return `${i&&modules[i-1].platform!==m.platform?'<div class="module-divider"></div>':''}<button class="module-link" data-module-target="${esc(m.id)}"><span>${esc(moduleName(m))}</span><span>${visibleCaps.length}／${detailCount}</span></button>`;
    }).join('');

    els.catalogContent.innerHTML = modules.map(m => {
      const caps = m.capabilityIds.map(id=>capabilityById.get(id)).filter(Boolean).filter(frequencyMatchesCapability).filter(c=>matches(capabilitySearchText(c)));
      if (!caps.length) return '';
      visibleModuleCount++;
      const moduleDetailCount=caps.reduce((sum,c)=>sum+(c.detailedFunctionCount||0),0);
      const collapsed=state.collapsedModules.has(m.id);
      return `<section class="module-section ${collapsed?'collapsed':''}" id="${esc(m.id)}">
        <button class="module-header ${platformClass(m.platform)}" data-toggle-module="${esc(m.id)}" aria-expanded="${!collapsed}" aria-label="${collapsed?tr('expandModule'):tr('collapseModule')}">
          <div class="module-header-title"><span class="module-chevron" aria-hidden="true">⌄</span><div><small>${esc(m.platform)} ${tr('platformWord').toUpperCase()}</small><h3>${esc(moduleName(m))}<span>／ ${esc(state.lang==='en'?m.nameZh:m.nameEn)}</span></h3></div></div>
          <strong>${caps.length} ${tr('categories')}／${moduleDetailCount} ${tr('items')}</strong>
        </button>
        <div class="module-body"><div class="capability-list">${caps.map(c=>`<article class="capability-row" data-open-capability="${c.id}" tabindex="0">
          <div class="cap-title"><strong>${esc(capabilityName(c))}</strong><span>${esc(c.code)} · ${esc(state.lang==='en'?c.nameZh:c.nameEn)}</span><div class="cap-summary-line"><b>${c.detailedFunctionCount} ${tr('detailFunctions')}</b>${frequencyChips(c)}</div></div>
          <div class="cap-text"><label>${tr('whenUse')}</label><p>${esc(loc(c.when,c.whenEn))}</p></div>
          <div class="cap-text"><label>${tr('result')}</label><p>${esc(loc(c.result,c.resultEn))}</p></div>
          <button class="cap-open" data-open-capability="${c.id}" aria-label="${tr('viewDetails')}: ${esc(capabilityName(c))}">→</button>
        </article>`).join('')}</div></div>
      </section>`;
    }).join('');
    els.catalogEmpty.classList.toggle('hidden',visibleModuleCount>0);
  }

  function roleSearchText(role) {
    const assigned = functionIndex.filter(item => item.function.roleAssignments?.some(a => a.roleId === role.id));
    return [role.nameZh,role.nameEn,role.descriptionZh,role.descriptionEn,...role.moduleNamesZh,...role.moduleNamesEn,
      ...assigned.flatMap(item => [item.capability.nameZh,item.capability.nameEn,item.function.nameZh,item.function.nameEn])].join(' ');
  }

  function visibleRoleItems(role) {
    return functionIndex.filter(item => {
      const assigned = item.function.roleAssignments?.some(a => a.roleId === role.id);
      const platformMatch = state.platform === 'ALL' || item.capability.platform === state.platform || (state.platform === 'CROSS' && role.platformScope.includes('CROSS'));
      const frequencyMatch = state.frequency === 'ALL' || item.function.frequencyCode === state.frequency;
      return assigned && platformMatch && frequencyMatch;
    });
  }

  function renderRoles() {
    const roles = (data.roles || []).filter(role => {
      const scopeMatch = state.platform === 'ALL' || role.platformScope.includes(state.platform) || (state.platform === 'CROSS' && role.platformScope.includes('CROSS'));
      return scopeMatch && matches(roleSearchText(role)) && visibleRoleItems(role).length > 0;
    });
    els.permissionLegend.innerHTML = (data.permissions || []).map(permission => `<div class="permission-legend-item"><span class="permission-chip perm-${permission.code.toLowerCase()}">${esc(loc(permission.nameZh,permission.nameEn))}</span><p>${esc(loc(permission.descriptionZh,permission.descriptionEn))}</p></div>`).join('');
    const humanCount = roles.filter(r => r.type === 'HUMAN').length;
    const serviceCount = roles.filter(r => r.type === 'SERVICE').length;
    const assignedCount = new Set(roles.flatMap(r => visibleRoleItems(r).map(x => x.function.id))).size;
    els.roleSummary.innerHTML = `<div><strong>${humanCount}</strong><span>${tr('humanRoles')}</span></div><div><strong>${serviceCount}</strong><span>${tr('serviceRoles')}</span></div><div><strong>${assignedCount}</strong><span>${tr('assignedFunctions')}</span></div>`;
    els.rolesGrid.innerHTML = roles.map(role => {
      const items = visibleRoleItems(role);
      const platformCounts = {DM:items.filter(x=>x.capability.platform==='DM').length,SCP:items.filter(x=>x.capability.platform==='SCP').length};
      const modules = uniqueLocalizedModules(items).slice(0,5);
      return `<article class="role-card ${role.type==='SERVICE'?'service-role':''}" data-open-role="${esc(role.id)}" tabindex="0">
        <div class="role-card-head"><div><span class="role-type">${esc(role.type==='SERVICE'?tr('roleTypeService'):tr('roleTypeHuman'))}</span><h3>${esc(roleName(role))}</h3></div><span class="role-function-count">${items.length} ${tr('functionsUnit')}</span></div>
        <p>${esc(loc(role.descriptionZh,role.descriptionEn))}</p>
        <div class="role-platform-counts"><span>DM ${platformCounts.DM}</span><span>SCP ${platformCounts.SCP}</span></div>
        <div class="role-permissions"><b>${tr('defaultPermissions')}</b>${permissionChips(role.defaultPermissions)}</div>
        <div class="role-modules">${modules.map(name=>`<span>${esc(name)}</span>`).join('')}</div>
        <button class="open-link" data-open-role="${esc(role.id)}">${tr('openRole')} →</button>
      </article>`;
    }).join('');
    els.rolesEmpty.classList.toggle('hidden', roles.length > 0);
  }

  function uniqueLocalizedModules(items) {
    return [...new Set(items.map(item => loc(item.capability.moduleZh,item.capability.moduleEn)))];
  }

  function renderRoleAssignments(f) {
    const groups = [
      ['OWNER','ownerRole'],['PARTICIPANT','participantRole'],['APPROVER','approverRole'],['SERVICE','serviceRole'],['GOVERNANCE','governanceRole']
    ];
    return `<div class="role-assignment-block"><b class="role-assignment-title">${tr('assignedRoles')}</b>${groups.map(([type,label]) => {
      const assignments = (f.roleAssignments || []).filter(a => a.responsibility === type);
      if (!assignments.length) return '';
      return `<div class="role-assignment-group"><span>${tr(label)}</span><div>${assignments.map(a => `<button class="function-role-chip" data-open-role="${esc(a.roleId)}"><strong>${esc(roleName(a.roleId))}</strong><small>${a.permissions.map(permissionName).map(esc).join(' · ')}</small></button>`).join('')}</div></div>`;
    }).join('')}<small class="role-permission-note">${tr('rolePermissionNote')}</small></div>`;
  }

  function render() {
    if(state.view==='scenarios')renderScenarios();
    if(state.view==='journey')renderJourney();
    if(state.view==='catalog')renderCatalog();
    if(state.view==='roles')renderRoles();
    if(state.drawer) refreshDrawer();
  }

  function openDrawer(html) {
    els.drawerContent.innerHTML=html; els.backdrop.hidden=false; els.drawer.classList.add('open'); els.drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; els.drawer.scrollTop=0;
  }
  function closeDrawer() { state.drawer=null; els.drawer.classList.remove('open'); els.drawer.setAttribute('aria-hidden','true'); els.backdrop.hidden=true; document.body.style.overflow=''; }

  function openScenario(id) {
    const s=data.scenarios.find(x=>x.id===id); if(!s)return; state.drawer={type:'scenario',id};
    const path=s.functions.map((fid,i)=>{const c=capabilityById.get(fid);return c?`<button class="path-item ${platformClass(c.platform)}" data-open-capability="${c.id}"><span class="path-no">${i+1}</span><span class="path-name"><strong>${esc(capabilityName(c))}</strong><span>${esc(c.platform)} · ${esc(loc(c.moduleZh,c.moduleEn))} · ${c.detailedFunctionCount} ${tr('items')} · ${esc(primaryFrequency(c))}</span></span><span class="path-open">→</span></button>`:'';}).join('');
    const rhythms = state.lang==='en' ? [...new Set(s.functions.flatMap(id=>capabilityById.get(id)?.detailedFunctions||[]).map(f=>f.frequencyCode))].map(code=>frequencyGuide().get(code)) : (s.frequencySummary||[]);
    openDrawer(`<div class="drawer-hero"><span class="badge ${platformClass(s.platform)}">${esc(platformLabel(s.platform))}</span><h2>${esc(loc(s.title,s.titleEn))}</h2><p>${esc(loc(s.summary,s.summaryEn))}</p><div class="drawer-frequency-row">${rhythms.filter(Boolean).map(x=>`<span class="frequency-chip">${esc(x)}</span>`).join('')}</div></div>
      <section class="drawer-section"><h3>${tr('mainActors')}</h3><div class="actor-chips">${loc(s.actors,s.actorsEn||s.actors).map(x=>`<span class="actor-chip">${esc(x)}</span>`).join('')}</div></section>
      <section class="drawer-section"><h3>${tr('useConditions')}</h3><ul class="bullet-list">${loc(s.trigger,s.triggerEn||s.trigger).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
      <section class="drawer-section"><h3>${tr('interactionPath')}</h3><div class="function-path">${path}</div></section>
      <section class="drawer-section"><h3>${tr('outcomes')}</h3><ul class="bullet-list">${loc(s.results,s.resultsEn||s.results).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`);
  }

  function renderDetailedFunctions(c) {
    return (c.detailedFunctions||[]).map((f,i)=>`<article class="detail-function-item">
      <div class="detail-function-head"><span class="detail-function-no">${i+1}</span><div><strong>${esc(loc(f.nameZh,f.nameEn))}</strong><small>${esc(f.code)}${state.lang==='en'?` · ${esc(f.nameZh)}`:''}</small></div><span class="execution-chip mode-${f.executionMode.toLowerCase()}">${esc(loc(f.executionModeZh,f.executionModeEn))}</span></div>
      <p>${esc(loc(f.description,f.descriptionEn))}</p>
      <div class="use-case-block"><b>${tr('useCase')}</b><p>${esc(loc(f.useCaseZh,f.useCaseEn))}</p></div>
      ${renderRoleAssignments(f)}
      <div class="frequency-detail"><span><b>${tr('executionMethod')}</b>${esc(loc(f.executionModeZh,f.executionModeEn))}<small>${esc(loc(f.automationNoteZh,f.automationNoteEn))}</small></span><span><b>${tr('suggestedCadence')}</b>${esc(loc(f.frequencyDetail,f.frequencyDetailEn))}</span><span><b>${tr('triggerCondition')}</b>${esc(loc(f.trigger,f.triggerEn))}</span></div>
    </article>`).join('');
  }

  function openCapability(id) {
    const c=capabilityById.get(id);if(!c)return;state.drawer={type:'capability',id};
    const related=c.relatedIds.map(rid=>capabilityById.get(rid)).filter(Boolean);const scenarios=data.scenarios.filter(s=>s.functions.includes(id));
    openDrawer(`<div class="drawer-hero"><span class="badge ${platformClass(c.platform)}">${esc(c.platform)} · ${esc(loc(c.moduleZh,c.moduleEn))}</span><h2>${esc(capabilityName(c))}</h2><p>${esc(state.lang==='en'?c.nameZh:c.nameEn)}</p><div class="drawer-frequency-row">${frequencyChips(c,8)}</div></div>
      <section class="drawer-section"><h3>${tr('useWhen')}</h3><p>${esc(loc(c.when,c.whenEn))}</p></section>
      <section class="drawer-section"><h3>${tr('bringsResult')}</h3><p>${esc(loc(c.result,c.resultEn))}</p></section>
      <section class="drawer-section"><div class="section-title-line"><h3>${tr('executableFunctions')}</h3><span>${c.detailedFunctionCount} ${tr('items')}</span></div><div class="detail-function-list">${renderDetailedFunctions(c)}</div></section>
      <section class="drawer-section"><h3>${tr('relatedCapabilities')}</h3><div class="relation-chips">${related.length?related.map(r=>`<button class="relation-chip" data-open-capability="${r.id}"><strong>${esc(capabilityName(r))}</strong><br><span>${esc(r.platform)} · ${esc(loc(r.moduleZh,r.moduleEn))} · ${esc(primaryFrequency(r))}</span></button>`).join(''):`<span class="source-note">${tr('noRelations')}</span>`}</div></section>
      <section class="drawer-section"><h3>${tr('scenariosUsed')}</h3><div class="relation-chips">${scenarios.length?scenarios.map(s=>`<button class="relation-chip" data-open-scenario="${s.id}"><strong>${esc(loc(s.title,s.titleEn))}</strong><br><span>${esc(platformLabel(s.platform))} · ${esc(loc(s.stage,s.stageEn))}</span></button>`).join(''):`<span class="source-note">${tr('onlyCatalog')}</span>`}</div></section>
      <section class="drawer-section"><h3>${tr('sourceStructure')}</h3><div class="source-note">Module: ${esc(c.sourceModule)}<br>Category: ${esc(c.sourceCategory)}<br>Frequency: ${esc(state.lang==='en'?c.frequencyMix.map(x=>{const f=c.detailedFunctions.find(d=>d.frequencyType===x);return f?frequencyGuide().get(f.frequencyCode):x;}).join(', '):c.frequencySummary)}</div></section>`);
  }

  function openRole(id) {
    const role = roleById.get(id); if (!role) return; state.drawer = {type:'role',id};
    const items = visibleRoleItems(role);
    const capabilityCounts = new Map();
    items.forEach(item => capabilityCounts.set(item.capability.id,(capabilityCounts.get(item.capability.id)||0)+1));
    const capabilities = [...capabilityCounts.entries()].map(([capabilityId,count]) => ({capability:capabilityById.get(capabilityId),count})).filter(x=>x.capability);
    const permissionCounts = Object.fromEntries((data.permissions||[]).map(permission => [permission.code,items.filter(item => item.function.roleAssignments.some(a => a.roleId===role.id && a.permissions.includes(permission.code))).length]));
    openDrawer(`<div class="drawer-hero"><span class="badge cross">${esc(role.type==='SERVICE'?tr('roleTypeService'):tr('roleTypeHuman'))}</span><h2>${esc(roleName(role))}</h2><p>${esc(loc(role.descriptionZh,role.descriptionEn))}</p></div>
      <section class="drawer-section"><h3>${tr('roleScope')}</h3><div class="actor-chips">${role.platformScope.map(scope=>`<span class="actor-chip">${esc(scope==='CROSS'?tr('crossPlatform'):scope)}</span>`).join('')}</div></section>
      <section class="drawer-section"><h3>${tr('defaultPermissions')}</h3><div class="permission-chip-row">${permissionChips(role.defaultPermissions)}</div></section>
      <section class="drawer-section"><h3>${tr('permissionDistribution')}</h3><div class="permission-count-grid">${(data.permissions||[]).map(permission=>`<div><span class="permission-chip perm-${permission.code.toLowerCase()}">${esc(loc(permission.nameZh,permission.nameEn))}</span><strong>${permissionCounts[permission.code]||0}</strong></div>`).join('')}</div></section>
      <section class="drawer-section"><div class="section-title-line"><h3>${tr('roleModules')}</h3><span>${capabilities.length} ${tr('capabilitiesUnit')}</span></div><div class="relation-chips">${capabilities.map(({capability,count})=>`<button class="relation-chip" data-open-capability="${capability.id}"><strong>${esc(capabilityName(capability))}</strong><br><span>${esc(capability.platform)} · ${esc(loc(capability.moduleZh,capability.moduleEn))} · ${count} ${tr('functionsUnit')}</span></button>`).join('')}</div></section>`);
  }

  function refreshDrawer(){
    if(!state.drawer)return;
    if(state.drawer.type==='scenario') openScenario(state.drawer.id);
    else if(state.drawer.type==='role') openRole(state.drawer.id);
    else openCapability(state.drawer.id);
  }

  document.addEventListener('click',e=>{
    const nav=e.target.closest('[data-view]');if(nav)return setView(nav.dataset.view);
    const language=e.target.closest('[data-language]');if(language){state.lang=language.dataset.language;localStorage.setItem('dm-scp-language',state.lang);applyStaticTranslations();render();return;}
    const pf=e.target.closest('[data-platform]');if(pf){state.platform=pf.dataset.platform;document.querySelectorAll('[data-platform]').forEach(b=>b.classList.toggle('active',b===pf));render();return;}
    const toggle=e.target.closest('[data-toggle-module]');if(toggle){const id=toggle.dataset.toggleModule;state.collapsedModules.has(id)?state.collapsedModules.delete(id):state.collapsedModules.add(id);persistCollapsed();renderCatalog();return;}
    const scenario=e.target.closest('[data-open-scenario]');if(scenario)return openScenario(scenario.dataset.openScenario);
    const capability=e.target.closest('[data-open-capability]');if(capability)return openCapability(capability.dataset.openCapability);
    const role=e.target.closest('[data-open-role]');if(role)return openRole(role.dataset.openRole);
    const moduleTarget=e.target.closest('[data-module-target]');if(moduleTarget){const id=moduleTarget.dataset.moduleTarget;if(state.collapsedModules.has(id)){state.collapsedModules.delete(id);persistCollapsed();renderCatalog();}requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}));return;}
  });
  document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==els.search){e.preventDefault();els.search.focus();}if(e.key==='Escape')closeDrawer();if(e.key==='Enter'){const card=e.target.closest('.scenario-card');if(card)openScenario(card.dataset.openScenario);const cap=e.target.closest('.capability-row');if(cap)openCapability(cap.dataset.openCapability);const role=e.target.closest('.role-card');if(role)openRole(role.dataset.openRole);}});
  els.search.addEventListener('input',e=>{state.query=e.target.value.trim();render();});
  els.frequency.addEventListener('change',e=>{state.frequency=e.target.value;render();});
  document.querySelector('#expandAllModules').addEventListener('click',()=>{state.collapsedModules.clear();persistCollapsed();renderCatalog();});
  document.querySelector('#collapseAllModules').addEventListener('click',()=>{data.modules.forEach(m=>state.collapsedModules.add(m.id));persistCollapsed();renderCatalog();});
  document.querySelector('#drawerClose').addEventListener('click',closeDrawer);els.backdrop.addEventListener('click',closeDrawer);
  const help=document.querySelector('#helpDialog');document.querySelector('#helpButton').addEventListener('click',()=>help.showModal());document.querySelector('#helpClose').addEventListener('click',()=>help.close());help.addEventListener('click',e=>{if(e.target===help)help.close();});

  document.querySelector('#scenarioMetric').textContent=data.meta.scenarioCount;
  document.querySelector('#categoryMetric').textContent=data.meta.functionCategoryCount??data.meta.capabilityCount;
  document.querySelector('#detailMetric').textContent=data.meta.detailedFunctionCount??0;
  document.querySelector('#roleMetric').textContent=data.meta.roleCount??0;
  const initial=location.hash.replace('#','');if(['scenarios','journey','catalog','roles'].includes(initial))state.view=initial;
  applyStaticTranslations();setView(state.view);
})();
