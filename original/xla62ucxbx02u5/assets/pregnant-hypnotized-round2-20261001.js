// 1 Oct 2026 round-2 super-deep worldwide pregnancy + hypnosis sweep.
// Loaded last so corrections and category-specific evidence override earlier staging.
const pregnantHypnotizedRound2Basis = "Round-2 super-deep worldwide sweep completed 1 Oct 2026 across seven regional vectors; no net-new strict-core title was verified. Adult / R-rated / erotic plot indexes were included, with remaining access and documentation gaps stated in the catalog notes.";

function mergeRound2Sources(existingSources, newSources) {
  return [...new Map([...(existingSources || []), ...newSources].map(source => [source[1], source])).values()];
}

// Re-identify the existing 1971 lead rather than creating a duplicate record.
{
  const interns = entries.find(entry => entry.t === "Metamorphosis" && String(entry.y) === "1971");
  if (interns) {
    interns.t = "The Interns";
    interns.sub = "S1E17 · “Metamorphosis” · aired 5 Feb 1971";
    interns.f = "tv";
    interns.m = "CBS television-series episode · United States · English";
    interns.c = [...new Set([...(interns.c || []).filter(category => category !== "pregnant"), "pregnant-variants"])];
    interns.pvg = "therapeutic";
    interns.ch = "Jeanne / Jenny (Lois Nettleton)";
    interns.mec = "Diagnostic hypnosis";
    interns.flag = "Unresolved close variant · hypnosis detail single-sourced · no coercive will-override";
    interns.s = "Hospital librarian Jeanne, who has a second personality called Jenny, is confirmed pregnant. An IMDb plot summary says an intense hypnosis session with Dr. Jacoby reveals the answer to the mysterious pregnancy; the episode and pregnancy are corroborated elsewhere, but the hypnosis detail remains single-sourced and diagnostic rather than coercive.";
    interns.src = [
      ["IMDb · hypnosis detail", "https://www.imdb.com/title/tt0765903/"],
      ["Plex · episode synopsis", "https://watch.Plex.tv/show/the-interns/season/1/episode/17"],
      ["CTVA · episode guide", "http://www.ctva.biz/US/Medical/Interns.htm"],
      ["Wikipedia · episode table", "https://en.wikipedia.org/wiki/The_Interns_(TV_series)"],
      ["TheTVDB · episode", "https://thetvdb.com/series/the-interns/episodes/5801"]
    ];
    interns.prov = pregnantHypnotizedRound2Basis;
    interns.variantCh = interns.ch;
    interns.variantMec = interns.mec;
    interns.variantFlag = interns.flag;
    interns.variantS = interns.s;
    interns.variantSrc = interns.src;
    interns.variantProv = interns.prov;
  }
}

// New close variant: the sources describe a threatened takeover, not an executed possession.
if (!entries.some(entry => entry.t === "Don't Turn Around, or You'll Be Sorry" && String(entry.y) === "2000")) {
  entries.push({
    t:"Don't Turn Around, or You'll Be Sorry",
    sub:"唔該借歪 · also listed as Don't Look Back",
    y:"2000",
    f:"movie",
    m:"Film · Hong Kong · Cantonese · dir. Clarence Fok",
    c:["pregnancy-evil", "pregnant-variants"],
    pg:"medium",
    pvg:"possession",
    ch:"Lisa (Anita Yuen)",
    mec:"Attempted ghost possession of a pregnant woman",
    flag:"Close variant · attempted / thwarted takeover · 5 sources",
    s:"Lisa is pregnant when the vengeful ghost of Chan May Ping, who died while pregnant, seeks to take over Lisa's pregnant body for reincarnation. Lisa's mother-in-law Marianne works to save her; the located synopses frame the takeover as an attempted or thwarted threat, not a completed possession.",
    src:[
      ["Mei Ah · extended synopsis", "https://www.youtube.com/watch?v=XIdqlzQHzfM"],
      ["IMDb", "https://www.imdb.com/title/tt0287989"],
      ["TV Guide", "https://www.tvguide.com/movies/dont-turn-around-or-youll-be-sorry/2060187543/"],
      ["FULLTV", "http://www.fulltv.tv/movies/ng-goi-ze-wai.html"],
      ["TheTVDB", "https://thetvdb.plexapp.com/movies/dont-turn-around-or-youll-be-sorry"]
    ],
    prov:pregnantHypnotizedRound2Basis,
    variantCh:"Lisa (Anita Yuen)",
    variantMec:"Attempted ghost possession of a pregnant woman",
    variantFlag:"Close variant · attempted / thwarted takeover · 5 sources",
    variantS:"Lisa is pregnant when the vengeful ghost of Chan May Ping, who died while pregnant, seeks to take over Lisa's pregnant body for reincarnation. Lisa's mother-in-law Marianne works to save her; the located synopses frame the takeover as an attempted or thwarted threat, not a completed possession.",
    variantSrc:[
      ["Mei Ah · extended synopsis", "https://www.youtube.com/watch?v=XIdqlzQHzfM"],
      ["IMDb", "https://www.imdb.com/title/tt0287989"],
      ["TV Guide", "https://www.tvguide.com/movies/dont-turn-around-or-youll-be-sorry/2060187543/"],
      ["FULLTV", "http://www.fulltv.tv/movies/ng-goi-ze-wai.html"],
      ["TheTVDB", "https://thetvdb.plexapp.com/movies/dont-turn-around-or-youll-be-sorry"]
    ],
    variantProv:pregnantHypnotizedRound2Basis
  });
}

