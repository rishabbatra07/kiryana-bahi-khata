require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { pool, initDatabase, SEED_SUPPLIERS } = require('./db');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// Permanent Local Disk File Persistence (never loses data on restart)
const DATA_FILE = path.join(__dirname, 'data', 'suppliers.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

function loadLocalSuppliers() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const enriched = parsed.map(s => ({
          ...s,
          receiptImage: s.receiptImage || '',
          freight: parseFloat(s.freight) || 0,
          paymentDate: s.paymentDate || (s.paidAmount > 0 ? (s.invoiceDate || new Date().toISOString().split('T')[0]) : ''),
          items: (s.items || []).map(i => ({
            ...i,
            hsnCode: i.hsnCode || '',
            rateWithGst: parseFloat(i.rateWithGst) || 0
          })),
          history: (s.history || []).map(h => ({
            ...h,
            receiptImage: h.receiptImage || '',
            freight: parseFloat(h.freight) || 0,
            paymentDate: h.paymentDate || h.settledDate || ''
          }))
        }));
        saveLocalSuppliers(enriched);
        return enriched;
      }
    } catch (e) {
      console.error('Error reading suppliers.json:', e);
    }
  }
  saveLocalSuppliers(SEED_SUPPLIERS);
  return JSON.parse(JSON.stringify(SEED_SUPPLIERS));
}

function saveLocalSuppliers(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving suppliers.json:', e);
  }
}

let localMemorySuppliers = loadLocalSuppliers();

// Initialize Database on Startup
initDatabase();

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. GET ALL SUPPLIERS (WITH INVOICE, ITEMS & RECENT HISTORY)
app.get('/api/suppliers', async (req, res) => {
  if (pool) {
    try {
      const supResult = await pool.query('SELECT * FROM suppliers ORDER BY created_at ASC');
      const itemsResult = await pool.query('SELECT * FROM supplier_items ORDER BY created_at ASC');
      const histResult = await pool.query('SELECT * FROM weekly_history ORDER BY created_at DESC');

      const suppliers = supResult.rows.map(sup => {
        const items = itemsResult.rows
          .filter(i => i.supplier_id === sup.id)
          .map(i => ({
            id: i.id,
            description: i.description || i.name || '',
            hsnCode: i.hsn_code || '',
            quantity: i.quantity || '1',
            rateWoGst: parseFloat(i.rate_wo_gst) || parseFloat(i.rate) || 0,
            gstPercent: parseFloat(i.gst_percent) || 0,
            rateWithGst: parseFloat(i.rate_with_gst) || 0,
            totalAmount: parseFloat(i.total_amount) || parseFloat(i.rate) || 0
          }));

        const history = histResult.rows
          .filter(h => h.supplier_id === sup.id)
          .map(h => ({
            id: h.id,
            invoiceNo: h.invoice_no || '',
            invoiceDate: h.invoice_date || '',
            paymentDate: h.payment_date || h.settled_date || '',
            freight: parseFloat(h.freight) || 0,
            weekLabel: h.week_label,
            settledDate: h.settled_date,
            paymentMode: h.payment_mode,
            totalBill: parseFloat(h.total_bill) || 0,
            totalPaid: parseFloat(h.total_paid) || 0,
            due: parseFloat(h.due) || 0,
            status: h.status,
            receiptImage: h.receipt_image || h.receiptImage || '',
            items: h.items_json || []
          }));

        return {
          id: sup.id,
          name: sup.name,
          phone: sup.phone,
          settlementDay: sup.settlement_day,
          invoiceNo: sup.invoice_no || '',
          invoiceDate: sup.invoice_date || '',
          paymentDate: sup.payment_date || '',
          freight: parseFloat(sup.freight) || 0,
          paidAmount: parseFloat(sup.paid_amount) || 0,
          paymentMode: sup.payment_mode || 'PhonePe / UPI',
          receiptImage: sup.receipt_image || sup.receiptImage || '',
          items,
          history
        };
      });

      return res.json({ success: true, source: 'postgresql', data: suppliers });
    } catch (err) {
      console.error('Database query error:', err.message);
      return res.status(500).json({ error: err.message, fallback: localMemorySuppliers });
    }
  }

  // Fallback to local memory if PostgreSQL is not active
  res.json({ success: true, source: 'local_memory', data: localMemorySuppliers });
});

