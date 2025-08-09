/* common.js — 华人卡车协会英语评估训练 · 公共逻辑 */

/** ========= 统一朗读（优选 en-US 男声） ========= */
let _ttsReady = false;
let _voiceCache = null;

// 优先顺序（不同系统/浏览器常见英文男声/自然声音）
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

// 异步确保 voices 就绪
function ensureVoicesReady(cb) {
  if (!('speechSynthesis' in window)) {
    cb(false);
    return;
  }
  const tryPick = () => {
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length) {
      _ttsReady = true;
      cb(true);
    } else {
      // 部分浏览器需要一点时间
      setTimeout(tryPick, 150);
    }
  };
  // 某些环境必须监听该事件
  window.speechSynthesis.onvoiceschanged = () => tryPick();
  tryPick();
}

function pickVoice() {
  if (_voiceCache) return _voiceCache;

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

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

  // 3) 退回任意 en-US
  const anyEN = voices.find(v => v.lang === 'en-US');
  if (anyEN) { _voiceCache = anyEN; return anyEN; }

  // 4) 最后兜底第一个
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
    utter.lang = 'en-US';
    utter.rate = 0.95;  // 略慢更清晰
    utter.pitch = 1.0;
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

/** ========= 表格过滤 =========
 * 支持英文、中文、读音三列模糊匹配
 */
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
