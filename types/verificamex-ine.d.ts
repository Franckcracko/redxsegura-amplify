export type ReponseVerificamexINE = {
  data: Data;
}

export type Data = {
  object:    string;
  ocr:       string;
  parse_ocr: ParseOcr[];
}

export type ParseOcr = {
  type:   string;
  name:   string;
  value:  string;
  source: Source;
}

export enum Source {
  ExternalServices = "ExternalServices",
  Ocr = "OCR",
}
