import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Mongoose Express CRUD Mastery');
});

export default app;
