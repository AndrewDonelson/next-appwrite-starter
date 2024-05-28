import { Account, AppwriteException, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE as string,
  documentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POST as string,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
};

const client = new Client()

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

export const getUserData = async () => {
  try {
    const account = new Account(client)
    return account.get()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const signin = async (email: string, password: string) => {
  try {
    const account = new Account(client)
    return account.createEmailPasswordSession(email, password)
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const signout = async () => {
  try {
    const account = new Account(client)
    return account.deleteSession('current')
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const signup = async (email: string, password: string) => {
  try {
    const account = new Account(client)
    return account.create('unique()', email, password)
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}
