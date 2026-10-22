import { GAME_DATA } from "./data.js";

GAME_DATA.version = "0.7.0";

const CASE_ID = "final-reconstruction";
const alreadyAdded = GAME_DATA.headquarters.cases.some((item) => item.id === CASE_ID);

if (!alreadyAdded) {
  GAME_DATA.headquarters.cases.push({
    id: CASE_ID,
    number: "04",
    title: "Digitális lábnyom",
    subtitle: "Végső rekonstrukció",
    description:
      "Kapcsold össze a három ügy bizonyítékait, különítsd el a tényeket a következtetésektől, és készíts védelmi tervet!",
    icon: "🧩",
    status: "locked"
  });
}
