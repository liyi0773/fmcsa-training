/* common.js — 华人卡车协会英语评估训练 · 公共逻辑 */

/** ========= 统一朗读（优选 en-US 男声） ========= */
let _ttsReady = false;
let _voiceCache = null;

// 常见英文男声/自然声音（用于自动挑选兜底）
const PREFERRED_VOICES = [
  // Windows / Edge
  { name: 'Microsoft Guy', lang: 'en-US' },
  { name: 'Microsoft Guy Online', lang: 'en-US' },
  { name: 'Microsoft Adam', lang: 'en-US' },
  { name: 'Microsoft Aria', lang: 'en-US' }, // 女声但自然，兜底
  // macOS / iOS
  { name: 'Fred', lang: 'en-US' },           // 男声
  { name: 'Alex', lang: 'en-US' },           // 男声
  { name: 'Samantha', lang: 'en-US' },       // 女声兜底
  // Chrome
  { name: 'Google US English', lang: 'en-US' },
];

/* -------- 更稳的 ensureVoicesReady：轮询 + onvoiceschanged 双保险 -------- */
function ensureVoicesReady(cb) {
  if (!('speechSynthesis' in window)) { cb(false); return; }

  let tries = 0;
  const maxTries = 20;      // 20 次 * 200ms ≈ 4 秒
  const interval = 200;

  const tick = () => {
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length) { _ttsReady = true; cb(true); return; }
    if (tries++ >= maxTries) { cb(false); return; }
    setTimeout(tick, interval);
  };

  try { window.speechSynthesis.getVoices(); } catch {}
  if (typeof window.speechSynthesis.onvoiceschanged !== 'function') {
    window.speechSynthesis.onvoiceschanged = tick;
  }
  tick();
}

/** ========= TTS 用户可选：人声 + 语速（本地保存） ========= */
const TTS_SETTINGS_KEY = 'fmcsa_tts_settings_v1';
let   TTS_SETTINGS = { voice: null, rate: 0.95, pitch: 1.0 };

try {
  const saved = JSON.parse(localStorage.getItem(TTS_SETTINGS_KEY) || '{}');
  TTS_SETTINGS = { ...TTS_SETTINGS, ...saved };
} catch {}

function saveTtsSettings() {
  localStorage.setItem(TTS_SETTINGS_KEY, JSON.stringify(TTS_SETTINGS));
}

function getSortedVoices() {
  const voices = (window.speechSynthesis?.getVoices() || []).slice();
  const en = voices.filter(v => /en-US/i.test(v.lang));
  const rest = voices.filter(v => !/en-US/i.test(v.lang));
  const byName = (a,b)=> (a.name||'').localeCompare(b.name||'');
  return [...en.sort(byName), ...rest.sort(byName)];
}

/**
 * 绑定控件：语音 <select> + 速度 <input type=range>
 * @param {string} selId  语音选择器 id
 * @param {string} rateId 速度滑块 id
 * @param {string} outId  速度显示 span id（可选）
 */
function wireTtsControls(selId, rateId, outId) {
  const sel  = document.getElementById(selId);
  const rate = document.getElementById(rateId);
  const out  = outId ? document.getElementById(outId) : null;
  if (!sel && !rate) return;

  const populate = (ok) => {
    if (!sel) return;
    const voices = (ok ? getSortedVoices() : []);
    sel.innerHTML = '';

    if (!ok || !voices.length) {
      const opt = document.createElement('option');
      opt.textContent = '未检测到系统语音';
      sel.appendChild(opt);
      sel.disabled = true;
      return;
    }

    sel.disabled = false;
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      sel.appendChild(opt);
    });

    if (TTS_SETTINGS.voice) {
      const has = voices.some(v => v.name === TTS_SETTINGS.voice);
      sel.value = has ? TTS_SETTINGS.voice : (voices[0]?.name || '');
    } else {
      sel.value = voices[0]?.name || '';
    }
    TTS_SETTINGS.voice = sel.value || null;
    saveTtsSettings();
  };

  // 先显示占位，再异步填充
  if (sel) {
    sel.innerHTML = '<option>加载语音中…</option>';
    sel.disabled = true;
  }

  ensureVoicesReady((ok) => {
    populate(ok);
    // 再补一次，处理极慢加载场景
    setTimeout(() => populate(true), 1000);
  });

  if (sel) {
    sel.addEventListener('change', () => {
      TTS_SETTINGS.voice = sel.value || null;
      saveTtsSettings();
      _voiceCache = null;
    });
  }

  if (rate) {
    if (typeof TTS_SETTINGS.rate === 'number') rate.value = String(TTS_SETTINGS.rate);
    if (out) out.textContent = rate.value;
    rate.addEventListener('input', () => {
      TTS_SETTINGS.rate = Number(rate.value);
      if (out) out.textContent = rate.value;
      saveTtsSettings();
    });
  }
}

