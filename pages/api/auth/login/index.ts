import passport from "passport";

import serverApp from "../../../../src/server/app";
import auth, { WRONG_EMAIL, WRONG_PASSWORD } from "../../../../src/server/middleware/passport";
import { UserModel as User } from "../../../../src/server/models/auth";

const app = serverApp();

app.use(auth);

app.post("*", (req, res, next) => {
  passport.authenticate("local", (err, user: User) => {
    if (err || !user) {
      switch (err) {
        case WRONG_EMAIL:
        case WRONG_PASSWORD:
        default:
          return res.status(210).send("Wrong Info!");
      }
    }

    req.logIn(user, e => {
      if (e) {
        return next(e);
      }
      if (req.session) req.session.cookie.maxAge = 86400000;

      const { name, email } = user;

      console.log("Successful authentication: " + name);

      return res.json({
        name,
        email,
      });
    });
  })(req, res, next);
});

export default app;
