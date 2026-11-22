<style>
.mese{font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.75;color:#263746;max-width:960px;margin:auto;padding:16px 18px 40px}.mese *{box-sizing:border-box}.mese h1{font-size:35px;line-height:1.2;color:#255d7d}.mese h2{font-size:25px;line-height:1.35;color:#245b7a;margin:0 0 18px}.mese .hero{background:#eaf5fb;border:1px solid #c2dfea;border-radius:20px;padding:24px;margin-bottom:22px}.mese .steps{display:flex;flex-wrap:wrap;gap:9px;margin:15px 0}.mese .steps span{background:white;padding:5px 13px;border-radius:99px;color:#285d78;font-size:15px;font-weight:bold}.mese .section{background:#fff;border:1px solid #d3e4ec;border-radius:18px;padding:24px;margin:30px 0;box-shadow:0 4px 15px #203b5312}.mese .code{font:19px/1.65 Consolas,"Courier New",monospace;white-space:pre-wrap;overflow-x:auto;background:#173347;color:white;border-radius:12px;padding:18px 21px;margin:20px 0;user-select:none;-webkit-user-select:none}.mese code{font-family:Consolas,monospace;background:#f5ebf2;color:#8b2557;padding:2px 5px;border-radius:5px}.mese .note,.mese .try,.mese .change{padding:15px 19px;margin:20px 0;border-radius:12px}.mese .note{background:#eef7fc;border-left:5px solid #4286aa}.mese .try{background:#edf8f1;border-left:5px solid #45946c}.mese .change{background:#fff6e7;border-left:5px solid #cc9235}.mese li{margin:9px 0}.mese .num{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#306e94;color:white;margin-right:8px}.mese details{padding:15px;border:1px solid #b8d6e8;background:#f3fafc;border-radius:12px}.mese summary{cursor:pointer;font-weight:bold}.mese .check{display:block;margin:12px 0}.mese .small{color:#546d7a;font-size:15px}.mese a{color:#175c83}@media(max-width:620px){.mese{padding:12px;font-size:17px}.mese .section{padding:15px}.mese .code{font-size:16px;padding:14px}}
</style>
<div class="mese">
<div class="hero"><div style="font-size:14px;font-weight:bold;color:#295c79">SZAKKÖR · IMAGINE LOGO · 2. PROJEKT</div>
<h1>🐉 Mese – Mentsük meg a hercegnőt!</h1>
<p>A búváros lecke után most <strong>három szereplő animációját</strong> hangolod össze. A várat és a díszítést ezúttal nem kell megrajzolnod.</p>
<div class="steps"><span>1. Szereplők</span><span>2. Növekedés</span><span>3. Sárkány</span><span>4. Csata</span><span>5. Befejezés</span></div></div>
<div class="note"><strong>🎬 Mintavideó és alakfájlok:</strong> a tanár által megosztott <em>Imagine mese – források</em> csomagban találod a <code>mese_animacio_Imagine.mp4</code> videót, valamint a <code>herceg.lgf</code>, <code>hercegno.lgf</code>, <code>sarkany.lgf</code> fájlokat. A videón a kész jelenet látható; mi most kizárólag a mozgó szereplőkkel dolgozunk.</div>
<div class="note"><strong>✍️ Így dolgozz!</strong> A kódot te gépeld be az Imagine-be. Minden lépést próbálj ki! Az új eljárást mindig a megadott teknőc saját <strong>Eljárások</strong> lapján hozd létre. A koordinátákat a lapod méretéhez igazíthatod.</div>
<section class="section"><h2><span class="num">1</span> Készítsd elő a szereplőket!</h2><ol><li>Hozz létre három teknőcöt: <code>herceg</code>, <code>hercegno</code>, <code>sarkany</code> (ékezet nélkül).</li><li>Az <strong>Alak</strong> fülön töltsd be a három LGF-fájlt.</li><li>Mindegyik teknőc <strong>saját Eljárások</strong> fülén készíts <code>alaphelyzet</code> eljárást.</li></ol><strong>A hercegnő:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás alaphelyzet
  tollatfel
  látható! 1
  poz! [-100 -85]
  alakméret! 1
  képkocka! 1
vége</div><strong>A herceg:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás alaphelyzet
  tollatfel
  poz! [-65 -85]
  alakméret! 0
  látható! 0
vége</div><strong>A sárkány:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás alaphelyzet
  tollatfel
  látható! 1
  poz! [-160 65]
  alakméret! 1
  irány! 135
  képkocka! 1
vége</div><div class="try"><strong>🧪 Próbáld ki!</strong> A parancssorba sorban írd: <code>hercegno'alaphelyzet</code>, <code>herceg'alaphelyzet</code>, <code>sarkany'alaphelyzet</code>. A herceg még láthatatlan – ez így jó!</div><div class="note">A hercegnő 1. képkockája szomorú, a 2. mosolyog. A sárkány 1–4. képkockája mozgásra, az 5. tűzokádásra, a 6. a legyőzött állapotra szolgál.</div></section>
<section class="section"><h2><span class="num">2</span> A herceg lassan megnő</h2><p>A <strong>herceg</strong> saját eljárásai közé készíts <code>megjelenik</code> eljárást.</p><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás megjelenik
  látható! 1
  ismétlés 20 [
    alakméret! alakméret+0.05
    várj 70
  ]
vége</div><div class="try"><strong>🧪 Próbáld ki!</strong> <code>herceg'alaphelyzet</code>, majd <code>herceg'megjelenik</code>. A herceg 20 lépés alatt lesz teljes méretű.</div><div class="change"><strong>🔧 Változtass!</strong> A <code>várj 70</code> értékét emeld 150-re. Mi változott?</div></section>
<section class="section"><h2><span class="num">3</span> A sárkány leszáll és tüzet okád</h2><p>A <strong>sarkany</strong> saját eljárásai közé készíts három új eljárást.</p><strong>Leszállás:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás leszall
  ismétlés 9 [
    képkocka! 1
    előre 6
    várj 50
    képkocka! 2
    előre 6
    várj 50
    képkocka! 3
    előre 6
    várj 50
    képkocka! 4
    előre 6
    várj 50
  ]
vége</div><strong>Tűzokádás:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás tuz
  képkocka! 5
  várj 300
vége</div><strong>Legyőzött sárkány:</strong><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás legyozve
  képkocka! 6
vége</div><div class="try"><strong>🧪 Próbáld ki!</strong> <code>sarkany'alaphelyzet</code>, majd <code>sarkany'leszall</code> és <code>sarkany'tuz</code>. Ha nem jó helyre érkezik, módosítsd az <code>alaphelyzet</code> koordinátáját.</div></section>
<section class="section"><h2><span class="num">4</span> A herceg támad és visszahátrál</h2><p>A <strong>herceg</strong> saját eljárásai közé készíts <code>roham</code> eljárást.</p><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás roham
  irány! 90
  ismétlés 10 [
    előre 3
    várj 45
  ]
  irány! 270
  ismétlés 10 [
    előre 3
    várj 45
  ]
vége</div><p>A <strong>hercegno</strong> saját eljárásai közé:</p><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás mosolyog
  képkocka! 2
vége</div><div class="try"><strong>🧪 Próbáld ki!</strong> <code>herceg'roham</code>. A herceg visszaér oda, ahonnan elindult?</div><div class="change"><strong>🔧 Változtass!</strong> Hogyan rohanhatna messzebbre úgy, hogy utána ugyanoda térjen vissza?</div></section>
<section class="section"><h2><span class="num">5</span> Álljon össze a mese!</h2><p>A <strong>főablak → Eljárások</strong> részben hozz létre <code>mese</code> eljárást. Ez egymás után elindítja a korábban elkészített részeket.</p><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás mese
  hercegno'alaphelyzet
  herceg'alaphelyzet
  sarkany'alaphelyzet
  herceg'megjelenik
  sarkany'leszall
  ismétlés 3 [
    sarkany'tuz
    herceg'roham
  ]
  sarkany'legyozve
  hercegno'mosolyog
vége</div><div class="try"><strong>🧪 Próbáld ki!</strong> Írd a parancssorba: <code>mese</code>. A herceg megjelenik, a sárkány leszáll, három támadás történik, majd a hercegnő mosolyog.</div><div class="note"><strong>Fontos:</strong> Ez a működő animáció alapváltozata. Az eredeti versenyfeladatban a hercegnőre kattintás indítja a jelenetet. Ezt az <strong>Események</strong> fülön lehet majd kiegészíteni; a pontos beállítást Imagine-ben ellenőrizzük.</div></section>
<section class="section"><h2><span class="num">★</span> Próbáld ki másként!</h2><ol><li>A herceg gyorsabban nőjön meg.</li><li>A sárkány lassabban szálljon le.</li><li>A herceg három helyett négyszer támadjon.</li><li>A herceg messzebbre rohanjon, de ugyanoda térjen vissza.</li></ol><p><strong>Előbb jósolj, aztán módosíts és próbáld ki!</strong></p></section>
<section class="section"><h2><span class="num">✓</span> Ellenőrzés</h2><label class="check"><input type="checkbox"> Megvan a három külön teknőc és a saját alaphelyzete.</label><label class="check"><input type="checkbox"> A herceg fokozatosan megnő.</label><label class="check"><input type="checkbox"> A sárkány leszáll, és képkockát vált.</label><label class="check"><input type="checkbox"> A herceg oda-vissza rohan, háromszor.</label><label class="check"><input type="checkbox"> A végén a sárkány elesik, a hercegnő mosolyog.</label><details><summary>🔎 A teljes mese eljárás ellenőrzéshez</summary><div class="code" aria-label="Kézzel begépelendő Imagine Logo-kód">eljárás mese
  hercegno'alaphelyzet
  herceg'alaphelyzet
  sarkany'alaphelyzet
  herceg'megjelenik
  sarkany'leszall
  ismétlés 3 [
    sarkany'tuz
    herceg'roham
  ]
  sarkany'legyozve
  hercegno'mosolyog
vége</div></details></section>
<p class="small">Forrás: Országos Grafikus Programozási Verseny, „Mese (Imagine)” versenyfeladat, 2025. április 12. – az animációs rész egyszerűsített, oktatási célú változata. A koordináták próba után módosíthatók; a kódot Imagine-ben külön ellenőrizni kell.</p>
</div>