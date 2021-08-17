const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore(),
    cookie: { secure: true, maxAge: 1000 * 60 * 24 },
  })
);

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
    company_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (company_id)
       REFERENCES company (id)
       ON UPDATE CASCADE
       ON DELETE CASCADE
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
  console.log(req.query);
  if (req.query.companyId !== undefined) {
    res.send(await db.all("select * from product where company_id = ?", +req.query.companyId));
  } else {
    res.send(await db.all("select * from product"));
  }
});
app.get("/api/products/:id", async (req, res) => {
  res.send(await db.get("select * from product where id = ?", +req.params.id));
});
app.post("/api/products", async (req, res) => {
  res.send(await db.run("INSERT INTO product(name, company_id) VALUES(:name, :company_id)", {
    ":name": req.body.name,
    ":company_id": +req.body.companyId,
  }));
});
app.put("/api/products/:id", async (req, res) => {
  res.json(
    await db.run("UPDATE product SET name = :name WHERE id = :id", {
      ":name": req.body.name,
      ":id": req.params.id,
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

app.put("/api/companies/:id", async (req, res) => {
  res.json(
    await db.run("UPDATE company SET name = :name WHERE id = :id", {
      ":name": req.body.name,
      ":id": req.params.id,
    })
  );
});

app.delete("/api/companies/:id", async (req, res) => {
  res.send(await db.run("DELETE FROM company WHERE id = ?", +req.params.id));
});
//users
app.get("/api/users", async (req, res) => {
  // ensure that you do not send passwords to everyone
  res.send(await db.all("select * from user"));
});
app.post("/api/users", async (req, res) => {
  res.send(
    await db.run(
      "INSERT INTO user(name,password) VALUES(:name, :password)",
      {
        ":name", req.body.name,
        ":password", req.body.password // ensure you use bcrypt to hash the password
      }
    )
  );
});
app.put("/api/users", async (req, res) => {
  // make sure that the user is currently logged in as the user they are about to modify
  res.json(
    await db.run("UPDATE user SET password = :password WHERE name = :name", {
      ":name": req.body.name,
      ":password": req.body.password,
    })
  );
});

//login
app.post("/api/login", (req, res) => {
  // ensure that the name and password are correct based on the person they are trying to log in as

  if (req.body.name) {
    req.session.name = req.body.name;
    res.status(200).send(`you have logged in as ${req.body.name}`);
    return;
  }
  
  res.status(400).send(`name is required`);
});
//logout
app.get("/api/logout", function (req, res) {
  // destroy the session
  res.send("logout page ...");
});
//who am i
app.get("/api/whoami", function (req, res) {
  // send the user their req.session.name

  // if the user is not currently logged in, return 404

  res.send("your name is here");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
