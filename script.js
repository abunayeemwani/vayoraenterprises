/* ==========================================================================
   AQUAYN BY VAYORA ENTERPRISES - CORE INTERACTIVITY JAVASCRIPT
   Features:
     - Multi-page routing (Home, Brand, Product, Distribution, Quality, Contact, Legal)
     - Interactive Vector PET Bottle Generator (1L & 500mL) with Specular Gradients
     - Live 3D perspective mouse-tilt lighting tracker
     - Format switchers and anatomy inspection toggles
     - Commercial B2B wholesale case estimator calculation engine
     - Enquiry modal manager with field validation and docket summary copy
   ========================================================================== */

// --- DATA CONFIGURATION ---
const BRAND_DATA = {
  name: "AQUAYN",
  company: "Vayora Enterprises",
  location: "Shopian, Jammu & Kashmir, India",
  email: "enquiry@vayoraenterprises.com"
};

const DISTRICTS = [
  "Shopian (Headquarters)",
  "Srinagar",
  "Pulwama",
  "Anantnag",
  "Kulgam",
  "Budgam",
  "Baramulla",
  "Ganderbal",
  "Bandipora",
  "Kupwara"
];

const BUYER_TYPES = [
  "Retailer / Kirana Store",
  "Wholesale Stockist",
  "Regional Distributor",
  "Hotel / Guest House",
  "Restaurant / Café",
  "Institutional / Corporate Office",
  "Catering & Event Organizer",
  "Other"
];

const FAQS = [
  {
    q: "What is Aquayn?",
    a: "Aquayn is a contemporary packaged drinking-water brand owned and operated by Vayora Enterprises, based in Shopian, Jammu & Kashmir. It is created to provide dependable, hygienic packaged drinking water for everyday consumption across retail, corporate, and hospitality sectors."
  },
  {
    q: "Which bottle formats are available?",
    a: "Aquayn is engineered in two primary consumer formats: the 1 Litre Flagship bottle (12 units/case) suited for table service, hospitality, and home retail; and the 500 mL On-the-Go bottle (24 units/case) optimized for mobility, events, and travel."
  },
  {
    q: "How can businesses enquire about wholesale pricing & minimum order quantities?",
    a: "You can submit an enquiry directly through our online B2B form or request a commercial call-back. Our team reviews requirements based on volume tiers, delivery destination, and delivery schedules."
  },
  {
    q: "How can I become an authorized regional distributor in Kashmir?",
    a: "We welcome distributor partnerships across Shopian and the wider Kashmir Valley. Please submit the 'Become a Distributor' application with your business name, logistics footprint, and intended territory. Our distribution team will arrange a formal discussion."
  },
  {
    q: "Which geographic areas does Vayora Enterprises serve?",
    a: "Our core logistics focus originates from Shopian, with primary trade distribution routes expanding across Pulwama, Srinagar, Anantnag, Kulgam, and surrounding districts throughout Jammu & Kashmir."
  },
  {
    q: "Where can verified quality and regulatory documentation be accessed?",
    a: "Vayora Enterprises adheres strictly to responsible product compliance. Verified licences, lab test certifications, and operational batch codes are made available directly to institutional buyers and commercial trade partners during account onboarding."
  }
];

// --- APP STATE ---
let currentHeroFormat = '1L';
let isInspectionActive = false;
let estimatorFormat = '1L';

