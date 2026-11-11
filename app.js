/**
 * Kiryana Store Supplier Ledger (किराना बही खाता)
 * Designed for older shopkeepers:
 * - Invoice No & Date
 * - Description of Goods, Quantity, Rate W/O GST, Rate GST %, Total Amount
 * - Weekly lump-sum payment for the total bill (not per-item)
 * - PostgreSQL backend + LocalStorage offline sync
 * - Voice typing, Soundbox chime 🔔, WhatsApp slip, Print A4
 */

// 1. DEFAULT SEED DATA (With Invoice No, Date, Qty, Rate Wo GST, GST%, and Weekly Lump-sum Paid)
const DEFAULT_SUPPLIERS = [
  {
    id: "sup_bhatla",
    name: "भाटला एजेंसी (Bhatla Agency)",
    phone: "9876543210",
    settlementDay: "शुक्रवार (Friday)",
    invoiceNo: "INV-8841",
    invoiceDate: "2026-11-10",
    paymentDate: "2026-11-11",
    paidAmount: 9000,
    paymentMode: "PhonePe / UPI",
    items: [
      {
        id: "itm_b1",
        description: "गोल्डी गरम मसाला 100g पेटी (Goldiee Spices)",
        quantity: "10 पेटी",
        rateWoGst: 500,
        gstPercent: 5,
        totalAmount: 5250
      },
      {
        id: "itm_b2",
        description: "फॉर्च्यून बेसन 30kg बोरी (Fortune Besan)",
        quantity: "2 बोरी",
        rateWoGst: 1800,
        gstPercent: 5,
        totalAmount: 3780
      },
      {
        id: "itm_b3",
        description: "कैडबरी टॉफी जार (Cadbury Candies)",
        quantity: "4 जार",
        rateWoGst: 600,
        gstPercent: 18,
        totalAmount: 2832
      }
    ],
    history: [
      {
        id: "hist_b_1",
        invoiceNo: "INV-8210",
        invoiceDate: "2026-11-03",
        paymentDate: "2026-10-31",
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "31 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 11800,
        totalPaid: 11800,
        due: 0,
        status: "PAID",
        items: [
          { description: "मसाले पेटी (Spices)", quantity: "10 पेटी", rateWoGst: 570, gstPercent: 5, totalAmount: 6000 },
          { description: "बेसन कट्टा (Besan)", quantity: "2 बोरी", rateWoGst: 1800, gstPercent: 5, totalAmount: 3800 },
          { description: "टॉफी जार (Candies)", quantity: "4 जार", rateWoGst: 423, gstPercent: 18, totalAmount: 2000 }
        ]
      }
    ]
  },
  {
    id: "sup_1",
    name: "श्री राम ऑयल & घी ट्रेडर्स (Shree Ram Oil & Ghee)",
    phone: "9810123456",
    settlementDay: "मंगलवार (Tuesday)",
    invoiceNo: "SR-4092",
    invoiceDate: "2026-11-09",
    paymentDate: "2026-11-10",
    paidAmount: 15000,
    paymentMode: "PhonePe / UPI",
    items: [
      {
        id: "itm_1",
        description: "देसी घी 1L डिब्बा (Desi Ghee 1L x 12)",
        quantity: "2 कार्टन",
        rateWoGst: 5000,
        gstPercent: 12,
        totalAmount: 11200
      },
      {
        id: "itm_2",
        description: "सरसों तेल 15L पीपा (Mustard Oil)",
        quantity: "3 पीपा",
        rateWoGst: 2100,
        gstPercent: 5,
        totalAmount: 6615
      }
    ],
    history: [
      {
        id: "hist_1_1",
        invoiceNo: "SR-3920",
        invoiceDate: "2026-11-02",
        paymentDate: "2026-11-02",
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "02 Nov 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 15800,
        totalPaid: 15800,
        due: 0,
        status: "PAID",
        items: [
          { description: "देसी घी 1L डिब्बा", quantity: "2 कार्टन", rateWoGst: 4500, gstPercent: 12, totalAmount: 10080 },
          { description: "सरसों तेल पीपा", quantity: "2 पीपा", rateWoGst: 2723, gstPercent: 5, totalAmount: 5720 }
        ]
      }
    ]
  },
  {
    id: "sup_2",
    name: "महालक्ष्मी आटा चक्की & दाल (Mahalaxmi Atta & Dal)",
    phone: "9820234567",
    settlementDay: "शनिवार (Saturday)",
    invoiceNo: "ML-1102",
    invoiceDate: "2026-11-08",
    paymentDate: "2026-11-09",
    paidAmount: 20000,
    paymentMode: "चेक (Cheque)",
    items: [
      {
        id: "itm_4",
        description: "चक्की आटा 50kg बोरी (Wheat Flour)",
        quantity: "3 बोरी",
        rateWoGst: 1600,
        gstPercent: 0,
        totalAmount: 4800
      },
      {
        id: "itm_5",
        description: "अरहर / तूर दाल 30kg बोरी (Toor Dal)",
        quantity: "2 बोरी",
        rateWoGst: 4200,
        gstPercent: 0,
        totalAmount: 8400
      },
      {
        id: "itm_6",
        description: "बासमती चावल 25kg कट्टा (Basmati Rice)",
        quantity: "3 कट्टा",
        rateWoGst: 2400,
        gstPercent: 5,
        totalAmount: 7560
      }
    ],
    history: [
      {
        id: "hist_2_1",
        invoiceNo: "ML-1044",
        invoiceDate: "2026-11-01",
        paymentDate: "2026-11-01",
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "01 Nov 2026",
        paymentMode: "चेक (Cheque)",
        totalBill: 28000,
        totalPaid: 28000,
        due: 0,
        status: "PAID",
        items: [
          { description: "चक्की आटा बोरी", quantity: "5 बोरी", rateWoGst: 1600, gstPercent: 0, totalAmount: 8000 },
          { description: "अरहर दाल बोरी", quantity: "3 बोरी", rateWoGst: 4000, gstPercent: 0, totalAmount: 12000 },
          { description: "बासमती चावल", quantity: "3 कट्टा", rateWoGst: 2540, gstPercent: 5, totalAmount: 8000 }
        ]
      }
    ]
  },
  {
    id: "sup_1794330750456",
    name: "एस ई ट्रेडिंग कं (S E TRADING CO - Ekansh)",
    phone: "8218612919",
    settlementDay: "शनिवार (Saturday)",
    invoiceNo: "896",
    invoiceDate: "2026-10-30",
    paymentDate: "2026-11-02",
    freight: 225,
    paidAmount: 20000,
    paymentMode: "PhonePe / UPI",
    items: [
      {
        id: "itm_se_1",
        description: "Mustard Oil 15 Kg Tin First",
        hsnCode: "15149120",
        quantity: "5 TIN",
        rateWoGst: 2761.90,
        gstPercent: 5,
        rateWithGst: 2900,
        totalAmount: 14500
      },
      {
        id: "itm_se_2",
        description: "Refind Soya Oil 15 Kg Tin First",
        hsnCode: "15079010",
        quantity: "5 TIN",
        rateWoGst: 2361.90,
        gstPercent: 5,
        rateWithGst: 2480,
        totalAmount: 12400
      },
      {
        id: "itm_se_3",
        description: "Stay Fit Soya Ref 1 Litre Pouch(1*12pics)",
        hsnCode: "15079010",
        quantity: "60 PCS (5 Box)",
        rateWoGst: 142.86,
        gstPercent: 5,
        rateWithGst: 150,
        totalAmount: 9000
      }
    ],
    history: [
      {
        id: "hist_se_1",
        invoiceNo: "896",
        invoiceDate: "2026-10-30",
        paymentDate: "2026-11-02",
        freight: 225,
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "02 Nov 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 36125,
        totalPaid: 20000,
        due: 16125,
        status: "PARTIAL",
        items: [
          { description: "Mustard Oil 15 Kg Tin First", quantity: "5 TIN", rateWoGst: 2761.90, gstPercent: 5, rateWithGst: 2900, totalAmount: 14500 },
          { description: "Refind Soya Oil 15 Kg Tin First", quantity: "5 TIN", rateWoGst: 2361.90, gstPercent: 5, rateWithGst: 2480, totalAmount: 12400 },
          { description: "Stay Fit Soya Ref 1L Pouch", quantity: "60 PCS", rateWoGst: 142.86, gstPercent: 5, rateWithGst: 150, totalAmount: 9000 }
        ]
      }
    ]
  }
];

// Quick suggestions for custom items
const QUICK_ITEM_SUGGESTIONS = [
  "गोल्डी गरम मसाला", "फॉर्च्यून बेसन", "देसी घी डिब्बा", "सरसों तेल पीपा", 
  "रिफाइंड तेल 5L", "चक्की आटा 50kg", "अरहर दाल", "बासमती चावल", 
  "चीनी बोरी", "टाटा नमक", "कैडबरी टॉफी", "सर्फ एक्सेल पेटी"
];

