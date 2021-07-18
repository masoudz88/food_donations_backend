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
    INSERT INTO product(name) VALUES("meat"),('Dairy')
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

app.get("/products", async (req, res) => {
  res.send(await db.all("select * from product"));
});
app.get("/products/:id", async (req, res) => {
  res.send(await db.get("select * from product where id = ?", +req.params.id));
});

app.post("/products", function (req, res) {
  // const newProduct = { ...req.body, id: fakeProducts.length + 1 };
  // fakeProducts = [...fakeProducts, newProduct];
  let languages = ["C++", "Python", "Java", "C#", "Go"];

  // construct the insert statement with multiple placeholders
  // based on the number of rows
  let placeholders = languages.map((language) => "(?)").join(",");
  let sql = "INSERT INTO product(name) VALUES " + placeholders;

  // output the INSERT statement
  console.log(sql);
  res.send(
    db.run(sql, languages, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);
    })
  );
});

app.put("/products", (req, res) => {
  let updatedProduct;
  fakeProducts = fakeProducts.map((p) => {
    if (p.id === req.body.id) {
      updatedProduct = { ...p, ...req.body };
      return updatedProduct;
    }
    return p;
  });
  res.json(updatedProduct);
});

app.delete("/products/:id", (req, res) => {
  const deletedProduct = fakeProducts.find((p) => p.id === +req.params.id);
  fakeProducts = fakeProducts.filter((p) => p.id !== +req.params.id);
  res.send(deletedProduct);
});

//companies

app.get("/companies", async (req, res) => {
  res.send(fakeCompanies);
});
app.get("/companies/:id", async (req, res) => {
  res.send(fakeCompanies.find((c) => c.id === +req.params.id));
});

app.post("/companies", function (req, res) {
  const newCompany = { ...req.body, id: fakeCompanies.length + 1 };
  fakeCompanies = [...fakeCompanies, newCompany];
  res.send(newCompany);
});

app.put("/companies", (req, res) => {
  let updatedCompany;
  fakeCompanies = fakeCompanies.map((c) => {
    if (c.id === req.body.id) {
      updatedCompany = { ...c, ...req.body };
      return updatedCompany;
    }
    return c;
  });
  res.json(updatedCompany);
});

app.delete("/companies/:id", (req, res) => {
  const deletedCompany = fakeCompanies.find((c) => c.id === +req.params.id);
  fakeCompanies = fakeCompanies.filter((c) => c.id !== +req.params.id);
  res.send(deletedCompany);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
