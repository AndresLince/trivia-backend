import { ConfigService } from "../services/config.service";

export interface DatabaseMysqlHandlerConstructorInterface {
    configService: ConfigService;
}