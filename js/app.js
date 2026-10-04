/* ============================================================
   黑色流行音乐发展地图 · 前端应用（无框架 / 离线可用）
   ============================================================ */
(function(){
var BM = window.BM;
if(!BM || !BM.artists){
  var _main = document.getElementById("main");
  if(_main) _main.innerHTML =
    '<div class="panel" style="text-align:center;padding:64px 24px">'+
    '<h2>数据文件缺失</h2>'+
    '<p class="lead" style="margin:10px 0 0">未找到 js/data/ 目录下的数据文件，页面无法渲染内容。<br>请恢复 js/data/ 目录（18 个数据批次文件）后刷新页面。</p></div>';
  return;
}
var A = BM.artists, AL = BM.albums, T = BM.tracks;
var $ = function(id){ return document.getElementById(id); };
var esc = function(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };

/* ---------- 流派样式 / 年代 ---------- */
function genreClass(g){
  g = g||"";
  if(/gospel/i.test(g)) return "fn-gospel";
  if(/jazz|bop|fusion|bebop|swing/i.test(g)) return "fn-jazz";
  if(/neo|alt-r&b|alt r&b/i.test(g)) return "fn-neosoul";
  if(/funk|g-funk|p-funk/i.test(g)) return "fn-funk";
  if(/hip|rap|trap|drill|boom|rage|cloud|conscious|grime/i.test(g)) return "fn-hiphop";
  if(/soul|disco|doo-wop|blues/i.test(g)) return "fn-soul";
  return "fn-rnb";
}
function primaryClass(arr){ return genreClass((arr&&arr[0])||""); }
function decadeOf(y){
  if(!y) return "?";
  var d = Math.floor(y/10)*10;
  return d+"s";
}
function genreTags(arr){
  return (arr||[]).map(function(g){return '<span class="tag '+genreClass(g)+'">'+esc(g)+"</span>";}).join("");
}
function artistName(id){ return A[id]? A[id].name : id; }
function albumName(id){ return AL[id]? AL[id].title : id; }

/* ---------- 本地图片（covers/ photos/ + image-manifest.js） ---------- */
var IMG = window.BM_IMG || {covers:{},photos:{}};
function coverArt(id, cls){
  return '<span class="'+cls+'"><img src="covers/'+id+'.jpg" alt="" loading="lazy" onerror="this.remove()"></span>';
}
function photoArt(id, cls){
  return '<span class="'+cls+'"><img src="photos/'+id+'.jpg" alt="" loading="lazy" onerror="this.remove()"></span>';
}

/* ---------- 播放跳转（网易云 / Apple Music） ---------- */
function playBtns(title, artist){
  var q = encodeURIComponent(title);
  var at = esc(artist||"");
  return '<span class="play-btns">'+
    '<button class="play-btn ne" data-play="ne" data-q="'+q+'" data-artist="'+at+'" title="在网易云播放">▶ 网易云</button>'+
    '<button class="play-btn am" data-play="am" data-q="'+q+'" data-artist="'+at+'" title="在 Apple Music 播放"> Apple Music</button>'+
    '</span>';
}
function resolvePlay(kind, btn){
  var q = btn.getAttribute("data-q"), artist = btn.getAttribute("data-artist")||"";
  var done = false;
  function go(url){ if(done) return; done = true; window.open(url, "_blank"); }
  if(kind === "am"){
    fetch("https://itunes.apple.com/search?term="+q+"&entity=song&limit=8&country=US")
      .then(function(r){ return r.json(); })
      .then(function(j){
        var rs=(j&&j.results)||[], pick=null, al=artist.toLowerCase();
        for(var i=0;i<rs.length;i++){ var n=(rs[i].artistName||"").toLowerCase();
          if(al && n && (n.indexOf(al)>=0 || al.indexOf(n)>=0)){ pick=rs[i]; break; } }
        if(!pick && rs.length) pick=rs[0];
        go(pick ? pick.trackViewUrl : ("https://music.apple.com/us/search?term="+q));
      }).catch(function(){ go("https://music.apple.com/us/search?term="+q); });
    setTimeout(function(){ go("https://music.apple.com/us/search?term="+q); }, 5000);
  } else {
    var cbn = "__neCb" + Date.now();
    var timer = setTimeout(function(){ go("https://music.163.com/#/search/m/?s="+q); }, 5000);
    window[cbn] = function(j){
      clearTimeout(timer);
      try{
        var songs = (j && j.result && j.result.songs) || [], best=null, al=artist.toLowerCase();
        for(var i=0;i<songs.length;i++){ var n=(songs[i].artists&&songs[i].artists[0]?songs[i].artists[0].name:"").toLowerCase();
          if(al && n && (n.indexOf(al)>=0 || al.indexOf(n)>=0)){ best=songs[i]; break; } }
        if(!best && songs.length) best = songs[0];
        go(best ? ("https://music.163.com/song?id="+best.id) : ("https://music.163.com/#/search/m/?s="+q));
      }catch(e){ go("https://music.163.com/#/search/m/?s="+q); }
      delete window[cbn];
      var sc = document.getElementById("sc_"+cbn); if(sc) sc.remove();
    };
    var sc = document.createElement("script");
    sc.id = "sc_"+cbn;
    sc.src = "https://music.163.com/api/search/get/web?s="+q+"&type=1&limit=8&callback="+cbn;
    sc.onerror = function(){ clearTimeout(timer); go("https://music.163.com/#/search/m/?s="+q); delete window[cbn]; };
    document.body.appendChild(sc);
  }
}

/* ---------- Tab 切换 ---------- */
var tabs = $("tabs");
tabs.addEventListener("click", function(e){
  var b = e.target.closest("button[data-view]");
  if(!b) return;
  var v = b.getAttribute("data-view");
  tabs.querySelectorAll("button").forEach(function(x){x.classList.remove("active");});
  b.classList.add("active");
  document.querySelectorAll(".view").forEach(function(x){x.classList.remove("active");});
  $("view-"+v).classList.add("active");
  if(v==="graph") ensureGraph();
  // 移动端：分段导航横向滚动后，把当前项带回可视区
  if(window.matchMedia("(max-width:820px)").matches && b.scrollIntoView){
    b.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
  }
});

/* ---------- 滚动微交互：滚动后加深顶栏投影 ---------- */
var scroller = document.querySelector(".content"), appEl = document.querySelector(".app");
function onScroll(){
  var y = Math.max(scroller ? scroller.scrollTop : 0, window.pageYOffset || 0);
  if(appEl) appEl.classList.toggle("scrolled", y > 8);
}
if(scroller) scroller.addEventListener("scroll", onScroll, {passive:true});
window.addEventListener("scroll", onScroll, {passive:true});

/* ---------- Modal ---------- */
var modal = $("modal"), modalBox = $("modalBox");
function closeModal(){ modal.classList.remove("open"); }
modal.addEventListener("click", function(e){ if(e.target===modal) closeModal(); });
document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeModal(); });
function showModal(html){ modalBox.innerHTML = '<div class="sheet-grab" aria-hidden="true"></div>'+html; modal.classList.add("open"); modalBox.scrollTop=0; }

