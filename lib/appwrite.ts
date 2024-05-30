"use server";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Storage,
} from "node-appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "@/lib/config";

type UserAccount = {
  user: Models.User<Models.Preferences>;
  avatar: ArrayBuffer;
}

const client = new Client()
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

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

  console.log("createSessionClient():");
  console.log("Client Config:", client.config);
  console.log("Client Headers:", client.headers);

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

  // console.log("createAdminClient():")
  // console.log("Client Config:", client.config);
  // console.log("Client Headers:", client.headers);

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
    const storage = new Storage(client);
    const avatarId = user.prefs.avatarId;
    const avatarUrl = await storage.getFileView(
      appwriteConfig.storageId,
      avatarId
    );
    const result: UserAccount = { user: user, avatar: avatarUrl };
    console.log("Got logged in user", result);
    return result;
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

/*
Profile User is {
  '$id': '6632b5ae003b1e166738',
  '$createdAt': '2024-05-01T21:35:44.571+00:00',
  '$updatedAt': '2024-05-29T20:30:29.205+00:00',
  name: 'Andrew Donelson',
  registration: '2024-05-01T21:35:44.568+00:00',
  status: true,
  labels: [ 'admin' ],
  passwordUpdate: '2024-05-25T15:31:05.735+00:00',
  email: 'nlaakald@gmail.com',
  phone: '',
  emailVerification: true,
  phoneVerification: false,
  mfa: false,
  prefs: {
    username: 'NlaakALD',
    firstname: 'Andrew',
    Lastname: 'Donelson',
    avatarId: '664756eccabf36197e0b'
  },
  targets: [
    {
      '$id': '664d63581a173b6ff1ed',
      '$createdAt': '2024-05-22T03:15:36.108+00:00',
      '$updatedAt': '2024-05-22T03:15:36.108+00:00',
      name: '',
      userId: '6632b5ae003b1e166738',
      providerId: null,
      providerType: 'email',
      identifier: 'nlaakald@gmail.com'
    }
  ],
  accessedAt: '2024-05-29T20:30:29.205+00:00'
}
*/
