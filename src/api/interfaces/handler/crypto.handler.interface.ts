import { ConfigServiceInterface } from "../service/config.service.interface";

export interface CryptoHandlerInterface {
    encryptFields: Function;
    encrypt: Function;
}

export interface CryptoHandlerConstructorInterface{
    configService: ConfigServiceInterface
}
