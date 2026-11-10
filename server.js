require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, initDatabase, SEED_SUPPLIERS } = require('./db');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Fallback in-memory storage if running locally without PostgreSQL
let localMemorySuppliers = JSON.parse(JSON.stringify(SEED_SUPPLIERS));

// Initialize Database on Startup
initDatabase();

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. GET ALL SUPPLIERS (WITH ITEMS & RECENT HISTORY)
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
            name: i.name,
            rate: parseFloat(i.rate) || 0,
            paid: parseFloat(i.paid) || 0
          }));

        const history = histResult.rows
          .filter(h => h.supplier_id === sup.id)
          .map(h => ({
            id: h.id,
            weekLabel: h.week_label,
            settledDate: h.settled_date,
            paymentMode: h.payment_mode,
            totalBill: parseFloat(h.total_bill) || 0,
            totalPaid: parseFloat(h.total_paid) || 0,
            due: parseFloat(h.due) || 0,
            status: h.status,
            items: h.items_json || []
          }));

        return {
          id: sup.id,
          name: sup.name,
          phone: sup.phone,
          settlementDay: sup.settlement_day,
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
  const { id, name, phone, settlementDay, items } = req.body;
  const supplierId = id || `sup_${Date.now()}`;

  if (pool) {
    try {
      await pool.query(
        'INSERT INTO suppliers (id, name, phone, settlement_day) VALUES ($1, $2, $3, $4)',
        [supplierId, name, phone, settlementDay]
      );

      if (items && items.length > 0) {
        for (const itm of items) {
          const itmId = itm.id || `itm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
          await pool.query(
            'INSERT INTO supplier_items (id, supplier_id, name, rate, paid) VALUES ($1, $2, $3, $4, $5)',
            [itmId, supplierId, itm.name, itm.rate || 0, itm.paid || 0]
          );
        }
      }

      return res.json({ success: true, id: supplierId });
    } catch (err) {
      console.error('Error inserting supplier:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // Local fallback
  localMemorySuppliers.push({ id: supplierId, name, phone, settlementDay, items: items || [], history: [] });
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
  res.json({ success: true, message: 'Supplier deleted from memory' });
});

// 4. ADD ITEM TO SUPPLIER
app.post('/api/suppliers/:id/items', async (req, res) => {
  const supplierId = req.params.id;
  const { name } = req.body;
  const itmId = `itm_${Date.now()}`;

  if (pool) {
    try {
      await pool.query(
        'INSERT INTO supplier_items (id, supplier_id, name, rate, paid) VALUES ($1, $2, $3, $4, $5)',
        [itmId, supplierId, name, 0, 0]
      );
      return res.json({ success: true, id: itmId });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.items.push({ id: itmId, name, rate: 0, paid: 0 });
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
  res.json({ success: true });
});

// 6. SAVE WEEKLY SETTLEMENT (UPDATE RATES, PAID, AND RECORD HISTORY)
app.post('/api/settlements', async (req, res) => {
  const { supplierId, weekLabel, settledDate, paymentMode, totalBill, totalPaid, due, status, items } = req.body;

  if (pool) {
    try {
      // 1. Update rates and paid for items
      if (items && Array.isArray(items)) {
        for (const itm of items) {
          await pool.query(
            'UPDATE supplier_items SET rate = $1, paid = $2 WHERE id = $3 AND supplier_id = $4',
            [itm.rate || 0, itm.paid || 0, itm.id, supplierId]
          );
        }
      }

      // 2. Upsert Weekly History entry
      const histId = `hist_${supplierId}_${Date.now()}`;
      await pool.query(
        `INSERT INTO weekly_history 
         (id, supplier_id, week_label, settled_date, payment_mode, total_bill, total_paid, due, status, items_json) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [histId, supplierId, weekLabel, settledDate, paymentMode, totalBill, totalPaid, due, status, JSON.stringify(items)]
      );

      return res.json({ success: true, message: 'Settlement saved to PostgreSQL' });
    } catch (err) {
      console.error('Error saving settlement:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // Local fallback
  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.items = items;
    if (!sup.history) sup.history = [];
    sup.history.unshift({
      id: `hist_${Date.now()}`,
      weekLabel,
      settledDate,
      paymentMode,
      totalBill,
      totalPaid,
      due,
      status,
      items
    });
  }
  res.json({ success: true, message: 'Settlement saved to memory' });
});

// 7. CLEAR CURRENT WEEK ENTRIES
app.post('/api/suppliers/:id/clear-week', async (req, res) => {
  const supplierId = req.params.id;

  if (pool) {
    try {
      await pool.query('UPDATE supplier_items SET rate = 0, paid = 0 WHERE supplier_id = $1', [supplierId]);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const sup = localMemorySuppliers.find(s => s.id === supplierId);
  if (sup) {
    sup.items.forEach(it => { it.rate = 0; it.paid = 0; });
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
  res.json({ success: true });
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