// BILINGUAL DICTIONARY
const DICTIONARY = {
  hi: {
    store_title: "श्री गणेश किराना स्टोर",
    store_subtitle: "साप्ताहिक सप्लायर भुगतान एवं इनवॉइस हिसाब (Weekly Supplier Ledger)",
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
    kpi_sub_total: "सारे सप्लायर का कुल इनवॉइस",
    kpi_paid: "कुल चुकाया (Paid)",
    kpi_sub_paid: "दुकान से दिए गए रुपये",
    kpi_due: "कुल देना बाकी (DUE)",
    kpi_sub_due: "सप्लायर को अभी देने हैं",
    kpi_status: "सप्लायर चुकता स्थिति",
    kpi_sub_status: "सप्लायर का हिसाब पूरा",
    search_placeholder: "सप्लायर का नाम, फोन या इनवॉइस नं से खोजें...",
    filter_all: "सभी (All)",
    filter_due: "🔴 बाकी वाले (Due)",
    filter_paid: "🟢 चुकता (Cleared)",
    th_supplier: "सप्लायर व इनवॉइस (Supplier & Bill)",
    th_items: "सामान विवरण (Goods Description)",
    th_bill: "कुल बिल (Bill)",
    th_paid: "चुकाया (Paid)",
    th_paid_date: "भुगतान तारीख (Payment Date)",
    label_payment_date: "भुगतान की तारीख (Date of Payment)",
    th_due: "बकाया (Due)",
    th_status: "स्थिति (Status)",
    th_action: "हिसाब (Action)",
    status_paid: "🟢 चुकता (Paid)",
    status_partial: "🟡 बाकी (Partial)",
    status_unpaid: "🔴 पूरा बाकी (Unpaid)",
    btn_full_paid: "पूरा भुगतान",
    btn_half_paid: "आधा (50%)",
    btn_zero_paid: "0 दिया",
    btn_add_item: "+ नया सामान जोड़ें (Add Item)",
    btn_new_bill: "+ नया बिल दर्ज करें (New Bill)",
    btn_save: "✓ बिल व पेमेंट सेव करें (Save)",
    btn_whatsapp: "WhatsApp पर बिल भेजें",
    btn_history: "इतिहास 📜",
    confirm_saved_toast: "का बिल व भुगतान सुरक्षित हुआ!",
    soundbox_announcement: "भुगतान दर्ज हुआ"
  },
  en: {
    store_title: "Shree Ganesh Kiryana Store",
    store_subtitle: "Weekly Supplier Ledger & Invoice Settlement",
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
    kpi_sub_total: "Sum of all invoices",
    kpi_paid: "Total Paid",
    kpi_sub_paid: "Amount settled by store",
    kpi_due: "Total Pending (DUE)",
    kpi_sub_due: "Remaining to be paid",
    kpi_status: "Supplier Cleared Ratio",
    kpi_sub_status: "Suppliers fully settled",
    search_placeholder: "Search by supplier name, phone or invoice no...",
    filter_all: "All",
    filter_due: "🔴 Due",
    filter_paid: "🟢 Cleared",
    th_supplier: "Supplier & Invoice",
    th_items: "Description of Goods",
    th_bill: "Total Bill",
    th_paid: "Paid",
    th_paid_date: "Payment Date",
    label_payment_date: "Date of Payment",
    th_due: "Due Balance",
    th_status: "Status",
    th_action: "Action",
    status_paid: "🟢 Cleared",
    status_partial: "🟡 Partial Due",
    status_unpaid: "🔴 Unpaid",
    btn_full_paid: "Full Paid",
    btn_half_paid: "50% Paid",
    btn_zero_paid: "Zero (0)",
    btn_add_item: "+ Add Item",
    btn_new_bill: "+ Add New Bill",
    btn_save: "✓ Save Bill & Payment",
    btn_whatsapp: "Send on WhatsApp",
    btn_history: "History 📜",
    confirm_saved_toast: "bill & payment saved!",
    soundbox_announcement: "Payment recorded successfully"
  }
};

// 2. APPLICATION STATE
let state = {
  currentLang: 'hi',
  viewMode: 'desktop', // 'desktop' or 'mobile'
  filter: 'ALL',       // 'ALL', 'DUE', 'PAID'
  searchQuery: '',
  weekOffset: 0,
  expandedSupplierId: "sup_1794330750456", // expanded on Ekansh Traders (S E Trading Co) by default
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

// RECOVER & MERGE ANY USER-ADDED TRADERS FROM PREVIOUS STORAGE VERSIONS
function recoverAndMergeCustomSuppliers(currentList) {
  const merged = Array.isArray(currentList) ? [...currentList] : [];
  const oldKeys = ['kiryana_khata_suppliers', 'kiryana_khata_suppliers_v2', 'kiryana_khata_suppliers_v3'];

  oldKeys.forEach(k => {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(oldSup => {
            if (oldSup && oldSup.name) {
              const alreadyExists = merged.some(s => 
                (s.id && oldSup.id && s.id === oldSup.id) || 
                (s.name && oldSup.name && s.name.trim().toLowerCase() === oldSup.name.trim().toLowerCase())
              );

              if (!alreadyExists) {
                console.log(`🔄 Recovering user-added trader: ${oldSup.name}`);
                const recoveredItems = (oldSup.items || []).map((it, idx) => ({
                  id: it.id || `itm_${Date.now()}_${idx}`,
                  description: it.description || it.name || 'किराना सामान',
                  hsnCode: it.hsnCode || '',
                  quantity: it.quantity || '1',
                  rateWoGst: it.rateWoGst || it.rate || 0,
                  gstPercent: it.gstPercent !== undefined ? it.gstPercent : 5,
                  rateWithGst: it.rateWithGst || 0,
                  totalAmount: it.totalAmount || it.rate || 0
                }));

                const recoveredTrader = {
                  id: oldSup.id || `sup_${Date.now()}`,
                  name: oldSup.name,
                  phone: oldSup.phone || '',
                  settlementDay: oldSup.settlementDay || 'शनिवार (Saturday)',
                  invoiceNo: oldSup.invoiceNo || 'INV-' + Math.floor(1000 + Math.random() * 9000),
                  invoiceDate: oldSup.invoiceDate || new Date().toISOString().split('T')[0],
                  paymentDate: oldSup.paymentDate || (oldSup.paidAmount > 0 ? (oldSup.invoiceDate || new Date().toISOString().split('T')[0]) : ''),
                  freight: oldSup.freight || 0,
                  paidAmount: oldSup.paidAmount || 0,
                  paymentMode: oldSup.paymentMode || 'PhonePe / UPI',
                  items: recoveredItems,
                  history: oldSup.history || []
                };

                merged.push(recoveredTrader);

                // Sync recovered trader to server so disk file also remembers it permanently
                fetch('/api/suppliers', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(recoveredTrader)
                }).catch(() => {});
              }
            }
          });
        }
      }
    } catch (e) {
      console.warn('Storage read error for key:', k, e);
    }
  });

  return merged;
}

// LOAD / SAVE (POSTGRESQL + DISK + LOCALSTORAGE FALLBACK & MIGRATION)
async function loadData() {
  let loadedList = [];

  // 1. Fetch from server (PostgreSQL or persistent disk file)
  try {
    const res = await fetch('/api/suppliers');
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        loadedList = json.data;
      }
    }
  } catch (err) {
    console.log('Server not reachable, checking local storage:', err);
  }

  // 2. If server was empty, check browser local storage
  if (loadedList.length === 0) {
    const saved = localStorage.getItem('kiryana_khata_suppliers_v3') || 
                  localStorage.getItem('kiryana_khata_suppliers_v2') || 
                  localStorage.getItem('kiryana_khata_suppliers');
    if (saved) {
      try {
        loadedList = JSON.parse(saved);
      } catch (e) {
        loadedList = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
      }
    } else {
      loadedList = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
    }
  }

  // 3. Auto-recover and merge any custom traders added by user in any previous session
  state.suppliers = recoverAndMergeCustomSuppliers(loadedList);
  persistData();
  renderView();
}

function persistData() {
  localStorage.setItem('kiryana_khata_suppliers_v3', JSON.stringify(state.suppliers));
  localStorage.setItem('kiryana_khata_suppliers_v2', JSON.stringify(state.suppliers));
  localStorage.setItem('kiryana_khata_suppliers', JSON.stringify(state.suppliers));
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
    console.log("Audio play error:", e);
  }
}

// TOAST
function showToast(message) {
  const toast = document.getElementById('soundbox-toast');
  const msgEl = document.getElementById('toast-message');
  msgEl.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => { toast.classList.add('hidden'); }, 3500);
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
    inputEl.value = event.results[0][0].transcript;
    inputEl.placeholder = oldPlaceholder;
    if (targetInputId === 'new-item-desc') calcNewItemTotal();
  };

  recognition.onerror = () => { inputEl.placeholder = oldPlaceholder; };
  recognition.onend = () => { inputEl.placeholder = oldPlaceholder; };
  recognition.start();
}

// PARSE QUANTITY NUMBER HELPER (e.g. "10 पेटी" -> 10, "5 kg" -> 5)
function parseQuantityNum(qtyStr) {
  if (!qtyStr) return 1;
  const match = String(qtyStr).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 1;
}

