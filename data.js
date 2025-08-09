/* data.js — FMCSA 英语评估训练 · 全量数据 */

// 主数据对象（英文 en · 中文 zh · 读音提示 hint）
window.FMCSA_DATA = {
  // 必备证件与单据
  vocab: [
    {en:'License', zh:'驾照', hint:'/ˈlaɪsns/ 来森斯'},
    {en:'Registration', zh:'（车辆）注册', hint:'/ˌredʒɪˈstreɪʃən/ 瑞吉斯崔申'},
    {en:"CDL (Commercial Driver’s License)", zh:'商业驾驶执照', hint:'C-D-L'},
    {en:'Apportioned Registration Cab Card', zh:'分摊注册随车证（IRP）', hint:'啊泼申 里吉丝崔申 凯布卡德'},
    {en:'Insurance', zh:'保险', hint:'因休伦斯'},
    {en:'Medical Card', zh:'体检卡/健康证', hint:'麦迪可 卡德'},
    {en:'ELD (Electronic Logging Device)', zh:'电子记录设备', hint:'E-L-D'},
    {en:'Logbook', zh:'驾驶日志', hint:'劳格布克'},
    {en:'Bill of Lading (BOL)', zh:'提货单', hint:'比尔-莱丁'},
    {en:'IFTA (International Fuel Tax Agreement)', zh:'国际燃油税协议', hint:'伊芙塔'}
  ],

  // 执法/拦检常用词
  stopWords: [
    {en:'Citation', zh:'罚单/传票', hint:'赛泰申'},
    {en:'Warning', zh:'警告', hint:'窝宁'},
    {en:'Destination', zh:'目的地', hint:'德斯提内申'},
    {en:'Highway', zh:'高速公路', hint:'嗨威'},
    {en:'Pull Over', zh:'靠边停车', hint:'扑欧佛'},
    {en:'International Fuel Tax Agreement', zh:'国际燃油税协议', hint:'IFTA 伊芙塔'},
    {en:'Drug', zh:'毒品', hint:'德拉格'},
    {en:'Narcotics', zh:'麻醉品', hint:'纳卡迪克斯'},
    {en:'Alcohol', zh:'酒精', hint:'艾尔可霍'},
    {en:'Firearms', zh:'火器/枪支', hint:'发尔阿姆兹'},
    {en:'Weapons', zh:'武器', hint:'威朋兹'},
    {en:'Gun', zh:'枪', hint:'根'},
    {en:'Search', zh:'搜查', hint:'瑟驰'},
    {en:'Step out', zh:'下车', hint:'斯泰普 奥特'},
    {en:'Vehicle', zh:'车辆', hint:'维诶克尔'}
  ],

  // 运营/行程相关
  opsWords: [
    {en:'How long', zh:'多久', hint:'豪 隆'},
    {en:'Driving', zh:'驾驶', hint:'德赖维'},
    {en:'Hauling', zh:'（卡车）运输', hint:'霍林'},
    {en:'Accident', zh:'事故', hint:'艾克西登特'},
    {en:'Trip', zh:'行程', hint:'趋瑞普'},
    {en:'Empty', zh:'空载', hint:'恩普缇'},
    {en:'Violation', zh:'违规', hint:'瓦哟雷申'},
    {en:'Out of Service', zh:'停止服务/停运', hint:'奥特 夫 瑟维斯'},
    {en:'Report', zh:'报告', hint:'瑞波特'}
  ],

  // 检查与设备
  inspectWords: [
    {en:'Annual Inspection', zh:'年度检验', hint:'安纽欧 因斯佩克申'},
    {en:'Inspection', zh:'检查', hint:'因斯佩克申'},
    {en:'Brakes', zh:'刹车', hint:'布瑞克斯'},
    {en:'Lights', zh:'灯光', hint:'赖茨'},
    {en:'Tires', zh:'轮胎', hint:'胎尔兹'},
    {en:'Load', zh:'载重/货物', hint:'楼德'},
    {en:'Overweight', zh:'超重', hint:'欧佛魏特'},
    {en:'Scale', zh:'地磅/称重站', hint:'思给欧'},
    {en:'Ticket', zh:'罚单', hint:'剔克特'},
    {en:'Gross Weight', zh:'总重量', hint:'格肉斯 魏特'},
    {en:'Engine', zh:'发动机', hint:'恩金'},
    {en:'Hood', zh:'引擎盖', hint:'忽德'},
    {en:'Truck', zh:'卡车', hint:'差克'},
    {en:'Trailer', zh:'挂车', hint:'吹勒'},
    {en:'Hazardous Material', zh:'危险品', hint:'哈泽德斯 马提瑞欧'},
    {en:'GVWR', zh:'车辆总重量额定值', hint:'G-V-W-R'},
    {en:'Weigh Station', zh:'称重站', hint:'魏 斯得申'},
    {en:'Axle Weight', zh:'轴重', hint:'艾克瑟 魏特'},
    {en:'Horn', zh:'喇叭', hint:'霍恩'},
    {en:'Bridge', zh:'桥梁', hint:'布瑞吉'},
    {en:'Level 1 Inspection', zh:'一级检验', hint:'勒伏弯 因斯佩克申'},
    {en:'Permit', zh:'通行证/许可', hint:'珀米特'},
    {en:'Fine', zh:'罚款', hint:'fain'},
    {en:'Emergency Kit', zh:'应急工具包', hint:'一么真西 克特'},
    {en:'Reflector Triangle', zh:'三角反光牌', hint:'瑞弗莱克特 差伊昂格'},
    {en:'Fire Extinguisher', zh:'灭火器', hint:'发儿 以克斯汀圭舍'},
    {en:'Safety Vest', zh:'安全背心', hint:'塞夫提 维斯特'},
    {en:'First Aid Kit', zh:'急救包', hint:'佛斯特 埃德 克特'}
  ],

  // 维修与部件
  maintWords: [
    {en:'Mechanic', zh:'修理工/机修', hint:'么开尼克'},
    {en:'Repair', zh:'维修', hint:'瑞佩尔'},
    {en:'Tool', zh:'工具', hint:'突欧'},
    {en:'Battery', zh:'电瓶', hint:'拜特瑞'},
    {en:'Alternator', zh:'交流发电机', hint:'欧特内特儿'},
    {en:'Starter', zh:'起动机', hint:'斯达特儿'},
    {en:'Air line', zh:'气管', hint:'艾尔 赖因'},
    {en:'Coolant', zh:'冷却液', hint:'库冷特'},
    {en:'Oil', zh:'机油', hint:'欧油'},
    {en:'Oil leak', zh:'漏油', hint:'欧油 利克'},
    {en:'Flat tire', zh:'爆胎', hint:'福莱特 胎尔'},
    {en:'Air compressor', zh:'空压机', hint:'康普瑞瑟'},
    {en:'Hose', zh:'软管', hint:'霍兹'},
    {en:'Check engine', zh:'发动机故障灯', hint:'切克 恩金'},
    {en:'Warning light', zh:'警示灯', hint:'窝宁 赖特'},
    {en:'Radiator', zh:'散热器', hint:'瑞迪耶特'}
  ],

  // 拦检情景对话
  dialogs: [
    {en:"1. Can I have your CDL, registration, insurance, and medical card, please?", zh:"请出示你的商业驾照、车辆注册、保险、健康证。"},
    {en:"2. Can you show me your ELD or logbook?", zh:"请出示你的电子记录设备或驾驶日志。"},
    {en:"3. What are you hauling, and where are you headed?", zh:"你在运什么货物，目的地是哪里？"},
    {en:"4. Where did you come from today?", zh:"今天你从哪里出发？"},
    {en:"5. How long have you been driving today?", zh:"今天你开了多久？"},
    {en:"6. Have you had your break/rest time today?", zh:"你今天有按规定休息吗？"},
    {en:"7. How much does your load weigh?", zh:"你的货物总重是多少？"},
    {en:"8. Are you carrying any hazardous materials?", zh:"有任何危险品吗？"},
    {en:"9. Can I have your bill of lading?", zh:"请出示提货单。"},
    {en:"10. Did you do pre-trip inspection today?", zh:"你今天做了行车前车检了吗？"},
    {en:"11. I’ll need to inspect the vehicle. Can you step out?", zh:"我需要检查车辆，请下车。"},
    {en:"12. I’m going to have you perform level II inspection.", zh:"请做二级车检。"},
    {en:"13. Everything checks out, but one of your brake lights is out. You’ll need to fix that before you continue.", zh:"检查都合格，但你的一个刹车灯坏了，需要修好才能继续行驶。"},
    {en:"14. I’m issuing a citation for the brake light.", zh:"我会因为刹车灯问题开一张罚单。"},
    {en:"15. Alright, drive safely and have a good day.", zh:"好的，安全驾驶，祝你一天愉快。"}
  ],

  // 美国各州
  states: [
    {en:'Alabama', zh:'阿拉巴马州', hint:'埃拉巴马'},
    {en:'Alaska', zh:'阿拉斯加州', hint:'阿拉斯加'},
    {en:'Arizona', zh:'亚利桑那州', hint:'艾瑞佐那'},
    {en:'Arkansas', zh:'阿肯色州', hint:'阿肯骚'},
    {en:'California', zh:'加利福尼亚州', hint:'加州'},
    {en:'Colorado', zh:'科罗拉多州', hint:'卡勒拉多'},
    {en:'Connecticut', zh:'康涅狄格州', hint:'可内得克特'},
    {en:'Delaware', zh:'特拉华州', hint:'得拉威尔'},
    {en:'Florida', zh:'佛罗里达州', hint:'弗罗里达'},
    {en:'Georgia', zh:'乔治亚州', hint:'乔治亚'},
    {en:'Hawaii', zh:'夏威夷州', hint:'哈外伊'},
    {en:'Idaho', zh:'爱达荷州', hint:'爱达厚'},
    {en:'Illinois', zh:'伊利诺伊州', hint:'伊利诺（s不发音）'},
    {en:'Indiana', zh:'印第安纳州', hint:'印迪安那'},
    {en:'Iowa', zh:'爱荷华州', hint:'爱欧瓦'},
    {en:'Kansas', zh:'堪萨斯州', hint:'看萨斯'},
    {en:'Kentucky', zh:'肯塔基州', hint:'肯塔基'},
    {en:'Louisiana', zh:'路易斯安那州', hint:'卢易斯安那'},
    {en:'Maine', zh:'缅因州', hint:'梅因'},
    {en:'Maryland', zh:'马里兰州', hint:'玛里兰'},
    {en:'Massachusetts', zh:'马萨诸塞州', hint:'马萨诸赛次'},
    {en:'Michigan', zh:'密歇根州', hint:'密西根'},
    {en:'Minnesota', zh:'明尼苏达州', hint:'迷尼苏达'},
    {en:'Mississippi', zh:'密西西比州', hint:'密西西比'},
    {en:'Missouri', zh:'密苏里州', hint:'米苏瑞'},
    {en:'Montana', zh:'蒙大拿州', hint:'蒙坦那'},
    {en:'Nebraska', zh:'内布拉斯加州', hint:'内布拉斯卡'},
    {en:'Nevada', zh:'内华达州', hint:'奈瓦达'},
    {en:'New Hampshire', zh:'新罕布什尔州', hint:'纽罕普夏'},
    {en:'New Jersey', zh:'新泽西州', hint:'纽泽西'},
    {en:'New Mexico', zh:'新墨西哥州', hint:'纽墨西哥'},
    {en:'New York', zh:'纽约州', hint:'纽约'},
    {en:'North Carolina', zh:'北卡罗来纳州', hint:'诺斯凯罗莱纳'},
    {en:'North Dakota', zh:'北达科他州', hint:'诺斯达科他'},
    {en:'Ohio', zh:'俄亥俄州', hint:'欧嗨俄'},
    {en:'Oklahoma', zh:'俄克拉荷马州', hint:'欧克拉荷马'},
    {en:'Oregon', zh:'俄勒冈州', hint:'奥瑞冈'},
    {en:'Pennsylvania', zh:'宾夕法尼亚州', hint:'宾夕法尼亚'},
    {en:'Rhode Island', zh:'罗得岛州', hint:'若得艾兰'},
    {en:'South Carolina', zh:'南卡罗来纳州', hint:'萨斯凯罗莱纳'},
    {en:'South Dakota', zh:'南达科他州', hint:'萨斯达科他'},
    {en:'Tennessee', zh:'田纳西州', hint:'田纳西'},
    {en:'Texas', zh:'德克萨斯州', hint:'泰克萨斯'},
    {en:'Utah', zh:'犹他州', hint:'优塔'},
    {en:'Vermont', zh:'佛蒙特州', hint:'弗蒙特'},
    {en:'Virginia', zh:'弗吉尼亚州', hint:'弗吉尼亚'},
    {en:'Washington', zh:'华盛顿州', hint:'华盛顿'},
    {en:'West Virginia', zh:'西弗吉尼亚州', hint:'威斯特弗吉尼亚'},
    {en:'Wisconsin', zh:'威斯康星州', hint:'威斯康辛'},
    {en:'Wyoming', zh:'怀俄明州', hint:'外俄明'}
  ]
};

// —— 兼容你当前 HTML 的字段与变量名 ——
// 映射成 {en, cn, pr}，并挂到全局供 desktop.html 直接使用
window.essentialData = (window.FMCSA_DATA.vocab || []).map(({en, zh, hint}) => ({ en, cn: zh, pr: hint }));
window.statesData    = (window.FMCSA_DATA.states || []).map(({en, zh, hint}) => ({ en, cn: zh, pr: hint }));
