// ============================================================
// paylink.js — Payment-link page extras
// ============================================================

import { switchAppView, switchToolTab } from './router.js';

export function showPayLinkButtons() {
  document.getElementById('plActionButtons').classList.remove('hidden');
}

// ─── Shared: restore full UI, clean URL, hide pl buttons ───

function _enterToolsPage() {
  // Hide the payment-link buttons — we're leaving that context
  document.getElementById('plActionButtons').classList.add('hidden');
  document.getElementById('extractedCard').classList.add('hidden');

  // Restore nav and tabs
  document.getElementById('bottomNav').classList.remove('hidden');
  document.getElementById('toolTabs').classList.remove('hidden');

  // Clean the ?pa= params from the URL without reloading
  window.history.replaceState({}, '', window.location.pathname);
}

// ─── Button handlers ────────────────────────────────────────

export function plGoScan() {
  _enterToolsPage();
  switchAppView('tools');
  switchToolTab('scanTab', document.getElementById('tabScan'));
}

export function plGoCreate() {
  _enterToolsPage();
  switchAppView('tools');
  switchToolTab('createTab', document.getElementById('tabCreate'));
}
