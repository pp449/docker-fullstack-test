const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'user2',
    password: '1234',
    database: 'myapp',
    port: 3307
});

exports.pool = pool;