// --- SVG GENERATOR ENGINE ---
function generateBottleSVG(size, isInteractive = true, lightTilt = 0) {
  const is1L = size === '1L';
  const tiltStyle = isInteractive ? `transform: perspective(1000px) rotateY(${lightTilt * 0.15}deg);` : '';

  return `
    <svg viewBox="0 0 320 680" style="width:100%; height:auto; max-height:480px; filter: drop-shadow(0 20px 25px rgba(16,75,56,0.18)); transition: transform 0.2s ease; ${tiltStyle}">
      <defs>
        <linearGradient id="petGloss_${size}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="15%" stop-color="#eaf8f1" stop-opacity="0.3" />
          <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05" />
          <stop offset="70%" stop-color="#9adbc0" stop-opacity="0.2" />
          <stop offset="85%" stop-color="#ffffff" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#104B38" stop-opacity="0.25" />
        </linearGradient>

        <linearGradient id="waterBody_${size}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ebfbf4" stop-opacity="0.65" />
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#d5f2e3" stop-opacity="0.5" />
        </linearGradient>

        <linearGradient id="capGrad_${size}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#176B4D" />
          <stop offset="40%" stop-color="#259a71" />
          <stop offset="70%" stop-color="#104B38" />
          <stop offset="100%" stop-color="#0B3326" />
        </linearGradient>

        <linearGradient id="labelBase_${size}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="75%" stop-color="#F7FAF8" />
          <stop offset="100%" stop-color="#EBF4EE" />
        </linearGradient>
      </defs>

      <!-- Outer Shadow Pod -->
      <ellipse cx="160" cy="655" rx="${is1L ? 85 : 75}" ry="16" fill="#104B38" opacity="0.16" />
      <ellipse cx="160" cy="652" rx="${is1L ? 60 : 50}" ry="8" fill="#104B38" opacity="0.25" />

      <!-- Bottle Body -->
      ${is1L ? `
        <path d="M 136,68 L 184,68 L 185,110 Q 185,140 215,185 Q 228,205 228,235 L 228,410 Q 224,430 228,450 L 228,615 Q 228,642 195,642 L 125,642 Q 92,642 92,615 L 92,450 Q 96,430 92,410 L 92,235 Q 92,205 105,185 Q 135,140 135,110 Z"
              fill="url(#waterBody_${size})" stroke="#BDE3CE" stroke-width="2" />
        <path d="M 96,215 Q 160,205 224,215 L 224,610 Q 160,638 96,610 Z"
              fill="url(#petGloss_${size})" opacity="0.45" />
      ` : `
        <path d="M 137,120 L 183,120 L 184,155 Q 184,180 212,220 Q 222,235 222,260 L 222,420 Q 218,435 222,450 L 222,595 Q 222,622 192,622 L 128,622 Q 98,622 98,595 L 98,450 Q 102,435 98,420 L 98,260 Q 98,235 108,220 Q 136,180 136,155 Z"
              fill="url(#waterBody_${size})" stroke="#BDE3CE" stroke-width="2" />
        <path d="M 102,240 Q 160,232 218,240 L 218,590 Q 160,616 102,590 Z"
              fill="url(#petGloss_${size})" opacity="0.45" />
      `}

      <!-- Ribbing Lines -->
      <g stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.65" fill="none">
        ${is1L ? `
          <path d="M 94,250 Q 160,260 226,250" />
          <path d="M 93,268 Q 160,278 227,268" />
          <path d="M 93,286 Q 160,296 227,286" />
          <path d="M 93,545 Q 160,555 227,545" />
          <path d="M 93,565 Q 160,575 227,565" />
          <path d="M 94,585 Q 160,595 226,585" />
        ` : `
          <path d="M 100,275 Q 160,283 220,275" />
          <path d="M 99,292 Q 160,300 221,292" />
          <path d="M 99,535 Q 160,543 221,535" />
          <path d="M 100,552 Q 160,560 220,552" />
        `}
      </g>

      <!-- Label -->
      <g transform="${is1L ? 'translate(0, 0)' : 'translate(0, 5)'}">
        <rect x="${is1L ? 92.5 : 98.5}" y="${is1L ? 320 : 330}" width="${is1L ? 135 : 123}" height="${is1L ? 190 : 170}" rx="6" fill="url(#labelBase_${size})" stroke="#DDF3E7" stroke-width="1.2" />
        <rect x="${is1L ? 93 : 99}" y="${is1L ? 320 : 330}" width="${is1L ? 134 : 122}" height="6" fill="#176B4D" rx="3" />
        <text x="160" y="${is1L ? 365 : 372}" text-anchor="middle" fill="#104B38" font-family="'Manrope', sans-serif" font-weight="800" font-size="${is1L ? 23 : 20}" letter-spacing="3.5">AQUAYN</text>
        <text x="160" y="${is1L ? 382 : 388}" text-anchor="middle" fill="#6B7770" font-family="'Inter', sans-serif" font-weight="600" font-size="7.5" letter-spacing="1.2">PACKAGED DRINKING WATER</text>
        <line x1="125" y1="${is1L ? 395 : 400}" x2="195" y2="${is1L ? 395 : 400}" stroke="#176B4D" stroke-width="1" stroke-opacity="0.4" />
        <rect x="134" y="${is1L ? 410 : 414}" width="52" height="18" rx="9" fill="#DDF3E7" />
        <text x="160" y="${is1L ? 422.5 : 426.5}" text-anchor="middle" fill="#104B38" font-family="'Inter', sans-serif" font-weight="700" font-size="9.5">${is1L ? '1.0 LITRE' : '500 mL'}</text>
        <text x="160" y="452" text-anchor="middle" fill="#202A25" font-family="'Manrope', sans-serif" font-weight="600" font-size="7.8">VAYORA ENTERPRISES</text>
        <text x="160" y="${is1L ? 465 : 464}" text-anchor="middle" fill="#6B7770" font-family="'Inter', sans-serif" font-weight="500" font-size="6.8">Shopian · Kashmir</text>
        <text x="160" y="${is1L ? 503 : 494}" text-anchor="middle" fill="#9BA6A0" font-family="'Inter', sans-serif" font-size="5.5">Crush bottle after use · Keep in cool, dry place</text>
      </g>

      <!-- Tamper Ring & Cap -->
      <rect x="137" y="${is1L ? 58 : 110}" width="46" height="7" rx="2" fill="#104B38" stroke="#0B3326" stroke-width="0.8" />
      <rect x="135" y="${is1L ? 32 : 84}" width="50" height="26" rx="4" fill="url(#capGrad_${size})" stroke="#104B38" stroke-width="1" />
      <!-- Vertical Cap Ridges -->
      <g stroke="#2db384" stroke-width="1" opacity="0.4">
        <line x1="142" y1="${is1L ? 34 : 86}" x2="142" y2="${is1L ? 56 : 108}" />
        <line x1="148" y1="${is1L ? 34 : 86}" x2="148" y2="${is1L ? 56 : 108}" />
        <line x1="154" y1="${is1L ? 34 : 86}" x2="154" y2="${is1L ? 56 : 108}" />
        <line x1="160" y1="${is1L ? 34 : 86}" x2="160" y2="${is1L ? 56 : 108}" />
        <line x1="166" y1="${is1L ? 34 : 86}" x2="166" y2="${is1L ? 56 : 108}" />
        <line x1="172" y1="${is1L ? 34 : 86}" x2="172" y2="${is1L ? 56 : 108}" />
        <line x1="178" y1="${is1L ? 34 : 86}" x2="178" y2="${is1L ? 56 : 108}" />
      </g>
    </svg>
  `;
}

