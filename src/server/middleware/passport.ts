// @ts-ignore
import connectSequelize from "connect-session-sequelize";
import { Router } from "express";
import ExpressSession from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

import { sequelizeInstance } from "../models";
import { User, UserModel } from "../models/auth";

export const WRONG_PASSWORD = "WRONG_PASSWORD";
export const WRONG_EMAIL = "WRONG_EMAIL";

const SequelizeStore = connectSequelize(ExpressSession.Store);
const store = new SequelizeStore({
  db: sequelizeInstance,
});
store.sync();

const auth = Router();
auth.use(
  ExpressSession({
    secret: "tF47Oz#R$v2oCT&gooX%QclBNF$E8OosV^vBebkYVro8$5DB1a",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 86400000, secure: false },
    store,
  })
);

auth.use(passport.initialize());
auth.use(passport.session());

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      try {
        const user = await User.findByPk(email, {
          raw: true,
        });

        if (!user) {
          return cb(WRONG_EMAIL, false);
        }
        if (user.password !== password) {
          return cb(WRONG_PASSWORD, false);
        }

        return cb(null, user);
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser<UserModel, string>((user, cb) => {
  if (user) cb(null, user.email);
  else cb(WRONG_EMAIL);
});

passport.deserializeUser<UserModel, string>(async (email, done) => {
  try {
    const user = await User.findByPk(email, { raw: true });

    if (user) {
      done(null, user);
    } else {
      done(WRONG_EMAIL);
    }
  } catch (err) {
    console.error(JSON.stringify(err, null, 4));
  }
});

const requireAuth = Router();
requireAuth.use(auth, (req, res, next) => {
  if (req.user && req.user.email) {
    return next();
  } else {
    res.sendStatus(403);
  }
});

export { requireAuth };

export default auth;
