const partnerControllerRows = [
  {
    t:"Petite Mort", sub:"Little Death", y:"2014", f:"short", m:"Short film · Germany / Austria", c:["partner-control"], pcg:"unresolved", mec:"No hypnosis plot verified", flag:"Excluded from partner-control matches · mistaken prior lead", s:"Correction: this is a German / Austrian torture-house horror, not a hypnosis or mind-control story. It remains visible only as a rejected research lead and is not counted as a match.", src:[["IMDb","https://www.imdb.com/title/tt5625798"]]
  },
  {
    t:"Maalaala Mo Kaya", sub:"“Gayuma” / “Love Potion” · S20E15", y:"2012", f:"tv", m:"TV anthology episode · Philippines · Filipino", c:["partner-control"], pcg:"partner-nearmiss", mec:"Love potion commissioned through a witch doctor", flag:"Low confidence · near-miss", s:"After Yvonne leaves him before their wedding, Lenny seeks a witch doctor’s help to make her fall for him through a love potion. The ex-partner instigates the control, but a third party performs it and the mechanism is not explicit hypnosis or trance.", src:[["Wikipedia","https://en.wikipedia.org/wiki/Maalaala_Mo_Kaya_season_20"],["YouTube","https://www.youtube.com/watch?v=JPLbtenypnw"]]
  },
  {
    t:"Jacquette", y:"1976", f:"movie", m:"Adult feature film · 54 min · United States · English", c:["partner-control"], pcg:"adult-borderline", mec:"Hypnosis / sexual control", flag:"Low confidence · adult title · relationship ambiguous", s:"Spencer Christian, described as being in love with Jacquette, learns a hypnotherapist’s technique and uses it on Jacquette and her female friend to control them sexually. The available sources do not establish that he is formally her boyfriend.", src:[["IMDb","https://www.imdb.com/title/tt0276038"],["Critifan","https://www.critifan.com/movies/590848"]]
  },
  {
    t:"Conde Vrolok", y:"2009–10", f:"tv", m:"Telenovela · Chile · Spanish · 104 episodes", c:["partner-control"], pcg:"unresolved", mec:"Vampire control · hypnosis unverified", flag:"Unresolved lead", s:"Count Domingo Vrolok becomes romantically involved with Emilia Verdugo, but no located source documents him hypnotizing or mind-controlling her. Kept for episode-level re-verification rather than counted as a match.", src:[["Wikipedia","https://es.wikipedia.org/wiki/Conde_Vrolok"],["IMDb","https://www.imdb.com/title/tt1627250"]]
  },
  {
    t:"Hypnothesis", y:"Year unverified", f:"short", m:"Short film · country unverified", c:["partner-control"], pcg:"unresolved", mec:"Intended memory erasure", flag:"Unresolved lead", s:"A professor intends to erase his girlfriend’s memory of their quarrel. The country of origin and any performed hypnosis or trance remain unverified.", src:[["IMDb","https://www.imdb.com/title/tt13408788"]]
  }
];

function grantPartnerCategory(match, group, detail){
  const entry=entries.find(match);
  if(!entry)return;
  entry.c=[...new Set([...(entry.c||[]),"partner-control"])];
  entry.pcg=group;
  if(detail){
    if(detail.s)entry.partnerS=detail.s;
    if(detail.mec)entry.partnerMec=detail.mec;
    if(detail.flag)entry.partnerFlag=detail.flag;
    if(detail.src)entry.partnerSrc=detail.src;
  }
}

partnerControllerRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t&&String(entry.y)===String(row.y));
  if(existing){
    existing.c=[...new Set([...(existing.c||[]),"partner-control"])];
    existing.pcg=row.pcg;
    existing.partnerS=row.s;
    existing.partnerMec=row.mec;
    existing.partnerFlag=row.flag;
    existing.partnerSrc=row.src;
  }else entries.push(row);
});

[
  ["He Learns the Trick of Mesmerism","1909"],
  ["Amore e ipnotismo","1912"],
  ["The Mask of Diijon","1946"],
  ["Sleep, My Love","1948"],
  ["Le Système Ribadier","1975"],
  ["To Seduce an Enemy","2003"],
  ["The Hypnotist / Hypnotisören","2012"]
].forEach(([title,year])=>grantPartnerCategory(entry=>entry.t===title&&String(entry.y)===year,"husband-direct"));

