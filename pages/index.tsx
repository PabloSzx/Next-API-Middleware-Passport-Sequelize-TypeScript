import axios from "axios";
import { useEffect, useState } from "react";

import { UserModel } from "../src/server/models/auth";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState<undefined | UserModel>(undefined);
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const response = await axios.post<UserModel>(
        "http://localhost:3000/api/auth/current_user"
      );
      if (response.status === 200) {
        setUser(response.data);
      }
    })();
  }, []);
  useEffect(() => {
    if (user)
      (async () => {
        const response = await axios.post<string>("http://localhost:3000/api");
        setData(response.data);
      })();
  }, [user]);

  return (
    <div>
      {!user ? (
        <form>
          <input
            placeholder="email"
            onChange={({ target: { value } }) => {
              setEmail(value);
            }}
            value={email}
          />
          <input
            placeholder="password"
            type="password"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
            value={password}
          />
          <button
            onClick={async ev => {
              ev.preventDefault();
              const response = await axios.post<UserModel>(
                "http://localhost:3000/api/auth/login",
                { email, password }
              );
              if (response.status === 200) {
                setEmail("");
                setPassword("");
                setUser(response.data);
              } else {
                window.alert(response.data);
              }
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <>
          <div>
            <button
              onClick={async () => {
                await axios.post("http://localhost:3000/api/auth/logout");
                setUser(undefined);
              }}
            >
              Logout
            </button>
          </div>
          <div>{data}</div>
        </>
      )}
    </div>
  );
};