// Correct and strengthen the existing Turkish variant.
{
  const alem = entries.find(entry => entry.t === "Alem-i Cin 4" && String(entry.y) === "2023");
  if (alem) {
    const turkishSources = [
      ["ekşi sözlük · Turkish synopsis", "https://eksisozluk.com/alem-i-cin-4--7635298"],
      ["istanbul.net.tr · Turkish synopsis", "https://www.istanbul.net.tr/alem-i-cin-4-alem-i-cin-4-sinema-filmi-7738/amp/"]
    ];
    alem.ch = "İrem (Merve Özel)";
    alem.mec = "Djinn-claimed pregnancy through büyü (magic)";
    alem.flag = "Provisional close variant · pregnancy confirmed · literal will-override unproven";
    alem.s = "İrem's pregnancy is confirmed in two Turkish synopsis sources. Unbeknownst to her, the baby in her womb is said to belong to the djinn because of a spell; the sources do not establish a literal override of İrem's will, so the title remains a provisional close variant rather than strict core.";
    alem.src = mergeRound2Sources(alem.src, turkishSources);
    alem.prov = pregnantHypnotizedRound2Basis;
    alem.variantCh = alem.ch;
    alem.variantMec = alem.mec;
    alem.variantFlag = alem.flag;
    alem.variantS = alem.s;
    alem.variantSrc = alem.src;
    alem.variantProv = alem.prov;
  }
}

// Keep one source link per URL while adding the newly noted corroboration.
{
  const dangerDiva = entries.find(entry => entry.t === "Danger Diva" && String(entry.y) === "2017");
  if (dangerDiva) {
    dangerDiva.src = mergeRound2Sources(dangerDiva.src, [["TV Tropes · corroboration", "https://tvtropes.org/pmwiki/pmwiki.php/Film/DangerDiva"]]);
  }
}

// Correct the adult-animation caveat: this is simulated pregnancy, not a real pregnancy.
{
  const saiminSeishidou = entries.find(entry => entry.t === "Saimin Seishidou" && /^2019/.test(String(entry.y)));
  if (saiminSeishidou) {
    saiminSeishidou.variantCh = "Tsubaki and Sakura Miyajima";
    saiminSeishidou.variantMec = "Hypnotically induced simulated “pregnancy experience”";
    saiminSeishidou.variantFlag = "Adult-animation variant · simulated pregnancy, not a real pregnancy";
    saiminSeishidou.variantS = "Japanese episode-list documentation describes the “pregnancy experience” (妊娠体験指導) as a scenario induced through hypnosis. It is a simulated pregnancy experience rather than an actual pregnancy, so the record remains only as a clearly labeled adult-animation variant.";
    saiminSeishidou.variantSrc = mergeRound2Sources(saiminSeishidou.variantSrc || saiminSeishidou.src, [["Japanese Wikipedia · episode list", "https://ja.wikipedia.org/wiki/催眠性指導"]]);
    saiminSeishidou.variantProv = pregnantHypnotizedRound2Basis;
  }
}
