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
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    FOREIGN KEY (id)
       REFERENCES company (id)
  );  
  CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  ); 
  CREATE TABLE IF NOT EXISTS user (    
    name TEXT NOT NULL PRIMARY KEY,
    password TEXT NOT NULL
  );   
  `);
})();
//products

app.get("/api/products", async (req, res) => {
  res.send(await db.all("select * from product"));
});
app.get("/api/products/:id", async (req, res) => {
  res.send(await db.get("select * from product where id = ?", +req.params.id));
});
app.post("/api/products", async (req, res) => {
  res.send(await db.run("INSERT INTO product(name) VALUES(?)", req.body.name));
});
app.put("/api/products", async (req, res) => {
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
app.get("/api/companies/:id", async (req, res) => {
  res.send(await db.get("select * from company where id = ?", +req.params.id));
});

app.post("/api/companies", async (req, res) => {
  res.send(await db.run("INSERT INTO company(name) VALUES(?)", req.body.name));
});

app.put("/api/companies", async (req, res) => {
  res.json(
    await db.run("UPDATE company SET name = :name WHERE id = :id", {
      ":name": req.body.name,
      ":id": +req.body.id,
    })
  );
});

app.delete("/api/companies/:id", async (req, res) => {
  res.send(await db.run("DELETE FROM company WHERE id = ?", +req.params.id));
});
//users
app.get("/api/users", async (req, res) => {
  res.send(await db.all("select * from user"));
});
app.post("/api/users", async (req, res) => {
  res.send(
    await db.run(
      "INSERT INTO user(name,password) VALUES(?)",
      req.body.name,
      req.body.password
    )
  );
});
app.put("/api/users", async (req, res) => {
  res.json(
    await db.run("UPDATE user SET password = :password WHERE name = :name", {
      ":name": req.body.name,
      ":password": req.body.password,
    })
  );
});

//login
app.all("/api/users/login", function (req, res, next) {
  res.send("log in page ...");
  next(); // pass control to the next handler
});
//logout
app.all("/api/users/logout", function (req, res, next) {
  res.send("logout page ...");
  next();
});
//who am i
app.all("/api/users/whoami", function (req, res, next) {
  res.send("your name is here");
  next();
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
