/* Vertical-shorts female-hypnosis deep sweep — filed 2 Oct 2026.
 * Seven verified category additions after full-catalog dedupe: four new rows and
 * three enrichments of existing rows. Low-confidence leads remain outside the catalog. */
(function(){
"use strict";
if(typeof entries==="undefined")return;

const sweepBasis="Worldwide vertical-short and adult / R-rated / erotic female-hypnosis sweep, 2 Oct 2026 (~117 query rounds). Sources named on the research record; unresolved and title-only leads excluded.";

function mergeRow(find,row){
  const existing=entries.find(find);
  if(!existing){entries.push(row);return row;}
  existing.c=[...new Set([...(existing.c||[]),...(row.c||[])])];
  if(row.sub)existing.sub=row.sub;
  if(row.m)existing.m=row.m;
  if(row.s)existing.s=row.s;
  if(row.mec)existing.mec=row.mec;
  if(row.flag)existing.flag=row.flag;
  if(row.ch)existing.ch=row.ch;
  if(row.fog)existing.fog=row.fog;
  if(row.verticalShort)existing.verticalShort=true;
  existing.src=[...new Map([...(existing.src||[]),...(row.src||[])].map(source=>[source[1],source])).values()];
  existing.prov=row.prov;
  return existing;
}

mergeRow(
  entry=>entry.t==="Super Godfather: My Ex Begs Me on Her Knees",
  {
    t:"Super Godfather: My Ex Begs Me on Her Knees",y:"c. 2026",f:"tv",
    m:"Short-form vertical drama · ReelShort · English (China-produced dub) · 60+ episodes",
    c:["forced-obedience"],fog:"villain",verticalShort:true,
    mec:"Supernatural gaze hypnosis / memory and compliance",
    flag:"High confidence · official episode-level source",
    ch:"Cathey (Cain Hunter’s stepmother)",
    s:"Cain Hunter gains the “Eyes of Rom” power. In episode 6, the power hypnotizes his stepmother Cathey during a family power struggle, changing her response to his demand.",
    src:[["ReelShort · episode 6","https://www.reelshort.com/episodes/episode-6-super-godfather-my-ex-begs-me-on-her-knees-68d6d9874a593acf1d093be8-2vwfc70lk5"],["ReelShort · full series","https://www.reelshort.com/full-episodes/super-godfather-my-ex-begs-me-on-her-knees-68d6d9874a593acf1d093be8"]],
    prov:sweepBasis
  }
);

mergeRow(
  entry=>entry.t==="O Hipnotizador / El Hipnotizador"&&String(entry.y).includes("2015"),
  {
    t:"O Hipnotizador / El Hipnotizador",sub:"S02E02 · “Teresa e as Mariposas”",y:"2015–17",f:"tv",
    m:"TV series episode · HBO Latin America · Brazil / Argentina · Portuguese / Spanish",
    c:["forced-obedience"],fog:"variant",
    mec:"Hypnosis / false-memory manipulation",
    flag:"Medium confidence · memory-manipulation variant",
    ch:"Teresa",
    s:"Arenas hypnotizes Teresa; while under hypnosis, she remembers events that did not happen. Filed as a memory-manipulation variant rather than a direct command-obedience case.",
    src:[],
    prov:sweepBasis+" Episode sources: Episodate, TVmaze and WhenHBO."
  }
);

mergeRow(
  entry=>entry.t==="The Hypnotist"&&entry.y==="1936",
  {
    t:"The Hypnotist",y:"1936",f:"short",
    m:"Stag short film · United States · English",
    c:["hypno-intimacy","adult-hypnosis"],
    mec:"Fortune-teller hypnosis",
    flag:"Medium confidence · 18+ explicit adult short",
    s:"A married couple visits a fortune teller. The wife is hypnotized for a sexual encounter with a woman; the husband is later hypnotized for another sexual encounter.",
    src:[],
    prov:sweepBasis+" Corroborated by IMDb tt0289230 and 1930s stag-film references."
  }
);

mergeRow(
  entry=>entry.t==="PPPD-305"&&entry.y==="2014",
  {
    t:"PPPD-305",y:"2014",f:"movie",
    m:"Adult video (JAV) · OPPAI · Japan · Japanese",
    c:["hypno-intimacy"],
    mec:"Hypnosis by a family acquaintance",
    flag:"High confidence as an adult production · 18+ explicit",
    ch:"Meguri (wife)",
    s:"A friend of the husband, presented as a hypnosis specialist, hypnotizes Meguri in an NTR-themed adult scenario. The production is indexed with a “Hypnosis” genre tag.",
    src:[],
    prov:sweepBasis+" Source indexes: jav.sb, japavstore, javmala, javfifo and thisjav."
  }
);

mergeRow(
  entry=>entry.t==="Saimin Seishidou"&&String(entry.y).startsWith("2019"),
  {
    t:"Saimin Seishidou",sub:"Hypnosis Sex Guidance",y:"2019–2022",f:"tv",
    m:"Adult-animation OVA series · Japan · Japanese",
    c:["hypno-intimacy"],
    mec:"Hypnosis in sexual scenarios",
    flag:"Medium confidence · 18+ explicit adult animation",
    s:"Hypnosis-themed adult-animation series in which female characters are hypnotized for sexual scenarios.",
    src:[],
    prov:sweepBasis+" Source basis: Archive.org item listing, hentai database entries and the existing Japanese Wikipedia series record."
  }
);

mergeRow(
  entry=>entry.t==="Kyonyuu Onna Shikan Sennou Saimin"&&entry.y==="2024",
  {
    t:"Kyonyuu Onna Shikan Sennou Saimin",y:"2024",f:"tv",
    m:"Adult-animation OVA · Lune Pictures · Japan · Japanese · 2 episodes",
    c:["hypno-intimacy"],
    mec:"Hypnotic control",
    flag:"Medium confidence · 18+ explicit adult animation",
    ch:"Female protagonist(s)",
    s:"Hypnosis-themed adult animation in which female protagonist figures are placed under hypnotic control. This is distinct from Kyonyuu Hitozuma Onna Kyoushi Saimin (2016).",
    src:[],
    prov:sweepBasis+" Source basis: AniHentai listing and hentai database entries."
  }
);

mergeRow(
  entry=>entry.t==="Saimin Jutsu the Animation 2nd"&&entry.y==="2008",
  {
    t:"Saimin Jutsu the Animation 2nd",y:"2008",f:"tv",
    m:"Adult-animation OVA · Japan · Japanese",
    c:["hypno-intimacy"],
    mec:"Hypnosis",
    flag:"Medium confidence · 18+ explicit adult animation",
    ch:"Female characters",
    s:"Hypnosis-themed adult animation in which female characters are hypnotized by hypnotist figures. This is distinct from Saimin Jutsu Zero (2013).",
    src:[],
    prov:sweepBasis+" Source basis: IMDb and hentai database entries."
  }
);
})();
