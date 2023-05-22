import { createPool, Pool, PoolConfig } from 'mysql';
import { DatabaseHandlerInterface } from '../../interfaces/database.handler';
import { DatabaseMysqlHandlerConstructorInterface } from '../../interfaces/database.mysql.handler.interface';
const util = require('util');

export class DatabaseMysqlHandler implements DatabaseHandlerInterface {
    private pool: Pool;
    constructor({ configService }: DatabaseMysqlHandlerConstructorInterface) {
        const config: PoolConfig = {
            host: configService.getConfig('DB_HOST'),
            user: configService.getConfig('DB_USER'),
            password: configService.getConfig('DB_PASSWORD'),
            database: configService.getConfig('DB_DATABASE'),
        };
        this.pool = createPool(config);

        this.pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused levanta el xamp.');
                }
            } else {
                console.log('Mysql database connected');
            }

            if (connection) connection.release();

            return;
        });

        this.pool.query = util.promisify(this.pool.query);
    }

    getPool(): any {
        return this.pool;
    }
}
