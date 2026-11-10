/**
 * Kiryana Store Supplier Ledger (किराना बही खाता)
 * Designed for older shopkeepers: large buttons, high contrast, bilingual, voice mic, Soundbox chime, History Ledger
 */

// 1. DEFAULT SEED DATA (Realistic Dry Kiryana Suppliers with Past 4 Weeks History)
const DEFAULT_SUPPLIERS = [
  {
    id: "sup_1",
    name: "श्री राम ऑयल & घी ट्रेडर्स (Shree Ram Oil & Ghee)",
    phone: "9810123456",
    settlementDay: "मंगलवार (Tuesday)",
    items: [
      { id: "itm_1", name: "देसी घी 1 लीटर डिब्बा (Desi Ghee 1L)", rate: 8500, paid: 8500 },
      { id: "itm_2", name: "सरसों तेल पीपा (Mustard Oil 15L)", rate: 4200, paid: 3000 },
      { id: "itm_3", name: "फॉर्च्यून रिफाइंड (Fortune Refined)", rate: 3100, paid: 0 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "02 Nov 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 15800,
        totalPaid: 15800,
        due: 0,
        status: "PAID",
        items: [
          { name: "देसी घी 1L (12 डिब्बे)", rate: 8500, paid: 8500 },
          { name: "सरसों तेल पीपा", rate: 4200, paid: 4200 },
          { name: "फॉर्च्यून रिफाइंड", rate: 3100, paid: 3100 }
        ]
      },
      {
        weekLabel: "20 Oct - 26 Oct 2026",
        settledDate: "26 Oct 2026",
        paymentMode: "नकद (Cash)",
        totalBill: 12700,
        totalPaid: 10000,
        due: 2700,
        status: "PARTIAL",
        items: [
          { name: "देसी घी 15kg टिन", rate: 8500, paid: 7000 },
          { name: "सरसों तेल पीपा", rate: 4200, paid: 3000 }
        ]
      },
      {
        weekLabel: "13 Oct - 19 Oct 2026",
        settledDate: "19 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 11600,
        totalPaid: 11600,
        due: 0,
        status: "PAID",
        items: [
          { name: "देसी घी 1L डिब्बा", rate: 8500, paid: 8500 },
          { name: "फॉर्च्यून रिफाइंड 5L", rate: 3100, paid: 3100 }
        ]
      }
    ]
  },
  {
    id: "sup_2",
    name: "महालक्ष्मी आटा चक्की & दाल (Mahalaxmi Atta & Dal)",
    phone: "9820234567",
    settlementDay: "शनिवार (Saturday)",
    items: [
      { id: "itm_4", name: "चक्की आटा बोरी (Chakki Atta 50kg)", rate: 14500, paid: 14500 },
      { id: "itm_5", name: "अरहर / तूर दाल (Toor Dal 30kg)", rate: 9800, paid: 9800 },
      { id: "itm_6", name: "बासमती चावल (Basmati Rice 25kg)", rate: 6400, paid: 6400 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "01 Nov 2026",
        paymentMode: "चेक (Cheque)",
        totalBill: 28000,
        totalPaid: 28000,
        due: 0,
        status: "PAID",
        items: [
          { name: "चक्की आटा (2 बोरी)", rate: 14000, paid: 14000 },
          { name: "अरहर दाल (30kg)", rate: 8500, paid: 8500 },
          { name: "चना दाल (25kg)", rate: 5500, paid: 5500 }
        ]
      },
      {
        weekLabel: "20 Oct - 26 Oct 2026",
        settledDate: "25 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 24500,
        totalPaid: 24500,
        due: 0,
        status: "PAID",
        items: [
          { name: "चक्की आटा बोरी", rate: 14500, paid: 14500 },
          { name: "बासमती चावल", rate: 10000, paid: 10000 }
        ]
      }
    ]
  },
  {
    id: "sup_3",
    name: "हिंदुस्तान यूनिलीवर एजेंसी (HUL FMCG Agency)",
    phone: "9830345678",
    settlementDay: "गुरुवार (Thursday)",
    items: [
      { id: "itm_7", name: "लाइफबॉय / डेटॉल साबुन (Soaps Carton)", rate: 5600, paid: 0 },
      { id: "itm_8", name: "सर्फ एक्सेल पाउडर (Surf Excel)", rate: 6800, paid: 0 },
      { id: "itm_9", name: "कोलगेट टूथपेस्ट (Colgate Paste)", rate: 3400, paid: 0 },
      { id: "itm_10", name: "विम बार बर्तन साबुन (Vim Bar)", rate: 2200, paid: 0 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "30 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 16500,
        totalPaid: 16500,
        due: 0,
        status: "PAID",
        items: [
          { name: "लाइफबॉय साबुन पेटी", rate: 5500, paid: 5500 },
          { name: "सर्फ एक्सेल पेटी", rate: 7000, paid: 7000 },
          { name: "क्लोज-अप / कोलगेट", rate: 4000, paid: 4000 }
        ]
      },
      {
        weekLabel: "20 Oct - 26 Oct 2026",
        settledDate: "23 Oct 2026",
        paymentMode: "नकद (Cash)",
        totalBill: 14000,
        totalPaid: 10000,
        due: 4000,
        status: "PARTIAL",
        items: [
          { name: "रिन साबुन व पाउडर", rate: 8000, paid: 6000 },
          { name: "विम बार पेटी", rate: 6000, paid: 4000 }
        ]
      }
    ]
  },
  {
    id: "sup_4",
    name: "पारले & हल्दीराम एजेंसी (Snacks & Biscuits)",
    phone: "9840456789",
    settlementDay: "सोमवार (Monday)",
    items: [
      { id: "itm_11", name: "पारले-जी बिस्कुट पेटी (Parle-G Box)", rate: 4500, paid: 4500 },
      { id: "itm_12", name: "हल्दीराम भुजिया / नमकीन (Bhujia)", rate: 3800, paid: 2000 },
      { id: "itm_13", name: "मैगी नूडल्स पैकेट (Maggi Pack)", rate: 2400, paid: 2400 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "28 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 10200,
        totalPaid: 10200,
        due: 0,
        status: "PAID",
        items: [
          { name: "पारले-जी पेटी", rate: 4500, paid: 4500 },
          { name: "हल्दीराम नमकीन", rate: 3500, paid: 3500 },
          { name: "मैगी 70g पैकेट", rate: 2200, paid: 2200 }
        ]
      }
    ]
  },
  {
    id: "sup_5",
    name: "कोका-कोला बेवरेजेस (Coca-Cola Agency)",
    phone: "9850567890",
    settlementDay: "बुधवार (Wednesday)",
    items: [
      { id: "itm_14", name: "थम्स अप / स्प्राइट 2L (Thums Up 2L)", rate: 4200, paid: 4200 },
      { id: "itm_15", name: "माज़ा मैंगो ड्रिंक (Maaza)", rate: 2100, paid: 2100 },
      { id: "itm_16", name: "किनले पानी बोतल (Kinley 1L Water)", rate: 1200, paid: 1200 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "29 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 7500,
        totalPaid: 7500,
        due: 0,
        status: "PAID",
        items: [
          { name: "कोल्ड ड्रिंक पेट क्रेट", rate: 4200, paid: 4200 },
          { name: "माज़ा क्रेट", rate: 2100, paid: 2100 },
          { name: "किनले पानी", rate: 1200, paid: 1200 }
        ]
      }
    ]
  },
  {
    id: "sup_bhatla",
    name: "भाटला एजेंसी (Bhatla Agency)",
    phone: "9876543210",
    settlementDay: "शुक्रवार (Friday)",
    items: [
      { id: "itm_b1", name: "गोल्डी / एवरेस्ट मसाले पेटी (Spices Box)", rate: 6400, paid: 6400 },
      { id: "itm_b2", name: "फॉर्च्यून बेसन & मैदा (Besan & Maida)", rate: 4200, paid: 3000 },
      { id: "itm_b3", name: "कैडबरी चॉकलेट & टॉफी जार (Candies Jar)", rate: 2800, paid: 0 }
    ],
    history: [
      {
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "31 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 11800,
        totalPaid: 11800,
        due: 0,
        status: "PAID",
        items: [
          { name: "मसाले पेटी (Spices)", rate: 6000, paid: 6000 },
          { name: "बेसन कट्टा (Besan Bag)", rate: 3800, paid: 3800 },
          { name: "टॉफी जार (Candies)", rate: 2000, paid: 2000 }
        ]
      },
      {
        weekLabel: "20 Oct - 26 Oct 2026",
        settledDate: "24 Oct 2026",
        paymentMode: "नकद (Cash)",
        totalBill: 9600,
        totalPaid: 8000,
        due: 1600,
        status: "PARTIAL",
        items: [
          { name: "एवरेस्ट मसाले पेटी", rate: 5600, paid: 5000 },
          { name: "मैदा & सूजी बैग", rate: 4000, paid: 3000 }
        ]
      }
    ]
  }
];

