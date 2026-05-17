// ============================================================
// GEOLYTICS — Interactive prototype
// ============================================================

const SCENARIOS = [
  { id: 'crisis', glyph: '📉', name: 'Crisis económica', desc: 'Recesión global, caída de mercados y contracción del crédito.', impact: 4, tag: 'Alto impacto',
    summary: 'Una caída abrupta de la actividad económica global que desencadena caídas bursátiles, fuga de capitales y presión cambiaria en economías emergentes.',
    effects: { sp500: -0.185, usdars: 0.42, wti: -0.28, gold: 0.15, inflation: 0.06, unemployment: 0.08 } },
  { id: 'conflict', glyph: '⚔️', name: 'Conflicto internacional', desc: 'Tensiones geopolíticas, sanciones y disrupción comercial.', impact: 4, tag: 'Alto impacto',
    summary: 'Un conflicto armado o geopolítico que altera rutas comerciales, eleva primas de riesgo y desplaza capitales hacia activos refugio.',
    effects: { sp500: -0.09, usdars: 0.18, wti: 0.34, gold: 0.22, inflation: 0.04, unemployment: 0.02 } },
  { id: 'rates', glyph: '📊', name: 'Suba de tasas de interés', desc: 'Política monetaria restrictiva, crédito más caro.', impact: 2, tag: 'Impacto medio',
    summary: 'Un ciclo de suba de tasas por parte de bancos centrales que encarece el financiamiento, fortalece al dólar y presiona a los mercados emergentes.',
    effects: { sp500: -0.08, usdars: 0.12, wti: -0.06, gold: -0.10, inflation: -0.03, unemployment: 0.015 } },
  { id: 'oil', glyph: '🛢️', name: 'Cambio en precios del petróleo', desc: 'Variación abrupta del crudo, efecto en costos y commodities.', impact: 2, tag: 'Impacto medio',
    summary: 'Un shock de oferta o demanda en el mercado del crudo que se propaga a costos industriales, transporte y presiones inflacionarias.',
    effects: { sp500: -0.04, usdars: 0.05, wti: 0.48, gold: 0.04, inflation: 0.05, unemployment: 0.005 } },
  { id: 'pandemic', glyph: '🦠', name: 'Pandemia', desc: 'Crisis sanitaria global, shock simultáneo de oferta y demanda.', impact: 4, tag: 'Alto impacto',
    summary: 'Una crisis sanitaria que paraliza cadenas de suministro y demanda agregada, provoca respuestas fiscales masivas y genera volatilidad extrema.',
    effects: { sp500: -0.22, usdars: 0.25, wti: -0.38, gold: 0.18, inflation: 0.08, unemployment: 0.12 } },
  { id: 'trade', glyph: '🌐', name: 'Guerra comercial', desc: 'Aranceles, represalias y reordenamiento de cadenas.', impact: 3, tag: 'Impacto variable',
    summary: 'Una escalada de aranceles y represalias entre grandes bloques que redistribuye flujos comerciales y eleva costos al consumidor.',
    effects: { sp500: -0.07, usdars: 0.08, wti: -0.05, gold: 0.08, inflation: 0.035, unemployment: 0.02 } }
];

const VARIABLES = [
  { id: 'sp500', name: 'Índices bursátiles', desc: 'S&P 500, Merval, índices globales', default: true },
  { id: 'usdars', name: 'Tipo de cambio USD', desc: 'Paridad USD / ARS y dólar index', default: true },
  { id: 'commodities', name: 'Commodities', desc: 'Petróleo, oro, soja, cobre', default: true },
  { id: 'inflation', name: 'Tasa de inflación', desc: 'IPC interanual global y local', default: false },
  { id: 'unemployment', name: 'Tasa de desempleo', desc: 'Desempleo agregado y sectorial', default: false }
];

// ---- Icons ----
const icon = (name, size=16) => {
  const paths = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    bars: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    compare: '<line x1="12" y1="2" x2="12" y2="22"/><polyline points="17 7 12 2 7 7"/><polyline points="7 17 12 22 17 17"/>',
    logo: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    arrowR: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowL: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    wand: '<path d="M15 4V2m0 14v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h0M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5"/>',
    sparkle: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
  };
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
};

// ---- Multi-page routing ----
const PAGE_MAP = {
  home:        'Geolytics.html',
  scenarios:   'escenarios.html',
  config:      'configuracion.html',
  loading:     'loading.html',
  results:     'resultados.html',
  history:     'historial.html',
  compare:     'comparar.html',
  profile:     'perfil.html',
  about:       'acerca.html',
  teachers:    'docentes.html',
  login:       'login.html',
  detail:      'detalle.html',
  onboarding:  'onboarding.html',
};

// ---- Persistent state (sobrevive entre páginas) ----
const SAVED = (() => {
  try { return JSON.parse(localStorage.getItem('geolytics-state') || '{}'); }
  catch { return {}; }
})();

// ---- State ----
const state = {
  screen: window.__INITIAL_SCREEN || 'home',
  selectedScenario: 'crisis',
  intensity: 75, // 0-100
  duration: 50,  // 0-100 (3mo, 6mo, 12mo, 24mo)
  vars: { sp500: true, usdars: true, commodities: true, inflation: false, unemployment: false },
  history: [
    { id: 1, scenario: 'crisis', intensityPct: 85, durIdx: 2, date: '05/04/2026', saved: true, name: 'Crisis económica' },
    { id: 2, scenario: 'conflict', intensityPct: 55, durIdx: 1, date: '03/04/2026', saved: false, name: 'Conflicto internacional' },
    { id: 3, scenario: 'pandemic', intensityPct: 80, durIdx: 3, date: '01/04/2026', saved: true, name: 'Pandemia' },
    { id: 4, scenario: 'oil', intensityPct: 95, durIdx: 0, date: '28/03/2026', saved: false, name: 'Shock petrolero' },
    { id: 5, scenario: 'rates', intensityPct: 60, durIdx: 2, date: '22/03/2026', saved: false, name: 'Suba de tasas' }
  ],
  compareA: 1,
  compareB: 2,
  chartMode: 'line',
  histFilter: 'all'
};

// Merge persisted state from localStorage (sobrevive entre páginas)
Object.assign(state, SAVED);
if (window.__INITIAL_SCREEN) state.screen = window.__INITIAL_SCREEN;

// ---- Helpers ----
const DURATIONS = [3, 6, 12, 24];
const INTENSITY_LABELS = ['Leve', 'Moderada', 'Alta', 'Extrema'];
const durIdx = (d) => Math.min(3, Math.floor(d / 25));
const intensityLabel = (i) => INTENSITY_LABELS[Math.min(3, Math.floor(i / 25))];
const intensityFactor = (i) => 0.3 + (i / 100) * 1.4; // scales effect
const getScenario = (id) => SCENARIOS.find(s => s.id === id);
const fmtPct = (v) => (v >= 0 ? '+' : '') + (v * 100).toFixed(1) + '%';
const fmtNum = (v, d=0) => v.toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: d });