function pickVoice() {
  if (_voiceCache) return _voiceCache;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  // 优先使用用户选择
  if (TTS_SETTINGS.voice) {
    const chosen = voices.find(v => v.name === TTS_SETTINGS.voice);
    if (chosen) { _voiceCache = chosen; return chosen; }
  }
  // 1) 从优先列表里找匹配
  for (const pref of PREFERRED_VOICES) {
    const v = voices.find(vc =>
      (pref.name && vc.name && vc.name.toLowerCase().includes(pref.name.toLowerCase())) ||
      (pref.lang && vc.lang === pref.lang && vc.name && /english/i.test(vc.name))
    );
    if (v) { _voiceCache = v; return v; }
  }
  // 2) 尝试找“男声”关键词
  const male = voices.find(v => v.lang === 'en-US' && /male|man|guy|boy|fred|alex/i.test(v.name || ''));
  if (male) { _voiceCache = male; return male; }
  // 3) 任意 en-US
  const anyEN = voices.find(v => v.lang === 'en-US');
  if (anyEN) { _voiceCache = anyEN; return anyEN; }
  // 4) 兜底
  _voiceCache = voices[0];
  return _voiceCache;
}

/** 对外朗读 API */
function speakText(text) {
  if (!text) return;
  if (!('speechSynthesis' in window)) {
    alert('您的浏览器不支持语音朗读功能。');
    return;
  }
  ensureVoicesReady((ok) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'en-US';
    utter.rate  = (typeof TTS_SETTINGS.rate === 'number') ? TTS_SETTINGS.rate : 0.95;
    utter.pitch = (typeof TTS_SETTINGS.pitch === 'number') ? TTS_SETTINGS.pitch : 1.0;
    const v = pickVoice();
    if (v) utter.voice = v;
    // 如果正在读，先清掉队列再读
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  });
}

// 手动停止朗读
function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/** ========= 表格过滤（兼容桌面与移动） ========= */
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;

  const q = (input.value || '').trim().toLowerCase();
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(tr => {
    const match = Array.from(tr.cells).some(td =>
      (td.textContent || '').toLowerCase().includes(q)
    );
    tr.style.display = match ? '' : 'none';
  });
}

// 可选：页面加载时预热语音（避免首次点击延迟）
document.addEventListener('DOMContentLoaded', () => {
  ensureVoicesReady(() => {});
});

/* =======================================================================
   访问门禁（固定 4 位 PIN，10 个；哈希校验）
   用法：页面中用 gatedInit(() => { initTables(); ... }) 包住渲染逻辑
   ======================================================================= */
const PIN_SESSION_KEY = 'fmcsa_gate_hashes_v1';

// 固定的 10 个 PIN（你提供的列表）
const FIXED_PINS = ['5678','8922','0345','3314','3334','8586','7992','8655','7763','8896'];

// 计算 SHA-256 十六进制
async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 准备哈希（基于固定 PIN）
async function ensureGateSecrets() {
  let hashes = sessionStorage.getItem(PIN_SESSION_KEY);
  if (hashes) return JSON.parse(hashes);
  const hashed = await Promise.all(FIXED_PINS.map(p => sha256Hex(p)));
  sessionStorage.setItem(PIN_SESSION_KEY, JSON.stringify(hashed));
  return hashed;
}

// 校验 PIN
async function verifyPin(pin, hashes) {
  if (!/^\d{4}$/.test(pin)) return false;
  const h = await sha256Hex(pin);
  return hashes.includes(h);
}

/**
 * gatedInit：验证通过后执行回调（渲染）
 * @param {Function} runApp - 通过验证后要执行的渲染逻辑
 */
async function gatedInit(runApp) {
  try {
    const hashes = await ensureGateSecrets();
    let ok = false;
    for (let i = 0; i < 3; i++) {
      const pin = prompt('请输入 4 位访问密码：');
      if (pin === null) break;
      if (await verifyPin(pin, hashes)) { ok = true; break; }
      alert('密码不正确，请重试。');
    }

    if (!ok) {
      document.body.innerHTML = '<div style="display:grid;place-items:center;height:100vh;color:#cbd5e1;font:16px system-ui">未授权访问</div>';
      return;
    }

    if (typeof runApp === 'function') runApp();
  } catch (e) {
    console.error('门禁初始化失败：', e);
    document.body.innerHTML = '<div style="display:grid;place-items:center;height:100vh;color:#cbd5e1;font:16px system-ui">系统错误，请刷新重试</div>';
  }
}
