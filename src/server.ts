import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(router);

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection successful");
  });
  console.log(`Server started successfully at port ${PORT}`);
});