// TOTAL CALCULATION PER SUPPLIER (ITEMS TOTAL + FREIGHT = GRAND TOTAL)
function getSupplierTotals(supplier) {
  let itemsTotal = 0;
  (supplier.items || []).forEach(item => {
    itemsTotal += Number(item.totalAmount) || 0;
  });
  const freight = Number(supplier.freight) || 0;
  const bill = itemsTotal + freight;
  const paid = Number(supplier.paidAmount) || 0;
  const due = Math.max(0, bill - paid);

  let status = 'PAID';
  if (bill > 0 && paid === 0) status = 'UNPAID';
  else if (due > 0) status = 'PARTIAL';

  return { itemsTotal, freight, bill, paid, due, status };
}

// MAIN RENDER
function renderView() {
  const t = DICTIONARY[state.currentLang];
  const query = (document.getElementById('search-input')?.value || '').toLowerCase();

  // 1. Static Labels
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
    const matchesSearch = 
      sup.name.toLowerCase().includes(query) || 
      (sup.phone && sup.phone.includes(query)) ||
      (sup.invoiceNo && sup.invoiceNo.toLowerCase().includes(query));
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

  // 5. Render Desktop and Mobile views
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
          कोई सप्लायर या इनवॉइस नहीं मिला (No suppliers found)
        </td>
      </tr>
    `;
    return;
  }

  suppliersList.forEach(sup => {
    const totals = getSupplierTotals(sup);
    const { itemsTotal, freight, bill, paid, due, status } = totals;
    const isExpanded = state.expandedSupplierId === sup.id;

    let statusBadge = '';
    if (status === 'PAID') {
      statusBadge = `<span class="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-bold text-sm">🟢 ${t.status_paid}</span>`;
    } else if (status === 'PARTIAL') {
      statusBadge = `<span class="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-full font-bold text-sm">🟡 ${t.status_partial}</span>`;
    } else {
      statusBadge = `<span class="px-3 py-1 bg-rose-100 text-rose-800 border border-rose-300 rounded-full font-bold text-sm">🔴 ${t.status_unpaid}</span>`;
    }

    const itemsPreview = (sup.items || []).map(i => i.description.split('(')[0].trim()).slice(0, 3).join(', ') + ((sup.items || []).length > 3 ? '...' : '');

    const tr = document.createElement('tr');
    tr.className = `hover:bg-rose-50/50 transition cursor-pointer ${isExpanded ? 'bg-amber-50/50 border-l-4 border-l-rose-700' : ''}`;
    tr.onclick = (e) => {
      // Don't trigger if user clicked inside other action buttons or inputs
      if (e.target.closest('button, input, select, textarea, a')) return;
      toggleExpandSupplier(sup.id);
    };

    tr.innerHTML = `
      <td class="py-4 px-4 font-bold text-gray-900 text-base">
        <div class="flex items-center gap-2">
          <span class="text-lg hover:text-rose-900 transition" onclick="toggleExpandSupplier('${sup.id}')">${sup.name}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-1 text-xs">
          <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold">📄 ${sup.invoiceNo || 'No Inv #'}</span>
          <span class="text-gray-500 font-semibold">📅 ${sup.invoiceDate || 'No date'}</span>
          <span class="text-gray-400">•</span>
          <span class="text-gray-600 font-semibold">📞 ${sup.phone}</span>
        </div>
      </td>
      <td class="py-4 px-4 text-gray-700 text-sm max-w-[220px]">
        <div class="truncate font-semibold">${itemsPreview || 'कोई सामान नहीं'}</div>
        <button type="button" onclick="toggleExpandSupplier('${sup.id}')" class="text-xs font-black text-rose-800 hover:text-rose-950 underline inline-flex items-center gap-1 mt-1 cursor-pointer">
          ${isExpanded ? '▲ बंद करें (Hide Items)' : '▼ बिल व सामान खोलें (View Bill)'}
        </button>
      </td>
      <td class="py-4 px-4 text-right font-black text-gray-900 text-lg">
        ₹ ${bill.toLocaleString('en-IN')}
      </td>
      <td class="py-4 px-4 text-right font-black text-emerald-700 text-lg">
        <div>₹ ${paid.toLocaleString('en-IN')}</div>
        ${paid > 0 && sup.paymentDate ? `
          <div class="text-[11px] font-bold text-emerald-800 flex items-center justify-end gap-1 mt-0.5">
            <i data-lucide="calendar-check-2" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>${sup.paymentDate}</span>
          </div>
        ` : (paid === 0 ? `<div class="text-[11px] text-gray-400 font-normal">भुगतान बाकी</div>` : '')}
      </td>
      <td class="py-4 px-4 text-right font-black text-rose-700 text-lg">
        ₹ ${due.toLocaleString('en-IN')}
      </td>
      <td class="py-4 px-4 text-center">
        ${statusBadge}
      </td>
      <td class="py-4 px-4 text-center no-print">
        <div class="flex items-center justify-center gap-1.5">
          <button onclick="shareWhatsApp('${sup.id}')" title="WhatsApp पर बिल भेजें" class="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl transition">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-700"></i>
          </button>
          <button onclick="openSupplierHistory('${sup.id}')" title="पुराना खाता इतिहास" class="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1 transition">
            <i data-lucide="history" class="w-3.5 h-3.5 text-amber-800"></i>
            <span>${t.btn_history}</span>
          </button>
          <button onclick="openAddBillModal('${sup.id}')" title="इस सप्लायर का नया बिल दर्ज करें" class="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1 transition">
            <i data-lucide="file-plus" class="w-3.5 h-3.5"></i>
            <span>+ नया बिल</span>
          </button>
          <button onclick="toggleExpandSupplier('${sup.id}')" class="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-sm transition">
            ${isExpanded ? 'बंद करें' : 'बिल खोलें ✏️'}
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    // EXPANDED INVOICE & SETTLEMENT TABLE
    if (isExpanded) {
      const expandTr = document.createElement('tr');
      expandTr.className = "bg-amber-50/70 border-b-2 border-amber-300";
      expandTr.innerHTML = `
        <td colspan="7" class="p-5">
          <div class="bg-white rounded-2xl p-5 shadow-inner border border-amber-200 space-y-4">
            
            <!-- INVOICE HEADER BAR -->
            <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl">
              <div class="flex flex-wrap items-center gap-4">
                <div>
                  <label class="block text-[11px] font-bold text-rose-800 uppercase">इनवॉइस / बिल नं (Invoice No):</label>
                  <input 
                    type="text" 
                    value="${sup.invoiceNo || ''}" 
                    placeholder="उदा. INV-8841"
                    oninput="updateSupplierInvoice('${sup.id}', 'invoiceNo', this.value)"
                    class="px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-sm font-black text-rose-950 focus:outline-none focus:border-rose-600 w-36"
                  >
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-rose-800 uppercase">बिल की तारीख (Invoice Date):</label>
                  <input 
                    type="date" 
                    value="${sup.invoiceDate || ''}" 
                    oninput="updateSupplierInvoice('${sup.id}', 'invoiceDate', this.value)"
                    class="px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-sm font-bold text-rose-950 focus:outline-none focus:border-rose-600"
                  >
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-rose-800 uppercase">साप्ताहिक दिन (Day):</label>
                  <span class="text-sm font-black text-gray-800">${sup.settlementDay}</span>
                </div>
              </div>

              <!-- Action buttons in header -->
              <div class="flex items-center gap-2">
                <button onclick="openAddBillModal('${sup.id}')" title="नया इनवॉइस दर्ज करें व पुराना इतिहास में सेव करें" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition">
                  <i data-lucide="file-plus" class="w-4 h-4"></i>
                  <span>+ नया बिल दर्ज करें (New Bill)</span>
                </button>
                <button onclick="clearWeeklyEntries('${sup.id}')" title="इस हफ्ते के रेट व भुगतान 0 करें" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1 transition">
                  <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                  <span>हिसाब खाली करें</span>
                </button>
                <button onclick="openAddItemModal('${sup.id}')" class="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold border border-rose-300 flex items-center gap-1.5">
                  <i data-lucide="plus-circle" class="w-4 h-4 text-rose-700"></i>
                  ${t.btn_add_item}
                </button>
                <button onclick="deleteSupplier('${sup.id}')" title="सप्लायर हटाएं" class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1 transition">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5 text-rose-700"></i>
                  <span>सप्लायर हटाएं</span>
                </button>
              </div>
            </div>

            <!-- ITEMIZED TABLE WITH QUANTITY, RATE WO GST, GST%, RATE WITH GST, TOTAL AMOUNT -->
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="text-xs uppercase text-gray-600 font-extrabold border-b bg-gray-50/80">
                    <th class="py-2.5 px-3">सामान का विवरण (Description of Goods)</th>
                    <th class="py-2.5 px-2 w-24">HSN कोड</th>
                    <th class="py-2.5 px-2 w-28">मात्रा (Qty)</th>
                    <th class="py-2.5 px-2 w-28">रेट बिना GST</th>
                    <th class="py-2.5 px-2 w-24">GST %</th>
                    <th class="py-2.5 px-2 w-28">रेट GST सहित</th>
                    <th class="py-2.5 px-3 w-32 text-right">रकम (Amount ₹)</th>
                    <th class="py-2.5 px-2 text-center w-12">हटाएं</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm font-semibold">
                  ${(sup.items || []).map(item => `
                    <tr class="hover:bg-gray-50/80">
                      <td class="py-2.5 px-3">
                        <input 
                          type="text" 
                          value="${item.description}" 
                          oninput="updateItemField('${sup.id}', '${item.id}', 'description', this.value)"
                          class="w-full px-2 py-1.5 border border-gray-300 rounded-lg font-bold text-gray-900 focus:outline-none focus:border-rose-600 text-base"
                        >
                      </td>
                      <td class="py-2.5 px-2">
                        <input 
                          type="text" 
                          value="${item.hsnCode || ''}" 
                          placeholder="उदा. 1507"
                          oninput="updateItemField('${sup.id}', '${item.id}', 'hsnCode', this.value)"
                          class="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono text-gray-700 focus:outline-none focus:border-rose-600"
                        >
                      </td>
                      <td class="py-2.5 px-2">
                        <input 
                          type="text" 
                          value="${item.quantity || '1'}" 
                          placeholder="5 TIN / 60"
                          oninput="updateItemField('${sup.id}', '${item.id}', 'quantity', this.value)"
                          class="w-full px-2 py-1.5 border border-gray-300 rounded-lg font-bold text-gray-800 focus:outline-none focus:border-rose-600 text-sm"
                        >
                      </td>
                      <td class="py-2.5 px-2">
                        <div class="relative">
                          <span class="absolute left-1.5 top-1.5 text-gray-400 font-bold text-xs">₹</span>
                          <input 
                            type="number" 
                            step="any"
                            value="${item.rateWoGst || ''}" 
                            placeholder="0"
                            oninput="updateItemField('${sup.id}', '${item.id}', 'rateWoGst', this.value)"
                            class="w-full pl-5 pr-1 py-1.5 border border-gray-300 rounded-lg font-black text-gray-900 focus:outline-none focus:border-rose-600 text-sm"
                          >
                        </div>
                      </td>
                      <td class="py-2.5 px-2">
                        <select 
                          onchange="updateItemField('${sup.id}', '${item.id}', 'gstPercent', this.value)"
                          class="w-full px-1 py-1.5 border border-gray-300 rounded-lg font-bold bg-white focus:outline-none focus:border-rose-600 text-xs"
                        >
                          <option value="0" ${item.gstPercent == 0 ? 'selected' : ''}>0%</option>
                          <option value="5" ${item.gstPercent == 5 ? 'selected' : ''}>5%</option>
                          <option value="12" ${item.gstPercent == 12 ? 'selected' : ''}>12%</option>
                          <option value="18" ${item.gstPercent == 18 ? 'selected' : ''}>18%</option>
                          <option value="28" ${item.gstPercent == 28 ? 'selected' : ''}>28%</option>
                        </select>
                      </td>
                      <td class="py-2.5 px-2">
                        <div class="relative">
                          <span class="absolute left-1.5 top-1.5 text-emerald-600 font-bold text-xs">₹</span>
                          <input 
                            type="number" 
                            step="any"
                            value="${item.rateWithGst || (item.rateWoGst ? Math.round(item.rateWoGst * (1 + (item.gstPercent || 0)/100) * 100)/100 : '')}" 
                            placeholder="0"
                            oninput="updateItemField('${sup.id}', '${item.id}', 'rateWithGst', this.value)"
                            class="w-full pl-5 pr-1 py-1.5 border border-emerald-300 bg-emerald-50/30 rounded-lg font-black text-emerald-900 focus:outline-none focus:border-emerald-600 text-sm"
                          >
                        </div>
                      </td>
                      <td class="py-2.5 px-3 text-right">
                        <div class="relative">
                          <span class="absolute left-2 top-1.5 text-gray-400 font-bold text-xs">₹</span>
                          <input 
                            type="number" 
                            value="${item.totalAmount || ''}" 
                            placeholder="0"
                            oninput="updateItemField('${sup.id}', '${item.id}', 'totalAmount', this.value, true)"
                            class="w-full pl-5 pr-2 py-1.5 border border-rose-300 bg-rose-50/30 rounded-lg font-black text-rose-950 text-right focus:outline-none focus:border-rose-600 text-base"
                          >
                        </div>
                      </td>
                      <td class="py-2.5 px-2 text-center">
                        <button onclick="deleteItem('${sup.id}', '${item.id}')" class="p-1.5 text-gray-400 hover:text-rose-600 transition" title="सामान हटाएं">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- WEEKLY LUMP-SUM PAYMENT BOX (BILLED TOTAL & WEEKLY PAID INPUT) -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-4">
                
                <!-- Subtotal and Freight Breakdown -->
                <div class="flex flex-wrap items-center gap-4">
                  <div>
                    <span class="text-xs font-bold text-gray-600 uppercase block">सामान कुल (Subtotal):</span>
                    <span class="text-lg font-black text-gray-800">₹ ${(totals.itemsTotal || 0).toLocaleString('en-IN')}</span>
                  </div>

                  <!-- Freight / Carriage Input -->
                  <div>
                    <label class="block text-xs font-bold text-amber-900 uppercase">
                      🚚 भाड़ा / ढुलाई (Freight):
                    </label>
                    <div class="relative mt-1">
                      <span class="absolute left-2.5 top-1.5 text-amber-700 font-bold">₹</span>
                      <input 
                        type="number" 
                        value="${sup.freight || ''}" 
                        placeholder="0"
                        oninput="updateSupplierFreight('${sup.id}', this.value)"
                        class="pl-6 pr-2 py-1.5 bg-white border border-amber-400 rounded-lg font-black text-amber-950 text-base w-28 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                      >
                    </div>
                  </div>

                  <div>
                    <span class="text-xs font-bold text-gray-700 uppercase block">कुल इनवॉइस बिल (Grand Total):</span>
                    <span class="text-2xl font-black text-gray-900">₹ ${bill.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <!-- Lump-Sum Weekly Paid Input -->
                <div class="flex items-center gap-3">
                  <div>
                    <label class="block text-xs font-bold text-emerald-900 uppercase">
                      👉 इस हफ्ते कितना चुकाया (Weekly Amount Paid):
                    </label>
                    <div class="relative mt-1">
                      <span class="absolute left-3 top-2 text-emerald-700 font-black text-lg">₹</span>
                      <input 
                        type="number" 
                        value="${sup.paidAmount || ''}" 
                        placeholder="0"
                        oninput="updateSupplierLumpSumPaid('${sup.id}', this.value)"
                        class="pl-8 pr-3 py-2 bg-white border-2 border-emerald-500 rounded-xl font-black text-emerald-800 text-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 w-44 shadow-sm"
                      >
                    </div>
                  </div>

                  <!-- Quick Shortcuts -->
                  <div class="flex flex-col gap-1 pt-4 text-xs font-bold">
                    <div class="flex gap-1">
                      <button onclick="setFullPaidLumpSum('${sup.id}')" class="px-2.5 py-1 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition shadow-sm">
                        ✓ पूरा दिया
                      </button>
                      <button onclick="setHalfPaidLumpSum('${sup.id}')" class="px-2.5 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-sm">
                        50%
                      </button>
                      <button onclick="setZeroPaidLumpSum('${sup.id}')" class="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                        0
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Payment Date Input -->
                <div>
                  <label class="block text-xs font-bold text-emerald-900 uppercase">
                    📅 भुगतान तारीख (Payment Date):
                  </label>
                  <div class="relative mt-1">
                    <input 
                      type="date" 
                      value="${sup.paymentDate || ''}" 
                      onchange="updateSupplierPaymentDate('${sup.id}', this.value)"
                      class="px-3 py-2 bg-white border-2 border-emerald-500 rounded-xl font-bold text-emerald-950 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                    >
                  </div>
                </div>

                <!-- Payment Mode Radio -->
                <div>
                  <span class="text-xs font-bold text-gray-600 uppercase block mb-1">माध्यम (Mode):</span>
                  <div class="flex items-center gap-2 text-xs font-bold bg-white p-1.5 rounded-xl border border-gray-200">
                    <label class="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="mode_${sup.id}" value="PhonePe / UPI" ${sup.paymentMode === 'PhonePe / UPI' ? 'checked' : ''} onchange="updateSupplierPaymentMode('${sup.id}', this.value)">
                      <span>UPI</span>
                    </label>
                    <label class="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="mode_${sup.id}" value="नकद (Cash)" ${sup.paymentMode === 'नकद (Cash)' ? 'checked' : ''} onchange="updateSupplierPaymentMode('${sup.id}', this.value)">
                      <span>नकद</span>
                    </label>
                    <label class="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="mode_${sup.id}" value="चेक (Cheque)" ${sup.paymentMode === 'चेक (Cheque)' ? 'checked' : ''} onchange="updateSupplierPaymentMode('${sup.id}', this.value)">
                      <span>चेक</span>
                    </label>
                  </div>
                </div>

                <!-- Remaining Due Display -->
                <div class="text-right">
                  <span class="text-xs font-bold text-rose-700 uppercase block">बाकी बकाया (Balance Due):</span>
                  <span class="text-2xl font-black text-rose-700">₹ ${due.toLocaleString('en-IN')}</span>
                </div>

              </div>

              <!-- Bottom Action Bar inside Settlement Box -->
              <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200">
                <span class="text-xs font-bold text-gray-500">
                  💡 हफ्ते का कुल बिल जोड़कर एकमुश्त (Lump-sum) भुगतान दर्ज करें
                </span>
                <div class="flex items-center gap-2">
                  <button onclick="shareWhatsApp('${sup.id}')" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 shadow transition">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    ${t.btn_whatsapp}
                  </button>
                  <button onclick="saveAndPlaySound('${sup.id}')" class="px-6 py-2.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-base font-black shadow-md flex items-center gap-2 transition">
                    <i data-lucide="check" class="w-5 h-5"></i>
                    ${t.btn_save}
                  </button>
                </div>
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
    const totals = getSupplierTotals(sup);
    const { itemsTotal, freight, bill, paid, due, status } = totals;
    const isExpanded = state.expandedSupplierId === sup.id;

    const card = document.createElement('div');
    card.className = `p-4 rounded-2xl border-2 transition ${isExpanded ? 'bg-amber-50/60 border-rose-600 shadow-md' : 'bg-white border-gray-200'}`;
    
    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div onclick="toggleExpandSupplier('${sup.id}')" class="cursor-pointer">
          <h4 class="font-extrabold text-gray-900 text-base leading-tight">${sup.name}</h4>
          <p class="text-xs text-gray-500 font-semibold mt-0.5">
            <span class="text-rose-900 font-bold bg-rose-50 px-1.5 py-0.5 rounded">${sup.invoiceNo || 'No Inv'}</span> • 
            <span>${sup.invoiceDate || 'No date'}</span> • 
            <span class="text-rose-700">${sup.settlementDay}</span>
          </p>
        </div>
        <span class="text-xs font-black px-2.5 py-1 rounded-full ${status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : status === 'PARTIAL' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
          ${status === 'PAID' ? 'चुकता' : `₹ ${due} बाकी`}
        </span>
      </div>

      <!-- Quick figures -->
      <div class="grid grid-cols-3 gap-2 mt-3 pt-2 border-t text-center">
        <div>
          <p class="text-[11px] text-gray-500 font-bold">बिल रकम</p>
          <p class="text-sm font-black text-gray-900">₹ ${bill}</p>
        </div>
        <div>
          <p class="text-[11px] text-gray-500 font-bold">चुकाया (Paid)</p>
          <p class="text-sm font-black text-emerald-700">₹ ${paid}</p>
          ${paid > 0 && sup.paymentDate ? `<p class="text-[10px] text-emerald-800 font-bold mt-0.5">📅 ${sup.paymentDate}</p>` : ''}
        </div>
        <div>
          <p class="text-[11px] text-gray-500 font-bold">बाकी (Due)</p>
          <p class="text-sm font-black text-rose-700">₹ ${due}</p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="mt-3 pt-2 border-t flex flex-wrap items-center justify-between gap-2">
        <button onclick="openSupplierHistory('${sup.id}')" class="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1 transition">
          <i data-lucide="history" class="w-3.5 h-3.5 text-amber-800"></i>
          <span>📜 हिसाब</span>
        </button>
        <button onclick="openAddBillModal('${sup.id}')" class="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition">
          <i data-lucide="file-plus" class="w-3.5 h-3.5"></i>
          <span>+ नया बिल</span>
        </button>
        <div class="flex items-center gap-1.5">
          <button onclick="deleteSupplier('${sup.id}')" title="सप्लायर हटाएं" class="p-2 bg-gray-100 hover:bg-rose-100 text-gray-500 hover:text-rose-700 rounded-xl transition">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
          <button onclick="toggleExpandSupplier('${sup.id}')" class="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition">
            <span>${isExpanded ? '▲ बंद करें' : '▼ बिल खोलें'}</span>
          </button>
        </div>
      </div>

      ${isExpanded ? `
        <!-- Mobile Expand Sheet -->
        <div class="mt-4 pt-3 border-t space-y-3">
          
          <!-- Invoice inputs in mobile -->
          <div class="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-xl border border-gray-200">
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase">इनवॉइस नं:</label>
              <input 
                type="text" 
                value="${sup.invoiceNo || ''}"
                placeholder="INV-8841"
                oninput="updateSupplierInvoice('${sup.id}', 'invoiceNo', this.value)"
                class="w-full px-2 py-1 border rounded text-xs font-bold"
              >
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase">तारीख:</label>
              <input 
                type="date" 
                value="${sup.invoiceDate || ''}"
                oninput="updateSupplierInvoice('${sup.id}', 'invoiceDate', this.value)"
                class="w-full px-2 py-1 border rounded text-xs font-bold"
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-gray-700 uppercase">सामान की लिस्ट:</span>
            <div class="flex items-center gap-1.5">
              <button onclick="openAddBillModal('${sup.id}')" class="text-xs font-bold text-white bg-emerald-700 px-2 py-1 rounded-lg">
                + नया बिल
              </button>
              <button onclick="clearWeeklyEntries('${sup.id}')" class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                ↺ खाली
              </button>
              <button onclick="openAddItemModal('${sup.id}')" class="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                + सामान
              </button>
            </div>
          </div>

          <!-- Items list in mobile -->
          <div class="space-y-2.5">
            ${(sup.items || []).map(item => `
              <div class="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-1.5 text-xs font-semibold">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-gray-900">${item.description}</span>
                  <button onclick="deleteItem('${sup.id}', '${item.id}')" class="text-gray-400 hover:text-rose-600 text-xs font-bold">
                    हटाएं
                  </button>
                </div>
                <div class="grid grid-cols-4 gap-1.5">
                  <div>
                    <span class="text-[10px] text-gray-500 block">मात्रा:</span>
                    <input 
                      type="text" 
                      value="${item.quantity || '1'}"
                      oninput="updateItemField('${sup.id}', '${item.id}', 'quantity', this.value)"
                      class="w-full px-1.5 py-1 border rounded font-bold"
                    >
                  </div>
                  <div>
                    <span class="text-[10px] text-gray-500 block">बिना GST:</span>
                    <input 
                      type="number" 
                      step="any"
                      value="${item.rateWoGst || ''}"
                      oninput="updateItemField('${sup.id}', '${item.id}', 'rateWoGst', this.value)"
                      class="w-full px-1.5 py-1 border rounded font-bold"
                    >
                  </div>
                  <div>
                    <span class="text-[10px] text-gray-500 block">GST%:</span>
                    <select 
                      onchange="updateItemField('${sup.id}', '${item.id}', 'gstPercent', this.value)"
                      class="w-full px-1 py-1 border rounded font-bold bg-white"
                    >
                      <option value="0" ${item.gstPercent == 0 ? 'selected' : ''}>0%</option>
                      <option value="5" ${item.gstPercent == 5 ? 'selected' : ''}>5%</option>
                      <option value="12" ${item.gstPercent == 12 ? 'selected' : ''}>12%</option>
                      <option value="18" ${item.gstPercent == 18 ? 'selected' : ''}>18%</option>
                    </select>
                  </div>
                  <div>
                    <span class="text-[10px] text-emerald-700 block">रेट+GST:</span>
                    <input 
                      type="number" 
                      step="any"
                      value="${item.rateWithGst || (item.rateWoGst ? Math.round(item.rateWoGst * (1 + (item.gstPercent || 0)/100) * 100)/100 : '')}"
                      oninput="updateItemField('${sup.id}', '${item.id}', 'rateWithGst', this.value)"
                      class="w-full px-1.5 py-1 border border-emerald-400 bg-emerald-50 rounded font-bold text-emerald-900"
                    >
                  </div>
                </div>
                <div class="flex items-center justify-between pt-1 border-t text-sm font-black">
                  <span class="text-gray-600 text-xs">कुल रकम:</span>
                  <span class="text-rose-900">₹ ${item.totalAmount}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Weekly Lump-Sum Paid Input in Mobile -->
          <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-gray-700">सामान: <strong>₹ ${totals.itemsTotal || 0}</strong></span>
              <div class="flex items-center gap-1">
                <span class="text-amber-900 font-bold">भाड़ा: ₹</span>
                <input 
                  type="number" 
                  value="${sup.freight || ''}" 
                  placeholder="0"
                  oninput="updateSupplierFreight('${sup.id}', this.value)"
                  class="w-16 px-1.5 py-0.5 border border-amber-300 rounded bg-white font-bold text-amber-950 text-xs"
                >
              </div>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-emerald-200">
              <span class="text-xs font-black text-gray-800">कुल बिल: <strong>₹ ${bill}</strong></span>
              <span class="text-xs font-black text-rose-700">बाकी: <strong>₹ ${due}</strong></span>
            </div>
            <div>
              <label class="block text-[11px] font-black text-emerald-900 uppercase">
                हफ्ते का एकमुश्त भुगतान (Amount Paid):
              </label>
              <div class="relative mt-1">
                <span class="absolute left-3 top-2 text-emerald-700 font-black">₹</span>
                <input 
                  type="number" 
                  value="${sup.paidAmount || ''}" 
                  placeholder="0"
                  oninput="updateSupplierLumpSumPaid('${sup.id}', this.value)"
                  class="w-full pl-8 pr-3 py-2 bg-white border-2 border-emerald-500 rounded-xl font-black text-lg text-emerald-800"
                >
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-black text-emerald-900 uppercase">
                📅 भुगतान की तारीख (Payment Date):
              </label>
              <input 
                type="date" 
                value="${sup.paymentDate || ''}" 
                onchange="updateSupplierPaymentDate('${sup.id}', this.value)"
                class="w-full px-3 py-2 bg-white border-2 border-emerald-500 rounded-xl font-bold text-sm text-emerald-950 mt-1"
              >
            </div>
            <div class="flex gap-1 justify-end text-xs font-bold">
              <button onclick="setFullPaidLumpSum('${sup.id}')" class="px-2.5 py-1 bg-emerald-700 text-white rounded">
                ✓ पूरा दिया
              </button>
              <button onclick="setHalfPaidLumpSum('${sup.id}')" class="px-2.5 py-1 bg-amber-600 text-white rounded">
                50%
              </button>
            </div>
          </div>

          <!-- Mobile Action Buttons -->
          <div class="pt-2 flex flex-col gap-2">
            <button onclick="saveAndPlaySound('${sup.id}')" class="w-full py-3 bg-rose-900 text-white rounded-xl font-black text-base shadow flex items-center justify-center gap-2">
              <i data-lucide="check" class="w-5 h-5"></i>
              ✓ बिल व पेमेंट सेव करें (Save)
            </button>
            <button onclick="shareWhatsApp('${sup.id}')" class="w-full py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              WhatsApp पर बिल भेजें
            </button>
          </div>

        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });
}

// TOGGLE EXPAND
function toggleExpandSupplier(id) {
  state.expandedSupplierId = state.expandedSupplierId === id ? null : id;
  renderView();
}

// INVOICE HEADER UPDATE
function updateSupplierInvoice(supplierId, field, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup[field] = val;
  persistData();
}

// ITEM FIELD UPDATE WITH AUTOMATIC TOTAL AMOUNT RE-CALCULATION
function updateItemField(supplierId, itemId, field, val, isDirectTotal = false) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const item = (sup.items || []).find(i => i.id === itemId);
  if (!item) return;

  if (field === 'rateWoGst' || field === 'gstPercent') {
    item[field] = Number(val) || 0;
    const gstRate = Number(item.gstPercent) || 0;
    item.rateWithGst = Math.round((Number(item.rateWoGst) * (1 + gstRate / 100)) * 100) / 100;
  } else if (field === 'rateWithGst') {
    item[field] = Number(val) || 0;
    const gstRate = Number(item.gstPercent) || 0;
    item.rateWoGst = Math.round((Number(item.rateWithGst) / (1 + gstRate / 100)) * 100) / 100;
  } else if (field === 'totalAmount') {
    item[field] = Number(val) || 0;
  } else {
    item[field] = val;
  }

  // If quantity, rateWoGst, rateWithGst, or gstPercent changed: auto calculate totalAmount
  if (!isDirectTotal && (field === 'quantity' || field === 'rateWoGst' || field === 'rateWithGst' || field === 'gstPercent')) {
    const qty = parseQuantityNum(item.quantity);
    if (item.rateWithGst) {
      item.totalAmount = Math.round(qty * item.rateWithGst);
    } else {
      const subtotal = qty * (Number(item.rateWoGst) || 0);
      const gstRate = Number(item.gstPercent) || 0;
      item.totalAmount = Math.round(subtotal * (1 + gstRate / 100));
    }
  }

  persistData();
  refreshRowCalculations();
}

