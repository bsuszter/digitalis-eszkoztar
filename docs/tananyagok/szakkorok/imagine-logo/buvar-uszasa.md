# 🤿 A búvár úszása – lépésről lépésre

<div class="project-hero" style="padding:18px;border-radius:16px;background:#eaf5fb;border:1px solid #bcd9e8"><div><span class="project-kicker">SZAKKÖR · IMAGINE LOGO · ANIMÁCIÓ</span><h2>Keltsd életre a búvárt!</h2><p>A búvár a bal felső részről indul, úszás közben növekszik, majd jobbra kiúszik a képből. A programot kis lépésekben építed fel.</p></div><div class="project-hero__icon">🤿</div></div>

<figure style="max-width:700px;margin:24px auto;text-align:center">
  <video controls playsinline preload="metadata" poster="https://bsuszter.github.io/digitalis-eszkoztar/videos/imagine-logo/tenger-animacio-boritokep.jpg" style="display:block;width:100%;height:auto;border-radius:14px;border:1px solid #bed7e5" aria-label="A tengeri animációt bemutató rövid videó">
    <source src="https://bsuszter.github.io/digitalis-eszkoztar/videos/imagine-logo/tenger-animacio.mp4" type="video/mp4">
    <a href="https://bsuszter.github.io/digitalis-eszkoztar/videos/imagine-logo/tenger-animacio.mp4">Nézd meg a mintavideót!</a>
  </video>
  <figcaption style="font-size:16px;line-height:1.6;color:#436578;margin-top:10px"><strong>🎬 Ezt fogod elkészíteni!</strong> Figyeld meg, hogyan úszik és növekszik a búvár, majd hogyan tűnik el! A háttérrel és a buborékokkal most még nem foglalkozunk.</figcaption>
</figure>

<div class="project-flow" style="padding:12px;background:#315f78;color:white;border-radius:10px;text-align:center;margin:14px 0">KEZDŐÁLLAPOT → MOZGÁS → KÉPKOCKÁK → NÖVEKEDÉS → KIÚSZÁS → KÍSÉRLETEZÉS</div>

<div class="imagine-note" style="padding:14px;border-left:5px solid #357a9e;background:#f0f8fc;color:#263746;border-radius:10px"><strong>Így dolgozz!</strong><p>A kódot <strong>te gépeld be</strong> az Imagine-be. Minden lépés után próbáld ki! Az új sorokat a már meglévő eljárásodba illeszd. A teljes program csak az oldal végén nyitható meg ellenőrzéshez.</p></div>

## 1. Készítsd elő a búvárt!

1. Hozz létre egy teknőcöt, és nevezd el **búvár** névre.
2. <a href="https://bsuszter.github.io/digitalis-eszkoztar/downloads/imagine-logo/buvar-alakja.lgf" download="buvar-alakja.lgf"><strong>Töltsd le a többképkockás búváralakot (.lgf)</strong></a>, majd a teknőc **Alak** lapján töltsd be.
3. A búvár **Eljárások** lapján készíts egy **kezdőállapot** nevű eljárást, és gépeld be:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>eljárás kezdőállapot
  látható! 0
  alakméret! 0.5
  tollatfel
  poz! [-239 179]
  irány! 150
vége</span></div>

**Mit jelent?** A búvár egyelőre láthatatlan (`látható! 0`), félméretű (`alakméret! 0.5`), felemelt tollal a bal felső részre kerül. A `poz!` koordinátáját szükség esetén igazítsd a lapod méretéhez.

**Próba:** írd a parancssorba: `búvár'kezdőállapot`. A búvár eltűnik – ez most helyes, mert még csak előkészítettük.

## 2. Induljon el!

A búvár **Eljárások** lapján készíts egy második, **úszik** nevű eljárást. Egyelőre csak ez legyen benne:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>eljárás úszik
  látható! 1
  ismétlés 10 [
    előre 2
    várj 50
  ]
vége</span></div>

**Próba:** előbb `búvár'kezdőállapot`, majd `búvár'úszik`. A búvár megjelenik és elmozdul.

**Változtass:** az `ismétlés 10` helyett írj `ismétlés 80`-at. Ismételd meg a próbát. Mi változott?

## 3. Mozogjon az alakja is!

Az `úszik` eljárás ismétlésén **belül**, a `várj 50` sor alá írj egy új sort:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>képkocka! képkocka+1</span></div>

**Próba:** indítsd újra a két eljárást. Most a búvár végtagjait is figyeld!

