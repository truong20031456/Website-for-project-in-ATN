// Query for username and password in DB for authenticating
const {Client}  = require('pg'); 
const conn_string = require('./db_config');

async function authen(username, passwords){
    const client = new Client(conn_string);
    await client.connect(); 
    const query_string = {
        text: 'SELECT * FROM users WHERE username=$1 AND password=$2',
        values: [username, passwords],
    }
    const query_result = await client.query(query_string)
    await client.end();
    // console.log(query_result)
    if (query_result.rowCount == 1) {
        return query_result.rows[0];
    } 
    return null;
}

module.exports = authen;