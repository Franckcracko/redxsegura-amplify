"use client";

import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log({ username, userId, signInDetails })
        const response =await fetchUserAttributes()
        console.log(response)
      } catch (error) {
        toast.error("Ocurrió un error!")
        console.log(error)
        router.replace("/auth/login")
      }
    }
    verifyUser()
  }, [])

  return (
    <>
      {children}
    </>
  );
}
