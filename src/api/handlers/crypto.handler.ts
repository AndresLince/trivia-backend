import { createCipheriv, createDecipheriv } from 'crypto';
import { CryptoHandlerConstructorInterface, CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { ConfigServiceInterface } from '../interfaces/service/config.service.interface';

export class CryptoHandler implements CryptoHandlerInterface {
    private configService: ConfigServiceInterface;
    private algorithm: string;
    private secretKey: string;
    private iv: string;
    constructor({ configService }: CryptoHandlerConstructorInterface) {
        this.configService = configService;
        this.algorithm = this.configService.getConfig('CRYPTO_ALGORITHM');
        this.secretKey = this.configService.getConfig('CRYPTO_SECRET_KEY');
        this.iv = this.configService.getConfig('CRYPTO_IV');
    }
    encryptFields(arrayObjects: any[], field: string) {
        arrayObjects.forEach((element) => {
            if (element[ field ]) {
                element[ field ] = this.encrypt(element[ field ].toString());
            }
        });
    }
    encrypt(text: string) {
        const cipher = createCipheriv(
            this.configService.getConfig('CRYPTO_ALGORITHM'),
            this.configService.getConfig('CRYPTO_SECRET_KEY'),
            this.configService.getConfig('CRYPTO_IV'),
        );

        const encrypted = Buffer.concat([ cipher.update(text), cipher.final() ]);

        return encrypted.toString('hex');
    }
    decrypt(hash: string): string {
        const decipher = createDecipheriv(this.algorithm, this.secretKey, this.iv);
        const decrpyted = Buffer.concat([ decipher.update(Buffer.from(hash, 'hex')), decipher.final() ]);
        return decrpyted.toString();
    }
}
