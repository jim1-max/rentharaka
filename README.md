# Rentharaka

Rentharaka is a smart, AI-powered property rental platform built with Next.js, Firebase, Google Maps, and OpenAI.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS, TypeScript
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **AI Integration:** OpenAI API (gpt-3.5-turbo / gpt-4)
- **Maps:** Google Maps API (`@react-google-maps/api`)
- **State/Forms:** React Hooks, React Hook Form (ready to use)

## Prerequisites
- Node.js installed (v18+ recommended)
- A Firebase Project
- Google Maps API Key
- OpenAI API Key

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

You need:
- `NEXT_PUBLIC_FIREBASE_*`: Get these by adding a "Web App" to your Firebase project.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Get this from Google Cloud Console.
- `OPENAI_API_KEY`: Get this from OpenAI platform.

### 3. Firebase Configuration
- **Authentication**: Enable "Email/Password" sign-in provider in Firebase Console.
- **Firestore Database**: Create a database. Start in Test Mode or configure proper rules (see `firebase.rules`).
- **Storage**: Set up Firebase Storage for property images.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `/app`: Next.js App Router root (Pages, Routing, API endpoints).
- `/components`: Reusable React components (Navbar, Cards, Context Providers).
- `/lib`: Utility functions and third-party configuration (`firebase/config.ts`, `db.ts`).
- `/types`: Global TypeScript types and interfaces.

## Features
- **Role-Based Authentication**: Tenant, Property Owner, Administrator.
- **AI Property Matcher**: Natural language parser using OpenAI to generate structured queries from user inputs.
- **Landlord Portal**: Manage properties, upload images, handle bookings.
- **Admin Dashboard**: System-wide statistics and management overviews.

## Deployment
This project is optimized for deployment on Vercel. 
1. Push your code to GitHub.
2. Import project to Vercel.
3. Add the exact environment variables from `.env.local` to Vercel's Environment Variables settings.
4. Deploy!
