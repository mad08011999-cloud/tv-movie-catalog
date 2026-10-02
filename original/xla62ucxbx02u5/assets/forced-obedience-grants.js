// 2026-09-30 worldwide sweep: "female character hypnotized against free will" — membership grants.
//
// This file MUST load after every other asset script (it is included last in
// index.html). grantForcedCategory is defined in assets/forced-obedience.js,
// but 10 of these 16 targets are defined in files that load AFTER
// forced-obedience.js (adult-female-hypnosis.js, r-rated-female-hypnosis.js,
// r-rated-pregnant-hypnosis.js), so the grants cannot live there — they would
// silently match nothing. Each matcher was verified to hit exactly one entry.
//
// The 16th grant (Laal Ishq, icchadhari-naag / Preeti–Prem episode, Nov 2018):
// the sweep verified this episode, and a record for it already exists in
// r-rated-female-hypnosis.js (forceNew record, adult-hypnosis membership), so
// it receives forced-obedience membership instead of a duplicate record.

grantForcedCategory(entry=>entry.t==="Cure (キュア)"&&entry.y==="1997","villain");
grantForcedCategory(entry=>entry.t.includes("Faceless Beauty")&&entry.y==="2004","therapist");
grantForcedCategory(entry=>entry.t==="The She-Creature"&&entry.y==="1956","stage");
grantForcedCategory(entry=>entry.t.includes("Guilt by Design")&&entry.y==="2019","villain");
grantForcedCategory(entry=>entry.t.includes("Saimin")&&entry.y==="1999"&&entry.f==="movie","stage");
grantForcedCategory(entry=>entry.t.includes("Bad Medicine")&&entry.y==="1974","supernatural");
grantForcedCategory(entry=>entry.t==="Augustine"&&entry.y==="2012","therapist");
grantForcedCategory(entry=>entry.t.includes("Magpakailanman")&&entry.y==="2017","cult");
grantForcedCategory(entry=>entry.t.startsWith("True Blood")&&entry.y==="2008","supernatural");
grantForcedCategory(entry=>entry.t==="Rasputin the Mad Monk"&&entry.y==="1966","supernatural");
grantForcedCategory(entry=>entry.t==="The Dunwich Horror"&&entry.y==="1970","supernatural");
grantForcedCategory(entry=>entry.t==="The Vampire Lovers"&&entry.y==="1970","supernatural");
grantForcedCategory(entry=>entry.t==="Lust for a Vampire"&&entry.y==="1971","supernatural");
grantForcedCategory(entry=>entry.t==="Skin Deep in Love"&&entry.y==="1966","stage");
grantForcedCategory(entry=>entry.t==="O Beijo do Vampiro"&&entry.y==="2002–03","supernatural");
grantForcedCategory(entry=>entry.t==="Laal Ishq"&&/Preeti–Prem/.test(entry.sub||""),"supernatural");
