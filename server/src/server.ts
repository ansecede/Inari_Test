import app from "./app";
import { MyDataSource } from "./config/db_config";

const EXPRESS_PORT = 4321;

async function main() {
  await MyDataSource.initialize();

  console.log("Database Connected");

  app.listen(EXPRESS_PORT, () =>
    console.log(`Server running on port ${EXPRESS_PORT}`)
  );
}

main();
