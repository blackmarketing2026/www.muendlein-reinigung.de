# FTP_HTML_STRUCTURE.md

## Ziel dieser Datei

Diese Datei definiert die professionelle Ordnerstruktur, Datei-Logik und Arbeitsweise für ein statisches HTML/SHTML-Webprojekt, das per FTP auf einen klassischen Webserver hochgeladen wird.

Die KI soll diese Datei immer zuerst lesen, bevor neue Seiten, Blogartikel, Assets oder technische Dateien erstellt werden.

Ziel ist eine saubere, wartbare und professionelle Website-Struktur ohne Baukasten-Abhängigkeit.

---

# 1. Grundprinzip

Dieses Projekt ist ein klassisches Website-Projekt für FTP-Hosting.

Es soll funktionieren mit:

- klassischem Webhosting
- FTP/SFTP-Upload
- Apache-Servern
- `.html` oder `.shtml` Dateien
- globalem Header und Footer über Includes
- sauberer Asset-Struktur
- Blogbereich
- Media-Ordner für Bilder
- einfacher Übergabe an Kunden

Die Website soll nicht abhängig sein von:

- WordPress
- Webflow
- Wix
- Baukasten-Systemen
- komplexen Frameworks
- Node.js
- Datenbanken
- Build-Prozessen

---

# 2. Empfohlene Hauptstruktur

Die Projektstruktur soll so aufgebaut sein:

```txt
website/
│
├─ index.shtml
├─ leistungen.shtml
├─ kontakt.shtml
├─ datenschutz.shtml
├─ impressum.shtml
├─ robots.txt
├─ sitemap.xml
├─ .htaccess
│
├─ includes/
│  ├─ head.shtml
│  ├─ header.shtml
│  ├─ footer.shtml
│  ├─ cta-final.shtml
│  └─ tracking.shtml
│
├─ assets/
│  ├─ css/
│  │  ├─ style.css
│  │  ├─ responsive.css
│  │  └─ blog.css
│  │
│  ├─ js/
│  │  ├─ main.js
│  │  └─ tracking.js
│  │
│  ├─ images/
│  │  ├─ logo/
│  │  ├─ hero/
│  │  ├─ icons/
│  │  ├─ team/
│  │  ├─ referenzen/
│  │  └─ blog/
│  │
│  ├─ fonts/
│  │  └─ README.md
│  │
│  └─ downloads/
│
├─ blog/
│  ├─ index.shtml
│  ├─ entruempelung-kosten.shtml
│  ├─ haushaltsaufloesung-tipps.shtml
│  └─ images/
│
└─ docs/
   ├─ DESIGN_STRUCTURE.md
   └─ FTP_HTML_STRUCTURE.md
```

---

# 3. Dateiendungen

## Standard

Für Seiten mit globalem Header/Footer sollen bevorzugt `.shtml` Dateien genutzt werden.

Grund:

- globale Includes möglich
- Header muss nicht auf jeder Seite manuell geändert werden
- Footer muss nicht auf jeder Seite manuell geändert werden
- Navigation bleibt zentral wartbar

Beispiel:

```txt
index.shtml
leistungen.shtml
kontakt.shtml
blog/index.shtml
```

## HTML ohne Includes

`.html` darf nur genutzt werden, wenn keine Server-Side-Includes gebraucht werden.

Für professionelle Projekte mit globalem Header/Footer ist `.shtml` die bevorzugte Variante.

---

# 4. Globale Includes

Wiederkehrende Elemente sollen zentral im Ordner `includes/` liegen.

## Pflicht-Includes

```txt
includes/head.shtml
includes/header.shtml
includes/footer.shtml
includes/tracking.shtml
```

Optional:

```txt
includes/cta-final.shtml
includes/breadcrumb.shtml
includes/sidebar-blog.shtml
```

---

# 5. Beispiel für Seitenaufbau

