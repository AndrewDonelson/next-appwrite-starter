import { AccountContext } from '@/lib/appwrite';
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  Models,
  Storage,
} from "appwrite";
import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation'

export const appwriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  usersCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE as string,
  documentsCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POST as string,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
};

const emptyUser = <Models.User<Models.Preferences>>({});

export const AccountContext = createContext({});

const AccountContextProvider = (props: any) => {
  const router = useRouter();
  const [ user, setAccount ] = useState(<Models.User<Models.Preferences>>({}));
  //const [isSignedIn, setIsSignedIn] = useState(false);

  const storeAccount = (user: Models.User<Models.Preferences>) => {
      setAccount({
        ...user,
      })
  }

  const signIn = (email: string, password: string) => {
    account.createEmailPasswordSession(email, password).then((session) => {
      account.get().then((user) => {
        setAccount({
         ...user,
        })
        //setIsSignedIn(true)
        router.push('/auth/profile')
      })
    })
  }

  const signOut = () => {
    await account.deleteSession("current");
    setAccount(emptyUser);
    //setIsSignedIn(false)
    router.push('/')
  }

  return (
    // <AccountContext.Provider value={{ user, isSignedIn, storeAccount, signIn, signOut }}>
    //   {props.children}
    // </AccountContext.Provider>
  );
}

export default AccountContextProvider;


const client = new Client();

if (!client) {
  throw new Error("Appwrite client could not be created");
}

try {
  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
} catch (error) {
  throw new Error("Appwrite client could not be configured");
}

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatar = new Avatars(client);

export { account, avatar, databases, storage, client };