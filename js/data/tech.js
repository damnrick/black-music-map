/* ============================================================
   制作/录音/和声/节奏/采样/演唱 技术演进时间线
   window.BM.tech = [{year, cat, title, desc}]
   cat: 乐器设备 / 录音制作 / 节奏鼓机 / 采样 / 演唱 / 流派工艺
   ============================================================ */
(function(){
window.BM.tech = [
{year:1935,cat:"乐器设备",title:"Hammond B-3 风琴与教堂之声",desc:"Laurens Hammond 的电风琴配合 Leslie 旋转音箱，成为黑人教会的核心音色，后来进入灵魂、放克与爵士（Booker T.、Jimmy Smith），把福音的和声铺底带入世俗音乐。"},
{year:1940,cat:"乐器设备",title:"电吉他先声",desc:"Sister Rosetta Tharpe 以失真电吉他伴奏福音，T-Bone Walker 确立电声布鲁斯吉他，电吉他从圣乐与布鲁斯两端，为后来的摇滚与放克音色铺路。"},
{year:1948,cat:"录音制作",title:"磁带与多轨录音",desc:"Bing Crosby 团队推广 Ampex 磁带录音机，磁带让叠录、拼接、变成为可能；从单声道到3轨/8轨/16轨，多轨革命彻底改变了福音、灵魂与摩城的制作方式。"},
{year:1959,cat:"乐器设备",title:"Motown 与贝斯线工艺",desc:"James Jamerson 的芬达 Precision Bass 以复杂、切分、近乎行走的贝斯线，成为摩城之声的地基；棚拍乐队 Funk Brothers 证明节奏组是流行灵魂的真正引擎。"},
{year:1962,cat:"乐器设备",title:"Rhodes 电钢琴与 Clavinet",desc:"Fender Rhodes 温暖的电钢琴成为灵魂与爵士的和声底色；Hohner Clavinet 的拨弦打击感（如 Superstition）则给放克提供了锐利的节奏键盘。"},
{year:1964,cat:"流派工艺",title:"Stax/Muscle Shoals 的现场同期录音",desc:"南方灵魂厂牌把节奏组塞进同一房间、同期录制，保留粗粝、留白与推拉的 groove，与摩城的精致流水线形成对照，定义了 deep soul 的质感。"},
{year:1967,cat:"节奏鼓机",title:"放克的节奏重心前移",desc:"James Brown 与鼓手 Clyde Stubblefield、Jabo Starks 把重音落到反拍与“1”之外的切分，Funky Drummer、Give It Up 的鼓间奏成为后来 Hip-Hop 取样最多的 break。"},
{year:1969,cat:"乐器设备",title:"Minimoog 与合成器、TONTO",desc:"Moog 模块化合成器小型化，Stevie Wonder 与 TONTO 巨型合成器系统（Talking Book/Innervisions）把合成器从音效变成主奏，Herbie Hancock 等随即跟进，开启电子放克与融合。"},
{year:1970,cat:"乐器设备",title:"Talk Box 与声码器",desc:"Roger Troutman（Zapp）用 talk box 让键盘“说话”，P-Funk、Joe Walsh 跟进；声码器/talk box 后来直接影响 West Coast、电子嘻哈与 Auto-Tune 的人声机械美学。"},
{year:1973,cat:"流派工艺",title:"DJ Kool Herc 的 merry-go-round",desc:"1973-08-11，Herc 在布朗克斯 1520 Sedgwick 用两张同样唱片循环只放鼓间奏（break），让舞者持续——breakbeat 循环是 Hip-Hop 音乐形态的技术原点。"},
{year:1973,cat:"乐器设备",title:"Head Hunters 与融合爵士节奏组",desc:"Herbie Hancock 用 ARP Odyssey、Clavinet 与放克化的节奏组做出 Head Hunters（Chameleon），把爵士即兴与放克律动、合成器合一，成为西岸 G-Funk 未来的采样宝库。"},
{year:1975,cat:"流派工艺",title:"Scratching 与搓盘",desc:"Grand Wizzard Theodore 意外发明搓盘，Grandmaster Flash 发展出快切（quick cut）与背手操作，DJ 把唱机变成乐器，turntablism 成为嘻哈四大元素之一。"},
{year:1975,cat:"录音制作",title:"12 寸单曲与迪斯科混音",desc:"迪斯科厂牌推出12寸单曲，给 DJ 更长的混音、更宽的动态与低频；Tom Moulton 的延伸混音、Loft/Garage 音响系统文化，是后来 house 与混音文化的母体。"},
{year:1976,cat:"流派工艺",title:"Dub 与版本 B 面",desc:"牙买加音响系统（King Tubby、Lee Perry）把混音台当乐器，抽空主唱、突出贝斯与延迟空间；dub 的版本美学与 MC 主持，直接影响嘻哈制作与说唱角色。"},
{year:1977,cat:"流派工艺",title:"I Feel Love 与全合成器脉动",desc:"Giorgio Moroder 为 Donna Summer 用连续的 Moog 琶音与机械四拍做出 I Feel Love，被视为最早的电子舞曲蓝图，直接通向 house、techno 与后来的 Renaissance。"},
{year:1980,cat:"节奏鼓机",title:"Roland TR-808",title2:"",desc:"可编程鼓机以夸张的低频底鼓、噪声军鼓与手持感著称，最初商业失利，却在黑人地下（Marvin Gaye Sexual Healing、Afrika Bambaataa、Miami bass、南部trap）成为史上最被热爱的鼓机。"},
{year:1982,cat:"节奏鼓机",title:"LinnDrum 与鼓机采样",desc:"Roger Linn 的 LinnDrum/LM-1 用真实采样的鼓声、紧凑的 swing，成为 Prince、Peter Gabriel、1980年代流行与制作的标志，鼓机第一次有了“人味”与可调音色。"},
{year:1983,cat:"录音制作",title:"MIDI 标准确立",desc:"MIDI 协议让合成器、鼓机、音序器互通，一个人即可编排整张作品；它降低制作门槛，直接催生 bedroom producer 与后来的自制嘻哈/R&B。"},
{year:1987,cat:"节奏鼓机",title:"E-mu SP-1200 与 boom bap",desc:"SP-1200 有限的采样时间逼制作人把唱片切成碎块、在33又1/3转降速采样再升调，其脏暖的12bit音色与 Akai MPC60 一起定义了东岸 boom bap 与黄金年代。"},
{year:1988,cat:"采样",title:"Akai MPC 与手指鼓",desc:"Roger Linn 参与设计的 MPC 把打击垫、采样与时序 swing 合一，Pete Rock、J Dilla、DJ Premier 用手指实时触发采样，MPC 成为嘻哈制作的代名词，延续至今。"},
{year:1988,cat:"流派工艺",title:"New Jack Swing",desc:"Teddy Riley 把嘻哈的鼓机与 R&B 的旋律合并（Bobby Brown、Bell Biv DeVoe），R&B 第一次“说唱化”，节奏更硬、律动更街头，连接放克灵魂与1990年代当代R&B。"},
{year:1988,cat:"流派工艺",title:"Acid House 与采样拼贴进入流行",desc:"芝加哥 house、底特律 techno 与英国锐舞场景，把罗兰 TB-303 的酸性贝斯与采样文化推向全球，黑人地下舞曲成为流行结构的一部分。"},
{year:1991,cat:"流派工艺",title:"G-Funk：高音色 lead 与放克采样",desc:"Dr. Dre 在 The Chronic 用高音 Moog 旋律线、1970年代放克/融合采样、慢速稳定与现场乐手重奏，定义西岸 G-Funk，影响整个1990年代说唱的声音空间。"},
{year:1993,cat:"录音制作",title:"数字录音与 Pro Tools 普及",desc:"硬盘录音、DAW 与 Pro Tools 逐步取代2寸磁带，无损复制、无限轨道与可视化编辑改变制作流程，为1990年代末的密集拼贴与2000年代的自制时代铺路。"},
{year:1995,cat:"流派工艺",title:"Neo-Soul 的“现场+嘻哈”工艺",desc:"Soulquarians（D'Angelo、The Roots、Erykah、Common）在Electric Lady 用现场乐队、模拟设备与嘻哈的节拍审美同期jam，把1970灵魂的温度与说唱时代的律动合一。"},
{year:1997,cat:"演唱",title:"Auto-Tune 与人声效果",desc:"Cher 的 Believe 让音高修正的机械效果成名，而 T-Pain、Kanye 808s、Future 把 Auto-Tune 变成情感与风格工具，深刻改变2000年后 R&B 与说唱的演唱美学。"},
{year:1998,cat:"节奏鼓机",title:"Trap  hi-hat 与三连音",desc:"南部制作（Mannie Fresh、Shawty Redd、T.I. Trap Muzik）用 Roland TR-808、快速滚动的踩镲（hi-hat rolls）、三连音 flow 与极低频，逐步成为2010年代的主导节奏。"},
{year:2004,cat:"采样",title:"J Dilla 的时序革命",desc:"Dilla 在 Donuts 中故意让鼓点“迟到/抢拍”、不量化，用人手的摇摆与大量碎拍采样，重新定义嘻哈鼓的人性与时序，影响之后所有节拍制作。"},
{year:2010,cat:"流派工艺",title:"Lo-fi 与卧室制作复兴",desc:"廉价DAW、YouTube beat tape、J Dilla/Nujabes 式的温暖碎拍，让lo-fi hip-hop 成为学习/生活背景音，DIY 与采样美学在流媒体时代大规模民主化。"},
{year:2011,cat:"流派工艺",title:"Alt-R&B（PBR&B）",desc:"The Weeknd、Frank Ocean、How to Dress Well 等用幽暗氛围、稀疏制作、混响人声与另类质感，重构1990/2000年代 R&B，把内省与氛围置于炫技之上。"},
{year:2012,cat:"流派工艺",title:"Drill：滑动贝斯与区域扩散",desc:"芝加哥（Chief Keef、Young Chop）起源、经伦敦（808 Melo 滑动贝斯）到布鲁克林（Pop Smoke），drill 以暗黑808、稳定慢速与冷峻叙事，成为全球青年的共同语言。"},
{year:2015,cat:"流派工艺",title:"Rage 与朋克说唱",desc:"Playboi Carti、Whole Lotta Red 及 Opium 阵营用失真合成器、朋克能量与极简重复，把 trap 推向摇滚式攻击，rage 成为 SoundCloud 世代的主导先锋声音。"},
{year:2017,cat:"流派工艺",title:"UK 爵士复兴",desc:"伦敦年轻乐手（Kamasi 呼应、Nubya Garcia、Ezra Collective、Sons of Kemet）把 grime、afrobeat、broken beat 与即兴合一，在俱乐部而非音乐厅复兴爵士，并反哺说唱。"},
{year:2019,cat:"流派工艺",title:"Afrobeats / Amapiano 进入中心",desc:"尼日利亚 afrobeats（Burna、Wizkid、Tems）与南非 amapiano 的慢速、log drum、爵士和声进入全球榜单，全球南方的节奏逻辑开始反向塑造英美流行。"},
{year:2022,cat:"流派工艺",title:"黑人舞曲史的再主张",desc:"Beyoncé Renaissance 把 disco/house/ballroom、Cowboy Carter 把乡村/根源的黑人贡献重新摆进主流，技术与风格的历史，在此被作为政治与文化主张重新讲述。"}
];
})();
