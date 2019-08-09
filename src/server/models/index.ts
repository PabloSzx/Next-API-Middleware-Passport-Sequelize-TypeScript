import { Sequelize } from "sequelize";

const password = process.env.POSTGRES_PASSWORD || "root";
const username = "postgres";

const host = process.env.POSTGRES || "localhost";

export const sequelizeInstance = new Sequelize({
  host,
  database: "postgres",
  dialect: "postgres",
  username,
  password,
  logging: false,
});
