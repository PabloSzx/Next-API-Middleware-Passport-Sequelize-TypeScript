import serverApp from "../../src/server/app";
import { requireAuth } from "../../src/server/middleware/passport";

const app = serverApp();
app.use(requireAuth, (_req, res) => {
  res.send("hello world");
});

export default app;