// Quick suggestions for custom items
const QUICK_ITEM_SUGGESTIONS = [
  "देसी घी डिब्बा", "सरसों तेल", "फॉर्च्यून रिफाइंड", "चीनी बोरी", 
  "चना दाल", "टाटा नमक", "हल्दी पाउडर", "धनिया पाउडर", 
  "चाय पत्ती", "मैगी पैकेट", "डिटर्जेंट पाउडर", "नहाने का साबुन"
];

// BILINGUAL DICTIONARY
const DICTIONARY = {
  hi: {
    store_title: "श्री गणेश किराना स्टोर",
    store_subtitle: "साप्ताहिक सप्लायर भुगतान एवं रेट हिसाब (Weekly Supplier Ledger)",
    view_desktop: "कंप्यूटर व्यू",
    view_mobile: "मोबाइल ऐप व्यू",
    lang_btn: "English में देखें",
    print_btn: "पर्चा प्रिंट 🖨️",
    top_history_btn: "📜 पुराना हिसाब (History)",
    prev_week: "पिछला हफ्ता",
    next_week: "अगला हफ्ता",
    this_week_badge: "चालू हफ्ता",
    add_supplier: "+ नया सप्लायर जोड़ें",
    kpi_total: "इस हफ्ते का कुल सामान",
    kpi_sub_total: "सारे सप्लायर का कुल रेट",
    kpi_paid: "कुल चुका दिया (Paid)",
    kpi_sub_paid: "दुकान से दिए गए रुपये",
    kpi_due: "कुल देना बाकी (DUE)",
    kpi_sub_due: "सप्लायर को अभी देने हैं",
    kpi_status: "सप्लायर चुकता स्थिति",
    kpi_sub_status: "सप्लायर का हिसाब पूरा",
    search_placeholder: "सप्लायर का नाम या फोन नंबर से खोजें...",
    filter_all: "सभी (All)",
    filter_due: "🔴 बाकी वाले (Due)",
    filter_paid: "🟢 चुकता (Cleared)",
    th_supplier: "सप्लायर का नाम (Supplier)",
    th_items: "सामान (Items)",
    th_bill: "कुल बिल (Bill)",
    th_paid: "चुकाया (Paid)",
    th_due: "बकाया (Due)",
    th_status: "स्थिति (Status)",
    th_action: "हिसाब (Action)",
    status_paid: "🟢 चुकता (Paid)",
    status_partial: "🟡 बाकी (Partial)",
    status_unpaid: "🔴 पूरा बाकी (Unpaid)",
    btn_full_paid: "पूरा दिया",
    btn_zero_paid: "कुछ नहीं (0)",
    btn_add_item: "+ नया सामान जोड़ें (Add Item)",
    btn_save: "✓ हिसाब सुरक्षित करें (Save)",
    btn_whatsapp: "WhatsApp पर भेजें",
    btn_history: "इतिहास 📜",
    confirm_saved_toast: "का हिसाब सुरक्षित हुआ!",
    soundbox_announcement: "भुगतान दर्ज हुआ",
    hist_title: "सप्लायर का पुराना खाता इतिहास",
    hist_billed: "कुल खरीदारी (Billed)",
    hist_paid: "कुल चुकाया (Paid)",
    hist_due: "कुल बकाया (Balance)"
  },
  en: {
    store_title: "Shree Ganesh Kiryana Store",
    store_subtitle: "Weekly Supplier Ledger & Payment Settlement",
    view_desktop: "Desktop View",
    view_mobile: "Mobile App View",
    lang_btn: "हिंदी में देखें",
    print_btn: "Print Slip 🖨️",
    top_history_btn: "📜 Ledger History",
    prev_week: "Previous Week",
    next_week: "Next Week",
    this_week_badge: "Current Week",
    add_supplier: "+ Add New Supplier",
    kpi_total: "Total Weekly Goods",
    kpi_sub_total: "Sum of all supplier rates",
    kpi_paid: "Total Paid",
    kpi_sub_paid: "Amount settled by store",
    kpi_due: "Total Pending (DUE)",
    kpi_sub_due: "Remaining to be paid",
    kpi_status: "Supplier Cleared Ratio",
    kpi_sub_status: "Suppliers fully settled",
    search_placeholder: "Search supplier by name or phone...",
    filter_all: "All",
    filter_due: "🔴 Due",
    filter_paid: "🟢 Cleared",
    th_supplier: "Supplier Name",
    th_items: "Supplied Items",
    th_bill: "Total Bill",
    th_paid: "Paid",
    th_due: "Due Balance",
    th_status: "Status",
    th_action: "Action",
    status_paid: "🟢 Cleared",
    status_partial: "🟡 Partial Due",
    status_unpaid: "🔴 Unpaid",
    btn_full_paid: "Full Paid",
    btn_zero_paid: "Zero (0)",
    btn_add_item: "+ Add Custom Item",
    btn_save: "✓ Save Settlement",
    btn_whatsapp: "Send on WhatsApp",
    btn_history: "History 📜",
    confirm_saved_toast: "settlement saved!",
    soundbox_announcement: "Payment recorded successfully",
    hist_title: "Supplier Ledger History",
    hist_billed: "Total Billed",
    hist_paid: "Total Paid",
    hist_due: "Net Balance"
  }
};

