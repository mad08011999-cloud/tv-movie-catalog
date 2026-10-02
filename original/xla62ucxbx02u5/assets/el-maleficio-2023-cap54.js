/* El Maleficio (2023), episode 54 — filed 2026-10-01.
 * One attempted/borderline forced-obedience record, deduped by exact title + year. */

const elMaleficio2023Cap54={
  t:"El Maleficio",
  sub:"Episode 54 · “Vas a perder a Beatriz” · aired 25 Jan 2024",
  y:"2023",
  f:"tv",
  m:"Telenovela episode · Mexico · Spanish · TelevisaUnivision / Las Estrellas",
  ch:"Victoria 'Vicky' Montes (Sofía Castro) · adult daughter of Beatriz · non-pregnant",
  s:"At Vicky's party, in Raúl's room, Daniel — a member of Bael's organization — attempts to exert his will and mind-control Vicky. Jorge de Martino arrives just in time to save her, preventing the attempted control from taking hold.",
  mec:"Attempted mind control / exertion of will",
  flag:"High confidence for the attempted event · attempted/borderline",
  note:"ATTEMPT THWARTED — Jorge intervened; mind-control never took hold.",
  src:[["Las Estrellas · official clip","https://www.lasestrellas.tv/telenovelas/el-maleficio/jorge-salva-a-vicky-de-la-maldad-de-daniel-video"]],
  prov:"El Maleficio (2023) episode-level verification, 01 Oct 2026",
  c:["forced-obedience"],
  fog:"disputed"
};

const elMaleficio2023Cap54Existing=entries.find(entry=>entry.t===elMaleficio2023Cap54.t&&String(entry.y)===elMaleficio2023Cap54.y);
if(elMaleficio2023Cap54Existing){
  Object.assign(elMaleficio2023Cap54Existing,elMaleficio2023Cap54,{c:[...new Set([...(elMaleficio2023Cap54Existing.c||[]),...elMaleficio2023Cap54.c])]});
}else{
  entries.push(elMaleficio2023Cap54);
}
console.info(`el-maleficio-2023-cap54: ${elMaleficio2023Cap54Existing?'merged':'net-new'} record`);
