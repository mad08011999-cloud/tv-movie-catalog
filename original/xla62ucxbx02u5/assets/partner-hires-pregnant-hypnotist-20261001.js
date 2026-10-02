// 1 Oct 2026 round-2 worldwide sweep: a partner engages a third-party hypnotist
// while the woman is pregnant. This cross-files and enriches the existing
// Ultrasound record; it must not create a duplicate catalog record.
{
  const ultrasound = entries.find(entry => entry.t === "Ultrasound" && entry.y === "2021");
  if (ultrasound) {
    ultrasound.c = [...new Set([...(ultrasound.c || []), "partner-pregnant-hire"])];
    ultrasound.mec = "Third-party stage hypnotist · ultrasound-frequency suggestion";
    ultrasound.flag = "MEDIUM-HIGH confidence · relationship caveat";
    ultrasound.s = "Plot detail (round-2 verified, triple-sourced): Alex Harris, Katie's partner and father of her unborn child, engaged stage hypnotist Art to keep the pregnant Katie unaware of her pregnancy during his campaign (Wikipedia plot section; entertainment-focus and crypticrock reviews). Confidence MEDIUM-HIGH. Note: the film presents their relationship as extramarital rather than a formal marriage.";
    ultrasound.note = "";
    ultrasound.src = [
      ["Wikipedia · full plot", "https://en.wikipedia.org/wiki/Ultrasound_(film)"],
      ["Entertainment Focus · review", "https://entertainment-focus.com/2022/07/11/ultrasound-review/"],
      ["Cryptic Rock · review", "https://crypticrock.com/ultrasound-movie-review/"]
    ];
    ultrasound.prov = "Round-2 worldwide sweep completed 1 Oct 2026; the plot detail was corroborated across the three linked sources.";

    ultrasound.strictMec = ultrasound.mec;
    ultrasound.strictFlag = ultrasound.flag;
    ultrasound.strictS = ultrasound.s;
    ultrasound.strictSrc = ultrasound.src;
    ultrasound.strictProv = ultrasound.prov;

    ultrasound.partnerPregnantMec = ultrasound.mec;
    ultrasound.partnerPregnantFlag = ultrasound.flag;
    ultrasound.partnerPregnantS = ultrasound.s;
    ultrasound.partnerPregnantSrc = ultrasound.src;
    ultrasound.partnerPregnantNote = ultrasound.note;
    ultrasound.partnerPregnantProv = ultrasound.prov;
  }
}
