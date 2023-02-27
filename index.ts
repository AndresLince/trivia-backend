import  { ServerHandler }  from './src/api/handlers/server.handler';
const serverHandler = new ServerHandler();
const app = serverHandler.createServer();
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
