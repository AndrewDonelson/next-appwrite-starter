"use server";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";

const appwriteConfig = {
  appNameShort: process.env.NEXT_PUBLIC_APP_SHORT_NAME as string,
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE as string,
  documentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POST as string,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
};

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

  const sessionName = appwriteConfig.appNameShort + "-session";
  
  const session = cookies().get(sessionName);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

// const account = new Account(client);
// const databases = new Databases(client);
// const storage = new Storage(client);
// const avatar = new Avatars(client);

//export { account, avatar, databases, storage, client };

// export async function signInAccountEmail( email : string, password : string) {
//     try {
//       const session = account.createEmailPasswordSession(email,password);
//       console.log("Sign In Success:",session);
//       const acct = await account.get().then(function (response) {
//         console.log(response); // Success
//         return response;
//       }, function (error) {
//         console.log(error); // Failure
//         return error;
//       });
//       console.log("Account:",acct);
//       return session;
//     } catch (error) {
//       console.error("Sign In Error:",error);
//     }
//   }
