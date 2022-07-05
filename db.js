const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Pradeep@1234",
        database:"jwt_login_signup"
    }
})


knex.schema.createTable('customers',table =>{
    table.increments('id').primary();
    table.string('username');
    table.string('email');
    table.string('password');
    table.integer('phone');
})

.then((data) =>{
    console.log("table created successfully ");
})

.catch(err =>{
    // console.log(err.message);
})

module.exports = knex;