// FREIGHT (भाड़ा / कैरिज) UPDATE
function updateSupplierFreight(supplierId, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup.freight = Number(val) || 0;
  persistData();
  refreshRowCalculations();
}

// LUMP-SUM WEEKLY PAYMENT & DATE UPDATE
function updateSupplierLumpSumPaid(supplierId, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup.paidAmount = Number(val) || 0;
  if (sup.paidAmount > 0 && !sup.paymentDate) {
    sup.paymentDate = new Date().toISOString().split('T')[0];
  } else if (sup.paidAmount === 0) {
    sup.paymentDate = '';
  }
  persistData();
  refreshRowCalculations();
}

function updateSupplierPaymentDate(supplierId, val) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup.paymentDate = val;
  persistData();
  refreshRowCalculations();
}

function updateSupplierPaymentMode(supplierId, mode) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup.paymentMode = mode;
  persistData();
}

function setFullPaidLumpSum(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const totals = getSupplierTotals(sup);
  sup.paidAmount = totals.bill;
  if (!sup.paymentDate) {
    sup.paymentDate = new Date().toISOString().split('T')[0];
  }
  persistData();
  renderView();
}

function setHalfPaidLumpSum(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const totals = getSupplierTotals(sup);
  sup.paidAmount = Math.round(totals.bill / 2);
  if (!sup.paymentDate) {
    sup.paymentDate = new Date().toISOString().split('T')[0];
  }
  persistData();
  renderView();
}

