// Beispielbilder und Klassifikation mit ml5.js
window.addEventListener("load", () => {
	const exampleImages = [
		{ src: "images/richtig1.jpeg", korrekt: true },
		{ src: "images/richtig2.jpeg", korrekt: true },
		{ src: "images/richtig3.png", korrekt: true },
		{ src: "images/falsch1.jpg", korrekt: false },
		{ src: "images/falsch2.jpg", korrekt: false },
		{ src: "images/falsch3.jpg", korrekt: false }
	];
	
	const overlay = document.getElementById("loadingOverlay");
	const loadingText = document.getElementById("loadingText");

	const classifier = ml5.imageClassifier("MobileNet", async () => {
	  console.log("MobileNet Modell geladen.");
	  loadingText.textContent = "📷 Lade Bilder...";

	  // Warte bis alle Bilder vorgeladen sind
	  await Promise.all(exampleImages.map(img => {
	    return new Promise(resolve => {
	      const preImg = new Image();
	      preImg.src = img.src;
	      preImg.onload = resolve;
	      preImg.onerror = resolve; // Fehler ignorieren für Robustheit
	    });
	  }));

	  loadingText.textContent = "⚙️ Klassifiziere Bilder...";

	  for (let i = 0; i < exampleImages.length; i++) {
	    await new Promise(resolve => {
	      createAndClassifyImage(exampleImages[i], i);
	      setTimeout(resolve, 300); // kleine Pause zwischen den Klassifikationen
	    });
	  }

	  setTimeout(() => {
	    overlay.style.display = "none";
	  }, 500); // sanfte UX
	});


	function createAndClassifyImage(imgObj, index) {
		const bildContainer = document.getElementById("beispielbilder");
		const chartContainer = document.getElementById("tabellen");

		// Bildkarte
		const bildCard = document.createElement("div");
		bildCard.className = "bild-karte";
		bildCard.style.border = `3px solid ${imgObj.korrekt ? "green" : "red"}`;

		const img = document.createElement("img");
		img.src = imgObj.src;
		img.alt = imgObj.korrekt ? "Richtig klassifiziertes Bild" : "Falsch klassifiziertes Bild";

		bildCard.appendChild(img);
		const statusText = document.createElement("div");
		statusText.textContent = imgObj.korrekt ? "Richtig klassifiziert" : "Falsch klassifiziert";
		statusText.style.marginTop = "10px";
		statusText.style.fontWeight = "bold";
		statusText.style.color = imgObj.korrekt ? "green" : "red";
		statusText.style.fontSize = "0.95rem";

		bildCard.appendChild(statusText);
		bildContainer.appendChild(bildCard);

		// Chartkarte
		const chartCard = document.createElement("div");
		chartCard.className = "chart-karte";
		chartCard.style.border = `3px solid ${imgObj.korrekt ? "green" : "red"}`;

		const chartCanvas = document.createElement("canvas");
		chartCanvas.id = `chart-${index}`;

		chartCard.appendChild(chartCanvas);
		chartContainer.appendChild(chartCard);

		img.onload = () => {
			classifier.classify(img)
				.then(results => {
					console.log("Klassifikationsergebnis:", results);

					const topResults = results.slice(0, 3);
					const labels = topResults.map(r => r.label);
					const confidences = topResults.map(r => parseFloat((r.confidence * 100).toFixed(2)));

					const ctx = chartCanvas.getContext("2d");

					if (Chart.getChart(chartCanvas)) {
						Chart.getChart(chartCanvas).destroy();
					}

					new Chart(ctx, {
						type: "bar",
						data: {
							labels: labels,
							datasets: [{
								label: "Confidence (%)",
								data: confidences,
								backgroundColor: "#3498db"
							}]
						},
						options: {
							responsive: false,
							scales: {
								y: {
									beginAtZero: true,
									max: 100,
									ticks: {
										callback: function(value) {
											return value + '%';
										}
									}
								},
								x: {
									ticks: {
										display: false
									},
									grid: {
										display: false
									}
								}
							},
							plugins: {
								legend: { display: false }
							}
						}
					});

					// ➕ Ergebnisse als Textliste unterhalb des Charts
					const ergebnisListe = document.createElement("div");
					ergebnisListe.style.marginTop = "10px";
					ergebnisListe.style.textAlign = "left";
					ergebnisListe.style.fontSize = "0.9rem";
					ergebnisListe.style.width = "100%";

					topResults.forEach((r, i) => {
						const zeile = document.createElement("div");
						const prozent = (r.confidence * 100).toFixed(2);
						zeile.textContent = `${i + 1}: ${r.label} – ${prozent} %`;
						ergebnisListe.appendChild(zeile);
					});

					chartCard.appendChild(ergebnisListe);
					
					// Tooltip mit Top-1 Ergebnis
					if (topResults.length > 0) {
						const topLabel = topResults[0].label;
						img.title = `Klassifiziert als: ${topLabel}`;
					}
				})
				.catch(err => {
					console.error("Fehler bei classify:", err);
				});
		};
	}

	// Eigene Bildklassifikation
	const eigenesBildContainer = document.getElementById("eigenesBild");
	const tabelleContainer = document.getElementById("tabelle");

	const uploadCard = document.createElement("div");
	uploadCard.className = "upload-karte";

	const dropZone = document.createElement("div");
	dropZone.className = "upload-ziel";
	dropZone.title = "Ziehen Sie hier ein Bild zum Klassifizieren hinein.";
	dropZone.setAttribute("role", "button");
	dropZone.setAttribute("tabindex", "0");
	dropZone.setAttribute("aria-label", "Bild zum Hochladen hier ablegen oder klicken");

	const dropHint = document.createElement("div");
	dropHint.textContent = "Bild hier hereinziehen";
	dropZone.appendChild(dropHint);

	const uploadedImage = document.createElement("img");
	uploadedImage.style.display = "none";
	dropZone.appendChild(uploadedImage);

	const buttonsWrapper = document.createElement("div");
	buttonsWrapper.className = "upload-buttons";

	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.accept = "image/*";
	fileInput.id = "uploadInput";

	const fileLabel = document.createElement("label");
	fileLabel.setAttribute("for", "uploadInput");
	fileLabel.setAttribute("aria-label", "Datei von Ihrem Gerät auswählen");
	fileLabel.textContent = "📁 Datei aus Filesystem auswählen";
	fileLabel.title = "Wählen Sie eine Bilddatei von Ihrem Computer aus.";

	buttonsWrapper.appendChild(fileInput);
	buttonsWrapper.appendChild(fileLabel);

	uploadCard.appendChild(dropZone);
	uploadCard.appendChild(buttonsWrapper);
	
	const feedbackText = document.createElement("div");
	feedbackText.textContent = ""; // Anfang: leer
	feedbackText.style.color = "black";
	feedbackText.style.marginTop = "10px";
	uploadCard.appendChild(feedbackText);
	
	eigenesBildContainer.appendChild(uploadCard);

	dropZone.addEventListener("dragover", e => {
		e.preventDefault();
		dropZone.classList.add("dragover");
	});

	dropZone.addEventListener("dragleave", () => {
		dropZone.classList.remove("dragover");
	});

	dropZone.addEventListener("drop", e => {
		e.preventDefault();
		dropZone.classList.remove("dragover");
		if (e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			handleImageUpload(file);
		}
	});

	fileInput.addEventListener("change", () => {
		if (fileInput.files[0]) {
			handleImageUpload(fileInput.files[0]);
		}
	});

	function handleImageUpload(file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			uploadedImage.src = e.target.result;
			uploadedImage.style.display = "block";
			dropHint.style.display = "none"; // Nur Hinweistext ausblenden!
			feedbackText.textContent = "🔍 Klassifikation läuft...";
			feedbackText.style.color = "#2980b9";
		};
		reader.readAsDataURL(file);
		reader.onerror = () => {
		  alert("Beim Laden der Datei ist ein Fehler aufgetreten.");
		};
	}

	// Event: Klassifizieren
	function handleImageUpload(file) {

		const reader = new FileReader();
		reader.onload = function(e) {
			uploadedImage.src = e.target.result;
			uploadedImage.style.display = "block";
			dropHint.style.display = "none";

			// Nach dem Bildladen klassifizieren
			uploadedImage.onload = () => {
				classifier.classify(uploadedImage)
					.then(results => {
						console.log("Benutzerbild-Klassifikation:", results);

						const confidence = results[0].confidence;
						let farbe;
						if (confidence >= 0.9) {
							farbe = "green";
						} else if (confidence >= 0.5) {
							farbe = "orange";
						} else {
							farbe = "red";
						}

						// Karten einfärben
						uploadCard.style.border = `3px solid ${farbe}`;

						const chartCard = document.createElement("div");
						chartCard.className = "chart-karte";
						chartCard.style.border = `3px solid ${farbe}`;

						const chartCanvas = document.createElement("canvas");
						chartCanvas.height = 264;
						chartCanvas.width = 529;
						

						chartCard.appendChild(chartCanvas);

						// Chart.js
						const ctx = chartCanvas.getContext("2d");
						const topResults = results.slice(0, 3);
						const labels = topResults.map(r => r.label);
						const confidences = topResults.map(r => parseFloat((r.confidence * 100).toFixed(2)));

						new Chart(ctx, {
							type: "bar",
							data: {
								labels: labels,
								datasets: [{
									label: "Confidence (%)",
									data: confidences,
									backgroundColor: "#3498db"
								}]
							},
							options: {
								responsive: false,
								scales: {
									y: {
										beginAtZero: true,
										max: 100,
										ticks: {
											callback: value => value + "%"
										}
									},
									x: {
										ticks: { display: false },
										grid: { display: false }
									}
								},
								plugins: {
									legend: { display: false }
								}
							}
						});

						// Ergebnisliste darunter (wie bei Beispielkarten)
						const resultList = document.createElement("div");
						resultList.className = "chart-ergebnis";
						resultList.style.marginTop = "10px";
						resultList.style.textAlign = "left";
						resultList.style.fontSize = "0.9rem";
						resultList.style.width = "100%";

						topResults.forEach((r, i) => {
							const zeile = document.createElement("div");
							const prozent = (r.confidence * 100).toFixed(2);
							zeile.textContent = `${i + 1}: ${r.label} – ${prozent} %`;
							resultList.appendChild(zeile);
						});
						
						feedbackText.textContent = "✅ Bild erfolgreich klassifiziert!";
						feedbackText.style.color = "green";

						chartCard.appendChild(resultList);
						tabelleContainer.innerHTML = "";
						tabelleContainer.appendChild(chartCard);
						
						if (topResults.length > 0) {
							const topLabel = topResults[0].label;
							uploadedImage.title = `Klassifiziert als: ${topLabel}`;
						}

					})
					.catch(err => {
						feedbackText.textContent = "❌ Fehler bei der Klassifikation.";
						feedbackText.style.color = "red";
						console.error(err);
					});
			};
		};
		reader.readAsDataURL(file);
	}

	// 🌙 Dark Mode Toggle
	const darkToggle = document.getElementById("darkModeToggle");

	darkToggle.addEventListener("click", () => {
		document.body.classList.toggle("dark");
		darkToggle.setAttribute("aria-pressed", isDark ? "true" : "false");

		if (document.body.classList.contains("dark")) {
			darkToggle.textContent = "☀️ Light Mode aktivieren";
		} else {
			darkToggle.textContent = "🌙 Dark Mode aktivieren";
		}
	});


});
