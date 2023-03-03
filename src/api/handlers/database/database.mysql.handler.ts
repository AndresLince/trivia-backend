import { createPool, Pool } from 'mysql';
const util = require('util');
// Set database connection credentials
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
export class DatabaseMysqlHandler {
    private pool: Pool;
    constructor() {
        console.log("config:", config);
        this.pool = createPool(config);

        this.pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused levanta el xamp.')
                }
            } else {
                console.log('Mysql database connected')
            }

            if (connection) connection.release()

            return
        })

        this.pool.query = util.promisify(this.pool.query);
    }

    getPool(): Pool {
        return this.pool
    }
}