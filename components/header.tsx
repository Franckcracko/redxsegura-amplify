"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import NotificationPanel from "./notification-panel"
import Link from "next/link"
import { UserAttributeKey, fetchUserAttributes } from "aws-amplify/auth"

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [dataUser, setDataUser] = useState<Partial<Record<UserAttributeKey, string>>>({})

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchUserAttributes()
        setDataUser(response)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <Link href="/" className=" font-bold text-lg">
        <span className="text-red-600">
          Red X
        </span>{" "}Segura
      </Link>

      <span className="text-sm font-medium text-gray-700">{dataUser.given_name}</span>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8 relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5 text-gray-500" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </Button>

      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  )
}