// --- NAVIGATION CONTROLLER ---
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update navigation active states
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
  });

  // Close mobile drawer if open
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  drawer.classList.toggle('open');
}

// --- HERO BOTTLE CONTROLS ---
function renderHeroBottle(size, tilt = 0) {
  const container = document.getElementById('bottleSvgContainer');
  if (container) {
    container.innerHTML = generateBottleSVG(size, true, tilt);
  }
}

function switchHeroFormat(size) {
  currentHeroFormat = size;
  document.getElementById('btnFormat1L').classList.toggle('active', size === '1L');
  document.getElementById('btnFormat500ml').classList.toggle('active', size === '500ml');

  const caption = document.getElementById('bottleCaption');
  if (size === '1L') {
    caption.innerHTML = `<strong>12 Bottles per Shrink Case &middot; 1000 mL</strong><span>Intended commercial formats. Subject to batch availability.</span>`;
  } else {
    caption.innerHTML = `<strong>24 Bottles per Shrink Case &middot; 500 mL</strong><span>Intended commercial formats. Subject to batch availability.</span>`;
  }

  renderHeroBottle(size);
}

function toggleInspectionMode() {
  isInspectionActive = !isInspectionActive;
  const overlay = document.getElementById('inspectOverlay');
  const btn = document.getElementById('btnInspect');

  if (overlay) overlay.style.display = isInspectionActive ? 'flex' : 'none';
  if (btn) btn.classList.toggle('active', isInspectionActive);
}