// 2. APPLICATION STATE
let state = {
  currentLang: 'hi',
  viewMode: 'desktop', // 'desktop' or 'mobile'
  filter: 'ALL',       // 'ALL', 'DUE', 'PAID'
  searchQuery: '',
  weekOffset: 0,
  expandedSupplierId: "sup_1", // expanded by default
  activeSupplierForAddItem: null,
  activeSupplierForHistory: null,
  suppliers: []
};

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderView();
  initQuickItemChips();
  lucide.createIcons();
});

// LOAD / SAVE (POSTGRESQL + LOCALSTORAGE FALLBACK)
async function loadData() {
  // 1. Try to fetch from PostgreSQL backend
  try {
    const res = await fetch('/api/suppliers');
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        state.suppliers = json.data;
        persistData();
        renderView();
        console.log(`🐘 Loaded ${state.suppliers.length} suppliers from PostgreSQL (${json.source})`);
        return;
      }
    }
  } catch (err) {
    console.log('PostgreSQL API not reachable, falling back to local storage:', err);
  }

  // 2. Offline fallback to LocalStorage or DEFAULT_SUPPLIERS
  const saved = localStorage.getItem('kiryana_khata_suppliers_v2');
  if (saved) {
    try {
      state.suppliers = JSON.parse(saved);
      const hasBhatla = state.suppliers.some(s => s.name && (s.name.includes("भाटला") || s.name.includes("Bhatla")));
      if (!hasBhatla) {
        const bhatlaDefault = DEFAULT_SUPPLIERS.find(s => s.id === "sup_bhatla");
        if (bhatlaDefault) {
          state.suppliers.push(JSON.parse(JSON.stringify(bhatlaDefault)));
          persistData();
        }
      }
    } catch (e) {
      state.suppliers = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
    }
  } else {
    state.suppliers = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
    persistData();
  }
}

function persistData() {
  localStorage.setItem('kiryana_khata_suppliers_v2', JSON.stringify(state.suppliers));
}

// WEEK MANAGEMENT
function getWeekRange(offset) {
  const now = new Date();
  const currentDay = now.getDay();
  const diffToMonday = now.getDate() - (currentDay === 0 ? 6 : currentDay - 1) + (offset * 7);
  
  const monday = new Date(now.setDate(diffToMonday));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return {
    start: monday.toLocaleDateString('en-GB', options),
    end: sunday.toLocaleDateString('en-GB', options)
  };
}

function changeWeek(delta) {
  state.weekOffset += delta;
  renderView();
}

// LANGUAGE SWITCHER
function toggleLanguage() {
  state.currentLang = state.currentLang === 'hi' ? 'en' : 'hi';
  document.getElementById('lang-btn-text').textContent = DICTIONARY[state.currentLang].lang_btn;
  renderView();
}

// VIEW SWITCHER
function setViewMode(mode) {
  state.viewMode = mode;
  const desktopBtn = document.getElementById('btn-view-desktop');
  const mobileBtn = document.getElementById('btn-view-mobile');
  const desktopContainer = document.getElementById('desktop-view-container');
  const mobileContainer = document.getElementById('mobile-view-container');

  if (mode === 'desktop') {
    desktopBtn.className = "px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 bg-white text-rose-950 shadow-sm transition";
    mobileBtn.className = "px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 text-rose-100 hover:text-white transition";
    desktopContainer.classList.remove('hidden');
    mobileContainer.classList.add('hidden');
  } else {
    mobileBtn.className = "px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 bg-white text-rose-950 shadow-sm transition";
    desktopBtn.className = "px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 text-rose-100 hover:text-white transition";
    desktopContainer.classList.add('hidden');
    mobileContainer.classList.remove('hidden');
  }
  lucide.createIcons();
}

// FILTER
function setFilter(filterType) {
  state.filter = filterType;
  ['ALL', 'DUE', 'PAID'].forEach(f => {
    const btn = document.getElementById(`filter-btn-${f}`);
    if (f === filterType) {
      btn.className = "px-3.5 py-2 rounded-xl text-sm font-bold bg-gray-900 text-white shadow-sm transition";
    } else {
      btn.className = "px-3.5 py-2 rounded-xl text-sm font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition";
    }
  });
  renderView();
}

// SOUNDBOX CHIME
function playSoundboxChime(supplierName, amount) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.4);
    });

    if ('speechSynthesis' in window) {
      const t = DICTIONARY[state.currentLang];
      const utterance = new SpeechSynthesisUtterance(`${supplierName} ${t.soundbox_announcement}`);
      utterance.lang = state.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.log("Audio not allowed without gesture", e);
  }
}

// TOAST NOTIFICATION
function showToast(message) {
  const toast = document.getElementById('soundbox-toast');
  const msgEl = document.getElementById('toast-message');
  msgEl.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

// VOICE RECOGNITION
function startVoiceTyping(targetInputId) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert(state.currentLang === 'hi' 
      ? "आपके ब्राउज़र में माइक उपलब्ध नहीं है। कृपया टाइप करें।" 
      : "Speech recognition not supported in this browser. Please type.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = state.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const inputEl = document.getElementById(targetInputId);
  const oldPlaceholder = inputEl.placeholder;
  inputEl.placeholder = state.currentLang === 'hi' ? "🎙️ सुन रहे हैं... बोलिए..." : "🎙️ Listening... speak now...";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    inputEl.value = transcript;
    inputEl.placeholder = oldPlaceholder;
  };

  recognition.onerror = () => { inputEl.placeholder = oldPlaceholder; };
  recognition.onend = () => { inputEl.placeholder = oldPlaceholder; };
  recognition.start();
}

// SUPPLIER CALCULATIONS
function getSupplierTotals(supplier) {
  let bill = 0;
  let paid = 0;
  supplier.items.forEach(item => {
    bill += Number(item.rate) || 0;
    paid += Number(item.paid) || 0;
  });
  const due = Math.max(0, bill - paid);
  let status = 'PAID';
  if (bill > 0 && paid === 0) status = 'UNPAID';
  else if (due > 0) status = 'PARTIAL';
  return { bill, paid, due, status };
}

