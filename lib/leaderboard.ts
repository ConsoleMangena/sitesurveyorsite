import { databases } from "./appwrite";
import { Models, Query } from "appwrite";

export type LeaderUser = {
  name: string;
  organization?: string;
  role?: string;
  city?: string;
  location?: { lat: number; lng: number } | null;
  avatar?: string;
  projects?: number;
  datasets?: number;
  score?: number;
};

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LEADERBOARD_COLLECTION_ID || "leaderboard";

function isString(v: unknown): v is string { return typeof v === "string"; }
function isNumber(v: unknown): v is number { return typeof v === "number"; }

function mapDoc(doc: Models.Document): LeaderUser {
  const d = doc as unknown as Record<string, unknown>;
  // location can be Appwrite Point: either { latitude, longitude } or { type: 'Point', coordinates: [lng, lat] }
  let location: { lat: number; lng: number } | null = null;
  const loc = d["location"] as unknown;
  if (loc && typeof loc === "object") {
    const o = loc as Record<string, unknown>;
    const lat = o["latitude"];
    const lng = o["longitude"];
    if (typeof lat === "number" && typeof lng === "number") {
      location = { lat, lng };
    } else if (Array.isArray(o["coordinates"]) && (o["coordinates"] as unknown[]).length === 2) {
      const [lng2, lat2] = o["coordinates"] as unknown[];
      if (typeof lat2 === "number" && typeof lng2 === "number") {
        location = { lat: lat2, lng: lng2 };
      }
    }
  }

  return {
    name: isString(d["name"]) ? (d["name"] as string) : doc.$id,
    organization: isString(d["organization"]) ? (d["organization"] as string) : "",
    role: isString(d["role"]) ? (d["role"] as string) : "",
    city: isString(d["city"]) ? (d["city"] as string) : "",
    location,
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