// Mouse movement dynamic lighting on hero bottle stage
function setupHeroBottleTilt() {
  const stage = document.getElementById('bottleStage');
  if (!stage) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const tilt = ((x - centerX) / centerX) * 20; // -20deg to +20deg
    renderHeroBottle(currentHeroFormat, tilt);
  });

  stage.addEventListener('mouseleave', () => {
    renderHeroBottle(currentHeroFormat, 0);
  });
}

// --- B2B CASE ESTIMATOR ENGINE ---
function setEstimatorFormat(format) {
  estimatorFormat = format;
  document.getElementById('btnEst1L').classList.toggle('active', format === '1L');
  document.getElementById('btnEst500ml').classList.toggle('active', format === '500ml');
  updateEstimator();
}

function updateEstimator() {
  const slider = document.getElementById('caseSlider');
  const cases = parseInt(slider.value, 10);
  const unitsPerCase = estimatorFormat === '1L' ? 12 : 24;
  const totalBottles = cases * unitsPerCase;
  const weightKg = Math.round(cases * (estimatorFormat === '1L' ? 12.6 : 13.0));

  document.getElementById('estCasesDisplay').textContent = `${cases} Cases`;
  document.getElementById('estBottlesCount').textContent = totalBottles.toLocaleString();
  document.getElementById('estWeightKg').textContent = weightKg.toLocaleString();
  document.getElementById('estCasesTotal').textContent = cases;
}

function submitEstimatedEnquiry() {
  const slider = document.getElementById('caseSlider');
  const cases = slider.value;
  const formatName = estimatorFormat === '1L' ? '1 Litre Flagship' : '500 mL Compact';
  openEnquiryModal(`Quote for ${cases} Cases of ${formatName}`);
}

