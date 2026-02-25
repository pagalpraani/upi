// ============================================================
// paylink.js — Extra features shown only in payment-link mode
//   · Inspect Another QR  (plScanSection)
//   · Create Your UPI Link (plCreateSection)
// UPInspect v2.0
// ============================================================

import { state, UPI_REGEX, BASE_PAY_URL } from './state.js';
import { showMessage }                      from './ui.js';

const $ = id => document.getElementById(id);

// ─── Reveal sections ───────────────────────────────────────

export function showPayLinkSections() {
  $('plScanSection').classList.remove('hidden');
  $('plCreateSection').classList.remove('hidden');
}

// ─── PL Scanner ────────────────────────────────────────────

let plHtml5QrCode = null;
let plIsScanning  = false;
let plRawAmount   = '';

function plInitScanner() {
  if (!plHtml5QrCode) plHtml5QrCode = new Html5Qrcode('plReader');
}

function plSetScanUI(scanning) {
  $('plScannerWrapper').classList.toggle('hidden', !scanning);
  $('plBtnStartCam').classList.toggle('hidden',  scanning);
  $('plBtnStopCam').classList.toggle('hidden',  !scanning);
}

export async function plStopScanner() {
  if (plHtml5QrCode && plIsScanning) {
    try { await plHtml5QrCode.stop(); } catch (_) {}
    plIsScanning = false;
  }
  plSetScanUI(false);
}

export function plStartScanner() {
  plInitScanner();
  $('plExtractedCard').classList.add('hidden');
  plSetScanUI(true);

  const qrboxSize = window.innerWidth < 350 ? 180 : 240;

  plHtml5QrCode
    .start(
      { facingMode: 'environment' },
      { fps: 12, qrbox: { width: qrboxSize, height: qrboxSize } },
      (decodedText) => {
        plParseQR(decodedText);
        plStopScanner();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      },
      () => {}
    )
    .then(() => { plIsScanning = true; })
    .catch(() => {
      plSetScanUI(false);
      showMessage('Camera access denied.', 'error');
    });
}

export function plInitFileUpload() {
  $('plQrFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    $('plExtractedCard').classList.add('hidden');
    plInitScanner();
    plHtml5QrCode
      .scanFile(file, true)
      .then(text => plParseQR(text))
      .catch(() => showMessage('Cannot read QR from image', 'error'));
    e.target.value = '';
  });
}

function plParseQR(text) {
  const trimmed = text.trim();

  if (trimmed.toLowerCase().startsWith('upi://pay')) {
    try {
      const url = new URL(trimmed);
      plRenderExtracted({
        pa: url.searchParams.get('pa') || 'N/A',
        pn: url.searchParams.get('pn') || 'N/A',
        am: url.searchParams.get('am') || '',
      });
    } catch (_) {
      showMessage('Could not parse QR data', 'error');
    }
    return;
  }

  if (UPI_REGEX.test(trimmed)) {
    plRenderExtracted({ pa: trimmed, pn: 'N/A', am: '' });
    return;
  }

  showMessage('Invalid UPI QR code', 'error');
}

function plRenderExtracted({ pa, pn, am }) {
  $('plValUpiId').textContent   = pa;
  $('plValMerchant').textContent = pn;
  plRawAmount = am;

  if (am) {
    $('plValAmount').textContent = `₹ ${parseFloat(am).toFixed(2)}`;
    $('plGroupAmount').classList.remove('hidden');
  } else {
    $('plGroupAmount').classList.add('hidden');
  }

  const card = $('plExtractedCard');
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth' });
}

export function plCopyUPI() {
  const id = $('plValUpiId').textContent;
  if (!id || id === '—' || id === 'N/A') return;
  navigator.clipboard.writeText(id)
    .then(() => showMessage('UPI ID copied!', 'success'))
    .catch(() => showMessage('Copy failed', 'error'));
}

