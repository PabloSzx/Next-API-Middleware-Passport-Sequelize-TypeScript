import serverApp from "../../../src/server/app";
import auth from "../../../src/server/middleware/passport";

const app = serverApp();

app.use(auth);

app.use((req, res) => {
  req.logout && req.logout();
  req.session && req.session.destroy(() => {});

  res.sendStatus(200);
  if (req.user) {
    console.log(`Desconexión exitosa usuario: ${req.user.name}`);
  }
});

export default app;
