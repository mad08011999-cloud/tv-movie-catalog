const partnerCommissionedRows = [
  {
    t:"While You Were Sleeping", y:"2008", f:"short", m:"Short film · South Korea · 17 min", c:["partner-commissioned"], htg:"cure", mec:"Husband-arranged hypnosis by psychologist friend", flag:"Medium confidence · arrangement implied, no explicit pay / hire wording", s:"A husband visits his psychologist friend to cure his alcoholic and violent wife. The friend uses hypnosis to enter her psyche and uncover her memories layer by layer; the KOFIC synopsis establishes that the husband initiates the intervention, but does not explicitly say he pays or hires the psychologist.", src:[["Korean Film Council","http://koreanfilm.or.kr/eng/films/index/filmsView.jsp?movieCd=20110753"]]
  },
  {
    t:"The Honeymooners — “Sleepy Time Gal”", y:"1968", f:"tv", m:"TV sketch · USA · The Jackie Gleason Show · CBS", c:["partner-commissioned"], htg:"secret", mec:"Husband Ralph Kramden → hypnotist (a fellow member of his Raccoon lodge) → wife Alice Kramden", flag:"HIGH confidence", s:"Ralph persuades the hypnotist to put Alice in a trance so she will reveal where her secret stash of money is hidden; he wants the money for the Raccoon convention in Chicago.", note:"Remake of the “lost episode” sketch “The Hypnotist,” which aired January 29, 1955.", src:[["IMDb","https://www.imdb.com/title/tt0614078"],["Wikipedia episode list","https://en.wikipedia.org/wiki/List_of_The_Honeymooners_sketches"],["Episode Calendar","https://episodecalendar.com/pl/episodes/2226767"],["Tubi","https://tubitv.com/tv-shows/506635/s03-e12-the-hypnotist"]]
  },
  {
    t:"Sri Krishna 2006", y:"2006", f:"film", m:"Film · India · Telugu",
    c:["partner-commissioned"], htg:"unverified",
    mec:"Husband pays a hypnotist to hypnotize his wife (user's claim)",
    flag:"USER-REPORTED / UNVERIFIED — added 2026-10-01 at the user's explicit insistence after verification failed. Plot synopses reviewed (Wikipedia EN/TE, Filmibeat, Rotten Tomatoes, Apple TV, ZEE5, Letterboxd, TeluguOne, NowRunning review) describe a bigamy comedy and do NOT corroborate a husband-hires-hypnotist plot; the only hypnotism element found is comedy bits between comedians Ali and Venu Madhav ('jokes involving Ali and Venumadhav basing on hypnotism are well conceived' — NowRunning).",
    s:"Per the user's report (2026-10-01), in this Telugu film directed by Vijayendra Prasad (starring Srikanth, Venu, Ramya Krishna, Gowri Munjal) the husband pays a hypnotist to hypnotize his wife. This plot point is UNVERIFIED and contradicts the published record: every plot synopsis found describes a bigamy comedy — Venkateshwarulu (Venu) wants two wives at his grandmother's insistence, Indu (Gowri Munjal) agrees in order to teach him a lesson, and her 'first husband' (Srikanth) turns up — with no hypnotist anywhere in the story. The sole hypnotism element in any source is a NowRunning review line praising comedy bits between comedians Ali and Venu Madhav based on hypnotism.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Sri_Krishna_2006"],["NowRunning review","https://www.nowrunning.com/movie/3084/telugu/sri-krishna-2006/777/review.htm"],["Filmibeat story","https://www.filmibeat.com/telugu/movies/srikrishna-2006/story.html"],["TeluguOne review","https://www.teluguone.com/tmdb/moviereview/Sri-Krishna-2006-en-3701.html"]]
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
