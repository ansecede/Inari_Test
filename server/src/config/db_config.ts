import { DataSource } from "typeorm";
import { Editorial } from "../models/editorials";

export const MyDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "prueba_inari",
  synchronize: true,
  logging: true,
  entities: [Editorial],
  // subscribers: [],
  // migrations: [],
});