function albumRecChips(recs){
  return (recs||[]).map(function(r){
    if(AL[r]) return '<button class="rec-chip" data-album="'+r+'">▶ '+esc(AL[r].title)+' · '+esc(artistName(AL[r].artist))+'</button>';
    return "";
  }).join("");
}
function artistLinks(ids){
  return (ids||[]).map(function(i){
    if(A[i]) return '<button class="link-chip" data-artist="'+i+'">'+esc(A[i].name)+"</button>";
    return "";
  }).join("") || '<span class="muted">—</span>';
}

function openArtist(id){
  var a = A[id]; if(!a) return;
  // 影响了谁
  var influenced = Object.keys(A).filter(function(k){return (A[k].influences||[]).indexOf(id)>=0;});
  var albums = (a.keyAlbums||[]).filter(function(x){return AL[x];});
  showModal(
    '<button class="modal-close" data-close>×</button>'+
    '<div class="m-head">'+photoArt(id,'avatar-lg')+'<div class="m-head-t"><h3>'+esc(a.name)+'</h3>'+
      '<div class="m-meta">'+(a.birth?a.birth+"":(a.formed?("成立 "+a.formed):""))+(a.death?(" – "+a.death):"")+' · '+esc(a.origin||"")+'</div>'+
      '<div class="tags">'+genreTags(a.genres)+'</div></div></div>'+
    '<p class="m-desc">'+esc(a.desc)+"</p>"+
    '<div class="m-sec"><h4>受谁影响</h4><div class="chips">'+artistLinks(a.influences)+"</div></div>"+
    '<div class="m-sec"><h4>影响了（库内）</h4><div class="chips">'+(influenced.map(function(i){return '<button class="link-chip" data-artist="'+i+'">'+esc(A[i].name)+"</button>";}).join("")||'<span class="muted">—</span>')+"</div></div>"+
    '<div class="m-sec"><h4>关键专辑（点击看分析）</h4><div class="chips">'+
      albums.map(function(x){return '<button class="rec-chip" data-album="'+x+'">'+esc(AL[x].title)+" ("+AL[x].year+")</button>";}).join("")+"</div></div>"
  );
}
function openAlbum(id){
  var al = AL[id]; if(!al) return;
  var trs = (al.tracks||[]).filter(function(x){return T[x];});
  showModal(
    '<button class="modal-close" data-close>×</button>'+
    '<div class="m-head">'+coverArt(id,'cover-lg')+'<div class="m-head-t"><h3>'+esc(al.title)+'</h3>'+
      '<div class="m-meta"><button class="link-chip" data-artist="'+al.artist+'">'+esc(artistName(al.artist))+'</button> · '+al.year+' · '+esc(al.label||"")+' · '+esc(al.type)+(al.essential?' · ★ 里程碑':"")+'</div>'+
      '<div class="tags">'+genreTags(al.genres)+'</div></div></div>'+
    '<div class="m-playrow"><span class="muted">播放这张专辑：</span>'+playBtns(al.title, artistName(al.artist))+"</div>"+
    '<p class="m-analysis">'+esc(al.analysis)+"</p>"+
    (al.tech?'<div class="m-sec"><h4>制作 / 录音工艺</h4><p class="tech-line">'+esc(al.tech)+"</p></div>":"")+
    (al.producers&&al.producers.length?'<div class="m-sec"><h4>制作人</h4><p class="muted">'+esc(al.producers.join(" / "))+"</p></div>":"")+
    '<div class="m-sec"><h4>如果喜欢这张，应该听</h4><div class="chips">'+(albumRecChips(al.recs)||'<span class="muted">—</span>')+"</div></div>"+
    '<div class="m-sec"><h4>曲目（'+trs.length+'）</h4><ol class="track-ol">'+
      trs.map(function(x){return '<li class="m-track"><span class="m-track-t">'+esc(T[x].title)+'</span>'+playBtns(T[x].title, T[x].artist?artistName(T[x].artist):artistName(al.artist))+"</li>";}).join("")+"</ol></div>"
  );
}
document.addEventListener("click", function(e){
  var pb = e.target.closest("[data-play]");
  if(pb){ e.preventDefault(); e.stopPropagation(); resolvePlay(pb.getAttribute("data-play"), pb); return; }
  var c = e.target.closest("[data-close]"); if(c){closeModal();return;}
  var ar = e.target.closest("[data-artist]"); if(ar){openArtist(ar.getAttribute("data-artist"));return;}
  var ab = e.target.closest("[data-album]"); if(ab){openAlbum(ab.getAttribute("data-album"));return;}
});

