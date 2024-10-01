import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from 'md5';
import * as func from '../helpers/generate.helper';

interface UserData {
  userName: string;
  email: string;
  password: string;
  tokenUser: string;
}

//[POST] /api/auth/register
export const Register = async (req: Request, res: Response) => {
  try {
    const password: string = md5(req.body.password);
    const userName: string = req.body.username;
    const email: string = req.body.email;
    const tokenUser: string = func.generateToken();

    const userAccount = await User.findOne({
      email: email
    });

    if (userAccount) {
      res.json({
        result: false,
        message: 'Email already existed!'
      });
    } else {
      const dataUser: UserData = {
        userName,
        email,
        password,
        tokenUser
      }

      const newUser = new User(dataUser);
      const result = await newUser.save();

      console.log(result);

      // res.cookie('ff_user', tokenUser, {
      //   maxAge: 3600 * 1000 //1h
      // });

      res.status(200).json({
        result: true,
        dataUser: {
          userName,
          email,
          tokenUser
        },
        message: 'Create account successfully!'
      });
    }
  } catch (error) {
    res.status(500).json({
      result: false,
      message: error
    })
  }
}