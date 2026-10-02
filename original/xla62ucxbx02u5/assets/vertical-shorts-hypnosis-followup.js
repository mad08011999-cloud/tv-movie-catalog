/* Vertical short-drama hypnosis ± pregnancy follow-up — staged 2026-10-01.
 * Two verified additions from four follow-up vectors (~62 query rounds).
 * Must load after assets/vertical-shorts-hypnosis-pregnancy.js. Idempotent:
 * title-level merge preserves any memberships already present. */

const verticalShortFollowupRows=[
  {
    t:"I Accidentally Had the Billionaire's Twins. 6 Years Later, They Saved His Empire!",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · China-produced English dub · platform unconfirmed · full-movie compilation",
    s:"Kathy Rowe accidentally conceives twins with billionaire Vincent Wallace, marries him, and survives an attempt on her life. Old schoolmate Dustin Mitchell then kidnaps and hypnotizes her to forget her husband. Six years later, the twins help Vincent find her and Kathy regains her memory.",
    strictS:"Kathy is identified as Vincent's pregnant wife at the 31-minute rescue, then Dustin kidnaps and hypnotizes her at 1:30:24 before the six-year jump at 1:35:24. The twins are about six after the jump, so the hypnosis occurred during pregnancy; that timing is inferred from the compilation markers rather than stated outright.",
    mec:"Hypnotic memory wipe of her husband",
    strictMec:"Hypnotic memory wipe during pregnancy",
    flag:"High · hypnosis and relationship alteration confirmed by the full-movie description",
    strictFlag:"Medium-high · during-pregnancy timing inferred from compilation markers",
    src:[["WildHeartDramas · full movie and timeline","https://www.youtube.com/watch?v=j5KCxOW7HX4"]],
    note:"The love potion at conception is not the hypnosis being cataloged. The qualifying mechanism is Dustin Mitchell's later hypnosis to erase Kathy's memory of her husband; the originating platform, release year and episode count remain unconfirmed.",
    prov:"Vertical short-drama hypnosis ± pregnancy follow-up, 01 Oct 2026 (full-movie description and timeline markers)",
    c:["love","pregnant-strict"],
    psg:"villain",
    loveSweep:true,
    verticalShortFollowup:true
  },
  {
    t:"Broken Bone Rose",
    sub:"折骨薔薇 · alternate title: 开到荼蘼，花事终了",
    y:"Unconfirmed",
    f:"tv",
    m:"Mandarin vertical short drama · China · episode count unconfirmed",
    s:"An orphaned bodyguard helps the male lead rise from the bottom but refuses to submit to him. After she fakes her death to escape and he finds her, he uses hypnosis to erase all her memories in order to keep her with him.",
    mec:"Hypnotic memory erasure to keep her",
    flag:"Medium · two independent upload sources; no episode-level confirmation",
    src:[
      ["繁星短劇 · full upload","https://www.youtube.com/watch?v=ux5iu3yEFlM"],
      ["CupidCutsDrama · English-dub cut","https://www.youtube.com/watch?v=My3FLv8A0Qo"]
    ],
    note:"The mechanism and direction are supported by both uploads, but the year, episode count and any pregnancy element remain unconfirmed.",
    prov:"Vertical short-drama hypnosis ± pregnancy follow-up, 01 Oct 2026",
    c:["love"],
    loveSweep:true,
    verticalShortFollowup:true
  }
];

let verticalShortFollowupNetNew=0;
let verticalShortFollowupMerged=0;
verticalShortFollowupRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t);
  if(existing){
    Object.assign(existing,row,{c:[...new Set([...(existing.c||[]),...row.c])]});
    verticalShortFollowupMerged++;
  }else{
    entries.push(row);
    verticalShortFollowupNetNew++;
  }
});
console.info(`vertical-shorts-hypnosis-followup: net-new rows=${verticalShortFollowupNetNew}, merged=${verticalShortFollowupMerged}`);
