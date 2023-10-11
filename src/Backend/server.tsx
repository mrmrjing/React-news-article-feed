import express, { Request, Response } from 'express';
import mysql, { Pool, OkPacket, RowDataPacket } from 'mysql2';

const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool: Pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
});

// Define a route to handle JSON parsing
app.use(express.json());

// Create an article
app.post('/articles', (req: Request, res: Response) => {
  const { title, summary, date, publisher } = req.body;

  // SQL query to insert a new article into the database
  const insertQuery = 'INSERT INTO articles (title, summary, date, publisher) VALUES (?, ?, ?, ?)';

  // Values to be inserted into the query
  const values = [title, summary, date, publisher];

  pool.query(insertQuery, values, (error, results: OkPacket) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not create article' });
    } else {
      const insertedArticle = {
        id: results.insertId, // Assuming you have an auto-increment primary key
        title,
        summary,
        date,
        publisher,
      };
      res.status(201).json(insertedArticle);
    }
  });
});

// Get all articles
app.get('/articles', (req: Request, res: Response) => {
  // SQL query to fetch all articles from the database
  const selectQuery = 'SELECT * FROM articles';

  pool.query(selectQuery, (error, results: RowDataPacket[]) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch articles' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
