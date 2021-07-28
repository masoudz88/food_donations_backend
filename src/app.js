const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const express = require("express");
const app = express();
const port = 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
(async () => {
  // open the database

  db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  await db.exec(`
  CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );  
  CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );      
  `);
})();

let fakeProducts = [
  { id: 1, name: "Meat" },
  { id: 2, name: "Dairy" },
  { id: 3, name: "cooked food" },
  { id: 4, name: "Seafood" },
];

let fakeCompanies = [
  { id: 1, name: "Sobeys" },
  { id: 2, name: "Walmart" },
  { id: 3, name: "Costco" },
  { id: 4, name: "McDonald's" },
];

//products

app.get("/api/products", async (req, res) => {
  res.send(await db.all("select * from product"));
});
app.get("/products/:id", async (req, res) => {
  res.send(await db.get("select * from product where id = ?", +req.params.id));
});
app.post("/products", async (req, res) => {
  res.send(await db.run("INSERT INTO product(name) VALUES(?)", req.body.name));
});
app.put("/products", async (req, res) => {
  res.json(
    await db.run("UPDATE product SET name = :name WHERE id = :id", {
      ":name": req.body.name,
      ":id": +req.body.id,
    })
  );
});
app.delete("/api/products/:id", async (req, res) => {
  res.send(await db.run("DELETE FROM product WHERE id = ?", +req.params.id));
});
//companies

app.get("/api/companies", async (req, res) => {
  res.send(await db.all("select * from company"));
});
app.get("/companies/:id", async (req, res) => {
  res.send(await db.get("select * from company where id = ?", +req.params.id));
});

app.post("/companies", async (req, res) => {
  res.send(await db.run("INSERT INTO company(name) VALUES(?)", req.body.name));
});

app.put("/companies", async (req, res) => {
  res.json(
    await db.run("UPDATE company SET name = :name WHERE id = :id", {
      ":name": req.body.name,
      ":id": +req.body.id,
    })
  );
});

app.delete("api//companies/:id", async (req, res) => {
  res.send(await db.run("DELETE FROM company WHERE id = ?", +req.params.id));
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
