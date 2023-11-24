const {Client}  = require('pg'); 
const conn_string = require('./db_config');

async function select_form(id) {
    //Query DB to get all shop
    const client = new Client(conn_string);
    await client.connect(); 
    const query_string = `SELECT * FROM products`;
    let query_data = await client.query(query_string);

    let html_form = `
    <form action="" method="post">
    <label for="shop_id">Choose a shop:</label>
    <select name="shop_id" >`
    html_form+=`<option value=0>All Shop</option>`
    for(var i=0;i<query_data.rows.length;i++)
    {
            if (id==query_data.rows[i].id )
            html_form+=`<option value=${query_data.rows[i].id} selected>${query_data.rows[i].name}</option>`
            else
            html_form+=`<option value=${query_data.rows[i].id}>${query_data.rows[i].name}</option>`

    }
    html_form += `</select><input type="submit" value="Submit"></form>`;
    client.end();
    return html_form;
}

module.exports = select_form;