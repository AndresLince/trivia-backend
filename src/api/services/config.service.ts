import dotenv from 'dotenv';
import { ConfigServiceInterface } from '../interfaces/service/config.service.interface';

export class ConfigService implements ConfigServiceInterface {
    constructor() {
        dotenv.config();
    }
    getConfig(key: string): string {
        return process.env[ key ] || '';
    }
}
