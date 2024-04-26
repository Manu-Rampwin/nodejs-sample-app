import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");

import constants from "../config/constants";
import { loginSchemaValidator, registerSchemaValidator } from "../validators/auth.validators";
import HttpException from "../util/http-exception.util";
import { AuthService } from "../services/auth.services";
import { generateJwt } from "../util/jwt.util";
import { generateHashedPassword } from "../util/bcrypt.util";
import { IUser } from "../interfaces/auth.interfaces";

const authObj=new AuthService();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { error } = registerSchemaValidator(req.body);
      if (error) {
        throw new HttpException(
          constants.statusCode.BAD_REQUEST,
          error.details[0].message,
          "register"
        );
      }
      const { name, email, password } = req.body.user;
      const userFound = await authObj.findOneUser({ email });
      if (userFound) {
        throw new HttpException(
          constants.statusCode.BAD_REQUEST,
          "User Already Exists",
          "register"
        );
      }
      const hashedPassword = await generateHashedPassword(password);
      const user:IUser = {
        name,
        email,
        password: hashedPassword,
      };
      const userCreated = await authObj.createUser(user);
      res
        .status(constants.statusCode.CREATED)
        .json({ success: true, data: userCreated });
    } catch (error) {
      next(error);
    }
};

  
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { error } = loginSchemaValidator(req.body);
      if (error) {
        throw new HttpException(
          constants.statusCode.BAD_REQUEST,
          error.details[0].message,
          "login"
        );
      }
  
      const { email, password } = req.body.credentials;
      const user = await authObj.findOneUser({ email });
      if (!user) {
        throw new HttpException(
          constants.statusCode.NOTFOUND,
          "User Not Registered",
          "login"
        );
      }
  
      const matched = await bcrypt.compare(password, String(user.password));
      if (!matched) {
        throw new HttpException(
          constants.statusCode.UNAUTHORIZED,
          "Invalid Credentials",
          "login"
        );
      }
  
      const jwtToken = await generateJwt(user);
  
      res.status(constants.statusCode.ACCEPTED).json({
        success: true,
        serviceToken: jwtToken,
        data:user,
      });
    } catch (error) {
      next(error);
    }
};