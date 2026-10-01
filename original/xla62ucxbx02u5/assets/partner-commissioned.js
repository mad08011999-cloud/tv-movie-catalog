const partnerCommissionedRows = [
  {
    t:"While You Were Sleeping", y:"2008", f:"short", m:"Short film · South Korea · 17 min", c:["partner-commissioned"], htg:"cure", mec:"Husband-arranged hypnosis by psychologist friend", flag:"Medium confidence · arrangement implied, no explicit pay / hire wording", s:"A husband visits his psychologist friend to cure his alcoholic and violent wife. The friend uses hypnosis to enter her psyche and uncover her memories layer by layer; the KOFIC synopsis establishes that the husband initiates the intervention, but does not explicitly say he pays or hires the psychologist.", src:[["Korean Film Council","http://koreanfilm.or.kr/eng/films/index/filmsView.jsp?movieCd=20110753"]]
  }
];

function grantPartnerCommissioned(match, group, detail){
  const entry=entries.find(match);
  if(!entry)return;
  entry.c=[...new Set([...(entry.c||[]),"partner-commissioned"])];
  entry.htg=group;
  if(detail){
    if(detail.s)entry.commissionedS=detail.s;
    if(detail.mec)entry.commissionedMec=detail.mec;
    if(detail.flag)entry.commissionedFlag=detail.flag;
    if(detail.src)entry.commissionedSrc=detail.src;
  }
}

partnerCommissionedRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t&&String(entry.y)===String(row.y));
  if(existing){
    existing.c=[...new Set([...(existing.c||[]),"partner-commissioned"])];
    existing.htg=row.htg;
  }else entries.push(row);
});

grantPartnerCommissioned(entry=>entry.t==="Maalaala Mo Kaya"&&entry.y==="2012","love",{
  mec:"Witch-doctor love potion / magical will override",
  flag:"Medium-high confidence · existing record upgraded for this category",
  s:"Fiancé Lenny seeks a witch doctor’s gayuma love potion to make Yvonne fall for him after she gets cold feet and leaves three days before their wedding. The partner, third-party controller and intended romantic compulsion are explicit; the mechanism is an occult love charm rather than formal hypnosis.",
  src:[["Wikipedia","https://en.wikipedia.org/wiki/Maalaala_Mo_Kaya_season_20"],["Jeepney TV episode synopsis","https://www.youtube.com/watch?v=JPLbtenypnw"]]
});

grantPartnerCommissioned(entry=>entry.t==="Tee Ratra"&&entry.y==="2010","secret",{
  mec:"Husband hires psychiatrist friend for coercive hypnosis",
  flag:"High confidence",
  s:"Husband Rajan Deshmukh hires his psychiatrist friend to subject his wife to staged trauma and hypnosis, bringing her subconscious to the fore until she reveals her innermost secret about a suspected affair.",
  src:[["Marathi Movie World","https://marathimovieworld.com/review/tee-ratra-review.php"],["TV Guide","https://www.tvguide.com/movies/tee-ratra/2000027056/"],["IMDb","https://www.imdb.com/title/tt2652964"]]
});

grantPartnerCommissioned(entry=>entry.t==="Sleep, My Love"&&entry.y==="1948","gain",{
  mec:"Husband hires fake psychiatrist to drug and hypnotize wife",
  flag:"High confidence",
  s:"Husband Richard Courtland hires photographer Charles Vernay, posing as psychiatrist Dr. Rhinehart, to drug and hypnotize Alison and plant suggestions that drive her toward insanity and suicide, so Richard can inherit her wealth and remain with his mistress.",
  src:[["Wikipedia","https://en.wikipedia.org/wiki/Sleep,_My_Love"],["Film Comment","https://www.filmcomment.com/article/stanley-milgram-experimenter-michael-almereyda/"]]
});
