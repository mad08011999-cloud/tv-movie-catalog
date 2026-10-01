const forcedObedienceRows = [
  {t:"The Vise",sub:"“Dr. Damon’s Experiment”",y:"1954",f:"tv",m:"TV series episode · United Kingdom · English",fog:"disputed",mec:"Post-hypnotic suggestion",flag:"Medium-high confidence · synopsis disputed",s:"A terse TV Guide synopsis says psychiatrist and hypnotist Dr. Damon uses post-hypnotic suggestion so his wife Anita kills her lover Charles Dyson. An earlier catalog re-check read the same plot as Damon hypnotizing the lover instead, so direct episode verification remains open.",note:"Conflicting synopsis readings: retained as a clearly labeled lead rather than an airtight match.",src:[["TV Guide","https://www.tvguide.com/tvshows/the-vise/episodes-season-1/1000189937/"],["IMDb","https://www.imdb.com/title/tt0741233"],["Clicker","https://www.clicker.com/tv/the-vise/"]]},
  {t:"He Learns the Trick of Mesmerism",y:"1909",f:"short",m:"Silent comedy short · country unverified, likely United States",fog:"partner",mec:"Mesmerism / domestic commands",flag:"Medium-high confidence · single synopsis source",s:"Jones mesmerizes his wife and mother-in-law; both collapse under his control and obey his order to prepare lunch. The comic tone and production country remain caveats.",src:[["IMDb","https://www.imdb.com/title/tt4323810"]]},
  {t:"LFO",y:"2013",f:"movie",m:"Film · Sweden · Swedish",fog:"partner",mec:"Hypnotic sound frequency",flag:"High confidence",s:"Robert Nord’s hypnotic sound frequency compels neighbors Linn and Simon to obey. He orders Linn to have sex with him and forces the couple into roles as his substitute family.",src:[["Wikipedia","https://en.wikipedia.org/wiki/LFO_(film)"]]},

  {t:"Thirteen Women",y:"1932",f:"movie",m:"Film · United States · English",fog:"villain",mec:"Hypnosis / lethal suggestion",flag:"High confidence",s:"Ursula Georgi uses hypnotic suggestion to manipulate women into suicide or murder; Helen shoots herself after Ursula’s hypnosis, while Laura is also hypnotized to sleep.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Thirteen_Women"],["Dennis Schwartz Reviews","https://dennisschwartzreviews.com/thirteen-women/"]]},
  {t:"In the Power of a Hypnotist",y:"1913",f:"short",m:"Silent short · United States",fog:"villain",mec:"Long-term hypnotic mastery / compelled theft",flag:"Medium-high confidence · film likely lost",s:"Hypnotist Gondorza holds Marjorie, his daughter or adopted daughter, under hypnotic control from childhood. Years later he reasserts mastery; she obeys him and steals jewels.",src:[["IMDb","https://www.imdb.com/title/tt2198630"],["Silent Era","http://silentera.com/PSFL/data/I/InThePowerOfAHypnotist1913.html"]]},
  {t:"The Criminal Hypnotist",y:"1909",f:"short",m:"Silent short · United States",fog:"villain",mec:"Criminal hypnosis",flag:"Medium-high confidence · command details unverified",s:"A criminal hypnotist takes control of a young woman identified as the fiancée. The surviving synopsis establishes control but does not preserve the exact commands.",src:[["French Wikipedia","https://fr.wikipedia.org/wiki/The_Criminal_Hypnotist"]]},
  {t:"The Spy’s Defeat",y:"1913",f:"short",m:"Silent short · production country unverified",fog:"villain",mec:"Hypnosis / compelled espionage",flag:"Medium-high confidence",s:"A Russian spy hypnotizes Fredericka, daughter of a German war minister, and induces her to steal fortification plans.",src:[["IMDb","https://www.imdb.com/title/tt0003403"]]},
  {t:"Kommissar Rex",sub:"“Unter Hypnose”",y:"1996",f:"tv",m:"TV series episode · Austria / Germany · German",fog:"villain",mec:"Hypnosis / compelled murder",flag:"Medium-high confidence · names unverified",s:"An unnamed young woman in the available synopsis stabs her boyfriend to death under hypnosis. The hypnotist’s identity and the woman’s name remain unverified.",src:[["IMDb","https://www.imdb.com/title/tt0621688"]]},
  {t:"Charlie’s Angels",sub:"“The Seance”",y:"1976",f:"tv",m:"TV series episode · United States · English",fog:"villain",mec:"Hypnotic programming",flag:"Medium-high confidence",s:"A fraudulent medium’s male assistant hypnotizes Kelly Garrett and programs her to perceive Jill as a childhood bogey person. Under hypnosis, Kelly attempts to kill Jill and helps the criminal escape.",src:[["IMDb","https://www.imdb.com/title/tt0539260"]]},

  {t:"Nisf Azraa / نصف عذراء",sub:"Half Virgin",y:"1961",f:"movie",m:"Film · Egypt · Arabic",fog:"therapist",mec:"Psychiatric magnetic hypnosis",flag:"High confidence",s:"Psychiatrist Anwar uses magnetic hypnosis to control Zeinab and other women he desires. Zeinab is assaulted while controlled, and other victims later testify against him.",src:[["Arabic Wikipedia","https://ar.wikipedia.org/wiki/%D9%86%D8%B5%D9%81_%D8%B9%D8%B0%D8%B1%D8%A7%D8%A1_(%D9%81%D9%84%D9%85)"],["elCinema","https://elcinema.com/work/1005633/content"],["Dhliz","https://dhliz.com/film/nesf_3athra2/"]]},

  {t:"Power of Suggestion",y:"1960",f:"tv",m:"TV series episode · United States · English",fog:"disputed",mec:"Post-hypnotic command",flag:"Medium confidence · obedience unverified",s:"A domineering nightclub hypnotist’s assistant fears he has given her a post-hypnotic command to kill someone. The available synopsis does not establish whether she carries out the command.",src:[["IMDb","https://www.imdb.com/title/tt0713746"]]},

  {t:"In the Grip of a Charlatan",y:"1913",f:"short",m:"Silent short · United States",fog:"cult",mec:"Cult-leader hypnosis / compelled theft",flag:"Medium-high confidence",s:"Fraudulent swami Baroudi places heiress Anne Sinclair under his hypnotic spell and commands her to bring him her necklace at ten that night. She returns in a daze and obeys.",src:[["IMDb","https://www.imdb.com/title/tt0233930"]]},

  {t:"Night of the Eagle",sub:"US title: Burn, Witch, Burn!",y:"1962",f:"movie",m:"Film · United Kingdom · English",fog:"variant",mec:"Witchcraft-induced trance",flag:"High confidence · borderline mechanism",s:"Rival witch Flora Carr uses witchcraft to put Tansy Taylor into a trance and turn her against her husband; Tansy attacks him with a knife while controlled. The mechanism is occult trance rather than clinical hypnosis.",src:[["Wikipedia","https://en.wikipedia.org/wiki/Night_of_the_Eagle"],["IMDb","https://www.imdb.com/title/tt0056279"]]},
  {t:"Alfred Hitchcock Presents",sub:"“Murder Me Twice” · S04E09",y:"1958",f:"tv",m:"TV series episode · United States · English",fog:"variant",mec:"Hypnotic trance / past-life regression",flag:"Medium confidence · volunteered trance",s:"Amateur hypnotist Miles Farnham puts Lucy Pryor into a trance during a séance; under hypnosis she stabs her husband with total amnesia and, when hypnotized again in court, kills Farnham. The episode frames the acts as past-life regression or possession, and Lucy initially volunteers for the trance.",src:[["TheTVDB","https://thetvdb.com/series/alfred-hitchcock-presents/allseasons/official"],["Ranker","https://www.ranker.com/list/full-list-of-alfred-hitchcock-presents-episodes/reference?page=2"]]},
  {t:"Joy à Moscou",y:"1992",f:"movie",m:"Film · France / Russia · production details unverified",fog:"supernatural",mec:"Rasputin-descendant hypnosis",flag:"Medium-high confidence · metadata unconfirmed",s:"Joy and other recruited women are hypnotized by a descendant of Rasputin and used to seduce rich tourists for an underground organization. Production country, language and character details remain unconfirmed.",src:[["IMDb","https://www.imdb.com/title/tt0378143"]]},
  {t:"Tau kwai mou jeu 2: Yau yan fan jeu",y:"2003",f:"movie",m:"Film · likely Hong Kong · likely Cantonese",fog:"supernatural",mec:"Hypnotic powers / compelled suicide",flag:"Medium-high confidence · metadata unconfirmed",s:"A billionaire uses hypnotic powers to seduce women in his company and then makes them commit suicide; a reporter’s friend is among the victims. English title, country and cast remain unconfirmed.",src:[["IMDb","https://www.imdb.com/title/tt0378884"]]},

  {t:"Hypnose",y:"1920",f:"movie",m:"Silent film · likely Germany",fog:"lead",mec:"Hypnosis",flag:"Low confidence · obedience unverified",s:"Professor Mors puts Claire Raven under hypnosis, but the available evidence does not establish a command she obeys or confirm the production details.",src:[["IMDb","https://www.imdb.com/title/tt0276209"]]},
  {t:"Morgana",y:"Year unverified",f:"short",m:"Short comedy / mystery · country unverified",fog:"lead",mec:"Hypnotic control of women",flag:"Low confidence · year and country unverified",s:"Businessman Jules Ribeira is described as able to hypnotize women and make them do whatever he pleases. The year, country and fuller plot remain unverified.",src:[["IMDb","https://www.imdb.com/title/tt1380159"]]},

  {t:"Saimin Ryoujoku Gakuen",y:"2008",f:"tv",m:"Adult-animation OVA · Japan · Japanese",fog:"adult",mec:"Hypnotic drugs / will alteration",flag:"Low-medium confidence · explicit sexual content",s:"A counselor uses hypnotic drugs to alter female students’ wills. This adult-animation entry is flagged because the available synopsis is explicit and rests on limited evidence.",src:[["IMDb","https://www.imdb.com/title/tt21447168"]]},
  {t:"Saimin Jutsu Zero",y:"2013",f:"tv",m:"Adult-animation OVA · Japan · Japanese",fog:"adult",mec:"Doctor-administered hypnosis / sexual enslavement",flag:"Low-medium confidence · explicit sexual content",s:"A school doctor hypnotizes female students and makes them sexual slaves. This adult-animation entry is separately flagged and supported only by the cited synopsis.",src:[["IMDb","https://www.imdb.com/title/tt22188914"]]}
];

