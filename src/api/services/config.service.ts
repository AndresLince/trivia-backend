import dotenv from 'dotenv';

export class ConfigService {
    constructor() {
        dotenv.config();
    }
    getConfig(key: string): string {
        return process.env[ key ] || '';
    }
}
