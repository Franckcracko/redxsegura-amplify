import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    address: { required: true },
    email: { required: true },
    phoneNumber: { required: true },
    givenName: { required: true },
    familyName: { required: true },
    birthdate: { required: true },
  }
});
