const therapistWifeRows = [
  {
    match: entry => entry.t === "Whirlpool" && entry.y === "1949",
    t: "Whirlpool", y: "1949", f: "movie", m: "Film · United States · English", twg: "criminal",
    mec: "Therapist hypnosis / criminal exploitation", flag: "High confidence",
    s: "Society hypnotist David Korvo treats psychoanalyst William Sutton’s wife Ann for kleptomania, places her under deep hypnotic control, manipulates her actions and frames her for murder.",
    src: [["TCM","https://www.tcm.com/video/1105320/whirlpool-1949-movie-clip-your-soul-can-undress"],["Emma Knightley","https://knightleyemma.com/2022/08/18/whirlpool/"],["DigiGuide","https://digiguide.tv/programme/Film/Whirlpool/29671/"]]
  },
  {
    match: entry => entry.t === "Hypnotic" && entry.y === "2021",
    t: "Hypnotic", y: "2021", f: "movie", m: "Film · United States · English", twg: "criminal",
    mec: "Post-hypnotic trigger / murderous concealment", flag: "High confidence",
    s: "Psychotherapist Dr. Collin Meade implants post-hypnotic triggers in his patients. Married patient Gina Kelman is a qualifying wife: he activates her trigger while she drives, causing the crash that kills Gina and her husband. Protagonist Jenn is unmarried and is not the wife match.",
    src: [["Wikipedia","https://en.wikipedia.org/wiki/Hypnotic_(2021_film)"],["Den of Geek","https://www.denofgeek.com/movies/hypnotic-ending-explained/"]]
  },
  {
    match: entry => entry.t === "Tee Ratra" && entry.y === "2010",
    t: "Tee Ratra", sub: "ती रात्र", y: "2010", f: "movie", m: "Film · India · Marathi", twg: "coercive",
    mec: "Husband-commissioned psychiatric hypnosis", flag: "High confidence",
    s: "A suspicious husband installs hidden cameras and hires his psychiatrist friend, who stages extreme trauma and uses hypnosis to drag his wife’s subconscious to the surface until she reveals her secret.",
    src: [["Marathi Movie World","https://marathimovieworld.com/review/tee-ratra-review.php"],["IMDb","https://www.imdb.com/title/tt2652964"]]
  },
  {
    match: entry => entry.t.startsWith("Amore e ipnotismo") && entry.y === "1912",
    t: "Amore e ipnotismo", sub: "Love and Hypnotism", y: "1912", f: "short", m: "Silent short film · Italy probable", twg: "coercive",
    mec: "Physician-husband hypnosis / jealous interrogation", flag: "Medium confidence · single-source plot summary",
    s: "A doctor suspects his wife Helen Thomas of infidelity and hypnotizes her to force her to reenact and reveal what happened the previous evening. The Italian origin and production details remain unverified.",
    src: [["IMDb","https://www.imdb.com/title/tt0250531"]]
  },
  {
    match: entry => entry.t === "The Three Faces of Eve" && entry.y === "1957",
    t: "The Three Faces of Eve", y: "1957", f: "movie", m: "Film · United States · English", twg: "therapeutic",
    mec: "Clinical hypnosis / trauma regression", flag: "High confidence",
    s: "Psychiatrist Dr. Curtis Luther uses clinical hypnosis with wife and mother Eve White: alternate personalities emerge during sessions, and hypnotic regression uncovers the childhood trauma behind her dissociative identity disorder.",
    src: [["Wikipedia","https://en.wikipedia.org/wiki/The_Three_Faces_of_Eve"],["YouTube · studio synopsis","https://www.youtube.com/watch?v=WYXJ2U_-p80"]]
  },
  {
    match: entry => entry.t === "Hypnotisören" && entry.y === "2012",
    t: "The Hypnotist / Hypnotisören", y: "2012", f: "movie", m: "Film · Sweden · Swedish", twg: "therapeutic",
    mec: "Psychiatric hypnosis / investigative memory recovery", flag: "High confidence · benevolent investigative use",
    s: "Psychiatrist and hypnosis specialist Erik Bark hypnotizes his own wife Simone to recover information that may identify their son’s kidnapper.",
    src: [["Wikipedia","https://en.wikipedia.org/wiki/The_Hypnotist_(2012_film)"]]
  },
  {
    match: entry => entry.t === "Hypnotized" && entry.y === "2004",
    t: "The Hypnotized / Faceless Beauty", sub: "Eolguleobtneun minyeo · 얼굴없는 미녀", y: "2004", f: "movie", m: "Film · South Korea · Korean", twg: "romantic",
    mec: "Deep hypnosis / therapist boundary violation", flag: "High confidence",
    s: "After Jin-su is forcibly committed by her husband, therapist Suk-kwon treats her with deep hypnosis. When they meet again, he resumes treatment and gradually falls in love with his vulnerable patient, crossing therapeutic boundaries.",
    src: [["YesAsia","https://www.yesasia.com/global/the-hypnotized-vcd-korea-version/1003882986-0-0-0-en/info.html"],["AllMovie","https://www.allmovie.com/movie/the-hypnotized-am54419"]]
  }
];

therapistWifeRows.forEach(row => {
  let entry = entries.find(row.match);
  if (!entry) {
    entry = {t:row.t,y:row.y,f:row.f,m:row.m,c:["therapist-wife"],mec:row.mec,flag:row.flag,s:row.s,src:row.src,twg:row.twg};
    if (row.sub) entry.sub = row.sub;
    entries.push(entry);
    return;
  }
  entry.c = [...new Set([...(entry.c || []), "therapist-wife"])];
  entry.t = row.t;
  if (row.sub) entry.sub = row.sub;
  entry.y = row.y;
  entry.f = row.f;
  entry.m = row.m;
  entry.twg = row.twg;
  entry.mec = row.mec;
  entry.flag = row.flag;
  entry.s = row.s;
  entry.src = [...new Map([...(entry.src || []), ...row.src].map(source => [source[1], source])).values()];
});
