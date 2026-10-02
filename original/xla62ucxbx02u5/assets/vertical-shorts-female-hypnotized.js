/* Vertical-short female-hypnosis sweep — staged 2026-10-01.
 * One verified addition from five research vectors (~70 query rounds).
 * Idempotent: merge by exact title and preserve any existing memberships. */

const verticalShortFemaleHypnosisRows=[
  {
    t:"Stay Away! She's a Violent Psycho!",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · China-produced English dub · NetShort · approximately 80 episodes",
    s:"Jessie Bennett was framed by an impostor heiress and confined in a mental asylum, where she endured six years of torture. Her brother Mr. Jensen uses Dr. Clark to hypnotize her for control and punishment. In episode 58, Jessie resists a pocket-watch hypnosis attempt and walks out; episode 61 says that the six years of torture left her immune to hypnosis.",
    mec:"Pocket-watch hypnosis for control and punishment",
    flag:"Medium-high · official episode guides; release year unconfirmed",
    src:[
      ["NetShort · episode 58","https://netshort.com/episode/dubbed-stay-away-shes-a-violent-psycho-2049032676614078466-ep-58"],
      ["NetShort · episode 61","https://netshort.com/episode/dubbed-stay-away-shes-a-violent-psycho-new-5-2023954108427272194-ep-61"],
      ["NetShort · official title page","https://netshort.com/episode/stay-away-shes-a-violent-psycho-2020807418970832897"]
    ],
    note:"The current episode-58 attempt fails because Jessie resists it. Inclusion rests on episode 61's explicit link between her hypnosis immunity and the earlier six years of torture; the release year and exact episode count remain open.",
    prov:"Vertical-short female-hypnosis sweep, 01 Oct 2026 (five vectors; ~70 query rounds)",
    c:["forced-obedience"],
    fog:"villain",
    verticalShort:true,
    verticalShortFemaleHypnosis:true
  }
];

let verticalShortFemaleHypnosisNetNew=0;
let verticalShortFemaleHypnosisMerged=0;
verticalShortFemaleHypnosisRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t);
  if(existing){
    Object.assign(existing,row,{c:[...new Set([...(existing.c||[]),...row.c])]});
    verticalShortFemaleHypnosisMerged++;
  }else{
    entries.push(row);
    verticalShortFemaleHypnosisNetNew++;
  }
});
console.info(`vertical-shorts-female-hypnotized: net-new rows=${verticalShortFemaleHypnosisNetNew}, merged=${verticalShortFemaleHypnosisMerged}`);
