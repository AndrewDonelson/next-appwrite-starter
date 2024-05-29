import { createSessionClient, getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Head } from "next/document";
import { Button } from "@/components/ui/button";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  cookies().delete("my-custom-session");
  await account.deleteSession("current");

  redirect("/auth/signin");
}

export default async function Profile() {
  const user = await getLoggedInUser();
  console.log("Profile User is", user);
  //if (!user) redirect("/auth/signin");
  if (!user) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <h1>Not Signed In</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <h1>Profile</h1>
      {user.name && (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto mb-4">
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-gray-700">{user.$id}</p>
          <p className="text-gray-700">{user.email}</p>
        </div>
      )}

      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
