# 🔁 Végtelen ciklus

<div class="article-hero">
  <div>
    <span class="article-kicker">FLOWGORITHM · CIKLUS</span>
    <h2>Végtelen ciklus – amikor a program folyamatosan ismétel</h2>
    <p>A végtelen ciklus olyan ismétlés, amelynek nincs természetes vége. Ez lehet <strong>hiba</strong>, de lehet teljesen <strong>szándékos működés</strong> is.</p>
  </div>
  <div class="article-hero__icon">🔁</div>
</div>

<div class="article-meta">
  <span>👀 kezdőknek</span>
  <span>⏱️ 4–6 perc</span>
  <span>🔁 folyamatos működés</span>
</div>

<div class="article-intro">
  <strong>Mire jó?</strong>
  <span>Ha a programnak működés közben folyamatosan figyelnie, ellenőriznie vagy ismételnie kell valamit, szándékosan is használhatunk végtelen ciklust.</span>
</div>

## Mikor hasznos?

<div class="mini-grid">
  <div class="mini-card"><span class="mini-icon">🌡️</span><strong>Érzékelők figyelése</strong><span>A program újra és újra ellenőrzi a környezetet.</span></div>
  <div class="mini-card"><span class="mini-icon">🎮</span><strong>Játékok</strong><span>A játék fő ciklusa folyamatosan frissíti az állapotot.</span></div>
  <div class="mini-card"><span class="mini-icon">🤖</span><strong>Vezérlés</strong><span>A rendszer újra és újra dönthet és reagálhat.</span></div>
</div>

<div class="quick-note">
  <strong>Fontos különbség</strong>
  <span>A végtelen ciklus <strong>nem önmagában hiba</strong>. Akkor probléma, ha véletlenül jön létre, és a program nem tud belőle kilépni. Ha viszont a folyamatos működés a cél, akkor szándékosan használjuk.</span>
</div>

## Példa Flowgorithmban

<figure class="tool-figure tool-figure--wide">
  <a href="../../../images/eszkoztar/flowgorithm/flowgorithm-vegtelen-ciklus-01-folyamat.png" target="_blank">
    <img src="../../../images/eszkoztar/flowgorithm/flowgorithm-vegtelen-ciklus-01-folyamat.png" alt="Végtelen ciklus Flowgorithm folyamatábrában logikai változóval">
  </a>
  <figcaption>Amíg a feltétel igaz marad, a ciklus újra és újra végrehajtja a benne lévő utasítást.</figcaption>
</figure>

## Mi történik ebben a példában?

<div class="step-stack">
  <div class="step-card"><span class="step-no">1</span><div><strong>Létrejön egy logikai változó.</strong><span>A <strong>futás</strong> változó igaz vagy hamis értéket tárolhat.</span></div></div>
  <div class="step-card"><span class="step-no">2</span><div><strong>A futás értéke igaz lesz.</strong><span>Ezután a ciklus feltétele teljesül.</span></div></div>
  <div class="step-card"><span class="step-no">3</span><div><strong>A ciklus újra és újra lefut.</strong><span>Mivel a feltétel igaz marad, nincs természetes kilépési pont.</span></div></div>
</div>

!!! warning "Mikor lesz ebből hiba?"
    Ha a ciklusnak egyszer véget kellene érnie, de a feltétel soha nem változik hamisra, a program „beleragad” az ismétlésbe. Ez tipikus programozási hiba.

!!! tip "Miért fontos ez érzékelőknél?"
    Egy érzékelőt általában nem csak egyszer akarunk megnézni. A program folyamatosan újraolvassa az adatot, dönt róla, reagál, majd kezdi elölről.

<div class="quick-note">
  <strong>Gondolkodási minta</strong>
  <span><strong>ÉRZÉKELÉS → DÖNTÉS → REAKCIÓ → újra ÉRZÉKELÉS</strong></span>
</div>

## Gyors ellenőrzés

<div class="check-panel">
  <label><input type="checkbox"><span>Tudom, miért nem ér véget a ciklus.</span></label>
  <label><input type="checkbox"><span>Meg tudom mondani, hogy ebben a helyzetben szándékos-e a végtelen ismétlés.</span></label>
  <label><input type="checkbox"><span>Értem, hogy egy érzékelő folyamatos figyeléséhez miért lehet szükség ciklusra.</span></label>
</div>

!!! note "A jelölések nem mentődnek"
    A pipák csak ezen az oldalon látszanak. Az oldal bezárása után nem maradnak meg.

<div class="back-link"><a href="../">← Vissza a Flowgorithm eszköztárhoz</a></div>
