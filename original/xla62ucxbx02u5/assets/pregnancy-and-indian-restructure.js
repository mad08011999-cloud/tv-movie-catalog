// 30 Sep 2026 category restructure: strict pregnancy-era will-override,
// pregnancy/control variants, and a dedicated Indian-language non-pregnant view.
// Loaded after the catalog and all previous membership grants so records can be
// moved without duplication.
const restructureSweepBasis = "Combined worldwide and Indian-language pregnancy-control sweep completed 30 Sep 2026; every title was checked against the loaded catalog before category assignment.";

function moveToCategory(entry, category) {
  if (!entry) return;
  entry.c = [...new Set([...(entry.c || []).filter(key => key !== "pregnant"), category])];
}
function addStrictPregnancy(match, group, update = {}) {
  const entry = entries.find(match);
  if (!entry) return;
  moveToCategory(entry, "pregnant-strict");
  entry.psg = group;
  entry.strictS = update.s || entry.s;
  entry.strictMec = update.mec || entry.mec;
  entry.strictFlag = update.flag || entry.flag;
  entry.strictSrc = update.src || entry.src;
  entry.strictCh = update.ch || entry.ch;
  entry.strictProv = update.prov || entry.prov || restructureSweepBasis;
}
function addPregnancyVariant(match, group, update = {}) {
  const entry = entries.find(match);
  if (!entry) return;
  moveToCategory(entry, "pregnant-variants");
  entry.pvg = group;
  entry.variantS = update.s || entry.s;
  entry.variantMec = update.mec || entry.mec;
  entry.variantFlag = update.flag || entry.flag;
  entry.variantSrc = update.src || entry.src;
  entry.variantCh = update.ch || entry.ch;
  entry.variantProv = update.prov || entry.prov || restructureSweepBasis;
}

// Strict core: the woman's will is overridden while pregnancy is ongoing.
addStrictPregnancy(entry => entry.t === "Jessica Jones" && entry.y === "2015", "villain");
addStrictPregnancy(entry => entry.t === "Black Magic Part 2" && entry.y === "1976", "villain");
addStrictPregnancy(entry => entry.t === "Caminhos do Coração" && entry.y === "2007–08", "villain", {
  ch:"Amália",
  mec:"Literal hypnosis by Rodrigo during the Amália pregnancy arc",
  flag:"Medium confidence · borderline-strict · pregnancy timing inferred",
  s:"Rodrigo hypnotizes Amália in chapters 147 and 191. Her sextuplet pregnancy is discovered in chapter 198, nine days after the later hypnosis; the short gap strongly supports that she was already pregnant, although the conception timing is not stated outright. The pregnancy results from Dr. Júlia's genetic experiments.",
  src:[["Amo Novelas · chapters 141–150","https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-141-a-150-da-novela-da-record/"],["Amo Novelas · chapters 191–200","https://amonovelas.com.br/novelas/caminhos-do-coracao-resumo-dos-capitulos-191-a-200-da-novela-da-record/"],["Observatório da TV","https://observatoriodatv.com.br/noticias/gor-hipnotiza-equipe-da-progenese-em-caminhos-do-coracao"]]
});
addStrictPregnancy(entry => entry.t === "The Stranger Within" && entry.y === "1974", "medical");
addStrictPregnancy(entry => entry.t === "The Antichrist" && entry.y === "1974", "medical", {
  flag:"High confidence · literal hypnosis · UK DVD 18 · borderline-strict",
  s:"A psychoanalyst hypnotizes Ippolita for past-life regression; the session opens into demonic possession. During the exorcism, the demon reveals that she carries its unborn son, the Antichrist. The film confirms pregnancy during the resulting control, although the hypnosis-to-possession boundary is unusual."
});
addStrictPregnancy(entry => entry.t === "Uzumaki" && entry.y === "2024", "occult");
addStrictPregnancy(entry => entry.t === "O Beijo do Vampiro" && entry.y === "2002–03", "occult", {
  ch:"Ciça",
  mec:"Vampire hypnosis during an ongoing pregnancy",
  flag:"Medium-high confidence · strict · pregnancy timing inferred",
  s:"Victor hypnotizes Ciça in chapters 40, 117 and 152. Her pregnancy is discovered in chapter 157, about one week after the last hypnosis, so she was almost certainly already pregnant during chapter 152. A separate reading is that the chapter-40 hypnotized encounter caused the pregnancy; the father is left ambiguous between Victor and Roger.",
  src:[["Amo Novelas · chapters 121–132","https://amonovelas.com.br/novelas/o-beijo-do-vampiro-resumo-dos-capitulos-121-a-132-da-novela-da-globo/"],["Observatório da TV","https://observatoriodatv.com.br/novelas/resumos/resumo-dos-capitulos-de-o-beijo-do-vampiro-que-vao-ao-ar-nesta-semana-7"],["Wikipedia","https://pt.wikipedia.org/wiki/O_Beijo_do_Vampiro"]]
});
addStrictPregnancy(entry => entry.t === "Ultrasound" && entry.y === "2021", "hired");

