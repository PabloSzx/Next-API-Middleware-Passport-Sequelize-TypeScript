import { BuildOptions, DataTypes, Model } from "sequelize";

import { sequelizeInstance } from "./";

export class UserModel extends Model {
  email!: string;
  password!: string;
  name!: string;
}
export type UserStatic = typeof UserModel & {
  new (values?: object, options?: BuildOptions): UserModel;
};
export const User = <UserStatic>sequelizeInstance.define(
  "users",
  {
    email: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, defaultValue: "default" },
  },
  { tableName: "users", timestamps: false }
);

User.sync({ force: false }).then(async () => {
  try {
    await User.create({
      email: "asd@asd.com",
      password: "asd",
      name: "Default",
    });
  } catch {}
});
