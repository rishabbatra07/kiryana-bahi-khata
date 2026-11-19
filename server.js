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

// ==========================================
// DAILY RATE LIST PERSISTENCE
// ==========================================
const RATE_FILE = path.join(__dirname, 'data', 'rate_list.json');

function loadLocalRates() {
  if (fs.existsSync(RATE_FILE)) {
    try {
      const content = fs.readFileSync(RATE_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(r => ({
          ...r,
          buyRate: parseFloat(r.buyRate) || 0,
          prevBuyRate: parseFloat(r.prevBuyRate) !== undefined ? parseFloat(r.prevBuyRate) : parseFloat(r.buyRate) || 0,
          sellRate: parseFloat(r.sellRate) || 0,
          prevSellRate: parseFloat(r.prevSellRate) !== undefined ? parseFloat(r.prevSellRate) : parseFloat(r.sellRate) || 0
        }));
      }
    } catch (e) {
      console.error('Error reading rate_list.json:', e);
    }
  }
  return [];
}

function saveLocalRates(data) {
  try {
    fs.writeFileSync(RATE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving rate_list.json:', e);
  }
}

let localMemoryRates = loadLocalRates();

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

// ==========================================
// 10. DAILY COMMODITY & ITEM RATE LIST APIS
// ==========================================

// GET ALL DAILY RATES
app.get('/api/rates', async (req, res) => {
  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM daily_rate_list ORDER BY category ASC, name ASC');
      if (result.rows && result.rows.length > 0) {
        const rates = result.rows.map(r => ({
          id: r.id,
          name: r.name,
          hindiName: r.hindi_name || '',
          category: r.category || 'अन्य किराना',
          unit: r.unit || '1',
          buyRate: parseFloat(r.buy_rate) || 0,
          prevBuyRate: parseFloat(r.prev_buy_rate) || parseFloat(r.buy_rate) || 0,
          sellRate: parseFloat(r.sell_rate) || 0,
          prevSellRate: parseFloat(r.prev_sell_rate) || parseFloat(r.sell_rate) || 0,
          supplierName: r.supplier_name || '',
          hsnCode: r.hsn_code || '',
          lastUpdated: r.last_updated || '',
          notes: r.notes || ''
        }));
        return res.json({ success: true, source: 'postgresql', data: rates });
      }
    } catch (err) {
      console.error('Error fetching rates from DB:', err.message);
    }
  }

  // Memory / disk fallback
  res.json({ success: true, source: 'local_disk', data: localMemoryRates });
});

