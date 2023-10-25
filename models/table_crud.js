var {Client}  = require('pg'); 
var conn_string = require('./db_config');

async function table_crud(table_name, role, department_id) {
    // Connect to DB
    const client = new Client(conn_string);
    await client.connect(); 
    // Query to DB and get the products table 
    if (role == 'admin') 
    {
        query_string = `SELECT * FROM ${table_name}`;
    } else if ( role == 'staff')
    {
        query_string = {
            text: `SELECT * FROM  "${table_name}" WHERE shop_id=$1`,
            values: [department_id],
        }   
    }

    const query_result = await client.query(query_string);
    // Generate all cells of table for this data
    // console.log(query_result);
    let table_string = table_display(query_result);
    client.end();
    return table_string;

}



function table_display(db_table){
    let htlm_string = `<table border=1> <tr>`;
    const fields_list = [];
    // Generate the table header
    db_table.fields.forEach((field) => {
        htlm_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name);
    });
    // Add CRUD in header
    htlm_string += `<th> CRUD </th></tr>`;
    // Generate all table rows
    for (let i=0; i<db_table.rowCount; i++) {
        row = db_table.rows[i];
        htlm_string += `<tr><form action="/users/crud" method=POST>`;
        fields_list.forEach((field) => {
            let cell = row[field];
            htlm_string += `<td><input type="text" name=${field} value=${cell}></td>`;
        });
        // Add 02 button into the CRUD cell
        htlm_string += `<td><input type="submit" name="btn" value="Update">
                            <input type="submit" name="btn" value="Delete">
                        </td></form></tr>`;
    }
    // Add an INSERT row
    htlm_string += `<tr><form action="/users/crud" method=POST>`
    fields_list.forEach((field) => {
        htlm_string += `<td><input type="text" name=${field}></td>`;
    });
    // Add button Insert
    htlm_string += `<td><input type="submit" name="btn" value="Create"></td></form></tr>`;
    htlm_string += `</table>`;
    return htlm_string;
}

module.exports = table_crud;