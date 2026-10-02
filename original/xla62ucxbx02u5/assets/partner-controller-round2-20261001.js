const partnerControllerRound2Rows = [
  {
    t:"A hipnotizált feleség / The Hypnotized Wife", y:"1932", f:"short", m:"Short comedy film · Hungary · Hungarian · black-and-white sound", c:["partner-control"], pcg:"husband-direct", mec:"Literal hypnosis by current husband", flag:"High confidence", s:"After learning that his friend Kelemen hypnotized his own wife into obedience, Rezeda goes home and puts his wife Rezedáné into a trance. She follows his commands until cold water wakes her, reversing the domestic power play. The film therefore contains two husband-to-wife hypnosis instances.", src:[["IMDb","https://www.imdb.com/title/tt30475535"],["Hungarian Wikipedia","https://hu.wikipedia.org/wiki/Békeffi_László"],["Hangosfilm","https://www.hangosfilm.hu/filmenciklopedia/bekeffi-laszlo"],["Hungarian Film Archive record","https://en.mandadb.hu/dokumentum/490217/a_hipnotizlt_felesg_RJ_62.pdf"]]
  },
  {
    t:"Paris 1900: Feydeau", sub:"“The Ribadier System” · S1E1", y:"1964", f:"tv", m:"TV anthology episode · United Kingdom · English · ITV / Granada · 60 min", c:["partner-control"], pcg:"husband-direct", mec:"Literal hypnosis by current husband", flag:"High confidence", s:"Eugène Ribadier uses his gift of hypnotism to put his wife Angèle to sleep while he visits his mistress, then wakes her with a secret method when he returns. His confidence collapses after he reveals the system to Thommereux, who wakes Angèle and exposes Ribadier’s deceit.", src:[["CTVA UK","http://ctva.biz/UK/Granada/Paris1900.htm"],["Wikipedia · Le Système Ribadier","https://en.wikipedia.org/wiki/Le_Système_Ribadier"]]
  },
  {
    t:"Tales of Wells Fargo", sub:"“The Gold Witch” · S6E31", y:"1962", f:"tv", m:"TV series episode · United States · English · NBC · 49 min", c:["partner-control"], pcg:"husband-direct", mec:"Literal stage hypnosis by current husband", flag:"High confidence", s:"The Great Reardon hypnotizes his wife into a deep stage trance and exploits her apparent powers in a scheme to swindle a mine owner out of $10,000. She eventually recognizes the extent of her husband’s deceit as the fraud unravels in the mine.", src:[["TV Guide","https://www.tvguide.com/tvshows/wells-fargo/episodes-season-6/1000246789/"],["Rotten Tomatoes","https://www.rottentomatoes.com/tv/tales_of_wells_fargo/s06/e31"],["Simkl","https://simkl.com/tv/6163/tales-of-wells-fargo/season-6/episode-31/"]]
  },
  {
    t:"Days of Our Lives", sub:"Alex North / Marlena Evans arc", y:"2005–06", f:"tv", m:"Daytime soap opera · United States · English · NBC", c:["partner-control"], pcg:"husband-direct", mec:"Hypnosis, drugs and memory manipulation by husband", flag:"High confidence · distinct from the 1994–95 Stefano arc", s:"Alex North, revealed as Marlena Evans’s first husband and still legally married to her, repeatedly hypnotizes her without her knowledge, drugs her herbal tea and manipulates her memories so that she chooses him over John. Alex and Marlena renew their vows during the arc before his control is exposed.", src:[["Wikipedia · characters introduced in the 2000s","https://en.wikipedia.org/wiki/List_of_Days_of_Our_Lives_characters_introduced_in_the_2000s"],["SoapCentral · Dr. Alex North","https://www.soapcentral.com/character/dr-alex-north"],["SoapCentral · week of 5 Sep 2005","https://www.soapcentral.com/days-of-our-lives/days-of-our-lives-weekly-recap-for-050905"],["Wikipedia · John and Marlena","https://en.wikipedia.org/wiki/John_Black_and_Marlena_Evans"]]
  }
];

partnerControllerRound2Rows.forEach(row=>{
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

// Already cataloged in the adult-audience index: grant partner-controller membership
// and replace its category-specific evidence with the stronger round-2 sourcing.
grantPartnerCategory(entry=>entry.t==="Mil sexos tiene la noche / Night of 1,000 Sexes"&&entry.y==="1984","boyfriend",{
  mec:"Literal hypnosis by current boyfriend",
  flag:"High confidence · erotic horror / explicit adult content",
  s:"Fabián hypnotically controls his girlfriend Irina, a nightclub telepathy performer, and uses her as the instrument of his personal revenge. While in trance she seduces and murders victims; the film’s erotic-horror framing and their romantic relationship are directly supported by the sourced synopsis and review.",
  src:[["FilmAffinity","https://www.filmaffinity.com/es/film503865.html"],["Movistar Plus","https://www.movistarplus.es/cine/mil-sexos-tiene-la-noche/ficha?tipo=E&id=2170570"],["Abandomoviez","https://www.abandomoviez.net/db/50ultimas.php?web=236&lectura=1"],["IMDb reviews","https://www.imdb.com/title/tt0087723/reviews/"]]
});
