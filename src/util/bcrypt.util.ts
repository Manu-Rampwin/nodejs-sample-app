const bcrypt = require("bcrypt");

import constants from "../config/constants";

export const generateHashedPassword = async (password: string) => {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(
      password,
      constants.BCRYPT_SALT_ROUNDS,
      function (err: any, hash: any) {
        if (err) reject(err);
        resolve(hash);
      }
    );
  });
  return hashedPassword;
};