/* ---------- 统计条 ---------- */
function renderStats(){
  var html = '<span><b>'+Object.keys(A).length+'</b> 位音乐人</span>'+
             '<span><b>'+Object.keys(AL).length+'</b> 张专辑（含分析）</span>'+
             '<span><b>'+Object.keys(T).length+'</b> 首关键作品</span>'+
             '<span class="ss-note">每张专辑 100–300 字原创分析 · 离线可交互</span>';
  $("statsBar").innerHTML = html;
  $("footStats").textContent = Object.keys(A).length+" 音乐人 / "+Object.keys(AL).length+" 专辑 / "+Object.keys(T).length+" 曲目";
}

/* ---------- 总览 ---------- */
var FLOW = [
  {k:"Gospel",cls:"fn-gospel",t:"福音",d:"教会的呼喊、呼应（call-and-response）、装饰音与情感宣泄；Hammond B3 与合唱。",who:["Thomas A. Dorsey","Mahalia Jackson","James Cleveland"]},
  {k:"Soul",cls:"fn-soul",t:"灵魂乐",d:"福音唱法进入世俗酒馆与录音棚，谈世俗之爱、尊严与时代；节奏组与贝斯线工艺。",who:["Sam Cooke","Aretha Franklin","Otis Redding","Marvin Gaye"]},
  {k:"Funk",cls:"fn-funk",t:"放克",d:"节奏重心前移、切分加剧、围绕一条 groove 即兴；Clavinet、合成器、breakbeat。",who:["James Brown","Sly Stone","Parliament-Funkadelic"]},
  {k:"Hip-Hop",cls:"fn-hiphop",t:"嘻哈",d:"DJ 循环放克鼓间奏、MC 接管、采样拼贴；从 block party 到全球主导。",who:["Kool Herc","Grandmaster Flash","Public Enemy","Nas"]},
  {k:"Neo-Soul",cls:"fn-neosoul",t:"新灵魂",d:"嘻哈世代用说唱节拍与现场乐队重组1970灵魂与爵士，延伸到 Alt-R&B。",who:["D'Angelo","Erykah Badu","Lauryn Hill","SZA"]}
];
function renderFlow(){
  $("flowChain").innerHTML = FLOW.map(function(f,i){
    return '<div class="flow-node '+f.cls+'"><h3>'+f.t+'</h3><p>'+f.d+'</p><div class="flow-who">'+
      f.who.map(function(w){return "<span>"+esc(w)+"</span>";}).join('<span class="fd-sep">、</span>')+"</div></div>"+
      (i<FLOW.length-1?'<div class="flow-arrow">→</div>':"");
  }).join("");
}
function tally(){
  var eras={},genres={},regions={};
  Object.keys(A).forEach(function(id){
    var a=A[id];
    var d = decadeOf((a.keyAlbums||[]).map(function(x){return AL[x]?AL[x].year:null;}).find(Boolean)) || (a.era||"").split(/[-–]/)[0];
    if(d&&d!=="?") eras[d]=(eras[d]||0)+1;
    (a.genres||[]).forEach(function(g){genres[g]=(genres[g]||0)+1;});
    if(a.region) regions[a.region]=(regions[a.region]||0)+1;
  });
  return {eras:eras,genres:genres,regions:regions};
}
var TL = tally();
function goArtists(f){
  tabs.querySelector('[data-view="artists"]').click();
  if(f.genre){ $("artistGenre").value=f.genre; }
  if(f.region){ $("artistRegion").value=f.region; }
  if(f.era){ $("artistEra").value=f.era; }
  if(f.q){ $("artistSearch").value=f.q; }
  renderArtists();
}
function renderOverviewGrids(){
  var eraOrder=["1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s","2020s"];
  $("eraGrid").innerHTML = eraOrder.filter(function(e){return TL.eras[e];}).map(function(e){
    return '<button class="stat-card" data-era="'+e+'"><b>'+e+'</b><span>'+TL.eras[e]+' 位音乐人</span></button>';
  }).join("");
  var gs = Object.keys(TL.genres).sort(function(a,b){return TL.genres[b]-TL.genres[a];}).slice(0,24);
  $("genreGrid").innerHTML = gs.map(function(g){
    return '<button class="stat-card '+genreClass(g)+'" data-genre="'+esc(g)+'"><b>'+esc(g)+'</b><span>'+TL.genres[g]+' 位</span></button>';
  }).join("");
  var rs = Object.keys(TL.regions).sort(function(a,b){return TL.regions[b]-TL.regions[a];});
  $("regionGrid").innerHTML = rs.map(function(r){
    return '<button class="stat-card" data-region="'+esc(r)+'"><b>'+esc(r)+'</b><span>'+TL.regions[r]+' 位</span></button>';
  }).join("");
  [["eraGrid","era"],["genreGrid","genre"],["regionGrid","region"]].forEach(function(pair){
    $(pair[0]).addEventListener("click",function(e){
      var c=e.target.closest("[data-"+pair[1]+"]"); if(!c)return;
      goArtists((function(o){o[pair[1]]=c.getAttribute("data-"+pair[1]);return o;})({}));
    });
  });
}

