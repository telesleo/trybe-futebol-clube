import * as express from 'express';
import errorHandler from './middlewares/errorHandler';

import login from './routes/login.routes';
import matches from './routes/matches.routes';
import teams from './routes/teams.routes';
import leaderboard from './routes/leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', login);
    this.app.use('/teams', teams);
    this.app.use('/matches', matches);
    this.app.use('/leaderboard/home', leaderboard);
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use(errorHandler);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
