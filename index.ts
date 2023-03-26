import { AuthHandler } from './src/api/handlers/auth.handler';
import { CryptoHandler } from './src/api/handlers/crypto.handler';
import { DatabaseMysqlHandler } from './src/api/handlers/database/database.mysql.handler';
import { HttpUtilsHandler } from './src/api/handlers/httpUtilsHandler';
import { QuestionCategoryHandler } from './src/api/handlers/questionCategory.handler';
import { ServerHandler } from './src/api/handlers/server.handler';
import { QuestionCategoryRepositoryMysql } from './src/api/repositories/questionCategory.repository.mysql';
import { UserRepositoryMysql } from './src/api/repositories/user.repository.mysql';
import { ConfigService } from './src/api/services/config.service';
const configService = new ConfigService();
const databaseHandler = new DatabaseMysqlHandler({
    configService
});
const cryptoHandler = new CryptoHandler({
    configService
})
const userRepository = new UserRepositoryMysql({
    databaseMysqlHandler: databaseHandler,
});
const questionCategoryRepository = new QuestionCategoryRepositoryMysql({
    databaseHandler: databaseHandler,
});
const httpUtilsHandler = new HttpUtilsHandler({
    configService
})
const authHandler = new AuthHandler({
    userRepository: userRepository,
    httpUtilsHandler: httpUtilsHandler,
});
const questionCategoryHandler = new QuestionCategoryHandler({
    questionCategoryRepository: questionCategoryRepository,
    httpUtilsHandler: httpUtilsHandler,
    cryptoHandler
});
const serverHandler = new ServerHandler({
    authHandler,
    httpUtilsHandler,
    questionCategoryHandler
});
const app = serverHandler.createServer();



const port = configService.getConfig('PORT');

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
