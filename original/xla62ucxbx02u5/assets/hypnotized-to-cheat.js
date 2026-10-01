const hypnotizedToCheatRows = [
  {
    t:"Bram Stoker's Dracula",
    y:"1992",
    f:"movie",
    m:"Film · United States · English",
    c:["cheat-control"],
    ccg:"occult",
    ch:"Lucy Westenra; Mina Murray",
    mec:"Vampire mesmerism / curse",
    flag:"Lucy: high confidence · Mina: medium confidence",
    s:"Count Dracula hypnotically seduces and bites Lucy while she is engaged to Arthur Holmwood. He also charms Mina, Jonathan Harker’s fiancée and later wife, into feelings, dates and a declared love for him; Mina’s thread mixes supernatural compulsion with reincarnation memory and apparent voluntariness.",
    note:"Two qualifying woman-instances in one title. Lucy is the stricter match; Mina’s agency is more ambiguous.",
    src:[["Wikipedia","https://en.wikipedia.org/wiki/Bram_Stoker%27s_Dracula_(1992_film)"]]
  },
  {
    t:"Intermezzo",
    y:"Year unverified",
    f:"short",
    m:"Short film · country and language unverified",
    c:["cheat-control"],
    ccg:"other",
    ch:"Judith",
    mec:"Manipulating voices / supernatural-psychological control",
    flag:"Medium confidence · single-source synopsis",
    s:"After two voices in her head manipulate her, Judith cheats on her husband of thirteen years. The voices later manifest as the devil and the lawyer.",
    note:"The causal match is explicit, but year, country, language and director remain unverified.",
    src:[["IMDb","https://www.imdb.com/title/tt1474236"]]
  },
  {
    t:"Verliefd",
    y:"circa 1995",
    f:"tv",
    m:"Screen title · Netherlands presumed · medium unverified",
    c:["cheat-control"],
    ccg:"uncertain",
    ch:"Cath Bovenkerk",
    mec:"Stage hypnosis / induced love",
    flag:"Low confidence · ambiguous single-source synopsis",
    s:"A friend visits Cath and Piet; after a hypnotist hypnotizes “them,” the synopsis says they fall madly in love. Matching surnames imply Cath and Piet may be married, but the pronoun could instead mean Cath and Piet are reconciled rather than Cath being compelled toward the visitor.",
    note:"Retained only as an uncertain lead. Country, year, medium and the synopsis’s pronoun antecedent are not confirmed.",
    src:[["IMDb","https://www.imdb.com/title/tt1488628"]]
  }
];

hypnotizedToCheatRows.forEach(row=>entries.push(row));

function grantCheatControl(match, group, plotSummary, flag, note, sources){
  const entry=entries.find(match);
  if(!entry)return;
  entry.c=[...new Set([...(entry.c||[]),"cheat-control"])];
  entry.ccg=group;
  entry.s=`${entry.s} ${plotSummary}`;
  entry.flag=flag;
  if(note)entry.note=note;
  entry.src=[...new Map([...(entry.src||[]),...(sources||[])].map(source=>[source[1],source])).values()];
}

grantCheatControl(
  entry=>entry.t==="The Curse of the Jade Scorpion"&&String(entry.y)==="2001",
  "stage",
  "For the infidelity pattern, Betty Ann is already in a secret relationship with boss Chris Magruder, who has promised marriage after divorcing his wife; Voltan’s post-hypnotic command makes her believe she loves C.W. Briggs, whom she seduces in trance before waking with no memory.",
  "High confidence · partner is a lover, not a husband or fiancé",
  "The established partner is a lover who has promised marriage, so this is an explicit but non-marital variant.",
  [["Wikipedia","https://en.wikipedia.org/wiki/The_Curse_of_the_Jade_Scorpion"]]
);

grantCheatControl(
  entry=>entry.t==="Horror of Dracula"&&String(entry.y)==="1958",
  "occult",
  "For the infidelity pattern, Mina Holmwood is Arthur Holmwood’s wife; Dracula uses vampire mesmerism to seduce her and later hypnotizes her into helping him.",
  "Medium confidence · fandom-wiki evidence",
  "Only Mina qualifies for this category; Lucy has no established partner in the 1958 film. The seduction detail rests on specialist fandom wikis rather than a higher-authority plot source.",
  [["Movie Database Wiki","https://moviedatabase.fandom.com/wiki/Dracula/Hammer_Horror"],["Hammer House of Horror Wiki","https://hammerhouseofhorror.fandom.com/wiki/Horror_of_Dracula_(1958)"]]
);
