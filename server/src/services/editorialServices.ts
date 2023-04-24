import { Request, Response } from "express";
import { Editorial } from "../models/editorials";
import { IEditorial } from "../parseEditorial";

export async function getEditorials() {
  return await Editorial.find();
}

export async function getEditorialById(id: number) {
  if (isNaN(id)) throw new Error("Param id must be a number");

  const editorial = await Editorial.findOneBy({ id });

  if (!editorial) throw new Error(`Can't find editorial with id: ${id}`);

  return editorial;
}

export async function getLastEditorial() {
  const editorials = await getEditorials();

  return editorials[editorials.length - 1];
}

export async function createEditorial(editorial: IEditorial) {
  const newEditorial = new Editorial();
  const {
    title,
    caption,
    publish_date_text,
    publish_date_utc,
    paragraph_qty,
    body,
  } = editorial;

  newEditorial.title = title;
  newEditorial.caption = caption;
  newEditorial.publish_date_text = publish_date_text;
  newEditorial.publish_date_utc = publish_date_utc;
  newEditorial.paragraph_qty = paragraph_qty;
  newEditorial.body = body;

  await newEditorial.save();

  return { msg: "Editorial successfully added" };
}

export async function createFirstTwentyEditorials(editoriales: IEditorial[]) {
  editoriales.forEach(async (editorial) => {
    await createEditorial(editorial);
  });

  return { msg: "Editorials successfully added" };
}

export function errorRoute(_req: Request, res: Response) {
  res.status(404).send("<h1 style='text-align: center;'>404 | Not found</h1>");
}
