import { Express } from 'express';
import categoryRoutes from './category.route';
import authRoutes from './auth.route';

export const mainRoute = (app: Express): void => {
  const path: string = '/api';

  app.use(`${path}/categories`, categoryRoutes);

  app.use(`${path}/auth`, authRoutes);
}