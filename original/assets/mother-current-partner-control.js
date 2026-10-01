const motherCurrentPartnerControlRows = [
  {
    match:e=>e.t==="El maleficio"&&e.y==="1983–84"&&(e.c||[]).includes("wife"),
    mpcg:"occult",
    ch:"Beatriz de Martino — mother of Vicky and Juanito; controlled by current husband Enrique de Martino, their stepfather",
    categoryDetail:"Mother/current-partner category detail: Widowed mother Beatriz marries Enrique de Martino and moves with Vicky and Juanito into his household. Enrique is her current husband and the children’s stepfather; he is a sorcerer devoted to Bael, and the official ViX guide for episode 21 says that he has Beatriz ‘bajo su influjo’ in Acapulco. This is a low-confidence inclusion because the phrase supports supernatural influence or spell-like control, but the available sources do not explicitly prove that Enrique magically overrides Beatriz’s mind or will rather than dominating her through fear, authority and occult menace.",
    flag:"LOW · current sorcerer husband has mother Beatriz ‘under his influence’; explicit override of her will is not proven",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/El_maleficio"],["ViX episode 21","https://vix.com/es-es/detail/video-4449575"]]
  }
];

motherCurrentPartnerControlRows.forEach(row=>{
  const target=entries.find(row.match);
  if(!target)return;
  target.c=[...new Set([...(target.c||[]),"mom-partner-control"])];
  target.mpcg=row.mpcg;
  target.ch=row.ch;
  target.s=`${target.s} ${row.categoryDetail}`;
  target.flag=[...new Set([target.flag,row.flag].filter(Boolean))].join(" · ");
  target.src=[...new Map([...(target.src||[]),...(row.src||[])].map(source=>[source[1],source])).values()];
});
