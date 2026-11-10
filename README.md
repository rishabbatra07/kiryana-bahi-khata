# किराना बही खाता (Kiryana Bahi Khata)
### Old-Admin Friendly Supplier Rate & Payment Tracker

A lightweight, high-contrast, bilingual (हिंदी / English) web and mobile application designed specifically for older Kiryana store owners to manage weekly supplier payments with minimal typing.

---

## 🌟 Key Features

1. **Only 2 Inputs Weekly**:
   - The shopkeeper only types **Rate (दाम/रेट)** and **Paid (दिया)** for items. No complex SKU creation or multi-page invoices.
2. **Old-Admin Friendly UI**:
   - **Large 18px+ bold typography** and high-contrast color badges:
     - 🟢 **चुकता (Paid)**: Bill fully cleared.
     - 🟡 **बाकी (Partial)**: Partial payment made.
     - 🔴 **पूरा बाकी (Unpaid)**: Needs urgent payment.
   - **1-Tap `[ पूरा दिया (Full Paid) ]`**: Instantly copies the bill amount into the paid box with a single tap.
3. **Soundbox Audio Chime 🔔**:
   - Plays a pleasant 3-tone electronic bell (Paytm / PhonePe Soundbox style) and speaks a voice confirmation whenever a payment is saved.
4. **🎙️ Voice Mic for Custom Items**:
   - Uses Web Speech Recognition (`hi-IN` & `en-IN`). Tap the mic and say *"फॉर्च्यून 5 लीटर"* or *"सेंधा नमक"* to add items hands-free.
5. **Dual Views**:
   - **💻 Desktop View**: Full Bahi Khata / Excel table with expandable rows for counter computers.
   - **📱 Mobile App View**: Touch-first cards optimized for thumb navigation on phones.
6. **🖨️ 1-Click Physical Print Slip (A4 Parcha)**:
   - Formatted `@media print` layout that prints a clean, black-and-white physical ledger slip with store name, weekly breakdown, and owner signature line.
7. **💬 WhatsApp Share**:
   - 1-click button that generates an instant WhatsApp summary with itemized details and remaining balance to send to the supplier.
8. **100% Offline-First**:
   - Uses browser `localStorage` to save all data permanently. No database setup needed for local usage.

---

## 🚀 How to Run Locally

1. Open your terminal and run:
   ```bash
   cd /Users/rishab.batra/.gemini/antigravity-ide/scratch/kiryana-khata
   python3 -m http.server 4500
   ```
2. Open your browser and visit:
   ```
   http://localhost:4500
   ```

---

## 📁 Project Structure

```
kiryana-khata/
├── index.html       # Single-page UI with Tailwind CDN & Lucide icons
├── app.js           # Core state, calculations, Soundbox chime, WhatsApp generator
└── README.md        # Documentation
```

