import App from './app';
import { PORT } from './config/config';

const app = new App();
app.startServer(+PORT);