function setZeroPaidLumpSum(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  sup.paidAmount = 0;
  sup.paymentDate = '';
  persistData();
  renderView();
}

// DELETE ITEM
function deleteItem(supplierId, itemId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;
  const itm = (sup.items || []).find(i => i.id === itemId);
  const itmName = itm ? itm.description : '';
  const confirmMsg = state.currentLang === 'hi' 
    ? `क्या आप '${itmName}' को हटाना चाहते हैं?` 
    : `Delete item '${itmName}'?`;

  if (confirm(confirmMsg)) {
    sup.items = (sup.items || []).filter(i => i.id !== itemId);
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "सामान हटा दिया गया" : "Item deleted");

    fetch(`/api/items/${itemId}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// DELETE SUPPLIER
function deleteSupplier(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const confirmMsg = state.currentLang === 'hi'
    ? `⚠️ क्या आप सच में '${sup.name}' का पूरा इनवॉइस व सप्लायर खाता हटाना चाहते हैं?`
    : `⚠️ Are you sure you want to completely delete supplier '${sup.name}'?`;

  if (confirm(confirmMsg)) {
    state.suppliers = state.suppliers.filter(s => s.id !== supplierId);
    if (state.expandedSupplierId === supplierId) {
      state.expandedSupplierId = null;
    }
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "सप्लायर का खाता हटा दिया गया" : "Supplier deleted");

    fetch(`/api/suppliers/${supplierId}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// CLEAR WEEKLY ENTRIES
function clearWeeklyEntries(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const confirmMsg = state.currentLang === 'hi'
    ? `क्या आप इस हफ्ते की सारी एंट्री (रेट व पेमेंट) खाली (0) करना चाहते हैं?`
    : `Reset all rates and payments for this week to 0?`;

  if (confirm(confirmMsg)) {
    sup.paidAmount = 0;
    (sup.items || []).forEach(it => {
      it.rateWoGst = 0;
      it.totalAmount = 0;
    });
    persistData();
    renderView();
    showToast(state.currentLang === 'hi' ? "इस हफ्ते का हिसाब खाली कर दिया गया" : "Weekly entries reset to 0");

    fetch(`/api/suppliers/${supplierId}/clear-week`, { method: 'POST' }).catch(err => console.log('Offline/sync error:', err));
  }
}

// REFRESH ROW TOTALS WITHOUT JUMPING FOCUS
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

  const weekRange = getWeekRange(state.weekOffset);
  const weekLabel = `${weekRange.start} - ${weekRange.end}`;
  const totals = getSupplierTotals(sup);

  if (!sup.history) sup.history = [];
  
  const paymentDateVal = sup.paymentDate || (totals.paid > 0 ? new Date().toISOString().split('T')[0] : '');
  sup.paymentDate = paymentDateVal;

  const historyEntry = {
    id: `hist_${supplierId}_${Date.now()}`,
    invoiceNo: sup.invoiceNo || 'INV-' + Math.floor(1000 + Math.random() * 9000),
    invoiceDate: sup.invoiceDate || new Date().toISOString().split('T')[0],
    paymentDate: paymentDateVal,
    freight: sup.freight || 0,
    weekLabel,
    settledDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    paymentMode: sup.paymentMode || 'PhonePe / UPI',
    totalBill: totals.bill,
    totalPaid: totals.paid,
    due: totals.due,
    status: totals.status,
    items: (sup.items || []).map(it => ({
      description: it.description,
      hsnCode: it.hsnCode || '',
      quantity: it.quantity,
      rateWoGst: it.rateWoGst,
      gstPercent: it.gstPercent,
      rateWithGst: it.rateWithGst || 0,
      totalAmount: it.totalAmount
    }))
  };

  const existingIdx = sup.history.findIndex(h => h.weekLabel === weekLabel);
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

  // Sync to PostgreSQL backend
  fetch('/api/settlements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      supplierId,
      invoiceNo: sup.invoiceNo,
      invoiceDate: sup.invoiceDate,
      paymentDate: paymentDateVal,
      freight: sup.freight || 0,
      weekLabel,
      settledDate: historyEntry.settledDate,
      paymentMode: historyEntry.paymentMode,
      totalBill: totals.bill,
      paidAmount: totals.paid,
      due: totals.due,
      status: totals.status,
      items: sup.items
    })
  }).catch(err => console.log('Offline/sync error:', err));
}