/* ---------- 下拉选项 ---------- */
var eraOrder=["1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s","2020s"];
function fillSelect(sel, vals, label){
  var html='<option value="">'+label+'</option>'+vals.map(function(v){return '<option value="'+esc(v)+'">'+esc(v)+"</option>";}).join("");
  sel.innerHTML=html;
}
function allGenres(){
  var s={}; Object.keys(A).forEach(function(id){(A[id].genres||[]).forEach(function(g){s[g]=1;});});
  return Object.keys(s).sort();
}
function allRegions(){
  var s={}; Object.keys(A).forEach(function(id){if(A[id].region)s[A[id].region]=1;});
  return Object.keys(s).sort();
}
function initFilters(){
  fillSelect($("artistEra"),eraOrder,"全部年代");
  fillSelect($("artistGenre"),allGenres(),"全部流派");
  fillSelect($("artistRegion"),allRegions(),"全部地区");
  fillSelect($("albumEra"),eraOrder,"全部年代");
  fillSelect($("albumGenre"),allGenres(),"全部流派");
  fillSelect($("trackEra"),eraOrder,"全部年代");
  fillSelect($("trackGenre"),allGenres(),"全部流派");
}

/* ---------- 音乐人列表 ---------- */
function artistCard(id){
  var a=A[id];
  return '<article class="card '+primaryClass(a.genres)+'" data-artist="'+id+'">'+
    '<div class="card-head">'+photoArt(id,'avatar')+
      '<div class="card-head-t"><h3>'+esc(a.name)+'</h3>'+
      '<div class="card-meta">'+esc(a.era||"")+(a.region?" · "+esc(a.region):"")+"</div></div></div>"+
    '<div class="tags">'+genreTags(a.genres)+"</div>"+
    '<p>'+esc(a.desc)+"</p>"+
    '<div class="card-foot"><span class="muted">代表作：</span>'+
      (a.keyAlbums||[]).slice(0,3).map(function(x){return AL[x]?'<button class="mini-rec" data-album="'+x+'">'+esc(AL[x].title)+"</button>":"";}).join("")+
    "</div></article>";
}
function renderArtists(){
  var q=$("artistSearch").value.trim().toLowerCase();
  var era=$("artistEra").value, g=$("artistGenre").value, r=$("artistRegion").value;
  var ids=Object.keys(A).filter(function(id){
    var a=A[id];
    if(q && a.name.toLowerCase().indexOf(q)<0 && (a.desc||"").toLowerCase().indexOf(q)<0) return false;
    if(era && (a.era||"").indexOf(era)<0) return false;
    if(g && (a.genres||[]).indexOf(g)<0) return false;
    if(r && a.region!==r) return false;
    return true;
  });
  ids.sort(function(x,y){return A[x].name.localeCompare(A[y].name);});
  $("artistList").innerHTML = ids.map(artistCard).join("") || '<p class="empty">没有符合条件的音乐人。</p>';
  $("artistCount").textContent = ids.length+" 位";
}
function bindArtistFilters(){
  ["artistSearch","artistEra","artistGenre","artistRegion"].forEach(function(k){
    $(k).addEventListener("input",renderArtists);
    $(k).addEventListener("change",renderArtists);
  });
}

