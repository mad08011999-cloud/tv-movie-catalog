const pregnantHypnotizedSweepBasis = "Worldwide multilingual indexed sweep completed 30 Sep 2026; adult-video plot-index follow-up found no net-new verified narrative title.";
function addPregnantMembership(entry, group, update) {
  if (!entry) return;
  if (!entry.c.includes("pregnant")) entry.c.push("pregnant");
  entry.phg = group;
  if (update.ch) entry.ch = update.ch;
  if (update.s) entry.s = update.s;
  if (update.mec) entry.mec = update.mec;
  if (update.flag) entry.flag = update.flag;
  if (update.src) {
    const sources = [...(entry.src || []), ...update.src];
    entry.src = [...new Map(sources.map(source => [source[1], source])).values()];
  }
  entry.prov = update.prov || pregnantHypnotizedSweepBasis;
}

addPregnantMembership(
  entries.find(entry => entry.t === "The Stranger Within" && entry.y === "1974"),
  "doctor",
  {prov:"Existing catalog record retained in the expanded category; plot evidence remains synopsis-level."}
);
addPregnantMembership(
  entries.find(entry => entry.t === "Rosemary’s Baby" && entry.y === "1968"),
  "variant",
  {prov:"Existing catalog record retained as a drug-induced dream-state and reproductive-coercion variant."}
);
addPregnantMembership(
  entries.find(entry => entry.t === "American Horror Story: Delicate" && entry.y === "2023–24"),
  "occult",
  {prov:"Existing catalog record retained as a supernatural-trance case rather than clinical hypnosis."}
);
addPregnantMembership(
  entries.find(entry => entry.t === "Jessica Jones" && entry.y === "2015"),
  "villain",
  {
    ch:"Hope Shlottman",
    mec:"Sci-fi mind control by a villain",
    flag:"High confidence · existing record enriched",
    s:"Kilgrave's power overrides adult Hope Shlottman's will. The pregnancy results from assault while she is under his control; she discovers it in S1E6, “AKA You're a Winner!”, while still effectively his captive.",
    prov:"Six-source Western sweep: Marvel season refresher, Marvel Cinematic Universe Wiki, Gizmodo, Rewire News Group and Bustle; exact URLs were not preserved in the coordinator report."
  }
);
addPregnantMembership(
  entries.find(entry => entry.t === "Black Magic Part 2" && entry.y === "1976"),
  "villain",
  {
    ch:"The doctor's adult wife",
    mec:"Evil wizard's love-potion sorcery",
    flag:"High confidence · existing record enriched",
    s:"An evil wizard's sorcery makes a doctor's adult wife his thrall; the regional sweep found that she is pregnant while under his control. A Shaw Brothers release booklet independently corroborates the love-potion control mechanism.",
    src:[["Shaw Brothers release booklet","http://mvd.cloud/press/AV655/specialedition2512.pdf"]],
    prov:"Pregnancy overlap verified in the East Asia two-source sweep; control mechanism independently corroborated by the linked release booklet."
  }
);
addPregnantMembership(
  entries.find(entry => entry.t === "Neighbours" && entry.y === "2003" && (entry.sub || "").includes("4249")),
  "doctor",
  {
    ch:"Lyn Scully · pregnant with Oscar",
    mec:"Therapeutic / diagnostic hypnosis",
    flag:"Close variant · pregnancy and hypnosis overlap · no coercive will-override",
    s:"Dr. Darcy Tyler hypnotizes married, pregnant Lyn after an accident. While under his thrall she recalls repressed childhood memories; the session is therapeutic or diagnostic rather than a coercive override of her will.",
    src:[["Perfect Blend · review","http://perfectblend.net/comment/week25.htm"],["Perfect Blend · Darcy Tyler","http://perfectblend.net/comment/ltn-darcy.htm"]]
  }
);

