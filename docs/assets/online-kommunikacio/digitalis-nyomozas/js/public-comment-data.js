import { GAME_DATA } from "./data.js";

GAME_DATA.version = "0.6.0";

const thirdCase = GAME_DATA.headquarters.cases[2];

Object.assign(thirdCase, {
  id: "public-comment",
  number: "03",
  title: "Nyilvános hozzászólás",
  subtitle: "Rutin és helyadatok",
  description:
    "Vizsgáld meg, hogyan árulhat el egy ártatlannak tűnő hozzászólás időpontot, helyet, útvonalat és jövőbeli rutint!",
  icon: "💬",
  status: "locked"
});
