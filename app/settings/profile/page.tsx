"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [organization, setOrganization] = useState("");
  const [userType, setUserType] = useState("professional");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    type Prefs = {
      username?: string;
      organization?: string;
      userType?: string;
      city?: string;
      country?: string;
    };
    const prefs = (user.prefs ?? {}) as Prefs;
    setUsername(prefs.username || "");
    setOrganization(prefs.organization || "");
    setUserType(prefs.userType || "professional");
    setCity(prefs.city || "");
    setCountry(prefs.country || "");
  }, [user]);

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Please sign in to edit your profile.</p>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </main>
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const { account } = await import("@/lib/appwrite");
      if (name && user && name !== user.name) {
        await account.updateName(name);
      }
      await account.updatePrefs({ username, organization, userType, city, country });
      setSuccess("Profile updated");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your name and profile details.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
            <input id="name" className="w-full px-3 py-2 border rounded-md bg-background" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm mb-1">Username</label>
            <input id="username" className="w-full px-3 py-2 border rounded-md bg-background" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="organization" className="block text-sm mb-1">Organization/School</label>
            <input id="organization" className="w-full px-3 py-2 border rounded-md bg-background" value={organization} onChange={(e) => setOrganization(e.target.value)} />
          </div>
          <div>
            <label htmlFor="userType" className="block text-sm mb-1">User Type</label>
            <select id="userType" className="w-full px-3 py-2 border rounded-md bg-background" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="professional">Professional</option>
              <option value="student">Student</option>
              <option value="researcher">Researcher</option>
              <option value="hobbyist">Hobbyist</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm mb-1">City</label>
            <input id="city" className="w-full px-3 py-2 border rounded-md bg-background" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm mb-1">Country</label>
            <input id="country" className="w-full px-3 py-2 border rounded-md bg-background" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>

        {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
        {success && <div className="p-3 text-sm text-emerald-600 bg-emerald-600/10 rounded-md">{success}</div>}

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          <Button type="button" variant="ghost" onClick={() => window.history.back()}>Cancel</Button>
        </div>
      </form>
    </main>
  );
}
