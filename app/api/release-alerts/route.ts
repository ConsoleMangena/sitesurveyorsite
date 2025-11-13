import { NextRequest, NextResponse } from "next/server";
import { ID } from "appwrite";

import { databases, isAppwriteConfigured } from "@/lib/appwrite";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_RELEASE_ALERT_COLLECTION_ID ??
  process.env.APPWRITE_RELEASE_ALERT_COLLECTION_ID;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string") {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const email = body.email.trim();
  const frequency = typeof body.frequency === "string" ? body.frequency : "immediate";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Please supply a valid email." }, { status: 400 });
  }

  if (!isAppwriteConfigured || !databases || !databaseId || !collectionId) {
    return NextResponse.json(
      {
        message:
          "Release alerts are not configured for this deployment yet. Please contact the site maintainer.",
      },
      { status: 503 },
    );
  }

  try {
    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      email,
      frequency,
      createdAt: new Date().toISOString(),
      source: "downloads-page",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("release-alerts", error);
    return NextResponse.json({ message: "Unable to register for alerts. Please try again later." }, { status: 500 });
  }
}
