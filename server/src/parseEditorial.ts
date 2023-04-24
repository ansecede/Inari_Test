export interface IEditorial {
  title: string;
  caption: string;
  publish_date_text: string;
  publish_date_utc: Date;
  paragraph_qty: number;
  body: string;
}

//Validaciones
const isString = (value: any): boolean =>
  value instanceof String || typeof value === "string";
const isDate = (value: any): boolean => value instanceof Date;
const isNumber = (value: any): boolean => typeof value === "number";

function parseBody(body: any[]) {
  return body.join(" ");
}

function parseCampo(campoFromRequest: any, nombreCampo: string): string {
  if (!isString(campoFromRequest))
    throw new Error(`El campo ${nombreCampo} no tiene el formato correcto`);

  return campoFromRequest;
}

function parseDate(campoFromRequest: any): Date {
  const date = new Date(campoFromRequest);
  if (!isDate(date))
    throw new Error(`El campo publish_date_utc no tiene el formato correcto`);

  return date;
}
function parseQty(campoFromRequest: any): number {
  if (!isNumber(campoFromRequest))
    throw new Error(`El campo paragraph_qty no tiene el formato correcto`);

  return campoFromRequest;
}

export function toNewEditorial(body: any): IEditorial {
  console.log(body);

  const newEditorial: IEditorial = {
    title: parseCampo(body.title, "title"),
    caption: parseCampo(body.caption, "caption"),
    publish_date_text: parseCampo(body.publish_date_text, "publish_date_text"),
    publish_date_utc: parseDate(body.publish_date_utc),
    paragraph_qty: parseQty(body.paragraph_qty),
    body: parseBody(body.body),
  };
  return newEditorial;
}

export function toNewEditorialsArray(body: any[]): IEditorial[] {
  console.log(body);

  if (body === undefined)
    throw new Error("El request no tiene el formato corecto");

  return body.map((object) => {
    return toNewEditorial(object);
  });
}
