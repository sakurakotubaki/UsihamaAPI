const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
// corsを使うと、クロスオリジンのエラーが出なくなる
app.use(cors());
// express.json()を使うと、req.bodyを使えるようになる
app.use(express.json());

// MySQLの接続情報
const db = mysql.createConnection({
  user: "root",// 作成したユーザー名
  host: "localhost",// host名
  password: "1234",// 作成したユーザーのパスワード
  database: "MyData",// 作成したデータベース名
  port: 3306, // MySQLのデフォルトポート
});

// データの追加
app.post("/shop", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;

  const query = "INSERT INTO shop (name, address) VALUES (?, ?)";
  db.query(query, [name, address], (err, result) => {  // addressを追加
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error inserting data into database" });
    } else {
      res.status(200).json({ message: "Value Inserted" });
    }
  });
});



// データの取得
app.get("/shop", (req, res) => {
  const query = "SELECT * FROM shop";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// 特定のデータの取得
app.get("/shop/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM shop WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// データの更新
app.put("/shop/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const id = req.params.id;
  const name = req.body.name;
  const address = req.body.address;  // これを追加

  const query = "UPDATE shop SET name = ?, address = ? WHERE id = ?";
  db.query(query, [name, address, id], (err, result) => {  // address と id の順番に注意
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data in database");
    } else {
      res.status(200).send("Value Updated");
    }
  });
});

// データの削除
app.delete("/shop/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM shop WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting data from database");
    } else {
      res.status(200).send("Value Deleted");
    }
  });
});
// サーバーの起動
const port = 3001;
app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);
});