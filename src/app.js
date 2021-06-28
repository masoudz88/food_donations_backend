const { response } = require("express");
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
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

let bodyParser = require("body-parser");
app.use(bodyParser.json());

let products = [];

app.post("/products", function (req, res) {
  const newProduct = { ...req.body, id: products.length + 1 };
  products = [...products, newProduct];
  res.json(newProduct);
});

app.put("/products", function (req, res) {
  // implement
});

app.delete("/products/:id", function (req, res) {
  // implement
});

app.get("/products", (req, res) => {
  res.json(products);
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

console.log("here");
const debug = require("debug")("app");
debug(" through debugger");
