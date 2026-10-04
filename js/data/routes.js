/* ============================================================
   10 条从入门到深入的听歌路线
   item: {a: 专辑ID(可选,可点击), t: 显示文字}
   ============================================================ */
(function(){
window.BM.routes = [
{no:1,title:"福音 → 灵魂之根",desc:"从黑人教会的呼喊与呼应，走到世俗灵魂乐的诞生，理解 Soul 的唱法与情感从何而来。",
stages:[
{name:"入门",items:[
{t:"Mahalia Jackson · 1950-60年代福音现场（《How I Got Over》）"},
{t:"James Cleveland & Angelic Choir · Peace Be Still（1963）"},
{t:"Aretha Franklin · Amazing Grace（1972，最畅销福音专辑）"}]},
{name:"进阶",items:[
{t:"Aretha Franklin · I Never Loved a Man the Way I Love You（1967）"},
{t:"Otis Redding · Otis Blue（1965）"},
{t:"Sam Cooke · Live at the Harlem Square Club（1963）"}]},
{name:"深入",items:[
{t:"Thomas A. Dorsey · 1930年代现代福音（《Take My Hand, Precious Lord》）"},
{t:"Sister Rosetta Tharpe · 1940年代（电吉他与福音摇滚先声）"},
{t:"The Staple Singers · 1960-70年代福音→灵魂→抗议"},
{a:"marvin_whats_going_on",t:"Marvin Gaye · What's Going On（1971，福音和声入世）"}]}]},

{no:2,title:"James Brown → P-Funk 放克宇宙",desc:"从节奏重心前移的硬放克，走到 Parliament-Funkadelic 的太空放克王朝，Funk 的节奏与音色革命。",
stages:[
{name:"入门",items:[
{t:"James Brown · Live at the Apollo（1963）"},
{t:"Sly & The Family Stone · Stand!（1969）"},
{a:"pf_mothership",t:"Parliament · Mothership Connection（1975）"}]},
{name:"进阶",items:[
{t:"James Brown · Sex Machine / Funky Drummer（1970，breakbeat 源头）"},
{t:"Funkadelic · Maggot Brain（1971）"},
{t:"The Meters · Look-Ka Py Py（1969，新奥尔良律动）"}]},
{name:"深入",items:[
{t:"Bootsy Collins · Ahh... The Name Is Bootsy, Baby!（1977）"},
{t:"Earth, Wind & Fire · That's the Way of the World（1975）"},
{t:"Ohio Players · Fire（1974）"},
{t:"Rufus feat. Chaka Khan · Ask Rufus（1977）"}]}]},

{no:3,title:"Hip-Hop 创世记（街区派对 → 黄金年代）",desc:"从1973年布朗克斯的 DJ 循环，到1980年代末的意识说唱与采样黄金年代。",
stages:[
{name:"入门",items:[
{t:"Various · Wild Style 原声（1983，嘻哈文化影像档案）"},
{t:"The Sugarhill Gang · Rapper's Delight（1979，第一首畅销说唱）"},
{t:"Grandmaster Flash & The Furious Five · The Message（1982）"}]},
{name:"进阶",items:[
{t:"Run-D.M.C. · Run-D.M.C.（1984）"},
{t:"Beastie Boys · Licensed to Ill（1986）"},
{t:"Eric B. & Rakim · Paid in Full（1987，flow 革命）"}]},
{name:"深入",items:[
{t:"Kool Herc · 1973-08-11 1520 Sedgwick（breakbeat 循环起源）"},
{t:"Afrika Bambaataa · Planet Rock（1982，电子与嘻哈合流）"},
{t:"Boogie Down Productions · Criminal Minded（1987）"},
{t:"Public Enemy · It Takes a Nation of Millions（1988）"}]}]},

{no:4,title:"1990 东岸爵士说唱与制作美学",dim:"",desc:"Native Tongwes 与爵士采样、boom bap 鼓点，东岸把说唱做成精密的声音拼贴。",
stages:[
{name:"入门",items:[
{t:"A Tribe Called Quest · The Low End Theory（1991）"},
{a:"nas_illmatic",t:"Nas · Illmatic（1994）"},
{t:"Wu-Tang Clan · Enter the Wu-Tang (36 Chambers)（1993）"}]},
{name:"进阶",items:[
{t:"Pete Rock & C.L. Smooth · Mecca and the Soul Brother（1992）"},
{t:"Gang Starr · Daily Operation（1992）"},
{t:"The Pharcyde · Bizarre Ride II the Pharcyde（1992）"}]},
{name:"深入",items:[
{a:"dilla_fantastic",t:"Slum Village (J Dilla) · Fantastic Vol.2（2000）"},
{t:"De La Soul · 3 Feet High and Rising（1989）"},
{t:"Black Star · Mos Def & Talib Kweli Are Black Star（1998）"},
{a:"doom_madvillainy",t:"Madvillain · Madvillainy（2004，制作美学延续）"}]}]},

{no:5,title:"西岸史：G-Funk 与另类说唱",desc:"从洛杉矶派对放克采样到 G-Funk 的慢板合成器，再到后来的艺术说唱。",
stages:[
{name:"入门",items:[
{t:"Dr. Dre · The Chronic（1992）"},
{t:"Snoop Doggy Dogg · Doggystyle（1993）"},
{t:"2Pac · All Eyez on Me（1996）"}]},
{name:"进阶",items:[
{t:"N.W.A · Straight Outta Compton（1988）"},
{t:"Ice Cube · Death Certificate（1991）"},
{t:"Warren G · Regulate... G Funk Era（1994）"}]},
{name:"深入",items:[
{t:"Digital Underground · Sex Packets（1990）"},
{t:"Too $hort · Life Is... Too Short（1988）"},
{a:"kendrick_gkmc",t:"Kendrick Lamar · good kid, m.A.A.d City（2012）"},
{a:"kendrick_pimp",t:"Kendrick Lamar · To Pimp a Butterfly（2015，放克/爵士回归）"}]}]},

{no:6,title:"Neo-Soul 全史",desc:"说唱时代长大的一代，用嘻哈节拍重组1970年代灵魂与爵士，新灵魂乐的完整脉络。",
stages:[
{name:"入门",items:[
{t:"D'Angelo · Brown Sugar（1995）"},
{t:"Erykah Badu · Baduizm（1997）"},
{t:"Lauryn Hill · The Miseducation of Lauryn Hill（1998）"}]},
{name:"进阶",items:[
{t:"Maxwell · Maxwell's Urban Hang Suite（1996）"},
{t:"Jill Scott · Who Is Jill Scott?（2000）"},
{a:"dangelo_voodoo",t:"D'Angelo · Voodoo（2000）"}]},
{name:"深入",items:[
{t:"The Roots · Things Fall Apart（1999）"},
{a:"common_like_water",t:"Common · Like Water for Chocolate（2000）"},
{t:"Erykah Badu · Mama's Gun（2000）"},
{a:"dangelo_black_messiah",t:"D'Angelo · Black Messiah（2014）"},
{a:"sza_ctrl",t:"SZA · Ctrl（2017，新灵魂的当代延续）"}]}]},

{no:7,title:"采样艺术与制作人 30 年",desc:"把旧唱片切成新节拍的艺术，从 Marley Marl 到 J Dilla、Kanye 与 Metro Boomin。",
stages:[
{name:"入门",items:[
{t:"DJ Shadow · Endtroducing.....（1996，全采样专辑）"},
{a:"dilla_donuts",t:"J Dilla · Donuts（2006）"},
{a:"kanye_college",t:"Kanye West · The College Dropout（2004）"}]},
{name:"进阶",items:[
{t:"DJ Premier / Gang Starr · Moment of Truth（1998）"},
{a:"madlib_shades",t:"Madlib · Shades of Blue（2003）"},
{a:"doom_madvillainy",t:"Madvillainy（2004，Madlib × MF DOOM）"}]},
{name:"深入",items:[
{t:"Marley Marl · 1980年代 Juice 制作（冷碎鼓采样）"},
{t:"Beastie Boys · Paul's Boutique（1989，Dust Brothers 拼贴）"},
{a:"kanye_mbdtf",t:"Kanye West · My Beautiful Dark Twisted Fantasy（2010）"},
{a:"pushat_daytona",t:"Pusha-T · DAYTONA（2018，Kanye 制作）"}]}]},

{no:8,title:"爵士支流：Hard Bop → Fusion → 当代复兴",desc:"爵士为整条根系提供和声与即兴，从 bebop 到融合爵士，再到2010年代的复兴。",
stages:[
{name:"入门",items:[
{t:"Miles Davis · Kind of Blue（1959，调式爵士）"},
{t:"John Coltrane · A Love Supreme（1964）"},
{t:"Dave Brubeck · Time Out（1959，奇数拍）"}]},
{name:"进阶",items:[
{t:"Charlie Parker & Dizzy Gillespie · 1940年代 bebop"},
{t:"Art Blakey / Horace Silver · 1950-60 hard bop"},
{t:"Bill Evans · Waltz for Debby（1961）"}]},
{name:"深入",items:[
{t:"Miles Davis · Bitches Brew（1970，融合爵士）"},
{t:"Herbie Hancock · Head Hunters（1973）"},
{a:"kamasi_epic",t:"Kamasi Washington · The Epic（2015）"},
{a:"glasper_black_radio",t:"Robert Glasper · Black Radio（2012）"},
{a:"badnotgood_ii",t:"BADBADNOTGOOD · BBNG II（2012）"}]}]},

{no:9,title:"英伦线：Soul II Soul → Trip-Hop → UK 爵士复兴",desc:"英国对黑人音乐的再诠释，从灵魂音响系统到神游舞曲，再到伦敦爵士与说唱复兴。",
stages:[
{name:"入门",items:[
{t:"Soul II Soul · Club Classics Vol. One（1989）"},
{t:"Massive Attack · Blue Lines（1991）"},
{t:"Portishead · Dummy（1994）"}]},
{name:"进阶",items:[
{t:"Tricky · Maxinquaye（1995）"},
{t:"Sade · Diamond Life（1984）"},
{t:"Amy Winehouse · Back to Black（2006）"}]},
{name:"深入",items:[
{t:"Nubya Garcia / Ezra Collective / Sons of Kemet · 2018前后伦敦爵士复兴"},
{a:"simz_sometimes",t:"Little Simz · Sometimes I Might Be Introvert（2021）"},
{a:"dave_psychodrama",t:"Dave · Psychodrama（2019）"},
{a:"badnotgood_ghost",t:"BADBADNOTGOOD（连接英/加/美的年轻爵士）"}]}]},

{no:10,title:"2010–2026：Alt-R&B / Trap / 全球南方",desc:"另类R&B、trap与drill的统治，以及 Afrobeats、Amapiano 等全球南方声音进入中心。",
stages:[
{name:"入门",items:[
{a:"weeknd_house",t:"The Weeknd · House of Balloons（2011）"},
{a:"frank_channel",t:"Frank Ocean · Channel Orange（2012）"},
{a:"sza_ctrl",t:"SZA · Ctrl（2017）"}]},
{name:"进阶",items:[
{a:"drake_take_care",t:"Drake · Take Care（2011）"},
{a:"beyonce_lemonade",t:"Beyoncé · Lemonade（2016）"},
{a:"rihanna_anti",t:"Rihanna · ANTI（2016）"},
{a:"travis_astroworld",t:"Travis Scott · Astroworld（2018）"}]},
{name:"深入",items:[
{a:"whole_lotta",t:"Playboi Carti · Whole Lotta Red（2020，rage）"},
{a:"pop_shoot_star",t:"Pop Smoke · Shoot for the Stars（2020，drill）"},
{a:"burna_african_giant",t:"Burna Boy · African Giant（2019）"},
{a:"wizkid_made",t:"Wizkid · Made in Lagos（2020）"},
{a:"beyonce_renaissance",t:"Beyoncé · Renaissance / Cowboy Carter（2022/2024）"}]}]}
];
})();
