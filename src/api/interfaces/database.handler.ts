import { Pool } from "mysql";

export interface DatabaseHandlerInterface {
    getPool(): Pool;
}