entries.push(
  {
    t:"Uzumaki",sub:"Episode 3 · anime television series",y:"2024",f:"tv",m:"Anime TV episode · Japan · Japanese · Adult Swim / Max",c:["pregnant","occult"],phg:"occult",ch:"Pregnant patients at Kurouzu Hospital, including Keiko",mec:"Spiral-curse mosquito trance",flag:"High confidence · occult / devil-category boundary",s:"Pregnant hospital patients are driven by the spiral curse, transmitted through mosquito bites, into a bloodthirsty trance: at night they roam with drills, attack sleeping patients and hunt witnesses. The curse is occult, but it is not framed as the devil.",src:[["Anime News Network","https://www.animenewsnetwork.com/cms/.216778"],["HBO Max · Episode 3","https://www.hbomax.com/show/f3ba329b-1089-44bc-a844-6177fa69930e/s1/e3-episode-3/53268757-6b9d-4cfd-8a20-7f9e288d3fb4"],["The Review Geek","https://www.thereviewgeek.com/uzumaki-s1e3review/"],["Sportskeeda","https://www.sportskeeda.com/anime/uzumaki-episode-3-kirie-s-family-gets-cursed-spiral-demise-kurouzu-village-starts"]],prov:"The research report treated this as a membership grant, but the catalog contained only the separate 2000 film; the 2024 episode is therefore retained as its own record."
  },
  {
    t:"Alem-i Cin 4",y:"2023",f:"movie",m:"Film · Turkey · Turkish",c:["pregnant","pregnancy-evil"],phg:"variant",pg:"medium",ch:"Ipek",mec:"Djinn / black-magic pregnancy overlap",flag:"Provisional close variant · will-override unproven · pregnancy needs Turkish-source confirmation",s:"The regional sweep reports that Ipek experiences a pregnancy overlapping djinn or black-magic influence. Independent English-language checks confirmed only the film's basic identity and nightmare premise, not the pregnancy or a literal override of her will.",src:[["Moviefone","https://www.moviefone.com/movie/alem-i-cin-4/sBtyShCg9nc5U3vGrME0L5/main/"]],prov:"MENA regional sweep plus coordinator spot-check; pregnancy remains unconfirmed by an accessible Turkish-language source."
  },
  {
    t:"Anything for Jackson",y:"2020",f:"movie",m:"Film · Canada · English",c:["pregnant"],phg:"variant",ch:"Shannon Becker",mec:"Occult ritual targeting the fetus",flag:"Close variant · physical restraint, not mind control",s:"Pregnant Shannon is kidnapped and restrained while Satanist occultists perform a reverse-exorcism intended to place their dead grandson's spirit into her unborn child. The ritual targets the fetus; Shannon is physically restrained rather than literally hypnotized or mind-controlled.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Anything_for_Jackson"],["IMDb","https://www.imdb.com/title/tt12148786"]],prov:pregnantHypnotizedSweepBasis
  },
  {
    t:"Metamorphosis",y:"1971",f:"movie",m:"Film · country and language unverified",c:["pregnant"],phg:"lead",ch:"Jeanne",mec:"Diagnostic hypnosis",flag:"Unresolved lead · single source · no will-override shown",s:"An indexed plot says hospital librarian Jeanne discovers she is pregnant and learns the explanation through an intense hypnosis session with Dr. Jacoby. The hypnosis appears diagnostic, and no second source was found.",src:[["IMDb","https://www.imdb.com/title/tt0765903"]],prov:pregnantHypnotizedSweepBasis
  },
  {
    t:"Conde Vrolok",sub:"T1E61 · “Embarazo interrumpido”",y:"2009–10",f:"tv",m:"Telenovela · Chile · Spanish · TVN",c:["pregnant"],phg:"lead",ch:"Emilia",mec:"Possible vampire mesmerism during pregnancy",flag:"Unresolved lead · pregnancy/control simultaneity unverified",s:"Episode 61 is titled “Embarazo interrumpido,” and Emilia is documented as dying pregnant or with her daughter. No located source confirms that she was under Vrolok's mesmeric control while pregnant.",src:[["Chilenovelas Wiki","https://chilenovelas.fandom.com/es/wiki/Muertes_en_Conde_Vrolok"],["Wikipedia","https://es.wikipedia.org/wiki/Conde_Vrolok"]],prov:pregnantHypnotizedSweepBasis
  },
  {
    t:"Mind Game",sub:"心迷 · episode 1.2 lead",y:"2015",f:"tv",m:"TV series · Singapore · language unverified",c:["pregnant"],phg:"lead",mec:"Possible therapeutic hypnosis",flag:"Unresolved lead · plot beat unconfirmed",s:"A regional sweep surfaced an unconfirmed plot beat in which a hypnotherapist saves a suicidal pregnant woman. Even if confirmed, the hypnosis appears therapeutic rather than coercive.",src:[],prov:"Southeast Asia regional sweep; no source URL was preserved in the coordinator report."
  },
  {
    t:"She Never Knew She Was In Love With A Demon Until She Became Pregnant For Her",y:"c. 2026",f:"movie",m:"Film · Nigeria / Nollywood · language unverified",c:["pregnant"],phg:"lead",mec:"Possible demonic influence",flag:"Unresolved lead · single video source · production details unverified",s:"A single video listing suggests a woman becomes pregnant while involved with a demon. The available evidence does not establish whether the influence literally overrides her will, and no production details were independently verified.",src:[],prov:"Single YouTube lead reported by the MENA and sub-Saharan Africa sweep; exact URL was not preserved in the coordinator report."
  }
);
