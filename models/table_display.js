var {Client}  = require('pg'); 
var conn_string = require('./db_config');

async function table_display(table_name, shop_name, shop_id) {
    // Connect to DB
    const client = new Client(conn_string);
    await client.connect(); 
    // Query to DB and get the products table 
    // const query_string = `SELECT * FROM ${table_name} WHERE shop=${shop_name}`;
    var query_string = `SELECT * FROM  "${table_name}" `; // all selected value=0
    if (shop_id != 0) {
        query_string = {
            text: `SELECT * FROM  "${table_name}" 
                WHERE shop = (SELECT name FROM shops WHERE id=$1)`,
            values: [shop_id],
        }    
    }
    if (shop_name != 'director') {
        query_string = {
            text: `SELECT * FROM  "${table_name}" WHERE shop=$1`,
            values: [shop_name],
        }
    }
    
    const query_result = await client.query(query_string);
    // Generate all cells of table for this data
    // console.log(query_result);
    let table_string = ``;
    if (shop_name == 'director') {
        table_string = table_html(query_result);
    } else {
        table_string = table_crud(query_result);
    }
    client.end();
    return table_string;
}


function table_html(db_table){
    let htlm_string = `<table border=1> <tr>`;
    const fields_list = [];
    // Generate the table header
    db_table.fields.forEach((field) => {
        htlm_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name);
    });
    htlm_string += `</tr>`;
    // Generate all table rows
    for (let i=0; i<db_table.rowCount; i++) {
        row = db_table.rows[i];
        htlm_string += `<tr>`;
        fields_list.forEach((field) => {
            let cell = row[field];
            htlm_string += `<td> ${cell} </td>`;
        });
        htlm_string += `</tr>`;
    }
    htlm_string += `</table>`;
    return htlm_string;
}

module.exports = table_display;