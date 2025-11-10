import { databases } from "./appwrite";
import { Models, Query } from "appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const NOTIFS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID;

export async function fetchUnreadCount(userId?: string): Promise<number> {
  if (!userId || !DB_ID || !NOTIFS_COLLECTION) return 0;
  try {
    const res = await databases.listDocuments<Models.Document>(DB_ID, NOTIFS_COLLECTION, [
      Query.equal("userId", userId),
      Query.equal("read", false),
      Query.limit(1),
    ]);
    const total = (res as Models.DocumentList<Models.Document>).total;
    if (typeof total === "number") return total;
    return res.documents.length > 0 ? 1 : 0;
  } catch {
    return 0;
  }
}

export async function markAllAsRead(userId?: string): Promise<boolean> {
  if (!userId || !DB_ID || !NOTIFS_COLLECTION) return false;
  try {
    // Fetch up to 100 unread and mark as read; in real setup, use server function or batch
    const res = await databases.listDocuments(DB_ID, NOTIFS_COLLECTION, [
      Query.equal("userId", userId),
      Query.equal("read", false),
      Query.limit(100),
    ]);
    await Promise.all(
      res.documents.map((doc) =>
        databases.updateDocument(DB_ID, NOTIFS_COLLECTION, doc.$id, { read: true })
      )
    );
    return true;
  } catch {
    return false;
  }
}
