# SiteSurveyor

Affordable geomatics software for land surveying, GPS tracking, and mapping.

## 🚀 Deployed Site

Your site will be available at: `https://consolemangena.github.io/sitesurveyorsite/`

## 📋 Setup GitHub Pages

### 1. Enable GitHub Pages
1. Go to your repository: https://github.com/ConsoleMangena/sitesurveyorsite
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. The workflow will automatically deploy when you push to main

### 2. Add Appwrite Secrets
To make authentication work on GitHub Pages:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT` = `https://nyc.cloud.appwrite.io/v1`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID` = `690f708900139eaa58f4`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## ✨ Features

- ✅ Appwrite authentication with user registration
- ✅ Comprehensive user profiles (organization, type, location)
- ✅ Animated background on homepage
- ✅ Responsive design with dark/light mode
- ✅ Zimbabwean localization (placeholders)
- ✅ GitHub Pages deployment

## 📝 User Registration Fields

- Full Name
- Username
- Email
- Organization/School Name
- User Type (Professional/Student/Researcher/Hobbyist)
- City
- Country
- Password

## 🔗 Links

- Repository: https://github.com/ConsoleMangena/sitesurveyorsite
- Appwrite Console: https://nyc.cloud.appwrite.io/console/project-690f708900139eaa58f4

## 📄 License

See license.txt for details.