Jede normale Seite soll ungefähr so aufgebaut sein:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <!--#include virtual="/includes/head.shtml" -->
  <title>Seitentitel</title>
  <meta name="description" content="Kurze SEO-Beschreibung der Seite.">
</head>

<body>

  <!--#include virtual="/includes/header.shtml" -->

  <main>
    <!-- Seiteninhalt -->
  </main>

  <!--#include virtual="/includes/footer.shtml" -->
  <!--#include virtual="/includes/tracking.shtml" -->

</body>
</html>
```

Wichtig:

- `head.shtml` enthält gemeinsame Meta-Tags, CSS-Verknüpfungen und globale Einstellungen.
- Der individuelle `<title>` und die individuelle Meta Description können direkt in der jeweiligen Seite stehen.
- Header, Footer und Tracking sollen nicht auf jeder Seite dupliziert werden.

---

# 6. Regeln für `includes/head.shtml`

Die Datei `includes/head.shtml` soll nur gemeinsame Elemente enthalten.

Beispiel:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/responsive.css">

<link rel="icon" href="/assets/images/logo/favicon.png" type="image/png">
```

Nicht in `head.shtml` gehören:

- individueller Seitentitel
- individuelle Meta Description
- individuelle Canonical URL, wenn sie pro Seite unterschiedlich ist
- seitenabhängige strukturierte Daten

---

# 7. Regeln für `includes/header.shtml`

Der Header soll global sein.

Er enthält:

- Logo
- Hauptnavigation
- CTA-Button
- mobile Navigation

Beispiel-Struktur:

```html
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <img src="/assets/images/logo/logo.svg" alt="Firmenname Logo">
    </a>

    <nav class="main-nav" aria-label="Hauptnavigation">
      <a href="/leistungen">Leistungen</a>
      <a href="/ablauf">Ablauf</a>
      <a href="/blog/">Blog</a>
      <a href="/kontakt">Kontakt</a>
    </nav>

    <a href="/kontakt" class="btn btn-primary">Jetzt anfragen</a>
  </div>
</header>
```

Regeln:

- Header nicht überladen
- klare Navigation
- CTA sichtbar
- mobil gut bedienbar
- keine seitenindividuellen Inhalte im Header

---

# 8. Regeln für `includes/footer.shtml`

Der Footer enthält:

- Firmenname oder Logo
- kurze Beschreibung
- Kontaktinformationen
- Navigation
- rechtliche Links
- Impressum
- Datenschutz

Beispiel:

```html
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <strong>Firmenname</strong>
      <p>Kurze Beschreibung des Unternehmens.</p>
    </div>

    <div>
      <h3>Navigation</h3>
      <a href="/leistungen">Leistungen</a>
      <a href="/blog/">Blog</a>
      <a href="/kontakt">Kontakt</a>
    </div>

    <div>
      <h3>Rechtliches</h3>
      <a href="/impressum">Impressum</a>
      <a href="/datenschutz">Datenschutz</a>
    </div>
  </div>
</footer>
```

---

# 9. CSS-Struktur

CSS liegt immer unter:

```txt
assets/css/
```

Empfohlene Dateien:

```txt
style.css
responsive.css
blog.css
```

## `style.css`

Enthält:

- Grundlayout
- Farben
- Buttons
- Header
- Footer
- Sektionen
- Karten
- Formulare
- Utility-Klassen

## `responsive.css`

Enthält:

- mobile Anpassungen
- Tablet-Anpassungen
- Breakpoints
- Navigation mobil
- Grid-Anpassungen

## `blog.css`

Nur nutzen, wenn der Blog eigene Layouts braucht.

---

# 10. CSS-Regeln

Der Code soll sauber und nachvollziehbar sein.

Regeln:

- keine wilden Inline-Styles
- keine doppelten Klassen ohne Grund
- keine riesigen CSS-Blöcke ohne Struktur
- klare Klassennamen
- Mobile First bevorzugen
- Buttons und Sektionen wiederverwendbar aufbauen

