const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  const data = req.body.data;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.age, data.country, data.position, data.wage],
    (err, _result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted!");
        console.log("Post Success");
      }
    }
  );
});

app.get("/get", (_req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM employees WHERE id = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted successfully");
      res.send(result);
    }
  });
});

app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/put/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  db.query(
    "UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?",
    [data.name, data.age, data.country, data.position, data.wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated successfully");
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yayy, running on port 3001");
});