// Existing non-strict records from the former combined section.
addPregnancyVariant(entry => entry.t === "Rosemary’s Baby" && entry.y === "1968" && entry.phg === "variant", "possession");
addPregnancyVariant(entry => entry.t === "American Horror Story: Delicate" && entry.y === "2023–24", "possession");
addPregnancyVariant(entry => entry.t === "Alem-i Cin 4" && entry.y === "2023", "possession");
addPregnancyVariant(entry => entry.t === "Aranmanai" && entry.y === "2014", "possession");
addPregnancyVariant(entry => entry.t === "Devi / Abhinetri / Tutak Tutak Tutiya" && entry.y === "2016", "possession");
addPregnancyVariant(entry => entry.t === "Neighbours" && entry.y === "2003" && /4249/.test(entry.sub || ""), "therapeutic");
addPregnancyVariant(entry => entry.t === "Metamorphosis" && entry.y === "1971", "therapeutic");
addPregnancyVariant(entry => entry.t === "Mind Game" && entry.y === "2015", "therapeutic");
addPregnancyVariant(entry => entry.t === "Anything for Jackson" && entry.y === "2020", "fetal");
addPregnancyVariant(entry => entry.t === "Conde Vrolok" && entry.y === "2009–10", "lead");
addPregnancyVariant(entry => entry.t.startsWith("She Never Knew She Was In Love With A Demon"), "lead");

// Membership grant: existing adult-animation record, with category-specific evidence.
addPregnancyVariant(entry => entry.t === "Saimin Seishidou" && /^2019/.test(entry.y), "adult", {
  ch:"Tsubaki and Sakura Miyajima",
  mec:"Hypnosis used under a “pregnancy experience” pretense",
  flag:"Medium confidence · adult / erotic animation · VARIANT: control-causing-pregnancy (not hypnosis-while-pregnant)",
  s:"The franchise describes Sakura Miyajima and her adult mother Tsubaki becoming pregnant under the pretense of a “pregnancy experience.” The OVA's fourth episode uses the mother as an example of the controller's hypnosis success, but the pregnancy detail is clearest in the manga/game material rather than fully verified on-screen.",
  src:[["Japanese Wikipedia","https://ja.wikipedia.org/wiki/催眠性指導"],["MyAnimeList","https://myanimelist.net/anime/42011/Saimin_Seishidou"],["IMDb","https://www.imdb.com/title/tt13757014"]]
});