// MAIN RENDER FUNCTION
function renderView() {
  const t = DICTIONARY[state.currentLang];
  const query = (document.getElementById('search-input')?.value || '').toLowerCase();

  // 1. Update Static Labels
  document.getElementById('store-title').textContent = t.store_title;
  document.getElementById('store-subtitle').textContent = t.store_subtitle;
  document.getElementById('label-view-desktop').textContent = t.view_desktop;
  document.getElementById('label-view-mobile').textContent = t.view_mobile;
  document.getElementById('label-print-btn').textContent = t.print_btn;
  const topHistBtn = document.getElementById('label-top-history-btn');
  if (topHistBtn) topHistBtn.textContent = t.top_history_btn;

  document.getElementById('label-prev-week').textContent = t.prev_week;
  document.getElementById('label-next-week').textContent = t.next_week;
  document.getElementById('label-add-supplier-btn').textContent = t.add_supplier;
  document.getElementById('label-kpi-total').innerHTML = `<i data-lucide="receipt" class="w-4 h-4 text-blue-600"></i> ${t.kpi_total}`;
  document.getElementById('kpi-sub-total').textContent = t.kpi_sub_total;
  document.getElementById('label-kpi-paid').innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i> ${t.kpi_paid}`;
  document.getElementById('kpi-sub-paid').textContent = t.kpi_sub_paid;
  document.getElementById('label-kpi-due').innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 text-rose-600"></i> ${t.kpi_due}`;
  document.getElementById('kpi-sub-due').textContent = t.kpi_sub_due;
  document.getElementById('label-kpi-status').innerHTML = `<i data-lucide="users" class="w-4 h-4 text-amber-600"></i> ${t.kpi_status}`;
  document.getElementById('kpi-sub-status').textContent = t.kpi_sub_status;

  // 2. Week Range Display
  const weekRange = getWeekRange(state.weekOffset);
  const weekStr = `${weekRange.start} - ${weekRange.end}`;
  document.getElementById('current-week-display').textContent = `${state.currentLang === 'hi' ? 'हफ्ता' : 'Week'}: ${weekStr}`;
  document.getElementById('print-week-range').textContent = weekStr;
  
  const badge = document.getElementById('current-week-badge');
  if (state.weekOffset === 0) {
    badge.textContent = t.this_week_badge;
    badge.className = "ml-2 text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full";
  } else {
    badge.textContent = state.weekOffset > 0 ? `+${state.weekOffset} wk` : `${state.weekOffset} wk`;
    badge.className = "ml-2 text-xs bg-gray-500 text-white px-2 py-0.5 rounded-full";
  }

  // 3. Filter Suppliers
  const filtered = state.suppliers.filter(sup => {
    const matchesSearch = sup.name.toLowerCase().includes(query) || (sup.phone && sup.phone.includes(query));
    if (!matchesSearch) return false;

    const totals = getSupplierTotals(sup);
    if (state.filter === 'DUE') return totals.due > 0;
    if (state.filter === 'PAID') return totals.due === 0;
    return true;
  });

  // 4. Update Top KPIs
  let totalBillAll = 0;
  let totalPaidAll = 0;
  let totalDueAll = 0;
  let clearedCount = 0;

  state.suppliers.forEach(sup => {
    const { bill, paid, due, status } = getSupplierTotals(sup);
    totalBillAll += bill;
    totalPaidAll += paid;
    totalDueAll += due;
    if (status === 'PAID') clearedCount++;
  });

  document.getElementById('kpi-total-bill').textContent = `₹ ${totalBillAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-total-paid').textContent = `₹ ${totalPaidAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-total-due').textContent = `₹ ${totalDueAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-settlement-ratio').textContent = `${clearedCount} / ${state.suppliers.length} ${state.currentLang === 'hi' ? 'चुकता' : 'Cleared'}`;

  // 5. Render Views
  renderDesktopTable(filtered);
  renderMobileCards(filtered);

  lucide.createIcons();
}