// SUPPLIER HISTORY MODAL
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

  let lifetimeBilled = 0;
  let lifetimePaid = 0;

  const historyList = sup.history || [];
  historyList.forEach(h => {
    lifetimeBilled += Number(h.totalBill) || 0;
    lifetimePaid += Number(h.totalPaid) || 0;
  });

  const lifetimeDue = Math.max(0, lifetimeBilled - lifetimePaid);

  document.getElementById('history-total-billed').textContent = `₹ ${lifetimeBilled.toLocaleString('en-IN')}`;
  document.getElementById('history-total-paid').textContent = `₹ ${lifetimePaid.toLocaleString('en-IN')}`;
  document.getElementById('history-total-due').textContent = `₹ ${lifetimeDue.toLocaleString('en-IN')}`;

  const container = document.getElementById('history-timeline-container');
  container.innerHTML = '';

  if (historyList.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-gray-400 font-bold">
        अभी तक कोई पिछला इनवॉइस या हिसाब दर्ज नहीं हुआ है
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
            <span class="text-xs bg-rose-100 text-rose-900 font-black px-2 py-0.5 rounded">
              📄 ${rec.invoiceNo || 'Invoiced'} (${rec.invoiceDate || 'Date'})
            </span>
            <span class="text-sm font-bold text-gray-800">📅 हफ्ता: ${rec.weekLabel}</span>
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
            <span class="text-xs text-gray-500 block">कुल बिल (Total)</span>
            <strong class="text-gray-900">₹ ${rec.totalBill.toLocaleString('en-IN')}</strong>
            ${rec.freight > 0 ? `<span class="block text-[10px] text-amber-700 font-bold">(भाड़ा ₹${rec.freight})</span>` : ''}
          </div>
          <div>
            <span class="text-xs text-gray-500 block">भुगतान (${rec.paymentMode || 'UPI'})</span>
            <strong class="text-emerald-700">₹ ${rec.totalPaid.toLocaleString('en-IN')}</strong>
            ${(rec.paymentDate || rec.settledDate) ? `<span class="block text-[11px] text-emerald-800 font-bold mt-0.5">📅 ${rec.paymentDate || rec.settledDate}</span>` : ''}
          </div>
          <div>
            <span class="text-xs text-gray-500 block">बाकी (Due)</span>
            <strong class="text-rose-700">₹ ${rec.due.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div class="text-xs text-gray-600 font-medium space-y-0.5 pt-1">
          <p class="font-bold text-gray-700">सामान का विवरण (Items in Bill):</p>
          <ul class="list-disc list-inside space-y-0.5 text-gray-600">
            ${(rec.items || []).map(it => `
              <li>${it.description}: मात्रा <strong>${it.quantity}</strong>, बिना GST ₹${it.rateWoGst}, GST <strong>${it.gstPercent}%</strong> = <strong>₹${it.totalAmount}</strong></li>
            `).join('')}
          </ul>
        </div>
      `;
      container.appendChild(card);
    });
  }

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
  const targetId = state.activeSupplierForHistory || (state.suppliers[0] ? state.suppliers[0].id : null);
  if (targetId) openSupplierHistory(targetId);
}

// DELETE A SPECIFIC HISTORY ARCHIVE WEEK
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

    if (toDelete && toDelete.id) {
      fetch(`/api/history/${toDelete.id}`, { method: 'DELETE' }).catch(err => console.log('Offline/sync error:', err));
    }
  }
}

// WHATSAPP STATEMENT GENERATOR
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

  let msg = `*श्री गणेश किराना स्टोर (सप्लायर खाता विवरण)*\n`;
  msg += `👤 *सप्लायर:* ${sup.name}\n`;
  msg += `📞 *फोन:* ${sup.phone}\n`;
  msg += `===============================\n`;
  msg += `*कुल इनवॉइस खरीदारी:* ₹${lifetimeBilled}\n`;
  msg += `*कुल भुगतान:* ₹${lifetimePaid}\n`;
  msg += `👉 *कुल बाकी बकाया (NET DUE):* ₹${lifetimeDue}\n`;
  msg += `===============================\n`;
  msg += `*पिछला इनवॉइस रिकॉर्ड (Past Invoices):*\n`;

  historyList.slice(0, 4).forEach((rec) => {
    msg += `\n📄 *इनवॉइस:* ${rec.invoiceNo} (${rec.invoiceDate || ''})\n`;
    msg += `📅 *हफ्ता:* ${rec.weekLabel}\n`;
    msg += `• बिल: ₹${rec.totalBill} | भुगतान: ₹${rec.totalPaid} (${rec.paymentMode})${(rec.paymentDate || rec.settledDate) ? ` [तारीख: ${rec.paymentDate || rec.settledDate}]` : ''} | बाकी: ₹${rec.due}\n`;
  });

  msg += `\nकृपया हिसाब चेक कर लें। धन्यवाद!`;

  const phone = sup.phone ? sup.phone.replace(/[^0-9]/g, '') : '';
  const url = `https://wa.me/${phone ? '91' + phone : ''}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// WHATSAPP CURRENT INVOICE & WEEKLY PAYMENT SLIP
function shareWhatsApp(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const week = getWeekRange(state.weekOffset);
  const totals = getSupplierTotals(sup);

  let msg = `*श्री गणेश किराना स्टोर (Shree Ganesh Kiryana)*\n`;
  msg += `📄 *इनवॉइस नं:* ${sup.invoiceNo || 'N/A'}\n`;
  msg += `📅 *बिल तारीख:* ${sup.invoiceDate || 'N/A'}\n`;
  msg += `👤 *सप्लायर:* ${sup.name}\n`;
  msg += `📅 *हफ्ता:* ${week.start} से ${week.end}\n`;
  msg += `--------------------------------\n`;
  msg += `*सामान का विवरण (Goods Breakdown):*\n`;
  
  (sup.items || []).forEach(it => {
    msg += `• ${it.description} (${it.quantity}): बिना GST ₹${it.rateWoGst} + GST ${it.gstPercent}% = *₹${it.totalAmount}*\n`;
  });
  if (totals.freight > 0) {
    msg += `• 🚚 भाड़ा / ढुलाई (Freight & Outward): *₹${totals.freight}*\n`;
  }
  
  msg += `--------------------------------\n`;
  msg += `*कुल बिल रकम (Total Bill):* ₹${totals.bill}\n`;
  msg += `*हफ्ते का भुगतान (Paid):* ₹${totals.paid} (${sup.paymentMode || 'UPI'})\n`;
  if (sup.paymentDate && totals.paid > 0) {
    msg += `💸 *भुगतान तारीख (Payment Date):* ${sup.paymentDate}\n`;
  }
  msg += `👉 *बाकी बकाया (DUE):* ₹${totals.due}\n`;
  msg += `--------------------------------\n`;
  msg += `कृपया इनवॉइस चेक कर लें। धन्यवाद!`;

  const phone = sup.phone ? sup.phone.replace(/[^0-9]/g, '') : '';
  const url = `https://wa.me/${phone ? '91' + phone : ''}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// MODAL: ADD NEW BILL TO EXISTING SUPPLIER
function openAddBillModal(supplierId) {
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  document.getElementById('add-bill-supplier-id').value = supplierId;
  const oldInvText = sup.invoiceNo ? ` (चालू बिल: #${sup.invoiceNo})` : '';
  document.getElementById('modal-add-bill-supplier-name').textContent = `${sup.name}${oldInvText}`;
  
  // Suggest next invoice number
  let nextInv = '';
  if (sup.invoiceNo && /^\d+$/.test(sup.invoiceNo.trim())) {
    nextInv = String(parseInt(sup.invoiceNo.trim(), 10) + 1);
  } else if (sup.invoiceNo && sup.invoiceNo.includes('-')) {
    const parts = sup.invoiceNo.split('-');
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) {
      parts[parts.length - 1] = String(parseInt(last, 10) + 1);
      nextInv = parts.join('-');
    }
  }

  document.getElementById('add-bill-invoice-no').value = nextInv;
  document.getElementById('add-bill-invoice-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('add-bill-freight').value = '0';
  document.getElementById('add-bill-archive-current').checked = true;
  document.getElementById('add-bill-archive-label').textContent = sup.invoiceNo 
    ? `चालू बिल #${sup.invoiceNo} को पुराने रिकॉर्ड (Ledger History) में सुरक्षित करें` 
    : 'चालू बिल को पुराने रिकॉर्ड (Ledger History) में सुरक्षित करें';

  document.getElementById('modal-add-bill').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
  setTimeout(() => {
    document.getElementById('add-bill-invoice-no').focus();
  }, 100);
}

function closeAddBillModal() {
  document.getElementById('modal-add-bill').classList.add('hidden');
}

function confirmAddNewBill() {
  const supplierId = document.getElementById('add-bill-supplier-id').value;
  const sup = state.suppliers.find(s => s.id === supplierId);
  if (!sup) return;

  const invoiceNo = document.getElementById('add-bill-invoice-no').value.trim();
  const invoiceDate = document.getElementById('add-bill-invoice-date').value;
  const freight = parseFloat(document.getElementById('add-bill-freight').value) || 0;
  const archiveCurrent = document.getElementById('add-bill-archive-current').checked;
  const itemsMode = document.querySelector('input[name="add_bill_items_mode"]:checked')?.value || 'keep_template';

  if (!invoiceNo) {
    alert(state.currentLang === 'hi' ? 'कृपया नया बिल / इनवॉइस नंबर भरें' : 'Please enter invoice number');
    return;
  }

  // 1. Archive current active bill if requested and valid
  if (archiveCurrent && (sup.invoiceNo || (sup.items && sup.items.length > 0))) {
    const totals = getSupplierTotals(sup);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const formatDate = (d) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const weekLabel = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
    const paymentDateVal = sup.paymentDate || (sup.paidAmount > 0 ? (sup.invoiceDate || new Date().toISOString().split('T')[0]) : '');

    const historyEntry = {
      id: `hist_${supplierId}_${Date.now()}`,
      invoiceNo: sup.invoiceNo || 'INV-' + Math.floor(1000 + Math.random() * 9000),
      invoiceDate: sup.invoiceDate || new Date().toISOString().split('T')[0],
      paymentDate: paymentDateVal,
      freight: sup.freight || 0,
      weekLabel,
      settledDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      paymentMode: sup.paymentMode || 'PhonePe / UPI',
      totalBill: totals.bill,
      totalPaid: totals.paid,
      due: totals.due,
      status: totals.status,
      items: (sup.items || []).map(i => ({ ...i }))
    };

    if (!sup.history) sup.history = [];
    sup.history.unshift(historyEntry);

    // Sync settlement archive to backend
    fetch('/api/settlements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        supplierId,
        invoiceNo: sup.invoiceNo,
        invoiceDate: sup.invoiceDate,
        paymentDate: paymentDateVal,
        freight: sup.freight || 0,
        weekLabel,
        settledDate: historyEntry.settledDate,
        paymentMode: historyEntry.paymentMode,
        totalBill: totals.bill,
        paidAmount: totals.paid,
        due: totals.due,
        status: totals.status,
        items: historyEntry.items
      })
    }).catch(err => console.log('Settlement sync error:', err));
  }

  // 2. Setup the new active bill
  sup.invoiceNo = invoiceNo;
  sup.invoiceDate = invoiceDate || new Date().toISOString().split('T')[0];
  sup.freight = freight;
  sup.paidAmount = 0;
  sup.paymentDate = '';

  if (itemsMode === 'keep_template' && sup.items && sup.items.length > 0) {
    sup.items = sup.items.map((it, idx) => ({
      id: `itm_${Date.now()}_${idx}`,
      description: it.description,
      hsnCode: it.hsnCode || '',
      quantity: '',
      rateWoGst: 0,
      gstPercent: it.gstPercent || 0,
      rateWithGst: 0,
      totalAmount: 0
    }));
  } else if (itemsMode === 'blank') {
    sup.items = [];
  }

  // Expand supplier so user can immediately view/add items
  state.expandedSupplierId = sup.id;

  persistData();
  closeAddBillModal();
  renderView();

  playSoundboxChime(sup.name.split('(')[0].trim(), 0);
  const msg = state.currentLang === 'hi' 
    ? `नया बिल #${invoiceNo} शुरू हुआ! कृपया सामान व रेट दर्ज करें।` 
    : `New bill #${invoiceNo} started! Please enter items and rates.`;
  showToast(msg);

  // Sync updated supplier to backend
  fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sup)
  }).catch(err => console.log('Offline/sync error:', err));
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
    ? itemsStr.split(',').map((it, idx) => ({ 
        id: `itm_${Date.now()}_${idx}`, 
        description: it.trim(), 
        quantity: '1', 
        rateWoGst: 0, 
        gstPercent: 5, 
        totalAmount: 0 
      }))
    : [{ 
        id: `itm_${Date.now()}_0`, 
        description: "किराना सामान (General Goods)", 
        quantity: '1', 
        rateWoGst: 0, 
        gstPercent: 5, 
        totalAmount: 0 
      }];

  const newSup = {
    id: `sup_${Date.now()}`,
    name,
    phone,
    settlementDay: day,
    invoiceNo: 'INV-' + Math.floor(1000 + Math.random() * 9000),
    invoiceDate: new Date().toISOString().split('T')[0],
    paidAmount: 0,
    paymentMode: 'PhonePe / UPI',
    items,
    history: []
  };

  state.suppliers.push(newSup);
  persistData();
  closeAddSupplierModal();
  state.expandedSupplierId = newSup.id;
  renderView();

  fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSup)
  }).catch(err => console.log('Offline/sync error:', err));

  document.getElementById('new-supplier-name').value = '';
  document.getElementById('new-supplier-phone').value = '';
  document.getElementById('new-supplier-items').value = '';
}

