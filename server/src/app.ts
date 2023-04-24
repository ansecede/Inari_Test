import express from "express";
import {
  getEditorials,
  getEditorialById,
  getLastEditorial,
  createFirstTwentyEditorials,
  createEditorial,
  errorRoute,
} from "./services/editorialServices";
import { toNewEditorial, toNewEditorialsArray } from "./parseEditorial";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1 style='text-align: center;'>Prueba Inari</h1>");
});

app.get("/editorials", async (_req, res) => {
  try {
    const response = await getEditorials();
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.get("/editorials/lastentry", async (_req, res) => {
  try {
    const response = await getLastEditorial();
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.get("/editorials/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const response = await getEditorialById(id);
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.post("/editorials/primeros20", async (req, res) => {
  try {
    const editorials = toNewEditorialsArray(req.body);

    const response = await createFirstTwentyEditorials(editorials);
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.post("/editorials", async (req, res) => {
  try {
    const editorial = toNewEditorial(req.body);

    const response = await createEditorial(editorial);
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.get("*", errorRoute);

export default app;
