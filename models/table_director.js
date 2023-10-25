var {Client} = require('pg');
var conn_string = require('./db_config');

async function table_director(table_name) {
    // Connect to DB
    const client = new Client(conn_string);
    await client.connect(); 
    // Query to DB and get the products table 
    const query_string = `SELECT * FROM "${table_name}"`;
    const query_result = await client.query(query_string);
    let table_string = table_display(query_result);
    client.end();
    return table_string;
}

function table_display(db_table){
    let html_string = `<table border> <tr>`;
    const fields_list = [];
    //Genrate the table header
    db_table.fields.forEach((field) => {
        html_string += `<th> ${field.name} </th>`;
        fields_list.push(field.name)
    })
    html_string += '</tr>';
    
    //Genrate all table rows
    for (let i = 0; i < db_table.rowCount; i++) {
        row = db_table.rows[i];
        html_string += '<tr>';
        fields_list.forEach((field) => {
            let cell = row[field];
            html_string += `<td>${cell}</td>`;
        })
        html_string += '</tr>';
    }
    html_string += `</table>`;
    return html_string
    
}


module.exports = table_director;