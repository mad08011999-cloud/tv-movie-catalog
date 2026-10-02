// 1 Oct 2026 visibly-pregnant-hypnosis worldwide sweep fold-in.
// Loaded after all prior catalog sources: enrich existing memberships first,
// then add only the two records confirmed as net-new.
const visiblePregnancyHypnosisSweepBasis = "Worldwide visibly-pregnant-hypnosis sweep completed 1 Oct 2026; five regional vectors and roughly 350 combined search rounds. Existing records were reconciled before these two net-new adult-animation variants were added.";

{
  const ultrasound = entries.find(entry => entry.t === "Ultrasound" && entry.y === "2021");
  if (ultrasound) {
    ultrasound.psg = "hired";
    ultrasound.strictCh = "Katie (Rainey Qualley)";
    ultrasound.strictMec = "Hired third party / scientist · ultrasound-frequency hypnosis";
    ultrasound.strictFlag = "High confidence · literal pregnancy-era hypnosis · visibly pregnant";
    ultrasound.strictS = "Katie is visibly pregnant while Art (Bob Stephenson), a scientist and stage hypnotist hired by aspiring senator Alex Harris, uses ultrasound frequencies and hypnotic suggestion to keep her unaware of the pregnancy and compliant until delivery. The senator's child is intended to be given away.";
    ultrasound.strictSrc = [
      ["Wikipedia · plot", "https://en.wikipedia.org/wiki/Ultrasound_(film)"],
      ["RogerEbert.com", "https://www.rogerebert.com/reviews/ultrasound-movie-review-2022"],
      ["This Is Barry · explainer", "https://www.thisisbarry.com/film/ultrasound-movie-explained-plot-and-ending/"]
    ];
    ultrasound.strictProv = "Wikipedia states that Harris hired Art to prevent Katie from realizing she is pregnant; RogerEbert.com and This Is Barry corroborate the hypnosis-and-pregnancy plot. IMDb was also checked in the sweep.";
  }
}

{
  const caminhos = entries.find(entry => entry.t === "Caminhos do Coração" && entry.y === "2007–08");
  if (caminhos) {
    caminhos.psg = "partner";
    caminhos.strictCh = "Amália Fortunato (Mônica Carvalho)";
    caminhos.strictMec = "Literal hypnosis by partner / ex-boyfriend Rodrigo";
    caminhos.strictFlag = "Medium confidence · simultaneity high · visibility arc-inferred";
    caminhos.strictS = "Amália Fortunato is pregnant by Rodrigo with sextuplets when he hypnotizes her: chapter 147 places the hypnosis in the same scene as her pregnancy announcement; he hypnotizes her again around chapter 175 and in chapter 191, ordering, “Olha bem nos meus olhos. Agora você vai me contar todas as novidades da Progênese.” The pregnancy-control simultaneity is high confidence; visibility is inferred from the four-month sextuplet arc and a production still because no guide explicitly describes the prosthetic belly in those hypnosis chapters.";
    caminhos.strictSrc = [
      ["Amo Novelas · chapters 141–150", "https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-141-a-150-da-novela-da-record/"],
      ["Amo Novelas · chapters 171–180", "https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-171-a-180-da-novela-da-record/"],
      ["Amo Novelas · chapters 191–200", "https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-191-a-200-da-novela-da-record/"],
      ["Observatório da TV", "https://observatoriodatv.com.br/noticias/gor-hipnotiza-equipe-da-progenese-em-caminhos-do-coracao"]
    ];
    caminhos.strictProv = "Amo Novelas and Observatório da TV were independently re-checked. Correction: chapter 147's hypnosis occurs in the same scene as Amália's pregnancy announcement, replacing the earlier pre-pregnancy timing note.";
  }
}

