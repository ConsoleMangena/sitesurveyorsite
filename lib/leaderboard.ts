import { databases } from "./appwrite";
import { Models, Query } from "appwrite";

export type LeaderUser = {
  name: string;
  organization?: string;
  role?: string;
  city?: string;
  country?: string;
  avatar?: string;
  projects?: number;
  datasets?: number;
  score?: number;
};

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LEADERBOARD_COLLECTION_ID;

function isString(v: unknown): v is string { return typeof v === "string"; }
function isNumber(v: unknown): v is number { return typeof v === "number"; }

function mapDoc(doc: Models.Document): LeaderUser {
  const d = doc as unknown as Record<string, unknown>;
  return {
    name: isString(d["name"]) ? (d["name"] as string) : doc.$id,
    organization: isString(d["organization"]) ? (d["organization"] as string) : "",
    role: isString(d["role"]) ? (d["role"] as string) : "",
    city: isString(d["city"]) ? (d["city"] as string) : "",
    country: isString(d["country"]) ? (d["country"] as string) : "",
    avatar: isString(d["avatar"]) ? (d["avatar"] as string) : undefined,
    projects: isNumber(d["projects"]) ? (d["projects"] as number) : undefined,
    datasets: isNumber(d["datasets"]) ? (d["datasets"] as number) : undefined,
    score: isNumber(d["score"]) ? (d["score"] as number) : undefined,
  };
}

export async function getTopUsers(limit = 6): Promise<LeaderUser[] | null> {
  if (!DB_ID || !COLLECTION_ID) return null;
  try {
    const res = await databases.listDocuments<Models.Document>(DB_ID, COLLECTION_ID, [
      Query.orderDesc("score"),
      Query.limit(limit),
    ]);
    return res.documents.map(mapDoc);
  } catch {
    return null;
  }
}

export async function getAllUsers(limit = 60): Promise<LeaderUser[] | null> {
  if (!DB_ID || !COLLECTION_ID) return null;
  try {
    const res = await databases.listDocuments<Models.Document>(DB_ID, COLLECTION_ID, [
      Query.orderDesc("score"),
      Query.limit(limit),
    ]);
    return res.documents.map(mapDoc);
  } catch {
    return null;
  }
}
