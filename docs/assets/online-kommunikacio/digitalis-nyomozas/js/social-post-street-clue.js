// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Az 1. ügy hatodik nyoma: a képen látható utcanév.
// A modult az app.js előtt töltjük be, ezért a fő alkalmazás
// már a kibővített ügyadatokkal indul el.
// =========================================================

import { GAME_DATA } from "./data.js";

const STREET_CLUE_ID = "street-name";
const socialCase = GAME_DATA.socialPostCase;

const alreadyAdded = socialCase.hotspots.some((hotspot) => {
  return hotspot.id === STREET_CLUE_ID;
});

if (!alreadyAdded) {
  socialCase.hotspots.push({
    id: STREET_CLUE_ID,
    accessibleLabel: "A képen látható Kossuth utca feliratú tábla",
    title: "Utcanév: Kossuth utca",
    category: "Felismerhető helyszín",
    feedback:
      "Az utcanév önmagában még nem feltétlenül azonosít valakit. " +
      "Az iskola nevével és a rendszeresen közölt találkozási hellyel együtt azonban " +
      "már sokkal pontosabban meghatározható, hol készült a bejegyzés.",
    scoreType: "investigation",
    points: 10,
    evidence: {
      id: "social-post-street-name",
      title: "Felismerhető utcanév: Kossuth utca",
      source: "A bejegyzés képének háttere",
      certainty: "Biztos adat",
      description:
        "A képen olvasható utcanév az iskola nevével és a rutinnal együtt pontosíthatja a rendszeresen látogatott helyet.",
      caseId: "social-post"
    },
    x: 23,
    y: 30,
    width: 13,
    height: 10
  });
}

socialCase.totalHotspots = socialCase.hotspots.length;
