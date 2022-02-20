import http from "http";
import App from "./app";
import { ServerConfig } from "./config/server.config";
import './test-repo'

http.createServer(App).listen(ServerConfig.SERVER_PORT);
