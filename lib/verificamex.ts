import { apikeyVerificamex } from "@/config/constants";
import { ReponseVerificamexCURP } from "@/types/verificamex-curp"
import { ResponseVerificamexFaceCompare } from "@/types/verificamex-face-compare";
import { ReponseVerificamexINE } from "@/types/verificamex-ine";
import axios from "axios"

const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${apikeyVerificamex}`,
    "Content-Type": "application/json"
  }
})

export const compareFace = ({ ineFront, selfie }: {
  ineFront: string;
  selfie: string;
}): Promise<ResponseVerificamexFaceCompare> => {
  return axiosClient.post("https://api.verificamex.com/identity/v1/compare_face", { ine_front: ineFront, selfie })
}

export const validateINE = ({ ineFront }: {
  ineFront: string;
}): Promise<ReponseVerificamexINE> => {
  return axiosClient.post("https://api.verificamex.com/identity/v1/ocr/obverse", { ine_front: ineFront })
}

export const validateCurp = async ({ curp }: { curp: string }): Promise<ReponseVerificamexCURP> => {
  return axiosClient.post("https://api.verificamex.com/identity/v1/scraping/renapo", { curp }).then((res) => res.data)
}

