import dotenv from 'dotenv';

export class ConfigService {
    constructor() {
        dotenv.config();
    }
    getConfig(key: string): any {
        return process.env[ key ];
    }
}
