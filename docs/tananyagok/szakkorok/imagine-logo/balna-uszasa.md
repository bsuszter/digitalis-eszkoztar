# 🐋 A bálna úszása

<div class="project-hero"><div><span class="project-kicker">IMAGINE LOGO · 1. LECKE · ANIMÁCIÓ</span><h2>Induljon el a bálna!</h2><p>Programozd úgy a beépített bálna alakot, hogy a kép bal felső részén jelenjen meg, úszás közben növekedjen, majd jobbra kiússzon a képből!</p></div><div class="project-hero__icon">🌊</div></div>

<div class="project-flow">KEZDŐÁLLAPOT → ÚSZÁS ÉS NÖVEKEDÉS → KIÚSZÁS → INDÍTÁS</div>

!!! tip "Letölthető alak – ha a képkockaváltást is szeretnéd látni"
    **[Töltsd le az eredeti búvár alakját (.lgf)](../../../downloads/imagine-logo/buvar-alakja.lgf){: download="buvar-alakja.lgf" }!** Ez a mintafeladat animált alakja. Az Imagine **Alak** lapján betölthető. Ha a búvárt használod a bálna helyett, nevezd a teknőcöt `búvár`-nak, és a főablak `tenger` eljárásában a `bálna'` hívásokat írd át `búvár'`-ra.

## 1. Készíts egy bálna nevű teknőcöt!

1. Nyisd meg az Imagine Logo-projektedet.
2. Helyezz el egy teknőcöt a lapon, és nevezd el **bálna** névre.
3. Az **Alak** lapon válaszd ki az Imagine beépített bálnaalakját.
4. A bálna tulajdonságainak **Eljárások** lapján készíts egy **kezdőállapot** nevű eljárást.

```logo
eljárás kezdőállapot
  látható! 0
  alakméret! 0.5
  tollatfel
  poz! [-239 179]
  irány! 150
vége
```

**Mit állítunk be?** A bálna kezdetben rejtve van (`látható! 0`), félméretű (`alakméret! 0.5`), és felemelt tollal a bal felső részre kerül. A `poz!` koordinátáit a saját lapod méretéhez igazíthatod.

!!! note "Figyeld meg!"
    A `kezdőállapot` még **nem úsztatja** a bálnát. Csak előkészíti az induláshoz. A bálna majd az `úszik` eljárás elején válik láthatóvá.

## 2. Készítsd el az úszik eljárást!

A **bálna** saját eljárásaihoz add hozzá az **úszik** eljárást:

```logo
eljárás úszik
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
vége
```

Ez az eredeti, búváros minta mozgásprogramja. A **képkocka! képkocka+1** sor akkor hoz létre valódi alakváltó animációt, ha a kiválasztott alak több képkockát tartalmaz. **Ha a beépített bálna csak egyetlen képkockás, ezt a sort mindkét ismétlésből hagyd ki!** A mozgás és a növekedés nélküle is működhet.

<div class="step-stack"><div class="step-card"><span class="step-no">1</span><div><strong>Megjelenik</strong><span>A <code>látható! 1</code> láthatóvá teszi a bálnát.</span></div></div><div class="step-card"><span class="step-no">2</span><div><strong>Úszik és növekszik</strong><span>A 80 ismétlésben minden alkalommal 2 egységet halad előre, vár egy kicsit, és 0,01-del nő az alakmérete. A kezdeti 0,5-ös méret így 1,3-ra nő.</span></div></div><div class="step-card"><span class="step-no">3</span><div><strong>Jobbra fordul</strong><span>Az <code>irány! 90</code> jobbra állítja a teknőc irányát.</span></div></div><div class="step-card"><span class="step-no">4</span><div><strong>Kiúszik</strong><span>A második 100 ismétlésben 3 egységet halad, de a mérete már nem nő. Végül a <code>látható! 0</code> elrejti.</span></div></div></div>

## 3. Indítsd el egyetlen eljárással!

Most a **főablak** saját **Eljárások** lapjára készíts egy **tenger** nevű eljárást:

```logo
eljárás tenger
  bálna'kezdőállapot
  bálna'úszik
vége
```

A parancssorban próbáld ki:

```logo
tenger
```

Az Imagine előbb visszaállítja a bálna kezdőállapotát, utána lefuttatja az úszást. Így újraindításkor nem a korábbi véghelyzetből kezd.

!!! warning "Automatikus indítás"
    A `tenger` eljárás létrehozása **önmagában még nem jelenti**, hogy a program a lap megnyitásakor automatikusan elindul. Ehhez az Imagine megfelelő **Események** beállításánál kell meghívni. Ennek pontos helyét a használt projektben külön ellenőrizzük; addig a `tenger` parancssorból biztosan kipróbálható.

## ✅ Ellenőrizd a munkádat!

- [ ] A bálna a bal felső részen, 50%-os méretben indul.
- [ ] Először a középső rész felé úszik, közben növekszik.
- [ ] Ezután jobbra úszik tovább, növekedés nélkül.
- [ ] A mozgás végén eltűnik.
- [ ] A `tenger` eljárás újbóli meghívására az animáció elölről kezdődik.

## 🧠 Gondolkodj!

1. Melyik utasítás teszi láthatóvá a bálnát?
2. Miért kell az `alakméret! alakméret+0.01` sor az ismétlés **belsejébe**?
3. Mi változna, ha a második ismétlésben az `előre 3` helyett `előre 6` szerepelne?

## ⭐ Önálló próba

Változtasd meg a bálna növekedésének sebességét! Próbáld ki a `0.005` értéket. Mi a különbség az eredeti animációhoz képest? A kipróbálás után állítsd vissza a választott végleges változatot, és mentsd a projektedet.

> **Következő bővítés:** megjelenő és eltűnő buborékok a bálna mögött. Ezt külön animációs feladatként készítjük el.