function grantForcedCategory(match, group){
  const entry=entries.find(match);
  if(!entry)return;
  entry.c=[...new Set([...(entry.c||[]),"forced-obedience"])];
  entry.fog=group;
}

forcedObedienceRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t&&String(entry.y)===String(row.y));
  if(existing){
    existing.c=[...new Set([...(existing.c||[]),"forced-obedience"])];
    existing.fog=row.fog;
    return;
  }
  entries.push({...row,c:["forced-obedience"]});
});

grantForcedCategory(entry=>entry.t.startsWith("Amore e ipnotismo")&&entry.y==="1912","partner");
grantForcedCategory(entry=>entry.t==="The Forces of Evil; or, The Dominant Will"&&entry.y==="1914","partner");
grantForcedCategory(entry=>entry.t==="Svengali"&&entry.y==="1931"&&entry.c.includes("human"),"villain");
grantForcedCategory(entry=>entry.t==="Whirlpool"&&entry.y==="1949","therapist");
grantForcedCategory(entry=>entry.t==="Hypnotic"&&entry.y==="2021","therapist");
grantForcedCategory(entry=>entry.t==="The Hypnotic Eye"&&entry.y==="1960"&&entry.c.includes("human"),"stage");
grantForcedCategory(entry=>entry.t==="Hypnotized"&&entry.y==="1910","stage");
grantForcedCategory(entry=>entry.t.startsWith("Fallait pas")&&entry.y==="1996","disputed");
grantForcedCategory(entry=>entry.t==="Shaitaan"&&entry.y==="2024","supernatural");
grantForcedCategory(entry=>entry.t.includes("Buffy vs. Dracula")&&entry.y==="2000"&&entry.c.includes("vampire"),"supernatural");
grantForcedCategory(entry=>entry.t==="Vash"&&entry.y==="2023","lead");
