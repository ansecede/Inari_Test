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

  return body.map((object) => {
    return toNewEditorial(object);
  });
}

// const obj = {
//   "title": "Alarmante aumento de detección de casos de VIH",
//   "caption":
//     "Las alertas están dadas: se requiere continuidad en tratamientos; no pueden faltar antirretrovirales en los hospitales públicos ni del IESS.",
//   "publish_date_text": "22 de abril, 2023 - 19h21",
//   "publish_date_utc":
//     "Sat Apr 22 2023 19:21:48 GMT+0000 (Coordinated Universal Time)",
//   "paragraph_qty": 7,
//   "body": [
//     "En un año, los nuevos casos registrados de VIH en Ecuador pasaron de 3.960 a 5.142. La comparación de cifras, correspondientes al 2021 y 2022, representa un incremento del 29,8 %.",
//     "Los reportes no determinan la fecha de infección sino de la detección. No hay un dato claro sobre si es el nivel de contagios el que aumenta o solo el registro de casos. Un motivo suficiente para que el Estado y la sociedad se preocupen.",
//     "El virus de inmunodeficiencia humana (VIH) produce un deterioro progresivo del sistema inmunitario, que sin la ingesta de antirretrovirales pasa a la fase más avanzada, que es el síndrome de inmunodeficiencia adquirida (sida).",
//     "Quienes más aparecen como positivos en las pruebas de VIH tienen entre 20 y 35 años. Están en plena etapa de actividad sexual y son parte de la población económicamente activa. Precisamente aquí confluyen dos graves problemas: el primero, la falta de educación sexual reflejada en el escaso uso de protección en la intimidad; y el segundo, el estigma laboral y social. Legalmente está prohibido el discrimen, pero parte de quienes padecen de VIH lo sufren, más allá de las excepciones.",
//     "Un tercer problema es el uso de drogas, que está entre las causas de contagio, sea por jeringas o por sexo sin protección empujado por la búsqueda de dinero (prostitución) para alimentar la adicción.",
//     "En Ecuador hasta el 2022 se contaban 45.078 personas con VIH, de acuerdo con el Ministerio de Salud. El 87 % toma los antirretrovirales y el 66 % de ellos tiene la carga viral suprimida.",
//     "Las alertas están dadas: se requiere continuidad en tratamientos; no pueden faltar antirretrovirales en los hospitales públicos ni del IESS; hay que dar seguimiento a los casos para evitar mayor propagación; la educación sexual sigue siendo un tabú por vencer; la droga es la madre también del VIH y hay que trabajar en prevención y en la rehabilitación de las adicciones. Los ministerios de Salud, de Educación, cabildos y sociedad están obligados a trabajar en esto para no lamentar más casos. (O)",
//   ],
// };
