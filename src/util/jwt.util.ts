const jwt = require("jsonwebtoken");

import constants from "../config/constants";
import { IUser } from "../interfaces/auth.interfaces";

export const generateJwt = async (user: IUser) => {
  const jwtToken = await jwt.sign(
    JSON.parse(JSON.stringify(user)),
    constants.JWT_SECRET_KEY,
    {
      expiresIn: constants.JWT_EXPIRATION_TIME,
    }
  );
  return jwtToken;
};
