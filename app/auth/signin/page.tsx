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
import { getLoggedInUser } from "@/lib/appwrite";
import Link from "next/link";

import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appwriteConfig } from "@/lib/config";


export default async function SignIn() {

  async function handleSignInForm(formData: FormData) {
    "use server";
    console.log("Submitted with", formData);

    let signinEmail = String(formData.get("email"));
    let signinPassword = String(formData.get("password"));

    console.log("Signing in with", signinEmail, signinPassword);
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(signinEmail, signinPassword)
    console.log("Done! Session is", session);

    console.log("Creating Session cookie name", appwriteConfig.sessionName);
    cookies().set(appwriteConfig.sessionName, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });    
    console.log("Cookie is", cookies().get(appwriteConfig.sessionName));

    redirect("/auth/profile");
    // mutate data
    // revalidate cache
  }

  const user = await getLoggedInUser();
  if (user) {
    console.log("Signed in User is", user);
    redirect("/auth/profile");
  }

  return (
    <form action={handleSignInForm}>
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
              <Input id="password" name="password" type="password" required />
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
