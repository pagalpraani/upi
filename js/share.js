// ============================================================
// share.js — Standee image download & native share
// UPInspect v2.0
// ============================================================

import { state }       from './state.js';
import { showMessage } from './ui.js';

const $ = id => document.getElementById(id);

// ─── Canvas capture ────────────────────────────────────────
//
// WHY NOT html2canvas for the whole thing:
//   html2canvas treats the QRCodeStyling <canvas> as cross-origin
//   tainted. With allowTaint:true the output canvas itself becomes
//   tainted so toBlob() throws a SecurityError — you get a blank QR.
//   With useCORS:true it just skips the canvas entirely — same result.
//
// THE FIX:
//   1. Use html2canvas ONLY for the non-QR parts of the standee,
//      with the QR div temporarily hidden.
//   2. Read the QR canvas pixels directly (same origin — safe).
//   3. Composite both onto a fresh high-res canvas ourselves.

async function getCardBlob() {
  const standee  = $('qrStandee');
  const qrWrap   = $('cardQrCode');

  // ── Step 1: find the actual QR <canvas> rendered by QRCodeStyling ──
  const qrCanvas = qrWrap.querySelector('canvas');

  // ── Step 2: measure the standee and QR wrapper positions ──
  const standeeRect = standee.getBoundingClientRect();
  const qrRect      = qrWrap.getBoundingClientRect();

  // Scale factor for the final output image (4× = print-quality)
  const SCALE = 4;
  const W = Math.round(standeeRect.width  * SCALE);
  const H = Math.round(standeeRect.height * SCALE);

  // ── Step 3: capture standee WITHOUT the QR (hide it temporarily) ──
  qrWrap.style.visibility = 'hidden';
  const bgCanvas = await html2canvas(standee, {
    scale:           SCALE,
    backgroundColor: '#FFFFFF',
    logging:         false,
    useCORS:         false,
    allowTaint:      false,
    imageTimeout:    0,
    width:           standeeRect.width,
    height:          standeeRect.height,
  });
  qrWrap.style.visibility = '';

  // ── Step 4: composite onto fresh canvas ──
  const out = document.createElement('canvas');
  out.width  = W;
  out.height = H;
  const ctx = out.getContext('2d');

  // Draw the background (standee without QR)
  ctx.drawImage(bgCanvas, 0, 0, W, H);

  // ── Step 5: draw QR canvas pixels directly (same-origin, no taint) ──
  if (qrCanvas) {
    // Position of QR wrapper relative to standee, scaled
    const qrX = Math.round((qrRect.left - standeeRect.left) * SCALE);
    const qrY = Math.round((qrRect.top  - standeeRect.top)  * SCALE);
    const qrW = Math.round(qrRect.width  * SCALE);
    const qrH = Math.round(qrRect.height * SCALE);

    // White background behind QR (matches the qrWrap padding/border area)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrW, qrH);

    // Draw the actual QR pixel data (reads from 1200×1200 native canvas)
    ctx.drawImage(qrCanvas, qrX, qrY, qrW, qrH);
  }

  return new Promise(resolve => out.toBlob(resolve, 'image/png'));
}

// ─── Download ──────────────────────────────────────────────

export async function downloadStandee() {
  const btn = $('btnDownload');
  btn.disabled = true;

  try {
    const blob = await getCardBlob();
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href:     url,
      download: 'UPInspect-QR.png',
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage(
      state.currentLang === 'en' ? 'Image saved!' : 'छवि सहेजी गई!',
      'success'
    );
  } catch (e) {
    console.error('Download error:', e);
    showMessage(
      state.currentLang === 'en' ? 'Download failed' : 'डाउनलोड विफल',
      'error'
    );
  }

  btn.disabled = false;
}

// ─── Share ─────────────────────────────────────────────────

export async function shareStandee() {
  const btn = $('btnShare');
  btn.disabled = true;

  try {
    const blob = await getCardBlob();
    const file = new File([blob], 'UPInspect-QR.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: 'Scan to Pay', files: [file] });
    } else if (navigator.share) {
      await navigator.share({ title: 'UPInspect QR', text: 'Scan to pay securely' });
    } else {
      await downloadStandee();
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      showMessage(
        state.currentLang === 'en' ? 'Share failed' : 'साझा विफल',
        'error'
      );
    }
  }

  btn.disabled = false;
}
