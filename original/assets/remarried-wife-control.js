const remarriedWifeControlRows = [
  {
    match:e=>e.t==="El maleficio"&&e.y==="1983–84"&&(e.c||[]).includes("wife"),
    rwg:"variant",
    categoryDetail:"Beatriz is a widowed mother who remarries occultist Enrique de Martino, making him stepfather to Vicky and Juanito. Enrique enters the marriage partly to reach Juanito for Bael, but available sources do not establish that he directly hypnotizes or mind-controls Beatriz.",
    flag:"LOW–MEDIUM · related variant; direct control of Beatriz unverified",
    src:[["Spanish Wikipedia","https://es.wikipedia.org/wiki/El_maleficio"],["Gluc","https://gluc.mx/entretenimiento/2024/3/4/final-de-el-maleficio-decepciona-los-fans-reclaman-televisa-estan-destruyendo-sus-telenovelas-70331.html"],["Desde la Cuna","https://www.desdelacuna.net/television/el-maleficio-donde-es-la-casa-de-enrique-de-martino-donde-se-graba-la-telenovela/amp/"]]
  },
  {
    match:e=>e.t==="El maleficio"&&e.y==="2023–24"&&(e.c||[]).includes("wife"),
    rwg:"variant",
    categoryDetail:"The remake again follows single mother Beatriz marrying sorcerer Enrique de Martino. His occult plot and stepfather role are established, but no available source confirms hypnosis or direct mind-control of Beatriz herself.",
    flag:"LOW–MEDIUM · related variant; direct control of Beatriz unverified",
    src:[["Plex / TheTVDB","https://thetvdb.plex.tv/series/el-maleficio-2023/allseasons/official"],["Wapa","https://wapa.pe/ocio/tendencias/2023/11/13/maleficio-2023-capitulo-1-completo-link-ver-estreno-telenovela-fernando-colunga-marlene-favela-televisa-en-vivo-vix-gratis-948415"]]
  },
  {
    match:e=>e.t==="被催眠的她"&&(e.c||[]).includes("wife"),
    rwg:"lead",
    categoryDetail:"This Mandarin vertical drama is promoted as a hypnosis-themed story about a “perfect wife” and a two-faced husband, with the wife awakening from an induced-delusion setup. The husband-as-controller reading is suggested, but no source found establishes that this is her remarriage.",
    flag:"LOW · unverified lead; remarriage not established",
    src:[["YouTube","https://www.youtube.com/watch?v=iUqQbMt5N3Y"]]
  },
  {
    t:"My Husband's Deadly Past",
    sub:"also known as Woman on the Edge",
    y:"2020",
    f:"tv",
    m:"TV movie · Canada · English",
    c:["remarried-wife-control"],
    rwg:"lead",
    mec:"Hypnosis and memory manipulation",
    flag:"LOW · unverified lead; remarriage and stepfather status not established",
    s:"Psychiatrist husband Otto hypnotizes his wife Karen / Mackenzie and alters her memories to conceal his role in a murder. Husband-directed hypnosis is documented, but no source found establishes that Otto is her second husband or a stepfather.",
    src:[["FilmAffinity","https://www.filmaffinity.com/en/film638122.html"],["TheTVDB","https://thetvdb.com/movies/my-husbands-deadly-past"],["The Cinemaholic","https://thecinemaholic.com/my-husbands-deadly-past-lifetime/"]]
  }
];

remarriedWifeControlRows.forEach(row=>{
  if(!row.match){entries.push(row);return;}
  const target=entries.find(row.match);
  if(!target)return;
  target.c=[...new Set([...(target.c||[]),"remarried-wife-control"])];
  target.rwg=row.rwg;
  target.s=`${target.s} Remarried-wife category detail: ${row.categoryDetail}`;
  target.flag=[...new Set([target.flag,row.flag].filter(Boolean))].join(" · ");
  target.src=[...new Map([...(target.src||[]),...(row.src||[])].map(source=>[source[1],source])).values()];
});
