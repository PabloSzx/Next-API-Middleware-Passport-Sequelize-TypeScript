import express from "express";

import common from "./middleware/common";

export default () => {
  const app = express();

  app.use(common);
  return app;
};