<div class="quick-note"><strong>Két különböző változás</strong><span>Az <code>előre 2</code> a búvár helyét változtatja meg. A <code>képkocka! képkocka+1</code> a letöltött alak következő képkockájára vált. Ettől az úszómozdulat is látható.</span></div>

## 4. Úszás közben növekedjen!

Ugyanebbe az ismétlésbe, a `képkocka!` sor **alá** írd:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>alakméret! alakméret+0.01</span></div>

**Próba:** indítsd újra! A búvár 0,5-szeres méretből indul, majd 80 alkalommal 0,01-del nő: így a végére **1,3-szoros** méretű lesz.

**Gondolkodj:** miért az ismétlés *belsejében* változtatjuk a méretet? Mi történne, ha ezt a sort az ismétlés után írnánk?

## 5. Ússzon ki jobbra!

Az első ismétlést lezáró `]` jel **után**, de a `vége` **elé** írd:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>irány! 90
ismétlés 100 [
  előre 3
  várj 50
  képkocka! képkocka+1
]
látható! 0</span></div>

**Próba:** az első szakaszban növekszik a búvár, a másodikban jobbra halad tovább, majd eltűnik. Figyeld meg: a második ismétlésben már **nem növeljük a méretét**.

## 6. Indíts mindent egyetlen paranccsal!

A **főablak → Eljárások** részben készíts egy **tenger** nevű eljárást:

<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>eljárás tenger
  búvár'kezdőállapot
  búvár'úszik
vége</span></div>

A parancssorban most már elegendő ezt beírni: `tenger`. Próbáld ki kétszer egymás után! Mindig ugyanonnan indul?

> **Fontos – automatikus indítás:** a `tenger` eljárás önmagában nem indítja el a programot a projekt megnyitásakor. Ehhez külön Imagine-eseménybeállítás szükséges. Egyelőre a `tenger` paranccsal indítsd.

## 🎛️ Kísérletezz – mit kell módosítanod?

Minden feladatban **csak a megadott számot módosítsd**, majd indítsd újra a `tenger` eljárást! Előbb tippeld meg, mi történik, utána ellenőrizd.

| Ezt szeretnéd | Ezt írd át | Mit figyelj meg? |
|---|---|---|
| Lassabban ússzon | Mindkét ismétlésben `várj 50` → `várj 100` | Hosszabb ideig tart az úszás. |
| Gyorsabban haladjon jobbra | A második ismétlésben `előre 3` → `előre 6` | Nagyobb távolságot tesz meg egy lépésben. |
| Kevésbé növekedjen | `alakméret+0.01` → `alakméret+0.005` | 80 lépés után 0,9-szeres lesz. |
| Kisebben induljon | A kezdőállapotban `alakméret! 0.5` → `alakméret! 0.3` | Már az első pillanatban kisebb. |
| Más irányba induljon | A kezdőállapotban változtasd az `irány! 150` számát | Merre halad az első szakaszban? |

<div class="imagine-note" style="padding:14px;border-left:5px solid #357a9e;background:#f0f8fc;color:#263746;border-radius:10px"><strong>⭐ Önálló kihívás</strong><p>Válassz <strong>két módosítást</strong>! Mindkettő előtt fogalmazz meg egy jóslatot, majd próbáld ki. A neked legjobban tetsző változatot mentsd el.</p></div>

## ✅ Ellenőrzés

- [ ] A búvár a bal felső részen, félméretben indul.
- [ ] Úszás közben váltakoznak a képkockái.
- [ ] Az első szakaszban fokozatosan növekszik.
- [ ] A második szakaszban jobbra úszik, majd eltűnik.
- [ ] A `tenger` parancs újraindítja az animációt.

<details><summary><strong>🔎 A teljes úszik eljárás ellenőrzéshez</strong> – csak akkor nyisd le, ha már megpróbáltad!</summary>
<div class="imagine-code" style="font-family:Consolas,monospace;line-height:1.5;white-space:pre-wrap;background:#182f42;color:#f4fbff;padding:16px;border-radius:12px;user-select:none;-webkit-user-select:none"><span>eljárás úszik
  látható! 1
  ismétlés 80 [
    előre 2
    várj 50
    képkocka! képkocka+1
    alakméret! alakméret+0.01
  ]
  irány! 90
  ismétlés 100 [
    előre 3
    várj 50
    képkocka! képkocka+1
  ]
  látható! 0
vége</span></div>
</details>

> Későbbi bővítés: buborékok megjelenése és eltűnése a búvár mögött.