/* ---------- 专辑列表 ---------- */
function albumRow(id){
  var al=AL[id];
  return '<article class="album-row'+(al.essential?" essential":"")+' '+primaryClass(al.genres)+'" data-album="'+id+'">'+
    coverArt(id,'cover')+
    '<div class="album-main"><h3>'+esc(al.title)+(al.essential?' <span class="estar">★</span>':"")+"</h3>"+
    '<div class="card-meta"><button class="mini-art" data-artist="'+al.artist+'">'+esc(artistName(al.artist))+'</button> · '+al.year+' · '+esc(al.label||"")+"</div>"+
    '<div class="tags">'+genreTags(al.genres)+"</div>"+
    '<p class="analysis">'+esc(al.analysis)+"</p>"+
    (al.tech?'<p class="tech-line">🛠 '+esc(al.tech)+"</p>":"")+
    '<div class="rec-row"><span class="muted">喜欢这张听：</span>'+(albumRecChips(al.recs)||"—")+"</div>"+
    '<div class="tr-row muted">曲目 '+((al.tracks||[]).filter(function(x){return T[x];}).length)+' 首 · 点击查看完整曲目</div>'+
    "</div></article>";
}
function renderAlbums(){
  var q=$("albumSearch").value.trim().toLowerCase();
  var era=$("albumEra").value,g=$("albumGenre").value,rate=$("albumRating").value;
  var ids=Object.keys(AL).filter(function(id){
    var al=AL[id];
    if(q && al.title.toLowerCase().indexOf(q)<0 && artistName(al.artist).toLowerCase().indexOf(q)<0) return false;
    if(era && decadeOf(al.year)!==era) return false;
    if(g && (al.genres||[]).indexOf(g)<0) return false;
    if(rate==="essential" && !al.essential) return false;
    return true;
  });
  ids.sort(function(x,y){return AL[y].year-AL[x].year;});
  $("albumList").innerHTML=ids.map(albumRow).join("")||'<p class="empty">没有符合条件的专辑。</p>';
  $("albumCount").textContent=ids.length+" 张";
}
function bindAlbumFilters(){
  ["albumSearch","albumEra","albumGenre","albumRating"].forEach(function(k){
    $(k).addEventListener("input",renderAlbums); $(k).addEventListener("change",renderAlbums);
  });
}

/* ---------- 曲目列表 ---------- */
function trackRow(id){
  var t=T[id];
  return '<article class="track-row '+primaryClass(t.genres)+'">'+
    '<div class="tr-main">'+
    (t.album&&IMG.covers[t.album]?coverArt(t.album,'cover-xs'):"")+
    '<div class="tr-body"><h4>'+esc(t.title)+"</h4>"+
    '<div class="card-meta"><button class="mini-art" data-artist="'+t.artist+'">'+esc(artistName(t.artist))+'</button>'+
      (t.album&&AL[t.album]?' · <button class="mini-rec" data-album="'+t.album+'">'+esc(AL[t.album].title)+"</button>":"")+' · '+t.year+"</div>"+
    '<div class="tags">'+genreTags(t.genres)+"</div>"+
    '<p class="tr-note">'+esc(t.note)+'</p>'+
    '<div class="play-btns">'+playBtns(t.title, artistName(t.artist))+"</div></div></div></article>";
}
function renderTracks(){
  var q=$("trackSearch").value.trim().toLowerCase();
  var era=$("trackEra").value,g=$("trackGenre").value,sampled=$("trackSampled").checked;
  var ids=Object.keys(T).filter(function(id){
    var t=T[id];
    if(q && t.title.toLowerCase().indexOf(q)<0 && artistName(t.artist).toLowerCase().indexOf(q)<0) return false;
    if(era && decadeOf(t.year)!==era) return false;
    if(g && (t.genres||[]).indexOf(g)<0) return false;
    if(sampled && !/采样|break|源头|金曲|蓝本|被/.test(t.note||"")) return false;
    return true;
  });
  ids.sort(function(x,y){return T[y].year-T[x].year;});
  var out=ids;
  if(out.length>400) out=out.slice(0,400); // 首屏性能
  $("trackList").innerHTML=out.map(trackRow).join("")||'<p class="empty">没有符合条件的作品。</p>';
  $("trackCount").textContent=ids.length+(ids.length>400?"（显示前400）":"")+" 首";
}
function bindTrackFilters(){
  ["trackSearch","trackEra","trackGenre","trackSampled"].forEach(function(k){
    $(k).addEventListener("input",renderTracks); $(k).addEventListener("change",renderTracks);
  });
}

