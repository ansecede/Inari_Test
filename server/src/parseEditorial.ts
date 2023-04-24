export interface IEditorial {
  title: string;
  caption: string;
  publish_date_text: string;
  publish_date_utc: Date;
  paragraph_qty: number;
  body: string;
}

export function toNewEditorial(body: any): IEditorial {
  console.log(body);

  const newEditorial: IEditorial = {
    title: body.title,
    caption: body.caption,
    publish_date_text: body.publish_date_text,
    publish_date_utc: body.publish_date_utc,
    paragraph_qty: body.paragraph_qty,
    body: body.body,
  };
  return newEditorial;
}

export function toNewEditorialsArray(body: any[]): IEditorial[] {
  console.log(body);

  return body.map((object) => {
    return toNewEditorial(object);
  });
}