Beispiel-Klassen:

```css
.container
.section
.section-title
.section-subtitle
.btn
.btn-primary
.btn-secondary
.card
.grid-2
.grid-3
.hero
.hero-content
.hero-media
.trust-bar
.cta-section
```

---

# 11. JavaScript-Struktur

JavaScript liegt unter:

```txt
assets/js/
```

Empfohlene Dateien:

```txt
main.js
tracking.js
```

## `main.js`

Enthält:

- mobile Navigation
- Accordion/FAQ
- einfache UI-Funktionen
- Smooth Scroll, wenn gewünscht

## `tracking.js`

Enthält nur Tracking-relevante Events, falls benötigt.

Regeln:

- kein unnötiges JavaScript
- keine schweren Libraries
- keine Funktionen, die mit reinem CSS lösbar sind
- Tracking sauber trennen

---

# 12. Bilderstruktur

Bilder liegen unter:

```txt
assets/images/
```

Empfohlene Unterordner:

```txt
assets/images/logo/
assets/images/hero/
assets/images/icons/
assets/images/team/
assets/images/referenzen/
assets/images/blog/
```

Regeln:

- Dateinamen klein schreiben
- keine Leerzeichen
- keine Umlaute
- Wörter mit Bindestrich trennen
- Bilder komprimieren
- sinnvolle Alt-Texte verwenden

Gute Dateinamen:

```txt
hero-reinigungsfirma-buero.webp
logo-meisterwerk.svg
icon-telefon.svg
team-mitarbeiter-vor-ort.webp
blog-entruempelung-kosten.webp
```

Schlechte Dateinamen:

```txt
Bild 1.png
NEU final Kopie.jpg
IMG_4827.jpeg
schönes bild.png
```

---

# 13. Bildformate

Empfohlen:

- `.webp` für normale Website-Bilder
- `.svg` für Logos und Icons
- `.png` für transparente Grafiken
- `.jpg` nur bei Fotos, wenn WebP nicht verfügbar ist

Regeln:

- Hero-Bilder möglichst als WebP
- Logos möglichst als SVG
- keine riesigen Originaldateien hochladen
- Dateigröße optimieren
- Alt-Texte nicht vergessen

---

# 14. Blog-Struktur

Blogartikel liegen im Ordner:

```txt
blog/
```

Beispiel:

```txt
blog/
├─ index.shtml
├─ entruempelung-kosten.shtml
├─ wohnungsaufloesung-tipps.shtml
└─ images/
```

Blogartikel sollen sprechende Dateinamen haben.

Gute URLs:

```txt
/blog/entruempelung-kosten
/blog/haushaltsaufloesung-tipps
/blog/bueroreinigung-vorteile
```

Schlechte URLs:

```txt
/blog/artikel1
/blog/post-neu
/blog/testseite
```

---

# 15. Blogartikel-Aufbau

Jeder Blogartikel soll diese Struktur haben:

1. Header
2. Hero/Intro für den Artikel
3. Inhaltsbereich
4. Zwischenüberschriften
5. interne Verlinkungen
6. CTA innerhalb des Artikels
7. FAQ, wenn sinnvoll
8. Abschluss-CTA
9. Footer

Beispiel:

```html
<main class="blog-article">
  <section class="blog-hero">
    <div class="container">
      <p class="eyebrow">Ratgeber</p>
      <h1>Entrümpelung Kosten: Damit müssen Sie rechnen</h1>
      <p class="lead">Kurze Einleitung mit Nutzen und Suchintention.</p>
    </div>
  </section>

  <article class="container article-content">
    <h2>Was beeinflusst die Kosten?</h2>
    <p>...</p>

    <div class="inline-cta">
      <h3>Sie möchten ein konkretes Angebot?</h3>
      <a href="/kontakt" class="btn btn-primary">Jetzt kostenlos anfragen</a>
    </div>
  </article>
</main>
```

