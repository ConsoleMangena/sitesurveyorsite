# SiteSurveyor

Efficient, lightweight, cross-platform geomatics and planning software for surveyors to collect, process, present and disseminate, manage, and store geospatial data. Advanced, professional features at an affordable price — available on desktop and mobile.

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

- ✅ Appwrite authentication with user registration and GitHub OAuth
- ✅ End-to-end data lifecycle: collection, processing, presentation/dissemination, management, and storage
- ✅ Cross-platform: desktop and mobile-friendly experience
- ✅ Efficient, lightweight UI with dark/light mode
- ✅ Animated, responsive landing experience
- ✅ GitHub Pages deployment
- ✅ Automated GitHub release feeds with search, filters, and opt-in alerts
- ✅ Changelog timeline and interactive workflow playground

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
