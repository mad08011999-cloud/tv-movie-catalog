// Hallmark six-topic sweep — filed 1 Oct 2026.
// Ten net-new title records, one upgraded existing record, and twelve category
// memberships across the new pregnant-female view and three existing views.
const hallmarkSweepBasis = "Hallmark six-topic sweep completed 1 Oct 2026; roughly 80+ query rounds across Hallmark Channel, Hallmark Mystery, Hallmark+ and the Crown Media / Hallmark Hall of Fame back catalog.";

{
  const janeDoe = entries.find(entry => entry.t === "Jane Doe: How to Fire Your Boss" && entry.y === "2007");
  if (janeDoe) {
    janeDoe.c = [...new Set([...(janeDoe.c || []), "forced-obedience"])];
    janeDoe.fog = "villain";
    janeDoe.m = "Hallmark Channel TV movie · United States · English · premiered 20 Jan 2007";
    janeDoe.mec = "Subliminal brainwashing · trigger-word trance";
    janeDoe.flag = "High confidence · literal hypnotic trance imposed on the female lead";
    janeDoe.s = "CSA agent Cathy Davis / Jane Doe investigates agents turned into sleeper assassins through subliminal conditioning and phone-delivered trigger words. She submits to the brainwashing to catch the culprit, falls into a trigger-word trance, leaves home under control and regains awareness when colleagues arrive; another agent is sent to murder his boss.";
    janeDoe.src = [
      ["Crown Media · official credits and storyline", "http://awsprxdam.crownmediadev.com.s3-us-west-1.amazonaws.com/highRes/643927.pdf"],
      ["Mental Block wiki · scene log and screencaps", "https://mentalblock.miraheze.org/wiki/Jane_Doe:_How_to_Fire_Your_Boss"],
      ["TV Guide", "https://www.tvguide.com/movies/jane-doe-how-to-fire-your-boss/2000140788/"]
    ];
    janeDoe.prov = hallmarkSweepBasis;
  }
}