// Generate time series based on scenario effects
function simulate(scenarioId, intensityPct, months) {
  const sc = getScenario(scenarioId);
  const factor = intensityFactor(intensityPct);
  const n = Math.max(8, Math.min(24, months));
  const series = {};
  const baselines = { sp500: 4500, usdars: 1020, wti: 78, gold: 1900, inflation: 0.04, unemployment: 0.055 };
  for (const k of Object.keys(sc.effects)) {
    const delta = sc.effects[k] * factor;
    const base = baselines[k];
    const arr = [];
    for (let i = 0; i < n; i++) {
      // Curve: slow start, steepest middle, slight rebound at end (for negatives)
      const t = i / (n - 1);
      // shock profile
      const shock = delta * (1 - Math.exp(-3 * t)) * (1 - 0.25 * Math.max(0, t - 0.7) / 0.3);
      // small noise
      const noise = (Math.sin(i * 1.3 + k.length) * 0.008 + (Math.random() - 0.5) * 0.004) * Math.abs(delta || 0.05);
      const val = base * (1 + shock + noise);
      arr.push(val);
    }
    series[k] = { base, final: arr[arr.length - 1], delta, arr };
  }
  return series;
}

// SVG path helpers
function buildLinePath(values, w, h, pad=6) {
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const n = values.length;
  return values.map((v, i) => {
    const x = pad + (i / (n - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}
function buildAreaPath(values, w, h, pad=6) {
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const n = values.length;
  let d = '';
  values.forEach((v, i) => {
    const x = pad + (i / (n - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
  });
  d += `L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  return d;
}

// ============================================================
// SIDEBAR
// ============================================================
function sidebarHTML() {
  const items = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'scenarios', label: 'Escenarios', icon: 'grid', count: SCENARIOS.length },
    { id: 'config', label: 'Configuración', icon: 'sliders' },
    { id: 'results', label: 'Resultados', icon: 'bars' },
    { id: 'history', label: 'Mis simulaciones', icon: 'clock', count: state.history.length },
    { id: 'compare', label: 'Comparación', icon: 'compare' }
  ];
  const helpItems = [
    { id: 'about', label: 'Acerca de', icon: 'info' },
    { id: 'teachers', label: 'Para docentes', icon: 'sparkle' }
  ];
  return `
    <aside class="side" data-screen-label="Sidebar">
      <div class="brand">
        <div class="brand-mark">${icon('logo', 18)}</div>
        <div>
          <div class="brand-name">Geolytics</div>
          <div class="brand-sub">Simulador · v1.0</div>
        </div>
      </div>
      <nav class="nav">
        <div class="nav-heading">Navegación</div>
        ${items.map(it => `
          <button class="nav-item ${state.screen === it.id ? 'active' : ''}" data-nav="${it.id}">
            ${icon(it.icon, 16)}
            <span>${it.label}</span>
            ${it.count ? `<span class="nav-count">${it.count}</span>` : ''}
          </button>
        `).join('')}
        <div class="nav-heading" style="margin-top:18px;">Ayuda</div>
        ${helpItems.map(it => `
          <button class="nav-item ${state.screen === it.id ? 'active' : ''}" data-nav="${it.id}">
            ${icon(it.icon, 16)}
            <span>${it.label}</span>
          </button>
        `).join('')}
        <div class="nav-heading" style="margin-top:18px;">Recientes</div>
        ${state.history.slice(0, 3).map(h => {
          const sc = getScenario(h.scenario);
          return `<button class="nav-item" data-nav-history="${h.id}" style="font-size:12.5px;">
            <span style="font-size:14px;">${sc.glyph}</span>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${h.name}</span>
          </button>`;
        }).join('')}
      </nav>
      <div class="side-footer">
        <div class="user-row">
          <div class="avatar" data-user-action="profile" style="cursor:pointer;">${(state.profile?.first?.[0] || 'T') + (state.profile?.last?.[0] || 'F')}</div>
          <div data-user-action="profile" style="cursor:pointer; flex:1; min-width:0;">
            <div class="user-name" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${state.profile?.first || 'Tomás'} ${(state.profile?.last || 'Fernández')[0]}.</div>
            <div class="user-role">${state.profile?.occupation || 'Estudiante'}</div>
          </div>
          <button class="icon-btn" data-user-action="logout" title="Cerrar sesión" style="width:28px; height:28px; margin-left:auto; background:transparent; border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.6)">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </aside>
  `;
}

// ============================================================
// TOPBAR
// ============================================================
const TITLES = {
  home: 'Inicio',
  scenarios: 'Escenarios',
  config: 'Configuración',
  results: 'Resultados',
  history: 'Mis simulaciones',
  compare: 'Comparación',
  profile: 'Perfil',
  detail: 'Detalle de escenario',
  about: 'Acerca de',
  teachers: 'Para docentes'
};

function topbarHTML() {
  const crumbs = {
    home: ['Panel'],
    scenarios: ['Simulación', 'Escenarios'],
    config: ['Simulación', 'Escenarios', 'Configuración'],
    results: ['Simulación', 'Resultados'],
    history: ['Biblioteca', 'Mis simulaciones'],
    compare: ['Biblioteca', 'Comparación'],
    profile: ['Cuenta', 'Perfil'],
    detail: ['Simulación', 'Escenarios', 'Detalle'],
    about: ['Ayuda', 'Acerca de'],
    teachers: ['Ayuda', 'Para docentes']
  }[state.screen] || ['Panel'];
  return `
    <div class="topbar">
      <button class="mobile-menu-btn" data-action="toggle-sidebar" aria-label="Abrir menú">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div class="crumbs">
        ${crumbs.map((c, i) => i === crumbs.length - 1
          ? `<strong>${c}</strong>`
          : `<span>${c}</span><span class="slash">/</span>`).join('')}
      </div>
      <div class="top-actions">
        <div class="search">
          ${icon('search', 14)}
          <span>Buscar escenario, variable…</span>
          <kbd>⌘K</kbd>
        </div>
        <button class="icon-btn" aria-label="Notificaciones">
          ${icon('bell', 15)}
          <span class="pip"></span>
        </button>
        <button class="btn btn-primary btn-sm" data-action="new-sim">
          ${icon('sparkle', 14)}
          Nueva simulación
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// HOME
// ============================================================
function homeHTML() {
  // hero tickers from last sim
  const last = state.history[0];
  const last_sc = getScenario(last.scenario);
  const sim = simulate(last.scenario, last.intensityPct, DURATIONS[last.durIdx]);
  const spark = buildLinePath(sim.sp500.arr, 260, 80);
  return `
    <section class="screen active" id="screen-home" data-screen-label="Home">
      <section class="hero">
        <div>
          <div class="hero-eyebrow"><span class="live-dot"></span>Simulador económico · Edición 2026</div>
          <h1>Explorá cómo los<br>eventos globales<br><em>remodelan</em> la economía.</h1>
          <p>Elegí un escenario, ajustá su intensidad y duración, y visualizá el impacto en variables clave —sin tecnicismos, con explicaciones claras.</p>
          <div class="hero-cta">
            <button class="btn btn-primary" data-nav="scenarios">
              ${icon('play', 14)} Explorar escenarios
            </button>
            <button class="btn btn-ghost" data-nav="results">
              ${icon('info', 14)} Ver ejemplo
            </button>
          </div>
        </div>
        <div class="hero-viz">
          <div class="hero-viz-header">
            <div>
              <div class="hero-viz-title">Última simulación</div>
              <div style="color:#fff; font-weight:600; font-size:13.5px; margin-top:2px;">${last_sc.glyph} ${last.name}</div>
            </div>
            <span class="hero-viz-badge">${last.date}</span>
          </div>
          <svg class="hero-sparkline" viewBox="0 0 260 80" preserveAspectRatio="none" style="width:100%; height:80px;">
            <defs>
              <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#C4703B" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#C4703B" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${buildAreaPath(sim.sp500.arr, 260, 80)}" fill="url(#heroGrad)"/>
            <path d="${spark}" fill="none" stroke="#C4703B" stroke-width="2"/>
          </svg>
          <div class="hero-tickers">
            <div class="hero-ticker">
              <div class="hero-ticker-label">S&P 500</div>
              <div class="hero-ticker-value">${fmtNum(sim.sp500.final)}</div>
              <div class="hero-ticker-change ${sim.sp500.delta < 0 ? 'chg-neg' : 'chg-pos'}">${fmtPct(sim.sp500.delta)}</div>
            </div>
            <div class="hero-ticker">
              <div class="hero-ticker-label">USD/ARS</div>
              <div class="hero-ticker-value">${fmtNum(sim.usdars.final)}</div>
              <div class="hero-ticker-change ${sim.usdars.delta < 0 ? 'chg-neg' : 'chg-pos'}">${fmtPct(sim.usdars.delta)}</div>
            </div>
            <div class="hero-ticker">
              <div class="hero-ticker-label">Oro</div>
              <div class="hero-ticker-value">$${fmtNum(sim.gold.final)}</div>
              <div class="hero-ticker-change ${sim.gold.delta < 0 ? 'chg-neg' : 'chg-pos'}">${fmtPct(sim.gold.delta)}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="feature">
          <div class="feature-icon">${icon('sliders', 20)}</div>
          <h3>Simulación interactiva</h3>
          <p>Elegí un evento, ajustá intensidad y duración, y observá el impacto en tiempo real en las variables clave.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">${icon('grid', 20)}</div>
          <h3>Escenarios globales</h3>
          <p>Seis escenarios validados: crisis económica, pandemia, conflicto, guerra comercial, shocks petroleros y más.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">${icon('info', 20)}</div>
          <h3>Aprendé haciendo</h3>
          <p>Cada resultado incluye una explicación causal clara. Para entender —no solo para mirar gráficos.</p>
        </div>
      </section>

      <section class="strip">
        <div class="strip-head">
          <h3>Explorá los escenarios</h3>
          <button class="btn btn-ghost btn-sm" data-nav="scenarios">Ver todos ${icon('arrowR', 14)}</button>
        </div>
        <div class="strip-list">
          ${SCENARIOS.slice(0, 3).map(sc => `
            <div class="strip-card" data-pick-scenario="${sc.id}">
              <div class="strip-glyph">${sc.glyph}</div>
              <div style="flex:1">
                <div class="strip-title">${sc.name}</div>
                <div class="strip-meta">${sc.tag.toUpperCase()}</div>
              </div>
              ${icon('arrowR', 16)}
            </div>
          `).join('')}
        </div>
      </section>
    </section>
  `;
}

// ============================================================
// SCENARIOS
// ============================================================
function scenariosHTML() {
  const selected = getScenario(state.selectedScenario);
  return `
    <section class="screen active" id="screen-scenarios" data-screen-label="Scenarios">
      <div class="page-head">
        <div>
          <div class="eyebrow">Paso 1 de 3</div>
          <h2 class="page-title" style="margin-top:6px;">Elegí un escenario</h2>
          <p class="page-sub">Seleccioná el tipo de evento global que querés simular. Luego podrás ajustar su intensidad y duración.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-ghost btn-sm">Filtros</button>
          <button class="btn btn-ghost btn-sm">Ordenar</button>
        </div>
      </div>
      <div class="scenario-grid">
        ${SCENARIOS.map(sc => `
          <article class="scenario-card ${sc.id === state.selectedScenario ? 'selected' : ''}" data-pick-scenario="${sc.id}">
            <div class="scenario-check">${icon('check', 12)}</div>
            <button class="scenario-info" data-detail-scenario="${sc.id}" aria-label="Ver detalle">${icon('info', 14)}</button>
            <div class="scenario-glyph">${sc.glyph}</div>
            <h3>${sc.name}</h3>
            <p>${sc.desc}</p>
            <div class="scenario-foot">
              <span class="pill ${sc.impact >= 4 ? 'pill-accent' : ''}">${sc.tag}</span>
              <div class="impact-bar lvl-${sc.impact}"><span></span><span></span><span></span><span></span></div>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="continue-bar">
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="scenario-glyph" style="margin-bottom:0; width:40px; height:40px; font-size:20px;">${selected.glyph}</div>
          <div>
            <div style="font-size:13px; color:var(--muted); font-family:var(--font-mono); letter-spacing:0.04em;">SELECCIONADO</div>
            <div style="font-size:15px; font-weight:700;">${selected.name}</div>
          </div>
        </div>
        <button class="btn btn-primary" data-nav="config">
          Continuar a configuración ${icon('arrowR', 14)}
        </button>
      </div>
    </section>
  `;
}

// ============================================================
// CONFIG
// ============================================================
function configHTML() {
  const sc = getScenario(state.selectedScenario);
  const months = DURATIONS[durIdx(state.duration)];
  const sim = simulate(state.selectedScenario, state.intensity, months);
  const previewVars = ['sp500', 'usdars', 'wti', 'gold'].filter(k => sim[k]);

  return `
    <section class="screen active" id="screen-config" data-screen-label="Config">
      <div class="page-head">
        <div>
          <div class="eyebrow">Paso 2 de 3 · Configuración</div>
          <h2 class="page-title" style="margin-top:6px;">Ajustá los parámetros</h2>
          <p class="page-sub">Intensidad, duración y variables a observar. La vista previa se actualiza al instante.</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-nav="scenarios">${icon('arrowL', 14)} Cambiar escenario</button>
      </div>

      <div class="config-layout">
        <div class="card config-card">
          <div class="config-selected">
            <div class="scenario-glyph" style="margin-bottom:0;">${sc.glyph}</div>
            <div>
              <div class="eyebrow">Escenario</div>
              <h3 style="font-family:var(--font-display); font-size:20px; font-weight:700; letter-spacing:-0.02em; margin-top:2px;">${sc.name}</h3>
              <p style="font-size:13px; color:var(--muted); margin-top:4px; max-width:460px;">${sc.summary}</p>
            </div>
          </div>

          <div class="config-section">
            <div class="config-section-head">
              <h4>${icon('wand', 14)} Intensidad del evento <span class="hint">¿Qué tan grave es?</span></h4>
              <span class="value-chip" id="intensity-chip">${intensityLabel(state.intensity)}</span>
            </div>
            <div class="slider-wrap">
              <input type="range" class="slider" id="intensity-slider" min="0" max="100" value="${state.intensity}" style="--val: ${state.intensity}%;">
              <div class="slider-ticks">
                <span>Leve</span><span>Moderada</span><span>Alta</span><span>Extrema</span>
              </div>
            </div>
          </div>

          <div class="config-section">
            <div class="config-section-head">
              <h4>${icon('clock', 14)} Duración estimada <span class="hint">¿Cuánto dura el evento?</span></h4>
              <span class="value-chip" id="duration-chip">${months} meses</span>
            </div>
            <div class="slider-wrap">
              <input type="range" class="slider" id="duration-slider" min="0" max="75" step="25" value="${state.duration}" style="--val: ${state.duration + 25/3}%;">
              <div class="slider-ticks">
                <span>3 meses</span><span>6 meses</span><span>12 meses</span><span>24 meses</span>
              </div>
            </div>
          </div>

          <div class="config-section">
            <div class="config-section-head">
              <h4>${icon('bars', 14)} Variables a observar</h4>
              <span style="font-size:12px; color:var(--muted); font-family:var(--font-mono);">${Object.values(state.vars).filter(Boolean).length} de ${VARIABLES.length}</span>
            </div>
            <div class="var-list">
              ${VARIABLES.map(v => `
                <div class="var-row ${state.vars[v.id] ? 'on' : ''}" data-toggle-var="${v.id}">
                  <div class="checkbox">${icon('check', 10)}</div>
                  <div style="flex:1">
                    <div class="vname">${v.name}</div>
                    <div class="vdesc">${v.desc}</div>
                  </div>
                  <div class="vtrend">${state.vars[v.id] ? 'OBSERVANDO' : '—'}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display:flex; gap:10px; padding-top:18px; border-top:1px dashed var(--line);">
            <button class="btn btn-ghost" data-nav="scenarios">${icon('arrowL', 14)} Cambiar escenario</button>
            <button class="btn btn-primary" data-action="run-sim" style="margin-left:auto;">
              ${icon('play', 14)} Simular ahora
            </button>
          </div>
        </div>

        <aside class="preview" id="preview-panel">
          <h4>Vista previa en vivo
            <span class="pill pill-accent" style="font-size:9.5px; padding:2px 8px;">AUTO</span>
          </h4>
          ${previewVars.map(k => {
            const s = sim[k];
            const w = 300, h = 40;
            const labels = { sp500: 'S&P 500', usdars: 'USD / ARS', wti: 'Petróleo WTI', gold: 'Oro' };
            const units = { sp500: '', usdars: '', wti: '$', gold: '$' };
            return `
              <div class="preview-item">
                <div class="pi-head">
                  <span class="pi-label">${labels[k]}</span>
                  <span class="pi-delta ${s.delta < 0 ? '' : ''}" style="color:${s.delta < 0 ? 'var(--neg)' : 'var(--pos)'}">${fmtPct(s.delta)}</span>
                </div>
                <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%; height:40px;">
                  <path d="${buildAreaPath(s.arr, w, h, 2)}" fill="${s.delta < 0 ? 'rgba(168,56,56,0.12)' : 'rgba(47,107,74,0.12)'}"/>
                  <path d="${buildLinePath(s.arr, w, h, 2)}" fill="none" stroke="${s.delta < 0 ? 'var(--neg)' : 'var(--pos)'}" stroke-width="1.5"/>
                </svg>
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:10.5px; color:var(--muted); margin-top:3px;">
                  <span>${units[k]}${fmtNum(s.base, k==='inflation'||k==='unemployment'? 3:0)}</span>
                  <span>${units[k]}${fmtNum(s.final, k==='inflation'||k==='unemployment'? 3:0)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </aside>
      </div>
    </section>
  `;
}

// ============================================================
// RESULTS
// ============================================================
function resultsHTML() {
  const sc = getScenario(state.selectedScenario);
  const months = DURATIONS[durIdx(state.duration)];
  const sim = simulate(state.selectedScenario, state.intensity, months);

  const kpis = [
    { key: 'sp500', label: 'S&P 500', unit: '', digits: 0 },
    { key: 'usdars', label: 'USD / ARS', unit: '', digits: 0 },
    { key: 'wti', label: 'Petróleo WTI', unit: '$', digits: 0 },
    { key: 'gold', label: 'Oro (oz)', unit: '$', digits: 0 }
  ];

  return `
    <section class="screen active" id="screen-results" data-screen-label="Results">
      <div class="result-head">
        <div>
          <div class="eyebrow">Paso 3 · Resultados de simulación</div>
          <h1 class="result-title" style="margin-top:8px;">${sc.glyph} ${sc.name}<br><em>${intensityLabel(state.intensity).toLowerCase()}</em>, ${months} meses</h1>
          <div class="result-meta">
            <span class="pill pill-brand">${sc.tag}</span>
            <span class="pill">Intensidad: ${intensityLabel(state.intensity)}</span>
            <span class="pill">Duración: ${months} meses</span>
            <span class="pill">${Object.values(state.vars).filter(Boolean).length} variables</span>
          </div>
        </div>
        <div class="result-actions">
          <button class="btn btn-ghost btn-sm" data-nav="compare">${icon('compare', 14)} Comparar</button>
          <button class="btn btn-ghost btn-sm">${icon('download', 14)} Exportar</button>
          <button class="btn btn-primary btn-sm">${icon('save', 14)} Guardar</button>
        </div>
      </div>

      <div class="kpi-grid">
        ${kpis.map(k => {
          const s = sim[k.key];
          const pos = s.delta >= 0;
          return `
            <div class="kpi">
              <div class="kpi-label">${k.label}</div>
              <div class="kpi-value"><span class="cur">${k.unit}</span>${fmtNum(s.final, k.digits)}</div>
              <div class="kpi-change ${pos ? 'pos' : 'neg'}">
                ${pos ? '▲' : '▼'} ${fmtPct(s.delta)}
              </div>
              <svg class="kpi-spark" viewBox="0 0 90 36" preserveAspectRatio="none">
                <path d="${buildLinePath(s.arr, 90, 36, 2)}" fill="none" stroke="${pos ? 'var(--pos)' : 'var(--neg)'}" stroke-width="1.5"/>
              </svg>
            </div>
          `;
        }).join('')}
      </div>

      <div class="charts-grid">
        <div class="card chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Índices bursátiles</div>
              <div class="chart-sub">S&P 500 · ${months} meses proyectados</div>
            </div>
            <div class="chart-toggle">
              <button class="${state.chartMode === 'line' ? 'on' : ''}" data-chart-mode="line">Línea</button>
              <button class="${state.chartMode === 'area' ? 'on' : ''}" data-chart-mode="area">Área</button>
              <button class="${state.chartMode === 'bars' ? 'on' : ''}" data-chart-mode="bars">Barras</button>
            </div>
          </div>
          ${renderBigChart(sim.sp500, 560, 240, state.chartMode, '--chart-1')}
          <div class="legend">
            <div class="legend-item"><span class="legend-swatch" style="background:var(--chart-1)"></span>S&P 500</div>
            <div class="legend-item" style="color:var(--muted-2)"><span class="legend-swatch" style="background:var(--line-strong)"></span>Baseline</div>
          </div>
        </div>
        <div class="card chart-card">
          <div class="chart-header">
            <div>
              <div class="chart-title">Commodities</div>
              <div class="chart-sub">Petróleo, oro — normalizados</div>
            </div>
          </div>
          ${renderMultiChart([
            { key: 'wti', label: 'Petróleo', color: 'var(--chart-2)', s: sim.wti },
            { key: 'gold', label: 'Oro', color: 'var(--chart-3)', s: sim.gold }
          ], 360, 240)}
          <div class="legend">
            <div class="legend-item"><span class="legend-swatch" style="background:var(--chart-2)"></span>Petróleo WTI</div>
            <div class="legend-item"><span class="legend-swatch" style="background:var(--chart-3)"></span>Oro</div>
          </div>
        </div>
      </div>

      <div class="explain">
        <div class="explain-head">
          <div>
            <div class="eyebrow" style="color:var(--brand);">${icon('info', 14)} ¿Qué está pasando?</div>
            <h3 class="explain-title" style="margin-top:6px;">Interpretación del escenario <em>en contexto</em></h3>
          </div>
          <button class="btn btn-ghost btn-sm">Ver metodología ${icon('arrowR', 14)}</button>
        </div>
        <p>${buildExplanation(sc, sim, state.intensity, months)}</p>
        <div class="causal-chain">
          ${buildCausalChain(sc, sim)}
        </div>
      </div>
    </section>
  `;
}

function buildExplanation(sc, sim, intensity, months) {
  const impact = intensityLabel(intensity).toLowerCase();
  const sp = fmtPct(sim.sp500.delta);
  const usd = fmtPct(sim.usdars.delta);
  const oil = fmtPct(sim.wti.delta);
  const gold = fmtPct(sim.gold.delta);
  return `Una <strong>${sc.name.toLowerCase()}</strong> de intensidad <strong>${impact}</strong> sostenida durante <strong>${months} meses</strong> genera un reacomodamiento sistémico: ${sc.summary} Los índices bursátiles reaccionan con ${sp}, el tipo de cambio se ajusta ${usd}, el petróleo refleja ${oil} y el oro —como activo refugio— ${gold}.`;
}

function buildCausalChain(sc, sim) {
  const nodes = [];
  nodes.push(`<div class="cause-node primary">${sc.glyph} ${sc.name}</div>`);
  const arrow = `<div class="cause-arrow">${icon('arrowR', 16)}</div>`;
  const chain = [
    { label: `Bolsa ${fmtPct(sim.sp500.delta)}` },
    { label: `Dólar ${fmtPct(sim.usdars.delta)}` },
    { label: `Oro ${fmtPct(sim.gold.delta)}` }
  ];
  chain.forEach(c => {
    nodes.push(arrow);
    nodes.push(`<div class="cause-node">${c.label}</div>`);
  });
  return nodes.join('');
}

function renderBigChart(s, w, h, mode, colorVar) {
  const baseline = s.base;
  const baseY = (y) => {
    const min = Math.min(...s.arr, baseline * 0.95);
    const max = Math.max(...s.arr, baseline * 1.05);
    const range = max - min;
    return 24 + (1 - (y - min) / range) * (h - 48);
  };
  const pad = 20;
  const effW = w - pad * 2;
  const n = s.arr.length;

  // axes labels
  const months = ['E','F','M','A','M','J','J','A','S','O','N','D'];
  let ticks = '';
  for (let i = 0; i < 5; i++) {
    const x = pad + (i / 4) * effW;
    ticks += `<line x1="${x}" y1="${h - 20}" x2="${x}" y2="${h - 16}" stroke="var(--line-strong)" stroke-width="1"/>`;
    ticks += `<text x="${x}" y="${h - 4}" font-size="10" fill="var(--muted)" font-family="IBM Plex Mono" text-anchor="middle">${months[Math.floor(i * n / 4) % 12]}</text>`;
  }

  // y gridlines
  let grid = '';
  for (let i = 0; i < 4; i++) {
    const y = 24 + (i / 3) * (h - 48);
    grid += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="var(--line)" stroke-width="1" stroke-dasharray="2 4"/>`;
  }

  // baseline
  const by = baseY(baseline);
  const baselineLine = `<line x1="${pad}" y1="${by}" x2="${w - pad}" y2="${by}" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="${w - pad - 4}" y="${by - 4}" font-size="10" fill="var(--muted)" font-family="IBM Plex Mono" text-anchor="end">baseline ${fmtNum(baseline)}</text>`;

  // build body
  let body = '';
  if (mode === 'bars') {
    const bw = (effW / n) * 0.7;
    body = s.arr.map((v, i) => {
      const x = pad + (i / (n - 1)) * effW - bw / 2;
      const y = baseY(v);
      const h2 = Math.max(2, by - y);
      const pos = v >= baseline;
      return `<rect x="${x}" y="${pos ? y : by}" width="${bw}" height="${Math.abs(h2)}" fill="var(${pos ? '--pos' : '--neg'})" opacity="0.75" rx="2"/>`;
    }).join('');
  } else {
    // path in normalized coords
    const pts = s.arr.map((v, i) => {
      const x = pad + (i / (n - 1)) * effW;
      const y = baseY(v);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const linePath = 'M' + pts.join(' L');
    if (mode === 'area') {
      const areaPath = linePath + ` L${w - pad},${h - 24} L${pad},${h - 24} Z`;
      body = `<defs><linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="var(${colorVar})" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="var(${colorVar})" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${areaPath}" fill="url(#areaGrad)"/>
      <path d="${linePath}" fill="none" stroke="var(${colorVar})" stroke-width="2.5"/>`;
    } else {
      body = `<path d="${linePath}" fill="none" stroke="var(${colorVar})" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      // endpoint dot
      const last = pts[pts.length - 1].split(',');
      body += `<circle cx="${last[0]}" cy="${last[1]}" r="4" fill="var(${colorVar})"/>
        <circle cx="${last[0]}" cy="${last[1]}" r="8" fill="var(${colorVar})" opacity="0.2"/>`;
    }
  }

  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%; height:${h}px; display:block;">
    ${grid}${baselineLine}${body}${ticks}
  </svg>`;
}

function renderMultiChart(series, w, h) {
  const pad = 20;
  const effW = w - pad * 2;
  // normalize each to its own 0-1 range
  let body = '';
  series.forEach((ss) => {
    const arr = ss.s.arr;
    const min = Math.min(...arr), max = Math.max(...arr);
    const range = max - min || 1;
    const n = arr.length;
    const pts = arr.map((v, i) => {
      const x = pad + (i / (n - 1)) * effW;
      const y = 24 + (1 - (v - min) / range) * (h - 48);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    body += `<path d="M${pts.join(' L')}" fill="none" stroke="${ss.color}" stroke-width="2.2"/>`;
    const last = pts[pts.length - 1].split(',');
    body += `<circle cx="${last[0]}" cy="${last[1]}" r="3.5" fill="${ss.color}"/>`;
  });
  let grid = '';
  for (let i = 0; i < 4; i++) {
    const y = 24 + (i / 3) * (h - 48);
    grid += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="var(--line)" stroke-width="1" stroke-dasharray="2 4"/>`;
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%; height:${h}px; display:block;">${grid}${body}</svg>`;
}

// ============================================================
// HISTORY
// ============================================================
function historyHTML() {
  const list = state.history.filter(h => state.histFilter === 'all' || (state.histFilter === 'saved' && h.saved));
  return `
    <section class="screen active" id="screen-history" data-screen-label="History">
      <div class="page-head">
        <div>
          <div class="eyebrow">Biblioteca</div>
          <h2 class="page-title" style="margin-top:6px;">Mis simulaciones</h2>
          <p class="page-sub">Historial completo de escenarios simulados. Marcá favoritos, compará entre sí y volvé a abrir cualquiera.</p>
        </div>
      </div>

      <div class="history-controls">
        <div class="search" style="background: var(--surface); min-width: 320px;">
          ${icon('search', 14)}
          <span>Buscar simulación…</span>
        </div>
        <div class="seg">
          <button class="${state.histFilter === 'all' ? 'on' : ''}" data-hist-filter="all">Todas · ${state.history.length}</button>
          <button class="${state.histFilter === 'saved' ? 'on' : ''}" data-hist-filter="saved">Favoritas · ${state.history.filter(h => h.saved).length}</button>
        </div>
        <div style="margin-left:auto; display:flex; gap:8px;">
          <button class="btn btn-ghost btn-sm">Ordenar: más recientes ${icon('arrowR', 14)}</button>
        </div>
      </div>

      <div class="history-list">
        ${list.map(h => {
          const sc = getScenario(h.scenario);
          const sim = simulate(h.scenario, h.intensityPct, DURATIONS[h.durIdx]);
          const sp = sim.sp500.arr;
          const pos = sim.sp500.delta >= 0;
          return `
            <div class="history-row" data-hist-open="${h.id}">
              <div class="h-glyph">${sc.glyph}</div>
              <div class="h-main">
                <div class="h-name">${h.name}</div>
                <div class="h-tags">
                  <span class="pill">${intensityLabel(h.intensityPct)}</span>
                  <span class="pill">${DURATIONS[h.durIdx]} meses</span>
                  <span class="pill ${pos ? 'pill-pos' : 'pill-neg'}">S&P ${fmtPct(sim.sp500.delta)}</span>
                </div>
              </div>
              <svg class="h-spark" viewBox="0 0 120 32" preserveAspectRatio="none">
                <path d="${buildLinePath(sp, 120, 32, 2)}" fill="none" stroke="${pos ? 'var(--pos)' : 'var(--neg)'}" stroke-width="1.5"/>
              </svg>
              <div class="h-meta">
                <div class="lab">Fecha</div>
                <div class="val">${h.date}</div>
              </div>
              <div class="h-actions">
                <button class="btn btn-ghost btn-sm">Ver</button>
                <button class="btn btn-ghost btn-sm" data-hist-compare="${h.id}">Comparar</button>
                <button class="h-bookmark ${h.saved ? 'on' : ''}" data-hist-save="${h.id}" title="Favorita">
                  ${icon('bookmark', 15)}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display:flex; justify-content:center; gap:4px; margin-top:24px;">
        <button class="btn btn-ghost btn-sm">${icon('arrowL', 12)}</button>
        <button class="btn btn-primary btn-sm" style="min-width:34px">1</button>
        <button class="btn btn-ghost btn-sm" style="min-width:34px">2</button>
        <button class="btn btn-ghost btn-sm" style="min-width:34px">3</button>
        <button class="btn btn-ghost btn-sm">${icon('arrowR', 12)}</button>
      </div>
    </section>
  `;
}

// ============================================================
// COMPARE
// ============================================================
function compareHTML() {
  const a = state.history.find(h => h.id === state.compareA) || state.history[0];
  const b = state.history.find(h => h.id === state.compareB) || state.history[1];
  const sa = getScenario(a.scenario), sb = getScenario(b.scenario);
  const simA = simulate(a.scenario, a.intensityPct, DURATIONS[a.durIdx]);
  const simB = simulate(b.scenario, b.intensityPct, DURATIONS[b.durIdx]);

  const vars = [
    { key: 'sp500', label: 'S&P 500', unit: '', digits: 0 },
    { key: 'usdars', label: 'USD / ARS', unit: '', digits: 0 },
    { key: 'wti', label: 'Petróleo WTI', unit: '$', digits: 0 },
    { key: 'gold', label: 'Oro', unit: '$', digits: 0 },
    { key: 'inflation', label: 'Inflación', unit: '', digits: 3 },
    { key: 'unemployment', label: 'Desempleo', unit: '', digits: 3 }
  ];

  return `
    <section class="screen active" id="screen-compare" data-screen-label="Compare">
      <div class="page-head">
        <div>
          <div class="eyebrow">Análisis comparativo</div>
          <h2 class="page-title" style="margin-top:6px;">Comparación de escenarios</h2>
          <p class="page-sub">Visualizá lado a lado las diferencias entre dos simulaciones y entendé qué variables se comportan distinto.</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-nav="history">${icon('arrowL', 14)} Volver a historial</button>
      </div>

      <div class="compare-head">
        <div class="compare-card a">
          <span class="compare-label">Escenario A</span>
          <div class="compare-card-head">
            <div class="scenario-glyph" style="margin-bottom:0;">${sa.glyph}</div>
            <div>
              <h3>${a.name}</h3>
              <div style="font-size:12px; color:var(--muted); font-family:var(--font-mono); margin-top:4px;">
                ${intensityLabel(a.intensityPct).toUpperCase()} · ${DURATIONS[a.durIdx]} MESES · ${a.date}
              </div>
            </div>
          </div>
        </div>
        <div class="compare-vs">vs</div>
        <div class="compare-card b">
          <span class="compare-label">Escenario B</span>
          <div class="compare-card-head">
            <div class="scenario-glyph" style="margin-bottom:0;">${sb.glyph}</div>
            <div>
              <h3>${b.name}</h3>
              <div style="font-size:12px; color:var(--muted); font-family:var(--font-mono); margin-top:4px;">
                ${intensityLabel(b.intensityPct).toUpperCase()} · ${DURATIONS[b.durIdx]} MESES · ${b.date}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="charts-grid charts-grid-2col">
        <div class="card chart-card">
          <div class="chart-header">
            <div><div class="chart-title">Índices bursátiles — A vs B</div><div class="chart-sub">S&P 500 normalizado</div></div>
          </div>
          ${renderCompareChart(simA.sp500, simB.sp500, 460, 220)}
          <div class="legend">
            <div class="legend-item"><span class="legend-swatch" style="background:var(--brand)"></span>A · ${a.name}</div>
            <div class="legend-item"><span class="legend-swatch" style="background:var(--accent)"></span>B · ${b.name}</div>
          </div>
        </div>
        <div class="card chart-card">
          <div class="chart-header">
            <div><div class="chart-title">Tipo de cambio — A vs B</div><div class="chart-sub">USD / ARS normalizado</div></div>
          </div>
          ${renderCompareChart(simA.usdars, simB.usdars, 460, 220)}
          <div class="legend">
            <div class="legend-item"><span class="legend-swatch" style="background:var(--brand)"></span>A</div>
            <div class="legend-item"><span class="legend-swatch" style="background:var(--accent)"></span>B</div>
          </div>
        </div>
      </div>

      <div style="margin-top:20px;"></div>

      <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr><th>Variable</th><th style="text-align:right;">Escenario A</th><th style="text-align:right;">Escenario B</th><th style="text-align:right;">Diferencia</th><th class="bar-col">Magnitud relativa</th></tr>
        </thead>
        <tbody>
          ${vars.map(v => {
            const va = simA[v.key], vb = simB[v.key];
            if (!va || !vb) return '';
            const diff = va.delta - vb.delta;
            const maxAbs = Math.max(Math.abs(va.delta), Math.abs(vb.delta), 0.01);
            const pctA = Math.abs(va.delta) / maxAbs * 100;
            const pctB = Math.abs(vb.delta) / maxAbs * 100;
            return `
              <tr>
                <td><strong>${v.label}</strong></td>
                <td class="val" style="color:${va.delta < 0 ? 'var(--neg)' : 'var(--pos)'}">${fmtPct(va.delta)}</td>
                <td class="val" style="color:${vb.delta < 0 ? 'var(--neg)' : 'var(--pos)'}">${fmtPct(vb.delta)}</td>
                <td class="diff" style="color:${diff >= 0 ? 'var(--pos)' : 'var(--neg)'}">${fmtPct(diff)}</td>
                <td class="bar-col">
                  <div class="bar">
                    <div class="bar-track">
                      <div class="bar-fill-a" style="width:${pctA}%"></div>
                      <div class="bar-fill-b" style="width:${pctB}%"></div>
                    </div>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      </div>
    </section>
  `;
}

function renderCompareChart(sA, sB, w, h) {
  const pad = 20;
  const effW = w - pad * 2;
  const allMin = Math.min(...sA.arr, ...sB.arr);
  const allMax = Math.max(...sA.arr, ...sB.arr);
  // normalize to % change from first point
  const normA = sA.arr.map(v => (v - sA.arr[0]) / sA.arr[0]);
  const normB = sB.arr.map(v => (v - sB.arr[0]) / sB.arr[0]);
  const mn = Math.min(...normA, ...normB, -0.01);
  const mx = Math.max(...normA, ...normB, 0.01);
  const range = mx - mn;
  const toPath = (arr) => {
    const n = arr.length;
    return 'M' + arr.map((v, i) => {
      const x = pad + (i / (n - 1)) * effW;
      const y = 20 + (1 - (v - mn) / range) * (h - 40);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' L');
  };
  const zeroY = 20 + (1 - (0 - mn) / range) * (h - 40);
  let grid = `<line x1="${pad}" y1="${zeroY}" x2="${w - pad}" y2="${zeroY}" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="4 4"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%; height:${h}px;">
    ${grid}
    <path d="${toPath(normA)}" fill="none" stroke="var(--brand)" stroke-width="2.5"/>
    <path d="${toPath(normB)}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
  </svg>`;
}

// ============================================================
// ROUTER
// ============================================================
function render() {
  const builtins = {
    home: homeHTML,
    scenarios: scenariosHTML,
    config: configHTML,
    results: resultsHTML,
    history: historyHTML,
    compare: compareHTML
  };
  const extra = window.EXTRA_SCREENS || {};
  const builder = builtins[state.screen] || extra[state.screen] || homeHTML;
  const screenHTML = builder();

  const standalone = window.STANDALONE_SCREENS || new Set();
  if (standalone.has(state.screen)) {
    document.getElementById('app').innerHTML = `<main class="main main-standalone"><div class="canvas standalone-canvas">${screenHTML}</div></main>`;
    document.getElementById('app').classList.add('app-standalone');
  } else {
    document.getElementById('app').classList.remove('app-standalone');
    document.getElementById('app').innerHTML = sidebarHTML() + `
      <main class="main">
        ${topbarHTML()}
        <div class="canvas">${screenHTML}</div>
      </main>
      <div class="side-backdrop" data-action="close-sidebar"></div>
    `;
  }
  wireEvents();
  if (window.wireExtraEvents) window.wireExtraEvents();
  // persist screen (legacy key, only useful when no __INITIAL_SCREEN)
  if (!window.__INITIAL_SCREEN) {
    try { localStorage.setItem('geolytics.screen', state.screen); } catch(e) {}
  }
}

function navigate(screen) {
  // Persist state before navigating
  saveState();
  const url = PAGE_MAP[screen];
  if (url && url !== location.pathname.split('/').pop()) {
    location.href = url;
    return;
  }
  // Same-page (or unknown screen): in-memory swap
  state.screen = screen;
  render();
  document.querySelector('.canvas')?.scrollTo({ top: 0 });
  if (screen === 'loading') {
    setTimeout(() => { if (state.screen === 'loading') navigate('results'); }, 1500);
  }
}

function saveState() {
  try {
    const persist = {
      selectedScenario: state.selectedScenario,
      intensity: state.intensity,
      duration: state.duration,
      variables: state.variables,
      history: state.history,
      profile: state.profile,
      profileTab: state.profileTab,
      authMode: state.authMode,
      detailScenario: state.detailScenario,
      compareA: state.compareA,
      compareB: state.compareB,
      histFilter: state.histFilter,
    };
    localStorage.setItem('geolytics-state', JSON.stringify(persist));
  } catch {}
}
window.addEventListener('beforeunload', saveState);

// ============================================================
// EVENT WIRING
// ============================================================
function wireEvents() {
  // Navigation buttons
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.getAttribute('data-nav'));
    });
  });

  // History in sidebar
  document.querySelectorAll('[data-nav-history]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.getAttribute('data-nav-history'));
      const h = state.history.find(x => x.id === id);
      if (h) {
        state.selectedScenario = h.scenario;
        state.intensity = h.intensityPct;
        state.duration = h.durIdx * 25;
        navigate('results');
      }
    });
  });

  // Scenario picks (from scenarios screen or home strip)
  document.querySelectorAll('[data-pick-scenario]').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedScenario = el.getAttribute('data-pick-scenario');
      // If on home, jump to config; if on scenarios, just update
      if (state.screen === 'scenarios') {
        render();
      } else {
        navigate('config');
      }
    });
  });

  // Run simulation
  document.querySelectorAll('[data-action="run-sim"]').forEach(el => {
    el.addEventListener('click', () => {
      // add to history
      const sc = getScenario(state.selectedScenario);
      state.history.unshift({
        id: Date.now(),
        scenario: state.selectedScenario,
        intensityPct: state.intensity,
        durIdx: durIdx(state.duration),
        date: new Date().toLocaleDateString('es-AR'),
        saved: false,
        name: sc.name
      });
      navigate('loading');
    });
  });

  document.querySelectorAll('[data-action="new-sim"]').forEach(el => {
    el.addEventListener('click', () => navigate('scenarios'));
  });

  // Mobile sidebar toggle
  document.querySelectorAll('[data-action="toggle-sidebar"]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.side')?.classList.add('open');
      document.querySelector('.side-backdrop')?.classList.add('show');
    });
  });
  document.querySelectorAll('[data-action="close-sidebar"]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.side')?.classList.remove('open');
      document.querySelector('.side-backdrop')?.classList.remove('show');
    });
  });

  // Sliders (config)
  const intSlider = document.getElementById('intensity-slider');
  if (intSlider) {
    intSlider.addEventListener('input', (e) => {
      state.intensity = parseInt(e.target.value);
      e.target.style.setProperty('--val', state.intensity + '%');
      document.getElementById('intensity-chip').textContent = intensityLabel(state.intensity);
      updatePreview();
    });
  }
  const durSlider = document.getElementById('duration-slider');
  if (durSlider) {
    durSlider.addEventListener('input', (e) => {
      state.duration = parseInt(e.target.value);
      const idx = durIdx(state.duration);
      e.target.style.setProperty('--val', ((idx / 3) * 100) + '%');
      document.getElementById('duration-chip').textContent = DURATIONS[idx] + ' meses';
      updatePreview();
    });
  }

  // Variable toggle
  document.querySelectorAll('[data-toggle-var]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-toggle-var');
      state.vars[id] = !state.vars[id];
      el.classList.toggle('on', state.vars[id]);
      el.querySelector('.vtrend').textContent = state.vars[id] ? 'OBSERVANDO' : '—';
      // update count
      const head = document.querySelector('.var-list');
      if (head) {
        const counter = head.closest('.config-section').querySelector('.config-section-head span');
        if (counter) counter.textContent = Object.values(state.vars).filter(Boolean).length + ' de ' + VARIABLES.length;
      }
    });
  });

  // Chart mode toggle
  document.querySelectorAll('[data-chart-mode]').forEach(el => {
    el.addEventListener('click', () => {
      state.chartMode = el.getAttribute('data-chart-mode');
      render();
    });
  });

  // History bookmark
  document.querySelectorAll('[data-hist-save]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(el.getAttribute('data-hist-save'));
      const h = state.history.find(x => x.id === id);
      if (h) { h.saved = !h.saved; el.classList.toggle('on', h.saved); }
    });
  });
  // History filter
  document.querySelectorAll('[data-hist-filter]').forEach(el => {
    el.addEventListener('click', () => {
      state.histFilter = el.getAttribute('data-hist-filter');
      render();
    });
  });
  // History open -> results
  document.querySelectorAll('[data-hist-open]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.getAttribute('data-hist-open'));
      const h = state.history.find(x => x.id === id);
      if (h) {
        state.selectedScenario = h.scenario;
        state.intensity = h.intensityPct;
        state.duration = h.durIdx * 25;
        navigate('results');
      }
    });
  });
  // History compare -> compare screen with that as A, another as B
  document.querySelectorAll('[data-hist-compare]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(el.getAttribute('data-hist-compare'));
      state.compareA = id;
      state.compareB = state.history.find(h => h.id !== id)?.id || state.compareB;
      navigate('compare');
    });
  });
}

