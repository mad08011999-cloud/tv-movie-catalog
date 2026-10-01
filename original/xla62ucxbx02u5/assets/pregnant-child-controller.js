const pregnantChildControllerRows = [
  {match:e=>e.t==="The Stranger Within"&&e.y==="1974",t:"The Stranger Within",y:"1974",f:"tv",m:"ABC TV movie · United States · English",pcg:"fetal",c:["pregnant-child"],mec:"Alien-fetus behavioral control",s:"Ann Collins’s alien fetus gradually takes control of her behavior, ordering her to ignore her doctor, abandon her husband and comply with its demands.",src:[["Wikipedia","https://en.wikipedia.org/wiki/The_Stranger_Within_(1974_film)"],["IMDb","https://www.imdb.com/title/tt0072219"],["Moria Reviews","https://moriareviews.com/horror/stranger-within-1974.htm"]]},
  {t:"Charmed",sub:"“Womb Raider” · S04E21 · aired 9 May 2002",y:"2002",f:"tv",m:"TV series episode · United States · English",pcg:"fetal",c:["pregnant-child"],mec:"Unborn-demon bodily control",flag:"HIGH",s:"Pregnant Phoebe Halliwell’s unborn demonic baby—the Source’s heir—progressively takes control of her body from within the womb and endangers her sisters.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Charmed_season_4"],["IMDb","https://www.imdb.com/title/tt0539484"],["Charmed Wiki script","https://charmed.fandom.com/wiki/Womb_Raider/Script"]]},
  {t:"Angel",sub:"“Expecting” · S01E12 · aired 25 January 2000",y:"2000",f:"tv",m:"TV series episode · United States · English",pcg:"fetal",c:["pregnant-child"],mec:"Fetal psychic control",flag:"HIGH",s:"Cordelia Chase is eight months pregnant with seven Haxil demon fetuses. The unborn demons exert psychic control, making her fiercely protective of the pregnancy and compelling her to travel to the demon’s lair to deliver; Angel and Wesley must break the control before the lethal birth.",src:[["The TV IV","http://tviv.org/Angel/Expecting"],["BBC Cult","http://bbc.adactio.com/cult/buffy/angel/episodes/one/page12.shtml"]]},
  {match:e=>e.t==="Born"&&e.y==="2007",t:"Born",y:"2007",f:"movie",m:"Direct-to-video film · United States · English",pcg:"fetal",c:["pregnant-child"],mec:"Demon-fetus possession",s:"Mary Elizabeth is possessed by the demon fetus growing in her womb; it fills her head with cravings to kill, and she obeys the overwhelming force.",src:[["FilmAffinity","https://www.filmaffinity.com/en/film745279.html"],["ComingSoon","https://www.comingsoon.net/horror/news/713897-born"]]},
  {match:e=>e.t==="Progeny"&&e.y==="1998",t:"Progeny",y:"1998",f:"movie",m:"Direct-to-video film · United States · English",pcg:"fetal",c:["pregnant-child"],mec:"Alien-fetus commands",s:"Sherry Burton’s alien fetus speaks to and commands her; she sits in an ice bath because the baby “likes the cold” and “told her to do it.”",src:[["Wikipedia","https://en.wikipedia.org/wiki/Progeny_(film)"],["IMDb","https://www.imdb.com/title/tt0167350"]]},
  {t:"Shelley",y:"2016",f:"movie",m:"Theatrical film · Denmark · Danish",pcg:"fetal",c:["pregnant-child"],mec:"Implied malevolent in-utero agency",flag:"MEDIUM",s:"Surrogate Elena believes the baby is killing her. She hallucinates, wanders in a daze, attacks a live chicken and attempts self-abortion with a knitting needle; malevolent in-utero agency is strongly implied, though a psychosis reading remains possible.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Shelley_(2016_film)"],["TV Guide","https://www.tvguide.com/movies/Shelley/2000365430"]]},
  {t:"Unborn but Forgotten",sub:"하얀방 / Hayanbang",y:"2002",f:"movie",m:"Theatrical film · South Korea · Korean",pcg:"fetal",c:["pregnant-child"],mec:"Ghost-fetus / unborn-child spirit domination",flag:"MEDIUM-LOW",s:"Pregnant TV producer Han Su-jin is infected by a cursed maternity website; a vengeful ghost-fetus or unborn-child spirit dominates victims’ minds and bodies.",src:[["Montage Film Reviews","https://www.montagefilmreviews.com/unbornbutforgotten.html"]]},
  {t:"Womb Ghosts",sub:"惡胎 / Ngok Toi",y:"2010",f:"movie",m:"Theatrical film · Hong Kong · Cantonese",pcg:"fetal",c:["pregnant-child"],mec:"Dead-fetus spirits acting from the womb",flag:"MEDIUM-LOW",s:"The “womb ghosts”—dead fetuses that live on inside women’s bodies—exert supernatural agency over them from within the womb.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Womb_Ghosts"],["Sino-Cinema","https://sino-cinema.com/2017/08/26/review-womb-ghosts-2010/"]]},
  {match:e=>e.t==="Devil Fetus"&&e.y==="1983",t:"Devil Fetus",y:"1983",f:"movie",m:"Theatrical film · Hong Kong · Cantonese",pcg:"fetal",c:["pregnant-child"],mec:"Malevolent fetus dominating its mother",s:"A malevolent fetus grown from a stillborn child’s remains takes root in Ching’s womb, demanding blood and souls and dominating her body and mind from within.",src:[["Dyerbolical","https://dyerbolical.com/unholy-womb-the-frenzied-terror-of-devil-fetus/"]]},

  {t:"Ju-on: The Grudge 2",sub:"呪怨2",y:"2003",f:"movie",m:"Theatrical film · Japan · Japanese",pcg:"ghost",c:["pregnant-child"],mec:"Dead-boy ghost usurping a pregnancy",flag:"MEDIUM-HIGH",s:"Pregnant actress Kyoko Harase is targeted by murdered ghost boy Toshio, who repeatedly touches her womb and usurps the pregnancy. She gives birth to Kayako’s reincarnation, who murders her.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Ju-On:_The_Grudge_2"],["Ju-on Wiki","https://ju-on-the-grudge.fandom.com/wiki/Kyoko_Harase"]]},
  {t:"Ju-on: The Beginning of the End",sub:"呪怨: 終わりの始まり",y:"2014",f:"movie",m:"Theatrical film · Japan · Japanese",pcg:"ghost",c:["pregnant-child"],mec:"Dead-boy spirit entering a woman’s body",flag:"MEDIUM",s:"Kayako is visited in sleep by a ghostly boy calling her “mother.” He enters her body, and she becomes pregnant with Toshio.",src:[["Ju-on Wiki","https://ju-on-the-grudge.fandom.com/wiki/Kayako_Saeki"]]},
  {t:"Mononoke",sub:"“Zashiki-warashi” arc · episodes 1–2",y:"2007",f:"tv",m:"Anime TV series · Japan · Japanese",pcg:"ghost",c:["pregnant-child"],mec:"Unborn-child spirits dominating the womb",flag:"MEDIUM",s:"Pregnant Shino shelters at an inn where Zashiki-warashi—aborted or unborn child spirits, one revealed as her own aborted child—fixate on her pregnancy and supernaturally dominate her womb until they relent.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Mononoke_(TV_series)"]]},

  {match:e=>e.t==="Baby Blood"&&e.y==="1990",t:"Baby Blood",y:"1990",f:"movie",pcg:"fetal",c:["pregnant-child"]},
  {match:e=>e.t==="Prevenge"&&String(e.y).startsWith("2016"),t:"Prevenge",y:"2016",f:"movie",pcg:"fetal",c:["pregnant-child"]},
  {match:e=>e.t==="The Unborn"&&e.y==="1991",t:"The Unborn",y:"1991",f:"movie",pcg:"fetal",c:["pregnant-child"]},
  {match:e=>e.t==="Help"&&e.y==="2010",t:"Help",y:"2010",f:"movie",pcg:"fetal",c:["pregnant-child"]},
  {match:e=>e.t==="Village of the Damned"&&e.y==="1995",t:"Village of the Damned",y:"1995",f:"movie",pcg:"fetal",c:["pregnant-child"],s:"The alien children telepathically block Midwich’s pregnant women from terminating their pregnancies."},
  {match:e=>e.t==="The Midwich Cuckoos"&&e.y==="2022",t:"The Midwich Cuckoos",y:"2022",f:"tv",pcg:"fetal",c:["pregnant-child"]}
];

function addPregnantChildController(row){
  const match=row.match||((entry)=>entry.t===row.t&&entry.y===row.y);
  const target=entries.find(match);
  if(!target){
    const fresh={...row};
    delete fresh.match;
    entries.push(fresh);
    return;
  }
  target.c=[...new Set([...(target.c||[]),"pregnant-child"])];
  target.pcg=row.pcg;
  if(row.src&&row.src.length)target.src=[...new Map([...(target.src||[]),...row.src].map(source=>[source[1],source])).values()];
  if(row.s&&target.s!==row.s&&!target.s.includes(row.s))target.s=`${target.s} Pregnant-child category detail: ${row.s}`;
  if(row.mec&&target.mec!==row.mec&&!String(target.mec||"").includes(row.mec))target.mec=[target.mec,row.mec].filter(Boolean).join(" · ");
}
pregnantChildControllerRows.forEach(addPregnantChildController);
