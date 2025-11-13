import { Client, Account, Databases, Storage } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

export const isAppwriteConfigured = Boolean(endpoint && projectId);

const client = new Client();

if (isAppwriteConfigured) {
  client.setEndpoint(endpoint!).setProject(projectId!);
}

export const account = isAppwriteConfigured ? new Account(client) : null;
export const databases = isAppwriteConfigured ? new Databases(client) : null;
export const storage = isAppwriteConfigured ? new Storage(client) : null;

export { client };
