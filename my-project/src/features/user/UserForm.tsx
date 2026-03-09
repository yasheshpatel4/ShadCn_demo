import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";

export type UserData = { 
    username: string; 
    role: string; 
    active: boolean };

export function UserForm({ onSubmit }: { onSubmit: (data: UserData) => void }) {
  const { register, handleSubmit, setValue, watch } = useForm<UserData>({
    defaultValues: { username: "", role: "user", active: false }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg">
        <div>
            <Label>Username</Label>
            <Input 
            id="username"
            {...register("username", { 
                required: "Username is required", 
                minLength: {
                value: 4,
                message: "Username must be at least 4 characters"
                },
                maxLength: {
                value: 20,
                message: "Username must be at most 20 characters"
                },
                pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Username can only contain letters, numbers, and underscores"
                }
            })} 
            placeholder="Enter name" 
            />      
        </div>

        <div>
            <Label>Role</Label>
            <RadioGroup onValueChange={(v) => setValue("role", v)} defaultValue="user" className="flex gap-4 pt-2">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="hr" id="hr" />
                <Label htmlFor="hr">hr</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
            </div>
            </RadioGroup>
        </div>

        <div className="flex items-center space-x-2 border p-3 rounded-md">
            <Checkbox 
            id="sub" 
            onCheckedChange={(checked) => setValue("active", !!checked)} 
            />
            <Label htmlFor="sub">Active</Label>
        </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}
