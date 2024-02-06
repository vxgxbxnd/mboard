import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const { DATABASE_URL, PORT } = process.env;
const app = express();
const client = new pg.Client({ connectionString: DATABASE_URL });

await client.connect();

app.use(cors());
app.use(express.json());

app.get("/mboard", getPosts);
app.post("/mboard", postEntry);

async function getPosts(_, res, next) {
  try {
    const response = await client.query("SELECT * FROM mb ORDER BY id DESC");
    const data = await response;
    res.send(data.rows);
  } catch (error) {
    next(error);
  }
}

async function postEntry(req, res, next) {
  try {
    const { username, entry } = req.body;
    await client.query(
      `INSERT INTO mb (username, entry, entry_time) VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [username, entry]
    );
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
}

app.use((_, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
  throw err;
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
