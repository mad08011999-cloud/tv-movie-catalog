function addStepmomControl(entry){
  const existing=entries.find(item=>item.t===entry.t&&item.y===entry.y);
  if(!existing){entries.push(entry);return;}
  existing.c=[...new Set([...(existing.c||[]),'stepmom-control'])];
  existing.s=`${existing.s} Stepmother-control category detail: ${entry.s}`;
  existing.src=[...new Map([...(existing.src||[]),...(entry.src||[])].map(source=>[source[1],source])).values()];
  existing.smcg=entry.smcg;
  existing.flag=[...new Set([existing.flag,entry.flag].filter(Boolean))].join(' · ');
}
[
  {
    t:"Snow White: A Tale of Terror",
    y:"1997",
    f:"tv",
    m:"TV film · USA / Czech Republic · English",
    c:["stepmom-control"],
    smcg:"supernatural",
    mec:"Evil mirror spirit / occult corruption",
    flag:"Medium-high confidence · willing complicity remains arguable",
    s:"Lady Claudia Hoffman, new wife of Baron Frederick and stepmother to Lilli, is initially well intentioned. After her stillbirth, an evil spirit inhabiting her dead mother’s vanity mirror consoles and corrupts her into a dark-arts practitioner who tries to murder her stepdaughter; grief and jealousy mean the degree of unwilling control is arguable.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Snow_White:_A_Tale_of_Terror"],["TV Guide","https://www.tvguide.com/movies/snow-white-a-tale-of-terror/2030009257/"],["Sitges Film Festival","https://sitgesfilmfestival.com/en/film/1997/snow-white-tale-terror"]]
  },
  {
    t:"The Wishing Box",
    sub:"segment: “Room 213, The Stepmother and The Box”",
    y:"2011",
    f:"movie",
    m:"Horror anthology film · English · country unverified (presumed USA)",
    c:["stepmom-control"],
    smcg:"supernatural",
    mec:"Demonic possession through a cursed box",
    flag:"Medium-high confidence · single-review source",
    s:"Lindsay’s unnamed stepmother is possessed by the Box, whose black stones imprison demonic souls of the sorceress Cozara. Under that possession she shoots Lindsay, then calls Lindsay’s father and claims something is wrong with his daughter; the characters’ names and production country remain unverified.",
    src:[["Love Horror","https://lovehorror.co.uk/slasher/11351/the-wishing-box-2011-review/"],["Letterboxd","https://letterboxd.com/yaboifritzlang/film/wishing-box/"]]
  },
  {
    t:"The StepMother",
    y:"2011",
    f:"short",
    m:"Horror short · 12 min · English · country unverified (presumed USA)",
    c:["stepmom-control"],
    smcg:"borderline",
    mec:"Possible demonic possession",
    flag:"Low confidence · borderline near-miss; possession only suspected",
    s:"A pregnant stepmother terrorizes her young stepdaughter, prompting two priests, Father Peter and Father William, to investigate possible demonic possession. The sources do not confirm that possession actually occurs, and the available cast names Amy and Cecilia cannot be mapped confidently to the roles.",
    src:[["IMDb","https://www.imdb.com/title/tt1961598"],["Rotten Tomatoes","https://www.rottentomatoes.com/m/the_stepmother"],["TV Passport","https://www.tvpassport.com/movie/the-stepmother/26578159"]]
  },
  {
    t:"Disenchanted",
    y:"2022",
    f:"movie",
    m:"Feature film · USA · English",
    c:["stepmom-control"],
    smcg:"supernatural",
    mec:"Wand-of-Wishes curse / enchanted alter ego",
    flag:"Medium confidence · self-initiated wish backfires",
    s:"Giselle Philip, Robert’s wife and Morgan’s stepmother, wishes for a perfect fairy tale with the Wand of Wishes. The wish twists into a curse that progressively takes her over as a wicked-stepmother persona; she resists the change and is restored when Morgan breaks the spell.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Disenchanted_(film)"],["Polygon","https://www.polygon.com/reviews/23466419/disenchanted-review-disney-plus-amy-adams/"],["High On Films","https://www.highonfilms.com/disenchanted-disney-movie-ending-explained/"]]
  }
].forEach(addStepmomControl);
