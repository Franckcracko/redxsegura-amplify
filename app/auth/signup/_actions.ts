'use server';

import { signUp } from "aws-amplify/auth"

interface User {
  firstname: string;
  lastname: string;
  birthday: string;
  address: string;
  tel: string;
  curp: string;
  nameRefer: string;
  telRefer: string;
  emailRefer: string;
  email: string;
  password: string;
}

export const createUser = async (user: User) => {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: user.email,
      password: user.password,
      options: {
        userAttributes: {
          address: user.address,
          email: user.email,
          phoneNumber: user.tel,
          givenName: user.firstname,
          familyName: user.lastname,
          birthdate: user.birthday
        },
      }
    });

    console.log(isSignUpComplete, userId, nextStep)
    return { message: 'Usuario creado' }
  } catch (error) {
    console.log(error)
    return { error: 'Error al crear usuario' }
  }
}