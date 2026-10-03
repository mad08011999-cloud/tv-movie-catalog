// 2–3 Oct 2026 worldwide vertical-short and adult/R-rated pregnancy-hypnosis sweep.
// Five catalog updates from six reported candidates: one existing record gains
// strict literal-hypnosis evidence, while four new possession, haunting,
// black-magic or unresolved-variant records are added. The Nigeria title
// Ezedike is held outside the catalog because its pregnant women appear to be
// agents rather than controlled victims.
const verticalPregnantHypnosisSweepBasis = "Worldwide vertical-short and adult/R-rated pregnancy-hypnosis sweep completed 2–3 Oct 2026 across 110 query rounds in 13+ languages. No verified vertical-short, hypno-intimacy or adult/R-rated title was found; five supported catalog updates are retained, with source and confidence limits stated per card, while Ezedike is held outside the catalog pending evidence of a pregnant controlled victim.";

function mergePregnantHypnosisSources(existingSources, newSources) {
  return [...new Map([...(existingSources || []), ...(newSources || [])].map(source => [source[1], source])).values()];
}

// Upgrade the existing Inang card with the coordinator's literal-hypnosis evidence.
{
  const inang = entries.find(entry => (entry.t === "The Womb" || entry.t === "The Womb / Inang") && String(entry.y) === "2022");
  if (inang) {
    const strictSources = [
      ["DMTalkies · ending explainer", "https://dmtalkies.com/the-womb-inang-ending-explained-2023-netflix-indonesian-horror-film/"],
      ["High On Films · ending explainer", "https://www.highonfilms.com/the-womb-inag-movie-ending-explained/"],
      ["Wikipedia", "https://en.wikipedia.org/wiki/The_Womb"]
    ];
    inang.t = "The Womb / Inang";
    inang.sub = "Netflix release 16 Feb 2023 · dir. Fajar Nugros";
    inang.m = "Film · Indonesia · Indonesian · theatrical / Netflix";
    inang.c = [...new Set([...(inang.c || []), "pregnant-strict"])];
    inang.psg = "villain";
    inang.ch = "Wulan";
    inang.mec = "Literal hypnosis during pregnancy";
    inang.flag = "Medium confidence · strict pregnancy-era hypnosis · two independent plot sources";
    inang.s = "Pregnant Wulan, living with the Santoso couple who plan to sacrifice her and her child in a ritual, tries to tell Eva that she wants to leave. Eva hypnotizes Wulan into agreeing to stay and leave only after her delivery, directly overlapping pregnancy and literal hypnosis.";
    inang.src = mergePregnantHypnosisSources(inang.src, strictSources);
    inang.prov = verticalPregnantHypnosisSweepBasis;
    inang.strictCh = inang.ch;
    inang.strictMec = inang.mec;
    inang.strictFlag = inang.flag;
    inang.strictS = inang.s;
    inang.strictSrc = inang.src;
    inang.strictProv = inang.prov;
  }
}

const verticalPregnantHypnosisRows = [
  {
    t:"Djinn", y:"2013", f:"movie", m:"Film · UAE · Arabic / English · theatrical / VOD / DVD", c:["pregnant-variants"], pvg:"possession", ch:"Aisha (Aiysha Hart)",
    mec:"Djinn illusion / possession targeting a pregnant woman", flag:"Medium confidence · broader supernatural-control variant · not literal hypnosis",
    s:"After a young Emirati couple returns to the UAE following the loss of an infant, pregnant Aisha is targeted by a malevolent djinn. The entity torments the household through illusions of loved ones and metamorphoses, exploiting her maternal vulnerability; the evidence supports a possession/illusion variant rather than literal hypnosis.",
    src:[["Dyerbolical · plot essay","https://dyerbolical.com/unleashing-desert-nightmares-the-chilling-grip-of-djinn-2013/"],["JoBlo · synopsis","https://www.joblo.com/tobe-hoopers-djinn-may-get-a-dvd-release-in-november-289/amp/"]],
    prov:verticalPregnantHypnosisSweepBasis
  },
  {
    t:"Alkarısı Cinnet", y:"2015", f:"movie", m:"Film · Turkey · Turkish · theatrical / YouTube full film", c:["pregnant-variants"], pvg:"possession", ch:"Dilara",
    mec:"Alkarısı / jinn haunting during pregnancy", flag:"Medium confidence · supernatural haunting variant · will-override unverified",
    s:"Seven-months-pregnant Dilara suffers nightmares and haunting by the Alkarısı, an Anatolian folklore entity associated with women around childbirth. The pregnancy overlap is supported, but the located source does not establish hypnosis or a coercive override of her will.",
    src:[["Fanatik Film · official full-film listing","https://www.youtube.com/watch?v=U_jibdCFl-M"]],
    prov:verticalPregnantHypnosisSweepBasis
  },
  {
    t:"Cin Azabı", y:"Year unverified", f:"movie", m:"Feature film · Turkey · Turkish · YouTube 4K full upload", c:["pregnant-variants"], pvg:"lead", ch:"Zeynep",
    mec:"Djinn infestation / haunting of a pregnant woman", flag:"Low confidence · unresolved lead · year unverified · single weak source",
    s:"Pregnant Zeynep is moved to her mother-in-law's village house before giving birth. The house is infested by djinn, and her mother-in-law warns that leaving a pregnant woman alone lets djinn harm mother and baby; hypnosis or a will-override is not confirmed.",
    src:[["Onur Aldoğan · full-film listing","https://www.youtube.com/watch?v=O1AofMSPFsI"]],
    prov:verticalPregnantHypnosisSweepBasis
  },
  {
    t:"سحر أسود (Sehr El Aswad)", y:"2025", f:"tv", m:"TV series · Iraq · Arabic · Dijlah TV · 30 episodes", c:["pregnant-variants"], pvg:"lead",
    mec:"Black-magic series theme; pregnant victim unverified", flag:"Low confidence · unresolved lead · pregnancy element unverified",
    s:"This Iraqi social drama has episode descriptions that reference black magic, but no pregnant woman under hypnosis or mind control has been confirmed. The series identity is supported; the pregnancy-and-control overlap remains an open question.",
    src:[["Dijlah TV · episode video","https://youtube.com/watch?v=2oJZ4LZN6ME&si=-Jt61-M8fzDkMMZt"]],
    prov:verticalPregnantHypnosisSweepBasis
  }
];

verticalPregnantHypnosisRows.forEach(row => {
  if (!entries.some(entry => entry.t === row.t && String(entry.y) === String(row.y))) entries.push(row);
});