export function plOpenUPI() {
  const pa = $('plValUpiId').textContent;
  const pn = $('plValMerchant').textContent;
  if (!pa || pa === '—' || pa === 'N/A') return;
  let link = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&cu=INR`;
  if (plRawAmount) link += `&am=${plRawAmount}`;
  window.open(link, '_self');
}

// ─── PL Generator ──────────────────────────────────────────

function plGetFormValues() {
  const pa = $('plNewUpiId').value.trim().toLowerCase();
  const pn = $('plNewName').value.trim();
  const am = $('plNewAmount').value.trim();

  if (!UPI_REGEX.test(pa)) {
    showMessage('Enter a valid UPI ID (e.g. name@upi)', 'error');
    $('plNewUpiId').classList.add('invalid');
    return null;
  }
  if (am && (isNaN(parseFloat(am)) || parseFloat(am) < 0)) {
    showMessage('Enter a valid amount', 'error');
    return null;
  }
  return { pa, pn, am };
}

export function plValidateUpiLive() {
  const input = $('plNewUpiId');
  const val   = input.value.trim();
  if (!val) {
    input.classList.remove('valid', 'invalid');
  } else if (UPI_REGEX.test(val)) {
    input.classList.remove('invalid'); input.classList.add('valid');
  } else {
    input.classList.remove('valid'); input.classList.add('invalid');
  }
}

export function plGenerateQRCard() {
  const data = plGetFormValues();
  if (!data) return;

  const { pa, pn, am } = data;
  let upiStr = `upi://pay?pa=${pa}&pn=${encodeURIComponent(pn)}&cu=INR`;
  if (am) upiStr += `&am=${am}`;

  $('plStandeeName').textContent   = pn || 'UPI Payment';
  $('plStandeeUpiId').textContent  = pa;
  $('plStandeeAmount').textContent = am ? `₹ ${parseFloat(am).toFixed(2)}` : '';

  $('plCardQrCode').innerHTML = '';
  new QRCodeStyling({
    width: 220, height: 220, type: 'canvas',
    data: upiStr,
    qrOptions:         { errorCorrectionLevel: 'M' },
    dotsOptions:       { color: '#0A2463', type: 'square' },
    backgroundOptions: { color: '#FFFFFF' },
    margin: 0,
  }).append($('plCardQrCode'));

  $('plQrStandee').classList.remove('hidden');
  $('plCardActions').classList.remove('hidden');
  $('plQrStandee').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function plGenerateLink() {
  const data = plGetFormValues();
  if (!data) return;

  let url = `${BASE_PAY_URL}?pa=${encodeURIComponent(data.pa)}`;
  if (data.pn) url += `&pn=${encodeURIComponent(data.pn)}`;
  if (data.am) url += `&am=${encodeURIComponent(data.am)}`;

  navigator.clipboard.writeText(url)
    .then(() => showMessage('Payment link copied!', 'success'))
    .catch(() => showMessage('Copy failed', 'error'));
}

// ─── PL Share ──────────────────────────────────────────────

async function plGetCardBlob() {
  const canvas = await html2canvas($('plQrStandee'), {
    scale: 3, backgroundColor: '#FFFFFF', logging: false, useCORS: true,
  });
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

export async function plDownloadStandee() {
  const btn = $('plBtnDownload');
  btn.disabled = true;
  try {
    const blob = await plGetCardBlob();
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'UPInspect-QR.png' });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage('Image saved!', 'success');
  } catch (_) {
    showMessage('Download failed', 'error');
  }
  btn.disabled = false;
}

export async function plShareStandee() {
  const btn = $('plBtnShare');
  btn.disabled = true;
  try {
    const blob = await plGetCardBlob();
    const file = new File([blob], 'UPInspect-QR.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: 'Scan to Pay', files: [file] });
    } else if (navigator.share) {
      await navigator.share({ title: 'UPInspect QR', text: 'Scan to pay securely' });
    } else {
      await plDownloadStandee();
    }
  } catch (e) {
    if (e.name !== 'AbortError') showMessage('Share failed', 'error');
  }
  btn.disabled = false;
}
