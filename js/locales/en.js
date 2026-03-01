// ============================================================
// locales/en.js — English translations
// UPInspect v1.0
// ============================================================

export default {
  // ── Meta ────────────────────────────────────────────────
  langLabel: 'हिं',            // label shown on the toggle button (the OTHER lang)
  langName:  'English',

  // ── Home: Hero ──────────────────────────────────────────
  txtEyebrow:       'Smart UPI Utility',
  txtHeroTitle:     'Decode. Verify.',
  txtHeroLine2:     'Pay Safely.',
  txtHeroSub:       'Take back control of your transactions. Reveal the hidden details inside any UPI QR code before the money leaves your account.',
  txtHeroIntent:    'Never pay blindly again.',

  // ── Home: CTA Buttons ───────────────────────────────────
  txtCtaScanTitle:  'Scan & Pay',
  txtCtaScanSub:    'Inspect QR codes securely',
  txtCtaCreateTitle:'Create Payment Links',
  txtCtaCreateSub:  'Generate custom QR cards',

  // ── Home: Core Capabilities ─────────────────────────────
  txtCapTitle:      'Core Capabilities',
  txtCap1Title:     'Instant Decoding',
  txtCap1Desc:      'Scan with your camera or upload a QR screenshot from your gallery.',
  txtCap2Title:     'Full Transparency',
  txtCap2Desc:      'Instantly view the underlying UPI ID, merchant name, and requested amount.',
  txtCap3Title:     'Flexible Payments',
  txtCap3Desc:      'Tap "Pay Now" to open your preferred app, or copy the UPI ID for manual high-value transfers.',
  txtCap4Title:     'Custom Generation',
  txtCap4Desc:      'Create clean, shareable payment links and professional digital QR standees.',
  txtCapNote:       'UPInspect acts as your secure gateway.',
  txtCapNoteBold:   'Review the details first, then open your banking app.',

  // ── Home: Trust card ────────────────────────────────────
  txtTrustTitle:    '100% On-Device Privacy',
  txtTrustDesc:     'Runs entirely locally in your browser. Your scanned codes, payment data, and UPI details never touch a server.',

  // ── Bottom Nav ──────────────────────────────────────────
  txtNavHome:  'Home',
  txtNavTools: 'Tools',
  txtNavAbout: 'About',

  // ── Tools: Tab labels ───────────────────────────────────
  txtTabScan:   'Scan & Pay',
  txtTabCreate: 'Create Links & QR',

  // ── Tools: Scanner ──────────────────────────────────────
  txtStartCam:  'Scan QR',
  txtStopCam:   'Stop',
  txtUploadImg: 'Upload QR',

  // ── Tools: Create form ──────────────────────────────────
  txtLabelUpiId:  'UPI ID',
  txtLabelName:   'Merchant Name',
  txtLabelAmount: 'Amount',
  txtOptional:    'Optional',
  txtGenQR:       'Generate QR Card',
  txtGenLinkBtn:  'Copy Link',

  // ── Standee card ────────────────────────────────────────
  txtUpiApps:      'GPay • PhonePe • Paytm • BHIM',
  txtScanPrompt:   'Scan to pay with any UPI app',
  txtStandeeDefault: 'UPI Payment',

  // ── Standee actions ─────────────────────────────────────
  txtDownload: 'Save Image',
  txtShareGen: 'Share',

  // ── Extracted / verified card ───────────────────────────
  extractTitle:      'Payment Verified',
  txtPaymentRequest: 'Payment Request',
  lblUpi:      'UPI ID',
  lblMerchant: 'Merchant',
  lblAmount:   'Fixed Amount',
  txtCopy:     'Copy UPI ID',
  txtPay:      'Pay Now',

  // ── About: Hero ─────────────────────────────────────────
  txtAboutHeroTitle: '🛡 About UPInspect',
  txtAboutHeroSub:   'Adding Control to QR-Based Payments',

  // ── About: Intro ────────────────────────────────────────
  txtAboutIntro: 'UPInspect is a privacy-first utility that decodes UPI QR codes before initiating a transaction. Instead of blindly redirecting you to a payment app, UPInspect adds a transparent verification step so you can review the UPI ID, merchant name and requested amount, putting you completely in control of your digital payments.',

  // ── About: Features ─────────────────────────────────────
  txtFeaturesTitle: 'Features',
  txtFeat1Title: 'Decode & Inspect',
  txtFeat1Desc:  'Extract and view hidden details - UPI ID, merchant name, and requested amount from any QR code before paying.',
  txtFeat2Title: 'Scan or Upload',
  txtFeat2Desc:  "Use your device's camera for live scanning, or upload a saved QR screenshot directly from your gallery.",
  txtFeat3Title: 'Create & Share',
  txtFeat3Desc:  'Generate custom UPI payment links and professional QR standee cards you can share anywhere.',
  txtFeat4Title: '100% Private & Local',
  txtFeat4Desc:  'Your payment data never leaves your device. Everything runs securely within your browser, no servers, no tracking.',

  // ── About: Usages ───────────────────────────────────────
  txtUsagesTitle: 'Usages',
  txtUsage1Title: 'Fraud Prevention',
  txtUsage1Desc:  'Verify the actual payee identity before confirming a transfer, never pay blind again.',
  txtUsage2Title: 'Manual Banking Transfers',
  txtUsage2Desc:  "Copy the extracted UPI ID to manually handle higher-value payments through your bank's official app.",
  txtUsage3Title: 'Remote Payments',
  txtUsage3Desc:  'Safely inspect and pay for shared QR screenshots sent via chat apps.',
  txtUsage4Title: 'For Freelancers & Merchants',
  txtUsage4Desc:  'Quickly create clear, shareable payment links without exposing your personal phone number.',

  // ── About: FAQs ─────────────────────────────────────────
  txtFaqHeading: '❓ FAQs',
  txtFaq1Q: 'What does UPInspect actually do?',
  txtFaq1A: 'UPInspect decodes UPI QR codes and displays the embedded payment details before you initiate the transaction. You can then pay via your preferred UPI app, copy the UPI ID to send manually, or generate a clean payment link.',
  txtFaq2Q: 'Does UPInspect process payments?',
  txtFaq2A: 'No. All payments are completed within your selected UPI-enabled banking or payment app. UPInspect does not handle or store funds.',
  txtFaq3Q: 'Why do some QR payments show a ₹2,000 limit?',
  txtFaq3A: 'In certain cases, banks or UPI apps may apply transaction caps or additional checks when payments are initiated directly through QR scan flows. These limits are determined by your bank or UPI provider, not by UPInspect.',
  txtFaq4Q: 'Does UPInspect bypass the ₹2,000 QR limit?',
  txtFaq4A: "No. UPInspect does not bypass, override, or interfere with any bank-imposed limits. All transactions remain fully subject to your bank's rules, authentication requirements, and regulatory guidelines.",
  txtFaq5Q: 'Then how does UPInspect help with higher-value payments?',
  txtFaq5A: "UPInspect allows you to extract the UPI ID from a QR code and initiate payment manually through your bank's standard transfer flow. Any limits, approvals, or security checks are still enforced entirely by your bank. UPInspect only gives you flexibility in how you start the payment.",
  txtFaq6Q: 'Is UPInspect compliant with UPI rules?',
  txtFaq6A: "Yes. UPInspect does not alter transaction data or modify payment limits. It only decodes publicly embedded UPI QR information and allows users to proceed through official UPI apps. All transactions follow NPCI guidelines and your bank's policies.",

  // ── Footer ──────────────────────────────────────────────
  txtVersion: 'UPInspect v1.0  ·  MIT License',

  // ── Toast / error messages ──────────────────────────────
  msgCameraDenied:   'Camera access denied.',
  msgQrReadError:    'Cannot read QR from image.',
  msgQrParseError:   'Could not parse QR data.',
  msgQrInvalid:      'Invalid UPI QR code.',
  msgUpiIdInvalid:   'Enter a valid UPI ID (e.g. name@upi)',
  msgAmountInvalid:  'Enter a valid amount.',
  msgUpiCopied:      'UPI ID copied!',
  msgCopyFailed:     'Copy failed.',
  msgLinkCopied:     'Payment link copied!',
  msgLinkCopyFailed: 'Copy failed — long-press the link to copy manually.',
  msgImageSaved:     'Image saved!',
  msgDownloadFailed: 'Download failed.',
  msgShareFailed:    'Share failed.',
};
