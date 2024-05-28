import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE as string,
  documentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POST as string,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
};

let client = undefined;

try {
  client = new Client()
} catch (error) {
  throw new Error("Appwrite client could not be created");
}

if (!client) {
  throw new Error("Appwrite client could not be created");
}

try {
  client.setEndpoint(appwriteConfig.url)
  client.setProject(appwriteConfig.projectId);
} catch (error) {
  throw new Error("Appwrite client could not be configured");
}

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export { account, avatar, databases, storage, client };

export async function signInAccountEmail( email : string, password : string) {
    try {
      const session = account.createEmailPasswordSession(email,password);
      const acct = await account.get().then(function (response) {
        console.log(response); // Success
        return response;
      }, function (error) {
        console.log(error); // Failure
        return error;
      });
    
      return session;
    } catch (error) {
      console.error("Sign In Error:",error);
    }
  }