{
  const prevenge = entries.find(entry => entry.t === "Prevenge" && String(entry.y).startsWith("2016"));
  if (prevenge) {
    prevenge.c = [...new Set([...(prevenge.c || []), "pregnant-variants"])];
    prevenge.pvg = "fetal";
    prevenge.variantCh = "Ruth (Alice Lowe)";
    prevenge.variantMec = "Fetal / psychic-control variant";
    prevenge.variantFlag = "Medium confidence · ambiguous fetal control / pre-partum psychosis";
    prevenge.variantS = "Ruth, a widow seven months pregnant, believes her unborn baby speaks to her from the womb and coaches her through a killing spree. Alice Lowe was genuinely seven months pregnant during the shoot; sources consistently frame Ruth as believing she is guided, leaving the control ambiguous between an agentic fetal voice and pre-partum psychosis.";
    prevenge.variantSrc = [
      ["Wikipedia", "https://en.wikipedia.org/wiki/Prevenge"],
      ["Slashfilm", "https://www.slashfilm.com/548295/prevenge-trailer/"],
      ["Bloody Disgusting", "https://bloody-disgusting.com/movie/3421279/uk-gives-birth-prevenge-poster/"],
      ["Chortle", "http://www.chortle.co.uk/review/2016/10/17/26024/prevenge"]
    ];
    prevenge.variantProv = "Visibly-pregnant-hypnotized worldwide sweep, 1 Oct 2026.";
  }
}

[
  {
    t:"Gitai Saimin",
    sub:"擬態催眠",
    y:"2011",
    f:"tv",
    m:"Adult anime OVA · Japan · Japanese · Vanilla label",
    c:["pregnant-variants"],
    pvg:"adult",
    ch:"Hitomi, Reina and Fumiko",
    mec:"Parasitic-alien brainwave hypnosis",
    flag:"Low-medium confidence · explicit adult animation · anime pregnancy arcs unconfirmed",
    s:"Student Shinta uses a parasitic alien's brainwave hypnosis. In the 2010 adult game's routes, Hitomi, Reina and Fumiko become pregnant and remain under his control; Reina and Fumiko continue the relationship after becoming pregnant.",
    note:"Adult anime based on an adult game. The game's pregnancy-and-control content is high-confirmed; depiction of those pregnancy arcs in the anime is unconfirmed.",
    src:[["Japanese Wikipedia · 催眠シリーズ", "http://ja.wikipedia.org/wiki/%E5%82%AC%E7%9C%A0%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA_(%E3%82%A2%E3%83%80%E3%83%AB%E3%83%88%E3%82%B2%E3%83%BC%E3%83%A0)"]],
    prov:visiblePregnancyHypnosisSweepBasis
  },
  {
    t:"Saimin Class",
    sub:"催眠クラス 〜女子全員、知らないうちに妊娠してました〜",
    y:"2016–2017",
    f:"tv",
    m:"Adult anime OVA · Japan · Japanese · Queen Bee · 2 episodes",
    c:["pregnant-variants"],
    pvg:"adult",
    ch:"Amamiya Akira, Natsu, Mashiro and Sakura",
    mec:"Hypnosis lighter · memory erasure",
    flag:"Low-medium confidence · explicit adult animation · pregnancy twist",
    s:"Student Sumino Daichi uses a mysterious hypnosis lighter on teacher Amamiya Akira and classmates Natsu, Mashiro and Sakura, and erases their memories of the incidents. The women later discover that they are pregnant.",
    note:"Adult anime. Pregnancy is the twist discovery, with early symptoms in episode 2; a visible baby bump is not established.",
    src:[
      ["aniSearch", "https://www.anisearch.com/anime/11904,saimin-class-joshi-zenin-shiranai-uchi-ni-ninshin-shitemashita"],
      ["Hentai Club · episode 2 review", "https://hentaiclub.site/2026/03/29/saimin-class-joshi-zenin-shiranai-uchi-ni-ninshin-shitemashita-episode-2-review-queen-bee-consensual-hypnosis-harem-with-english-subtitles/"]
    ],
    prov:visiblePregnancyHypnosisSweepBasis
  }
].forEach(row => {
  if (!entries.some(entry => entry.t === row.t && String(entry.y) === String(row.y))) entries.push(row);
});
