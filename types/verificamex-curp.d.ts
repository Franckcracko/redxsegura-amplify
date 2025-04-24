export type ReponseVerificamexCURP = {
  data: Data;
}

export type Data = {
  object: string;
  citizen: Citizen;
}

export type Citizen = {
  registros: Registro[];
  codigo: string;
  mensaje: string;
  status: boolean;
}

export type Registro = {
  primerApellido: string;
  segundoApellido: string;
  curp: string;
  fechaNacimiento: string;
  sexo: string;
  claveEntidad: string;
  entidad: string;
  nacionalidad: string;
  datosDocProbatorio: DatosDocProbatorio;
  docProbatorio: number;
  nombres: string;
  statusCurp: string;
  parametro: string;
}

export type DatosDocProbatorio = {
  claveMunicipioRegistro: string;
  municipioRegistro: string;
  anioReg: string;
  foja: string;
  tomo: string;
  libro: string;
  numActa: string;
  claveEntidadRegistro: string;
  entidadRegistro: string;
}
