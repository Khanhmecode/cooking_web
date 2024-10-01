import { Request, Response } from 'express';
import Category from '../models/category.model';

//[POST] /api/categories/
export const index = async (req: Request, res: Response) => {
  const categoriesData = await Category.find({
    // status: 'active',
    // deleted: false
  });

  res.status(200).json({
    categories: categoriesData
  });
}