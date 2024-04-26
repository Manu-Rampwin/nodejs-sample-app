import passport from "passport";
import passportJWT from "passport-jwt";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import User from "../models/user.model";
import constants from "../config/constants";
import { IUser} from "../interfaces/auth.interfaces";


passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: constants.JWT_SECRET_KEY,
    },
    (jwtPayload: any, cb: any) =>
      User.findById(jwtPayload._id)
        .then((user: IUser | undefined | null) => {
          cb(null, user ? user : jwtPayload);
        })
        .catch((err) => {
          console.log("error:- ", err);

          cb(err);
        })
  )
);
