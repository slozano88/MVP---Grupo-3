// ============================================================
// GEOLYTICS — Extra screens (login, onboarding, profile, detail,
// about, loading, teachers). Match the existing aesthetic.
// ============================================================

// ---- Extra state ---- (initialized at boot after app.js defines `state`)
function initExtraState() {
  Object.assign(state, {
    onboardingStep: state.onboardingStep || 1,
    detailScenario: state.detailScenario || 'crisis',
    profileTab: state.profileTab || 'account',
    authMode: state.authMode || 'login',
    registerStep: state.registerStep || 1,
    register: state.register || {
      first: '', last: '', email: '', password: '', confirm: '',
      role: '', institution: '', level: '',
      interests: [], terms: false, newsletter: true
    },
    profile: state.profile || {
      first: 'Tomás',
      last: 'Fernández',
      email: 'tomas@geolytics.io',
      occupation: 'Estudiante',
      interests: ['Crisis económica', 'Commodities']
    }
  });
}
window.initExtraState = initExtraState;

// Extra scenario detail data
const SCENARIO_DETAILS = {
  crisis: {
    long: 'Una crisis económica global se caracteriza por una recesión profunda, caída generalizada de los mercados bursátiles, aumento del desempleo y pérdida de confianza de los inversores. Estos eventos impactan directamente en el tipo de cambio, los commodities y los índices bursátiles.',
    vars: [
      { glyph: '📊', name: 'Índices bursátiles', sub: 'S&P 500, Merval, Nasdaq', dir: 'down', label: 'Baja' },
      { glyph: '💵', name: 'Tipo de cambio',    sub: 'USD/ARS, EUR/USD',     dir: 'up',   label: 'Sube' },
      { glyph: '🛢️', name: 'Commodities',        sub: 'Petróleo, Oro, Soja',  dir: 'mix',  label: 'Mixto' },
    ],
    cases: [
      { title: 'Crisis financiera 2008', body: 'Colapso del mercado inmobiliario en EE.UU. con efectos globales. S&P 500 cayó un 57%.', meta: 'Duración ~18 meses · Intensidad extrema' },
      { title: 'COVID-19 (2020)',         body: 'Pandemia global que generó una recesión abrupta. Mercados cayeron 34% en semanas.',     meta: 'Duración ~6 meses · Intensidad alta' },
      { title: 'Deuda europea (2010)',    body: 'Deuda soberana en Grecia, Portugal y España afectó a toda la eurozona.',                meta: 'Duración ~24 meses · Intensidad moderada' },
    ],
    trivia: 'En una crisis, el oro suele subir como activo refugio, mientras que el petróleo tiende a bajar por la menor demanda industrial.'
  },
  conflict: {
    long: 'Un conflicto geopolítico altera rutas comerciales, eleva primas de riesgo y desplaza capitales hacia activos refugio. Los commodities energéticos y el oro tienden a subir.',
    vars: [
      { glyph: '🛢️', name: 'Petróleo',     sub: 'WTI, Brent',          dir: 'up',   label: 'Sube' },
      { glyph: '🥇', name: 'Oro',          sub: 'Activo refugio',      dir: 'up',   label: 'Sube' },
      { glyph: '📊', name: 'Acciones',     sub: 'Índices globales',    dir: 'down', label: 'Baja' },
    ],
    cases: [
      { title: 'Invasión de Ucrania (2022)', body: 'Escalada del petróleo por encima de USD 120. Gas europeo multiplicado por 5.', meta: 'Duración en curso · Intensidad alta' },
      { title: 'Guerra del Golfo (1990)',    body: 'Shock petrolero por corte de suministro iraquí y kuwaití.',                     meta: 'Duración ~7 meses · Intensidad alta' },
    ],
    trivia: 'Los mercados suelen descontar el conflicto antes del estallido: el oro se mueve semanas antes que el petróleo.'
  },
  rates: {
    long: 'Un ciclo de suba de tasas por parte de bancos centrales encarece el financiamiento, fortalece al dólar y presiona a los mercados emergentes.',
    vars: [
      { glyph: '📊', name: 'Acciones',     sub: 'Tecnología más sensible', dir: 'down', label: 'Baja' },
      { glyph: '💵', name: 'Dólar',        sub: 'DXY, pares G10',          dir: 'up',   label: 'Sube' },
      { glyph: '🥇', name: 'Oro',          sub: 'Sensible a tasas reales', dir: 'down', label: 'Baja' },
    ],
    cases: [
      { title: 'Volcker shock (1980)',    body: 'Fed llevó la tasa al 20%. Recesión y control de la inflación.',  meta: 'Duración ~14 meses · Intensidad extrema' },
      { title: 'Ciclo Fed 2022-23',       body: 'De 0.25% a 5.5% en 18 meses. Valuaciones tech comprimidas.',     meta: 'Duración ~18 meses · Intensidad alta' },
    ],
    trivia: 'Un aumento de 1% en la tasa real suele restar entre 8% y 12% a las valuaciones de empresas de alto crecimiento.'
  },
  oil: {
    long: 'Un shock de oferta o demanda en el mercado del crudo se propaga a costos industriales, transporte y presiones inflacionarias.',
    vars: [
      { glyph: '🛢️', name: 'Petróleo',     sub: 'WTI, Brent',          dir: 'up',   label: 'Variable' },
      { glyph: '🏭', name: 'Inflación',    sub: 'IPC energía y transporte', dir: 'up', label: 'Sube' },
      { glyph: '📊', name: 'Aerolíneas',   sub: 'Sector transporte',    dir: 'down', label: 'Baja' },
    ],
    cases: [
      { title: 'Embargo de 1973',         body: 'OPEP cortó suministro. Precio del crudo se cuadruplicó.',       meta: 'Duración ~6 meses · Intensidad extrema' },
      { title: 'Colapso 2014-16',         body: 'Sobreoferta de shale. WTI de USD 100 a USD 26.',                meta: 'Duración ~20 meses · Intensidad alta' },
    ],
    trivia: 'Un alza del 10% en el petróleo agrega aproximadamente 0.4% a la inflación interanual de economías avanzadas.'
  },
  pandemic: {
    long: 'Una crisis sanitaria paraliza cadenas de suministro y demanda agregada, provoca respuestas fiscales masivas y genera volatilidad extrema.',
    vars: [
      { glyph: '📊', name: 'Acciones',     sub: 'Caída abrupta inicial', dir: 'down', label: 'Baja' },
      { glyph: '🏭', name: 'Desempleo',    sub: 'Pico de corto plazo',   dir: 'up',   label: 'Sube' },
      { glyph: '🛢️', name: 'Petróleo',     sub: 'Demanda industrial',    dir: 'down', label: 'Baja' },
    ],
    cases: [
      { title: 'COVID-19 (2020)',         body: 'Shock simultáneo de oferta y demanda. Estímulo fiscal récord.', meta: 'Duración ~18 meses · Intensidad extrema' },
      { title: 'Gripe H1N1 (2009)',       body: 'Impacto económico acotado, principalmente sector turismo.',     meta: 'Duración ~6 meses · Intensidad media' },
    ],
    trivia: 'En 2020, los índices bursátiles recuperaron el nivel pre-crisis en menos de 5 meses — la recuperación más rápida de la historia.'
  },
  trade: {
    long: 'Una escalada de aranceles y represalias entre grandes bloques redistribuye flujos comerciales y eleva costos al consumidor.',
    vars: [
      { glyph: '🏭', name: 'Manufacturas', sub: 'Cadenas globales',      dir: 'down', label: 'Baja' },
      { glyph: '💵', name: 'Monedas EM',   sub: 'Yuan, peso, real',      dir: 'mix',  label: 'Mixto' },
      { glyph: '📊', name: 'Consumo',      sub: 'Bienes importados',     dir: 'down', label: 'Caro' },
    ],
    cases: [
      { title: 'Guerra EE.UU.-China (2018-19)', body: 'Aranceles recíprocos sobre USD 360B en bienes.',          meta: 'Duración ~24 meses · Intensidad alta' },
      { title: 'Smoot-Hawley (1930)',           body: 'Ley arancelaria profundizó la Gran Depresión.',           meta: 'Duración ~5 años · Intensidad extrema' },
    ],
    trivia: 'Históricamente, una guerra comercial reduce el comercio mundial entre 1% y 3% por año mientras está activa.'
  }
};

