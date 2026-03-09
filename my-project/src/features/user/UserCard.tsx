import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import type { UserData } from "./UserForm";

export function UserCard({ data }: { data: UserData | null }) {
  if (!data) return null

  return (
    <Card className="mt-6 border-2 border-primary/20">
      <CardHeader>
        <CardTitle>Submitted Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <p><strong>Name:</strong> {data.username}</p>
        <p><strong>Role:</strong> {data.role}</p>
        <p><strong>Status:</strong> {data.active ? "Active" : "Disabled"}</p>
      </CardContent>
    </Card>
  )
}
