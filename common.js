// 密码验证
const passwords = ["5678","8922","0345","3314","3334","8586","7992","8655","7763","8896"];
let pass = prompt("请输入访问口令：");
if (!passwords.includes(pass)) {
    alert("密码错误，无法访问！");
    document.body.innerHTML = "<h2 style='text-align:center;color:red;margin-top:50px;'>访问被拒绝</h2>";
    throw new Error("Access Denied");
}

// 统一美式英语朗读
let _ttsVoice = null;
function pickEnUS(){
    const voices = speechSynthesis.getVoices() || [];
    // 男声优先（按常见平台列出）
    const malePref = [
        // iOS/macOS
        'Aaron','Alex','Fred',
        // Windows/Edge
        'Microsoft Guy','Microsoft Davis','Microsoft Christopher','Microsoft Mark','Microsoft David',
        // Chrome/Android（有时就是男声）
        'Google US English'
    ];
    for (const name of malePref){
        const v = voices.find(x => x.name && x.name.toLowerCase().includes(name.toLowerCase()));
        if (v && xLangIsEnUS(v)) return v;
    }
    // 其次：任何名字里出现“male”的英语美式
    const maleLike = voices.find(v => xLangIsEnUS(v) && /male|guy|man/i.test(v.name||''));
    if (maleLike) return maleLike;
    // 兜底：任意 en-US
    return voices.find(v => xLangIsEnUS(v)) || voices[0] || null;
}
function xLangIsEnUS(v){
    return (v && ((v.lang||'').toLowerCase()==='en-us' || /(english).*us/i.test((v.lang||'')+' '+(v.name||''))));
}

function speakText(text){
    ensureVoice(() => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        if(_ttsVoice) u.voice = _ttsVoice;
        u.rate = 0.95; u.pitch = 1.0;
        speechSynthesis.speak(u);
    });
}

// 渲染表格
function renderAll(isMobile){
    const container = document.getElementById("content");
    vocab.forEach(row => {
        const div = document.createElement("div");
        div.style.marginBottom = "8px";
        div.innerHTML = `<b>${row.en}</b> - ${row.zh} <i>${row.hint}</i> <button onclick="speakText('${row.en}')">🔊</button>`;
        container.appendChild(div);
    });
}
