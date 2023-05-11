import { ConfigServiceInterface } from "../service/config.service.interface";

export interface CryptoHandlerInterface {
    encryptFields(arrayObjects: any[], field: string): void;
    encrypt(text: string): string;
    decrypt(hash: string): string;
}

export interface CryptoHandlerConstructorInterface{
    configService: ConfigServiceInterface
}
