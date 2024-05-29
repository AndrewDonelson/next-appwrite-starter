"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { account, AccountContext } from "@/lib/appwrite";
import { FormEvent, useState } from "react";
import { Models } from "appwrite";


export default function SignIn() {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [userAccount, setUserAccount] = useState<Models.User<Models.Preferences>>();

  async function handleSignInForm(e: FormEvent) {
    e.preventDefault();

    try {
      //console.log("Sign In form Submitted with:",loginEmail, loginPassword);
      await account.createEmailPasswordSession(loginEmail, loginPassword);
      const result = await account.get();
      setUserAccount(result);
      //AccountContext.setUser(result);

      //console.log("User Account:", result);
      window.location.href = "/auth/profile";
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Something went wrong");
    }
  }

  // async function handleSignInForm(formData: FormData) {
  //   //"use server";
  //   console.log("Submitted with", formData);

  //   let signinEmail = String(formData.get("email"));
  //   let signinPassword = String(formData.get("password"));

  //   console.log("Signing in with", signinEmail, signinPassword);
  //   // mutate data
  //   // revalidate cache
  // }

  return (
    <form onSubmit={handleSignInForm}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
