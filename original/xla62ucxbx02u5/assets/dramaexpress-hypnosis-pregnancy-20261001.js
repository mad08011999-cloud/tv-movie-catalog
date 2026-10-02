/* DramaExpress + short-drama-sites sweep — filed 1 Oct 2026.
 * Seven net-new verified records and three clearly labeled unresolved leads.
 * Idempotent: merge on exact title and year while preserving prior memberships. */

const dramaexpressSweepBasis="DramaExpress + short-drama-sites sweep, 01 Oct 2026 (dramaexpress.net + 11 platforms; adult/18+ vector honest zero)";

const dramaexpressHypnosisPregnancyRows=[
  {
    t:"The Photo That Changed Everything",
    y:"Year unconfirmed (recap dated 2026-04; circa 2025–26)",
    f:"tv",
    m:"Short-form vertical drama · English · ReelShort · 58 episodes, completed",
    s:"On their wedding night CEO Griffin Walker is forced to watch his wife Isabella cheat; Isabella stops his revenge with a single photograph and for 18 years he raises her twins. The photo hides a hypnosis microchip (developed by Isabella, a Russian agent; replicated by Griffin with FBI help) that forces the adult twins — Riley (female, 18) and Dexter — to obey Griffin; Riley donates her cornea and is temporarily blinded under its influence.",
    mec:"Hypnosis microchip / forced obedience",
    flag:"Medium-high confidence · hypnosis is a third-act device; female victim is a supporting character",
    src:[["ReelShort · official listing","https://app.reelshort.com/app-video-share/69c0a24ec1a92e4f5603fd9f"],["ReelShort Fandom · official recap","https://www.reelshort.com/fandom/griffin-walker-and-isabella-walker-01-6-5c1021fb4ce5/"]],
    prov:dramaexpressSweepBasis,
    c:["forced-obedience"],
    fog:"villain",
    verticalShort:true
  },
  {
    t:"Beneath the Snow, Something Lies Waiting",
    y:"Year unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · DramaBox · 29+ episodes",
    s:"Winter 1929; merchant Kane Lawson searches for his missing daughter Cindy Lawson; the group fights to rescue the brainwashed Cindy from the Jarundese invaders' plot.",
    mec:"Brainwashing / invader mind control",
    flag:"Medium confidence · brainwashing framing; no independent third-party corroboration",
    src:[["DramaBox · official synopsis","https://www.dramaboxapp.com/tag/54781/27"],["DramaBox DB · episode page","https://www.dramaboxdb.com/ep/42000007291_beneath-the-snow-something-lies-waiting/700469940_Episode-11"],["DramaBox TV · episode page","https://www.dramaboxtv.com/episode/beneath-the-snow-something-lies-waiting-42000007291/027-700469956"]],
    note:"Filed as a brainwashing-framed variant of forced obedience; no located source uses clinical hypnosis terminology.",
    prov:dramaexpressSweepBasis,
    c:["forced-obedience"],
    fog:"villain",
    verticalShort:true
  },
  {
    t:"Alpha, She Wasn't the One",
    y:"2024",
    f:"tv",
    m:"Short-form vertical drama · English (7 languages) · FlexTV · premiered 27 Dec 2024 · also on DramaBox / NetShort / DramaWave",
    s:"Leon's father hypnotizes both leads; female lead Annie suffers memory loss and mistaken identity (Leon misidentifies her sister Anna as his destined mate).",
    mec:"Hypnosis / memory erasure",
    flag:"Medium confidence · memory-erasure rather than obedience; minor plot beat",
    src:[["PR Newswire via stocktitan.net","https://www.stocktitan.net/news/MPU/mega-matrix-alpha-wasn-fantasy-romance-ages-2501"],["DramaBox · review page","https://www.dramaboxapp.com/resources/review/2647_alpha-she-wasnt-the-one-chinese-drama-full-movie"],["NetShort · episode page","https://netshort.com/episode/alpha-she-wasnt-the-one-1871119140218376193"]],
    note:"The hypnotist is the male lead's father (family controller). Filed with the caveat that the mechanism is memory erasure rather than compelled obedience.",
    prov:dramaexpressSweepBasis,
    c:["forced-obedience"],
    fog:"villain",
    verticalShort:true
  },
  {
    t:"Pregnant by My Ex's Professor Dad",
    y:"2025",
    f:"tv",
    m:"Short-form vertical drama · English · ReelShort · 60–100+ episodes · IMDb release 2025-06-13 · cast: Tess Dinerstein (Emily), Jesse Morales (Charles)",
    s:"Emily catches her boyfriend cheating, has a one-night stand with Charles, then discovers he is her new professor and her ex's father; she becomes pregnant; the secret relationship collides with careers and family confrontations.",
    mec:"Pregnancy follows one-night stand with ex's father",
    flag:"High confidence",
    src:[["IMDb tt37374448","https://www.imdb.com/title/tt37374448"],["md-eksperiment.org · plot guide","https://md-eksperiment.org/en/post/20260331-pregnant-by-my-exs-professor-dad-2026-short-drama-plot-summary-and-watching-options"],["ReelShort · official pages (~122.9M views)","https://www.reelshort.com"]],
    prov:dramaexpressSweepBasis,
    c:["agegap-marriage"],
    verticalShort:true
  },
  {
    t:"Pregnant by My Ex's Dad",
    y:"c. 2024",
    f:"tv",
    m:"Short-form vertical drama · English · ReelShort · episode count unconfirmed",
    s:"Surgical resident Lucia throws herself into work under supervisor Dr. Sawyer Campbell — 'ruthless renowned surgeon, surprise baby daddy, and worst of all… her ex's dad.'",
    mec:"Pregnancy by supervisor who is the ex's father",
    flag:"Medium confidence · no independent third-party record",
    src:[["ReelShort · official pages (67M views)","https://www.reelshort.com"]],
    prov:dramaexpressSweepBasis,
    c:["agegap-marriage"],
    verticalShort:true
  },
  {
    t:"Flash Marriage Turns Out to Be a Doting Crocodile",
    y:"2025",
    f:"tv",
    m:"Chinese vertical drama · Mandarin · platform unverified",
    s:"Zhao Xiaoya (20), jilted at her wedding, flash-marries stranger Fu Zhengting (39) — who turns out to be her ex-fiancé's father; she becomes pregnant with twins.",
    mec:"Flash marriage to ex-fiancé's father; twin pregnancy",
    flag:"Medium confidence · platform unverified",
    src:[["globalgranary.life review (2025-10-15)","https://www.globalgranary.life/2025/10/15/flash-marriage-turns-out-to-be-a-doting-crocodile-c-vertical-drama-review-summary/"]],
    prov:dramaexpressSweepBasis,
    c:["agegap-marriage"],
    verticalShort:true
  },
  {
    t:"七年难孕，再婚后她一胎双宝",
    sub:"Seven Years Infertile, Twins After Remarriage",
    y:"c. 2026",
    f:"tv",
    m:"Short-form vertical drama · Mandarin (English dub on licensing channel) · FlickReels",
    s:"Xu Qin, divorced after 7 childless years, flash-marries a rumored-infertile hospital director's son; pregnant with twins 3 months in; love develops.",
    mec:"Twin pregnancy 3 months after flash remarriage",
    flag:"Medium confidence · BORDERLINE/VARIANT — she was not a mother before the remarriage (divorced after 7 infertile years)",
    src:[["BrokenTiara Drama · licensed YouTube upload","https://www.youtube.com/watch?v=Vp_lycfuajI"]],
    note:"Explicit scope caveat: filed as a borderline/variant of 'single mom remarries and gets pregnant' because Xu Qin had no children before the remarriage; she does not satisfy the prior-motherhood criterion.",
    prov:dramaexpressSweepBasis,
    c:["mom-pregnancy","family"],
    verticalShort:true
  },
  {
    t:"寒途向新生",
    sub:"Cold Journey, New Birth",
    y:"Year unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · Mandarin · platform unverified",
    s:"Per a single commentary-channel source: pregnant Tong Yang is abandoned, aborts, divorces, later remarries and has a son.",
    mec:"Remarriage and son after abandonment/abortion — unverified",
    flag:"Low confidence · UNRESOLVED LEAD — plot unconfirmed; single commentary-channel source; not counted as verified",
    src:[["YouTube · commentary-channel synopsis","https://www.youtube.com/watch?v=5Nh8byw3njE"]],
    note:"Plot unconfirmed; filed only as a labeled lead.",
    prov:dramaexpressSweepBasis,
    c:["mom-pregnancy","family"],
    verticalShort:true
  },
  {
    t:"My Don Missed My Last Chance to Be a Mother",
    y:"Year unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · dramaexpress.net · 25 episodes",
    s:"Title-only lead: no synopsis exists anywhere after four targeted searches.",
    mec:"Unverified",
    flag:"Low confidence · UNRESOLVED LEAD — title only, no plot evidence; not counted as verified",
    src:[["dramaexpress.net listing","https://dramaexpress.net/"]],
    note:"No synopsis located; retained as a title-only lead.",
    prov:dramaexpressSweepBasis,
    c:["mom-pregnancy"],
    verticalShort:true
  },
  {
    t:"A Lover's Trap",
    y:"Year unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · dramaexpress.net / JoyReels · 87 episodes",
    s:"No confirmed synopsis for the JoyReels version; the same-titled Chinese drama is a fake-contract revenge romance with no hypnosis.",
    mec:"Unverified",
    flag:"Low confidence · UNRESOLVED LEAD — plot unconfirmed; not counted as verified",
    src:[["dramaexpress.net listing","https://dramaexpress.net/"]],
    note:"The JoyReels version's plot is unconfirmed; filed only as a labeled lead.",
    prov:dramaexpressSweepBasis,
    c:["forced-obedience"],
    fog:"lead",
    verticalShort:true
  }
];

let dramaexpressHypnosisPregnancyNetNew=0;
let dramaexpressHypnosisPregnancyMerged=0;
dramaexpressHypnosisPregnancyRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t&&entry.y===row.y);
  if(existing){
    Object.assign(existing,row,{c:[...new Set([...(existing.c||[]),...row.c])]});
    dramaexpressHypnosisPregnancyMerged++;
  }else{
    entries.push(row);
    dramaexpressHypnosisPregnancyNetNew++;
  }
});
console.info(`dramaexpress-hypnosis-pregnancy: net-new rows=${dramaexpressHypnosisPregnancyNetNew}, merged=${dramaexpressHypnosisPregnancyMerged}`);