// MODAL: ADD CUSTOM ITEM TO INVOICE
function openAddItemModal(supplierId) {
  state.activeSupplierForAddItem = supplierId;
  const sup = state.suppliers.find(s => s.id === supplierId);
  document.getElementById('modal-add-item-title').textContent = `${sup ? sup.name.split('(')[0] : ''} के इनवॉइस में सामान जोड़ें`;
  document.getElementById('new-item-desc').value = '';
  document.getElementById('new-item-qty').value = '1';
  document.getElementById('new-item-rate').value = '';
  document.getElementById('new-item-gst').value = '5';
  document.getElementById('new-item-total').value = '';
  document.getElementById('modal-add-item').classList.remove('hidden');
}

function closeAddItemModal() {
  document.getElementById('modal-add-item').classList.add('hidden');
  state.activeSupplierForAddItem = null;
}

function calcNewItemTotal(source = 'woGst') {
  const qtyStr = document.getElementById('new-item-qty').value;
  const qty = parseQuantityNum(qtyStr);
  const gst = Number(document.getElementById('new-item-gst').value) || 0;

  if (source === 'withGst') {
    const rateWithTax = Number(document.getElementById('new-item-rate-tax').value) || 0;
    const rateWo = rateWithTax > 0 ? Math.round((rateWithTax / (1 + gst / 100)) * 100) / 100 : '';
    document.getElementById('new-item-rate').value = rateWo;
    const total = Math.round(qty * rateWithTax);
    document.getElementById('new-item-total').value = total > 0 ? total : '';
  } else {
    const rateWo = Number(document.getElementById('new-item-rate').value) || 0;
    const rateWithTax = rateWo > 0 ? Math.round((rateWo * (1 + gst / 100)) * 100) / 100 : '';
    document.getElementById('new-item-rate-tax').value = rateWithTax;
    const total = Math.round((qty * rateWo) * (1 + gst / 100));
    document.getElementById('new-item-total').value = total > 0 ? total : '';
  }
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
      document.getElementById('new-item-desc').value = sug;
      calcNewItemTotal();
    };
    container.appendChild(chip);
  });
}