// RENDER DESKTOP TABLE
function renderDesktopTable(suppliersList) {
  const t = DICTIONARY[state.currentLang];
  const tbody = document.getElementById('desktop-table-body');
  tbody.innerHTML = '';

  if (suppliersList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-gray-400 font-bold text-lg">
          कोई सप्लायर नहीं मिला (No suppliers found)
        </td>
      </tr>
    `;
    return;
  }

  suppliersList.forEach(sup => {
    const { bill, paid, due, status } = getSupplierTotals(sup);
    const isExpanded = state.expandedSupplierId === sup.id;

    let statusBadge = '';
    if (status === 'PAID') {
      statusBadge = `<span class="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-bold text-sm">🟢 ${t.status_paid}</span>`;
    } else if (status === 'PARTIAL') {
      statusBadge = `<span class="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full font-bold text-sm">🟡 ${t.status_partial}</span>`;
    } else {
      statusBadge = `<span class="px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 rounded-full font-bold text-sm">🔴 ${t.status_unpaid}</span>`;
    }

    const itemsPreview = sup.items.map(i => i.name.split('(')[0].trim()).slice(0, 3).join(', ') + (sup.items.length > 3 ? '...' : '');

    const tr = document.createElement('tr');
    tr.className = `hover:bg-rose-50/50 transition cursor-pointer ${isExpanded ? 'bg-amber-50/50 border-l-4 border-l-rose-700' : ''}`;
    tr.onclick = (e) => {
      if (['INPUT', 'BUTTON', 'A', 'I', 'SPAN'].includes(e.target.tagName)) return;
      toggleExpandSupplier(sup.id);
    };

    tr.innerHTML = `
      <td class="py-4 px-4 font-bold text-gray-900 text-lg">
        <div class="flex items-center gap-2">
          <span>${sup.name}</span>
        </div>
        <div class="text-xs text-gray-500 font-medium flex items-center gap-2 mt-0.5">
          <span>📞 ${sup.phone || 'No phone'}</span>
          <span>•</span>
          <span class="text-rose-700 font-semibold">${sup.settlementDay}</span>
        </div>
      </td>
      <td class="py-4 px-4 text-gray-600 text-sm max-w-[220px]">
        <div class="truncate font-medium">${itemsPreview || 'कोई सामान नहीं'}</div>
        <span class="text-xs font-bold text-rose-800 hover:underline inline-flex items-center gap-1 mt-1">
          ${isExpanded ? '▲ बंद करें (Close)' : '▼ सामान का रेट देखें (View Items)'}
        </span>
      </td>
      <td class="py-4 px-4 text-right font-black text-gray-900 text-lg">
        ₹ ${bill.toLocaleString('en-IN')}
      </td>
      <td class="py-4 px-4 text-right font-black text-emerald-700 text-lg">
        ₹ ${paid.toLocaleString('en-IN')}
      </td>
      <td class="py-4 px-4 text-right font-black text-rose-700 text-lg">
        ₹ ${due.toLocaleString('en-IN')}
      </td>
      <td class="py-4 px-4 text-center">
        ${statusBadge}
      </td>
      <td class="py-4 px-4 text-center no-print">
        <div class="flex items-center justify-center gap-1.5">
          <button onclick="shareWhatsApp('${sup.id}')" title="WhatsApp पर भेजें" class="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-700"></i>
          </button>
          <!-- History Button -->
          <button onclick="openSupplierHistory('${sup.id}')" title="पुराना खाता इतिहास" class="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1 transition">
            <i data-lucide="history" class="w-3.5 h-3.5 text-amber-800"></i>
            <span>${t.btn_history}</span>
          </button>
          <button onclick="toggleExpandSupplier('${sup.id}')" class="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-sm transition">
            ${isExpanded ? 'बंद करें' : 'हिसाब भरें ✏️'}
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    if (isExpanded) {
      const expandTr = document.createElement('tr');
      expandTr.className = "bg-amber-50/70 border-b-2 border-amber-300";
      expandTr.innerHTML = `
        <td colspan="7" class="p-5">
          <div class="bg-white rounded-2xl p-4 shadow-inner border border-amber-200 space-y-4">
            
            <div class="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
              <h4 class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span>📦 ${sup.name} — इस हफ्ते का सामान व रेट</span>
              </h4>
              <div class="flex items-center gap-2">
                <!-- Clear / Reset Weekly Entries -->
                <button onclick="clearWeeklyEntries('${sup.id}')" title="इस हफ्ते के रेट व दिया को 0 करें" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1 transition">
                  <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                  <span>इस हफ्ते का हिसाब खाली करें</span>
                </button>
                <button onclick="openAddItemModal('${sup.id}')" class="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-sm font-bold border border-rose-300 flex items-center gap-1.5">
                  <i data-lucide="plus-circle" class="w-4 h-4 text-rose-700"></i>
                  ${t.btn_add_item}
                </button>
                <!-- Delete Supplier Button -->
                <button onclick="deleteSupplier('${sup.id}')" title="इस सप्लायर को पूरी तरह हटाएं" class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1 transition">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5 text-rose-700"></i>
                  <span>सप्लायर हटाएं</span>
                </button>
              </div>
            </div>

            <!-- Items Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-xs uppercase text-gray-500 font-bold border-b">
                    <th class="pb-2">सामान का नाम (Item)</th>
                    <th class="pb-2 w-44">रेट / बिल (Rate ₹)</th>
                    <th class="pb-2 w-48">दिया (Paid ₹)</th>
                    <th class="pb-2 text-right">बाकी (Balance)</th>
                    <th class="pb-2 text-center w-20">हटाएं</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  ${sup.items.map((item, idx) => {
                    const itemDue = Math.max(0, (item.rate || 0) - (item.paid || 0));
                    return `
                      <tr class="hover:bg-gray-50">
                        <td class="py-2.5 font-bold text-gray-800 text-base">
                          ${item.name}
                        </td>
                        <td class="py-2.5">
                          <div class="relative">
                            <span class="absolute left-3 top-2.5 text-gray-400 font-bold">₹</span>
                            <input 
                              type="number" 
                              value="${item.rate || ''}" 
                              placeholder="0" 
                              oninput="updateItemRate('${sup.id}', '${item.id}', this.value)"
                              class="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-xl font-black text-gray-900 text-base focus:border-rose-600 focus:outline-none"
                            >
                          </div>
                        </td>
                        <td class="py-2.5">
                          <div class="space-y-1">
                            <div class="relative">
                              <span class="absolute left-3 top-2.5 text-gray-400 font-bold">₹</span>
                              <input 
                                type="number" 
                                value="${item.paid || ''}" 
                                placeholder="0" 
                                oninput="updateItemPaid('${sup.id}', '${item.id}', this.value)"
                                class="w-full pl-8 pr-3 py-2 border-2 border-emerald-400 bg-emerald-50/30 rounded-xl font-black text-emerald-800 text-base focus:border-emerald-600 focus:outline-none"
                              >
                            </div>
                            <div class="flex gap-1 text-[11px]">
                              <button onclick="setFullPaid('${sup.id}', '${item.id}')" class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded hover:bg-emerald-200">
                                ✓ ${t.btn_full_paid}
                              </button>
                              <button onclick="setZeroPaid('${sup.id}', '${item.id}')" class="px-2 py-0.5 bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-200">
                                0
                              </button>
                            </div>
                          </div>
                        </td>
                        <td class="py-2.5 text-right font-black ${itemDue > 0 ? 'text-rose-700' : 'text-emerald-700'} text-base">
                          ₹ ${itemDue.toLocaleString('en-IN')}
                        </td>
                        <td class="py-2.5 text-center">
                          <button onclick="deleteItem('${sup.id}', '${item.id}')" class="p-1.5 text-gray-400 hover:text-rose-600 transition" title="हटाएं">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Save and Action Bar -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t bg-gray-50/80 -mx-4 -mb-4 p-4 rounded-b-2xl">
              <div class="flex items-center gap-4 text-base font-bold">
                <span>कुल बिल: <strong class="text-gray-900">₹ ${bill.toLocaleString('en-IN')}</strong></span>
                <span>•</span>
                <span>कुल दिया: <strong class="text-emerald-700">₹ ${paid.toLocaleString('en-IN')}</strong></span>
                <span>•</span>
                <span>बाकी: <strong class="text-rose-700 font-black">₹ ${due.toLocaleString('en-IN')}</strong></span>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="openSupplierHistory('${sup.id}')" class="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm transition">
                  <i data-lucide="history" class="w-4 h-4 text-amber-800"></i>
                  <span>पुराना खाता देखें</span>
                </button>
                <button onclick="shareWhatsApp('${sup.id}')" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 shadow transition">
                  <i data-lucide="message-circle" class="w-4 h-4"></i>
                  ${t.btn_whatsapp}
                </button>
                <button onclick="saveAndPlaySound('${sup.id}')" class="px-6 py-2 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-base font-black shadow-md flex items-center gap-2 transition">
                  <i data-lucide="check" class="w-5 h-5"></i>
                  ${t.btn_save}
                </button>
              </div>
            </div>

          </div>
        </td>
      `;
      tbody.appendChild(expandTr);
    }
  });
}

// RENDER MOBILE CARDS VIEW
function renderMobileCards(suppliersList) {
  const t = DICTIONARY[state.currentLang];
  const container = document.getElementById('mobile-cards-body');
  container.innerHTML = '';

  suppliersList.forEach(sup => {
    const { bill, paid, due, status } = getSupplierTotals(sup);
    const isExpanded = state.expandedSupplierId === sup.id;

    const card = document.createElement('div');
    card.className = `p-4 rounded-2xl border-2 transition ${isExpanded ? 'bg-amber-50/60 border-rose-600 shadow-md' : 'bg-white border-gray-200'}`;
    
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div onclick="toggleExpandSupplier('${sup.id}')" class="cursor-pointer">
          <h4 class="font-extrabold text-gray-900 text-base leading-tight">${sup.name}</h4>
          <p class="text-xs text-gray-500 font-semibold mt-0.5">📞 ${sup.phone} • <span class="text-rose-700">${sup.settlementDay}</span></p>
        </div>
        <span class="text-xs font-black px-2.5 py-1 rounded-full ${status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : status === 'PARTIAL' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
          ${status === 'PAID' ? 'चुकता' : `₹ ${due} बाकी`}
        </span>
      </div>

      <!-- Quick figures -->
      <div class="grid grid-cols-3 gap-2 mt-3 pt-2 border-t text-center">
        <div>
          <p class="text-[11px] text-gray-500 font-bold">बिल</p>
          <p class="text-sm font-black text-gray-900">₹ ${bill}</p>
        </div>
        <div>
          <p class="text-[11px] text-gray-500 font-bold">दिया</p>
          <p class="text-sm font-black text-emerald-700">₹ ${paid}</p>
        </div>
        <div>
          <p class="text-[11px] text-gray-500 font-bold">बाकी</p>
          <p class="text-sm font-black text-rose-700">₹ ${due}</p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="mt-3 pt-2 border-t flex items-center justify-between gap-2">
        <button onclick="openSupplierHistory('${sup.id}')" class="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1 transition">
          <i data-lucide="history" class="w-3.5 h-3.5 text-amber-800"></i>
          <span>📜 पुराना हिसाब</span>
        </button>
        <div class="flex items-center gap-1.5">
          <button onclick="deleteSupplier('${sup.id}')" title="सप्लायर हटाएं" class="p-2 bg-gray-100 hover:bg-rose-100 text-gray-500 hover:text-rose-700 rounded-xl transition">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
          <button onclick="toggleExpandSupplier('${sup.id}')" class="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition">
            <span>${isExpanded ? '▲ बंद करें' : '▼ इस हफ्ते का रेट भरें'}</span>
          </button>
        </div>
      </div>

      ${isExpanded ? `
        <!-- Mobile Expand Items -->
        <div class="mt-4 pt-3 border-t space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-gray-700 uppercase">सामान व रेट भरें:</span>
            <div class="flex items-center gap-1.5">
              <button onclick="clearWeeklyEntries('${sup.id}')" class="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg">
                ↺ खाली करें
              </button>
              <button onclick="openAddItemModal('${sup.id}')" class="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                + सामान जोड़ें
              </button>
            </div>
          </div>

          <div class="space-y-2.5">
            ${sup.items.map(item => `
              <div class="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-gray-900">${item.name}</span>
                  <button onclick="deleteItem('${sup.id}', '${item.id}')" class="text-gray-400 hover:text-rose-600 text-xs font-bold">
                    हटाएं
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="text-[10px] font-bold text-gray-500">रेट (Rate ₹):</label>
                    <input 
                      type="number" 
                      value="${item.rate || ''}" 
                      placeholder="0" 
                      oninput="updateItemRate('${sup.id}', '${item.id}', this.value)"
                      class="w-full px-2 py-2 border-2 border-gray-300 rounded-lg font-black text-base focus:border-rose-600 focus:outline-none"
                    >
                  </div>
                  <div>
                    <label class="text-[10px] font-bold text-gray-500">दिया (Paid ₹):</label>
                    <input 
                      type="number" 
                      value="${item.paid || ''}" 
                      placeholder="0" 
                      oninput="updateItemPaid('${sup.id}', '${item.id}', this.value)"
                      class="w-full px-2 py-2 border-2 border-emerald-400 bg-emerald-50/30 rounded-lg font-black text-base focus:border-emerald-600 focus:outline-none text-emerald-800"
                    >
                  </div>
                </div>
                <div class="flex justify-end gap-1">
                  <button onclick="setFullPaid('${sup.id}', '${item.id}')" class="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                    ✓ पूरा दिया
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Action Buttons in Mobile -->
          <div class="pt-2 flex flex-col gap-2">
            <button onclick="saveAndPlaySound('${sup.id}')" class="w-full py-3 bg-rose-900 text-white rounded-xl font-black text-base shadow flex items-center justify-center gap-2">
              <i data-lucide="check" class="w-5 h-5"></i>
              ✓ हिसाब सेव करें (Save)
            </button>
            <button onclick="shareWhatsApp('${sup.id}')" class="w-full py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              WhatsApp पर पर्चा भेजें
            </button>
          </div>
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });
}

// TOGGLE ROW EXPAND
function toggleExpandSupplier(id) {
  state.expandedSupplierId = state.expandedSupplierId === id ? null : id;
  renderView();
}

// UPDATE ITEM VALUES
function updateItemRate(supplierId, itemId, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const item = sup.items.find(i => i.id === itemId);
  if (!item) return;

  item.rate = Number(val) || 0;
  persistData();
  refreshRowCalculations();
}

function updateItemPaid(supplierId, itemId, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const item = sup.items.find(i => i.id === itemId);
  if (!item) return;

  item.paid = Number(val) || 0;
  persistData();
  refreshRowCalculations();
}

function setFullPaid(supplierId, itemId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const item = sup.items.find(i => i.id === itemId);
  if (!item) return;

  item.paid = item.rate || 0;
  persistData();
  renderView();
}

function setZeroPaid(supplierId, itemId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const item = sup.items.find(i => i.id === itemId);
  if (!item) return;

  item.paid = 0;
  persistData();
  renderView();
}

function deleteItem(supplierId, itemId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const itm = sup.items.find(i => i.id === itemId);
  const itmName = itm ? itm.name : '';
  const confirmMsg = state.currentLang === 'hi' 
    ? `क्या आप '${itmName}' को हटाना चाहते हैं?` 
    : `Delete item '${itmName}'?`;

  if (confirm(confirmMsg)) {
    sup.items = sup.items.filter(i => i.id !== itemId);
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "सामान हटा दिया गया" : "Item deleted");

    // PostgreSQL sync
    fetch(`/api/items/${itemId}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// DELETE ENTIRE SUPPLIER (पूरा सप्लायर खाता हटाएं)
function deleteSupplier(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const confirmMsg = state.currentLang === 'hi'
    ? `⚠️ क्या आप सच में '${sup.name}' का पूरा खाता और सप्लायर हटाना चाहते हैं?`
    : `⚠️ Are you sure you want to completely delete supplier '${sup.name}'?`;

  if (confirm(confirmMsg)) {
    state.suppliers = state.suppliers.filter(s => s.id !== supplierId);
    if (state.expandedSupplierId === supplierId) {
      state.expandedSupplierId = null;
    }
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "सप्लायर का खाता हटा दिया गया" : "Supplier deleted");

    // PostgreSQL sync
    fetch(`/api/suppliers/${supplierId}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// CLEAR ALL WEEKLY ENTRIES (इस हफ्ते का हिसाब 0 करें)
function clearWeeklyEntries(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const confirmMsg = state.currentLang === 'hi'
    ? `क्या आप इस हफ्ते की सारी एंट्री (रेट व पेमेंट) खाली (0) करना चाहते हैं?`
    : `Reset all rates and payments for this week to 0?`;

  if (confirm(confirmMsg)) {
    sup.items.forEach(it => {
      it.rate = 0;
      it.paid = 0;
    });
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "इस हफ्ते का हिसाब खाली कर दिया गया" : "Weekly entries reset to 0");

    // PostgreSQL sync
    fetch(`/api/suppliers/${supplierId}/clear-week`, { method: 'POST' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// DELETE A SPECIFIC HISTORY ARCHIVE WEEK (पुराना रिकॉर्ड हटाएं)
function deleteHistoryEntry(supplierId, weekLabel) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup || !sup.history) return;

  const confirmMsg = state.currentLang === 'hi'
    ? `क्या आप ${weekLabel} का पुराना रिकॉर्ड हटाना चाहते हैं?`
    : `Delete record for ${weekLabel}?`;

  if (confirm(confirmMsg)) {
    const toDelete = sup.history.find(h => h.weekLabel === weekLabel);
    sup.history = sup.history.filter(h => h.weekLabel !== weekLabel);
    persistData();
    openSupplierHistory(supplierId);
    showToast(state.currentLang === 'hi' ? "पुराना रिकॉर्ड हटाया गया" : "History record deleted");

    // PostgreSQL sync
    if (toDelete && toDelete.id) {
      fetch(`/api/history/${toDelete.id}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
    }
  }
}

function refreshRowCalculations() {
  let totalBillAll = 0;
  let totalPaidAll = 0;
  let totalDueAll = 0;
  let clearedCount = 0;

  state.suppliers.forEach(sup => {
    const { bill, paid, due, status } = getSupplierTotals(sup);
    totalBillAll += bill;
    totalPaidAll += paid;
    totalDueAll += due;
    if (status === 'PAID') clearedCount++;
  });

  document.getElementById('kpi-total-bill').textContent = `₹ ${totalBillAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-total-paid').textContent = `₹ ${totalPaidAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-total-due').textContent = `₹ ${totalDueAll.toLocaleString('en-IN')}`;
  document.getElementById('kpi-settlement-ratio').textContent = `${clearedCount} / ${state.suppliers.length} ${state.currentLang === 'hi' ? 'चुकता' : 'Cleared'}`;
}

// SAVE & PLAY SOUNDBOX CHIME
function saveAndPlaySound(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  // Auto-record to history archive
  const weekRange = getWeekRange(state.weekOffset);
  const weekLabel = `${weekRange.start} - ${weekRange.end}`;
  const totals = getSupplierTotals(sup);

  if (!sup.history) sup.history = [];
  
  // Update or insert current week history
  const existingIdx = sup.history.findIndex(h => h.weekLabel === weekLabel);
  const historyEntry = {
    id: `hist_${supplierId}_${Date.now()}`,
    weekLabel,
    settledDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    paymentMode: totals.due === 0 ? "PhonePe / UPI" : "नकद (Cash)",
    totalBill: totals.bill,
    totalPaid: totals.paid,
    due: totals.due,
    status: totals.status,
    items: sup.items.map(it => ({ name: it.name, rate: it.rate || 0, paid: it.paid || 0 }))
  };

  if (existingIdx >= 0) {
    sup.history[existingIdx] = historyEntry;
  } else {
    sup.history.unshift(historyEntry);
  }

  persistData();
  playSoundboxChime(sup.name.split('(')[0].trim(), totals.paid);
  
  const t = DICTIONARY[state.currentLang];
  showToast(`${sup.name.split('(')[0].trim()} ${t.confirm_saved_toast} (₹${totals.paid} Paid)`);
  renderView();

  // PostgreSQL sync
  fetch('/api/settlements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      supplierId,
      weekLabel,
      settledDate: historyEntry.settledDate,
      paymentMode: historyEntry.paymentMode,
      totalBill: totals.bill,
      totalPaid: totals.paid,
      due: totals.due,
      status: totals.status,
      items: sup.items
    })
  }).catch(err => console.log('Offline/sync error:', err));
}

// =========================================================================
// SUPPLIER HISTORY (खाता इतिहास)
// =========================================================================

function openSupplierHistory(supplierId) {
  state.activeSupplierForHistory = supplierId;
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const t = DICTIONARY[state.currentLang];
  document.getElementById('history-supplier-name').textContent = sup.name;
  document.getElementById('history-supplier-phone').textContent = `📞 ${sup.phone || 'No phone'} | हिसाब: ${sup.settlementDay}`;
  document.getElementById('history-supplier-day').textContent = sup.settlementDay;
  document.getElementById('label-hist-billed').textContent = t.hist_billed;
  document.getElementById('label-hist-paid').textContent = t.hist_paid;
  document.getElementById('label-hist-due').textContent = t.hist_due;

  // Calculate Lifetime totals
  let lifetimeBilled = 0;
  let lifetimePaid = 0;

  // Include past weeks
  const historyList = sup.history || [];
  historyList.forEach(h => {
    lifetimeBilled += Number(h.totalBill) || 0;
    lifetimePaid += Number(h.totalPaid) || 0;
  });

  const lifetimeDue = Math.max(0, lifetimeBilled - lifetimePaid);

  document.getElementById('history-total-billed').textContent = `₹ ${lifetimeBilled.toLocaleString('en-IN')}`;
  document.getElementById('history-total-paid').textContent = `₹ ${lifetimePaid.toLocaleString('en-IN')}`;
  document.getElementById('history-total-due').textContent = `₹ ${lifetimeDue.toLocaleString('en-IN')}`;

  // Render past weeks timeline
  const container = document.getElementById('history-timeline-container');
  container.innerHTML = '';

  if (historyList.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-gray-400 font-bold">
        अभी तक कोई पिछला हिसाब दर्ज नहीं हुआ है (No past records yet)
      </div>
    `;
  } else {
    historyList.forEach((rec, idx) => {
      const isPaid = rec.due === 0;
      const card = document.createElement('div');
      card.className = "bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2 hover:bg-amber-50/30 transition";

      card.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
          <div class="flex items-center gap-2">
            <span class="text-sm font-black text-gray-900">📅 हफ्ता: ${rec.weekLabel}</span>
            <span class="text-xs bg-gray-200 text-gray-800 font-bold px-2 py-0.5 rounded">
              भुगतान: ${rec.paymentMode || 'नकद'}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-black px-2.5 py-1 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${isPaid ? '🟢 पूरा चुकता (Paid)' : `🔴 ₹${rec.due} बकाया (Due)`}
            </span>
            <button onclick="deleteHistoryEntry('${supplierId}', '${rec.weekLabel}')" title="यह रिकॉर्ड हटाएं" class="text-gray-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center text-sm font-bold bg-white p-2 rounded-xl border border-gray-100">
          <div>
            <span class="text-xs text-gray-500 block">बिल (Bill)</span>
            <strong class="text-gray-900">₹ ${rec.totalBill.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span class="text-xs text-gray-500 block">दिया (Paid)</span>
            <strong class="text-emerald-700">₹ ${rec.totalPaid.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span class="text-xs text-gray-500 block">बाकी (Due)</span>
            <strong class="text-rose-700">₹ ${rec.due.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <!-- Items breakdown in this past week -->
        <div class="text-xs text-gray-600 font-medium space-y-0.5 pt-1">
          <p class="font-bold text-gray-700">खरीदे गए सामान:</p>
          <ul class="list-disc list-inside space-y-0.5 text-gray-600">
            ${(rec.items || []).map(it => `
              <li>${it.name}: <strong>₹${it.rate}</strong> (दिया: ₹${it.paid})</li>
            `).join('')}
          </ul>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Setup WhatsApp statement button
  document.getElementById('btn-history-whatsapp').onclick = () => {
    shareFullHistoryWhatsApp(supplierId);
  };

  document.getElementById('modal-supplier-history').classList.remove('hidden');
  lucide.createIcons();
}

function closeSupplierHistoryModal() {
  document.getElementById('modal-supplier-history').classList.add('hidden');
  state.activeSupplierForHistory = null;
}

function openHistoryOverviewModal() {
  // If user clicks top bar "पुराना हिसाब", open history for first supplier or active one
  const targetId = state.activeSupplierForHistory || (state.suppliers[0] ? state.suppliers[0].id : null);
  if (targetId) {
    openSupplierHistory(targetId);
  }
}

// WHATSAPP FULL HISTORY STATEMENT
function shareFullHistoryWhatsApp(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const historyList = sup.history || [];
  let lifetimeBilled = 0;
  let lifetimePaid = 0;
  historyList.forEach(h => {
    lifetimeBilled += Number(h.totalBill) || 0;
    lifetimePaid += Number(h.totalPaid) || 0;
  });
  const lifetimeDue = Math.max(0, lifetimeBilled - lifetimePaid);

  let msg = `*श्री गणेश किराना स्टोर (खाता विवरण)*\n`;
  msg += `👤 *सप्लायर:* ${sup.name}\n`;
  msg += `📞 *फोन:* ${sup.phone}\n`;
  msg += `===============================\n`;
  msg += `*कुल खरीदारी:* ₹${lifetimeBilled}\n`;
  msg += `*कुल भुगतान:* ₹${lifetimePaid}\n`;
  msg += `👉 *कुल बकाया (NET DUE):* ₹${lifetimeDue}\n`;
  msg += `===============================\n`;
  msg += `*हफ्ते दर हफ्ते रिकॉर्ड (Past Weeks):*\n`;

  historyList.slice(0, 4).forEach((rec, idx) => {
    msg += `\n📅 *${rec.weekLabel}*\n`;
    msg += `• बिल: ₹${rec.totalBill} | दिया: ₹${rec.totalPaid} | बाकी: ₹${rec.due} (${rec.paymentMode || 'नकद'})\n`;
  });

  msg += `\nकृपया खाता चेक कर लें। धन्यवाद!`;

  const phone = sup.phone ? sup.phone.replace(/[^0-9]/g, '') : '';
  const url = `https://wa.me/${phone ? '91' + phone : ''}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// WHATSAPP SHARE GENERATOR (Current Week)
function shareWhatsApp(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const week = getWeekRange(state.weekOffset);
  const totals = getSupplierTotals(sup);

  let msg = `*श्री गणेश किराना स्टोर (Shree Ganesh Kiryana)*\n`;
  msg += `📅 *हफ्ते का हिसाब:* ${week.start} से ${week.end}\n`;
  msg += `👤 *सप्लायर:* ${sup.name}\n`;
  msg += `--------------------------------\n`;
  
  sup.items.forEach(it => {
    msg += `• ${it.name}: ₹${it.rate || 0} (दिया: ₹${it.paid || 0})\n`;
  });
  
  msg += `--------------------------------\n`;
  msg += `*कुल बिल:* ₹${totals.bill}\n`;
  msg += `*चुकाया:* ₹${totals.paid}\n`;
  msg += `👉 *बाकी बकाया (DUE):* ₹${totals.due}\n`;
  msg += `--------------------------------\n`;
  msg += `कृपया हिसाब चेक कर लें। धन्यवाद!`;

  const phone = sup.phone ? sup.phone.replace(/[^0-9]/g, '') : '';
  const url = `https://wa.me/${phone ? '91' + phone : ''}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// MODAL: ADD SUPPLIER
function openAddSupplierModal() {
  document.getElementById('modal-add-supplier').classList.remove('hidden');
}
function closeAddSupplierModal() {
  document.getElementById('modal-add-supplier').classList.add('hidden');
}

function saveNewSupplier() {
  const name = document.getElementById('new-supplier-name').value.trim();
  const phone = document.getElementById('new-supplier-phone').value.trim();
  const day = document.getElementById('new-supplier-day').value;
  const itemsStr = document.getElementById('new-supplier-items').value.trim();

  if (!name) {
    alert(state.currentLang === 'hi' ? "कृपया सप्लायर का नाम भरें" : "Please enter supplier name");
    return;
  }

  const items = itemsStr 
    ? itemsStr.split(',').map((it, idx) => ({ id: `itm_${Date.now()}_${idx}`, name: it.trim(), rate: 0, paid: 0 }))
    : [{ id: `itm_${Date.now()}_0`, name: "किराना सामान (General Grocery)", rate: 0, paid: 0 }];

  const newSup = {
    id: `sup_${Date.now()}`,
    name,
    phone,
    settlementDay: day,
    items,
    history: []
  };

  state.suppliers.push(newSup);
  persistData();
  closeAddSupplierModal();
  state.expandedSupplierId = newSup.id;
  renderView();

  // PostgreSQL sync
  fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSup)
  }).catch(err => console.log('Offline/sync error:', err));

  document.getElementById('new-supplier-name').value = '';
  document.getElementById('new-supplier-phone').value = '';
  document.getElementById('new-supplier-items').value = '';
}

// MODAL: ADD CUSTOM ITEM
function openAddItemModal(supplierId) {
  state.activeSupplierForAddItem = supplierId;
  const sup = state.suppliers.find(s => s.id === supplierId);
  document.getElementById('modal-add-item-title').textContent = `${sup ? sup.name.split('(')[0] : ''} में सामान जोड़ें`;
  document.getElementById('new-item-input').value = '';
  document.getElementById('modal-add-item').classList.remove('hidden');
}

function closeAddItemModal() {
  document.getElementById('modal-add-item').classList.add('hidden');
  state.activeSupplierForAddItem = null;
}

function initQuickItemChips() {
  const container = document.getElementById('item-quick-chips');
  container.innerHTML = '';
  QUICK_ITEM_SUGGESTIONS.forEach(sug => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = "px-2.5 py-1 bg-gray-100 hover:bg-rose-100 hover:text-rose-900 rounded-lg text-xs font-bold text-gray-700 transition border border-gray-200";
    chip.textContent = `+ ${sug}`;
    chip.onclick = () => {
      document.getElementById('new-item-input').value = sug;
    };
    container.appendChild(chip);
  });
}

function confirmAddItem() {
  const val = document.getElementById('new-item-input').value.trim();
  if (!val) {
    alert(state.currentLang === 'hi' ? "कृपया सामान का नाम लिखें" : "Please enter item name");
    return;
  }

  const sup = state.suppliers.find(s => s.id === state.activeSupplierForAddItem);
  if (!sup) return;

  const itmObj = {
    id: `itm_${Date.now()}`,
    name: val,
    rate: 0,
    paid: 0
  };

  sup.items.push(itmObj);

  persistData();
  closeAddItemModal();
  renderView();

  // PostgreSQL sync
  fetch(`/api/suppliers/${sup.id}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: val })
  }).catch(err => console.log('Offline/sync error:', err));
}
