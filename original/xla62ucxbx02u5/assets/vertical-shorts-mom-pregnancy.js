/* Vertical-short mom-pregnancy sweep — staged 2026-10-01.
 * Thirteen verified records filed into the existing mom-pregnancy view.
 * The HoneyReels English title and Mandarin upload are one production, stored once.
 * Idempotent: merge on exact title and year while preserving prior memberships. */

const verticalShortMomPregnancyRows=[
  {
    t:"The Scent That Found Me",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · ReelShort · 50 episodes · AI-animated original",
    s:"Perfumer Vera was told her twins had died, then reunites with Luna and her brother five years later and reclaims them with their father, Carter / Lawson Lane. On their wedding day, Vera learns that she is pregnant again.",
    mec:"Second pregnancy after reunification with her twins' father",
    flag:"High confidence · visible pregnancy unconfirmed",
    src:[["ReelShort · official movie page","https://www.reelshort.com/movie/the-scent-that-found-me-6aa763dfdc1f826b5f0bf667"]],
    note:"The official synopsis confirms a wedding-day pregnancy announcement, but no source located for this sweep describes a visible bump, maternity scene or labor.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"一胎两宝：爹地妈咪又怀了",
    sub:"Mommy Is Pregnant Again · also circulated as Two Babies in One Birth: Daddy, Mummy is Pregnant Again",
    y:"2025 · unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · China · Mandarin · licensed YouTube uploads · episode count unconfirmed",
    s:"After entering the wrong room while trying to save her mother, the heroine returns five years later with genius twins. Their father is the billionaire she encountered, and the title states that the twins' mother becomes pregnant again.",
    mec:"Second pregnancy after raising twins",
    flag:"High confidence on title-level plot · visible pregnancy unconfirmed",
    src:[["橘子tv短剧 · licensed full upload","https://www.youtube.com/watch?v=nUK0e-yKXH4"],["嗨Drama剧场 · licensed full upload","https://www.youtube.com/watch?v=F2gagONk7MQ"],["HoneyReels · official channel","https://www.youtube.com/channel/UCZYB2j5gyHnBKcGV505cqrg"]],
    note:"The Mandarin and HoneyReels English titles share cast 王格格, 申浩男, 马秋元 and 柯淳, so they are filed as one record. The pregnancy is title-confirmed; no scene-level visible-pregnancy evidence was located.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; cross-platform alias dedupe",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"一婚还比一婚高",
    sub:"Each Marriage Better Than the Last",
    y:"2026 · upload year",
    f:"tv",
    m:"Short-form vertical drama · China · Mandarin · licensed YouTube upload · episode count unconfirmed",
    s:"Thirty-two-year-old single mother Lin Wan needs cord blood for her ill son Xiao Zhe. After meeting 25-year-old Lu Group CEO Lu Xingchen, she becomes pregnant, enters a contract marriage with him and forms a family of four.",
    mec:"Second pregnancy used in a cord-blood / contract-marriage plot",
    flag:"High confidence · visible pregnancy unconfirmed",
    src:[["百合短劇 · licensed full upload","https://www.youtube.com/watch?v=F4UAPIEQzuQ"]],
    note:"The licensed upload description confirms the pregnancy and family outcome, but does not describe a visible bump or maternity scene.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"They Locked Her Daughter in the Car",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English original · ReelShort · 59 episodes",
    s:"Billionaire heiress Briana is already mother to a daughter and is pregnant again by her husband Dylan. After Dylan locks their daughter in a car to help his ex, Briana rushes to save the child and goes into emergency labor.",
    mec:"Second pregnancy in an established marriage",
    flag:"High confidence · visible-pregnancy evidence medium",
    src:[["ReelShort · official movie page","https://www.reelshort.com/movie/they-locked-her-daughter-in-the-car-69eefd088924136e2a02c409"]],
    note:"Visible-pregnancy anchor: the official synopsis explicitly includes Briana going into emergency labor. No bump description or episode number was located.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"My Ex Rejected Me, He Protected Me",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English original · ReelShort · 34 episodes",
    s:"Single mother Elise Chandler, trying to save her sick daughter, spends a night with her drugged benefactor, CEO Nathaniel Reed. She later discovers that she is pregnant, and Nathaniel publicly claims the baby while protecting mother and daughter.",
    mec:"Single mother becomes pregnant by a new partner",
    flag:"High confidence · visible pregnancy unconfirmed",
    src:[["ReelShort · official movie page","https://www.reelshort.com/movie/my-ex-rejected-me-he-protected-me-69e33b0e276d97ac770bdba4"]],
    note:"The official synopsis confirms the pregnancy but provides no scene-level evidence of a bump, maternity scene or labor.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"For the Custody, I Slept with a Billionaire",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · NetShort · 50 episodes",
    s:"Mother Ivy, desperate to save her son Bob, sleeps with Rex St. Clair for $20,000. Six months later, she is pregnant with Rex's twins while Bob remains central to the story.",
    mec:"Single mother becomes pregnant with twins by a new partner",
    flag:"High confidence · visible-pregnancy evidence high",
    src:[["NetShort · full series","https://netshort.com/full-episodes/for-the-custody-i-slept-with-a-billionaire-2070430284244193281"],["NetShort · episode 4","https://netshort.com/episode/for-the-custody-i-slept-with-a-billionaire-2070430284244193281-ep-4"]],
    note:"Visible-pregnancy anchor: the official episode-4 recap explicitly says Rex sees Ivy's baby bump. Later official recaps describe her protecting her stomach and, in episode 35, collapsing while six months pregnant with twins.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"A Baby, a Billionaire, And Me",
    y:"2025",
    f:"tv",
    m:"Short-form vertical drama · English · NetShort · 80 episodes · released 22 Jan 2025",
    s:"Single mother Sunny already raises her son Shawn. In episode 38 she discovers that she is pregnant again, likely by Jason, heir to the Laws family and Shawn's father.",
    mec:"Single mother becomes pregnant again by her son's father",
    flag:"High confidence · visible-pregnancy evidence medium",
    src:[["NetShort · full series","https://netshort.com/full-episodes/a-baby-a-billionaire-and-me-1880092239205625858"],["NetShort · episode 38","https://netshort.com/episode/a-baby-a-billionaire-and-me-1880092239205625858-ep-38"],["NetShort · dubbed episode 61","https://netshort.com/episode/dubbeda-baby-a-billionaire-and-me-new-6-1889854271021617154-ep-61"]],
    note:"Visible-pregnancy anchor: the episode-61 recap describes Sunny touching her belly, and the official synopsis places her in maternity-clothes shopping. No source explicitly says a bump is visible.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"A Contract Meant to End, A Love Meant to Be",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English-localized · DramaBox · 65 episodes",
    s:"Single mother Claire Hart will do anything to save her son Noah. A one-night stand with billionaire Ethan Cole leaves her pregnant, and the new baby's cord blood could cure Noah, leading the pair into a contract marriage.",
    mec:"Second pregnancy used in a cord-blood / contract-marriage plot",
    flag:"High confidence · visible pregnancy unconfirmed",
    src:[["DramaBox · official synopsis","https://www.dramaboxapp.com/tag/63539/3"],["DramaBox episode listing","https://www.dramaboxdb.com/ep/42000021032_a-contract-meant-to-end-a-love-meant-to-be/701291877_Episode-6"]],
    note:"The pregnancy is confirmed in the platform synopsis, but no episode guide or recap located in the sweep describes a visible bump or maternity scene.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"CEO Wants My Little Rascal",
    y:"2025",
    f:"tv",
    m:"Short-form vertical drama · English · NetShort · approximately 85 episodes · released 3 Apr 2025",
    s:"Single mother Cecilia Thompson raises her son Theo, also called Teddy in translation, alone. Mid-series she discovers that she is pregnant with triplets and later announces that she will keep the babies.",
    mec:"Single mother becomes pregnant with triplets",
    flag:"High confidence · visible-pregnancy evidence medium",
    src:[["NetShort · episode 37","https://netshort.com/episode/ceo-wants-my-little-rascal-1907745229471825922-ep-37"],["NetShort · episode 46","https://netshort.com/episode/ceo-wants-my-little-rascal-1907745229471825922-ep-46"],["Bestie AI · plot recap","https://bestieai.app/topics/stories/ceo-wants-my-little-rascal-plot-analysis-recap-spoilers"],["IMDb","https://www.imdb.com/title/tt36436946"]],
    note:"Visible-pregnancy anchor: episode 37 shows an ultrasound, episode 40 centers a pregnancy-test result, and episode 46 records Cecilia's decision to keep the babies. No recap explicitly describes a visible bump.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"Unconditionally Loved by the Lycan Billionaire",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · English · DramaBox attribution with Stardust TV credit caveat · episode count unconfirmed",
    s:"Dalina raises her son Theo alone after one night with Miguel, Alpha of the Darkmoon Wolf Clan. Six years later, she becomes pregnant with triplets as family secrets unravel.",
    mec:"Single mother becomes pregnant with triplets in a fantasy romance",
    flag:"Medium-high confidence · visible pregnancy unconfirmed",
    src:[["DramaBox · official share page","https://sharet.dramabox.com/gifted/film?uid=2f8cca326fc5ba2417d3bd86ae47c31367fdbacc33ca5f967da66a9652b930e4&lan=en&st=1&bid=42000008172&sid=yz19YK54ca"]],
    note:"Platform attribution caveat: the plot is on an official DramaBox share page, while one child actor's credit attributes the production to Stardust TV. The pregnancy is synopsis-level; no visible-pregnancy detail was located.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; visible-pregnancy follow-up",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"诞下二胎，父母破局",
    sub:"Starring 苗峰 and 许歌",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · China · Mandarin · YouTube commentary / review upload · episode count unconfirmed",
    s:"Mother Su Lan and her husband Gu Qingsong conceive a second child through IVF to foil a son-in-law's scheme to seize their family assets.",
    mec:"IVF second pregnancy in an established marriage",
    flag:"Medium confidence · visible pregnancy unconfirmed",
    src:[["YouTube · commentary / review upload","https://www.youtube.com/watch?v=ad0Gw0jPK04"]],
    note:"Scope caveat: the existing child, Gu Jiajia, is an adult daughter rather than a young child. No source located for the follow-up describes a visible bump or maternity scene.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; filed with user-approved scope caveat",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"Reborn At Sixty, I'm Pregnant Again",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · Chinese-produced · MoboReels · episode count unconfirmed",
    s:"Belinda, mother of adult daughter Emma and grandmother to Emma's son, dies and is reborn. In her sixties, she resolves to conceive again and announces that she is pregnant with twins.",
    mec:"Rebirth-fantasy second pregnancy with twins",
    flag:"High confidence on plot · visible pregnancy unconfirmed",
    src:[["MoboReels · episode 4","https://www.moboreels.com/episode/reborn-at-sixty-im-pregnant-again-42270322-04"],["MoboReels · indexed listing","https://www.moboreels.com/search/reborn-to-take-my-crown"]],
    note:"Scope caveat: this is a rebirth fantasy about an elderly mother with an adult daughter and grandchild. The located episode describes an announcement, not a visible bump.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; filed with user-approved scope caveat",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  },
  {
    t:"Ditch The Mommy Duties After Reborn",
    y:"Unconfirmed",
    f:"tv",
    m:"Short-form vertical drama · Chinese mini-series · English · ReelShort · episode count unconfirmed",
    s:"Long-suffering mother Clara Berry undergoes IVF in hopes of having another child. The treatment succeeds, and she carries the son she had dreamed of while her family relationships unravel.",
    mec:"Successful IVF second pregnancy after rebirth",
    flag:"High confidence on plot · visible pregnancy unconfirmed",
    src:[["ReelShort · official fandom page","https://www.reelshort.com/fandom/ditch-the-mommy-duties-after-reborn-cast-09-2/"]],
    note:"Scope caveat: Clara's existing child Kay is an adult daughter, and she also has granddaughter Amber. The source confirms that Clara carries the baby but does not describe a visible bump or maternity scene.",
    prov:"Vertical-short mom-pregnancy sweep, 01 Oct 2026; filed with user-approved scope caveat",
    c:["mom-pregnancy"],
    verticalShort:true,
    momPregnancySweep:true
  }
];

let verticalShortMomPregnancyNetNew=0;
let verticalShortMomPregnancyMerged=0;
verticalShortMomPregnancyRows.forEach(row=>{
  const existing=entries.find(entry=>entry.t===row.t&&entry.y===row.y);
  if(existing){
    Object.assign(existing,row,{c:[...new Set([...(existing.c||[]),...row.c])]});
    verticalShortMomPregnancyMerged++;
  }else{
    entries.push(row);
    verticalShortMomPregnancyNetNew++;
  }
});
console.info(`vertical-shorts-mom-pregnancy: net-new rows=${verticalShortMomPregnancyNetNew}, merged=${verticalShortMomPregnancyMerged}`);
