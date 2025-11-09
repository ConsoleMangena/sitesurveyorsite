"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [userType, setUserType] = useState("professional");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, register, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email, password, name, {
          username,
          organization,
          userType,
          city,
          country,
        });
      } else {
        await login(email, password);
      }
      router.push("/");
} catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Authentication failed");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>{isRegistering ? "Create Account" : "Sign In"}</CardTitle>
            <CardDescription>
              {isRegistering
                ? "Register for a new SiteSurveyor account"
                : "Sign in to your SiteSurveyor account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isRegistering}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="Tendai Moyo"
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                      required={isRegistering}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="tendai_moyo"
                    />
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium mb-2">
                      Organization/School Name
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required={isRegistering}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="University of Zimbabwe"
                    />
                  </div>

                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium mb-2">
                      User Type
                    </label>
                    <select
                      id="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required={isRegistering}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="professional">Professional</option>
                      <option value="student">Student</option>
                      <option value="researcher">Researcher</option>
                      <option value="hobbyist">Hobbyist</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required={isRegistering}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Harare"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Country
                      </label>
                      <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required={isRegistering}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Zimbabwe"
                      />
                    </div>
                  </div>
                </>
              )}

              {isRegistering && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="tendai@example.com"
                  />
                </div>
              )}

              {!isRegistering && (
                <div>
                  <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="loginEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="tendai@example.com"
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait..." : isRegistering ? "Create Account" : "Sign In"}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError("");
                  }}
                  className="text-primary hover:underline"
                >
                  {isRegistering
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Register"}
                </button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <Link href="/" className="hover:underline">
                  ← Back to home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
