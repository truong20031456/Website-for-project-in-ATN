const { Client } = require('pg');
const conn_string = require('./db_config');

async function admin_crud(req_body, table_name) {
  let id = parseInt(req_body.id);
  let username = req_body.username;
  let password = req_body.password;
  let role = req_body.role;
  let department_id = parseInt(req_body.department_id);
  let btn = req_body.btn;

  //connect to database
  const client = new Client(conn_string);
  await client.connect(); 
  if (btn == "Update"){
    let query_string = {
      text: `UPDATE "${table_name}" SET username=$1, password=$2, role=$3, department_id=$4 WHERE id=$5`,
      values: [username, password, role, department_id, id],
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
      values: [id, username, password, role, department_id],
    }
    await client.query(query_string)
    await client.end();
  }
}
module.exports = admin_crud;