// --- FAQ ACCORDION ENGINE ---
function renderFaqs() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = FAQS.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}" id="faqItem_${idx}">
      <button class="faq-question" onclick="toggleFaq(${idx})">
        <span>${faq.q}</span>
        <span class="faq-arrow">&darr;</span>
      </button>
      <div class="faq-answer">${faq.a}</div>
    </div>
  `).join('');
}

function toggleFaq(index) {
  const item = document.getElementById('faqItem_' + index);
  if (!item) return;
  const isOpen = item.classList.contains('open');

  // Optional: close other FAQs
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) {
    item.classList.add('open');
  }
}

// --- MODAL & FORM LOGIC ---
let activeModalContext = 'General Trade Enquiry';

function openEnquiryModal(context = 'Commercial Wholesale') {
  activeModalContext = context;
  const modal = document.getElementById('enquiryModal');
  const heading = document.getElementById('modalHeading');
  const err = document.getElementById('modalError');
  const success = document.getElementById('modalSuccess');
  const form = document.getElementById('tradeForm');

  heading.textContent = `Commercial Enquiry: ${context}`;
  err.style.display = 'none';
  success.style.display = 'none';
  form.style.display = 'block';

  modal.classList.add('open');
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  modal.classList.remove('open');
}

function populateSelectDropdowns() {
  const districtSelect = document.getElementById('formDistrict');
  const buyerSelect = document.getElementById('formBuyerType');

  if (districtSelect) {
    districtSelect.innerHTML = DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('');
  }
  if (buyerSelect) {
    buyerSelect.innerHTML = BUYER_TYPES.map(b => `<option value="${b}">${b}</option>`).join('');
  }

  // Populate distribution page grid
  const distContainer = document.getElementById('allDistrictsList');
  if (distContainer) {
    distContainer.innerHTML = DISTRICTS.map(d => `
      <div class="dist-box ${d.includes('Shopian') ? 'hq' : ''}">${d}</div>
    `).join('');
  }
}

async function handleTradeFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value.trim();
  const business = document.getElementById('formBusiness').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const district = document.getElementById('formDistrict').value;
  const buyerType = document.getElementById('formBuyerType').value;
  const bottleSize = document.getElementById('formBottleSize').value;
  const cases = document.getElementById('formCases').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const errorBox = document.getElementById('modalError');

  if (!name) {
    showModalError('Please provide your contact name.');
    return;
  }
  if (!business) {
    showModalError('Please provide your business or organization name.');
    return;
  }
  if (!phone || phone.length < 10) {
    showModalError('Please enter a valid 10-digit mobile contact number.');
    return;
  }

  errorBox.style.display = 'none';
  const form = document.getElementById('tradeForm');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending Enquiry...';

  // Construct summary docket
  const summaryText = `[AQUAYN TRADE ENQUIRY]
  Full Name: ${name}
  Business: ${business}
  Phone: ${phone}
  Email: ${email || 'N/A'}
  District: ${district}
  Buyer Profile: ${buyerType}
  Bottle Format: ${bottleSize}
  Est. Requirement: ${cases ? cases + ' Cases / Month' : 'To be discussed'}
  Context: ${activeModalContext}
  Message: ${message || 'Please share product catalog & commercial terms.'}`;

  try {
    const response = await fetch('https://formsubmit.co/ajax/vayoraoffice@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New AQUAYN Trade Enquiry - ${business}`,
        _template: 'table',
        _replyto: email,
        name,
        business,
        phone,
        email,
        district,
        buyerType,
        bottleSize,
        monthlyCases: cases || 'To be discussed',
        context: activeModalContext,
        message: message || 'Please share product catalog & commercial terms.'
      })
    });
    const result = await response.json();
    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'The email service could not accept this enquiry.');
    }

    document.getElementById('tradeSummaryText').textContent = summaryText;
    document.getElementById('successTitle').textContent = `Thank You, ${name}!`;
    document.getElementById('tradeForm').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
  } catch (error) {
    showModalError('Your enquiry could not be sent right now. Please try again.');
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    console.error('Trade enquiry email failed:', error);
  }
}

function showModalError(msg) {
  const errorBox = document.getElementById('modalError');
  errorBox.textContent = msg;
  errorBox.style.display = 'block';
}

function copyTradeSummary() {
  const text = document.getElementById('tradeSummaryText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btnCopySummary');
    btn.textContent = 'Copied to Clipboard!';
    setTimeout(() => { btn.textContent = 'Copy Summary'; }, 2000);
  });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Populate dynamic elements
  populateSelectDropdowns();
  renderFaqs();
  updateEstimator();

  // Render static product cards SVG pods
  const pod1L = document.getElementById('prodPod1L');
  const pod500 = document.getElementById('prodPod500ml');
  const dd1L = document.getElementById('deepDive1L');
  const dd500 = document.getElementById('deepDive500ml');

  if (pod1L) pod1L.innerHTML = generateBottleSVG('1L', false);
  if (pod500) pod500.innerHTML = generateBottleSVG('500ml', false);
  if (dd1L) dd1L.innerHTML = generateBottleSVG('1L', false);
  if (dd500) dd500.innerHTML = generateBottleSVG('500ml', false);

  // Render hero bottle & attach mouse-tracking tilt
  renderHeroBottle('1L');
  setupHeroBottleTilt();
});
