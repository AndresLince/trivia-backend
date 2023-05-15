import questionCategoryRepository from "../repository/question-category.repository.mock";
import triviaRepository from "../repository/trivia.repository.mock";
import userRepositoryMock from "../repository/user.repository.mock";
import { TriviaRoute } from "../../routes/trivia.route";
import { ConfigService } from "../../services/config.service";
import { AuthHandler } from "../../handlers/auth.handler";
import { CryptoHandler } from "../../handlers/crypto.handler";
import { QuestionCategoryHandler } from "../../handlers/questionCategory.handler";
import { ServerHandler } from "../../handlers/server.handler";
import { TriviaHandler } from "../../handlers/trivia.handler";
import httpUtilsHandler from "./http-utils-handler.mock";

const configService = new ConfigService();
const cryptoHandler = new CryptoHandler({
    configService
});
const authHandler = new AuthHandler({
    userRepository: userRepositoryMock,
    httpUtilsHandler: httpUtilsHandler,
});
const triviaHandler = new TriviaHandler({
    triviaRepository,
    httpUtilsHandler,
    cryptoHandler
});
const questionCategoryHandler = new QuestionCategoryHandler({
    questionCategoryRepository: questionCategoryRepository,
    httpUtilsHandler: httpUtilsHandler,
    cryptoHandler
});

const triviaRoute = new TriviaRoute({ triviaHandler, httpUtilsHandler });

const serverHandler = new ServerHandler({
    authHandler,
    httpUtilsHandler,
    questionCategoryHandler,
    triviaRoute
});

export default serverHandler;