// Five net-new, deduplicated records from the combined sweep.
[
  {
    t:"Caminhos do Coração — Lúcia arc",y:"2007–08",f:"tv",m:"Telenovela · Brazil · Portuguese · Record TV",c:["pregnant-variants"],pvg:"causing",ch:"Lúcia",mec:"Possible hypnosis-caused pregnancy",flag:"Medium-low confidence · single source · chapter unconfirmed",s:"After a pharmacy test confirms her pregnancy, Lúcia names possible fathers and says, “and Rodrigo hypnotized me, I don't know, we…” The line suggests that a hypnotized encounter may have caused the pregnancy, but the chapter number and exact event remain unconfirmed.",src:[["Observatório da TV","https://observatoriodatv.com.br/noticias/em-caminhos-do-coracao-lucia-conta-para-danilo-que-esta-gravida"]],prov:restructureSweepBasis
  },
  {
    t:"Birth",y:"2022",f:"short",m:"Short film · India · Hindi · Disney+ Hotstar",c:["pregnant-variants"],pvg:"cult",ch:"Meera",mec:"Cult coercion during pregnancy",flag:"Medium-low confidence · borderline variant · no hypnosis or trance term verified",s:"Pregnant Meera enters the Happy Mom maternity centre run by Mama Nithya, falls into a sinister cult's trap and is forced into dark practices. Pregnancy and coercion overlap, but the located sources do not describe literal hypnosis, trance or mind control.",src:[["Glamsham","https://glamsham.com/ott/web-news/shyam-sunders-birth-featuring-shreya-dhanwanthary-and-lillete-dubey-digital-premiere-announced/?noamp=available"],["Hauterrfly","https://hauterrfly.com/entertainment/birth-short-film-trailer-release-shreya-dhanwanthary-lillete-dubey-disney-plus-hotstar/"],["IMDb","https://www.imdb.com/title/tt16297046"]],prov:restructureSweepBasis
  },
  {
    t:"Kyonyuu Hitozuma Onna Kyoushi Saimin",sub:"巨乳人妻女教師催眠",y:"2016",f:"tv",m:"Adult anime OVA · Japan · Japanese · 2 episodes",c:["pregnant-variants"],pvg:"adult",mec:"“Hypnosys app” control of married teachers",flag:"Low-medium confidence · explicit adult animation · VARIANT: control-causing-pregnancy (not hypnosis-while-pregnant)",s:"A protagonist uses a “Hypnosys app” on adult married teachers. Pregnancy, mind-control and impregnation tags support a control-causing-pregnancy reading, but evidence that a woman is hypnotized after pregnancy has begun is not established.",src:[["MyAnimeList review","https://myanimelist.net/reviews.php?id=209286"]],prov:restructureSweepBasis
  },
  {
    t:"Genkaku Cool na Sensei ga Aheboteochi!",sub:"厳格クールな先生がアヘボテオチ!",y:"2015",f:"tv",m:"Adult anime OVA · Japan · Japanese · 2 episodes",c:["pregnant-variants"],pvg:"adult",mec:"Aphrodisiac-drug mind-break",flag:"Low-medium confidence · explicit adult animation · VARIANT: control-causing-pregnancy (not hypnosis-while-pregnant)",s:"A teacher and nurse are subjected to aphrodisiac-drug coercion described by indexes as mind-break or mind control; both are shown pregnant at the ending. The mechanism is drug-induced coercion rather than literal hypnosis.",src:[["MyAnimeList forum","https://myanimelist.net/forum/?topicid=548135"],["Hanime Stream","https://hanime.stream/genkaku-cool-na-sensei-ga-aheboteochi-ep-2/"]],prov:restructureSweepBasis
  },
  {
    t:"Night Shift Nurses",sub:"夜勤病棟",y:"2000–06",f:"tv",m:"Adult anime OVA series · Japan · Japanese",c:["pregnant-variants"],pvg:"adult",ch:"Ren Nanase",mec:"Drug and medical-experimentation control",flag:"Low confidence · explicit adult animation · borderline · VARIANT: control-causing-pregnancy (not hypnosis-while-pregnant)",s:"Adult nurse Ren Nanase, age 22, is found pregnant while under Ryuji's abusive control and experimentation. The same-character overlap is present, but the mechanism is drugs and medical experimentation rather than literal hypnosis.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Night_Shift_Nurses"]],prov:restructureSweepBasis
  }
].forEach(row => {
  if (!entries.some(entry => entry.t === row.t && String(entry.y) === String(row.y))) entries.push(row);
});

