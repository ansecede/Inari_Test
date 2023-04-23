import { Editorial } from "../models/editorials";
import { IEditorial } from "../parseEditorial";

export async function getEditorials() {
  return await Editorial.find();
}

export async function getEditorialById(id: number) {
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

  await newEditorial.save()
}
