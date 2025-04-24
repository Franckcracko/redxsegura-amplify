"use client";

import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../amplify/data/resource'

const client = generateClient<Schema>();

export const createUser = async (data: {
  email: string,
  phone: string,
  firstname: string,
  lastname: string,
  birthDate: string,
  address: string,
  nameRefer: string,
  telRefer: string,
  emailRefer: string,
  acceptTerms: boolean
  city: string
  postalCode: string
  documentValidated: boolean
}) => {
  await client.models.User.create({
    city: data.city,
    documentValidated: data.documentValidated,
    postalCode: data.postalCode,
    acceptTerms: data.acceptTerms,
    email: data.email,
    phone: data.phone,
    firstname: data.firstname,
    lastname: data.lastname,
    birthDate: data.birthDate,
    address: data.address,
    nameRefer: data.nameRefer,
    telRefer: data.telRefer,
    emailRefer: data.emailRefer,
  });
}