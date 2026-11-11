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

// Initial seed suppliers with Invoice details & weekly lump-sum payment
const SEED_SUPPLIERS = [
  {
    id: "sup_bhatla",
    name: "भाटला एजेंसी (Bhatla Agency)",
    phone: "9876543210",
    settlementDay: "शुक्रवार (Friday)",
    invoiceNo: "INV-8841",
    invoiceDate: "2026-11-10",
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
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "31 Oct 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 11800,
        totalPaid: 11800,
        due: 0,
        status: "PAID",
        items: [
          { description: "मसाले पेटी (Spices Box)", quantity: "10 पेटी", rateWoGst: 570, gstPercent: 5, totalAmount: 6000 },
          { description: "बेसन कट्टा (Besan Bag)", quantity: "2 बोरी", rateWoGst: 1800, gstPercent: 5, totalAmount: 3800 },
          { description: "टॉफी जार (Toffee Jars)", quantity: "4 जार", rateWoGst: 423, gstPercent: 18, totalAmount: 2000 }
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
    paidAmount: 15000,
    paymentMode: "PhonePe / UPI",
    items: [
      {
        id: "itm_1",
        description: "देसी घी 1 लीटर डिब्बा (Desi Ghee 1L x 12)",
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
        weekLabel: "27 Oct - 02 Nov 2026",
        settledDate: "02 Nov 2026",
        paymentMode: "PhonePe / UPI",
        totalBill: 15800,
        totalPaid: 15800,
        due: 0,
        status: "PAID",
        items: [
          { description: "देसी घी 1L डिब्बा (12 पीस)", quantity: "2 कार्टन", rateWoGst: 4500, gstPercent: 12, totalAmount: 10080 },
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
  }
];

// Initialize PostgreSQL Tables
async function initDatabase() {
  if (!pool) return;

  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database successfully.');

    // 1. Create Suppliers table with Invoice No & Date
    await client.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        settlement_day VARCHAR(50) DEFAULT 'शनिवार (Saturday)',
        invoice_no VARCHAR(100) DEFAULT '',
        invoice_date VARCHAR(50) DEFAULT '',
        paid_amount NUMERIC(12, 2) DEFAULT 0,
        payment_mode VARCHAR(50) DEFAULT 'PhonePe / UPI',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create Items table with Qty, Rate Wo GST, GST %, and Total Amount
    await client.query(`
      CREATE TABLE IF NOT EXISTS supplier_items (
        id VARCHAR(64) PRIMARY KEY,
        supplier_id VARCHAR(64) REFERENCES suppliers(id) ON DELETE CASCADE,
        description VARCHAR(255) NOT NULL,
        quantity VARCHAR(50) DEFAULT '1',
        rate_wo_gst NUMERIC(12, 2) DEFAULT 0,
        gst_percent NUMERIC(5, 2) DEFAULT 0,
        total_amount NUMERIC(12, 2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create Weekly History table with Invoice No & Date
    await client.query(`
      CREATE TABLE IF NOT EXISTS weekly_history (
        id VARCHAR(64) PRIMARY KEY,
        supplier_id VARCHAR(64) REFERENCES suppliers(id) ON DELETE CASCADE,
        invoice_no VARCHAR(100) DEFAULT '',
        invoice_date VARCHAR(50) DEFAULT '',
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
      console.log('🌱 Seeding initial suppliers with invoice structure into PostgreSQL...');
      for (const sup of SEED_SUPPLIERS) {
        await client.query(
          `INSERT INTO suppliers (id, name, phone, settlement_day, invoice_no, invoice_date, paid_amount, payment_mode) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [sup.id, sup.name, sup.phone, sup.settlementDay, sup.invoiceNo, sup.invoiceDate, sup.paidAmount, sup.paymentMode]
        );
        for (const itm of sup.items) {
          await client.query(
            `INSERT INTO supplier_items (id, supplier_id, description, quantity, rate_wo_gst, gst_percent, total_amount) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [itm.id, sup.id, itm.description, itm.quantity, itm.rateWoGst, itm.gstPercent, itm.totalAmount]
          );
        }
        for (const hist of (sup.history || [])) {
          await client.query(
            `INSERT INTO weekly_history 
             (id, supplier_id, invoice_no, invoice_date, week_label, settled_date, payment_mode, total_bill, total_paid, due, status, items_json) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [hist.id, sup.id, hist.invoiceNo, hist.invoiceDate, hist.weekLabel, hist.settledDate, hist.paymentMode, hist.totalBill, hist.totalPaid, hist.due, hist.status, JSON.stringify(hist.items)]
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
