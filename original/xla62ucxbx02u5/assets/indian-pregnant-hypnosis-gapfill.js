const indianPregnantHypnosisGapfillBasis = "Seven-region Indian-language gap-fill sweep; both matches re-verified by direct Wikipedia page fetch on 30 Sep 2026.";
function enrichIndianPregnantHypnosis(entry, update) {
  if (!entry) return;
  entry.c = [...new Set([...(entry.c || []), "pregnancy-evil", "india-pregnancy", "regional-pregnancy", "pregnant", "spirit", "india-control", "evil-female"] )];
  entry.pg = "high";
  entry.phg = "occult";
  entry.icg = "supernatural";
  entry.ch = update.ch;
  entry.mec = update.mec;
  entry.flag = "Verified · high confidence · direct page check";
  entry.s = update.s;
  if (update.t) entry.t = update.t;
  if (update.sub) entry.sub = update.sub;
  if (update.m) entry.m = update.m;
  entry.src = [...new Map([...(entry.src || []), ...update.src].map(source => [source[1], source])).values()];
  entry.prov = indianPregnantHypnosisGapfillBasis;
}

enrichIndianPregnantHypnosis(
  entries.find(entry => entry.t === "Aranmanai" && entry.y === "2014"),
  {
    ch:"Madhavi",
    mec:"Ghost possession during established pregnancy",
    s:"Selvi's vengeful spirit possesses Madhavi and intends to continue living with Murali through her body. Ravi reveals that Madhavi is pregnant while the possession is still active; the news briefly restores her awareness before the priests' ritual finally severs Selvi's hold.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Aranmanai"],["IMDb","https://www.imdb.com/title/tt4010302"]]
  }
);

enrichIndianPregnantHypnosis(
  entries.find(entry => entry.t === "Abhinetri / Devi / Tutak Tutak Tutiya" && entry.y === "2016"),
  {
    t:"Devi / Abhinetri / Tutak Tutak Tutiya",
    sub:"Tamil original · Telugu and Hindi versions filmed simultaneously · counted once",
    m:"Film · India · Tamil / Telugu / Hindi",
    ch:"Devi",
    mec:"Ghost possession during established pregnancy",
    s:"Actress Ruby's spirit possesses Devi. After Devi faints, a doctor reveals that she is pregnant with Krishna's child; Krishna then asks Ruby to leave his wife's body, and Ruby complies, establishing that the pregnancy reveal occurs while the possession is active.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Devi_(2016_film)"],["IMDb","https://www.imdb.com/title/tt6106488"]]
  }
);
