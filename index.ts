import { DatabaseMysqlHandler } from './src/api/handlers/database/database.mysql.handler';
import { ServerHandler } from './src/api/handlers/server.handler';
import { UserRepositoryMysql } from './src/api/repositories/user.repository.mysql';
import { ConfigService } from './src/api/services/config.service';
let configService = new ConfigService();
const databaseHandler = new DatabaseMysqlHandler({
    configService
});
const userRepository = new UserRepositoryMysql({
    databaseMysqlHandler: databaseHandler,
});
const serverHandler = new ServerHandler({
    configService,
    databaseHandler,
    userRepository
});
const app = serverHandler.createServer();



const port = configService.getConfig('PORT');

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
