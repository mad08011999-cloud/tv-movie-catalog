// 2 October 2026 worldwide sweep: doctor / therapist controls female characters for personal gain.
// Twenty verified findings are upserted so prior catalog rows gain membership without duplication.
const doctorGainRows = [
  {
    match:e=>e.t==="The Sinister Eyes of Dr. Orloff"&&String(e.y)==="1973",
    t:"The Sinister Eyes of Dr. Orloff",sub:"Los ojos siniestros del doctor Orloff",y:"1973",f:"movie",m:"Film · Spain · Spanish",dg:"c",
    mec:"Hypnotic trance / suggestion",flag:"HIGH · inheritance motive inferred across sources",
    s:"Psychiatrist Dr. Orloff programs heiress Melissa to kill members of her family as part of a revenge campaign with an inheritance angle.",
    note:"The inheritance motive is supported across the reviewed sources but is not stated as directly as the revenge plot.",
    src:[["DVDBeaver","http://www.dvdbeaver.com/film3/dvd_reviews53/sinsiter_eyes_of_dr._orloff.htm"],["DVD Talk","https://www.dvdtalk.com/reviews/48040/sinister-eyes-of-dr-orloff-the/"],["Sitges Film Festival","https://sitgesfilmfestival.com/en/film/2014/sinister-eyes-dr-orloff"],["MUBI","https://mubi.com/en/us/films/the-sinister-eyes-of-dr-orloff"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Augustine"&&String(e.y)==="2012",
    t:"Augustine",y:"2012",f:"movie",m:"Film · France · French",dg:"a",
    mec:"Clinical hypnosis demonstrations",flag:"HIGH · patient is 19 · historical doctor",
    s:"Neurologist Jean-Martin Charcot hypnotizes 19-year-old patient Augustine and exhibits her in clinical demonstrations that serve his research funding and academic standing; reviews also describe erotic desire under medical cover.",
    note:"Augustine is a 19-year-old young adult; Charcot is a historical figure. The intimacy overlap is borderline rather than a direct hypnosis-to-sex command.",
    src:[],prov:"Sources reviewed in the 2 October 2026 sweep: Cine-Sport, Newcity Film, New York Press, Spectrum Culture and MUBI.",
    cross:["adult-hypnosis","hypno-intimacy","forced-obedience"],ahg:"therapist",fog:"therapist"
  },
  {
    match:e=>e.t==="Dark Shadows"&&/Julia Hoffman|Maggie Evans|vampire-cure/i.test([e.s,e.ch,e.sub].filter(Boolean).join(" ")),
    t:"Dark Shadows",sub:"Episodes 295–298 · Maggie Evans memory-erasure arc",y:"1967",f:"tv",m:"Daytime soap opera · United States · English · ABC",dg:"d",
    mec:"Jeweled-medallion trance hypnosis",flag:"HIGH · FEMALE DOCTOR",
    s:"Psychiatrist Dr. Julia Hoffman hypnotizes Maggie Evans to erase memories of her captivity, protecting Barnabas Collins’s secret and preserving Hoffman’s vampire-cure research and leverage.",
    note:"Controller is a female doctor; the gain combines a cover-up with professional research leverage.",
    src:[["Dark Shadows Commentary","http://darkshadowscommentary.com/tag/josette-du-pres/"],["Dark Shadows Wiki · episode 298","https://darkshadows.fandom.com/wiki/298"],["Rotten Tomatoes","https://www.rottentomatoes.com/tv/dark_shadows/s02/e86"],["IMDb","https://www.imdb.com/title/tt0861057"],["Wikipedia · Julia Hoffman","https://en.wikipedia.org/wiki/Julia_Hoffman"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Diagnosis: Murder"&&String(e.y)==="1997"&&/Delusions of Murder/i.test(e.sub||e.s||""),
    t:"Diagnosis: Murder",sub:"S4E19 · “Delusions of Murder”",y:"1997",f:"tv",m:"TV episode · United States · English",dg:"a",
    mec:"Hypnotic trance",flag:"HIGH · adult crime drama",
    s:"A psychiatrist hypnotizes female patients and sexually abuses them without their knowledge; after his wife discovers the abuse, he uses a patient in a framing and murder-cover-up scheme.",
    note:"Sexual violence is described non-graphically. The same episode also fits the crime-cover-up pattern.",
    src:[["TV Guide","https://www.tvguide.com/tvshows/diagnosis-murder/episodes-season-4/1030895528/"],["Metacritic","https://www.metacritic.com/tv/diagnosis-murder/season-4/episode-14-a-history-of-murder/"],["IMDb","https://www.imdb.com/title/tt0559177"],["The TV IV","http://tviv.org/Diagnosis_Murder/Delusions_of_Murder"]],
    cross:["adult-hypnosis","hypno-intimacy","forced-obedience"],ahg:"therapist",fog:"therapist"
  },
  {
    match:e=>e.t==="Columbo"&&String(e.y)==="1975"&&/Deadly State of Mind/i.test(e.sub||e.s||""),
    t:"Columbo",sub:"S4E6 · “A Deadly State of Mind”",y:"1975",f:"tv",m:"TV episode · United States · English",dg:"b",
    mec:"Trance + hypnosis-inducing drugs + phone trigger",flag:"HIGH",
    s:"Psychiatrist Dr. Mark Collier kills patient Nadia Donner’s husband, hypnotizes Nadia into giving a false account, then activates a phone trigger that makes her believe she is diving into water, silencing a witness.",
    src:[["IMDb","https://www.imdb.com/title/tt0072801"],["The TV IV","http://tviv.org/Columbo/A_Deadly_State_of_Mind"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="General Hospital"&&/Ryan Chamberlain|Lulu|Franco/i.test([e.sub,e.s].filter(Boolean).join(" ")),
    t:"General Hospital",sub:"January–February 2019 · Ryan Chamberlain / Lulu Spencer arc",y:"2019",f:"tv",m:"Daytime soap opera · United States · English",dg:"b",
    mec:"Trance presented as therapeutic hypnosis",flag:"HIGH",
    s:"Serial killer Ryan Chamberlain, a pediatrician posing as psychiatrist Kevin Collins, offers victim Lulu Spencer hypnosis to recover memories but implants false ones so she identifies Franco Baldwin as her attacker.",
    src:[["General Hospital Wiki","https://general-hospital.fandom.com/wiki/Ryan_Chamberlain_(Jon_Lindstrom)"],["Soap Opera Spy","https://www.soapoperaspy.com/2019/general-hospital-spoilers-lulu-ids-franco-as-attacker-ryan-frames-former-killer/"],["Soap Dirt","https://soapdirt.com/general-hospital-spoilers-lulu-faces-franco-hidden-memories-unfold-ryan-at-risk/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="General Hospital"&&/Kevin O'Connor|Laurelton|Terry Brock/i.test([e.sub,e.s].filter(Boolean).join(" ")),
    t:"General Hospital",sub:"1985–86 · Kevin O’Connor / Laurelton storyline",y:"1985–86",f:"tv",m:"Daytime soap opera · United States · English",dg:"b",
    mec:"Hypnotic trance",flag:"HIGH",
    s:"Doctor and serial killer Kevin O’Connor hypnotizes fiancée and later wife Terry Brock into believing she committed the Laurelton murders, shifting blame for his crimes onto her.",
    src:[["Soap Opera Digest","https://www.soapoperadigest.com/content/ghs-devious-dastardly-docs-0/"],["SoapCentral","https://www.soapcentral.com/general-hospital/general-hospital-s-notorious-serial-killers"],["General Hospital Wiki","https://general-hospital.fandom.com/wiki/The_Laurelton_Murders"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Days of Our Lives"&&/Princess Gina|Hope Brady/i.test([e.sub,e.s].filter(Boolean).join(" ")),
    t:"Days of Our Lives",sub:"2019–20 · Princess Gina arc",y:"2019–20",f:"tv",m:"Daytime soap opera · United States · English · NBC",dg:"c",
    mec:"Brainwashing by implanted chip — not classical hypnosis",flag:"HIGH · CHIP / SCI-FI MECHANISM",
    s:"Dr. Wilhelm Rolf reactivates the chip in Hope Brady’s neck, turning her into Princess Gina, who carries out art theft, forgery and attempted murder for the DiMera organization.",
    note:"Mechanism is an implanted mind-control chip and brainwashing, not trance hypnosis.",
    src:[["The List","https://www.thelist.com/830430/how-did-the-princess-gina-storyline-work-out-on-days-of-our-lives/"],["Soap Opera Spy","https://www.soapoperaspy.com/2019/days-of-our-lives-spoilers-xander-first-to-realize-whats-wrong-with-hope-brady/"],["Daily Soap Dish","https://dailysoapdish.com/nbc-days-of-our-lives-spoilers-hope-brady-devastated-over-what-princess-gina-has-done/"]],
    cross:["forced-obedience","royal-hypnosis"],fog:"therapist"
  },
  {
    match:e=>e.t==="Days of Our Lives"&&/Queen of the Night|Marlena|Stefano/i.test([e.sub,e.s].filter(Boolean).join(" "))&&String(e.y).includes("2020"),
    t:"Days of Our Lives",sub:"March 2020 · Queen of the Night arc",y:"2020",f:"tv",m:"Daytime soap opera · United States · English · NBC",dg:"e",
    mec:"Brain chip + surgical personality adjustment — sci-fi brainwashing",flag:"HIGH · NON-TRANCE MECHANISM",
    s:"Dr. Wilhelm Rolf performs a personality-transplant procedure on Dr. Marlena Evans, recasting her as Stefano DiMera’s Queen of the Night and forcing romantic devotion to him.",
    note:"The control is chip-assisted surgery and brainwashing, not classical hypnosis.",
    src:[["SoapCentral","https://www.soapcentral.com/days-of-our-lives/days-of-our-lives-weekly-recap-for-200309"],["Celeb Dirty Laundry","https://www.celebdirtylaundry.com/2020/days-of-our-lives-spoilers-week-of-march-9-nicoles-baby-swap-bomb-evans-legal-victory-orpheus-mystery-marlenas-mind-warp/"],["Soap Opera Spy","https://www.soapoperaspy.com/2020/days-of-our-lives-spoilers-john-panics-as-marlena-gets-another-procedure/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Hannibal"&&String(e.y)==="2014"&&/Yakimono|Miriam Lass/i.test([e.sub,e.s].filter(Boolean).join(" ")),
    t:"Hannibal",sub:"S2E7 · “Yakimono”",y:"2014",f:"tv",m:"TV episode · United States · English",dg:"b",
    mec:"Psychiatric conditioning / brainwashing — not stage trance",flag:"HIGH · NON-TRANCE MECHANISM",
    s:"Forensic psychiatrist Hannibal Lecter conditions former FBI trainee Miriam Lass to identify Frederick Chilton as her captor and the Chesapeake Ripper; she then shoots Chilton, diverting suspicion from Hannibal.",
    note:"The series frames this as prolonged psychiatric conditioning and mind control rather than stage-style hypnosis.",
    src:[["Bustle","https://www.bustle.com/articles/21418-did-hannibal-really-just-kill-off-dr-chilton-we-search-for-spoilers-in-the-books"],["Wikipedia","https://en.wikipedia.org/wiki/Yakimono_(Hannibal)"],["Den of Geek","https://www.denofgeek.com/tv/hannibal-season-2-episode-7-review-yakimono/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Pretty Little Liars"&&String(e.y).includes("2016")&&String(e.y).includes("2017"),
    t:"Pretty Little Liars",sub:"Season 6 finale + Season 7 · Alison / Archer Dunhill arc",y:"2016–17",f:"tv",m:"TV series · United States · English",dg:"d",
    mec:"Drug-assisted manipulation and gaslighting — not trance",flag:"HIGH · EDGE MECHANISM",
    s:"Psychologist Archer Dunhill, posing as Dr. Elliot Rollins, drugs and gaslights Alison DiLaurentis into psychiatric commitment, marries her and gains control of half the Carissimi Group fortune.",
    note:"This is drug-assisted manipulation and gaslighting rather than formal trance hypnosis.",
    src:[["Bustle · betrayal","https://www.bustle.com/articles/148201-elliot-rollins-mary-drake-are-working-together-on-pretty-little-liars-revealing-a-huge-betrayal"],["Bustle · Rollins","https://www.bustle.com/articles/168142-who-is-dr-rollins-on-pretty-little-liars-alisons-husband-cant-be-trusted"],["Pretty Little Liars Wiki","https://prettylittleliars.fandom.com/wiki/Arcison"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Saimin Jutsu Zero"&&String(e.y)==="2013",
    t:"Saimin Jutsu Zero",sub:"催眠術ZERO · 2-episode OVA",y:"2013",f:"tv",m:"Adult anime OVA · Japan · Japanese",dg:"a",
    mec:"Fantasy “magical hypnosis” — not clinical hypnosis",flag:"HIGH · [ADULT] 18+ · SCHOOL SETTING",
    s:"School doctor Murakoshi Shinta uses fantasy hypnosis to override female students’ wills for sexual exploitation.",
    note:"Adult animation set at a school; mechanism is magical mind control rather than clinical hypnosis.",
    src:[["MyAnimeList","https://myanimelist.net/anime/18151/Saimin_Jutsu_Zero"],["aniSearch","https://www.anisearch.com/anime/8435,sex-hypnotist-zero"],["IMDb","https://www.imdb.com/title/tt22188914"]],
    cross:["adult-hypnosis","hypno-intimacy","forced-obedience"],ahg:"therapist",fog:"adult"
  },
  {
    match:e=>e.t==="The Scarapist"&&String(e.y)==="2015",
    t:"The Scarapist",y:"2015",f:"movie",m:"Film · United States · English · 81 min",dg:"e",
    mec:"Hypnosis + drugs",flag:"HIGH · FEMALE DOCTOR",
    s:"Female hypnotherapist Ilse draws novelist, wife and mother Lana into bogus therapy, uses hypnosis with controlling effects, deceives Lana’s husband and extends control over the patient’s family.",
    note:"Controller is a female hypnotherapist; the film is based on a therapist-abuse case.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/The_Scarapist"],["ScreenAnarchy","https://screenanarchy.com/2016/10/a-winning-recipe-for-halloween-popcorn-trick-or-treat-candy-and-the-scarapist-contrib.html"],["HorrorBuzz","https://horrorbuzz.com/award-winning-indie-horror-the-scarapist-arrives-on-tubi-this-month/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t.startsWith("The Diabolical Dr. Z")&&String(e.y)==="1966",
    t:"The Diabolical Dr. Z",sub:"Miss Muerte",y:"1966",f:"movie",m:"Film · Spain / France · Spanish / French",dg:"c",
    mec:"Machine mind-control presented as hypnosis — not trance",flag:"MEDIUM · FEMALE DOCTOR · MACHINE MECHANISM",
    s:"Female surgeon Irma Zimmer uses her father’s Z-ray apparatus to turn Nadia and other women into obedient killers in a revenge campaign against the scientists who ruined him.",
    note:"Controller is a female doctor; the mechanism is machine mind-control rather than classical hypnosis.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/The_Diabolical_Dr._Z"],["AllMovie","https://www.allmovie.com/movie/v125047"],["Trailers from Hell","https://trailersfromhell.com/cinesavant/the-diabolical-dr-z-2/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="The Vengeance of Dr. Mabuse"&&String(e.y)==="1972",
    t:"The Vengeance of Dr. Mabuse",sub:"Dr. M schlägt zu",y:"1972",f:"movie",m:"Film · Spain / West Germany · Spanish / German",dg:"c",
    mec:"Hypnotic drug + electronic mind-control apparatus",flag:"MEDIUM · DRUG / MACHINE MECHANISM",
    s:"Dr. Mabuse’s organization injects a kidnapped female institute employee with a hypnotic drug and uses electronic mind-control equipment to force her to reveal super-weapon plans.",
    note:"The gain is state-secret theft and power; the mechanism combines drugs and a machine rather than standalone trance hypnosis.",
    src:[["IMDb","https://www.imdb.com/title/tt0071439"]],prov:"Additional sources reviewed in the 2 October 2026 sweep: Robert Monell and The Digital Bits.",
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>/Extra(?:ñ|n)o Retorno de Diana Salazar/i.test(e.t)&&String(e.y)==="1988",
    t:"El Extraño Retorno de Diana Salazar",y:"1988",f:"tv",m:"Telenovela · Mexico · Spanish · Televisa",dg:"d",
    mec:"Psychological manipulation in therapy — not formal trance",flag:"MEDIUM · BORDERLINE NON-TRANCE MECHANISM",
    s:"Psychiatrist Irene del Conde uses psychological knowledge to manipulate Diana Salazar for revenge and to separate her from Eduardo; a colleague also seeks to exploit Diana’s powers for personal benefit.",
    note:"The sourced mechanism is psychological manipulation under a therapy setting, not formal trance hypnosis.",
    src:[["Spanish Wikipedia","https://es.wikipedia.org/wiki/El_extra%C3%B1o_retorno_de_Diana_Salazar"]],prov:"Additional sources reviewed in the 2 October 2026 sweep: TVyNovelas and EnPalco.",
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Nemureru Mori"&&String(e.y)==="1998",
    t:"Nemureru Mori",sub:"A Sleeping Forest · 眠れる森",y:"1998",f:"tv",m:"TV series · Japan · Japanese · Fuji TV · 12 episodes",dg:"b",
    mec:"Hypnotherapy: memory sealing + false-memory implantation",flag:"MEDIUM · MOTIVE AMBIGUOUS",
    s:"Psychiatrist Ito Naomi seals Oba Minako’s memories of a family massacre and implants a false traffic-accident memory. The act can be read as concealing a crime and paternity, or as protective paternal therapy.",
    note:"Both motive readings remain open. The mechanism alters memory and gives no obedience commands.",
    src:[["Japanese Wikipedia","http://ja.wikipedia.org/wiki/眠れる森"],["English Wikipedia","https://en.wikipedia.org/wiki/Nemureru_Mori"],["MyDramaList","https://MYDRAMALIST.COM/1901-a-sleeping-forest"]],
    cross:[]
  },
  {
    match:e=>e.t==="Hannibal"&&String(e.y)==="2014"&&/Su-zakana|Alana Bloom/i.test([e.sub,e.s].filter(Boolean).join(" ")),
    t:"Hannibal",sub:"S2E8 · “Su-zakana”",y:"2014",f:"tv",m:"TV episode · United States · English",dg:"d",
    mec:"Drug-assisted hypnotherapy — debated reading",flag:"MEDIUM · SINGLE DETAILED SOURCE",
    s:"A detailed review reads Hannibal Lecter’s use of psychotropics and hypnotherapy on fellow psychiatrist Alana Bloom as a way to keep an ally under his influence and neutralize a threat.",
    note:"The drug-assisted hypnotherapy interpretation is debated and rests chiefly on one detailed review.",
    src:[["Pajiba","https://www.pajiba.com/tv_reviews/hannibal-suzakana-were-caught-in-a-trap.php"],["The TV IV","http://tviv.org/Hannibal/Su-zakana"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Nurse Diary: Beast Afternoon"&&String(e.y)==="1982",
    t:"Nurse Diary: Beast Afternoon",sub:"看護婦日記 獣じみた午後",y:"1982",f:"movie",m:"Film · Japan · Japanese · Nikkatsu pink film",dg:"c",
    mec:"Secret clinical hypnosis + bell post-hypnotic trigger",flag:"MEDIUM · [EROTIC] PINK FILM",
    s:"Tachibana Clinic doctors secretly hypnotize patient Reiko as a trigger-controlled test subject for the experimental Dream Ring device; the conditioning is also used to make her commit murder.",
    note:"Erotic pink film. The gain is institutional and commercial experimentation as well as control over the patient.",
    src:[["RareFilm","https://rarefilm.net/nurse-diary-beast-afternoon-1982-naosuke-kurosawa-maiko-kazama-jun-miho-miki-yamaji-hideo-shiroyama-crime-sci-fi-erotic/"],["IMDb","https://www.imdb.com/title/tt0287516"],["Coffee Coffee and More Coffee","http://www.coffeecoffeeandmorecoffee.com/archives/2016/10/"]],
    cross:["forced-obedience"],fog:"therapist"
  },
  {
    match:e=>e.t==="Saimin Ryoujoku Gakuen"&&String(e.y).startsWith("2008"),
    t:"Saimin Ryoujoku Gakuen",sub:"催眠凌辱学園 · 3-episode OVA",y:"2008–09",f:"tv",m:"Adult anime OVA · Japan · Japanese",dg:"a",
    mec:"Hypnotic drugs — not trance",flag:"MEDIUM · [ADULT] 18+ · NON-DOCTOR EDGE · SCHOOL SETTING",
    s:"Guidance counsellor and teacher Fujimi Toshikazu uses hypnotic drugs to override female students’ wills for sexual exploitation.",
    note:"Non-doctor edge: the controller is a school counsellor/teacher, not a physician. Adult animation set at a school.",
    src:[["Anime News Network","https://www.Animenewsnetwork.com/encyclopedia/anime.php?id=11462"],["IMDb","https://www.imdb.com/title/tt21447168"]],
    cross:["adult-hypnosis","hypno-intimacy","forced-obedience"],ahg:"therapist",fog:"adult"
  }
];

function upsertDoctorGain(row){
  let entry=entries.find(row.match);
  if(!entry){
    entry={t:row.t,sub:row.sub,y:row.y,f:row.f,m:row.m,c:[],mec:row.mec,flag:row.flag,s:row.s,src:row.src||[]};
    if(row.note)entry.note=row.note;
    if(row.prov)entry.prov=row.prov;
    entries.push(entry);
  }
  entry.c=[...new Set([...(entry.c||[]),"doctor-gain",...(row.cross||[])])];
  entry.dg=row.dg;
  entry.dgT=row.t; entry.dgSub=row.sub; entry.dgY=row.y; entry.dgM=row.m;
  entry.dgS=row.s; entry.dgMec=row.mec; entry.dgFlag=row.flag; entry.dgNote=row.note;
  entry.dgSrc=row.src&&row.src.length?row.src:(entry.src||[]);
  entry.dgProv=row.prov;
  if(row.ahg)entry.ahg=row.ahg;
  if(row.fog)entry.fog=row.fog;
}
doctorGainRows.forEach(upsertDoctorGain);

// Seven already-cataloged overlaps receive membership only; no new rows are created.
const doctorGainOverlapGrants=[
  {match:e=>e.t==="Rasputin the Mad Monk"&&String(e.y)==="1966",note:"Existing-record overlap · mystic faith-healer, not a physician"},
  {match:e=>/Thousand Eyes of Dr\. Mabuse/i.test(e.t)&&String(e.y)==="1960",note:"Existing-record overlap · criminal mastermind / doctor of psychology"},
  {match:e=>e.t==="The Forces of Evil; or, The Dominant Will"&&String(e.y)==="1914",note:"Existing-record overlap"},
  {match:e=>e.t==="Hypnotic"&&String(e.y)==="2021",note:"Existing-record overlap · hypnotherapist uses a patient for possessive replacement"},
  {match:e=>e.t.startsWith("Smoke and Mirrors / Scot-Free")&&String(e.y)==="1995",note:"Existing-record overlap"},
  {match:e=>e.t.startsWith("The Hypnotized / Faceless Beauty")&&String(e.y)==="2004",note:"Existing-record overlap"},
  {match:e=>e.t==="Hypnotic / จิตสะกดแค้น"&&String(e.y)==="2025",note:"Existing-record overlap · TEEN-VICTIM CAVEAT"}
];
doctorGainOverlapGrants.forEach(grant=>{
  const entry=entries.find(grant.match);
  if(!entry)return;
  entry.c=[...new Set([...(entry.c||[]),"doctor-gain"])]
  entry.dg="x";
  entry.dgNote=grant.note;
});
