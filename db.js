const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', 
    host: 'junction.proxy.rlwy.net', 
    database: 'railway', 
    password: 'KPSzasnmOkMQNBbdGlpURNrkPZKgUsiw', 
    port: 49651, 
    ssl: {
        rejectUnauthorized: false, 
    },
});

module.exports = pool;