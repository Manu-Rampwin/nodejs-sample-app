import dotenv from "dotenv";
dotenv.config();

export default{
    PORT: Number(process.env.PORT),
    DATABASE_URL: String(process.env.DATABASE_URL),
    JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
    JWT_EXPIRATION_TIME: "7d",
    BCRYPT_SALT_ROUNDS: 10,
    statusCode: {
        SUCCESS: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOTFOUND: 404,
        NOTACCEPTABLE: 406,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
      },
}