// CREATE / UPDATE SINGLE RATE ITEM
app.post('/api/rates', async (req, res) => {
  try {
    const { 
      id, 
      name, 
      hindiName, 
      category, 
      unit, 
      buyRate, 
      prevBuyRate, 
      sellRate, 
      prevSellRate, 
      supplierName, 
      hsnCode, 
      lastUpdated, 
      notes 
    } = req.body;

    const rateId = id || `rate_${Date.now()}`;
    const todayStr = lastUpdated || new Date().toISOString().split('T')[0];
    const buyVal = parseFloat(buyRate) || 0;
    const sellVal = parseFloat(sellRate) || 0;

    let pBuy = prevBuyRate !== undefined ? parseFloat(prevBuyRate) : buyVal;
    let pSell = prevSellRate !== undefined ? parseFloat(prevSellRate) : sellVal;

    // Check existing in memory to track previous day's price shift
    const existingIdx = localMemoryRates.findIndex(r => r.id === rateId);
    if (existingIdx >= 0) {
      const old = localMemoryRates[existingIdx];
      if (buyVal !== old.buyRate) {
        pBuy = old.buyRate;
      }
      if (sellVal !== old.sellRate) {
        pSell = old.sellRate;
      }
      localMemoryRates[existingIdx] = {
        ...old,
        name: name || old.name,
        hindiName: hindiName !== undefined ? hindiName : old.hindiName,
        category: category || old.category,
        unit: unit || old.unit,
        buyRate: buyVal,
        prevBuyRate: pBuy,
        sellRate: sellVal,
        prevSellRate: pSell,
        supplierName: supplierName !== undefined ? supplierName : old.supplierName,
        hsnCode: hsnCode !== undefined ? hsnCode : old.hsnCode,
        lastUpdated: todayStr,
        notes: notes !== undefined ? notes : old.notes
      };
    } else {
      localMemoryRates.push({
        id: rateId,
        name,
        hindiName: hindiName || '',
        category: category || 'अन्य किराना',
        unit: unit || '1',
        buyRate: buyVal,
        prevBuyRate: pBuy,
        sellRate: sellVal,
        prevSellRate: pSell,
        supplierName: supplierName || '',
        hsnCode: hsnCode || '',
        lastUpdated: todayStr,
        notes: notes || ''
      });
    }

    saveLocalRates(localMemoryRates);

    if (pool) {
      try {
        await pool.query(
          `INSERT INTO daily_rate_list 
           (id, name, hindi_name, category, unit, buy_rate, prev_buy_rate, sell_rate, prev_sell_rate, supplier_name, hsn_code, last_updated, notes) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO UPDATE SET
             name = EXCLUDED.name,
             hindi_name = EXCLUDED.hindi_name,
             category = EXCLUDED.category,
             unit = EXCLUDED.unit,
             buy_rate = EXCLUDED.buy_rate,
             prev_buy_rate = EXCLUDED.prev_buy_rate,
             sell_rate = EXCLUDED.sell_rate,
             prev_sell_rate = EXCLUDED.prev_sell_rate,
             supplier_name = EXCLUDED.supplier_name,
             hsn_code = EXCLUDED.hsn_code,
             last_updated = EXCLUDED.last_updated,
             notes = EXCLUDED.notes`,
          [rateId, name, hindiName || '', category || 'अन्य किराना', unit || '1', buyVal, pBuy, sellVal, pSell, supplierName || '', hsnCode || '', todayStr, notes || '']
        );
      } catch (dbErr) {
        console.error('Error saving rate to DB:', dbErr.message);
      }
    }

    res.json({ success: true, id: rateId, data: localMemoryRates });
  } catch (err) {
    console.error('Error in POST /api/rates:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// BULK UPDATE DAILY RATES (Quick Daily Morning Revision)
app.post('/api/rates/bulk', async (req, res) => {
  try {
    const { rates } = req.body;
    if (!Array.isArray(rates) || rates.length === 0) {
      return res.status(400).json({ error: 'No rates array provided' });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    rates.forEach(item => {
      const idx = localMemoryRates.findIndex(r => r.id === item.id);
      const buyVal = parseFloat(item.buyRate) || 0;
      const sellVal = parseFloat(item.sellRate) || 0;

      if (idx >= 0) {
        const old = localMemoryRates[idx];
        const pBuy = (buyVal !== old.buyRate) ? old.buyRate : (old.prevBuyRate || old.buyRate);
        const pSell = (sellVal !== old.sellRate) ? old.sellRate : (old.prevSellRate || old.sellRate);

        localMemoryRates[idx] = {
          ...old,
          buyRate: buyVal,
          prevBuyRate: pBuy,
          sellRate: sellVal,
          prevSellRate: pSell,
          notes: item.notes !== undefined ? item.notes : old.notes,
          lastUpdated: todayStr
        };

        if (pool) {
          pool.query(
            `UPDATE daily_rate_list 
             SET buy_rate = $1, prev_buy_rate = $2, sell_rate = $3, prev_sell_rate = $4, notes = $5, last_updated = $6 
             WHERE id = $7`,
            [buyVal, pBuy, sellVal, pSell, item.notes || old.notes || '', todayStr, item.id]
          ).catch(e => console.error('Bulk update DB error:', e.message));
        }
      }
    });

    saveLocalRates(localMemoryRates);
    res.json({ success: true, count: rates.length, data: localMemoryRates });
  } catch (err) {
    console.error('Error in /api/rates/bulk:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// AUTO-SYNC LATEST BUY RATES FROM SUPPLIER BILLS
app.post('/api/rates/sync-suppliers', async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    let syncedCount = 0;

    localMemorySuppliers.forEach(sup => {
      (sup.items || []).forEach(itm => {
        const effectiveRate = parseFloat(itm.rateWithGst) || parseFloat(itm.rateWoGst) || 0;
        if (effectiveRate <= 0) return;

        // Try to match existing rate item
        const itmDesc = String(itm.description || '').toLowerCase().trim();
        const existing = localMemoryRates.find(r => {
          const rName = String(r.name || '').toLowerCase();
          const rHindi = String(r.hindiName || '').toLowerCase();
          return rName.includes(itmDesc) || itmDesc.includes(rName) || (rHindi && (rHindi.includes(itmDesc) || itmDesc.includes(rHindi)));
        });

        if (existing) {
          if (existing.buyRate !== effectiveRate) {
            existing.prevBuyRate = existing.buyRate;
            existing.buyRate = effectiveRate;
            existing.lastUpdated = todayStr;
            existing.supplierName = sup.name;
            if (existing.sellRate < effectiveRate) {
              existing.sellRate = Math.round(effectiveRate * 1.06); // 6% default margin if lower
            }
            syncedCount++;
          }
        } else {
          // Add new item into rate list
          const newRate = {
            id: `rate_sync_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            name: itm.description,
            hindiName: itm.description,
            category: 'अन्य किराना',
            unit: itm.quantity || '1',
            buyRate: effectiveRate,
            prevBuyRate: effectiveRate,
            sellRate: Math.round(effectiveRate * 1.06),
            prevSellRate: Math.round(effectiveRate * 1.06),
            supplierName: sup.name,
            hsnCode: itm.hsnCode || '',
            lastUpdated: todayStr,
            notes: `सप्लायर बिल से जोड़ा गया (${sup.name})`
          };
          localMemoryRates.push(newRate);
          syncedCount++;
        }
      });
    });

    saveLocalRates(localMemoryRates);
    res.json({ success: true, syncedCount, data: localMemoryRates });
  } catch (err) {
    console.error('Error syncing rates from suppliers:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE RATE ITEM
app.delete('/api/rates/:id', async (req, res) => {
  const rateId = req.params.id;
  localMemoryRates = localMemoryRates.filter(r => r.id !== rateId);
  saveLocalRates(localMemoryRates);

  if (pool) {
    try {
      await pool.query('DELETE FROM daily_rate_list WHERE id = $1', [rateId]);
    } catch (e) {
      console.error('DB delete rate error:', e.message);
    }
  }

  res.json({ success: true, id: rateId });
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
