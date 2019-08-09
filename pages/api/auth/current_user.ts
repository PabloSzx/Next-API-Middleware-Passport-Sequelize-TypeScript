import serverApp from "../../../src/server/app";
import auth from "../../../src/server/middleware/passport";
import { UserModel as User } from "../../../src/server/models/auth";

const app = serverApp();

app.use(auth);

app.use(async (req, res) => {
  try {
    if (req.user) {
      const { name, email }: User = req.user;
      console.log(`User already logged in: ${name}`);

      return res.json({
        name,
        email,
      });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default app;
