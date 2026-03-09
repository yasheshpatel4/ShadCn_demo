import { useForm, Controller } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";

const SKILLS = ["React", "TypeScript", "CSS", "SpringBoot"] as const;

export type UserData = {
  username: string;
  role: string;
  active: boolean;
  skills: typeof SKILLS[number][];
};

export function UserForm({ onSubmit }: { onSubmit: (data: UserData) => void }) {
  const { register, handleSubmit, setValue, watch, control,formState:{errors} } = useForm<UserData>({
    defaultValues: {
      username: "",
      role: "user",
      active: false,
      skills: [],
    },
  });

  const handleSkillChange = (
    checked: boolean | "indeterminate",
    skill: typeof SKILLS[number]
  ) => {
    const currentSkills = watch("skills");
    if (checked) {
      setValue("skills", [...currentSkills, skill], { shouldDirty: true });
    } else {
      setValue(
        "skills",
        currentSkills.filter((s) => s !== skill),
        { shouldDirty: true }
      );
    }
  };

  const watchedSkills = watch("skills");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg">
      <div>
        <Label htmlFor="username">Username</Label>
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
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Label>Role</Label>
        <RadioGroup
          onValueChange={(v) => setValue("role", v)}
          defaultValue="user"
          className="flex gap-4 pt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin">Admin</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hr" id="hr" />
            <Label htmlFor="hr">HR</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">User</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Skills</Label>
        <div className="flex gap-4 pt-2 flex-wrap">
          {SKILLS.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${skill}`}
                checked={watchedSkills.includes(skill)}
                onCheckedChange={(checked) => handleSkillChange(checked, skill)}
              />
              <Label htmlFor={`skill-${skill}`}>{skill}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 border p-3 rounded-md">
        <Checkbox
          id="active"
          onCheckedChange={(checked) => setValue("active", !!checked)}
          checked={watch("active")} 
        />
        <Label htmlFor="active">Active</Label>
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
