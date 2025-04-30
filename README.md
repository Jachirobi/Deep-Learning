# Deep-Learning

# Thema: Bilderkennung (Klassifikation) mit dem ml5 Framework

**Bearbeitungszeit:** 15–20 Stunden, je nach Vorkenntnissen und Erfahrung  
**Voraussetzungen:** Kapitel 1 und 2 bis einschließlich *Learning from Data*

---

## 🎯 Kompetenzerwerb / Lernziele

Nach der Bearbeitung der Aufgabe sollten Sie:

- Ihr Wissen über Webanwendungen wieder aufgefrischt haben
- Durch Austausch mit anderen neue nützliche Tipps und Frameworks kennengelernt haben
- Wissen, wie man ein vor-trainiertes KI-Modell für eine Web-Anwendung nutzt

---

## 🔍 Vorbereitung

- Überblick über das **ml5.js** Framework verschaffen  
- Das **Image Classification Tutorial** nachvollziehen

---

## 📌 Aufgabenstellung

Erweitern Sie das ml5 Image Classification Tutorial so, dass ein Nutzer beliebige Bilder klassifizieren kann.  
Sie verwenden ein bestehendes, vortrainiertes Modell – ein eigenes Training ist **nicht** erforderlich.

### A1) Beispielbilder klassifizieren

- Zeigen Sie jeweils **drei korrekt** und **drei falsch** klassifizierte Bilder
- Visualisieren Sie die Klassifikationsergebnisse als **Diagramm**
- Machen Sie kenntlich, ob die Klassifikation korrekt war
- Bilder dürfen aus dem **ImageNet-Datensatz** stammen oder selbst erstellt/modifiziert werden

### A2) Nutzerinteraktion

- Nutzer kann ein Bild hochladen (per **Dateiauswahl** oder **Drag & Drop**)
- Nach Anzeige erfolgt automatische oder manuelle Klassifikation per Button "`Classify`"

---

## 📊 Resultate und Visualisierung

- Das Modell gibt Wahrscheinlichkeiten (*Confidences*) zurück
- Stellen Sie die Top-Ergebnisse in **Diagrammform** dar (z. B. Balken- oder Kreisdiagramm)
- Zeigen Sie **Prozentwerte** der Confidence neben den Klassennamen an
- Empfohlene Libraries: **Chart.js** oder **Plotly**

---

## 🖼️ Layout-Vorgaben

Zweispaltige Darstellung:

1. **Links:** Bild  
2. **Rechts:** Diagramm mit Klassifikation

### R1) Beispielbilder

- Zuerst drei richtig klassifizierte Bilder untereinander
- Danach drei falsch klassifizierte Bilder

### R2) Nutzerbild

- Darunter: Bereich für das Nutzerbild mit Interaktionselementen

---

## 🧠 Diskussion

Diskutieren Sie Ihre Beobachtungen in max. **10 Sätzen**:

- Wann hat die Klassifikation gut funktioniert?
- Wann nicht – und warum vermutlich?

(Platzieren Sie die Diskussion unter den Resultaten auf der gleichen HTML-Seite.)

---

## 📝 Dokumentation

### 1) Technisch

- Liste aller verwendeten Frameworks
- Jeweils 1–3 Sätze zur Verwendung
- Technische Besonderheiten der Lösung

### 2) Fachlich

- Beschreibung der Logik und Implementierung
- Ansatz, Besonderheiten, Quellen etc.

(Dokumentation ebenfalls auf der HTML-Seite, unterhalb der Diskussion.)

---

## 💾 Anwendung & Abgabe

- Erstellen Sie eine Webanwendung
- Hosten Sie diese auf einem **öffentlichen Webserver**
- Weitere Hinweise: *Web-Anwendungen und Frameworks – Client-side Web APIs by MDN*

---

## 🧩 Hinweise

- **ml5.js** ist ein High-Level-API auf Basis von **TensorFlow.js**
- Für tiefergehende Kontrolle ist eine Low-Level-API nötig
- Stellen Sie sicher, dass die Bildformate gültig sind (Fehlerbehandlung)
- Achten Sie auf gute **User Experience (UX)** nach:
  - ISO 9241-11 (Gebrauchstauglichkeit)
  - ISO 9241-110 (Interaktionsprinzipien)

---

## 🎨 Gestaltung

- Semantisch sinnvolle Farbgestaltung
- Übersichtliches Layout
- Orientierung: [material.io – Design Guidelines](https://material.io/)

---

## 📂 Datenquellen

- **ImageNet-Datensatz** (z. B. für Beispielbilder)

**Links:**
- Paper: https://arxiv.org/abs/1409.0575  
- Dataset: https://www.image-net.org/index.php  
- Challenges: https://www.image-net.org/challenges/LSVRC/

---

## 📚 Zusätzliches Hintergrundwissen

- **Tutorial-Video** (nicht verlinkt, falls lokal vorhanden)
- Paper: *MobileNets for Mobile Vision Applications*  
  → https://arxiv.org/abs/1704.04861
- Libraries: `Chart.js`, `Plotly`
- Coding: *ml5.js examples* (neue Version verfügbar)

**Arbeitsumgebung:** HTML-/JS-IDE (z. B. Visual Studio Code, Atom, WebStorm)  
**Testumgebung:** Chrome unter macOS empfohlen

---

## 🧾 Bewertungskriterien (max. 25 Punkte)

| Kriterium | Punkte |
|-----------|--------|
| ✅ Funktionsfähigkeit & Vollständigkeit | 8 |
| 📊 Resultate & Diskussion (Beispiele) | 8 |
| 📝 Dokumentation (technisch & fachlich) | 3 |
| 🤝 UX / Interaktion / HCI | 3 |
| 🎨 Gestaltung & Visualisierung | 3 |
| **Gesamt** | **25 Punkte** |

---

