const { Client } = require('pg');
const conn_string = require('./db_config');

async function product_crud(req_body, table_name) {
  let id = parseInt(req_body.id);
  let name = req_body.name;
  let price = parseInt(req_body.price);
  let amount = parseInt(req_body.amount);
  let shop_id = parseInt(req_body.shop_id);
  let btn = req_body.btn;

  //connect to database
  const client = new Client(conn_string);
  await client.connect(); 
  if (btn == "Update"){
    let query_string = {
      text: `UPDATE "${table_name}" SET name=$1, price=$2, amount=$3, shop_id=$4 WHERE id=$5`,
      values: [name, price, amount, shop_id, id],
    }
    await client.query(query_string)
    await client.end();
  }
  else if (btn == "Delete"){
    let query_string = {
      text: `DELETE FROM "${table_name}" WHERE id =$1`,
      values: [id],
    }
    await client.query(query_string)
    await client.end();
  } 
  else if (btn == "Create"){
    let query_string = {
      text: `INSERT INTO "${table_name}" VALUES ($1, $2, $3, $4, $5)`,
      values: [id, name, price, amount, shop_id],
    }
    await client.query(query_string)
    await client.end();
  }
}
module.exports = product_crud;