grantPartnerCategory(entry=>entry.t==="The Vise"&&entry.y==="1954","husband-variant");
grantPartnerCategory(entry=>entry.t==="The Stepford Wives"&&entry.y==="2004","husband-broader");
grantPartnerCategory(entry=>entry.t==="Don't Worry Darling"&&entry.y==="2022","husband-broader");
grantPartnerCategory(entry=>entry.t==="Tee Ratra"&&entry.y==="2010","partner-nearmiss");
grantPartnerCategory(entry=>entry.t==="Thunderbolt: Magun"&&entry.y==="2001","partner-nearmiss");
grantPartnerCategory(entry=>entry.t==="Desejos de Mulher"&&entry.y==="2002","ex-husband-nearmiss");
grantPartnerCategory(entry=>entry.t==="El maleficio"&&entry.y==="1983–84","partner-nearmiss");

grantPartnerCategory(entry=>entry.t==="O Beijo do Vampiro"&&entry.y==="2002–03","boyfriend",{
  mec:"Literal vampire hypnosis by current boyfriend",
  flag:"High confidence",
  s:"Victor hypnotizes Ciça repeatedly during their relationship. Chapter 131 says Van Pretta removes the hypnosis and Ciça cannot remember what happened; chapter 152 again says Victor hypnotizes her and tries to bite her. The first hypnosis precedes the episode guide’s explicit dating wording by one chapter, but the later incidents occur while Victor is her boyfriend.",
  src:[["Amo Novelas · chapters 37–48","https://amonovelas.com.br/novelas/o-beijo-do-vampiro-resumo-dos-capitulos-37-a-48-da-novela-da-globo/"],["Observatório da TV","https://observatoriodatv.com.br/novelas/resumos/resumo-dos-capitulos-de-o-beijo-do-vampiro-que-vao-ao-ar-nesta-semana-7"],["Wikipedia","https://pt.wikipedia.org/wiki/O_Beijo_do_Vampiro"]]
});
grantPartnerCategory(entry=>entry.t==="Silence of Sleep"&&entry.y==="2020","boyfriend",{
  mec:"Literal hypnosis by a lover",
  flag:"Medium confidence · “lover” rather than formal boyfriend",
  s:"A woman suffers a serious accident while hypnotized by a mysterious psychopathic lover, then lies in a coma imagining revenge against the man who trapped her. The relationship is described as lover, not explicitly boyfriend or husband, and the plot detail rests on one substantive synopsis.",
  src:[["IMDb","https://www.imdb.com/title/tt8259696"],["MLSBD","https://mlsbd.co/silence-of-sleep-2020-hindi-web-dl-480p-720p-1080p-x264-200mb-650mb-1-8gb-download-watch-online-18/"]]
});
grantPartnerCategory(entry=>entry.t==="Caminhos do Coração"&&entry.y==="2007–08","ex-boyfriend",{
  mec:"Literal hypnosis by ex-boyfriend / ex-lover",
  flag:"High confidence",
  s:"Episode guides repeatedly state that Rodrigo hypnotizes Amália: in chapter 147 after she says she is pregnant by him; again in chapters 171–180 after she rejects his kiss; and in chapter 191 before she reveals information about a detective. Relationship sources describe their unresolved romance, while Rodrigo is with Gór during the chapter-147 incident, making Amália his ex.",
  src:[["Amo Novelas · chapters 141–150","https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-141-a-150-da-novela-da-record/"],["Amo Novelas · chapters 171–180","https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-171-a-180-da-novela-da-record/"],["Amo Novelas · chapters 191–200","https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-191-a-200-da-novela-da-record/"],["Wikipedia","https://pt.wikipedia.org/wiki/Caminhos_do_Coração"]]
});
grantPartnerCategory(entry=>entry.t==="Scott Pilgrim vs. the World"&&entry.y==="2010","ex-boyfriend",{
  mec:"Technological mind control by ex-boyfriend",
  flag:"High confidence · already cataloged",
  s:"Ex-boyfriend Gideon Gordon Graves implants a mind-control chip in Ramona Flowers’s head, making her return to him and obey him against her will until Gideon is defeated.",
  src:[["Wikipedia","http://en.wikipedia.org/wiki/Scott_Pilgrim_vs._the_World"],["Villains Wiki","https://villains.fandom.com/wiki/Gideon_Gordon_Graves_(Scott_Pilgrim_vs._the_World)"]]
});
grantPartnerCategory(entry=>entry.t.startsWith("The Hypnotized / Faceless Beauty")&&entry.y==="2004","adult-borderline",{
  mec:"Hypnosis by former doctor turned affair partner",
  flag:"Borderline · lover, not formal boyfriend",
  s:"Psychiatrist Seok-won becomes involved with married former patient Ji-su and uses hypnosis to manipulate her for his sexual desires. The controller is a former doctor turned obsessive lover or affair partner, not her husband or a formal boyfriend.",
  src:[["Letterboxd","https://letterboxd.com/film/hypnotized/"],["KOFIC","http://www.kofic.org/eng/films/index/filmsView.jsp?movieCd=20040625"]]
});
