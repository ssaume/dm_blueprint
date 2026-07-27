(() => {
  'use strict';
  const data = window.PROTOTYPE_DATA;
  const capabilityById = new Map(data.capabilities.map(c => [c.id, c]));
  const state = { view: 'scenarios', platform: 'ALL', frequency: 'ALL', query: '' };

  const els = {
    views: {
      scenarios: document.querySelector('#scenariosView'),
      journey: document.querySelector('#journeyView'),
      catalog: document.querySelector('#catalogView')
    },
    scenarioGrid: document.querySelector('#scenarioGrid'),
    scenarioEmpty: document.querySelector('#scenarioEmpty'),
    journeyFlow: document.querySelector('#journeyFlow'),
    moduleIndex: document.querySelector('#moduleIndex'),
    catalogContent: document.querySelector('#catalogContent'),
    catalogEmpty: document.querySelector('#catalogEmpty'),
    search: document.querySelector('#globalSearch'),
    frequency: document.querySelector('#frequencyFilter'),
    drawer: document.querySelector('#detailDrawer'),
    drawerContent: document.querySelector('#drawerContent'),
    backdrop: document.querySelector('#drawerBackdrop')
  };

  document.querySelector('#scenarioMetric').textContent = data.meta.scenarioCount;
  document.querySelector('#categoryMetric').textContent = data.meta.functionCategoryCount ?? data.meta.capabilityCount;
  document.querySelector('#detailMetric').textContent = data.meta.detailedFunctionCount ?? 0;

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const platformClass = p => p === 'SCP' ? 'scp' : p === 'CROSS' ? 'cross' : 'dm';
  const platformLabel = p => p === 'DM' ? 'DM 需求平台' : p === 'SCP' ? 'SCP 供應平台' : 'DM × SCP';
  const matches = text => !state.query || text.toLowerCase().includes(state.query.toLowerCase());
  const frequencyMatchesCapability = c => state.frequency === 'ALL' || c.detailedFunctions?.some(f => f.frequencyCode === state.frequency);
  const frequencyLabelByCode = new Map((data.meta.frequencyGuide || []).map(x => [x.code, x.label]));
  const frequencyClass = code => `freq-${String(code || '').toLowerCase()}`;

  function frequencyChips(c, max = 3) {
    const codes = [];
    (c.detailedFunctions || []).forEach(f => { if (!codes.includes(f.frequencyCode)) codes.push(f.frequencyCode); });
    return codes.slice(0, max).map(code => `<span class="frequency-chip ${frequencyClass(code)}">${esc(frequencyLabelByCode.get(code) || code)}</span>`).join('');
  }

  function scenarioSearchText(s) {
    const caps = s.functions.map(id => capabilityById.get(id)).filter(Boolean);
    return [
      s.title, s.summary, s.stage, s.severity, ...s.actors, ...s.trigger, ...s.results,
      ...caps.flatMap(c => [
        c.nameZh, c.nameEn, c.moduleZh, c.moduleEn, c.frequencySummary,
        ...(c.detailedFunctions || []).flatMap(f => [f.nameZh, f.description, f.frequencyType, f.frequencyDetail, f.trigger])
      ])
    ].join(' ');
  }

  function capabilitySearchText(c) {
    return [
      c.nameZh, c.nameEn, c.moduleZh, c.moduleEn, c.when, c.result, c.code, c.sourceCategory,
      c.frequencySummary,
      ...(c.detailedFunctions || []).flatMap(f => [f.nameZh, f.nameEn, f.description, f.frequencyType, f.frequencyDetail, f.trigger, f.code])
    ].join(' ');
  }

  function scenarioFrequencyMatch(s) {
    if (state.frequency === 'ALL') return true;
    return s.functions.some(id => frequencyMatchesCapability(capabilityById.get(id) || { detailedFunctions: [] }));
  }

  function setView(view) {
    state.view = view;
    Object.entries(els.views).forEach(([key, node]) => node.classList.toggle('active', key === view));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    location.hash = view;
    render();
  }

  function renderScenarios() {
    const list = data.scenarios.filter(s =>
      (state.platform === 'ALL' || s.platform === state.platform) &&
      scenarioFrequencyMatch(s) &&
      matches(scenarioSearchText(s))
    );
    els.scenarioGrid.innerHTML = list.map(s => `
      <article class="scenario-card ${platformClass(s.platform)}" data-open-scenario="${esc(s.id)}" tabindex="0">
        <div class="card-top">
          <span class="badge ${platformClass(s.platform)}">${esc(s.platformLabel)}</span>
          <span class="severity">${esc(s.severity)}情境</span>
        </div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
        <div class="scenario-rhythm">${(s.frequencySummary || []).slice(0,3).map(x => `<span>${esc(x)}</span>`).join('')}</div>
        <div class="card-meta">
          <span>${s.functionCount} 個關聯功能 · ${esc(s.stage)}</span>
          <button class="open-link" data-open-scenario="${esc(s.id)}">查看路徑 →</button>
        </div>
      </article>`).join('');
    els.scenarioEmpty.classList.toggle('hidden', list.length > 0);
  }

  function renderJourney() {
    const visible = data.journey.filter(j => state.platform === 'ALL' || j.platform === state.platform || (state.platform === 'CROSS' && j.platform === 'CROSS'));
    els.journeyFlow.innerHTML = visible.map(step => {
      const functions = step.functions.map(id => capabilityById.get(id)).filter(Boolean).filter(frequencyMatchesCapability);
      return `<article class="journey-step">
        <span class="badge ${platformClass(step.platform)}">${platformLabel(step.platform)}</span>
        <h3>${esc(step.title)}</h3><p>${esc(step.description)}</p>
        ${functions.map(c => `<button class="flow-function" data-open-capability="${c.id}">
          <strong>${esc(c.nameZh)}</strong><br>
          <span>${esc(c.platform)} · ${esc(c.moduleZh)} · ${esc(c.primaryFrequency)}</span>
        </button>`).join('') || '<span class="source-note">此步驟沒有符合目前頻率篩選的功能。</span>'}
      </article>`;
    }).join('');
  }

  function renderCatalog() {
    const modules = data.modules.filter(m => state.platform === 'ALL' || m.platform === state.platform);
    let visibleModuleCount = 0;
    els.moduleIndex.innerHTML = modules.map((m, i) => {
      const detailCount = m.capabilityIds.reduce((sum, id) => sum + (capabilityById.get(id)?.detailedFunctionCount || 0), 0);
      return `${i && modules[i-1].platform !== m.platform ? '<div class="module-divider"></div>' : ''}
        <button class="module-link" data-module-target="${esc(m.id)}">
          <span>${esc(m.nameZh)}</span><span>${m.count}／${detailCount}</span>
        </button>`;
    }).join('');

    els.catalogContent.innerHTML = modules.map(m => {
      const caps = m.capabilityIds
        .map(id => capabilityById.get(id))
        .filter(Boolean)
        .filter(frequencyMatchesCapability)
        .filter(c => matches(capabilitySearchText(c)));
      if (!caps.length) return '';
      visibleModuleCount += 1;
      const moduleDetailCount = caps.reduce((sum, c) => sum + (c.detailedFunctionCount || 0), 0);
      return `<section class="module-section" id="${esc(m.id)}">
        <header class="module-header ${platformClass(m.platform)}">
          <div><small>${esc(m.platform)} PLATFORM</small><h3>${esc(m.nameZh)} <span>／ ${esc(m.nameEn)}</span></h3></div>
          <strong>${caps.length} 類／${moduleDetailCount} 項</strong>
        </header>
        <div class="capability-list">${caps.map(c => `
          <article class="capability-row">
            <div class="cap-title">
              <strong>${esc(c.nameZh)}</strong>
              <span>${esc(c.code)} · ${esc(c.nameEn)}</span>
              <div class="cap-summary-line"><b>${c.detailedFunctionCount} 項細部功能</b>${frequencyChips(c)}</div>
            </div>
            <div class="cap-text"><label>何時使用</label><p>${esc(c.when)}</p></div>
            <div class="cap-text"><label>帶來結果</label><p>${esc(c.result)}</p></div>
            <button class="cap-open" data-open-capability="${c.id}" aria-label="查看 ${esc(c.nameZh)} 詳細資料">→</button>
          </article>`).join('')}</div>
      </section>`;
    }).join('');
    els.catalogEmpty.classList.toggle('hidden', visibleModuleCount > 0);
  }

  function render() {
    if (state.view === 'scenarios') renderScenarios();
    if (state.view === 'journey') renderJourney();
    if (state.view === 'catalog') renderCatalog();
  }

  function openDrawer(html) {
    els.drawerContent.innerHTML = html;
    els.backdrop.hidden = false;
    els.drawer.classList.add('open');
    els.drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    els.drawer.scrollTop = 0;
  }

  function closeDrawer() {
    els.drawer.classList.remove('open');
    els.drawer.setAttribute('aria-hidden','true');
    els.backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function openScenario(id) {
    const s = data.scenarios.find(x => x.id === id); if (!s) return;
    const path = s.functions.map((fid,i) => {
      const c = capabilityById.get(fid);
      return c ? `<button class="path-item ${platformClass(c.platform)}" data-open-capability="${c.id}">
        <span class="path-no">${i+1}</span>
        <span class="path-name"><strong>${esc(c.nameZh)}</strong><span>${esc(c.platform)} · ${esc(c.moduleZh)} · ${c.detailedFunctionCount} 項 · ${esc(c.primaryFrequency)}</span></span>
        <span class="path-open">→</span>
      </button>` : '';
    }).join('');
    openDrawer(`<div class="drawer-hero">
        <span class="badge ${platformClass(s.platform)}">${esc(s.platformLabel)}</span>
        <h2>${esc(s.title)}</h2><p>${esc(s.summary)}</p>
        <div class="drawer-frequency-row">${(s.frequencySummary || []).map(x => `<span class="frequency-chip">${esc(x)}</span>`).join('')}</div>
      </div>
      <section class="drawer-section"><h3>主要使用角色</h3><div class="actor-chips">${s.actors.map(x => `<span class="actor-chip">${esc(x)}</span>`).join('')}</div></section>
      <section class="drawer-section"><h3>什麼情況下會使用</h3><ul class="bullet-list">${s.trigger.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
      <section class="drawer-section"><h3>功能互動路徑</h3><div class="function-path">${path}</div></section>
      <section class="drawer-section"><h3>完成後會得到什麼</h3><ul class="bullet-list">${s.results.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`);
  }

  function renderDetailedFunctions(c) {
    return (c.detailedFunctions || []).map((f, i) => `
      <article class="detail-function-item">
        <div class="detail-function-head">
          <span class="detail-function-no">${i + 1}</span>
          <div><strong>${esc(f.nameZh)}</strong><small>${esc(f.code)}</small></div>
          <span class="frequency-chip ${frequencyClass(f.frequencyCode)}">${esc(f.frequencyType)}</span>
        </div>
        <p>${esc(f.description)}</p>
        <div class="frequency-detail"><span><b>建議節奏</b>${esc(f.frequencyDetail)}</span><span><b>觸發條件</b>${esc(f.trigger)}</span></div>
      </article>`).join('');
  }

  function openCapability(id) {
    const c = capabilityById.get(id); if (!c) return;
    const related = c.relatedIds.map(rid => capabilityById.get(rid)).filter(Boolean);
    const scenarios = data.scenarios.filter(s => s.functions.includes(id));
    openDrawer(`<div class="drawer-hero">
        <span class="badge ${platformClass(c.platform)}">${esc(c.platform)} · ${esc(c.moduleZh)}</span>
        <h2>${esc(c.nameZh)}</h2><p>${esc(c.nameEn)}</p>
        <div class="drawer-frequency-row">${frequencyChips(c, 8)}</div>
      </div>
      <section class="drawer-section"><h3>什麼情況下使用</h3><p>${esc(c.when)}</p></section>
      <section class="drawer-section"><h3>會帶來什麼結果</h3><p>${esc(c.result)}</p></section>
      <section class="drawer-section">
        <div class="section-title-line"><h3>可能包含的可執行功能</h3><span>${c.detailedFunctionCount} 項</span></div>
        <div class="detail-function-list">${renderDetailedFunctions(c)}</div>
      </section>
      <section class="drawer-section"><h3>牽涉的其他功能</h3><div class="relation-chips">${related.length ? related.map(r => `<button class="relation-chip" data-open-capability="${r.id}"><strong>${esc(r.nameZh)}</strong><br><span>${esc(r.platform)} · ${esc(r.moduleZh)} · ${esc(r.primaryFrequency)}</span></button>`).join('') : '<span class="source-note">目前未建立額外關聯。</span>'}</div></section>
      <section class="drawer-section"><h3>出現在哪些情境</h3><div class="relation-chips">${scenarios.length ? scenarios.map(s => `<button class="relation-chip" data-open-scenario="${s.id}"><strong>${esc(s.title)}</strong><br><span>${esc(s.platformLabel)} · ${esc(s.stage)}</span></button>`).join('') : '<span class="source-note">此功能目前只在完整功能目錄中呈現。</span>'}</div></section>
      <section class="drawer-section"><h3>來源結構</h3><div class="source-note">Module: ${esc(c.sourceModule)}<br>Category: ${esc(c.sourceCategory)}<br>Frequency: ${esc(c.frequencySummary)}</div></section>`);
  }

  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-view]'); if (nav) return setView(nav.dataset.view);
    const pf = e.target.closest('[data-platform]');
    if (pf) {
      state.platform = pf.dataset.platform;
      document.querySelectorAll('[data-platform]').forEach(b => b.classList.toggle('active', b === pf));
      render(); return;
    }
    const scenario = e.target.closest('[data-open-scenario]'); if (scenario) return openScenario(scenario.dataset.openScenario);
    const capability = e.target.closest('[data-open-capability]'); if (capability) return openCapability(capability.dataset.openCapability);
    const moduleTarget = e.target.closest('[data-module-target]');
    if (moduleTarget) { document.getElementById(moduleTarget.dataset.moduleTarget)?.scrollIntoView({behavior:'smooth'}); return; }
  });

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== els.search) { e.preventDefault(); els.search.focus(); }
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Enter') { const card = e.target.closest('.scenario-card'); if (card) openScenario(card.dataset.openScenario); }
  });

  els.search.addEventListener('input', e => { state.query = e.target.value.trim(); render(); });
  els.frequency.addEventListener('change', e => { state.frequency = e.target.value; render(); });
  document.querySelector('#drawerClose').addEventListener('click', closeDrawer);
  els.backdrop.addEventListener('click', closeDrawer);

  const help = document.querySelector('#helpDialog');
  document.querySelector('#helpButton').addEventListener('click', () => help.showModal());
  document.querySelector('#helpClose').addEventListener('click', () => help.close());
  help.addEventListener('click', e => { if (e.target === help) help.close(); });

  const initial = location.hash.replace('#','');
  if (['scenarios','journey','catalog'].includes(initial)) state.view = initial;
  setView(state.view);
})();
