/* common.js — FMCSA 英语评估训练公共逻辑 */

// 朗读函数：优先男声（en-US）
function speakText(text) {
  if (!text) return;

  // 如果浏览器支持 SpeechSynthesis API
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // 美式英语
    utterance.rate = 1;       // 语速
    utterance.pitch = 1;      // 音调

    // 优先找男声
    const voices = speechSynthesis.getVoices();
    const maleVoice = voices.find(v =>
      v.lang === 'en-US' &&
      /male|man|guy|boy/i.test(v.name)
    );

    if (maleVoice) {
      utterance.voice = maleVoice;
    } else {
      // 找不到男声就退回第一个 en-US 声音
      const fallbackVoice = voices.find(v => v.lang === 'en-US');
      if (fallbackVoice) utterance.voice = fallbackVoice;
    }

    speechSynthesis.speak(utterance);
  } else {
    alert('您的浏览器不支持语音朗读功能。');
  }
}

// 表格过滤
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const filter = input.value.trim().toLowerCase();
  const table = document.getElementById(tableId);
  if (!table) return;

  const trs = table.querySelectorAll('tbody tr');
  trs.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    const match = Array.from(tds).some(td =>
      td.textContent.toLowerCase().includes(filter)
    );
    tr.style.display = match ? '' : 'none';
  });
}
