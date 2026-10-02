/* Hypnotized-to-love / marriage worldwide max sweep — staged 2026-10-01.
 * Eight multilingual vectors (~150 query rounds) covering films, television,
 * soaps, serials, shorts, short-form vertical dramas and adult-audience works.
 * Must load AFTER assets/mirror-import.js. Idempotent: find-or-push on (t, y),
 * with category-specific display fields for the three existing records granted
 * membership in the love section. */

const loveSweepRows=[
  {
    t:"Kiss Me, Even If It Burns",
    y:"None",
    f:"tv",
    m:"Short-form vertical drama series · China-produced · English-language · DramaBox app · ~80–100 episodes × 2–3 min",
    s:"Billionaire boss Dylan Pitt hypnotizes his bodyguard Scarlet Novak, erasing her memories so she will fall in love with him anew. After she faked her death to escape his cruelty, he retrieves her and uses hypnosis to make her a 'blank slate' for a new romance.",
    mec:"Hypnosis (memory erasure)",
    flag:"High-medium · DramaBox official synopsis + Bestie AI recap; year unconfirmed",
    src:[["DramaBox official synopsis","https://www.dramabox.com/tag/"],["Bestie AI plot recap","https://bestieai.app/topics/stories/kiss-me-even-if-it-burns-plot-analysis-recap-ending-explained-spoilers"]],
    note:"Outcome facts: marriage outcome: not married; pregnancy outcome: unknown.",
    prov:"Hypnotized-to-love worldwide max sweep, 01 Oct 2026 (8 vectors including short-form vertical dramas; ~150 query rounds)",
    c:["love"]
  },
  {
    t:"The Brides of Dracula",
    y:"1960",
    f:"movie",
    m:"Film · United Kingdom · English · Hammer Film Productions",
    s:"Baron Meinster hypnotizes Gina 'to make her compliant to his will,' then drains her blood; she rises as his devoted vampire bride, speaking of his 'love' and urging Marianne that they can 'both love him.' Meinster also proposes marriage to Marianne and attempts to hypnotize her at the mill, but Van Helsing interrupts.",
    mec:"Vampiric mesmerism / hypnosis",
    flag:"Medium-high · Wikipedia + Hammer wiki + Alchetron confirm hypnosis-to-bride arc",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/The_Brides_of_Dracula"],["Hammer House of Horror wiki","https://hammerhouseofhorror.fandom.com/wiki/The_Brides_of_Dracula_(1960)"],["Alchetron","https://alchetron.com/The-Brides-of-Dracula"]],
    note:"Outcome facts: marriage is the metaphorical vampire-'bride' bond; Marianne's forced marriage is interrupted. Pregnancy outcome: not pregnant.",
    prov:"Hypnotized-to-love worldwide max sweep, 01 Oct 2026",
    c:["love"]
  },
  {
    t:"Eternally Yours",
    y:"1939",
    f:"movie",
    m:"Film · United States · English",
    s:"Stage magician 'The Great Arturo' schemes to win back his ex-wife Anita through hypnosis plus a death-defying final act.",
    mec:"Stage hypnosis",
    flag:"Low-medium · single synopsis line; reconciliation ending not confirmed",
    src:[["cede.com synopsis","https://www.cede.com/en/movies/eternally-yours-1939-b-w-unrated-10049911"]],
    note:"Outcome facts: hypnosis-to-win-back scheme is the verified plot point; whether the ending confirms reconciliation is unconfirmed. Pregnancy outcome: unknown.",
    prov:"Hypnotized-to-love worldwide max sweep, 01 Oct 2026",
    c:["love"]
  }
];

let loveSweepNetNew=0;
let loveSweepMerged=0;
loveSweepRows.forEach(row=>{
  row.loveSweep=true;
  const existing=entries.find(entry=>entry.t===row.t&&String(entry.y)===String(row.y));
  if(existing){
    const hadLove=(existing.c||[]).includes("love");
    existing.c=[...new Set([...(existing.c||[]),"love"])];
    existing.loveSweep=true;
    existing.loveS=row.s;
    existing.loveMec=row.mec;
    existing.loveFlag=row.flag;
    existing.loveSrc=row.src;
    existing.loveNote=row.note;
    if(!hadLove)loveSweepMerged++;
    return;
  }
  entries.push(row);
  loveSweepNetNew++;
});

function grantLoveCategory(match, detail){
  const entry=entries.find(match);
  if(!entry)return false;
  const hadLove=(entry.c||[]).includes("love");
  entry.c=[...new Set([...(entry.c||[]),"love"])];
  entry.loveSweep=true;
  entry.loveS=detail.s;
  entry.loveMec=detail.mec;
  entry.loveFlag=detail.flag;
  entry.loveSrc=detail.src;
  if(detail.note)entry.loveNote=detail.note;
  return !hadLove;
}

let loveSweepGrants=0;
loveSweepGrants+=grantLoveCategory(
  entry=>entry.t==="The Kiss of the Vampire"&&String(entry.y)==="1963",
  {
    s:"Dr. Ravna hypnotizes and brainwashes newlywed Marianne Harcourt into renouncing her love for husband Gerald and devoting herself to Ravna. This is a love-transfer and cult-devotion plot rather than a new literal marriage.",
    mec:"Vampire-cult mesmerism / brainwashing",
    flag:"High confidence · devotion / love-transfer; no new marriage",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Kiss_of_the_Vampire_(film)"],["Mental Block wiki","https://mentalblock.miraheze.org/wiki/Kiss_Of_The_Vampire_(1963)"]]
  }
)?1:0;
loveSweepGrants+=grantLoveCategory(
  entry=>entry.t==="She Did What He Wanted"&&String(entry.y)==="1971",
  {
    s:"Eddie learns mesmerism and hypnotizes adult housemaid Nora into becoming his 'loving sex slave.' The compelled devotion meets the love prong, but the plot does not involve marriage.",
    mec:"Hypnotic gaze / compelled devotion",
    flag:"High confidence · adult title; devotion only, no marriage",
    src:[["TMDB","https://www.themoviedb.org/movie/619608-she-did-what-he-wanted"]],
    note:"Outcome facts: marriage outcome: not married; pregnancy outcome: unknown."
  }
)?1:0;
loveSweepGrants+=grantLoveCategory(
  entry=>entry.t==="Naagin 3"&&String(entry.y)==="2018–19",
  {
    s:"Shahnawaz hypnotizes protagonist Bela through been (snake-flute) music. She declares that she is marrying her 'true love' Shahnawaz, rejects husband Mahir, signs divorce papers, and reaches a nikah ceremony before Mahir interrupts it.",
    mec:"Supernatural musical hypnosis",
    flag:"High confidence · episode-update verified; forced wedding interrupted",
    src:[["TellyUpdates episode update","https://www.tellyupdates.com/naagin-season-3-15th-september-2018-written-episode-update-shahnawaz-hypnotizes-bela-mahir-and-vish-reach-shahnawazs-cave/amp/"]],
    note:"This love-category reading concerns Bela's September 2018 Shahnawaz arc; the same catalog record also covers Vish's separate 2019 controlled-pregnancy arc."
  }
)?1:0;

console.info(`hypnotized-to-love-20261001: net-new rows=${loveSweepNetNew}, grants=${loveSweepGrants+loveSweepMerged}`);
