let qr;

function updateQR() {
	const qrParams = 	{
		url: 					 document.getElementById("qr-text").value,
		colorLight: 			 document.getElementById("bg-color").value,
		colorDark: 				 document.getElementById("dot-color").value,
		textPosition: 			 document.getElementById("qr-text-pos").value,
		size: 		    parseInt(document.getElementById("qr-size").value, 10),
		ecclevel: 	    parseInt(document.getElementById("qr-ecc").value, 10),
		borderSize:     parseInt(document.getElementById("border-size").value, 10),
		textSizeAdjust: parseInt(document.getElementById("text-size-adjustment").value, 10),
		pixelRadius: 	parseInt(document.getElementById("pixel-rounding").value, 10),
		// noBorder: true,
		// toTable: false,
		// textDisplay: true,
	};
	
	qrOutput.textContent = '';
	qr = new NoBSQR(qrParams);
	qrOutput.append(qr.domElement);
}

const qrOutput = document.getElementById("qr-output");

const qrSize = document.getElementById("qr-size");

const inputIDs = [	"qr-text", "qr-size", "border-size", "text-size-adjustment", "dot-color",
					"bg-color", "qr-text-pos", "pixel-rounding", "qr-ecc" ]

inputIDs.forEach(inputID => {
	const elem = document.getElementById(inputID);
	elem.addEventListener("input", () => {
		updateQR();
	});
});

updateQR();


const swapClasses = (elem, c1, c2) => { elem.classList.remove(c1), elem.classList.add(c2) };

const settingsTab = document.getElementById("settings-tab")
const settingsPanel = document.getElementById("settings-panel")

// Slide Settings Panel

function slideSettings() {
	(settingsPanel.classList.contains("slide-settings-in")) ?
	swapClasses(settingsPanel, "slide-settings-in", "slide-settings-out"):
	swapClasses(settingsPanel, "slide-settings-out", "slide-settings-in");
}

settingsTab.addEventListener('click', () => { slideSettings(); });

const qrContainer = document.getElementById("qr-container");

qrContainer.addEventListener('click', () => {
	if (settingsPanel.classList.contains("slide-settings-in")) { slideSettings(); }
});

document.addEventListener('keyup', (event) => {
	if (event.key === "Escape" && settingsPanel.classList.contains("slide-settings-in")) {
		slideSettings();
	}
});

function safeFilename(text) {
	const allowedChars = /[ A-Za-z\d\.\-_()]+/g;
	const filename = text.match(allowedChars).join("-").slice(0, 33);
	return filename
}

// Download Functionality

async function download() {
    const a = document.createElement("a");
    a.href = await document.querySelector("#qr-output canvas").toDataURL();
	a.download = `[NoBSQR] (${safeFilename(qr.url)}).png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const logoImg = document.getElementById('logo');

const downloadButton = document.getElementById("download-button");
const downloadButtonText = document.querySelector("#download-button p")
const saveMessage = "Saved!"

downloadButton.addEventListener('click', () => {
	if (downloadButtonText.innerText !== saveMessage) {
		download();
		downloadButtonText.innerText = saveMessage
		swapClasses(downloadButton, "pending", "success");
	}
});

const qrTextBox = document.getElementById("qr-text");

qrTextBox.addEventListener('input', () => {
	downloadButtonText.innerText = "Download";
	swapClasses(downloadButton, "success", "pending");
	(qrTextBox.value !== "") ?
	downloadButton.style.visibility = "visible" :
	downloadButton.style.visibility = "hidden";
});