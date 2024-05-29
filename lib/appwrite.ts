"use server";
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "@/lib/config";

/**
 * Creates a new Appwrite client session.
 *
 * This function initializes a new Appwrite client with the configured endpoint and project ID. It then retrieves the session token from the cookies and sets it on the client. The function returns an object with the `account` property, which provides access to the Appwrite account API.
 *
 * @returns {Object} An object with the `account` property, which provides access to the Appwrite account API.
 * @throws {Error} If no session token is found in the cookies.
 */
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

  const session = cookies().get(appwriteConfig.sessionName);
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

/**
 * Creates an Appwrite client instance with the necessary configuration.
 *
 * @returns {Object} An object with the `account` property, which provides access to the Appwrite account API.
 */
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

/**
 * Retrieves the currently logged-in user.
 *
 * @returns {Promise<User|null>} The currently logged-in user, or `null` if there is no logged-in user or an error occurred.
 */
export async function getLoggedInUser() {
  try {
    console.log("Getting logged in user...");
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log("Got logged in user", user);
    return user;
  } catch (error) {
    console.log("Error getting logged in user", error);
    return null;
  }
}

// const account = new Account(client);
// const databases = new Databases(client);
// const storage = new Storage(client);
// const avatar = new Avatars(client);

//export { account, avatar, databases, storage, client };
