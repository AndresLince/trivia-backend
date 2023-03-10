import dotenv from 'dotenv';

export class ConfigService {
    constructor() {
        dotenv.config();
    }
    getConfig(key: string): undefined | string {
        return process.env[ key ] || '';
    }
}
