// select_form.js
const { Client } = require('pg');
const conn_string = require('./db_config');

async function select_form(table_name, role) {
    const client = new Client(conn_string);
    await client.connect();
    const query_string = `SELECT * FROM "${table_name}"`;
    
    if (role === 'Admin') {
        // Customize the form for Admin
        // You can add specific form elements or change the SQL query here
    } else if (role === 'User') {
        // Customize the form for User
        // You can add different form elements or SQL queries here
    }

    let query_results = await client.query(query_string);
    let html_form = `<form action="" method="POST">
        <label for="shop_selected">Choose a shop:</label>
        <select name="shop_selected">
        <option value="0" selected> All </option>`;
    for (let i = 0; i < query_results.rowCount; i++) {
        let row = query_results.rows[i];
        html_form += `<option value="${row.id}">${row.name}</option>`;
    }
    html_form += `</select><input type="submit" value="Submit"></form>`;
    client.end();
    return html_form;
}

module.exports = select_form;
