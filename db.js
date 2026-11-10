const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

let pool = null;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
  });
  console.log('🐘 PostgreSQL Pool configured with DATABASE_URL');
} else {
  console.log('⚠️ DATABASE_URL not found. Running in local fallback mode.');
}

// Initial seed suppliers (including Bhatla Agency)
const SEED_SUPPLIERS = [
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
        id: "hist_1_1",
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
        id: "hist_2_1",
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "01 Nov 2026",
        paymentMode: "चेक (Cheque)",
        totalBill: 28000,
        totalPaid: 28000,
        due: 0,
        status: "PAID",
        items: [
          { name: "चक्की आटा (2 बोरी)", rate: 14000, paid: 14000 },
          { name: "अरहर दाल (30kg)", rate: 8500, paid: 8500 }
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
        id: "hist_b_1",
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
      }
    ]
  }
];

// Initialize PostgreSQL Tables
async function initDatabase() {
  if (!pool) return;

  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database successfully.');

    // 1. Create Suppliers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        settlement_day VARCHAR(50) DEFAULT 'शनिवार (Saturday)',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create Items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS supplier_items (
        id VARCHAR(64) PRIMARY KEY,
        supplier_id VARCHAR(64) REFERENCES suppliers(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        rate NUMERIC(12, 2) DEFAULT 0,
        paid NUMERIC(12, 2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create Weekly History table
    await client.query(`
      CREATE TABLE IF NOT EXISTS weekly_history (
        id VARCHAR(64) PRIMARY KEY,
        supplier_id VARCHAR(64) REFERENCES suppliers(id) ON DELETE CASCADE,
        week_label VARCHAR(100) NOT NULL,
        settled_date VARCHAR(50),
        payment_mode VARCHAR(50) DEFAULT 'PhonePe / UPI',
        total_bill NUMERIC(12, 2) DEFAULT 0,
        total_paid NUMERIC(12, 2) DEFAULT 0,
        due NUMERIC(12, 2) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'PAID',
        items_json JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if suppliers exist, if not seed default ones
    const res = await client.query('SELECT COUNT(*) FROM suppliers');
    if (parseInt(res.rows[0].count) === 0) {
      console.log('🌱 Seeding initial suppliers into PostgreSQL...');
      for (const sup of SEED_SUPPLIERS) {
        await client.query(
          'INSERT INTO suppliers (id, name, phone, settlement_day) VALUES ($1, $2, $3, $4)',
          [sup.id, sup.name, sup.phone, sup.settlementDay]
        );
        for (const itm of sup.items) {
          await client.query(
            'INSERT INTO supplier_items (id, supplier_id, name, rate, paid) VALUES ($1, $2, $3, $4, $5)',
            [itm.id, sup.id, itm.name, itm.rate, itm.paid]
          );
        }
        for (const hist of (sup.history || [])) {
          await client.query(
            `INSERT INTO weekly_history 
             (id, supplier_id, week_label, settled_date, payment_mode, total_bill, total_paid, due, status, items_json) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [hist.id, sup.id, hist.weekLabel, hist.settledDate, hist.paymentMode, hist.totalBill, hist.totalPaid, hist.due, hist.status, JSON.stringify(hist.items)]
          );
        }
      }
      console.log('✅ Seeding completed.');
    }

    client.release();
  } catch (err) {
    console.error('❌ PostgreSQL Initialization Error:', err.message);
  }
}

module.exports = {
  pool,
  initDatabase,
  SEED_SUPPLIERS
};
