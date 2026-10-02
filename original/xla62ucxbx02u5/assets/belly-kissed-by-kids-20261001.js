// Pregnant-belly kissed or touched by kids — worldwide sweeps filed 1 Oct 2026.
// Round 1: three net-new records and three existing records cross-filed.
// Round 2: one human-character record; animal, animated-animal and animal-puppet findings excluded.
const bellyKissSweepBasis = "Worldwide belly-kissed-or-touched-by-kids sweep completed 1 Oct 2026; five vectors and roughly 100 query rounds across English mainstream, Latin America / EMEA, Asia live action, vertical shorts, and adult / erotic works.";
const bellyKissRoundTwoBasis = "Round-2 deep sweep completed 1 Oct 2026; six research vectors and roughly 155 query rounds. Per the human-character scope refinement, animal, animated-animal and animal-puppet findings were not filed.";

function mergeBellySources(base, additions){
  return [...new Map([...(base || []), ...(additions || [])].map(source => [source[1], source])).values()];
}

function grantBellyCategory(entry, detail){
  entry.c = [...new Set([...(entry.c || []), "belly-kissed"])];
  entry.bellyS = detail.s;
  entry.bellyMec = detail.mec;
  entry.bellyFlag = detail.flag;
  entry.bellyNote = detail.note || "";
  entry.bellySrc = mergeBellySources(entry.src, detail.src);
  entry.bellyCh = detail.ch;
  entry.bellyProv = bellyKissSweepBasis;
}

const panLabyrinth = entries.find(entry =>
  String(entry.y) === "2006" &&
  (entry.t === "Pan's Labyrinth" || entry.t === "Pan's Labyrinth / El laberinto del fauno")
);
if (panLabyrinth) {
  grantBellyCategory(panLabyrinth, {
    ch:"Carmen · daughter Ofelia (~11)",
    mec:"Own child · listens + talks to bump + feels kick",
    flag:"High confidence · screenplay-supported family / fantasy scene",
    s:"Ofelia presses her face to her visibly, advanced-pregnant mother Carmen's belly and tells the unborn baby a story. The baby kicks in response.",
    note:"This scene is filed as non-sexual family warmth; the same title remains a separate near-miss in the stepfather-control research.",
    src:[["Jesuit Centre · Pan's Labyrinth study","https://cdn.prod.website-files.com/62bb300806141fa8a759beb0/6981c5e966c198eae858e0f4_Pan's%20Labyrinth.pdf"]]
  });
}

const lookWhosTalkingToo = entries.find(entry => entry.t === "Look Who's Talking Too" && String(entry.y) === "1990");
if (lookWhosTalkingToo) {
  grantBellyCategory(lookWhosTalkingToo, {
    ch:"Mollie · son Mikey (~4)",
    mec:"Own child · touches bump + feels kicks + talks to baby",
    flag:"High confidence · script-dialogue verified",
    s:"Mollie places her young son Mikey's hand on her belly so he can feel baby sister Julie kicking. Mikey then suggests playing the baby a song.",
    src:[["Scripts.com · script transcript","https://www.scripts.com/script/look_who's_talking_too_12795/2"]]
  });
}

const parenthoodKristina = entries.find(entry =>
  entry.t === "Parenthood" && String(entry.y) === "2011" && String(entry.sub || "").includes("Kristina / Adam")
);
if (parenthoodKristina) {
  grantBellyCategory(parenthoodKristina, {
    ch:"Kristina · son Max, niece Sydney and nephew Jabbar",
    mec:"Own child + niece + nephew · touch bump + feel kicks",
    flag:"High confidence · episode transcript verified",
    s:"In S3E1, Kristina feels the baby kick and Adam calls over son Max, niece Sydney and nephew Jabbar. All three children feel the kick; Jabbar says, “He punched my hand.”",
    note:"A second series instance has Sydney touch the pregnant stomach of the coffee-shop woman, a non-relative whose baby Julia and Joel hope to adopt.",
    src:[["Parenthood S3E1 transcript PDF","https://blog.kakaocdn.net/dn/cmc05O/btsnYZkfM3a/FV6UpkchZPmQHTPZQK24b0/Parenthood%20S03E01.pdf?attach=1&knm=tfile.pdf"],["The A.V. Club · Parenthood ‘Nora’ recap","https://www.avclub.com/parenthood-nora-1798169965"]]
  });
}

