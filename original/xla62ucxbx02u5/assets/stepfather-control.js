const stepfatherControlRows = [
  {
    t:"Pan's Labyrinth / El laberinto del fauno",
    y:"2006",
    f:"movie",
    m:"Film · Spain / Mexico · Spanish",
    c:["stepfather-control"],
    mec:"Mundane patriarchal / military control — no hypnosis",
    flag:"NEAR-MISS · fails criterion 5: no genuine hypnosis or mind-control mechanism",
    s:"Carmen is a pregnant widow with 11-year-old daughter Ofelia who remarries Captain Vidal, Ofelia’s stepfather. The story satisfies the pregnancy, prior-child, widowhood and new-husband criteria, but Vidal’s control is mundane patriarchal and military abuse rather than hypnosis or mind control; Carmen dies in childbirth.",
    src:[["Alternate Ending","https://www.altfg.com/pans-labyrinth-2006-movie-review/"],["Socialism and Democracy","https://sdonline.org/issue/47/antifascist-aesthetics-pan%E2%80%99s-labyrinth"]]
  },
  {
    match:e=>e.t==="El maleficio"&&e.y==="1983–84"&&(e.c||[]).includes("wife"),
    categoryDetail:"Beatriz is a widow raising Vicky and Juanito who marries sorcerer Enrique de Martino. NEAR-MISS — fails criterion 3 because Beatriz is not pregnant; daughter Vicky is the one who becomes pregnant. Criterion 5 is only partial because the plot supports occult manipulation, not explicit hypnosis or mind control of Beatriz.",
    flag:"NEAR-MISS · fails pregnancy criterion; explicit hypnosis of Beatriz unverified",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/El_maleficio"],["IMDb","https://www.imdb.com/title/tt0214356"]]
  },
  {
    match:e=>e.t==="El maleficio"&&e.y==="2023–24"&&(e.c||[]).includes("wife"),
    categoryDetail:"Beatriz is a single mother who marries sorcerer Enrique de Martino. NEAR-MISS — fails criteria 3 and 5 because Beatriz’s pregnancy and any explicit hypnosis or mind-control of her by Enrique remain unverified.",
    flag:"NEAR-MISS · pregnancy and explicit mind-control criteria unverified",
    src:[["IMDb","https://www.imdb.com/title/tt29542034"],["Wikipedia","https://en.wikipedia.org/wiki/El_maleficio_(2023_TV_series)"]]
  }
];

stepfatherControlRows.forEach(row=>{
  if(!row.match){entries.push(row);return;}
  const target=entries.find(row.match);
  if(!target)return;
  target.c=[...new Set([...(target.c||[]),"stepfather-control"])];
  target.s=`${target.s} New-husband/stepfather category detail: ${row.categoryDetail}`;
  target.flag=[...new Set([target.flag,row.flag].filter(Boolean))].join(" · ");
  target.src=[...new Map([...(target.src||[]),...(row.src||[])].map(source=>[source[1],source])).values()];
});
