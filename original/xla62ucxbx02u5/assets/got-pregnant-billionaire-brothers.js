/* User-requested title verification — staged 2026-10-01.
 * NetShort episode guides confirm that Audrey Huntington's pregnancy overlaps
 * the hypnosis arc in which Anthony Cavanaugh makes her believe she is his wife
 * and in love with him. Must load after assets/mirror-import.js. Idempotent:
 * find-or-push on (t, y), preserving both requested category memberships. */

const billionaireBrothersRow={
  t:"Got Pregnant by Billionaire Brothers",
  y:"2024",
  f:"tv",
  m:"Short-form vertical drama series · China-produced · English · NetShort / DramaBox · ~75 episodes",
  s:"Heiress Audrey Huntington becomes pregnant by one of the Vanderbilt brothers, Caspian or Killian, with the father's identity unknown. Obsessed suitor Anthony Cavanaugh kidnaps her and hypnotizes her into believing she is his wife and deeply in love with him; the hypnosis arc (eps 54–71) overlaps her revealed pregnancy (ep 62). She resists subconsciously while the brothers vow to save her.",
  mec:"Hypnosis",
  flag:"Medium · NetShort per-episode guides (eps 54/56/62/65/67/74) + DramaBox listing; year approximate",
  src:[
    ["NetShort · EP 56","https://netshort.com/episode/got-pregnant-by-billionaire-brothers-1927583834537500674-ep-56"],
    ["NetShort · EP 54","https://netshort.com/episode/got-pregnant-by-billionaire-brothers-1927583834537500674-ep-54"],
    ["NetShort · EP 61–75","https://netshort.com/full-episodes/got-pregnant-by-billionaire-brothers-1927583834537500674/page/4"],
    ["DramaBox listing","https://www.dramaboxapp.com/tag/63048/76"],
    ["Series promo","https://youtube.com/watch?v=7SvA6duQSNg"]
  ],
  note:"Outcome facts: Audrey remains pregnant throughout the hypnosis arc, with her unborn child referenced through episodes 74–75; the forced marriage-sham plot is interrupted.",
  prov:"User-requested title verification, 01 Oct 2026 (NetShort episode-guide evidence; not transcript-verified)",
  c:["love","pregnant-strict"],
  psg:"villain",
  loveSweep:true
};

const billionaireExisting=entries.find(entry=>entry.t===billionaireBrothersRow.t&&String(entry.y)===String(billionaireBrothersRow.y));
if(billionaireExisting){
  Object.assign(billionaireExisting,billionaireBrothersRow,{c:[...new Set([...(billionaireExisting.c||[]),...billionaireBrothersRow.c])]});
  console.info("got-pregnant-billionaire-brothers: merged existing row");
}else{
  entries.push(billionaireBrothersRow);
  console.info("got-pregnant-billionaire-brothers: net-new rows=1");
}
