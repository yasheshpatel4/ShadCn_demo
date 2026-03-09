import { useState } from "react"
import { UserForm, type UserData } from "./UserForm"
import { UserCard } from "./UserCard"

export default function User() {
  const [userData, setUserData] = useState<UserData | null>(null)

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-xl font-bold mb-6">Create Account</h1>
      <UserForm onSubmit={setUserData} />
      <UserCard data={userData} />
    </div>
  )
}