/* ---------- 听歌路线 ---------- */
function renderRoutes(){
  $("routeList").innerHTML = (window.BM.routes||[]).map(function(r){
    return '<article class="route-card"><h3><span class="route-no">'+r.no+'</span> '+esc(r.title)+"</h3>"+
      '<p class="route-desc">'+esc(r.desc)+"</p>"+
      r.stages.map(function(st){
        return '<div class="route-stage"><h4 class="stage-name">'+esc(st.name)+"</h4><ol>"+
          st.items.map(function(it){
            if(it.a && AL[it.a]) return '<li><button class="route-item" data-album="'+it.a+'">'+esc(it.t||albumName(it.a))+"</button></li>";
            return "<li><span class='route-text'>"+esc(it.t)+"</span></li>";
          }).join("")+"</ol></div>";
      }).join("")+"</article>";
  }).join("");
}

/* ---------- 技术时间线 ---------- */
function renderTech(){
  var list=(window.BM.tech||[]).slice().sort(function(a,b){return a.year-b.year;});
  $("techTimeline").innerHTML='<div class="tl-line"></div>'+list.map(function(x){
    return '<div class="tl-item"><div class="tl-dot"></div>'+
      '<div class="tl-body"><div class="tl-head"><span class="tl-year">'+x.year+'</span><span class="tag '+genreClass(x.cat)+'">'+esc(x.cat)+"</span><b>"+esc(x.title)+"</b></div>"+
      '<p>'+esc(x.desc)+"</p></div></div>";
  }).join("");
}

