/* Pregnant-lesbian-couple intimate/sex scene sweep — staged 2026-10-01 ~14:31 PDT.
 * 10 regional vectors (English mainstream, Spanish, Portuguese, French/Western Europe,
 * Eastern Europe/Russia, East/Southeast Asia incl. Thai GL, South Asia, Middle East/Turkey,
 * Africa, adult/R-rated/erotic worldwide). 7 of 10 vectors returned honest zero; every
 * sweep included adult and R-rated/18+ works; only consensual adult intimacy.
 * New category key: pregnant-lesbian-intimate. Must load AFTER assets/mirror-import.js.
 * Patterns: (1) 4 net-new records (2) 7 membership grants to existing cards (no duplicate
 * cards) (3) 4 correction/caveat touch-ups. Grouping field: plig =
 * romantic (tender-sensual, non-explicit) | erotic (R-rated/premium-cable explicit)
 * | adult (explicit adult-film) | low (LOW-confidence adult entry held for corroboration).
 * Idempotent: find-or-push for new rows; grants and touch-ups no-op when already applied. */

/* ---------- (1) Net-new records ---------- */
const pliNewRows=[
{t:"Des preuves d'amour",y:"2025",f:"movie",m:"Feature film · France · French · 97 min",c:["pregnant-lesbian-intimate"],plig:"romantic",s:"Married lesbian couple Céline (Ella Rumpf, sound engineer/DJ) and Nadia (Monia Chokri, dentist) await their child, conceived via sperm donation in Denmark and carried by Nadia; the story opens about three months before the due date, in the post-marriage-equality (2013) / pre-PMA-for-all (2021) window, with Céline fighting to legally adopt. Reviews note sensual, non-explicit intimacy scenes between Céline and Nadia while Nadia is visibly pregnant — tender kisses and looks that 'suggest, breathe, and fade out' — presented as ordinary domestic life, not strangeness. Feature debut of Alice Douard (expansion of her César-winning short L'Attente, 2022); released 19 November 2025.",mec:"Sensual / tender intimacy while visibly pregnant",flag:"HIGH confidence · multiple corroborating reviews",note:"Director and stars attended the film's Cannes 2025 screening six months pregnant (Rumpf), matching the on-screen visibly-pregnant intimacy.",src:[["Sorociné review","https://www.sorocine.com/chroniques/des-preuves-d-amour-alice-douard-critique"],["Direct-Actu review (4/5)","https://direct-actu.fr/2025/11/16/des-preuves-damour-alice-douard-avis-2025/"],["Télérama","https://www.telerama.fr/cinema/des-preuves-d-amour-d-alice-douard-une-comedie-douce-amere-sur-les-defis-d-un-couple-lesbien-pour-devenir-parent_cri-7041558.php"]],prov:"Pregnant-lesbian-couple intimate/sex scene sweep, 1 Oct 2026 (French/Western Europe vector; 7 of 10 vectors honest zero; adult/R-rated works included; consensual adult intimacy only)"},
{t:"臨月妊婦 レズ初体験 (EVIS-057)",y:"2014",f:"movie",m:"Adult video · Japan · Japanese · JAV single-title release · ゑびすさん/妄想族 (Ebisusan/Mousouzoku) · released 2014-05-18",c:["pregnant-lesbian-intimate"],plig:"adult",s:"Explicit adult video: one extended explicit lesbian scene between the credited performers — the full-term pregnant performer (credited as Shoko Mochizuki; synopsis text variant Sachiko Mochizuki), stated to be one month from giving birth, and Yuri Sato. The catalog synopsis frames it as the full-term pregnant woman's 'first lesbian experience', with the pregnancy visible and acknowledged throughout.",mec:"Explicit adult lesbian scene with full-term pregnant performer",flag:"MEDIUM confidence · single detailed catalog database · adult-film content",note:"Cataloged at metadata level only. The East/Southeast Asia sweep leaf excluded this title on a stricter 'romantic couple' reading (no couple narrative); retained here under the adult-film framing per the adult vector's verification.",src:[["MissAV JAV catalog","https://missav.ws/dm13/en/evis-057"]],prov:"Pregnant-lesbian-couple intimate/sex scene sweep, 1 Oct 2026 (adult / R-rated / erotic vector; consensual adult performers only)"},
{t:"Lilly and Tammy — pregnant lesbian adult clips",sub:"two releases, same duo",y:"2014",f:"movie",m:"Adult clip productions · country unknown (likely US) · English",c:["pregnant-lesbian-intimate"],plig:"low",s:"Two adult clip releases with the credited duo Lilly and Tammy, one of whom is the pregnant partner: 'Lesbian babe Tammy and Lilly eat some pregnant pussy' (explicit two-woman lesbian scene with a pregnant participant) and 'Hairy pregnant lesbians Lilly and Tammy bathe together' (bathing/softcore-leaning scene, same pair).",mec:"Explicit / softcore adult clips with pregnant participant",flag:"LOW confidence · single weak source · held for corroboration",note:"IMDb adult entries of this kind are user-submitted; no studio or distributor record found. Filed only in the LOW-confidence tier per the sweep recommendation.",src:[["IMDb tt31796433","https://www.imdb.com/title/tt31796433"],["IMDb tt31796411","https://www.imdb.com/title/tt31796411"]],prov:"Pregnant-lesbian-couple intimate/sex scene sweep, 1 Oct 2026 (adult / R-rated / erotic vector)"},
{t:"Neighbours",sub:"Elly Conway and Chloe Brennan ('Chelly') arc",y:"2019–2020",f:"tv",m:"Soap opera · Australia · English",c:["pregnant-lesbian-intimate"],plig:"romantic",s:"Elly Conway is pregnant (by Shaun Watkins) while dating Chloe Brennan; after a successful date they share a 'long-overdue kiss' while Elly is visibly pregnant, with Chloe later joining Elly at a baby scan as their fledgling romance develops.",mec:"Kiss-level intimacy while visibly pregnant",flag:"MEDIUM confidence · kiss-level; timing documented in soap press",note:"Distinct from the catalog's Nicolette Stone / Chloe Brennan surrogacy arc (2020–2021); this is the earlier Elly Conway 'Chelly' arc.",src:[["WhatToWatch (April Rose Pengilly)","https://www.whattowatch.com/news/trouble-for-this-neighbours-couple-as-a-baby-shock-threatens-to-tear-them-apart-590116"]],prov:"Pregnant-lesbian-couple intimate/sex scene sweep, 1 Oct 2026 (English mainstream vector)"}
];
let pliNetNew=0;
pliNewRows.forEach(row=>{
  if(entries.find(x=>x.t===row.t&&String(x.y)===String(row.y)))return;
  entries.push(row);pliNetNew++;
});

