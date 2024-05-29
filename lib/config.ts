/**
 * Configuration settings for the Appwrite service used in the application.
 * These settings are loaded from environment variables and provide the necessary
 * information to connect to the Appwrite service and interact with its resources.
 */
export const appwriteConfig = {
  
    /**
   * The short name of the application, as defined in the environment variable `NEXT_PUBLIC_APP_SHORT_NAME`.
   */
  appNameShort: process.env.NEXT_PUBLIC_APP_SHORT_NAME as string,

  /**
   * The URL of the Appwrite instance to connect to.
   */
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  
  /**
   * The Appwrite project ID to use for the application.
   */
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  
  /**
   * The API key for the Appwrite service, loaded from the environment variable `NEXT_PUBLIC_APPWRITE_API_KEY`.
   */
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
  
  /**
   * The ID of the Appwrite database to use.
   */
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  
  /**
   * The ID of the Appwrite collection that stores user profiles.
   */
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_PROFILE as string,
  
  /**
   * The ID of the Appwrite documents collection that stores blog posts.
   */
  documentsCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_COLLECTION_ID_POST as string,
  
  /**
   * The ID of the Appwrite bucket to use for storage.
   */
  storageId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
  
  /**
   * The session name used for the application.
   */
  sessionName: (process.env.NEXT_PUBLIC_APP_SHORT_NAME + "-session") as string,
};
