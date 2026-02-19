
### Wanted! Find and accept your bounty
Op deze Pagina kan jij alle openstaande bounties zoeken, sorteren, vinden en natuurlijk accepteren. Let wel op dat andere bountyhunters dit ook kunnen doen, gelukkig kan je zien hoeveel mensen de bounties al hebben geaccepteerd.

**Beschrijving**
Op de Wanted Wall van Team Glow kan je alle outlaws (studenten en docenten die de regels van web development niet volgen) zien. Wil je filteren op klas, hobby, dier of seizoen druk dan op de filter knop. Weet jij al wie je moet hebben dan kan je de naam in de zoekbalk zetten en zo jouw bounty vinden.

**Hoe werkt het?**

- Je kan op de posters hoveren om een geluid te horen en een animatie te zien.
- Voor een leuke wild west vibe hebben de mugshots een sepia filter die langzaam wegvaagt als de muis er overheen gaat.
- Zoeken en Filteren: Gebruikers kunnen via de filters-wrapper bovenaan de pagina gericht zoeken op namen of eigenschappen zoals hobby's en squads.
- Bounty Detailpagina: Wanneer je op een outlaw klikt, kom je op de detailpagina. Hier kun je meer over de student lezen en via een formulier de bounty "claimen". Dit bericht wordt direct opgeslagen en getoond op de pagina.


**Kenmerken**

- Data ophalen (Directus API): Met de fetch methode halen we data op. In server.js (regels 30-45) gebruiken we URLSearchParams om de data te filteren op onze specifieke tribe en cohort, zodat alleen de juiste studenten verschijnen.
- Data Posten: Wanneer een gebruiker een bounty accepteert, gebruiken we een app.post route in server.js om deze informatie terug te sturen naar de Directus database.
- LiquidJS: Met Liquid kunnen wij de HTML dynamisch genereren. In index.liquid gebruiken we een for-loop om voor elke student in de database automatisch een <li> met een poster te maken. 
Ook gebruiken we logica om te bepalen welke afbeelding getoond moet worden, als er geen mugshot is komt er een placeholder foto.


**Installatie**


1. Clone de repository:
Open je terminal en kopieer de bestanden naar je computer met:
git clone https://github.com/yassineAk1/connect-your-tribe-team-squad-page 


2. Dependencies installeren met NPM:
Wij maken gebruik van NPM (Node Package Manager). Dit is een tool die automatisch alle benodigde pakketten (zoals Express en Liquid) voor dit project downloadt. Typ in de terminal:
npm install

3. De server starten:
Zodra alle pakketten zijn geïnstalleerd, kun je de server opstarten met het command:
npm start

Bekijk de website:
Open je browser en ga naar http://localhost:8000.

Happy hunting!

