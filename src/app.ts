import express from 'express';
import cors from 'cors';
import {ServerConfig} from './config/server.config';
import AppController from './controllers/AppController';
import CacheService from './services/cache/CacheService';

const App = express();

App.use(cors());
App.use(express.json());
// create router.
// register router
CacheService.init(ServerConfig.CACHE_TTL);
App.use(ServerConfig.SERVER_PATH, AppController);

export default App;
