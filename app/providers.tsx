'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  )
}