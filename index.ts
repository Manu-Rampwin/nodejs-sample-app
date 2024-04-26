import express from "express";
import cors from "cors";
import { Request, Response } from "express";

import { connectDb } from "./src/db";
import constants from "./src/config/constants";
import { errorHandler } from "./src/middlewares/error.middleware";
import authRoutes from "./src/routes/auth.routes";
import bookRoutes from "./src/routes/book.routes";

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing api
app.get('/health-check',(req:Request, res:Response)=>{
    console.log("health-check api is hitting");
    res.status(200).json({success:true});    
})

//apis
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/book', bookRoutes);

/* Error Handler */
app.use(errorHandler);

connectDb()
.then(() => {
  console.info(`✅ Database Connected!`);
  app.listen(constants.PORT, () => {
    console.info(
      `✅ Webengage pluggable up and running on: ${constants.PORT}`
    );
  });
})
.catch(() => {
  console.error(`✅ Database Failed To Connect!`);
  process.exit(1);
});