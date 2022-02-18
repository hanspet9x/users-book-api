import express from 'express';
import cors from 'cors';
import { ServerConfig } from './config/server.config';

const App = express();

App.use(cors());

//create router.
const AppRouter = express.Router();
//register router
App.use(ServerConfig.SERVER_PATH, AppRouter);

export default App;