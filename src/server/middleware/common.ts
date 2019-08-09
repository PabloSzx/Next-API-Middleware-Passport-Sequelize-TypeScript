import { Router } from "express";
import morgan from "morgan";

const common = Router();

common.use(
  morgan("combined", {
    skip: req => req.url === "/api/data/tracking",
  })
);

export default common;