// ============================================================
// LOGIN (no sidebar)
// ============================================================
// Google + GitHub OAuth SVGs
const GOOGLE_SVG = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M22.5 12.3c0-.78-.07-1.53-.2-2.25H12v4.26h5.88c-.25 1.37-1.03 2.53-2.19 3.3v2.74h3.54c2.07-1.91 3.27-4.72 3.27-8.05z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.74c-.98.66-2.23 1.05-3.74 1.05-2.87 0-5.29-1.94-6.16-4.54H2.18v2.84A10.99 10.99 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18A10.99 10.99 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.13 5.38 12 5.38z"/></svg>';
const GITHUB_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.1.63-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.56 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>';

function authBrandHTML() {
  return `
    <aside class="auth-brand">
      <div class="auth-brand-inner">
        <div class="auth-logo">
          <div class="brand-mark">${icon('logo', 18)}</div>
          <div>
            <div class="brand-name" style="color:#fff;">Geolytics</div>
            <div class="brand-sub">Simulador · Edición 2026</div>
          </div>
        </div>
        <h2 class="auth-pitch">Entendé el <em>mundo</em><br>a través de sus<br>variables económicas.</h2>
        <p class="auth-pitch-sub">Una plataforma educativa que transforma eventos globales en escenarios interactivos y explicables.</p>
        <div class="auth-stats">
          <div><div class="auth-stat-n">6</div><div class="auth-stat-l">Escenarios</div></div>
          <div><div class="auth-stat-n">12</div><div class="auth-stat-l">Variables</div></div>
          <div><div class="auth-stat-n">∞</div><div class="auth-stat-l">Combinaciones</div></div>
        </div>
      </div>
    </aside>
  `;
}

function loginFormHTML() {
  return `
    <div class="auth-form">
      <div class="auth-form-head">
        <h3 class="auth-form-h">Bienvenido de vuelta</h3>
        <p class="auth-form-s">Ingresá para continuar con tus simulaciones.</p>
      </div>
      <div class="auth-tabs">
        <button class="auth-tab active" data-auth-mode="login">Iniciar sesión</button>
        <button class="auth-tab" data-auth-mode="register">Registrarse</button>
      </div>
      <div class="auth-field">
        <label>Email</label>
        <input type="email" placeholder="tu@email.com" value="tomas@geolytics.io">
      </div>
      <div class="auth-field">
        <label>Contraseña</label>
        <input type="password" placeholder="••••••••" value="••••••••••">
      </div>
      <div class="auth-row">
        <label class="auth-check">
          <span class="auth-checkbox on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
          Recordarme
        </label>
        <a class="auth-link">¿Olvidaste tu contraseña?</a>
      </div>
      <button class="btn btn-primary auth-submit" data-nav="home">${icon('arrowR', 14)} Ingresar</button>
      <div class="auth-divider"><span>o continuá con</span></div>
      <div class="auth-oauth auth-oauth-single">
        <button class="btn btn-ghost auth-oauth-btn">${GOOGLE_SVG} Continuar con Google</button>
      </div>
      <div class="auth-foot">
        ¿No tenés cuenta? <a class="auth-link" data-auth-mode="register">Registrate gratis</a>
      </div>
    </div>
  `;
}