// Six unresolved pregnancy-control leads from the same sweep. Reuse existing
// catalog records where possible so the catalog keeps one card per title.
const pregnancyControlLeadRows = [
  {
    match:entry => entry.t === "Anveshitha" && entry.y === "1997–99",
    t:"Anveshitha",y:"1997–99",f:"tv",m:"TV serial · India · Telugu · ETV",pvg:"lead",ch:"Snigdha",mec:"Supernatural torment during pregnancy; will-control unverified",flag:"Low confidence · borderline unresolved lead",s:"Snigdha is pregnant while the Karakinkara witch-cult and Khabees entity terrorize her, but the evidence shows supernatural harassment rather than control of her will.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Anveshitha"]],prov:restructureSweepBasis
  },
  {
    match:entry => entry.t === "Vashikaranam" && entry.y === "2026",
    t:"Vashikaranam",sub:"Kis Par Rakhe Vishwas",y:"2026",f:"tv",m:"TV / OTT series · India · Hindi · Sony / SonyLIV",pvg:"lead",ihg:"lead",mec:"Vashikaran control; pregnant victim unverified",flag:"Low confidence · unresolved lead · still airing at time of sweep",s:"Suman's vashikaran controls villagers, but no episode-level evidence yet identifies a pregnant victim or a specific non-pregnant female victim under that control.",prov:restructureSweepBasis
  },
  {
    match:entry => entry.t === "Naagin" && entry.y === "2015–2016",
    t:"Naagin",sub:"Season 1 · Shivanya pregnancy track",y:"2015–2016",f:"tv",m:"TV soap / fantasy series · India · Hindi · Colors TV",pvg:"lead",ch:"Shivanya",mec:"Pregnancy documented; hypnosis overlap unverified",flag:"Low confidence · unresolved lead",s:"Shivanya's pregnancy is documented, but no source found hypnosis or trance occurring during that pregnancy.",prov:restructureSweepBasis
  },
  {
    match:entry => entry.t === "Aathma" && entry.y === "2019",
    t:"Aathma",y:"2019",f:"tv",m:"Horror anthology series · India · Tamil · ZEE5 · about 31 episodes",pvg:"lead",mec:"Episode-level mechanism undocumented",flag:"Low confidence · unresolved lead · honest-zero caveat",s:"Episode plots are not documented in searchable sources, so no pregnancy-plus-control story can yet be verified.",src:[["Digit Binge","https://www.digit.in/digit-binge/shows/aathma-746007.html"]],prov:restructureSweepBasis
  },
  {
    match:entry => entry.t === "Pisaasu 2" && entry.y === "2026",
    t:"Pisaasu 2",y:"2026",f:"movie",m:"Film · India · Tamil · theatrical release scheduled 2 October 2026",pvg:"lead",mec:"Pre-release plot unverified",flag:"Unresolved watch item · pre-release at time of sweep",s:"The film was still pre-release and its plot was not documented in searchable sources, so pregnancy plus hypnosis or mind control remains unverified.",prov:restructureSweepBasis
  },
  {
    match:entry => entry.t === "Obosheshot" && entry.y === "2017",
    t:"Obosheshot",y:"2017",f:"short",m:"Short film · India · Assamese",pvg:"lead",mec:"Possession-impregnation motif; hypnosis unverified",flag:"Low confidence · unresolved lead",s:"The story has a possession-and-impregnation motif, but no source verifies hypnosis or mind control of a woman while pregnant.",prov:restructureSweepBasis
  }
];
pregnancyControlLeadRows.forEach(row => {
  const existing = entries.find(row.match);
  if (existing) {
    existing.c = [...new Set([...(existing.c || []), "pregnant-variants", ...(row.ihg ? ["indian-female-hypnosis"] : [])])];
    existing.pvg = "lead";
    if (row.ihg) existing.ihg = row.ihg;
    if (row.sub && !existing.sub) existing.sub = row.sub;
    existing.variantS = row.s;
    existing.variantMec = row.mec;
    existing.variantFlag = row.flag;
    existing.variantCh = row.ch;
    existing.variantSrc = row.src || existing.src;
    existing.variantProv = row.prov;
    return;
  }
  const {match, ihg, ...lead} = row;
  entries.push({...lead,c:["pregnant-variants", ...(ihg ? ["indian-female-hypnosis"] : [])],ihg});
});

// Move eight existing Indian-language, non-pregnant records out of the broad
// forced-obedience section and into a dedicated regional category.
const indianNonPregnantMoves = [
  [entry => entry.t === "Bhairava Dweepam" && entry.y === "1994", "south"],
  [entry => entry.t === "Anandabhadram" && entry.y === "2005", "south"],
  [entry => entry.t === "Ishanou" && entry.y === "1990", "south"],
  [entry => entry.t === "Jiji Maa" && entry.y === "2018", "north"],
  [entry => entry.t === "Suhani Si Ek Ladki" && entry.y === "2014–2017", "north"],
  [entry => entry.t === "Ek Tha Raja Ek Thi Rani" && entry.y === "2015–2017", "north"],
  [entry => entry.t === "Jijaji Chhat Per Hain" && entry.y === "2018", "north"],
  [entry => entry.t === "Laal Ishq" && /Preeti–Prem/.test(entry.sub || ""), "north"]
];
indianNonPregnantMoves.forEach(([match, group]) => {
  const entry = entries.find(match);
  if (!entry) return;
  entry.c = [...new Set([...(entry.c || []).filter(key => key !== "forced-obedience"), "indian-female-hypnosis"])];
  entry.ihg = group;
});