function updatePreview() {
  // Just re-render the preview panel without touching slider focus
  const panel = document.getElementById('preview-panel');
  if (!panel) return;
  const sc = getScenario(state.selectedScenario);
  const months = DURATIONS[durIdx(state.duration)];
  const sim = simulate(state.selectedScenario, state.intensity, months);
  const previewVars = ['sp500', 'usdars', 'wti', 'gold'];
  const labels = { sp500: 'S&P 500', usdars: 'USD / ARS', wti: 'Petróleo WTI', gold: 'Oro' };
  const units = { sp500: '', usdars: '', wti: '$', gold: '$' };
  const w = 300, h = 40;
  panel.innerHTML = `
    <h4>Vista previa en vivo
      <span class="pill pill-accent" style="font-size:9.5px; padding:2px 8px;">AUTO</span>
    </h4>
    ${previewVars.map(k => {
      const s = sim[k];
      return `
        <div class="preview-item">
          <div class="pi-head">
            <span class="pi-label">${labels[k]}</span>
            <span class="pi-delta" style="color:${s.delta < 0 ? 'var(--neg)' : 'var(--pos)'}">${fmtPct(s.delta)}</span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%; height:40px;">
            <path d="${buildAreaPath(s.arr, w, h, 2)}" fill="${s.delta < 0 ? 'rgba(168,56,56,0.12)' : 'rgba(47,107,74,0.12)'}"/>
            <path d="${buildLinePath(s.arr, w, h, 2)}" fill="none" stroke="${s.delta < 0 ? 'var(--neg)' : 'var(--pos)'}" stroke-width="1.5"/>
          </svg>
          <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:10.5px; color:var(--muted); margin-top:3px;">
            <span>${units[k]}${fmtNum(s.base, 0)}</span>
            <span>${units[k]}${fmtNum(s.final, 0)}</span>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// ============================================================
// TWEAKS (theme + density + grid)
// ============================================================
const THEMES = [
  { id: 'forest',  label: 'FRST', color: '#0F3D2E', accent: '#C4703B' },
  { id: 'ocean',   label: 'OCEN', color: '#0D3A52', accent: '#D08A3B' },
  { id: 'midnight',label: 'NIGT', color: '#151A21', accent: '#7EE3A8' },
  { id: 'claret',  label: 'CLRT', color: '#6B1E2B', accent: '#D4A35C' }
];

function renderTweaks() {
  const cont = document.getElementById('tw-themes');
  if (!cont) return;
  cont.innerHTML = THEMES.map(t => `
    <div class="tw-swatch ${TWEAKS.theme === t.id ? 'on' : ''}" data-theme-pick="${t.id}"
      style="background:linear-gradient(135deg, ${t.color} 0%, ${t.color} 55%, ${t.accent} 55%, ${t.accent} 100%); color:#fff;">
      <span>${t.label}</span>
    </div>
  `).join('');
  cont.querySelectorAll('[data-theme-pick]').forEach(el => {
    el.addEventListener('click', () => {
      TWEAKS.theme = el.getAttribute('data-theme-pick');
      applyTheme();
      renderTweaks();
      persistTweaks({ theme: TWEAKS.theme });
    });
  });
  document.getElementById('tw-grid').classList.toggle('on', TWEAKS.showGrid);
  document.getElementById('tw-density').classList.toggle('on', TWEAKS.density === 'compact');
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', TWEAKS.theme);
  document.body.setAttribute('data-grid', TWEAKS.showGrid ? 'on' : 'off');
  document.body.setAttribute('data-density', TWEAKS.density);
}

function toggleGrid() {
  TWEAKS.showGrid = !TWEAKS.showGrid;
  applyTheme();
  renderTweaks();
  persistTweaks({ showGrid: TWEAKS.showGrid });
}
function toggleDensity() {
  TWEAKS.density = TWEAKS.density === 'compact' ? 'comfortable' : 'compact';
  applyTheme();
  renderTweaks();
  persistTweaks({ density: TWEAKS.density });
}
function closeTweaks() {
  document.getElementById('tweaks').classList.remove('on');
  window.parent.postMessage({ type: '__deactivate_edit_mode' }, '*');
}
function persistTweaks(partial) {
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: partial }, '*');
}

// listen for edit mode activation
window.addEventListener('message', (e) => {
  if (!e.data) return;
  if (e.data.type === '__activate_edit_mode') {
    document.getElementById('tweaks').classList.add('on');
    renderTweaks();
  }
  if (e.data.type === '__deactivate_edit_mode') {
    document.getElementById('tweaks').classList.remove('on');
  }
});

// ============================================================
// BOOT
// ============================================================
function boot() {
  // Si la página define __INITIAL_SCREEN, usar eso; sino, restaurar del storage
  if (!window.__INITIAL_SCREEN) {
    try {
      const saved = localStorage.getItem('geolytics.screen');
      if (saved && TITLES[saved]) state.screen = saved;
    } catch(e) {}
  } else {
    // limpiar clave vieja, el nuevo sistema usa 'geolytics-state'
    try { localStorage.removeItem('geolytics.screen'); } catch(e) {}
  }
  if (window.initExtraState) window.initExtraState();
  applyTheme();
  render();
  // Auto-advance from loading screen (when arriving via direct URL)
  if (state.screen === 'loading') {
    setTimeout(() => { if (state.screen === 'loading') navigate('results'); }, 1500);
  }
  // announce tweaks availability
  setTimeout(() => {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }, 100);
}

boot();
