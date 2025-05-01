
function interpretColor(rgb) {
  const isClose = (a, b, tolerance = 10) => Math.abs(a - b) <= tolerance;

  if (isClose(rgb.r, 180) && isClose(rgb.g, 150) && isClose(rgb.b, 80)) {
    return "Sangat Layak Dikonsumsi";
  } else if (isClose(rgb.r, 100) && isClose(rgb.g, 120) && isClose(rgb.b, 60)) {
    return "Masih Layak Dikonsumsi";
  } else if (isClose(rgb.r, 80) && isClose(rgb.g, 80) && isClose(rgb.b, 100)) {
    return "Kurang Layak Dikonsumsi";
  } else {
    return "Tidak Dikenali";
  }
}

function getPriceByQuality(quality) {
  switch(quality) {
    case "Sangat Layak Dikonsumsi": return "Rp 25.000";
    case "Masih Layak Dikonsumsi": return "Rp 10.000";
    case "Kurang Layak Dikonsumsi": return "Rp 7.000";
    default: return "Harga tidak tersedia";
  }
}

function updateDisplay(rgb) {
  const quality = interpretColor(rgb);
  const price = getPriceByQuality(quality);
  document.getElementById("quality").innerText = "Kualitas: " + quality;
  document.getElementById("price").innerText = "Harga: " + price;
}

function extractRGBFromQR(text) {
  try {
    const rgb = JSON.parse(text);
    if (rgb.r !== undefined && rgb.g !== undefined && rgb.b !== undefined) {
      updateDisplay(rgb);
    }
  } catch (e) {
    document.getElementById("quality").innerText = "Format QR tidak sesuai.";
  }
}

const html5QrCode = new Html5Qrcode("reader");
Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        html5QrCode.stop();
        extractRGBFromQR(decodedText);
      }
    );
  }
}).catch(err => {
  document.getElementById("quality").innerText = "Error: " + err;
});

function generateQR() {
  const r = parseInt(document.getElementById("r").value);
  const g = parseInt(document.getElementById("g").value);
  const b = parseInt(document.getElementById("b").value);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    alert("Harap masukkan nilai RGB yang valid (0-255)");
    return;
  }

  const qr = new QRious({
    element: document.getElementById("qrCanvas"),
    size: 200,
    value: JSON.stringify({ r, g, b })
  });
}
