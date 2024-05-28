import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

export function GettingStarted() {
  return (
    <Tabs defaultValue="appwrite" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="appwrite">Appwrite</TabsTrigger>
        <TabsTrigger value="environment">Environment</TabsTrigger>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
      </TabsList>

      <TabsContent value="appwrite">
        <Card>
          <CardHeader>
            <CardTitle>Prepare Appwrite</CardTitle>
            <CardDescription>
              Either use appwrite cloud or self-hosted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>If you would like to use Appwrites cloud just go <a href="https://cloud.appwrite.io">here</a>.</p>
            <p>If you rather self-host your own Appwrite cloud then follow the documentation <a href="https://appwrite.io/docs/advanced/self-hosting">here</a>.</p>            
          </CardContent>
          <CardFooter>
            <p>Which ever one you choose does not matter. After it is setup, you must create an account and configure for web platform.</p>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="environment">
        <Card>
          <CardHeader>
            <CardTitle>Configure Environment</CardTitle>
            <CardDescription>
              There is an <span className="text-bold">example.env.local</span> in the root folder of the project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>First, rename it to <span className="text-bold">.env.local</span>, then...</p>
            <p>Next, get the AppWrite values from your Console and update the environment values.</p>
          </CardContent>
          <CardFooter>
            <p>You should be good to go now, try the Sign in tab.</p>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              That's it, you should be working now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p> Once you sign in with your Appwrite Account you should be sent to your profile page.</p>
            <p>If not, no fear, the appwrite documentation is excellent and you can also get help in the discord community <a href="https://appwrite.io/discord">here</a>.</p>
          </CardContent>
          <CardFooter>
            <Link href="/auth/signin">
              <Button className="w-full bg-gray-400">
                Click here to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>      
    </Tabs>
  )
}