const bellyKissRows = [
  {
    t:"Kim Possible: A Sitch in Time", y:"2003", f:"movie",
    m:"Animated Disney Channel TV movie · United States · English",
    c:["mom-pregnancy","belly-kissed"], ch:"Ann Possible · toddler daughter Kim",
    mec:"Own child · touches bump + feels kick",
    flag:"High confidence · transcript verified",
    s:"Toddler Kim rests her hand on her visibly pregnant mother Ann's stomach and exclaims, “Ooh! I felt my baby sister kick!”",
    src:[["KP Fan World · transcript","https://kpfanworld.com/Guides/a-sitch-in-time-past-2/Transcript"]],
    prov:bellyKissSweepBasis
  },
  {
    t:"A Separation", sub:"Jodái-e Náder az Simin", y:"2011", f:"movie",
    m:"Feature film · Iran · Persian",
    c:["belly-kissed"], ch:"Razieh · daughter Somayeh",
    mec:"Own child · listens to bump + feels movement",
    flag:"Medium-high confidence · professional-review verified",
    s:"Razieh holds her young daughter Somayeh to her stomach; Somayeh smiles delightedly as she hears the baby moving inside.",
    note:"Visibility caveat: Razieh's pregnancy is mostly concealed beneath flowing garments rather than shown as a bare bump, though it is advanced enough for Somayeh to hear or feel movement.",
    src:[["The Playlist · review","https://theplaylist.net/review-a-separation-is-a-wrenching-portrait-of-duty-love-deep-irreconcilable-divisions-20111227/"]],
    prov:bellyKissSweepBasis
  },
  {
    t:"Đuổi Tôi Đi, Giờ Đòi Nhận Con?", sub:"NetShort · 30 episodes", y:"c. 2024–26", f:"tv",
    m:"Vertical short series · NetShort · Vietnamese dub",
    c:["belly-kissed"], ch:"Pregnant woman · young boy (relationship unconfirmed)",
    mec:"Kid identity unknown, presumed son · kiss + hands on bump",
    flag:"Medium confidence · official episode art; in-episode confirmation pending",
    s:"Official NetShort episode-30 art shows a young boy with a hand on, and his face pressed to, a visibly pregnant woman's bump.",
    note:"The episode art may be promotional rather than a direct episode still. The original or English title is not yet identified, and the boy's relationship to the woman remains unconfirmed.",
    src:[["DramaExpress · Vietnamese 30-episode listing","https://dramaexpress.net/vi/series/uoi-toi-i-gio-oi-nhan-con/episode-30"]],
    prov:bellyKissSweepBasis,
    verticalShort:true
  },
  {
    t:"Shang-Chi and the Legend of the Ten Rings", y:"2021", f:"movie",
    m:"Feature film · United States · English",
    c:["belly-kissed"], ch:"Ying Li · own son, young Shang-Chi",
    mec:"Own child · mother rests child against bump",
    flag:"Medium confidence · fan-curated scene references",
    s:"In one of Shang-Chi's flashback memories, his mother Ying Li rests young Shang-Chi on her pregnant stomach to introduce him to his sister Xialing.",
    note:"Memory / flashback scene. The scene is documented only by fan-curated trope pages; visibility of the pregnancy in the shot remains unconfirmed beyond those entries.",
    prov:bellyKissRoundTwoBasis
  }
];

let bellyKissNetNew = 0;
let bellyKissMerged = 0;
bellyKissRows.forEach(row => {
  const existing = entries.find(entry => entry.t === row.t && String(entry.y) === String(row.y));
  if (existing) {
    Object.assign(existing, row, {c:[...new Set([...(existing.c || []), ...row.c])]});
    bellyKissMerged++;
  } else {
    entries.push(row);
    bellyKissNetNew++;
  }
});

const netShortBelly = entries.find(entry => entry.t === "Đuổi Tôi Đi, Giờ Đòi Nhận Con?" && String(entry.y) === "c. 2024–26");
if (netShortBelly) {
  netShortBelly.ch = "Elowen Thorne · own son Elian";
  netShortBelly.mec = "Own child · kiss + hands on bump";
  netShortBelly.flag = "Medium confidence · official EP30 thumbnail; in-episode confirmation pending";
  netShortBelly.s = "In this 30-episode, Vietnamese-dubbed NetShort werewolf romance, Elowen Thorne is cast out of Rourke castle after being falsely accused of drugging pure-blood patriarch Kaelen Rourke. She flees secretly pregnant and raises their genius son Elian in hiding. Official episode-30 art shows Elian with a hand on, and his face pressed to, Elowen's visibly pregnant-again bump.";
  netShortBelly.note = "The original English or Chinese title remains unidentified. The EP30 belly beat was re-confirmed by visual inspection of an official CDN thumbnail, but it may be promotional rather than an in-episode still. Cross-topic observation: the thumbnail suggests Elowen is pregnant again, a possible mother-pregnancy-again overlap.";
  netShortBelly.prov = `${bellyKissSweepBasis} ${bellyKissRoundTwoBasis}`;
}

console.info(`belly-kissed-by-kids: net-new rows=${bellyKissNetNew}, merged=${bellyKissMerged}, existing grants=${[panLabyrinth, lookWhosTalkingToo, parenthoodKristina].filter(Boolean).length}, NetShort enriched=${Boolean(netShortBelly)}`);