---

# 16. URL-Regeln

URLs sollen sauber und ohne Dateiendung wirken.

Im Browser dürfen keine Datei-Endungen sichtbar sein.

Gewünscht:

```txt
/kontakt
/leistungen
/blog/entruempelung-kosten
```

Nicht gewünscht:

```txt
/kontakt.html
/kontakt.shtml
/leistungen.html
/leistungen.shtml
/blog/entruempelung-kosten.html
/blog/entruempelung-kosten.shtml
```

Regeln:

- Interne Links immer ohne `.html` oder `.shtml` setzen.
- Der Browser soll immer saubere URLs anzeigen.
- Dateien dürfen intern `.html` oder `.shtml` heißen, aber die URL bleibt ohne Endung.
- Direkte Aufrufe mit `.html` oder `.shtml` sollen per 301-Weiterleitung auf die saubere URL umgeleitet werden.
- Beispiel: `/kontakt.html` wird zu `/kontakt`.
- Beispiel: `/kontakt.shtml` wird zu `/kontakt`.
- Beispiel: `/blog/entruempelung-kosten.html` wird zu `/blog/entruempelung-kosten`.

Dafür wird eine `.htaccess` genutzt, wenn der Server Apache unterstützt.

---

# 17. Beispiel `.htaccess`

Diese Datei liegt im Hauptordner.

Ziel:

- URLs ohne `.html` anzeigen
- URLs ohne `.shtml` anzeigen
- direkte Aufrufe mit Endung auf saubere URLs weiterleiten
- intern trotzdem `.shtml` oder `.html` Dateien laden

```apache
Options +Includes
AddType text/html .shtml
AddOutputFilter INCLUDES .shtml

RewriteEngine On

# index.shtml oder index.html als Startseite
DirectoryIndex index.shtml index.html

# Direkte Aufrufe mit .shtml auf saubere URL weiterleiten
RewriteCond %{THE_REQUEST} \s/([^\s?]+)\.shtml[\s?]
RewriteRule ^ %1 [R=301,L]

# Direkte Aufrufe mit .html auf saubere URL weiterleiten
RewriteCond %{THE_REQUEST} \s/([^\s?]+)\.html[\s?]
RewriteRule ^ %1 [R=301,L]

# Aufruf ohne Dateiendung zuerst auf .shtml-Datei leiten
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.shtml -f
RewriteRule ^(.+?)/?$ $1.shtml [L]

# Wenn keine .shtml existiert, auf .html-Datei leiten
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+?)/?$ $1.html [L]
```

Wichtig:

- Diese Regeln funktionieren nur, wenn `.htaccess`, `mod_rewrite` und Server-Side-Includes vom Hosting unterstützt werden.
- Bei manchen Hostern müssen Server-Side-Includes separat aktiviert werden.
- Wenn Includes nicht funktionieren, prüfen, ob `.shtml` Dateien korrekt ausgeführt werden.
- Wenn `.html` Dateien genutzt werden, bleiben sie trotzdem im Browser unsichtbar.
- Interne Links müssen trotzdem immer ohne Endung gesetzt werden.

---

# 18. Interne Links

Interne Links sollen ohne Dateiendung gesetzt werden.

Gut:

```html
<a href="/kontakt">Kontakt</a>
<a href="/leistungen">Leistungen</a>
<a href="/blog/entruempelung-kosten">Blogartikel</a>
```

Schlecht:

```html
<a href="/kontakt.shtml">Kontakt</a>
<a href="/leistungen.shtml">Leistungen</a>
<a href="/blog/entruempelung-kosten.shtml">Blogartikel</a>
```

---

# 19. SEO-Grundregeln

Jede Seite braucht:

- individuellen Title
- individuelle Meta Description
- genau eine H1
- logische H2/H3-Struktur
- sprechende URL
- sinnvolle interne Links
- Alt-Texte für Bilder
- schnelle Ladezeit
- mobile Darstellung

