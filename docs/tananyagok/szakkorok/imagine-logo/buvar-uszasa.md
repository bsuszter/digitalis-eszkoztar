# 🤿 A búvár úszása

<div class="project-hero"><div><span class="project-kicker">IMAGINE LOGO · 1. LECKE · ANIMÁCIÓ</span><h2>Induljon el a búvár!</h2><p>Programozd úgy a letölthető búváralakot, hogy a kép bal felső részén jelenjen meg, úszás közben növekedjen, majd jobbra kiússzon a képből!</p></div><div class="project-hero__icon">🌊</div></div>

<div class="project-flow">KEZDŐÁLLAPOT → ÚSZÁS ÉS NÖVEKEDÉS → KIÚSZÁS → INDÍTÁS</div>

!!! tip "Először töltsd le az animált alakot!"
    **[Búvár alakjának letöltése (.lgf)](../../../downloads/imagine-logo/buvar-alakja.lgf){: download="buvar-alakja.lgf" }**. Ez a mintafeladat többképkockás alakja. Az Imagine **Alak** lapján töltsd be a teknőchöz.

## 1. Készíts egy búvár nevű teknőcöt!

1. Nyisd meg az Imagine Logo-projektedet.
2. Helyezz el egy teknőcöt a lapon, és nevezd el **búvár** névre.
3. Az **Alak** lapon töltsd be a letöltött `buvar-alakja.lgf` fájlt.
4. A búvár tulajdonságainak **Eljárások** lapján készíts egy **kezdőállapot** nevű eljárást.

```logo
eljárás kezdőállapot
  látható! 0
  alakméret! 0.5
  tollatfel
  poz! [-239 179]
  irány! 150
vége
```

**Mit állítunk be?** A búvár kezdetben rejtve van (`látható! 0`), félméretű (`alakméret! 0.5`), és felemelt tollal a bal felső részre kerül. A `poz!` koordinátáit a saját lapod méretéhez igazíthatod.

!!! note "Figyeld meg!"
    A `kezdőállapot` még **nem úsztatja** a búvárt. Csak előkészíti az induláshoz. A búvár majd az `úszik` eljárás elején válik láthatóvá.

## 2. Készítsd el az úszik eljárást!

A **búvár** saját eljárásaihoz add hozzá az **úszik** eljárást:

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

Ez az eredeti búváros minta mozgásprogramja. A **képkocka! képkocka+1** sor a búvár alakjának képkockáit váltogatja. Így a haladás mellett az úszómozdulat is látható.

<div class="step-stack"><div class="step-card"><span class="step-no">1</span><div><strong>Megjelenik</strong><span>A <code>látható! 1</code> láthatóvá teszi a búvárt.</span></div></div><div class="step-card"><span class="step-no">2</span><div><strong>Úszik és növekszik</strong><span>A 80 ismétlésben minden alkalommal 2 egységet halad előre, vár egy kicsit, és 0,01-del nő az alakmérete. A kezdeti 0,5-ös méret így 1,3-ra nő.</span></div></div><div class="step-card"><span class="step-no">3</span><div><strong>Jobbra fordul</strong><span>Az <code>irány! 90</code> jobbra állítja a teknőc irányát.</span></div></div><div class="step-card"><span class="step-no">4</span><div><strong>Kiúszik</strong><span>A második 100 ismétlésben 3 egységet halad, de a mérete már nem nő. Végül a <code>látható! 0</code> elrejti.</span></div></div></div>

## 3. Indítsd el egyetlen eljárással!

Most a **főablak** saját **Eljárások** lapjára készíts egy **tenger** nevű eljárást:

```logo
eljárás tenger
  búvár'kezdőállapot
  búvár'úszik
vége
```

A parancssorban próbáld ki:

```logo
tenger
```

Az Imagine előbb visszaállítja a búvár kezdőállapotát, utána lefuttatja az úszást. Így újraindításkor nem a korábbi véghelyzetből kezd.

!!! warning "Automatikus indítás"
    A `tenger` eljárás létrehozása **önmagában még nem jelenti**, hogy a program a lap megnyitásakor automatikusan elindul. Ehhez az Imagine megfelelő **Események** beállításánál kell meghívni. Ennek pontos helyét a használt projektben külön ellenőrizzük; addig a `tenger` parancssorból biztosan kipróbálható.

## ✅ Ellenőrizd a munkádat!

- [ ] A búvár a bal felső részen, 50%-os méretben indul.
- [ ] Először a középső rész felé úszik, közben növekszik.
- [ ] Ezután jobbra úszik tovább, növekedés nélkül.
- [ ] A mozgás végén eltűnik.
- [ ] A `tenger` eljárás újbóli meghívására az animáció elölről kezdődik.

## 🧠 Gondolkodj!

1. Melyik utasítás teszi láthatóvá a búvárt?
2. Miért kell az `alakméret! alakméret+0.01` sor az ismétlés **belsejébe**?
3. Mi változna, ha a második ismétlésben az `előre 3` helyett `előre 6` szerepelne?

## ⭐ Önálló próba

Változtasd meg a búvár növekedésének sebességét! Próbáld ki a `0.005` értéket. Mi a különbség az eredeti animációhoz képest? A kipróbálás után állítsd vissza a választott végleges változatot, és mentsd a projektedet.

> **Következő bővítés:** megjelenő és eltűnő buborékok a búvár mögött. Ezt külön animációs feladatként készítjük el.
