import { createCipheriv } from 'crypto';
import { CryptoHandlerConstructorInterface, CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { ConfigServiceInterface } from '../interfaces/service/config.service.interface';

export class CryptoHandler implements CryptoHandlerInterface {
    private configService: ConfigServiceInterface;
    constructor({ configService }: CryptoHandlerConstructorInterface) {
        this.configService = configService;
    }
    encryptFields(arrayObjects: any[], field: string){
        arrayObjects.forEach((element) => {
            if (element[field]) {
                element[field] = this.encrypt(element[field].toString());
            }
        });
    };
    encrypt(text: string){
        const cipher = createCipheriv(
            this.configService.getConfig('CRYPTO_ALGORITHM'),
            this.configService.getConfig('CRYPTO_SECRET_KEY'),
            this.configService.getConfig('CRYPTO_IV'),
        );

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return encrypted.toString('hex');
    };
}
