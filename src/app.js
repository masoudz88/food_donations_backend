const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello Masoud!");
});

const fakeProducts = [
  { id: 1, product: "Meat" },
  { id: 2, product: "Dairy" },
  { id: 3, product: "cooked food" },
  { id: 4, product: "Seafood" },
];
const fakeCompanies = [
  { id: "1", name: "Sobeys", color: "green", image: "./logos/sobeys.png" },
  { id: "2", name: "Walmart", color: "blue", image: "./logos/wal.png" },
  { id: "3", name: "Costco", color: "red", image: "./logos/cost.png" },
  {
    id: "4",
    name: "McDonald's",
    color: "yellow",
    image: "./logos/McDonalds-Logo.png",
  },
];

app.get("/products", (req, res) => {
  res.send(JSON.stringify(fakeProducts));
});
app.get("/companies", (req, res) => {
  res.send(fakeCompanies);
});
app.get("/products/:id", (req, res) => {
  res.send(fakeProducts.find((p) => p.id === +req.params.id));
});
app.post("/products", function (req, res) {
  fakeProducts = [...fakeProducts, fakeCompanies];
  res.send(fakeCompanies);
});
app.put("/products/:id", (req, res) => {
  res.send({ msg: `Update product ${req.params.id}` });
});
app.delete("/products/:id", (req, res) => {
  res.send(fakeProducts.find((p) => p.id === +req.params.id));
  res.send(fakeProducts.filter((p) => p.id === +req.params.id));
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