const hallmarkSixTopicRows = [
  {
    t:"The Magic of Ordinary Days", y:"2005", f:"movie",
    m:"Hallmark Hall of Fame TV movie · premiered on CBS",
    c:["pregnant-female"], pfg:"high", ch:"Livvy Dunne",
    mec:"Pregnancy drives an arranged marriage",
    flag:"High confidence · pregnancy visibly shown through birth",
    s:"During World War II, Livvy Dunne is pregnant out of wedlock by a soldier. Her minister father pressures her into an arranged marriage with farmer Ray Singleton; the pregnancy drives the marriage, the secrecy and the film's resolution at the birth.",
    src:[["Hallmark Mystery · Hall of Fame catalog","https://www.hallmarkmystery.com/hallmark-hall-of-fame/movie-list"],["Hallmark Hall of Fame trailer catalog","https://www.movie-trailer.co.uk/trailers/hallmark-hall-of-fame-productions/"],["PicClick · Hallmark synopsis listing","https://picclick.ca/Hallmark-Hall-of-Fame-Kiss-Me-Kate-by-364014714111.html"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Love Comes Softly", y:"2003", f:"movie",
    m:"Hallmark Channel TV movie · premiered 13 Apr 2003",
    c:["pregnant-female","family"], pfg:"high", region:"Near / partial matches", ch:"Marty Claridge",
    mec:"Pregnancy precedes remarriage · previous husband is the father",
    flag:"High confidence · borderline family membership",
    s:"Nineteen-year-old widow Marty Claridge is two months pregnant by her late husband when she accepts a marriage of convenience with widower Clark Davis, who needs a mother for his daughter Missie. Marty gives birth during the film and the new marriage becomes genuine; because Clark is not the baby's father, this is a pregnancy-before-wedding borderline in the remarriage category.",
    src:[["Moviefone","https://www.moviefone.com/movie/love-comes-softly/1236110/main/"],["IMDb","https://www.imdb.com/title/tt0345591"],["Blogcritics · DVD review","https://blogcritics.org/dvd-review-love-comes-softly-the/"],["TV Insider","http://www.tvinsider.com/show/love-comes-softly/"],["TV Time","https://www.tvtime.com/movie/9a828e56-0b48-43fa-bbaf-a16e5e92c6"],["FilmGator","https://filmgator.com/movie/2003/love-comes-softly"]],
    note:"Family-category caveat: the pregnancy begins before the wedding and the biological father is Marty's late first husband, not her new husband Clark.",
    prov:hallmarkSweepBasis
  },
  {
    t:"Love's Long Journey", y:"2005", f:"movie",
    m:"Hallmark Channel TV movie · premiered 3 Dec 2005",
    c:["pregnant-female"], pfg:"high", ch:"Missie LaHaye",
    mec:"Pregnancy hidden from husband, then revealed",
    flag:"High confidence · pregnancy followed through birth",
    s:"Newlyweds Missie and Willie LaHaye travel west. Missie hides her pregnancy because she fears Willie's reaction; her tearful disclosure is a hinge scene, and the film follows the pregnancy through frontier hardships to the birth.",
    src:[["Wikipedia · film and series context","https://en.wikipedia.org/wiki/Love%27s_Long_Journey"],["Crown Media · official synopsis","http://awsprxdam.crownmediadev.com.s3-us-west-1.amazonaws.com/highRes/648009.pdf"],["Parent Previews","https://parentpreviews.com/movie-reviews/loves-long-journey/"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Love Finds a Home", y:"2009", f:"movie",
    m:"Hallmark Channel TV movie · premiered Apr 2009",
    c:["pregnant-female"], pfg:"high", ch:"Dr. Annie Watson",
    mec:"Visible late pregnancy · parallel infertility subplot",
    flag:"High confidence · described as very pregnant",
    s:"A very pregnant Dr. Annie Watson stays with her friend Dr. Belinda Owens while Annie's husband is away. Annie's visible pregnancy remains present throughout the film alongside Belinda and her husband's infertility subplot.",
    src:[["Hallmark press-release synopsis via Oh No They Didn't","https://ohnotheydidnt.livejournal.com/32156774.html"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Plainsong", y:"2004", f:"movie",
    m:"Hallmark Hall of Fame TV movie · premiered on CBS",
    c:["pregnant-female"], pfg:"high", ch:"Victoria Roubideaux",
    mec:"Teen pregnancy structures the ensemble plot",
    flag:"High confidence · pregnancy visibly shown through labor",
    s:"Pregnant 17-year-old student Victoria Roubideaux is forced from home by her mother. Teacher Maggie Jones arranges for the McPheron brothers to take her in and help her prepare for the birth; Victoria later goes into labor at their ranch.",
    src:[["Hallmark Family · about Plainsong","https://www.hallmarkfamily.com/plainsong/about-plainsong"],["IMDb","https://www.imdb.com/title/tt0364603"],["Listal","https://www.listal.com/movie/plainsong"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"When Calls the Heart: The Greatest Christmas Blessing", y:"2018", f:"movie",
    m:"Hallmark Channel Christmas TV movie · premiered 25 Dec 2018",
    c:["pregnant-female"], pfg:"high", ch:"Elizabeth Thornton",
    mec:"Widow prepares for childbirth",
    flag:"High confidence · pregnancy visibly shown through birth",
    s:"Newly widowed Elizabeth Thornton is pregnant by her late husband Jack. She prepares for the birth while Hope Valley supports her, and she gives birth to baby Jack during the Christmas special.",
    src:[["Entertainment Tonight · trailer coverage","https://www.etonline.com/elizabeth-prepares-to-give-birth-in-magical-when-calls-the-heart-christmas-movie-trailer-exclusive"],["Parade · preview","https://parade.com/722219/rielyhaven/exclusive-photos-when-calls-the-heart-the-greatest-christmas-blessing-sneak-peek/"],["Entertainment Tonight · cast interview","https://www.etonline.com/when-calls-the-heart-cast-spills-on-elizabeths-baby-jacks-legacy-exclusive-116166"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Signed, Sealed, Delivered: To the Moon and Back", y:"2025", f:"movie",
    m:"Hallmark Mystery TV movie · 15th franchise film",
    c:["pregnant-female"], pfg:"high", ch:"Shane and Rita",
    mec:"Two pregnancies · doctor visit and parenthood subplot",
    flag:"High confidence · substantive pregnancy subplot",
    s:"Both Shane and Rita are pregnant. Shane attends a doctor's appointment where the baby is said to be doing well, while Oliver wrestles with impending fatherhood as he confronts his own birth-father history.",
    src:[["Deck the Hallmark","https://deckthehallmark.com/episode/signed-sealed-delivered-to-the-moon-and-back-hallmark-chanel-2025-ft-erin-shea"],["Carstairs Considers","http://carstairsconsiders.blogspot.com/2025/11/movie-review-signed-sealed-delivered-to.html"],["Buzzsprout · review episode","https://www.buzzsprout.com/2448436/episodes/17069320-hallmark-s-signed-sealed-delivered-to-the-moon-and-back"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Signed, Sealed, Delivered: A Tale of Three Letters", y:"2024", f:"movie",
    m:"Hallmark Mystery TV movie · premiered 12 Jul 2024",
    c:["pregnant-female"], pfg:"medium", ch:"Shane",
    mec:"Closing pregnancy announcement",
    flag:"Medium confidence · announcement only, not a developed plotline",
    s:"In the film's final moments, Shane tells Oliver that she is pregnant. The on-screen announcement sets up the next installment, but the pregnancy is not developed within this film.",
    src:[["TV Insider","https://www.tvinsider.com/swooon/1151370/signed-sealed-delivered-oliver-shane-pregnant-tale-of-three-letters/"],["The PC Principle · recap","https://thepcprinciple.com/recap-review-signed-sealed-delivered-a-tale-of-three-letters/"],["CBR · review","https://www.cbr.com/signed-sealed-delivered-a-tale-of-three-letters-review/"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Three Wisest Men", y:"2025", f:"movie",
    m:"Hallmark Channel TV movie · premiered 15 Nov 2025",
    c:["mom-pregnancy"], ch:"Sophie Brenner · son Thomas",
    mec:"Mother pregnant again with twins",
    flag:"High confidence · expecting twins any day",
    s:"Sophie, already mother to young son Thomas, is pregnant with twins by her husband Luke. Thomas feels overlooked amid the preparations, and Luke attends a disastrous Lamaze class.",
    src:[["Parade","https://parade.com/tv/three-wisest-men-hallmark"],["The Entertainment Factor","https://www.theentertainmentfactor.com/2025/11/three-wisest-men-2025-hallmark-christmas-movie-trailer-clip-images-poster.html"],["Carstairs Considers","http://carstairsconsiders.blogspot.com/2025/11/movie-review-three-wisest-men.html"],["Deck the Hallmark","https://deckthehallmark.com/episode/three-wisest-men-presented-by-a-tyler-shaw-christmas"],["Gazettely · 2024 sequel context","https://gazettely.com/2024/11/entertainment/three-wiser-men-and-a-boy-review/"],["TV Insider · trilogy background","https://www.tvinsider.com/1161077/three-wiser-men-and-a-boy-andrew-walker-paul-campbell-tyler-hynes-preview/"]],
    prov:hallmarkSweepBasis
  },
  {
    t:"Love's Enduring Promise", y:"2004", f:"movie",
    m:"Hallmark Channel TV movie · premiered 20 Nov 2004",
    c:["family"], region:"USA — exact matches", ch:"Marty Claridge Davis",
    mec:"Remarriage followed by a child with the new husband",
    flag:"High confidence · pregnancy occurs off-screen between films",
    s:"Widow Marty Claridge Davis remarries widower Clark Davis. The official Crown Media synopsis says Marty and Clark have two sons of their own, Aaron and Arnie, establishing that Marty has a second child by her new husband after the remarriage; the pregnancy itself occurs off-screen between films.",
    src:[["Crown Media · official synopsis","http://awsprxdam.crownmediadev.com.s3-us-west-1.amazonaws.com/highRes/648525.pdf"],["IMDb","https://www.imdb.com/title/tt0402348"],["TV Guide","https://Www.Tvguide.com/movies/loves-enduring-promise/videos/2030064028/"]],
    note:"The children are shown, but the remarriage-to-pregnancy transition happens between films rather than as an on-screen pregnancy arc.",
    prov:hallmarkSweepBasis
  }
];

let hallmarkNetNew = 0;
let hallmarkMerged = 0;
hallmarkSixTopicRows.forEach(row => {
  const existing = entries.find(entry => entry.t === row.t && String(entry.y) === String(row.y));
  if (existing) {
    Object.assign(existing, row, {c:[...new Set([...(existing.c || []), ...row.c])]});
    hallmarkMerged++;
  } else {
    entries.push(row);
    hallmarkNetNew++;
  }
});
console.info(`hallmark-six-topics: net-new rows=${hallmarkNetNew}, merged=${hallmarkMerged}, existing Jane Doe upgraded=${Boolean(entries.find(entry => entry.t === "Jane Doe: How to Fire Your Boss" && entry.y === "2007" && entry.c.includes("forced-obedience")))}`);
