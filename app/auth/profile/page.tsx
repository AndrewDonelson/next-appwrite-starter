import { createSessionClient, getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter, Card } from "@/components/ui/card";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/auth/signin");
}

export default async function Profile() {
  const ua = await getLoggedInUser();
  if (!ua) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <h1>Not Signed In</h1>
      </div>
    );
  }

  return (
    <div className="grid max-w-3xl gap-4 px-4 mx-auto lg:grid-cols-2 lg:gap-6 xl:gap-10">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <img
              alt="Avatar"
              className="rounded-full"
              height="96"
              src={String(ua.avatar)}
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{ua.user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {ua.user.email}
            </p>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          {ua.user.prefs.username}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-center space-x-4">
              <CalendarIcon className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Scheduled a meeting
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  2 hours ago
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4">
              <MessageCircleIcon className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sent a message
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 day ago
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