/* ---------- 影响图谱（自实现力导向） ---------- */
var svg = $("graphSvg"), SVGNS="http://www.w3.org/2000/svg";
var graphState={nodes:{},edges:[],built:false};
function coreSet(){
  var ids={};
  Object.keys(AL).forEach(function(id){ if(AL[id].essential) ids[AL[id].artist]=1; });
  // 限制规模
  var arr=Object.keys(ids);
  if(arr.length>110){ arr=arr.slice(0,110); ids={}; arr.forEach(function(x){ids[x]=1;}); }
  return ids;
}
function buildSubgraph(focusId){
  var nodes={}, edges=[];
  function add(id){ if(A[id]) nodes[id]={id:id}; }
  if(focusId){
    add(focusId);
    (A[focusId].influences||[]).forEach(add);
    Object.keys(A).forEach(function(k){
      if((A[k].influences||[]).indexOf(focusId)>=0) add(k);
    });
  } else {
    var cs=coreSet(); Object.keys(cs).forEach(add);
  }
  var ids=Object.keys(nodes);
  ids.forEach(function(id){
    (A[id].influences||[]).forEach(function(inf){
      if(nodes[inf]) edges.push({s:inf,t:id});
    });
  });
  // 圆形初始化
  var W=1000,H=640,cx=W/2,cy=H/2,R=Math.min(W,H)*0.42;
  ids.forEach(function(id,i){
    var ang=(i/ids.length)*Math.PI*2;
    nodes[id].x=cx+R*Math.cos(ang); nodes[id].y=cy+R*Math.sin(ang);
    nodes[id].vx=0; nodes[id].vy=0;
  });
  graphState.nodes=nodes; graphState.edges=edges; graphState.focus=focusId;
  simulate();
  renderGraph();
  renderGraphSide(focusId);
}
function simulate(){
  var nodes=graphState.nodes, ids=Object.keys(nodes), edges=graphState.edges;
  var W=1000,H=640,cx=W/2,cy=H/2;
  for(var it=0;it<260;it++){
    for(var i=0;i<ids.length;i++){
      for(var j=i+1;j<ids.length;j++){
        var a=nodes[ids[i]],b=nodes[ids[j]];
        var dx=a.x-b.x,dy=a.y-b.y; var d2=dx*dx+dy*dy+0.01; var d=Math.sqrt(d2);
        var f=2600/d2;
        a.vx+=f*dx/d; a.vy+=f*dy/d;
        b.vx-=f*dx/d; b.vy-=f*dy/d;
      }
    }
    edges.forEach(function(e){
      var a=nodes[e.s],b=nodes[e.t];
      var dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+0.01, target=120,k=0.02;
      var f=(d-target)*k;
      a.vx+=f*dx/d; a.vy+=f*dy/d;
      b.vx-=f*dx/d; b.vy-=f*dy/d;
    });
    ids.forEach(function(id){
      var n=nodes[id];
      n.vx+=(cx-n.x)*0.006; n.vy+=(cy-n.y)*0.006; // 向心
      n.vx*=0.85; n.vy*=0.85;
      n.x+=n.vx; n.y+=n.vy;
      n.x=Math.max(30,Math.min(W-30,n.x)); n.y=Math.max(30,Math.min(H-30,n.y));
    });
  }
}
function renderGraph(){
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var defs=document.createElementNS(SVGNS,"defs");
  defs.innerHTML='<marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c98f3a"/></marker>';
  svg.appendChild(defs);
  var gE=document.createElementNS(SVGNS,"g");
  graphState.edges.forEach(function(e){
    var a=graphState.nodes[e.s],b=graphState.nodes[e.t];
    var ln=document.createElementNS(SVGNS,"line");
    ln.setAttribute("x1",a.x);ln.setAttribute("y1",a.y);ln.setAttribute("x2",b.x);ln.setAttribute("y2",b.y);
    ln.setAttribute("class","g-edge"); ln.setAttribute("marker-end","url(#arrow)");
    gE.appendChild(ln);
  });
  svg.appendChild(gE);
  var gN=document.createElementNS(SVGNS,"g");
  Object.keys(graphState.nodes).forEach(function(id){
    var n=graphState.nodes[id], a=A[id];
    var g=document.createElementNS(SVGNS,"g");
    g.setAttribute("class","g-node"+(id===graphState.focus?" focus":""));
    g.setAttribute("transform","translate("+n.x+","+n.y+")");
    var c=document.createElementNS(SVGNS,"circle");
    c.setAttribute("r", id===graphState.focus?11:7);
    c.setAttribute("class",primaryClass(a.genres));
    g.appendChild(c);
    var tx=document.createElementNS(SVGNS,"text");
    tx.setAttribute("x",10);tx.setAttribute("y",4);tx.setAttribute("class","g-label");
    tx.textContent=a.name.length>16?a.name.slice(0,15)+"…":a.name;
    g.appendChild(tx);
    g.addEventListener("click",function(){buildSubgraph(id);});
    gN.appendChild(g);
  });
  svg.appendChild(gN);
}
function renderGraphSide(focusId){
  if(!focusId){ $("graphSide").innerHTML='<h4>核心网络</h4><p class="muted">显示里程碑艺人之间的影响关系。点击任意节点可聚焦其个人网络。</p>'; return; }
  var a=A[focusId];
  var inf=(a.influences||[]).filter(function(x){return A[x];});
  var influenced=Object.keys(A).filter(function(k){return (A[k].influences||[]).indexOf(focusId)>=0;});
  function btns(arr){return arr.map(function(i){return '<button class="link-chip" data-goto="'+i+'">'+esc(A[i].name)+"</button>";}).join("")||'<span class="muted">—</span>';}
  $("graphSide").innerHTML=
    '<h4>'+esc(a.name)+"</h4>"+
    '<div class="tags">'+genreTags(a.genres)+"</div>"+
    '<p class="muted">'+esc(a.era||"")+"</p>"+
    '<div class="m-sec"><h5>受影响于</h5><div class="chips">'+btns(inf)+"</div></div>"+
    '<div class="m-sec"><h5>影响了</h5><div class="chips">'+btns(influenced)+"</div></div>"+
    '<button class="btn" id="graphOpenArtist">查看完整资料</button>';
  $("graphOpenArtist").onclick=function(){openArtist(focusId);};
  $("graphSide").querySelectorAll("[data-goto]").forEach(function(b){
    b.onclick=function(){buildSubgraph(b.getAttribute("data-goto"));};
  });
}
function ensureGraph(){ if(!graphState.built){ graphState.built=true; buildSubgraph(null);} }
function initGraphControls(){
  var dl=$("graphDatalist");
  dl.innerHTML=Object.keys(A).map(function(id){return '<option value="'+esc(A[id].name)+'">';}).join("");
  $("graphReset").onclick=function(){ $("graphSearch").value=""; buildSubgraph(null); };
  $("graphSearch").addEventListener("change",function(){
    var v=this.value.trim();
    var hit=Object.keys(A).find(function(id){return A[id].name===v;});
    if(hit){ graphState.built=true; buildSubgraph(hit);}
  });
  $("graphSearch").addEventListener("keydown",function(e){
    if(e.key==="Enter"){ this.dispatchEvent(new Event("change")); }
  });
}

