import 'reflect-metadata';
import { Container } from 'inversify';
import App from './app';
import { PORT } from './config/config';
import DIContainer from './config/DIContainer';
import TYPES from './config/types';
import IRouter from './routes/interfaces/IRoutes';
import UserRoutes from './routes/UserRoutes';
import TempUserRoutes from './routes/TempUserRoutes';
import SocketService from './services/SocketService';

/* Create Application instance with procided routes */
const app: App = new App();

if (PORT != undefined) {
    app.startServer(+PORT);
} else {
    throw new Error("Port must be defined");
}