function registerFormHTML() {
  const r = state.register;
  const step = state.registerStep;
  const stepLabels = ['Cuenta', 'Perfil'];

  // password strength
  const pw = r.password || '';
  let strength = 0;
  if (pw.length >= 6) strength++;
  if (pw.length >= 10) strength++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) strength++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) strength++;
  const strengthLabel = ['—', 'Débil', 'Aceptable', 'Buena', 'Muy fuerte'][strength];
  const strengthColor = ['var(--line-strong)', 'var(--neg)', 'var(--accent)', 'var(--accent)', 'var(--pos)'][strength];

  const roles = [
    { id: 'student', glyph: '🎓', label: 'Estudiante', sub: 'Secundario, terciario o universitario' },
    { id: 'teacher', glyph: '👩‍🏫', label: 'Docente',   sub: 'Doy clases o capacitaciones' },
    { id: 'pro',     glyph: '📈', label: 'Profesional', sub: 'Analista, periodista, consultor' },
    { id: 'curious', glyph: '🌎', label: 'Curioso',    sub: 'Aprendo por mi cuenta' }
  ];
  const levels = ['Secundario', 'Universitario', 'Posgrado', 'Otro'];

  // validation
  const canStep1 = r.first.trim() && r.last.trim() && /\S+@\S+\.\S+/.test(r.email) && pw.length >= 6 && pw === r.confirm && r.terms;
  const canStep2 = r.role;

  let body = '';
  if (step === 1) {
    body = `
      <div class="auth-form-head">
        <h3 class="auth-form-h">Creá tu cuenta</h3>
      </div>
      <div class="reg-oauth-row reg-oauth-single">
        <button class="btn btn-ghost auth-oauth-btn">${GOOGLE_SVG} Continuar con Google</button>
      </div>
      <div class="auth-divider"><span>o con tu email</span></div>
      <div class="reg-grid">
        <div class="auth-field">
          <label>Nombre</label>
          <input data-reg-key="first" value="${r.first}" placeholder="Tu nombre">
        </div>
        <div class="auth-field">
          <label>Apellido</label>
          <input data-reg-key="last" value="${r.last}" placeholder="Tu apellido">
        </div>
      </div>
      <div class="auth-field">
        <label>Email</label>
        <input data-reg-key="email" type="email" value="${r.email}" placeholder="tu@email.com">
        ${r.email.includes('@') && !/\S+@\S+\.\S+/.test(r.email) ? '<div class="auth-error">Email inválido</div>' : ''}
      </div>
      <div class="auth-field">
        <label>Contraseña</label>
        <input data-reg-key="password" type="password" value="${r.password}" placeholder="Mínimo 6 caracteres">
        <div class="pw-meter">
          <div class="pw-meter-track">
            ${[0,1,2,3].map(i => `<div class="pw-meter-seg ${i < strength ? 'on' : ''}" style="${i < strength ? `background:${strengthColor}` : ''}"></div>`).join('')}
          </div>
          <span class="pw-meter-label" style="color:${strength > 0 ? strengthColor : 'var(--muted)'}">${strengthLabel}</span>
        </div>
      </div>
      <div class="auth-field">
        <label>Confirmar contraseña</label>
        <input data-reg-key="confirm" type="password" value="${r.confirm}" placeholder="Repetí la contraseña">
        ${r.confirm && r.confirm !== r.password ? '<div class="auth-error">Las contraseñas no coinciden</div>' : ''}
      </div>
      <label class="auth-check reg-terms" data-reg-toggle="terms">
        <span class="auth-checkbox ${r.terms ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
        Acepto los <a class="auth-link">Términos</a> y la <a class="auth-link">Política de privacidad</a>
      </label>
      <label class="auth-check reg-terms" data-reg-toggle="newsletter">
        <span class="auth-checkbox ${r.newsletter ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
        Quiero recibir novedades educativas (opcional)
      </label>
      <button class="btn btn-primary auth-submit" data-reg-next ${canStep1 ? '' : 'disabled style="opacity:.45;cursor:not-allowed"'}>Continuar ${icon('arrowR', 14)}</button>
    `;
  } else if (step === 2) {
    body = `
      <div class="auth-form-head">
        <h3 class="auth-form-h">Contanos sobre vos</h3>
        <p class="auth-form-s">Vamos a personalizar tu experiencia.</p>
      </div>
      <div class="reg-section-l">¿Cuál es tu rol?</div>
      <div class="reg-roles">
        ${roles.map(role => `
          <button class="reg-role ${r.role === role.id ? 'on' : ''}" data-reg-role="${role.id}">
            <div class="reg-role-glyph">${role.glyph}</div>
            <div>
              <div class="reg-role-name">${role.label}</div>
              <div class="reg-role-sub">${role.sub}</div>
            </div>
            <div class="reg-role-check">${icon('check', 12)}</div>
          </button>
        `).join('')}
      </div>
      ${r.role === 'student' || r.role === 'teacher' ? `
        <div class="reg-grid" style="margin-top:18px;">
          <div class="auth-field">
            <label>Institución</label>
            <input data-reg-key="institution" value="${r.institution}" placeholder="${r.role === 'teacher' ? 'Universidad, colegio...' : 'Tu institución'}">
          </div>
          <div class="auth-field">
            <label>Nivel</label>
            <select data-reg-key="level" class="profile-select" style="max-width:none">
              <option value="">Seleccionar...</option>
              ${levels.map(l => `<option ${r.level === l ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
          </div>
        </div>
      ` : ''}
      <div class="reg-actions">
        <button class="btn btn-ghost" data-reg-prev>${icon('arrowL', 14)} Atrás</button>
        <button class="btn btn-primary" data-reg-finish ${canStep2 ? '' : 'disabled style="opacity:.45;cursor:not-allowed"'}>${icon('sparkle', 14)} Crear cuenta</button>
      </div>
    `;
  } else if (step === 3) {
    // success
    body = `
      <div class="reg-success">
        <div class="reg-success-icon">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="auth-form-h" style="text-align:center; margin-top:18px;">¡Bienvenido a Geolytics, ${r.first || 'analista'}!</h3>
        <p class="auth-form-s" style="text-align:center;">Tu cuenta está lista. Vamos a darte un tour rápido por el simulador.</p>
        <button class="btn btn-primary auth-submit" data-nav="onboarding" style="margin-top:24px;">Empezar tour ${icon('arrowR', 14)}</button>
        <button class="btn btn-ghost auth-submit" data-nav="home" style="margin-top:8px;">Ir directo al panel</button>
      </div>
    `;
  }

  return `
    <div class="auth-form">
      ${step < 3 ? `
        <div class="auth-tabs">
          <button class="auth-tab" data-auth-mode="login">Iniciar sesión</button>
          <button class="auth-tab active" data-auth-mode="register">Registrarse</button>
        </div>
        <div class="reg-stepper">
          ${stepLabels.map((label, i) => {
            const n = i + 1;
            const status = n < step ? 'done' : n === step ? 'active' : '';
            return `
              <div class="reg-step ${status}">
                <div class="reg-step-circle">${n < step ? icon('check', 12) : n}</div>
                <span class="reg-step-label">${label}</span>
              </div>
              ${i < stepLabels.length - 1 ? `<div class="reg-step-line ${n < step ? 'done' : ''}"></div>` : ''}
            `;
          }).join('')}
        </div>
      ` : ''}
      ${body}
      ${step < 3 ? `
        <div class="auth-foot">
          ¿Ya tenés cuenta? <a class="auth-link" data-auth-mode="login">Iniciá sesión</a>
        </div>
      ` : ''}
    </div>
  `;
}

function loginHTML() {
  return `
    <section class="screen active auth-screen" data-screen-label="${state.authMode === 'register' ? 'Register' : 'Login'}">
      <button class="auth-close" data-nav="home" aria-label="Volver">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="auth-grid">
        ${authBrandHTML()}
        <div class="auth-panel">
          ${state.authMode === 'register' ? registerFormHTML() : loginFormHTML()}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// ONBOARDING (no sidebar)
// ============================================================
function onboardingHTML() {
  const steps = [
    { t: 'Bienvenido a Geolytics',   s: 'Una herramienta para explorar cómo eventos globales afectan a la economía. Simple, interactivo, explicable.', glyph: '👋' },
    { t: 'Elegí un escenario',        s: 'Seleccioná entre crisis económicas, conflictos, pandemias y más. Cada uno simula un impacto diferente en la economía global.', glyph: '🌎' },
    { t: 'Ajustá los parámetros',     s: 'Modificá la intensidad y la duración. Observá cómo cambia el impacto en tiempo real sobre cada variable.',                          glyph: '🎛' },
    { t: 'Leé los resultados',        s: 'Gráficos, KPIs y explicaciones causales. Todo diseñado para entender — no solo para mirar números.',                                  glyph: '📈' }
  ];
  const idx = state.onboardingStep - 1;
  const step = steps[idx];
  return `
    <section class="screen active onb-screen" data-screen-label="Onboarding">
      <button class="auth-close" data-nav="home" aria-label="Saltar">Saltar</button>
      <div class="onb-card">
        <div class="onb-eyebrow">Paso ${state.onboardingStep} de 4</div>
        <div class="onb-progress-track"><div class="onb-progress-fill" style="width:${(state.onboardingStep/4)*100}%"></div></div>
        <div class="onb-viz">
          <div class="onb-glyph">${step.glyph}</div>
          <svg class="onb-viz-svg" viewBox="0 0 360 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="onbGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,140 C60,120 100,60 160,70 C220,80 260,30 320,50 L360,60 L360,180 L0,180 Z" fill="url(#onbGrad)"/>
            <path d="M0,140 C60,120 100,60 160,70 C220,80 260,30 320,50 L360,60" fill="none" stroke="var(--accent)" stroke-width="2"/>
          </svg>
        </div>
        <h2 class="onb-title">${step.t}</h2>
        <p class="onb-sub">${step.s}</p>
        <div class="onb-dots">
          ${steps.map((_, i) => `<span class="onb-dot ${i === idx ? 'active' : i < idx ? 'done' : ''}"></span>`).join('')}
        </div>
        <div class="onb-actions">
          <button class="btn btn-ghost" ${state.onboardingStep === 1 ? 'disabled style="opacity:.4"' : ''} data-onb-prev>${icon('arrowL', 14)} Anterior</button>
          ${state.onboardingStep < 4
            ? `<button class="btn btn-primary" data-onb-next>Siguiente ${icon('arrowR', 14)}</button>`
            : `<button class="btn btn-primary" data-nav="home">Empezar a explorar ${icon('arrowR', 14)}</button>`}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// PROFILE
// ============================================================
function profileHTML() {
  const p = state.profile;
  const initials = (p.first[0] + p.last[0]).toUpperCase();
  const tabs = [
    { id: 'account',  label: 'Mi cuenta' },
    { id: 'prefs',    label: 'Preferencias' },
    { id: 'stats',    label: 'Estadísticas' },
    { id: 'notif',    label: 'Notificaciones' }
  ];
  const allInterests = ['Crisis económica', 'Commodities', 'Tasas de interés', 'Conflictos', 'Pandemias', 'Divisas', 'Guerra comercial'];
  return `
    <section class="screen active" data-screen-label="Profile">
      <div class="page-head">
        <div>
          <div class="eyebrow">Cuenta</div>
          <h2 class="page-title" style="margin-top:6px;">Perfil</h2>
          <p class="page-sub">Editá tu información personal, intereses y preferencias de notificaciones.</p>
        </div>
        <button class="btn btn-ghost btn-sm" data-nav="home">${icon('arrowL', 14)} Volver</button>
      </div>

      <div class="profile-layout">
        <aside class="profile-side">
          <div class="profile-user">
            <div class="profile-avatar">${initials}</div>
            <div class="profile-name">${p.first} ${p.last}</div>
            <div class="profile-email">${p.email}</div>
            <span class="pill pill-accent" style="margin-top:10px;">Cuenta activa</span>
          </div>
          <nav class="profile-nav">
            ${tabs.map(t => `<button class="profile-nav-item ${state.profileTab === t.id ? 'active' : ''}" data-profile-tab="${t.id}">${t.label}</button>`).join('')}
          </nav>
          <div class="profile-summary">
            <div class="profile-summary-h">Resumen</div>
            <div class="profile-summary-row"><span>Simulaciones</span><strong>${state.history.length}</strong></div>
            <div class="profile-summary-row"><span>Guardadas</span><strong>${state.history.filter(h=>h.saved).length}</strong></div>
            <div class="profile-summary-row"><span>Comparaciones</span><strong>3</strong></div>
          </div>
        </aside>

        <div class="card card-pad profile-main">
          ${state.profileTab === 'account' ? `
            <h3 class="profile-section-h">Mi cuenta</h3>
            <p class="profile-section-s">Editá tu información personal. Los cambios se guardan localmente.</p>
            <div class="profile-grid">
              <div class="profile-field"><label>Nombre</label><input value="${p.first}" data-profile-key="first"></div>
              <div class="profile-field"><label>Apellido</label><input value="${p.last}" data-profile-key="last"></div>
              <div class="profile-field"><label>Email</label><input value="${p.email}" data-profile-key="email"></div>
              <div class="profile-field"><label>Ocupación</label><input value="${p.occupation}" data-profile-key="occupation"></div>
            </div>
            <hr class="profile-hr">
            <h4 class="profile-section-h" style="font-size:14px;">Intereses</h4>
            <p class="profile-section-s">Usamos esto para sugerirte escenarios relevantes.</p>
            <div class="profile-chips">
              ${allInterests.map(i => `
                <button class="profile-chip ${p.interests.includes(i) ? 'on' : ''}" data-profile-interest="${i}">
                  ${p.interests.includes(i) ? icon('check', 12) : ''} ${i}
                </button>
              `).join('')}
            </div>
            <div class="profile-actions">
              <button class="btn btn-primary">${icon('save', 14)} Guardar cambios</button>
              <button class="btn btn-ghost">Cancelar</button>
            </div>
          ` : state.profileTab === 'prefs' ? `
            <h3 class="profile-section-h">Preferencias</h3>
            <p class="profile-section-s">Tu tema se controla desde la paleta de Tweaks (esquina superior). Desde acá podés ajustar el resto.</p>
            <div class="pref-row"><div><strong>Idioma</strong><div class="profile-section-s">Idioma de la interfaz y textos explicativos.</div></div><select class="profile-select"><option>Español (AR)</option><option>English</option><option>Português</option></select></div>
            <div class="pref-row"><div><strong>Zona horaria</strong><div class="profile-section-s">Usado para fechas de simulaciones.</div></div><select class="profile-select"><option>America/Buenos_Aires (GMT-3)</option><option>UTC</option></select></div>
            <div class="pref-row"><div><strong>Formato numérico</strong><div class="profile-section-s">Separador decimal y de miles.</div></div><select class="profile-select"><option>1.234,56</option><option>1,234.56</option></select></div>
            <div class="pref-row"><div><strong>Autoguardar simulaciones</strong><div class="profile-section-s">Guardar automáticamente cada resultado al historial.</div></div><div class="tw-toggle on" style="cursor:pointer"></div></div>
          ` : state.profileTab === 'stats' ? `
            <h3 class="profile-section-h">Estadísticas</h3>
            <p class="profile-section-s">Tu actividad en los últimos 30 días.</p>
            <div class="stat-grid">
              <div class="stat-card"><div class="stat-n">${state.history.length}</div><div class="stat-l">Simulaciones totales</div></div>
              <div class="stat-card"><div class="stat-n">${state.history.filter(h=>h.saved).length}</div><div class="stat-l">Guardadas</div></div>
              <div class="stat-card"><div class="stat-n">3</div><div class="stat-l">Comparaciones</div></div>
              <div class="stat-card"><div class="stat-n">${p.interests.length}</div><div class="stat-l">Intereses</div></div>
            </div>
            <h4 class="profile-section-h" style="font-size:14px; margin-top:24px;">Escenarios más explorados</h4>
            <div class="stat-bars">
              ${SCENARIOS.slice(0,4).map((sc, i) => {
                const count = state.history.filter(h => h.scenario === sc.id).length + Math.max(0, 3-i);
                const pct = Math.min(100, count * 16);
                return `<div class="stat-bar-row"><span class="stat-bar-label">${sc.glyph} ${sc.name}</span><div class="stat-bar"><div class="stat-bar-fill" style="width:${pct}%"></div></div><span class="stat-bar-n">${count}</span></div>`;
              }).join('')}
            </div>
          ` : `
            <h3 class="profile-section-h">Notificaciones</h3>
            <p class="profile-section-s">Elegí qué alertas querés recibir.</p>
            <div class="pref-row"><div><strong>Nuevos escenarios disponibles</strong><div class="profile-section-s">Cuando se publica un escenario en la biblioteca.</div></div><div class="tw-toggle on" style="cursor:pointer"></div></div>
            <div class="pref-row"><div><strong>Resumen semanal</strong><div class="profile-section-s">Un email los lunes con tu actividad.</div></div><div class="tw-toggle on" style="cursor:pointer"></div></div>
            <div class="pref-row"><div><strong>Actualizaciones del producto</strong><div class="profile-section-s">Nuevas funciones y mejoras.</div></div><div class="tw-toggle" style="cursor:pointer"></div></div>
            <div class="pref-row"><div><strong>Material educativo</strong><div class="profile-section-s">Guías, casos de estudio y análisis.</div></div><div class="tw-toggle" style="cursor:pointer"></div></div>
          `}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// DETAIL — scenario deep dive
// ============================================================
function detailHTML() {
  const sc = getScenario(state.detailScenario);
  const d = SCENARIO_DETAILS[state.detailScenario];
  const arrow = (dir) => dir === 'up' ? '↑' : dir === 'down' ? '↓' : '↕';
  return `
    <section class="screen active" data-screen-label="ScenarioDetail">
      <div class="detail-crumbs">
        <button data-nav="scenarios">Escenarios</button>
        <span class="slash">›</span>
        <strong>${sc.name}</strong>
      </div>
      <div class="detail-grid">
        <div>
          <div class="detail-hero">
            <div class="detail-hero-glyph">${sc.glyph}</div>
            <div>
              <h2 class="detail-title">${sc.name}</h2>
              <div style="display:flex; gap:6px; margin-top:8px;">
                <span class="pill pill-brand">${sc.tag}</span>
                <span class="pill">Global</span>
                <div class="impact-bar lvl-${sc.impact}" style="margin-left:6px; align-self:center;"><span></span><span></span><span></span><span></span></div>
              </div>
            </div>
          </div>
          <p class="detail-long">${d.long}</p>

          <h4 class="detail-h">Variables afectadas</h4>
          <div class="detail-vars">
            ${d.vars.map(v => `
              <div class="detail-var">
                <div class="detail-var-glyph">${v.glyph}</div>
                <div class="detail-var-info">
                  <div class="detail-var-name">${v.name}</div>
                  <div class="detail-var-sub">${v.sub}</div>
                </div>
                <div class="detail-var-dir dir-${v.dir}">${arrow(v.dir)} ${v.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="detail-cta-row">
            <button class="btn btn-primary" data-action="sim-from-detail">${icon('play', 14)} Simular este escenario</button>
            <button class="btn btn-ghost" data-nav="scenarios">${icon('grid', 14)} Ver otros escenarios</button>
          </div>
        </div>

        <aside class="detail-side">
          <h4 class="detail-h">Ejemplos históricos</h4>
          <div class="detail-cases">
            ${d.cases.map(c => `
              <div class="detail-case">
                <div class="detail-case-title">${c.title}</div>
                <p>${c.body}</p>
                <div class="detail-case-meta">${c.meta}</div>
              </div>
            `).join('')}
          </div>
          <div class="detail-trivia">
            <div class="detail-trivia-eyebrow">¿Sabías que...?</div>
            <p>${d.trivia}</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

// ============================================================
// ABOUT
// ============================================================
function aboutHTML() {
  const steps = [
    { n: '1', t: 'Elegí un escenario',    s: 'Crisis, conflictos, pandemias y más.' },
    { n: '2', t: 'Ajustá parámetros',      s: 'Intensidad, duración y variables observadas.' },
    { n: '3', t: 'Visualizá resultados',   s: 'Gráficos y KPIs en tiempo real.' },
    { n: '4', t: 'Compará y aprendé',      s: 'Entendé causa-efecto en economía.' }
  ];
  return `
    <section class="screen active" data-screen-label="About">
      <div class="about-hero">
        <div class="eyebrow">Acerca de Geolytics</div>
        <h2 class="page-title about-h" style="margin-top:10px;">¿Cómo <em>funciona</em> Geolytics?</h2>
        <p class="about-lede">Una herramienta educativa que simula el impacto de eventos globales en la economía, de forma simple e interactiva. Pensada para estudiantes, docentes y curiosos.</p>
        <div class="hero-cta" style="margin-top:22px; position:relative; z-index:1;">
          <button class="btn btn-primary" data-nav="scenarios" style="background:var(--brand-ink); color:var(--brand);">${icon('play', 14)} Empezar a simular</button>
          <button class="btn btn-ghost" data-nav="teachers" style="color:var(--brand-ink); border-color:rgba(255,255,255,0.25);">Para docentes</button>
        </div>
      </div>

      <h3 class="about-section-h">Cómo usarlo</h3>
      <div class="about-steps">
        ${steps.map(s => `
          <div class="about-step">
            <div class="about-step-n">${s.n}</div>
            <div class="about-step-t">${s.t}</div>
            <div class="about-step-s">${s.s}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="about-section-h">Metodología</h3>
      <div class="card card-pad about-methodology">
        <p>Los resultados están basados en reglas generales construidas a partir de relaciones económicas conocidas, priorizando la <em>coherencia</em> antes que la precisión. El objetivo no es predecir el mercado sino ofrecer una herramienta para explorar escenarios y entender de forma intuitiva cómo distintos eventos pueden influir en la economía.</p>
        <div class="about-meth-grid">
          <div><div class="about-meth-n">~60</div><div class="about-meth-l">Relaciones económicas modeladas</div></div>
          <div><div class="about-meth-n">12</div><div class="about-meth-l">Variables observables</div></div>
          <div><div class="about-meth-n">6</div><div class="about-meth-l">Escenarios base</div></div>
          <div><div class="about-meth-n">∞</div><div class="about-meth-l">Combinaciones posibles</div></div>
        </div>
      </div>

      <div class="about-footer">
        Geolytics · Proyecto educativo · 2026 · <a data-nav="teachers">Para docentes →</a>
      </div>
    </section>
  `;
}

// ============================================================
// LOADING (no sidebar)
// ============================================================
function loadingHTML() {
  const sc = getScenario(state.selectedScenario);
  const months = DURATIONS[durIdx(state.duration)];
  return `
    <section class="screen active loading-screen" data-screen-label="Loading">
      <div class="loading-wrap">
        <div class="loading-spinner">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle cx="32" cy="32" r="26" stroke="var(--line)" stroke-width="3" fill="none"/>
            <circle cx="32" cy="32" r="26" stroke="var(--brand)" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="40 200" transform="rotate(-90 32 32)">
              <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="1.2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <div class="eyebrow" style="margin-top:22px;">Procesando</div>
        <h2 class="loading-title">Simulando escenario...</h2>
        <p class="loading-sub">Estamos calculando el impacto de <strong>${sc.name}</strong> con intensidad <strong>${intensityLabel(state.intensity).toLowerCase()}</strong> durante <strong>${months} meses</strong>.</p>

        <div class="loading-progress">
          <div class="loading-progress-fill"></div>
        </div>
        <div class="loading-log" id="loading-log">
          <div class="loading-log-line">› Cargando baseline macro...</div>
          <div class="loading-log-line">› Aplicando factor de intensidad (${intensityLabel(state.intensity)})...</div>
          <div class="loading-log-line">› Propagando shock a variables observadas...</div>
          <div class="loading-log-line">› Generando explicación causal...</div>
        </div>

        <div class="loading-params">
          <div class="loading-param"><div class="loading-param-l">Escenario</div><div class="loading-param-v">${sc.glyph} ${sc.name}</div></div>
          <div class="loading-param"><div class="loading-param-l">Intensidad</div><div class="loading-param-v">${intensityLabel(state.intensity)}</div></div>
          <div class="loading-param"><div class="loading-param-l">Duración</div><div class="loading-param-v">${months} meses</div></div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// TEACHERS
// ============================================================
function teachersHTML() {
  const feats = [
    { icon: 'sparkle',  t: 'Grupos de clase',       s: 'Creá grupos para que tus alumnos simulen y comparen resultados entre sí. Un panel central muestra las simulaciones de todos.' },
    { icon: 'bars',     t: 'Modo presentación',      s: 'Proyectá simulaciones en clase con gráficos amplificados y explicaciones en vivo. Optimizado para HD y 4K.' },
    { icon: 'save',     t: 'Guías didácticas',       s: 'Material descargable con actividades sugeridas para usar en clase, adaptadas a nivel secundario y universitario.' },
    { icon: 'info',     t: 'Seguimiento de alumnos', s: 'Seguí el progreso individual y grupal: qué escenarios exploraron, qué preguntas respondieron, qué conceptos dominan.' }
  ];
  return `
    <section class="screen active" data-screen-label="Teachers">
      <div class="teach-hero">
        <div class="eyebrow">Para docentes y educadores</div>
        <h2 class="page-title teach-h" style="margin-top:10px;">Llevá la economía al <em>aula</em>.</h2>
        <p class="teach-lede">Geolytics permite a tus alumnos experimentar con escenarios reales y entender relaciones causa-efecto sin tecnicismos. Diseñado en colaboración con docentes de secundario y universidad.</p>
        <div class="hero-cta" style="margin-top:22px;">
          <button class="btn btn-primary" style="background:var(--brand-ink); color:var(--brand);">${icon('sparkle', 14)} Solicitar acceso educativo</button>
          <button class="btn btn-ghost" data-nav="about" style="color:var(--brand-ink); border-color:rgba(255,255,255,0.25);">Ver demo</button>
        </div>
      </div>

      <div class="teach-feats">
        ${feats.map(f => `
          <div class="teach-feat">
            <div class="feature-icon">${icon(f.icon, 20)}</div>
            <h3>${f.t}</h3>
            <p>${f.s}</p>
          </div>
        `).join('')}
      </div>

      <div class="teach-quote">
        <div class="teach-quote-mark">“</div>
        <blockquote>Mis alumnos pudieron entender en una clase lo que antes les costaba un cuatrimestre. La simulación les permite experimentar sin miedo a equivocarse — y aprender de los errores en tiempo real.</blockquote>
        <div class="teach-quote-who">
          <div class="teach-quote-avatar">MT</div>
          <div>
            <div class="teach-quote-name">Prof. María Torres</div>
            <div class="teach-quote-role">Economía · UBA</div>
          </div>
        </div>
      </div>

      <div class="teach-plans">
        <div class="teach-plan">
          <div class="teach-plan-name">Aula</div>
          <div class="teach-plan-price">Gratis</div>
          <div class="teach-plan-sub">Hasta 30 alumnos</div>
          <ul class="teach-plan-list">
            <li>Grupos ilimitados</li>
            <li>Todos los escenarios base</li>
            <li>Guías descargables</li>
          </ul>
          <button class="btn btn-ghost" style="width:100%; justify-content:center;">Empezar</button>
        </div>
        <div class="teach-plan featured">
          <span class="teach-plan-tag">Recomendado</span>
          <div class="teach-plan-name">Institución</div>
          <div class="teach-plan-price">A medida</div>
          <div class="teach-plan-sub">Sin límite de alumnos</div>
          <ul class="teach-plan-list">
            <li>Todo lo de Aula</li>
            <li>Modo presentación HD/4K</li>
            <li>Integración LMS (Moodle, Canvas)</li>
            <li>Soporte dedicado</li>
          </ul>
          <button class="btn btn-primary" style="width:100%; justify-content:center;">Contactar</button>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// WIRING — attached after each render via wireExtraEvents()
// ============================================================
function wireExtraEvents() {
  // Auth mode switch
  document.querySelectorAll('[data-auth-mode]').forEach(el => el.addEventListener('click', () => {
    state.authMode = el.getAttribute('data-auth-mode');
    if (state.authMode === 'register') state.registerStep = 1;
    render();
  }));
  // Register form inputs
  document.querySelectorAll('[data-reg-key]').forEach(el => {
    const key = el.getAttribute('data-reg-key');
    el.addEventListener('input', () => { state.register[key] = el.value; if (['password','confirm'].includes(key)) render(); });
    el.addEventListener('change', () => { state.register[key] = el.value; });
    if (key === 'email') el.addEventListener('blur', () => { state.register[key] = el.value; render(); });
  });
  document.querySelectorAll('[data-reg-toggle]').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    const k = el.getAttribute('data-reg-toggle');
    state.register[k] = !state.register[k];
    render();
  }));
  document.querySelectorAll('[data-reg-role]').forEach(el => el.addEventListener('click', () => {
    state.register.role = el.getAttribute('data-reg-role');
    render();
  }));
  document.querySelectorAll('[data-reg-interest]').forEach(el => el.addEventListener('click', () => {
    const name = el.getAttribute('data-reg-interest');
    const arr = state.register.interests;
    const i = arr.indexOf(name);
    if (i >= 0) arr.splice(i, 1); else arr.push(name);
    render();
  }));
  document.querySelectorAll('[data-reg-next]').forEach(el => el.addEventListener('click', () => {
    if (el.hasAttribute('disabled')) return;
    state.registerStep = Math.min(2, state.registerStep + 1);
    render();
  }));
  document.querySelectorAll('[data-reg-prev]').forEach(el => el.addEventListener('click', () => {
    state.registerStep = Math.max(1, state.registerStep - 1);
    render();
  }));
  document.querySelectorAll('[data-reg-finish]').forEach(el => el.addEventListener('click', () => {
    if (el.hasAttribute('disabled')) return;
    // promote register data to profile
    const r = state.register;
    state.profile = {
      first: r.first || state.profile.first,
      last: r.last || state.profile.last,
      email: r.email || state.profile.email,
      occupation: ({student:'Estudiante',teacher:'Docente',pro:'Profesional',curious:'Curioso'})[r.role] || 'Estudiante',
      interests: state.profile.interests
    };
    state.registerStep = 3;
    render();
  }));

  // Onboarding
  document.querySelectorAll('[data-onb-next]').forEach(el => el.addEventListener('click', () => { state.onboardingStep = Math.min(4, state.onboardingStep + 1); render(); }));
  document.querySelectorAll('[data-onb-prev]').forEach(el => el.addEventListener('click', () => { state.onboardingStep = Math.max(1, state.onboardingStep - 1); render(); }));

  // Profile
  document.querySelectorAll('[data-profile-tab]').forEach(el => el.addEventListener('click', () => { state.profileTab = el.getAttribute('data-profile-tab'); render(); }));
  document.querySelectorAll('[data-profile-key]').forEach(el => el.addEventListener('input', () => { state.profile[el.getAttribute('data-profile-key')] = el.value; }));
  document.querySelectorAll('[data-profile-interest]').forEach(el => el.addEventListener('click', () => {
    const name = el.getAttribute('data-profile-interest');
    const arr = state.profile.interests;
    const i = arr.indexOf(name);
    if (i >= 0) arr.splice(i, 1); else arr.push(name);
    render();
  }));

  // Scenario cards → open detail (on scenarios screen, shift-click or dedicated button)
  document.querySelectorAll('[data-detail-scenario]').forEach(el => el.addEventListener('click', (e) => {
    e.stopPropagation();
    state.detailScenario = el.getAttribute('data-detail-scenario');
    navigate('detail');
  }));

  // Simulate from detail
  document.querySelectorAll('[data-action="sim-from-detail"]').forEach(el => el.addEventListener('click', () => {
    state.selectedScenario = state.detailScenario;
    navigate('config');
  }));

  // Profile link in user footer
  document.querySelectorAll('[data-user-action]').forEach(el => el.addEventListener('click', () => {
    const action = el.getAttribute('data-user-action');
    if (action === 'profile') navigate('profile');
    if (action === 'logout') navigate('login');
  }));
}

// Expose for app.js router
window.EXTRA_SCREENS = {
  login: loginHTML,
  onboarding: onboardingHTML,
  profile: profileHTML,
  detail: detailHTML,
  about: aboutHTML,
  loading: loadingHTML,
  teachers: teachersHTML
};
window.STANDALONE_SCREENS = new Set(['login', 'onboarding', 'loading']);
window.EXTRA_TITLES = {
  login: 'Iniciar sesión',
  onboarding: 'Bienvenida',
  profile: 'Perfil',
  detail: 'Detalle de escenario',
  about: 'Acerca de',
  loading: 'Simulando',
  teachers: 'Para docentes'
};
window.wireExtraEvents = wireExtraEvents;
