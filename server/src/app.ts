import express from "express";
import {
  getEditorials,
  getEditorialById,
  getLastEditorial,
} from "./services/editorialServices";

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

app.get("/editorials/last", async (_req, res) => {
  try {
    const response = await getLastEditorial();
    res.status(200).send(response);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({ msg: e.message });
  }
});

app.post("/editorials/primeros20", (_req, res) => {
  res.send("<h1 style='{text-align: center;}'>Prueba Inari</h1>");
});

app.post("/editorials", (_req, res) => {
  res.send("<h1 style='{text-align: center;}'>Prueba Inari</h1>");
});

app.get("*", (_req, res) => {
  res.status(404).send("<h1 style='text-align: center;'>404 | Not found</h1>");
});

export default app;
