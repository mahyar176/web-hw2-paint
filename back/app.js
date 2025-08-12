const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// GET /painting
app.get('/painting', async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  try {
    const result = await pool.query('SELECT * FROM paintings WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(403).send('Forbidden: Invalid credentials');
      }
    } else {
      res.status(403).send('Forbidden: User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /painting
app.post('/painting', async (req, res) => {
  console.log(req.body);
  const { username, password, painting } = req.body;

  if (!username || !password || painting === undefined) {
    return res.status(400).send('Username, password, and painting are required.');
  }

  try {
    const result = await pool.query('SELECT * FROM paintings WHERE username = $1', [username]);

    if (result.rows.length > 0) {
        const user = result.rows[0];
        if (user.password === password) {
            await pool.query('UPDATE paintings SET painting = $1 WHERE username = $2', [painting, username]);
            res.status(200).json(req.body);
        } else {
            res.status(403).send('Forbidden: Invalid credentials');
        }
    } else {
      res.status(403).send('Forbidden: User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
