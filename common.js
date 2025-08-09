// ====== 访问口令设置 ======
const allowedPasswords = [
  "5678", "8922", "0345", "3314", "3334",
  "8586", "7992", "8655", "7763", "8896"
];

// ====== 页面加载时验证密码 ======
(function passwordCheck() {
  let pass = prompt("请输入访问口令：");
  if (!allowedPasswords.includes(pass)) {
    alert("密码错误，无法访问！");
    document.body.innerHTML = "<h2 style='text-align:center;color:red;margin-top:50px;'>访问被拒绝</h2>";
    throw new Error("Access Denied");
  }
})();

// ====== 搜索功能 ======
function filterTable(inputId, tableId) {
  let input = document.getElementById(inputId);
  let filter = input.value.toLowerCase();
  let table = document.getElementById(tableId);
  let trs = table.getElementsByTagName("tr");

  for (let i = 1; i < trs.length; i++) {
    let tds = trs[i].getElementsByTagName("td");
    let show = false;
    for (let td of tds) {
      if (td.textContent.toLowerCase().includes(filter)) {
        show = true;
        break;
      }
    }
    trs[i].style.display = show ? "" : "none";
  }
}

// ====== 朗读功能（男声，美式英语） ======
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("你的浏览器不支持朗读功能");
    return;
  }
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.pitch = 1; // 音调正常
  utterance.rate = 1;  // 语速正常
  utterance.volume = 1; // 最大音量

  // 选择男声
  let voices = speechSynthesis.getVoices();
  let maleVoice = voices.find(v => v.lang === "en-US" && /male|David|Guy|Mike|John/i.test(v.name));
  if (maleVoice) utterance.voice = maleVoice;

  speechSynthesis.speak(utterance);
}

// Chrome 会延迟加载语音，需要监听
if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = () => {};
}