function confirmAddItem() {
  const desc = document.getElementById('new-item-desc').value.trim();
  if (!desc) {
    alert(state.currentLang === 'hi' ? "कृपया सामान का विवरण लिखें" : "Please enter item description");
    return;
  }

  const sup = state.suppliers.find(s => s.id === state.activeSupplierForAddItem);
  if (!sup) return;

  const hsnCode = document.getElementById('new-item-hsn').value.trim();
  const qty = document.getElementById('new-item-qty').value.trim() || '1';
  const rateWoGst = Number(document.getElementById('new-item-rate').value) || 0;
  const gstPercent = Number(document.getElementById('new-item-gst').value) || 0;
  const rateWithGst = Number(document.getElementById('new-item-rate-tax').value) || (rateWoGst > 0 ? Math.round(rateWoGst * (1 + gstPercent / 100) * 100) / 100 : 0);
  const totalAmount = Number(document.getElementById('new-item-total').value) || Math.round((parseQuantityNum(qty) * (rateWithGst || (rateWoGst * (1 + gstPercent / 100)))));

  const itmObj = {
    id: `itm_${Date.now()}`,
    description: desc,
    hsnCode,
    quantity: qty,
    rateWoGst,
    gstPercent,
    rateWithGst,
    totalAmount
  };

  if (!sup.items) sup.items = [];
  sup.items.push(itmObj);

  persistData();
  closeAddItemModal();
  renderView();

  fetch(`/api/suppliers/${sup.id}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itmObj)
  }).catch(err => console.log('Offline/sync error:', err));
}
