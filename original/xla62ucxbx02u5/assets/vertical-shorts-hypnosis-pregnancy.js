/* Vertical short-drama hypnosis ± pregnancy sweep — staged 2026-10-01.
 * Five verified titles from six research vectors (~85+ query rounds).
 * Must load after assets/mirror-import.js. Idempotent: title-level merge,
 * preserving existing category memberships if a later source already added one. */

const verticalShortSweepRows=[
  {
    t:"Snake Year Salvation: CEO's Bargain Bride",
    y:"c. 2024–26",
    f:"tv",
    m:"Short-form vertical drama series · China-produced · English · NetShort · 83 episodes",
    s:"Pregnant heroine Emma Miller, also called Dora in the episode guides, is abducted by Dylan Zane. In episode 70, Dylan uses a pocket watch and she goes from screaming for help to trusting him instantly; episode 69 shows her clutching her stomach as he calls her a tool for carrying a baby. Further pocket-watch hypnosis appears in episodes 79 and 83.",
    strictS:"Emma/Dora is visibly pregnant during Dylan Zane's pocket-watch hypnosis arc: episode 69 frames her as carrying a baby, and episode 70 says her eyes glaze over as she moves from resistance to instant trust. The pregnancy and active will-override therefore overlap directly.",
    mec:"Pocket-watch hypnosis / forced trust",
    strictMec:"Pocket-watch hypnosis during pregnancy",
    flag:"High · episode-level NetShort guides; release year approximate",
    strictFlag:"High · pregnancy and hypnosis overlap in adjacent episode guides; release year approximate",
    src:[
      ["NetShort · episode 70","https://netshort.com/episode/snake-year-salvation-ceos-bargain-bride-2047835919481831425-ep-70"],
      ["NetShort · episode 69","https://netshort.com/episode/snake-year-salvation-ceos-bargain-bride-2047835919481831425-ep-69"],
      ["NetShort · episode 79","https://netshort.com/episode/snake-year-salvation-ceos-bargain-bride-new-6-2047835919481831425-ep-79"],
      ["NetShort · episode 83","https://netshort.com/episode/snake-year-salvation-ceos-bargain-bride-2047835919481831425-ep-83"]
    ],
    note:"The sweep identifies this as the only new strict pregnancy-era hypnosis match. Episode guides alternate the heroine's name between Emma and Dora.",
    prov:"Vertical short-drama hypnosis ± pregnancy sweep, 01 Oct 2026 (six vectors; ~85+ query rounds)",
    c:["love","pregnant-strict"],
    psg:"villain",
    loveSweep:true,
    verticalShortSweep:true
  },
  {
    t:"Sweet Strategy: Mr. Vance's Ex Is Too Proud",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama series · English · ReelShort",
    s:"Elena Hayes is hypnotized by a rival and starts a fire while sleepwalking. Her husband Vincent Vance mistakes the event for an attempt on his life and fortune; Elena leaves, later discovers she is pregnant, and returns years later with their son Leo.",
    mec:"Hypnosis causing sleepwalking",
    flag:"High · official ReelShort synopsis; episode count and year unconfirmed",
    src:[
      ["ReelShort · official synopsis","https://www.reelshort.com/search?keywords=actor%20evan%20adams&page=8&%3Buniqueid=3faa2218"],
      ["ReelShort · indexed title page","https://www.reelshort.com/tags/mc-types/277"]
    ],
    note:"Pregnancy is discovered after the hypnosis-and-fire incident. She may already have been pregnant during the hypnosis, but the timing is not confirmed, so this is not filed in the strict pregnancy-era category.",
    prov:"Vertical short-drama hypnosis ± pregnancy sweep, 01 Oct 2026 (official synopsis corroborated across multiple indexed ReelShort pages)",
    c:["love"],
    loveSweep:true,
    verticalShortSweep:true
  },
  {
    t:"Twisted Vows",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama series · China-produced English dub · DramaBox · 76 episodes",
    s:"Episode 2 says Wanda Lane, Mrs. Grant, is hypnotized and interrogated but reveals nothing about the Grant Group. Percy Grant orchestrates a new face and identity for her as Yvonne Walker, positioning her to become his new fiancée.",
    mec:"Hypnosis / interrogation and forced identity",
    flag:"High on hypnosis; medium overall · single episode-guide source; year unconfirmed",
    src:[
      ["NetShort · episode 2","https://netshort.com/episode/twisted-vows-1889138612374962178-ep-2"],
      ["DramaBox · platform listing","https://www.dramaboxapp.com/keywords/10"]
    ],
    note:"The hypnosis is explicit; the marriage-role reading rests on the same episode-guide account of Percy's identity-and-fiancée scheme.",
    prov:"Vertical short-drama hypnosis ± pregnancy sweep, 01 Oct 2026",
    c:["love"],
    loveSweep:true,
    verticalShortSweep:true
  },
  {
    t:"They Called Me the Fake Heiress, But My Birthright Was Far Greater",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama series · GoodShort · 34 episodes",
    s:"The female lead learns that her apparent repeated rebirths were an illusion: her fiancé Wayne Fall had been hypnotizing her with pills, while others worried that continuing the treatment would damage her brain.",
    mec:"Drug-assisted hypnosis / implanted false memories",
    flag:"Medium-high · official GoodShort synopsis; no episode-level verification; year unconfirmed",
    src:[["GoodShort · official synopsis","https://www.goodshort.com/tag/john-ashton-call-the-midwife-playlets-videos"]],
    note:"No pregnancy element is documented. The relationship angle is established by Wayne's status as her fiancé; the hypnosis produces false-memory control rather than a directly verified love command.",
    prov:"Vertical short-drama hypnosis ± pregnancy sweep, 01 Oct 2026",
    c:["love"],
    loveSweep:true,
    verticalShortSweep:true
  },
  {
    t:"Taste of the Wild",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama series · English · DramaBox · 52 episodes",
    s:"In episode 47, Charles uses chimes to mind-control Rachel, telling her that she will be his little lamb again; the recap says her defiance turns to fear and that the chimes have worked on her before. Rachel is also described as hypnotizing other people.",
    mec:"Chime-based mind control",
    flag:"Medium · official platform listing plus episode recap; victim-name discrepancy retained",
    src:[
      ["NetShort · episode 47","https://netshort.com/episode/taste-of-the-wild-2075863852712136706-ep-47"],
      ["DramaBox · official series page","https://www.dramabox.com/drama/42000020127/Taste-of-the-Wild"]
    ],
    note:"Sources disagree on whether the relevant woman is named Emma or Rachel, and the direction of hypnosis is mixed because Rachel also controls others. No pregnancy element is documented.",
    prov:"Vertical short-drama hypnosis ± pregnancy sweep, 01 Oct 2026",
    c:["love"],
    loveSweep:true,
    verticalShortSweep:true
  }
];

let verticalShortSweepNetNew=0;
let verticalShortSweepMerged=0;
verticalShortSweepRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t);
  if(existing){
    Object.assign(existing,row,{c:[...new Set([...(existing.c||[]),...row.c])]});
    verticalShortSweepMerged++;
  }else{
    entries.push(row);
    verticalShortSweepNetNew++;
  }
});
console.info(`vertical-shorts-hypnosis-pregnancy: net-new rows=${verticalShortSweepNetNew}, merged=${verticalShortSweepMerged}`);
