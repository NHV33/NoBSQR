import NoBSQR from "./NoBSQR.module.js";

function newQR(params){
	var qr = new NoBSQR(params);
	return qr.domElement;
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

function updateQR() {
	qrOutput.textContent = "";
	qrOutput.appendChild(newQR(
		{
			url: document.getElementById("qr-text").value,
			ecclevel: parseInt(document.getElementById("qr-ecc").value, 10),
			size: parseInt(document.getElementById("qr-size").value, 10),
			borderSize: parseInt(document.getElementById("border-size").value, 10),
			textSizeAdjust: parseInt(document.getElementById("text-size-adjustment").value, 10),
			colorLight: document.getElementById("bg-color").value,
			colorDark: document.getElementById("dot-color").value,
			pixelRadius: parseInt(document.getElementById("pixel-rounding").value, 10),
			textPosition: document.getElementById("qr-text-pos").value
			// noBorder: true,
			// toTable: false,
			// textDisplay: true,
		}
	));
}
