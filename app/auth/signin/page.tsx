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
import { signin } from "@/lib/appwrite";

export default function SignIn() {
  async function handleSignInForm(formData: FormData) {
    "use server";
    console.log("Submitted with", formData);

    let signinEmail = String(formData.get("email"));
    let signinPassword = String(formData.get("password"));

    console.log("Signing in with", signinEmail, signinPassword);
    signin(signinEmail, signinPassword);
    let session = undefined

    /*
    Dev Environment:

    ▲ Next.js 14.2.3
    - Local:        http://localhost:3000
    - Environments: .env.local    

    "appwrite": "^14.0.1",

    Appwrite Cloud Version 1.5.5
    */

    // SignIn from our appwrite library
    // session = signInAccountEmail(signinEmail, signinPassword);

    // SignIn from appwrite documentation
    // https://appwrite.io/docs/products/auth/email-password#login
    //
    // const promise = account.createEmailPasswordSession(
    //   "signinEmail",
    //   "signinPassword"
    // );
    // promise.then(
    //   function (response) {
    //     console.log(response); // Success
    //   },
    //   function (error) {
    //     console.log(error); // Failure
    //   }
    // );

    /*
    Removing (commenting out) appwrite code it works as NextJS documentation suggests.
    https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

    ```bash
        Submitted with FormData {
        [Symbol(state)]: [
            {
            name: '$ACTION_ID_ca5a81ccc92c1a4a61546ae8bfe43a726bb42114',
            value: ''
            },
            { name: 'email', value: 'test@gmail.com' },
            { name: 'password', value: '12345!@ABCD' }
        ]
        }
        Signing in with test@gmail.com 12345!@ABCD
        Done! Session is undefined
    ```

    Either commented method of logining in will not work with error
    ```bash
        ⨯ TypeError: e._formData.get is not a function
            at AsyncLocalStorage.run (node:async_hooks:338:14)
            at AsyncLocalStorage.run (node:async_hooks:338:14)
            at AsyncLocalStorage.run (node:async_hooks:338:14)
        digest: "3208280015"
        POST /auth/signin 500 in 48ms    
    ```

    Once you get this error the first time, you must stop your dev server and restart. Even if you commented out the code again. It stay broken.
    This does see to be an issue with appwrite server actions and looks to be almost 9 months old.
    */
    console.log("Done! Session is", session);

    // mutate data
    // revalidate cache
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