Beispiel:

```html
<title>Reinigungsfirma in Musterstadt | Jetzt Angebot anfragen</title>
<meta name="description" content="Professionelle Reinigung für Unternehmen in Musterstadt. Schnell, zuverlässig und persönlich. Jetzt unverbindlich Angebot anfragen.">
```

---

# 20. Sitemap

Die Datei `sitemap.xml` liegt im Hauptordner.

Sie enthält alle wichtigen Seiten:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.deinedomain.de/</loc>
  </url>
  <url>
    <loc>https://www.deinedomain.de/leistungen</loc>
  </url>
  <url>
    <loc>https://www.deinedomain.de/kontakt</loc>
  </url>
</urlset>
```

Vor Livegang Domain anpassen.

---

# 21. Robots.txt

Die Datei `robots.txt` liegt im Hauptordner.

Beispiel:

```txt
User-agent: *
Allow: /

Sitemap: https://www.deinedomain.de/sitemap.xml
```

Vor Livegang Domain anpassen.

---

# 22. Impressum und Datenschutz

Diese Seiten müssen im Hauptordner liegen:

```txt
impressum.shtml
datenschutz.shtml
```

Sie müssen im Footer verlinkt sein.

Regeln:

- keine Platzhalter live lassen
- Firmenangaben prüfen
- Datenschutzerklärung an Tracking, Formulare, Hosting und Tools anpassen
- bei Google Ads, Meta Pixel, Clarity, Cookiebot usw. rechtlich sauber prüfen

---

# 23. Formulare

Bei statischen FTP-Seiten funktionieren Formulare nicht automatisch.

Es braucht eine Lösung wie:

- externer Formularanbieter
- PHP-Skript
- Funnelcockpit-Formular
- Formspree/ähnlicher Dienst
- eigenes Backend
- Mail-Handler des Hosters

Wenn ein Formular eingebaut wird, muss klar definiert sein:

- wohin die Daten gesendet werden
- ob Datenschutz-Checkbox vorhanden ist
- welche Pflichtfelder nötig sind
- ob Tracking ausgelöst wird
- ob eine Danke-Seite genutzt wird

Empfohlene Danke-Seite:

```txt
danke.shtml
```

---

# 24. Danke-Seite

Wenn Leads gemessen werden sollen, soll es eine eigene Danke-Seite geben.

Beispiel:

```txt
danke.shtml
```

Nutzen:

- Google Ads Conversion Tracking
- Meta Lead Tracking
- bessere Kontrolle
- klare Erfolgsmessung

Regel:

Formular nach Absenden immer auf `/danke` weiterleiten, wenn technisch möglich.

---

# 25. Tracking

Tracking-Snippets sollen zentral eingebunden werden.

Datei:

```txt
includes/tracking.shtml
```

Dort können später eingebunden werden:

- Google Tag Manager
- Google Ads Conversion Tracking
- Meta Pixel
- Microsoft Clarity
- Cookie Consent Tools

Regeln:

- keine Tracking-Codes wild in jede Seite kopieren
- Tracking zentral verwalten
- Datenschutz und Consent beachten
- Conversion-Tags sauber testen

---

# 26. FTP-Upload-Regeln

Beim Upload auf den Server muss die gleiche Struktur erhalten bleiben.

Der Inhalt des lokalen Ordners `website/` wird in den Webroot des Hostings hochgeladen.

Typische Webroot-Ordner beim Hoster:

```txt
/html/
/htdocs/
/www/
/public_html/
```

Wichtig:

- Nicht den Projektordner selbst hochladen, sondern dessen Inhalt.
- `index.shtml` muss direkt im Webroot liegen.
- `assets/`, `includes/`, `blog/` müssen direkt neben `index.shtml` liegen.
- `.htaccess` muss ebenfalls direkt im Webroot liegen.
- Nach Upload Startseite, Unterseiten, Blog und interne Links testen.

---

# 27. Was nicht auf den FTP-Server gehört

Nicht hochladen:

```txt
docs/
.git/
.github/
node_modules/
README.md
DESIGN_STRUCTURE.md
FTP_HTML_STRUCTURE.md
private-notes.md
raw-images/
backup/
```

Ausnahme:

Wenn bewusst gewünscht, dürfen interne Dokumente hochgeladen werden. Standardmäßig gehören sie nicht auf den Live-Server.

Für die Arbeit mit KI bleiben Markdown-Regeldateien lokal im Projektordner oder im GitHub-Repository, aber nicht zwingend öffentlich auf dem FTP-Server.

---

# 28. Lokaler Projektordner vs. Live-Server

Lokal darf der Projektordner mehr enthalten als der Live-Server.

Lokal:

```txt
website-project/
├─ docs/
├─ DESIGN_STRUCTURE.md
├─ FTP_HTML_STRUCTURE.md
├─ index.shtml
├─ assets/
├─ includes/
└─ blog/
```

Live-Server:

```txt
/
├─ index.shtml
├─ assets/
├─ includes/
├─ blog/
├─ impressum.shtml
├─ datenschutz.shtml
├─ robots.txt
├─ sitemap.xml
└─ .htaccess
```

---

# 29. Kundenübergabe

Eine Website soll so aufgebaut sein, dass sie einfach an Kunden übergeben werden kann.

Dazu gehören:

- klare Ordnerstruktur
- keine unnötigen Abhängigkeiten
- verständliche Dateinamen
- zentrale CSS-Dateien
- globale Includes
- saubere Bilderordner
- Impressum und Datenschutz getrennt
- Blogartikel sauber im Blogordner
- kein Chaos im Hauptverzeichnis

---

# 30. Qualitätskontrolle vor Livegang

Vor Upload prüfen:

- funktioniert `index.shtml` lokal oder auf Testserver?
- funktionieren Header/Footer-Includes?
- sind alle CSS-Dateien korrekt verlinkt?
- sind alle Bilder sichtbar?
- funktionieren interne Links ohne `.shtml`?
- funktioniert `.htaccess`?
- ist die mobile Ansicht sauber?
- gibt es genau eine H1 pro Seite?
- sind Title und Meta Description gesetzt?
- sind Impressum und Datenschutz verlinkt?
- ist die Telefonnummer klickbar?
- funktioniert das Kontaktformular?
- funktioniert die Danke-Seite?
- ist Tracking korrekt eingebunden?
- sind keine Platzhaltertexte vorhanden?
- sind keine internen MD-Dateien auf dem Live-Server gelandet?

---

# 31. Arbeitsanweisung an KI-Agenten

Wenn eine KI an diesem Projekt arbeitet, gilt:

1. Lies zuerst diese Datei.
2. Halte dich an die Ordnerstruktur.
3. Erstelle keine chaotischen neuen Ordner.
4. Lege Bilder nur in passende `assets/images/` Unterordner.
5. Lege CSS nur in `assets/css/` ab.
6. Lege JavaScript nur in `assets/js/` ab.
7. Verwende globale Includes für Header und Footer.
8. Verlinke intern ohne `.shtml`.
9. Halte Seiten SEO-freundlich.
10. Erstelle wartbaren, einfachen Code.
11. Vermeide unnötige Frameworks.
12. Baue für FTP-Hosting, nicht für Node.js oder App-Frameworks.

---

# 32. Grundsatz

Dieses Projekt soll einfach, professionell und wartbar bleiben.

Die Website muss auf einem klassischen FTP-Hosting sauber laufen.

Keine Spielereien, kein technischer Overkill, keine Baukastenlogik.

Ziel ist eine schnelle, schöne und verkaufsstarke Website, die man sauber hochladen, pflegen und an Kunden übergeben kann.
