export interface IEditorial {
  title: string;
  caption: string;
  publish_date_text: string;
  publish_date_utc: Date;
  paragraph_qty: number;
  body: string;
}

export function toNewEditorial(body: any) {
  console.log(body);
}
