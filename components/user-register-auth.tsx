"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type User = {
  name: string;
  email: string;
  password: string;
};

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [data, setData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const request = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    console.log("USER REGISTER FROM", response);

    if (!request.ok) {
      toast({
        title: "Ooops...",
        description: response.error,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      console.log(response);
      router.push("/login");
    }
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 5000);
    setData({
      name: "",
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 ">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="name"
              autoCapitalize="none"
              disabled={isLoading}
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