// 2. CREATE NEW SUPPLIER
app.post('/api/suppliers', async (req, res) => {
  const { id, name, phone, settlementDay, invoiceNo, invoiceDate, paymentDate, freight, paidAmount, paymentMode, items, receiptImage } = req.body;
  const supplierId = id || `sup_${Date.now()}`;
  const nowStr = new Date().toISOString().split('T')[0];
  const finalPaymentDate = paymentDate || (paidAmount > 0 ? nowStr : '');
  const freightVal = parseFloat(freight) || 0;
  const imgVal = receiptImage || '';

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO suppliers (id, name, phone, settlement_day, invoice_no, invoice_date, payment_date, freight, paid_amount, payment_mode, receipt_image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           phone = EXCLUDED.phone,
           settlement_day = EXCLUDED.settlement_day,
           invoice_no = EXCLUDED.invoice_no,
           invoice_date = EXCLUDED.invoice_date,
           payment_date = EXCLUDED.payment_date,
           freight = EXCLUDED.freight,
           paid_amount = EXCLUDED.paid_amount,
           payment_mode = EXCLUDED.payment_mode,
           receipt_image = CASE WHEN EXCLUDED.receipt_image != '' THEN EXCLUDED.receipt_image ELSE suppliers.receipt_image END`,
        [supplierId, name, phone, settlementDay, invoiceNo || '', invoiceDate || '', finalPaymentDate, freightVal, paidAmount || 0, paymentMode || 'PhonePe / UPI', imgVal]
      );

      // Clean old items for this supplier and insert latest
      await pool.query('DELETE FROM supplier_items WHERE supplier_id = $1', [supplierId]);

      if (items && items.length > 0) {
        for (const itm of items) {
          const itmId = itm.id || `itm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
          await pool.query(
            `INSERT INTO supplier_items (id, supplier_id, description, hsn_code, quantity, rate_wo_gst, gst_percent, rate_with_gst, total_amount) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              itmId, 
              supplierId, 
              itm.description || itm.name || '', 
              itm.hsnCode || '',
              itm.quantity || '1', 
              itm.rateWoGst || 0, 
              itm.gstPercent || 0, 
              itm.rateWithGst || 0,
              itm.totalAmount || 0
            ]
          );
        }
      }

      return res.json({ success: true, id: supplierId });
    } catch (err) {
      console.error('Error inserting/updating supplier:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // Local fallback
  const existingIdx = localMemorySuppliers.findIndex(s => s.id === supplierId);
  if (existingIdx >= 0) {
    localMemorySuppliers[existingIdx] = {
      ...localMemorySuppliers[existingIdx],
      name,
      phone,
      settlementDay,
      invoiceNo: invoiceNo || '',
      invoiceDate: invoiceDate || '',
      paymentDate: finalPaymentDate,
      freight: freightVal,
      paidAmount: paidAmount || 0,
      paymentMode: paymentMode || 'PhonePe / UPI',
      receiptImage: imgVal !== '' ? imgVal : (localMemorySuppliers[existingIdx].receiptImage || ''),
      items: items || []
    };
  } else {
    localMemorySuppliers.push({
      id: supplierId,
      name,
      phone,
      settlementDay,
      invoiceNo: invoiceNo || '',
      invoiceDate: invoiceDate || '',
      paymentDate: finalPaymentDate,
      freight: freightVal,
      paidAmount: paidAmount || 0,
      paymentMode: paymentMode || 'PhonePe / UPI',
      receiptImage: imgVal,
      items: items || [],
      history: []
    });
  }
  saveLocalSuppliers(localMemorySuppliers);
  res.json({ success: true, id: supplierId });
});

// 3. DELETE SUPPLIER
app.delete('/api/suppliers/:id', async (req, res) => {
  const supplierId = req.params.id;

  if (pool) {
    try {
      await pool.query('DELETE FROM suppliers WHERE id = $1', [supplierId]);
      return res.json({ success: true, message: 'Supplier deleted from PostgreSQL' });
    } catch (err) {
      console.error('Error deleting supplier:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  localMemorySuppliers = localMemorySuppliers.filter(s => s.id !== supplierId);
  saveLocalSuppliers(localMemorySuppliers);
  res.json({ success: true, message: 'Supplier deleted from memory' });
});

// 4. ADD ITEM TO SUPPLIER
app.post('/api/suppliers/:id/items', async (req, res) => {
  const supplierId = req.params.id;
  const { description, quantity, rateWoGst, gstPercent, totalAmount } = req.body;
  const itmId = `itm_${Date.now()}`;

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO supplier_items (id, supplier_id, description, quantity, rate_wo_gst, gst_percent, total_amount) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [itmId, supplierId, description, quantity || '1', rateWoGst || 0, gstPercent || 0, totalAmount || 0]
      );
      return res.json({ success: true, id: itmId });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.items.push({
      id: itmId,
      description,
      quantity: quantity || '1',
      rateWoGst: rateWoGst || 0,
      gstPercent: gstPercent || 0,
      totalAmount: totalAmount || 0
    });
    saveLocalSuppliers(localMemorySuppliers);
  }
  res.json({ success: true, id: itmId });
});

// 5. DELETE ITEM
app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;

  if (pool) {
    try {
      await pool.query('DELETE FROM supplier_items WHERE id = $1', [itemId]);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  localMemorySuppliers.forEach(sup => {
    sup.items = sup.items.filter(i => i.id !== itemId);
  });
  saveLocalSuppliers(localMemorySuppliers);
  res.json({ success: true });
});

// 6. SAVE WEEKLY SETTLEMENT (INVOICE, ITEMS, FREIGHT & LUMP-SUM WEEKLY PAYMENT)
app.post('/api/settlements', async (req, res) => {
  const { 
    supplierId, 
    invoiceNo, 
    invoiceDate, 
    paymentDate,
    freight,
    weekLabel, 
    settledDate, 
    paymentMode, 
    totalBill, 
    paidAmount, 
    due, 
    status, 
    items,
    receiptImage 
  } = req.body;

  const finalPaymentDate = paymentDate || (paidAmount > 0 ? (settledDate || new Date().toISOString().split('T')[0]) : '');
  const freightVal = parseFloat(freight) || 0;
  const imgVal = receiptImage || '';

  if (pool) {
    try {
      // 1. Update supplier table with latest invoice & payment info & freight & receipt_image
      await pool.query(
        `UPDATE suppliers 
         SET invoice_no = $1, invoice_date = $2, payment_date = $3, freight = $4, paid_amount = $5, payment_mode = $6,
             receipt_image = CASE WHEN $7 != '' THEN $7 ELSE receipt_image END
         WHERE id = $8`,
        [invoiceNo || '', invoiceDate || '', finalPaymentDate, freightVal, paidAmount || 0, paymentMode || 'PhonePe / UPI', imgVal, supplierId]
      );

      // 2. Update or insert items
      if (items && Array.isArray(items)) {
        for (const itm of items) {
          const updateRes = await pool.query(
            `UPDATE supplier_items 
             SET description = $1, hsn_code = $2, quantity = $3, rate_wo_gst = $4, gst_percent = $5, rate_with_gst = $6, total_amount = $7 
             WHERE id = $8 AND supplier_id = $9`,
            [itm.description || itm.name, itm.hsnCode || '', itm.quantity || '1', itm.rateWoGst || 0, itm.gstPercent || 0, itm.rateWithGst || 0, itm.totalAmount || 0, itm.id, supplierId]
          );

          if (updateRes.rowCount === 0) {
            await pool.query(
              `INSERT INTO supplier_items (id, supplier_id, description, hsn_code, quantity, rate_wo_gst, gst_percent, rate_with_gst, total_amount) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
              [itm.id || `itm_${Date.now()}`, supplierId, itm.description || itm.name, itm.hsnCode || '', itm.quantity || '1', itm.rateWoGst || 0, itm.gstPercent || 0, itm.rateWithGst || 0, itm.totalAmount || 0]
            );
          }
        }
      }

      // 3. Record Weekly History with Payment Date & Freight & Receipt Image
      const histId = `hist_${supplierId}_${Date.now()}`;
      await pool.query(
        `INSERT INTO weekly_history 
         (id, supplier_id, invoice_no, invoice_date, payment_date, freight, week_label, settled_date, payment_mode, total_bill, total_paid, due, status, items_json, receipt_image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [histId, supplierId, invoiceNo || '', invoiceDate || '', finalPaymentDate, freightVal, weekLabel, settledDate, paymentMode, totalBill, paidAmount, due, status, JSON.stringify(items), imgVal]
      );

      return res.json({ success: true, message: 'Weekly settlement saved to PostgreSQL' });
    } catch (err) {
      console.error('Error saving settlement:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // Local memory fallback
  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.invoiceNo = invoiceNo || '';
    sup.invoiceDate = invoiceDate || '';
    sup.paymentDate = finalPaymentDate;
    sup.freight = freightVal;
    sup.paidAmount = paidAmount || 0;
    sup.paymentMode = paymentMode || 'PhonePe / UPI';
    sup.items = items;
    if (imgVal) {
      sup.receiptImage = imgVal;
    }
    if (!sup.history) sup.history = [];
    const invKey = String(invoiceNo || '').trim().toLowerCase();
    const existingHistIdx = sup.history.findIndex(h => String(h.invoiceNo || '').trim().toLowerCase() === invKey);
    const prevImg = existingHistIdx >= 0 ? sup.history[existingHistIdx].receiptImage : '';
    const histEntry = {
      id: existingHistIdx >= 0 ? sup.history[existingHistIdx].id : `hist_${Date.now()}`,
      invoiceNo,
      invoiceDate,
      paymentDate: finalPaymentDate,
      freight: freightVal,
      weekLabel,
      settledDate,
      paymentMode,
      totalBill,
      totalPaid: paidAmount,
      due,
      status,
      receiptImage: imgVal || prevImg || sup.receiptImage || '',
      items
    };
    if (existingHistIdx >= 0) {
      sup.history[existingHistIdx] = histEntry;
    } else {
      sup.history.unshift(histEntry);
    }
    saveLocalSuppliers(localMemorySuppliers);
  }
  res.json({ success: true, message: 'Weekly settlement saved to memory' });
});

// 7. CLEAR CURRENT WEEK ENTRIES
app.post('/api/suppliers/:id/clear-week', async (req, res) => {
  const supplierId = req.params.id;

  if (pool) {
    try {
      await pool.query(
        'UPDATE suppliers SET paid_amount = 0 WHERE id = $1',
        [supplierId]
      );
      await pool.query(
        'UPDATE supplier_items SET rate_wo_gst = 0, total_amount = 0 WHERE supplier_id = $1',
        [supplierId]
      );
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.paidAmount = 0;
    sup.items.forEach(it => { it.rateWoGst = 0; it.totalAmount = 0; });
    saveLocalSuppliers(localMemorySuppliers);
  }
  res.json({ success: true });
});

// 8. DELETE SPECIFIC HISTORY RECORD
app.delete('/api/history/:id', async (req, res) => {
  const historyId = req.params.id;

  if (pool) {
    try {
      await pool.query('DELETE FROM weekly_history WHERE id = $1', [historyId]);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  localMemorySuppliers.forEach(sup => {
    if (sup.history) {
      sup.history = sup.history.filter(h => h.id !== historyId);
    }
  });
  saveLocalSuppliers(localMemorySuppliers);
  res.json({ success: true });
});

// 9. UPLOAD RECEIPT / MANUAL BILL PHOTO
app.post('/api/upload-receipt', async (req, res) => {
  try {
    const { supplierId, invoiceNo, imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    let ext = 'jpg';
    let buffer;
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const mime = matches[1].toLowerCase();
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const fileName = `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${fileName}`;

    if (supplierId) {
      const sup = localMemorySuppliers.find(s => s.id === supplierId);
      if (sup) {
        sup.receiptImage = publicUrl;
        if (invoiceNo && sup.history) {
          const invKey = String(invoiceNo).trim().toLowerCase();
          const h = sup.history.find(h => String(h.invoiceNo || '').trim().toLowerCase() === invKey);
          if (h) h.receiptImage = publicUrl;
        }
        saveLocalSuppliers(localMemorySuppliers);
      }

      if (pool) {
        try {
          await pool.query('UPDATE suppliers SET receipt_image = $1 WHERE id = $2', [publicUrl, supplierId]);
          if (invoiceNo) {
            await pool.query('UPDATE weekly_history SET receipt_image = $1 WHERE supplier_id = $2 AND invoice_no = $3', [publicUrl, supplierId, invoiceNo]);
          }
        } catch (dbErr) {
          console.error('Error updating receipt in PostgreSQL:', dbErr.message);
        }
      }
    }

    res.json({ success: true, imageUrl: publicUrl });
  } catch (err) {
    console.error('Error in /api/upload-receipt:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Kiryana Bahi Khata running on port ${PORT}`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
});
