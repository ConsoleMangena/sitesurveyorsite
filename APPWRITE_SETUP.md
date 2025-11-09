# Appwrite Configuration

This project is configured with Appwrite for backend services including authentication, databases, and storage.

## Configuration

The following environment variables are configured in `.env.local`:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=690f708900139eaa58f4
```

## Features

### Authentication
- Email/Password authentication
- User registration and login
- Session management
- Protected routes

### Setup Files

1. **`lib/appwrite.ts`** - Appwrite client initialization
   - Exports: `client`, `account`, `databases`, `storage`

2. **`lib/auth-context.tsx`** - React context for authentication
   - Provides: `useAuth()` hook
   - Methods: `login()`, `register()`, `logout()`
   - State: `user`, `loading`

3. **`app/providers.tsx`** - Global providers including AuthProvider

## Usage

### Using Authentication

```tsx
import { useAuth } from "@/lib/auth-context";

function MyComponent() {
  const { user, login, logout } = useAuth();

  if (user) {
    return <div>Welcome, {user.name}!</div>;
  }

  return <button onClick={() => login(email, password)}>Login</button>;
}
```

### Using Appwrite Services

```tsx
import { databases, storage } from "@/lib/appwrite";

// Query database
const response = await databases.listDocuments(
  'databaseId',
  'collectionId'
);

// Upload file
const file = await storage.createFile(
  'bucketId',
  'unique()',
  document.getElementById('file')
);
```

## Pages

- **`/login`** - Authentication page with login/register forms
- User menu in navbar shows login status

## Next Steps

1. **Set up Collections** in Appwrite Console
2. **Configure Permissions** for your collections
3. **Add Storage Buckets** if needed
4. **Enable OAuth Providers** (optional)
5. **Set up Email Templates** for verification

## Appwrite Console

Access your Appwrite console at:
https://nyc.cloud.appwrite.io/console/project-690f708900139eaa58f4