/* ---------- (2) Membership grants to existing records (no duplicate cards) ---------- */
const pliGrants=[
{t:"The L Word",y:"2004–2005",group:"erotic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): S2E9 'Late, Later, Latent' — explicit love-making scene between pregnant Tina and Bette (full episode transcript describes them making love and orgasming simultaneously); S2 Tina/Helena pregnant love scenes including a pool scene (Laurel Holloman discussed 'doing love scenes pregnant' in TV Guide's 'The L Word's Pregnant Pause'). Confidence: HIGH. Sources: transcripts.foreverdreaming.org full transcript; episodehive.com; IMDb S2E9; TV Guide interview.",addSrc:[["IMDb – S2E9","https://www.imdb.com/title/tt0623862/"]]},
{t:"Perfect",y:"2026",group:"erotic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): third-trimester sex scene between pregnant Mallory (Julia Fox) and drifter Kai (Ashley Moore); multiple nude sex scenes between Kai and pregnant Mallory; Variety (SXSW) describes a 'steamy lesbian romance'. Confidence: HIGH — the strongest erotic-adjacent entry in the sweep.",addSrc:[]},
{t:"Station 19",y:"2024",group:"romantic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): S7E9 Carina learns she is pregnant (IVF embryo); the S7E10 series-finale opening montage shows Carina and Maya in bed together in a sexy/romantic scene while Carina is stressed about the pregnancy test — pregnancy known to both. Confidence: MEDIUM-HIGH (borderline explicit).",addSrc:[["Autostraddle finale recap","https://www.autostraddle.com/station-19-series-finale-recap-part-one/"]]},
{t:"Pretty Little Liars",y:"2016–2017",group:"romantic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): 7x10 'The DArkest Knight' — Alison reveals the pregnancy and they kiss; in S7B they exchange 'I love yous' and become a couple while Alison is visibly pregnant; engaged in the series finale. Kiss-level only; no explicit sex scene documented. Confidence: MEDIUM-HIGH. Note: the pregnancy itself is a coercive backstory — Emily's eggs were non-consensually implanted in Alison by Archer/Elliot.",addSrc:[["SpoilerTV 7x10 review","https://www.spoilertv.com/2016/08/pretty-little-liars-darkest-knight.html?m"],["Refinery29 finale proposal","https://www.refinery29.com/en-us/2017/06/161201/ali-emily-proposal-problem-pretty-little-liars-finale"]]},
{t:"Dead Ringers",y:"2023",group:"romantic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): S1E6 'Baby Sister' opens with pregnant Beverly (twins, via Sammy's sperm) and girlfriend Genevieve (Britne Oldford) kissing in bed. Confidence: MEDIUM (bed kiss; kiss-level intimacy).",addSrc:[["The Review Geek S1E6 recap","https://www.thereviewgeek.com/deadringers-s1endingexplained/"]]},
{t:"Hollyoaks",y:"2015",group:"romantic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): early-relationship kisses between Esther (pregnant as a surrogate, Nov 2014–Jul 2015) and Kim Butterfield — Kim asks Esther out; first kiss caught by Dr S'avage. Confidence: MEDIUM (kiss-level, tea-time soap).",addSrc:[["Hollyoaks fandom – Kim Butterfield","https://hollyoaks.fandom.com/wiki/Kim_Butterfield"]]},
{t:"Last Tango in Halifax",y:"2013–2015",group:"romantic",note:"Intimacy-scene evidence (1 Oct 2026 sweep): S3E1 Caroline proposes to heavily pregnant Kate (donor Greg; baby Flora); they marry in S3E2 — wedding kiss with Kate heavily pregnant; domestic/bed scenes in a BBC 9pm drama. No explicit sex scene documented. Confidence: MEDIUM-LOW.",addSrc:[["CultBox S3 episode guide","https://cultbox.co.uk/spoilers/episode-guides/last-tango-in-halifax-season-3"],["TV Guide S3 episode guide","https://www.tvguide.com/tvshows/last-tango-in-halifax/episodes-season-3/1000362242/"]]}
];
let pliGranted=0;
pliGrants.forEach(g=>{
  const e=entries.find(x=>x.t===g.t&&String(x.y)===String(g.y));
  if(!e||(e.c||[]).includes("pregnant-lesbian-intimate"))return;
  e.c=[...new Set([...(e.c||[]),"pregnant-lesbian-intimate"])];
  e.plig=g.group;
  if(!e.prov)e.prov="Mirror catalog import, 1 Oct 2026 (lesbian-pregnancy index) · intimacy-scene evidence grant from the pregnant-lesbian-couple sweep, 1 Oct 2026";
  e.note=((e.note?e.note+" ":"")+g.note);
  const have=new Set((e.src||[]).map(a=>a[1]));
  (g.addSrc||[]).forEach(a=>{if(a[1]&&!have.has(a[1])){e.src.push(a);have.add(a[1]);}});
  pliGranted++;
});