/* ---------- 数据库结构 ---------- */
function renderSchema(){
$("schemaContent").innerHTML =
'<p class="lead">本站即按下列关系模型组织：以 <b>artists（音乐人）</b>、<b>albums（专辑）</b>、<b>tracks（曲目）</b> 三张主表为核心，通过外键与独立关系表，沿「年代 / 流派 / 地区 / 影响关系」四个维度建立索引。下方为可直接落库（SQL）的逻辑结构。</p>'+
'<pre class="schema-pre">'+esc(
'-- ① 音乐人\n'+
'CREATE TABLE artists (\n  id          TEXT PRIMARY KEY,      -- 如 kendrick\n  name        TEXT NOT NULL,\n  type        TEXT CHECK(type IN (\'person\',\'group\',\'production\',\'session\')),\n  birth       INT, death INT, formed INT,\n  origin      TEXT,                  -- 城市\n  region      TEXT,                  -- 地区索引：纽约/亚特兰大/洛杉矶/南部/英国/非洲…\n  era         TEXT,                  -- 年代索引：如 2010s-2020s\n  description TEXT\n);\n\n'+
'-- ② 专辑\n'+
'CREATE TABLE albums (\n  id        TEXT PRIMARY KEY,        -- 如 kendrick_pimp\n  artist_id TEXT REFERENCES artists(id),\n  title     TEXT NOT NULL,\n  year      INT,                     -- 年代索引\n  label     TEXT,\n  type      TEXT CHECK(type IN (\'studio\',\'live\',\'compilation\',\'soundtrack\',\'mixtape\')),\n  essential BOOLEAN DEFAULT FALSE,\n  producers TEXT,                    -- 制作人（可另建 producers 表，多对多）\n  analysis  TEXT,                    -- 100–300 字乐评\n  tech      TEXT                     -- 制作/录音工艺要点\n);\n\n'+
'-- ③ 曲目\n'+
'CREATE TABLE tracks (\n  id        TEXT PRIMARY KEY,\n  title     TEXT NOT NULL,\n  artist_id TEXT REFERENCES artists(id),\n  album_id  TEXT REFERENCES albums(id),\n  year      INT\n);\n\n'+
'-- ④ 影响关系（核心：有向图，方向 影响者 → 被影响者）\n'+
'CREATE TABLE artist_influences (\n  influencer_id TEXT REFERENCES artists(id),\n  influenced_id TEXT REFERENCES artists(id),\n  PRIMARY KEY (influencer_id, influenced_id)\n);\n\n'+
'-- ⑤ “喜欢 A 听 B” 专辑推荐（有向/可双向）\n'+
'CREATE TABLE album_recommendations (\n  album_id      TEXT REFERENCES albums(id),\n  recommends_id TEXT REFERENCES albums(id),\n  PRIMARY KEY (album_id, recommends_id)\n);\n\n'+
'-- ⑥ 采样关系（曲目 → 被采样曲目，含时间点/乐器）\n'+
'CREATE TABLE samples (\n  source_track_id TEXT REFERENCES tracks(id),  -- 被采样的旧作\n  new_track_id    TEXT REFERENCES tracks(id),  -- 新作品\n  element         TEXT,                        -- drum loop / bassline / vocal / hook\n  timecode        TEXT\n);\n\n'+
'-- ⑦ 流派（多对多，含主/次标记）\n'+
'CREATE TABLE artist_genres (\n  artist_id TEXT REFERENCES artists(id),\n  genre     TEXT,                              -- Gospel/Soul/Funk/Hip-Hop/Jazz/Neo-Soul…\n  primary   BOOLEAN DEFAULT FALSE\n);\n\n'+
'-- ⑧ 地区表（层级：城市 → 区域 → 国家/洲）\n'+
'CREATE TABLE regions (\n  city TEXT, region TEXT, country TEXT, continent TEXT\n);')+
'</pre>'+
'<h3>索引与组织方式</h3>'+
'<ul class="schema-list">'+
'<li><b>按年代</b>：artists.era、albums.year、tracks.year 建索引 → 支持 1940s…2020s 时间线与技术演进视图。</li>'+
'<li><b>按流派</b>：artist_genres / albums.genres 建索引，流派字段映射到统一配色（Gospel/Jazz/Soul/Funk/Hip-Hop/Neo-Soul/R&B）。</li>'+
'<li><b>按地区</b>：regions 层级表 + artists.region 索引 → 纽约、亚特兰大、洛杉矶、南部、英国、非洲、加勒比等场景。</li>'+
'<li><b>按影响关系</b>：artist_influences（有向图）驱动“影响图谱”；album_recommendations 驱动“喜欢 A 听 B”；samples 驱动采样溯源。</li>'+
'<li><b>听歌路线</b>：routes(stages) 表按 入门/进阶/深入 三阶段，外键引用 albums，可独立扩展为播放清单。</li>'+
'</ul>'+
'<h3>当前库内统计</h3><div id="schemaCounts" class="schema-counts"></div>';
  $("schemaCounts").innerHTML=
    '<span class="stat-card"><b>'+Object.keys(A).length+'</b><span>artists</span></span>'+
    '<span class="stat-card"><b>'+Object.keys(AL).length+'</b><span>albums（含分析）</span></span>'+
    '<span class="stat-card"><b>'+Object.keys(T).length+'</b><span>tracks</span></span>'+
    '<span class="stat-card"><b>'+(window.BM.routes||[]).length+'</b><span>听歌路线</span></span>'+
    '<span class="stat-card"><b>'+(window.BM.tech||[]).length+'</b><span>技术节点</span></span>';
}

/* ---------- 启动 ---------- */
function init(){
  renderStats();
  renderFlow();
  renderOverviewGrids();
  initFilters();
  bindArtistFilters(); renderArtists();
  bindAlbumFilters(); renderAlbums();
  bindTrackFilters(); renderTracks();
  renderRoutes();
  renderTech();
  renderSchema();
  initGraphControls();
}
init();
})();
