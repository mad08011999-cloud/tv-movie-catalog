/* Lesbian-couple-pregnancy follow-up — staged 2026-10-01 ~15:30 PDT.
 * One verified record: 'Healed' (2023), a US feature film about a married lesbian
 * couple (Jazz Powers and Olivia) expecting their first child who attend a
 * meditation retreat run by therapist Georgia Chambers and discover they are the
 * unknowing subjects of her experiment. Near-miss for the pregnant-lesbian-hypnosis
 * sweep (01 Oct 2026): coercive therapy/experimentation, NOT hypnosis — filed only
 * under lesbian-couple-pregnancy. Must load AFTER assets/mirror-import.js.
 * Idempotent: find-or-push on (t, y). */

const lphNewRows=[
{t:"Healed",y:"2023",f:"movie",m:"Film · United States · English",s:"Jazz Powers (Shantell Yasmine Abeydeera) and her wife Olivia (Emily Goss) are expecting their first child. The married lesbian couple attend a holistic 'healing through meditation' retreat run by therapist Georgia Chambers (Guinevere Turner), only to discover they are the unknowing subjects of her experiment.",mec:"Control mechanism unstated",flag:"Medium-high · Film Threat + FilmInk reviews confirm plot",src:[["Film Threat review","https://filmthreat.com/reviews/healed/"],["FilmInk review","https://www.filmink.com.au/reviews/healed/"],["IMDb","https://www.imdb.com/title/tt16968762"]],note:"Outcome facts: pregnancy outcome: still pregnant at the end; kids status: no. Reviews do not specify which partner is pregnant. Not filed under any hypnosis category: the retreat's 'experiment' is coercive therapy/experimentation — no hypnosis, mesmerism, trance, or mind-control mechanism (near-miss for the pregnant-lesbian-hypnosis sweep, 01 Oct 2026).",prov:"Pregnant-lesbian-hypnosis sweep follow-up, 01 Oct 2026 (adult couples only; non-explicit notes)",c:["lesbian-couple-pregnancy"]}
];
let lphNetNew=0;
lphNewRows.forEach(row=>{
  if(entries.find(x=>x.t===row.t&&String(x.y)===String(row.y)))return;
  entries.push(row);lphNetNew++;
});

console.info(`lesbian-pregnancy-healed: net-new rows=${lphNetNew}`);
