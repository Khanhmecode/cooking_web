import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDatabase from '../src/config/database';
import { mainRoute } from './api/routes/index.route';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3080;

dotenv.config();
express.json();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


mainRoute(app);
connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})