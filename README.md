# Node.js + MySQL REST API
Node.jsとMySQLを使ったREST APIのサンプルです。

## 使い方
Macの人は、homebrewでMySQLをインストールしてください。
```bash
brew install mysql
```

shopテーブルという自動連番のIDとタイムスタンプがあるテーブルを作成します。

shopテーブルを作成します。
```sql
--テーブル作成。Timestampは入力されなかったら自動で挿入される--
CREATE TABLE shop (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

--テーブルの構造を確認--
DESC shop;

---データ挿入---
INSERT INTO shop (name, address) VALUES ('test1', 'address1');
INSERT INTO shop (name, address) VALUES ('test2', 'address2');
INSERT INTO shop (name, address) VALUES ('test3', 'address3');

--データを取得--
SELECT * FROM shop LIMIT 3;
--id1を取得--
SELECT * FROM shop WHERE id = 1;
--id5とid6のデータを削除
DELETE FROM shop WHERE id = 5 OR id = 6;
```