/* ---------- (3) Correction / caveat touch-ups ---------- */
(function(){
  const e=entries.find(x=>x.t==="Entre Nous"&&String(x.y)==="2021");
  if(!e)return;
  e.y="2023";
  e.note=((e.note?e.note+" ":"")+"Year corrected 2021 → 2023 (released 12 July 2023). Pregnancy-plot caveat (1 Oct 2026 sweep): the card's pregnancy — Laetitia pregnant by roommate Simon, ending in miscarriage — rests on the TV Tropes synopsis; fr.wikipedia's synopsis stops at the PMA setup and notes Élodie cannot get pregnant. Kept in 'lesbian-couple pregnancy' with synopsis-level evidence; the sweep's removal suggestion was not adopted because the French source's synopsis is truncated, not contradictory.");
  const have=new Set((e.src||[]).map(a=>a[1]));
  [["fr.wikipedia – Entre nous (film, 2023)","https://fr.wikipedia.org/wiki/Entre_nous_(film,_2023)"]].forEach(a=>{if(a[1]&&!have.has(a[1])){e.src.push(a);have.add(a[1]);}});
})();
(function(){
  const e=entries.find(x=>x.t==="New Girl"&&String(x.y)==="2012");
  if(!e||e.note&&e.note.includes("Review note (1 Oct 2026 sweep)"))return;
  e.note=((e.note?e.note+" ":"")+"Review note (1 Oct 2026 sweep): the sweep's 'Cece + Schmidt are a hetero couple' correction flag was found to misidentify this record — this card is the Sadie/Melissa arc (S2E9 'Eggs'): Sadie, a lesbian OB/GYN married to Melissa, announces she is pregnant. Kept in 'lesbian-couple pregnancy'; correctly filed.");
})();
(function(){
  const e=entries.find(x=>x.t==="Segundo Sol"&&String(x.y)==="2018");
  if(!e||e.note&&e.note.includes("Caveat (1 Oct 2026 sweep)"))return;
  e.note=((e.note?e.note+" ":"")+"Caveat (1 Oct 2026 sweep): HIGH confidence for the lesbian couple + pregnancy, but no documented intimate/sex scene between Maura and Selma while pregnant — not filed in 'Pregnant lesbian couple — intimate/sex scene'.");
})();
(function(){
  const e=entries.find(x=>x.t==="Dona de Mim"&&String(x.y)==="2025");
  if(!e||e.note&&e.note.includes("Caveat (1 Oct 2026 sweep)"))return;
  e.note=((e.note?e.note+" ":"")+"Caveat (1 Oct 2026 sweep): HIGH confidence for the lesbian couple + pregnancy, but no documented intimate/sex scene between Ayla and Gisele while pregnant (kisses/embraces only; donor-conflict plot) — not filed in 'Pregnant lesbian couple — intimate/sex scene'.");
})();

console.info(`pregnant-lesbian-intimate: net-new rows=${pliNetNew}, grants=${pliGranted}`);
