// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'table_sprint'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

//Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    });
  });
  

// Fetch categories
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete category
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categories WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Add a new category
app.post('/api/addCategory', (req, res) => {
    const { name, image, status, sequence } = req.body;
    const sql = 'INSERT INTO categories (name, image, status, sequence) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [name, image, status, sequence], (err, results) => {
      if (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ success: false, message: 'Error adding category' });
        return;
      }
      res.json({ success: true });
    });
  });
  

  // Get a specific category
app.get('/api/category/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categories WHERE id = ?';
    
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Error fetching category:', err);
        res.status(500).json({ message: 'Error fetching category' });
        return;
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    });
  });

  // Update a category
app.put('/api/update-category/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, status, sequence } = req.body;
    const sql = 'UPDATE categories SET name = ?, image = ?, status = ?, sequence = ? WHERE id = ?';
    
    db.query(sql, [name, image, status, sequence, id], (err, results) => {
      if (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ success: false, message: 'Error updating category' });
        return;
      }
      res.json({ success: true });
    });
  });



// Fetch all subcategories
// app.get('/api/subcategories', (req, res) => {
//     db.query('SELECT * FROM subcategories', (error, results) => {
//       if (error) throw error;
//       res.json(results);
//     });
//   });
  
  // Fetch a single subcategory
  app.get('/api/subcategory/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM subcategories WHERE id = ?', [id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  });
  
  // Add a new subcategory
  app.post('/api/add-subcategory', (req, res) => {
    const { name, categoryId, image, status, sequence } = req.body;
    db.query('INSERT INTO subcategories (name, category_id, image, status, sequence) VALUES (?, ?, ?, ?, ?)',
      [name, categoryId, image, status, sequence], (error, results) => {
        if (error) throw error;
        res.json({ success: true, message: 'SubCategory added successfully' });
      });
  });
  
  // Update an existing subcategory
  app.put('/api/editsubcategory/:id', (req, res) => {
    const id = req.params.id;
    const { name, categoryId, image, status, sequence } = req.body;
    db.query('UPDATE subcategories SET name = ?, category_id = ?, image = ?, status = ?, sequence = ? WHERE id = ?',
      [name, categoryId, image, status, sequence, id], (error, results) => {
        if (error) throw error;
        res.json({ success: true, message: 'SubCategory updated successfully' });
      });
  });
  
  // Delete a subcategory
  app.delete('/api/delete-subcategory/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM subcategories WHERE id = ?', [id], (error, results) => {
      if (error) throw error;
      res.json({ success: true, message: 'SubCategory deleted successfully' });
    });
  });

  // Fetch all subcategories with category names
app.get('/api/subcategories', (req, res) => {
  const query = `
    SELECT subcategories.id, subcategories.name, subcategories.category_id, categories.name AS category_name, subcategories.image, subcategories.status, subcategories.sequence
    FROM subcategories
    JOIN categories ON subcategories.category_id = categories.id
  `;
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//Prodcut Component END-POINTS
// Fetch all products with subcategory and category names
app.get('/api/products/', (req, res) => {
  const query = `
    SELECT products.id, products.name, products.image, products.status, subcategories.name AS subcategory_name, categories.name AS category_name
    FROM products
    JOIN subcategories ON products.subcategory_id = subcategories.id
    JOIN categories ON products.category_id = categories.id
  `;
  db.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

  // Fetch a single product
  app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  });

// Add a new product
app.post('/api/add-product', (req, res) => {
  const { name, subcategory_id, category_id, image, status } = req.body;
  const query = 'INSERT INTO products (name, subcategory_id, category_id, image, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, subcategory_id, category_id, image, status], (error, results) => {
    if (error) throw error;
    res.json({ success: true, id: results.insertId });
  });
});

// Delete a product
app.delete('/api/delete-product/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) throw error;
    res.json({ success: true });
  });
});

// Edit a product
app.put('/api/edit-product/:id', (req, res) => {
  const { id } = req.params;
  const { name, subcategory_id, category_id, image, status } = req.body;
  const query = 'UPDATE products SET name = ?, subcategory_id = ?, category_id = ?, image = ?, status = ? WHERE id = ?';
  db.query(query, [name, subcategory_id, category_id, image, status, id], (error, results) => {
    if (error) throw error;
    res.json({ success: true });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
